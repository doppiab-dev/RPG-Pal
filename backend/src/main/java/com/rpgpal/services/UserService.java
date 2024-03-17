package com.rpgpal.services;

import com.rpgpal.db.model.UserEntity;
import com.rpgpal.db.repository.UserRepository;
import com.rpgpal.dto.MasterInfoDTO;
import com.rpgpal.dto.PlayerInfoDTO;
import com.rpgpal.dto.UserInfoDTO;
import jakarta.enterprise.context.ApplicationScoped;
import jakarta.inject.Inject;

@ApplicationScoped
public class UserService {

    @Inject
    UserRepository userRepository;

    public UserInfoDTO getUserInfo(String userId) {
        UserEntity entity = userRepository.findById(userId);

        if (entity != null) {
            UserInfoDTO userInfoDTO = new UserInfoDTO();

            if (!entity.getCampaigns().isEmpty()) {
                MasterInfoDTO masterInfoDTO = new MasterInfoDTO();
                masterInfoDTO.setCampaigns(entity.getCampaigns().size());
                userInfoDTO.setMaster(masterInfoDTO);
            }

            if (!entity.getCharacters().isEmpty()) {
                PlayerInfoDTO playerInfoDTO = new PlayerInfoDTO();
                playerInfoDTO.setCharacters(entity.getCharacters().size());
                userInfoDTO.setPlayer(playerInfoDTO);
            }

            userInfoDTO.setUsername(entity.getUsername());

            return userInfoDTO;
        }
        return null;
    }
}
