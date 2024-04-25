package com.rpgpal.db.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "campaigns", schema = "public", catalog = "postgres")
public class CampaignEntity {
    @Id
    @SequenceGenerator(name = "campSeq", sequenceName = "camp_id_seq", allocationSize = 1, initialValue = 1000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "campSeq")
    @Column(name = "id")
    private long id;
    @Column(name = "camp_name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "update_date")
    private Timestamp updateDate;
    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private UserEntity user;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Timestamp getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(Timestamp updateDate) {
        this.updateDate = updateDate;
    }

    public UserEntity getUser() {
        return user;
    }

    public void setUser(UserEntity user) {
        this.user = user;
    }
}
