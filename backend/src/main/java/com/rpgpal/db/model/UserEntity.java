package com.rpgpal.db.model;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "user_info", schema = "public", catalog = "postgres")
public class UserEntity {
    @Id
    @Column(name = "id")
    private String id;
    @Column(name = "username", unique = true)
    private String username;
    @OneToMany(mappedBy = "user")
    private Set<CharacterEntity> characters;
    @OneToMany(mappedBy = "user")
    private Set<CampaignEntity> campaigns;

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public Set<CharacterEntity> getCharacters() {
        return characters;
    }

    public void setCharacters(Set<CharacterEntity> characters) {
        this.characters = characters;
    }

    public Set<CampaignEntity> getCampaigns() {
        return campaigns;
    }

    public void setCampaigns(Set<CampaignEntity> campaigns) {
        this.campaigns = campaigns;
    }
}
