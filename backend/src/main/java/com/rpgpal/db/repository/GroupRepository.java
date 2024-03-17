package com.rpgpal.db.repository;

import com.rpgpal.db.model.GroupEntity;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

import java.util.UUID;

@ApplicationScoped
public class GroupRepository implements PanacheRepositoryBase<GroupEntity, Long> {
}
