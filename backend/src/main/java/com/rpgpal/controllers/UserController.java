package com.rpgpal.controllers;

import com.rpgpal.dto.UserInfoDTO;
import com.rpgpal.services.UserService;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.HeaderParam;
import jakarta.ws.rs.POST;
import jakarta.ws.rs.Path;
import jakarta.ws.rs.core.Response;

import static jakarta.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static jakarta.ws.rs.core.Response.Status.NOT_FOUND;
import static jakarta.ws.rs.core.Response.Status.UNAUTHORIZED;

@Path("/user")
public class UserController {

    @Inject
    UserService userService;

    @GET
    @Path("/info")
    public Response getUserInfo(@HeaderParam(AUTHORIZATION) String bearer) {
        String userId = bearer.substring("Bearer ".length());

        if (userId.isEmpty() || userId.isBlank())
            return Response.status(UNAUTHORIZED)
                    .entity("No bearer token!")
                    .build();

        try {
            UserInfoDTO userInfo = userService.getUserInfo(userId);

            if (userInfo != null)
                return Response.ok(userInfo).build();
            else
                return Response.status(NOT_FOUND)
                        .entity("No group with specified id: " + userId)
                        .build();

        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @GET
    @Path("check/{username}")
    public Response checkUsername() {
        return Response.ok().build();
    }

    @POST
    @Path("/username")
    public Response saveUsername() {
        return Response.ok().build();
    }
}
