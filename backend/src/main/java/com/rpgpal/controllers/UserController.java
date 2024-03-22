package com.rpgpal.controllers;

import com.rpgpal.dto.UserInfo;
import com.rpgpal.dto.Username;
import com.rpgpal.dto.UsernameCheck;
import com.rpgpal.services.UserService;
import com.rpgpal.utils.LoginUtils;
import io.quarkus.security.UnauthorizedException;
import jakarta.inject.Inject;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;
import org.jboss.logging.Logger;
import org.jboss.resteasy.reactive.RestQuery;

import static jakarta.ws.rs.core.HttpHeaders.AUTHORIZATION;

@Path("/user")
public class UserController {

    @Inject
    UserService userService;

    @Inject
    LoginUtils loginUtils;
    
    @GET
    @Path("/info")
    public Response getUserInfo(@HeaderParam(AUTHORIZATION) String bearer) throws UnauthorizedException {
        String userId = loginUtils.checkToken(bearer);

        if (!loginUtils.checkId(userId))
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
    public Response checkUsername(@HeaderParam(AUTHORIZATION) String bearer, String username) throws UnauthorizedException {
        String userId = loginUtils.checkToken(bearer);

        if (!loginUtils.checkId(userId))
            throw new UnauthorizedException();

        try {
            UsernameCheck usernameCheck = userService.checkUsername(userId);
            return Response.ok().entity(usernameCheck).build();
        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }

    @POST
    @Path("/username")
    public Response saveUsername(@HeaderParam(AUTHORIZATION) String bearer, Username username) {
        String userId = loginUtils.checkToken(bearer);

        if (!loginUtils.checkId(userId))
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
