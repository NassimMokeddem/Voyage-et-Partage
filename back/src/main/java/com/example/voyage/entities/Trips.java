package com.example.voyage.entities;

import jakarta.persistence.*;

@Entity
@Table(name = "trips")
public class Trips {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "name")
    private String nomVoyage;

    @Column(name = "description")
    private String descVoyage;

    @Column(name = "start_date")
    private String startVoyage;

    @Column(name = "end_date")
    private String endVoyage;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNomVoyage() {
        return nomVoyage;
    }

    public void setNomVoyage(String nomVoyage) {
        this.nomVoyage = nomVoyage;
    }

    public String getDescVoyage() {
        return descVoyage;
    }

    public void setDescVoyage(String descVoyage) {
        this.descVoyage = descVoyage;
    }

    public String getStartVoyage() {
        return startVoyage;
    }

    public void setStartVoyage(String startVoyage) {
        this.startVoyage = startVoyage;
    }

    public String getEndVoyage() {
        return endVoyage;
    }

    public void setEndVoyage(String endVoyage) {
        this.endVoyage = endVoyage;
    }
}
