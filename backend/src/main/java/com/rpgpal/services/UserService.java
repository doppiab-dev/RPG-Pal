package com.rpgpal.services;

import com.rpgpal.controllers.UserController;
import com.rpgpal.db.model.UserEntity;
import com.rpgpal.db.repository.UserRepository;
import com.rpgpal.dto.MasterInfo;
import com.rpgpal.dto.PlayerInfo;
import com.rpgpal.dto.UserInfo;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;
import org.jboss.logging.Logger;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    private static final Logger logger = Logger.getLogger(UserController.class);

    /**
     * Get the user info needed at login.
     *
     * @param userId the Google id of the user
     * @return UserInfoDTO
     */
    public UserInfo getUserInfo(String userId) {
        try {
            UserEntity entity = userRepository.findById(userId);

            if (entity != null) {
                logger.info("User found, start mapping.");
                UserInfo userInfo = new UserInfo();

                if (!entity.getCampaigns().isEmpty()) {
                    MasterInfo masterInfo = new MasterInfo();
                    masterInfo.setCampaigns(entity.getCampaigns().size());
                    userInfo.setMaster(masterInfo);
                }

                if (!entity.getCharacters().isEmpty()) {
                    PlayerInfo playerInfo = new PlayerInfo();
                    playerInfo.setCharacters(entity.getCharacters().size());
                    userInfo.setPlayer(playerInfo);
                }

                userInfo.setUsername(entity.getUsername());

                return userInfo;
            }
            return null;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Checks if the username in input is already taken.
     *
     * @param username the username to check
     * @return boolean. True if the username is available, false otherwise
     */
    public boolean checkUsernameExistence(String username) {
        try {
            return userRepository.checkUsernameExistence(username);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Updates the username of the user found by its id with the given value.
     *
     * @param userId   the Google id of the user
     * @param username the username to set
     * @return int - the number of rows updated
     */
    public int updateUsername(String userId, String username) {
        try {
            return userRepository.update("username = ?1 where id = ?2", username, userId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    /**
     * Saves a new user entity with the given id.
     *
     * @param id The new user id
     */
    public void saveNewUser(String id) {
        try {
            UserEntity entity = new UserEntity();
            entity.setId(id);
            userRepository.persist(entity);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
