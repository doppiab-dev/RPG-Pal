package com.rpgpal.services;

import com.rpgpal.controllers.UserController;
import com.rpgpal.db.model.UserEntity;
import com.rpgpal.db.repository.UserRepository;
import com.rpgpal.dto.MasterInfo;
import com.rpgpal.dto.PlayerInfo;
import com.rpgpal.dto.UserInfo;
import com.rpgpal.dto.UsernameCheck;
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
    }

    /**
     * Checks if the username in input is already taken.
     *
     * @param username the username to check
     * @return UsernameCheckDTO
     */
    public UsernameCheck checkUsernameExistance(String username) {
        UsernameCheck usernameCheck = new UsernameCheck();
        usernameCheck.setUsernameCheck(userRepository.checkUsernameExistance(username));

        return usernameCheck;
    }

    /**
     * Updates the username of the user found by its id with the given value.
     *
     * @param userId the Google id of the user
     * @param username the username to set
     * @return int - the number of rows updated
     */
    public int updateUsername(String userId, String username) {
        return userRepository.update("username = ?1 where id = ?2", username, userId);
    }
}
