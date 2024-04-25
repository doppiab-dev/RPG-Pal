package com.rpgpal.db.model;

import io.quarkus.runtime.annotations.RegisterForReflection;

@RegisterForReflection
public record UserUsernameProjection(String username) {
}
