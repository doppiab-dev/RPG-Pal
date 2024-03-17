package com.rpgpal.dto;

public class UserInfoDTO {
    private String username;
    private MasterInfoDTO master;
    private PlayerInfoDTO player;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public MasterInfoDTO getMaster() {
        return master;
    }

    public void setMaster(MasterInfoDTO master) {
        this.master = master;
    }

    public PlayerInfoDTO getPlayer() {
        return player;
    }

    public void setPlayer(PlayerInfoDTO player) {
        this.player = player;
    }
}
