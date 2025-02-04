package com.example.voyage.entities;

import jakarta.persistence.*;
import org.locationtech.jts.geom.Point;

@Entity
@Table(name = "places")
public class Places {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "trip_day_id")
    private int tripDayId;

    @Column(name = "name")
    private String nomPlace;

    @Column(name = "description")
    private String descVoyage;

    @Column(name = "arrival_time")
    private String arrivalPlace;

    @Column(name = "departure_time")
    private String departurePlace;

    @Column(name = "location", columnDefinition = "geometry(Point,4326)")
    private Point location;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getTripDayId() {
        return tripDayId;
    }

    public void setTripDayId(int tripDayId) {
        this.tripDayId = tripDayId;
    }

    public String getNomPlace() {
        return nomPlace;
    }

    public void setNomPlace(String nomPlace) {
        this.nomPlace = nomPlace;
    }

    public String getDescVoyage() {
        return descVoyage;
    }

    public void setDescVoyage(String descVoyage) {
        this.descVoyage = descVoyage;
    }

    public String getArrivalPlace() {
        return arrivalPlace;
    }

    public void setArrivalPlace(String arrivalPlace) {
        this.arrivalPlace = arrivalPlace;
    }

    public String getDeparturePlace() {
        return departurePlace;
    }

    public void setDeparturePlace(String departurePlace) {
        this.departurePlace = departurePlace;
    }

    public Point getLocation() {
        return this.location;
    }

    public void setLocation(Point location) {
        this.location = location;
    }
}
