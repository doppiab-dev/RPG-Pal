package com.rpgpal.dto;

public class UserInfo {
    private String username;
    private MasterInfo master;
    private PlayerInfo player;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public MasterInfo getMaster() {
        return master;
    }

    public void setMaster(MasterInfo master) {
        this.master = master;
    }

    public PlayerInfo getPlayer() {
        return player;
    }

    public void setPlayer(PlayerInfo player) {
        this.player = player;
    }

    @Override
    public String toString() {
        return "UserInfo{" +
                "username='" + username + '\'' +
                ", master=" + master +
                ", player=" + player +
                '}';
    }
}
