package com.rpgpal.services;

import com.rpgpal.db.repository.UserRepository;
import io.quarkus.security.UnauthorizedException;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class LoginService {

    @Inject
    UserRepository userRepository;

    public String checkToken(String token) {
        try {
            return token.substring("Bearer ".length());
        } catch (Exception e) {
            throw new UnauthorizedException("Missing bearer token.");
        }
    }

    public Boolean checkId(String id) {
        try {
            return userRepository.findByIdOptional(id).isPresent();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
