package com.rpgpal.group.controller;

import com.rpgpal.group.model.Group;
import com.rpgpal.group.repository.GroupRepository;
import io.quarkus.logging.Log;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.Response;

import java.util.List;
import java.util.UUID;

import static jakarta.ws.rs.core.Response.Status.*;

@Path("/group")
public class GroupController {

    @Inject
    GroupRepository groupRepository;

    @GET
    @Path("/all")
    public Response getAll() {
        Log.info("Get all groups");
        try {
            List<Group> groups = groupRepository.findAll().stream().toList();
            if (groups.isEmpty())
                return Response.noContent().build();
            else
                return Response.ok(groups).build();
        } catch (Exception e) {
            return Response.status(INTERNAL_SERVER_ERROR)
                    .entity(e.getMessage())
                    .build();        }
    }

    @GET
    @Path("/{id}")
    public Response getById(String id) {
        Log.info("Get group by id: " + id);
        try {
            Group group = groupRepository.findById(UUID.fromString(id));
            if (group != null)
                return Response.ok(group).build();
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
    public Response save(Group group) {
        Log.info("Save group: " + group.toString());
        try {
            if (!groupRepository.isPersistent(group)) {
                groupRepository.persist(group);
                return Response.ok(group).build();
            } else
                return Response.status(BAD_REQUEST)
                        .entity("The group you wish to save is already in the system. Group = " + group)
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
    public Response delete(Group group) {
        Log.info("Delete group: " + group.toString());
        try {
            groupRepository.delete(group);
            return Response.ok().build();
        } catch (Exception e) {
            return Response.serverError().build();
        }
    }
}
