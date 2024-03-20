package com.rpgpal.utils;

import com.rpgpal.db.repository.UserRepository;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class LoginUtils {

    @Inject
    UserRepository userRepository;

    public Boolean checkId(String id) {
        try {
            return userRepository.findByIdOptional(id).isPresent();
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
