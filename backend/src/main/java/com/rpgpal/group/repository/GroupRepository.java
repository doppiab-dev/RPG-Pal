package com.rpgpal.group.repository;

import com.rpgpal.group.model.Group;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class GroupRepository implements PanacheRepositoryBase<Group, UUID> {
}
