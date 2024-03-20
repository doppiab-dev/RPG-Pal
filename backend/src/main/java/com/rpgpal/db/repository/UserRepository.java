package com.rpgpal.db.repository;

import com.rpgpal.db.model.UserEntity;
import com.rpgpal.db.model.UserUsernameProjection;
import io.quarkus.hibernate.orm.panache.PanacheRepositoryBase;
import jakarta.enterprise.context.ApplicationScoped;

@ApplicationScoped
public class UserRepository implements PanacheRepositoryBase<UserEntity, String> {

    public Boolean checkUsernameById(String id) {
        return find("id", id).project(UserUsernameProjection.class).singleResultOptional().isPresent();
    }
}
