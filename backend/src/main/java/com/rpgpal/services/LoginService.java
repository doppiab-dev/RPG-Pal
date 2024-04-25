package com.rpgpal.services;

import com.rpgpal.db.repository.UserRepository;
import io.quarkus.security.UnauthorizedException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class LoginService {

    @Inject
    UserRepository userRepository;

    public String validateToken(String token) {
        try {
            return token.substring("Bearer ".length());
        } catch (Exception e) {
            throw new UnauthorizedException("Missing bearer token.");
        }
    }

    public Boolean isFirstLogin(String id) {
        try {
            return userRepository.findByIdOptional(id).isEmpty();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
