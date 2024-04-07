package com.rpgpal.controllers;

import com.rpgpal.db.model.GroupEntity;
import com.rpgpal.db.repository.GroupRepository;
import com.rpgpal.services.LoginService;
import io.quarkus.security.UnauthorizedException;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.enums.SchemaType;
import org.eclipse.microprofile.openapi.annotations.enums.SecuritySchemeType;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;
import org.eclipse.microprofile.openapi.annotations.security.SecurityScheme;
import org.eclipse.microprofile.openapi.annotations.security.SecuritySchemes;

import java.util.List;

import static jakarta.ws.rs.core.HttpHeaders.AUTHORIZATION;

@Path("/group")
@SecuritySchemes(value = {
        @SecurityScheme(securitySchemeName = "Authorization",
                type = SecuritySchemeType.HTTP,
                scheme = "Bearer")}
)
public class GroupController {

    @Inject
    LoginService loginService;

    @Inject
    GroupRepository groupRepository;

    @GET
    @Path("/all")
    @Produces(value = MediaType.APPLICATION_JSON)
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Get all groups. WIP")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GroupEntity.class, type = SchemaType.ARRAY))),
            @APIResponse(responseCode = "204", description = "No Content"),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response getAll(@HeaderParam(AUTHORIZATION) String bearer) {
        String userId = loginService.validateToken(bearer);
        if (!loginService.isFirstLogin(userId))
            throw new UnauthorizedException();

        try {
            List<GroupEntity> groupEntities = groupRepository.findAll().stream().toList();
            if (groupEntities.isEmpty())
                return Response.noContent().build();
            else
                return Response.ok(groupEntities).build();
        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }

    @GET
    @Path("/{id}")
    @Produces(value = MediaType.APPLICATION_JSON)
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Get a group by its id. WIP")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GroupEntity.class))),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "404", description = "Not Found"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response getById(@HeaderParam(AUTHORIZATION) String bearer, String id) {
        String userId = loginService.validateToken(bearer);
        if (!loginService.isFirstLogin(userId))
            throw new UnauthorizedException();

        try {
            GroupEntity groupEntity = groupRepository.findById(Long.parseLong(id));
            if (groupEntity != null)
                return Response.ok(groupEntity).build();
            else
                throw new NotFoundException();
        } catch (NumberFormatException e) {
            throw new InternalServerErrorException(e);
        }
    }

    @POST
    @Path("/save")
    @Transactional
    @Produces(value = MediaType.APPLICATION_JSON)
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Saves a new group. WIP")
    @APIResponses(value = {
            @APIResponse(responseCode = "200", description = "OK", content = @Content(schema = @Schema(implementation = GroupEntity.class))),
            @APIResponse(responseCode = "400", description = "Bad Request"),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response save(@HeaderParam(AUTHORIZATION) String bearer, GroupEntity groupEntity) {
        String userId = loginService.validateToken(bearer);
        if (!loginService.isFirstLogin(userId))
            throw new UnauthorizedException();

        try {
            if (!groupRepository.isPersistent(groupEntity)) {
                groupRepository.persist(groupEntity);
                return Response.ok(groupEntity).build();
            } else
                throw new BadRequestException("The group you wish to save is already in the system. Group = " + groupEntity);
        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }

    @DELETE
    @Path("/delete")
    @Transactional
    @Produces(value = MediaType.APPLICATION_JSON)
    @SecurityRequirement(name = "Authorization")
    @Operation(summary = "Deletes a group. WIP")
    @APIResponses(value = {
            @APIResponse(responseCode = "204", description = "No Content"),
            @APIResponse(responseCode = "401", description = "Unauthorized"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response delete(@HeaderParam(AUTHORIZATION) String bearer, GroupEntity groupEntity) {
        String userId = loginService.validateToken(bearer);
        if (!loginService.isFirstLogin(userId))
            throw new UnauthorizedException();

        try {
            groupRepository.delete(groupEntity);
            return Response.noContent().build();
        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }
}
