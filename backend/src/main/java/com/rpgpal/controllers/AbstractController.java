package com.rpgpal.controllers;

import com.rpgpal.db.repository.AbstractRepository;
import jakarta.inject.Inject;
import jakarta.ws.rs.GET;
import jakarta.ws.rs.core.Response;
import org.jboss.resteasy.reactive.RestQuery;

import static jakarta.ws.rs.core.Response.Status.NOT_FOUND;

//TODO for the future
public abstract class AbstractController<E, T> {

//    @Inject
//    AbstractRepository<E, T> repository;

//    @GET
//    public Response getEntityById(@RestQuery T id) {
//        return repository.findByIdOptional(id)
//                .map(e -> Response.ok().entity(e).build())
//                .orElse(Response.status(NOT_FOUND).build());
//    }
}
