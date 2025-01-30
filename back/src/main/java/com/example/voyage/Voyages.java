package com.example.voyage;

import jakarta.persistence.*;

@Entity
@Table(name = "voyages")
public class Voyages {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "voyage_id")
    private int id;

    @Column(name = "nom_voyage")
    private String nomVoyage;

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

}
