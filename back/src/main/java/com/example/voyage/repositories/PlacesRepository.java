package com.example.voyage.repositories;

import com.example.voyage.PlacesDTO;
import com.example.voyage.entities.Places;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface PlacesRepository extends JpaRepository<Places,Long> {
    Places findByNomPlace(String nom);

    //@Query(value = "SELECT ST_AsGeoJSON(location) AS geojson FROM places WHERE trip_day_id = 1; ", nativeQuery = true)
    //@Query(value = "SELECT r.*, ST_AsGeoJSON(r.path) as geojson FROM routes r WHERE r.trip_day_id = 2", nativeQuery = true)
    //String findLocationAsText(Long id);

    @Query(value = "SELECT json_agg(ST_AsGeoJSON(location)::json) FROM places WHERE trip_day_id = :tripDayId", nativeQuery = true)
    Object findLocationAsText(@Param("tripDayId") Long tripDayId);

    @Query(value = "SELECT name, description, type, arrival_time, departure_time FROM places WHERE trip_day_id = :tripDayId", nativeQuery = true)
    List<PlacesDTO> findPlaces(@Param("tripDayId") Long tripDayId);;
}