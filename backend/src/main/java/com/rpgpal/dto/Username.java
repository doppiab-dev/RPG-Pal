package com.rpgpal.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Username {
    @JsonProperty
    private String username;

    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
}
