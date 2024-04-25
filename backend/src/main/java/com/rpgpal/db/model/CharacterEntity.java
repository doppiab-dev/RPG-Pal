package com.rpgpal.db.model;

import jakarta.persistence.*;

import java.sql.Timestamp;

@Entity
@Table(name = "characters", schema = "public", catalog = "postgres")
public class CharacterEntity {
    @Id
    @SequenceGenerator(name = "charSeq", sequenceName = "char_id_seq", allocationSize = 1, initialValue = 1000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "charSeq")
    @Column(name = "id")
    private long id;
    @Column(name = "char_name")
    private String name;
    @Column(name = "char_class")
    private String characterClass;
    @Column(name = "char_level")
    private Integer level;
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

    public String getCharacterClass() {
        return characterClass;
    }

    public void setCharacterClass(String characterClass) {
        this.characterClass = characterClass;
    }

    public Integer getLevel() {
        return level;
    }

    public void setLevel(Integer level) {
        this.level = level;
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
