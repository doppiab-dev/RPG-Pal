package com.rpgpal.group.model;

import jakarta.persistence.*;

@Entity
@Table(name = "group", schema = "public")
public class Group {

    @Id
    @SequenceGenerator(name = "groupSeq", sequenceName = "group_id_seq", allocationSize = 1, initialValue = 1000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "groupSeq")
    @Column(name = "id")
    private long id;
    @Column(name = "group_name")
    private String name;
    @Column(name = "group_descriptio")
    private String description;
    @Column(name = "group_master")
    private String master; //TODO relazione con entity utenza
    @Column(name = "group_status")
    private String status; //TODO enum di stati (attiva, chiusa, annullata?, conlcusa?)
    @Column(name = "update_date")
    private String updateDate; //TODO aggiornare quando cambia stato -> tabella di eventi?

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

    public String getMaster() {
        return master;
    }

    public void setMaster(String master) {
        this.master = master;
    }

    public String getStatus() {
        return this.status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getUpdateDate() {
        return updateDate;
    }

    public void setUpdateDate(String updateDate) {
        this.updateDate = updateDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Group{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", groupMaster='" + master + '\'' +
                '}';
    }
}
