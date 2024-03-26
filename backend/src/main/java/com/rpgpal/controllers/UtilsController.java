package com.rpgpal.controllers;

import com.rpgpal.db.model.UserEntity;
import com.rpgpal.db.repository.UserRepository;
import com.rpgpal.dto.UserInfo;
import com.rpgpal.services.LoginService;
import jakarta.inject.Inject;
import jakarta.ws.rs.InternalServerErrorException;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;
import org.eclipse.microprofile.openapi.annotations.Operation;
import org.eclipse.microprofile.openapi.annotations.media.Content;
import org.eclipse.microprofile.openapi.annotations.media.Schema;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponse;
import org.eclipse.microprofile.openapi.annotations.responses.APIResponses;
import org.eclipse.microprofile.openapi.annotations.security.SecurityRequirement;

@Path("/utils")
public class UtilsController {

    @Inject
    LoginService loginService;

    @POST
    @Path("/fakeRegistration")
    @Operation(summary = "Mocks the user registration. Saves an entity with the given id and username.")
    @APIResponses(value = {
            @APIResponse(responseCode = "204", description = "No Content"),
            @APIResponse(responseCode = "500", description = "Internal Server Error")
    })
    public Response fakeLogin(String userId, String username) {
        try {
            loginService.fakeRegister(userId, username);
            return Response.noContent().build();
        } catch (Exception e) {
            throw new InternalServerErrorException(e);
        }
    }
}
