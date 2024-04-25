package com.rpgpal.dto;

public class UsernameCheck {
    private Boolean usernameCheck;

    public Boolean getUsernameCheck() {
        return usernameCheck;
    }

    public void setUsernameCheck(Boolean usernameCheck) {
        this.usernameCheck = usernameCheck;
    }

    @Override
    public String toString() {
        return "UsernameCheck{" +
                "usernameCheck=" + usernameCheck +
                '}';
    }
}
