package com.rpgpal.controllers;

import com.rpgpal.dto.UserInfo;
import com.rpgpal.dto.Username;
import com.rpgpal.dto.UsernameCheck;
import com.rpgpal.services.LoginService;
import com.rpgpal.services.UserService;
import io.quarkus.security.UnauthorizedException;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;
import org.eclipse.microprofile.openapi.annotations.security.SecuritySchemes;

import static jakarta.ws.rs.core.HttpHeaders.AUTHORIZATION;

@Path("/user")
@SecuritySchemes(value = {
        @SecurityScheme(securitySchemeName = "Authorization",
                type = SecuritySchemeType.HTTP,
                scheme = "Bearer")}
)
public class UserController {

    @Inject
    UserService userService;

    @Inject
    LoginService loginService;

    @GET
    @Path("/info")
    @Produces(value = MediaType.APPLICATION_JSON)
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Get general info about the user")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UserInfo.class))),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response getUserInfo(@HeaderParam(AUTHORIZATION) String bearer) {
        String userId = loginService.checkToken(bearer);
        if (!loginService.checkId(userId))
            throw new UnauthorizedException();

        try {
            UserInfo userInfo = userService.getUserInfo(userId);

            if (userInfo != null)
                return Response.ok(userInfo).build();
            else
                throw new NotFoundException("No user with id: " + userId);

        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }

    @GET
    @Path("check/{username}")
    @Produces(value = MediaType.APPLICATION_JSON)
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Check to find out if a username is already taken")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = UsernameCheck.class))),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response checkUsername(@HeaderParam(AUTHORIZATION) String bearer, String username) {
        String userId = loginService.checkToken(bearer);
        if (!loginService.checkId(userId))
            throw new UnauthorizedException();

        try {
            UsernameCheck usernameCheck = userService.checkUsernameExistance(username);
            return Response.ok().entity(usernameCheck).build();
        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }

    @POST
    @Path("/username")
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Saves a username for the current user")
    @APIResponses(value = {
            @APIResponse(responseCode = "204", description = "No Content"),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response saveUsername(@HeaderParam(AUTHORIZATION) String bearer, Username username) {
        String userId = loginService.checkToken(bearer);
        if (!loginService.checkId(userId))
            throw new UnauthorizedException();

        try {
            int row = userService.updateUsername(userId, username.getUsername());

            if (row == 1)
                return Response.noContent().build();
            else if (row == 0)
                throw new InternalServerErrorException("No record was updated, something went wrong");
            else
                throw new RuntimeException("More than one record was updated, something went wrong");

        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }
}
