package com.rpgpal.controllers;

import com.rpgpal.db.model.GroupEntity;
import com.rpgpal.db.repository.GroupRepository;
import com.rpgpal.utils.LoginUtils;
import io.quarkus.logging.Log;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.HttpHeaders.AUTHORIZATION;
import static jakarta.ws.rs.core.Response.Status.*;

@Path("/group")
public class GroupController {

    @Inject
    LoginUtils loginUtils;

    @Inject
    GroupRepository groupRepository;

    @GET
    @Path("/all")
    public Response getAll(@HeaderParam(AUTHORIZATION) String bearer) {
        String userId = loginUtils.checkToken(bearer);
        try {
            List<GroupEntity> groupEntities = groupRepository.findAll().stream().toList();
            if (groupEntities.isEmpty())
                return Response.noContent().build();
            else
                return Response.ok(groupEntities).build();
        } catch (Exception e) {
            return Response.status(INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage())
                    .build();        }
    }

    @GET
    @Path("/{id}")
    public Response getById(@HeaderParam(AUTHORIZATION) String bearer, String id) {
        String userId = loginUtils.checkToken(bearer);
        try {
            GroupEntity groupEntity = groupRepository.findById(Long.parseLong(id));
            if (groupEntity != null)
                return Response.ok(groupEntity).build();
            else
                return Response.status(NOT_FOUND)
                        .entity("No group with specified id: " + id)
                        .build();
        } catch (NumberFormatException e) {
            return Response.status(INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage())
                    .build();        }
    }

    @POST
    @Path("/save")
    @Transactional
    public Response save(@HeaderParam(AUTHORIZATION) String bearer, GroupEntity groupEntity) {
        String userId = loginUtils.checkToken(bearer);
        try {
            if (!groupRepository.isPersistent(groupEntity)) {
                groupRepository.persist(groupEntity);
                return Response.ok(groupEntity).build();
            } else
                return Response.status(BAD_REQUEST)
                        .entity("The group you wish to save is already in the system. Group = " + groupEntity)
                        .build();
        } catch (Exception e) {
            return Response.status(INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage())
                    .build();
        }
    }

    @DELETE
    @Path("/delete")
    @Transactional
    public Response delete(@HeaderParam(AUTHORIZATION) String bearer, GroupEntity groupEntity) {
        String userId = loginUtils.checkToken(bearer);
        try {
            groupRepository.delete(groupEntity);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
