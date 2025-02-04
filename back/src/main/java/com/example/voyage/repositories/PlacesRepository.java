package com.example.voyage.repositories;

import com.example.voyage.entities.Places;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface PlacesRepository extends JpaRepository<Places,Long> {
    Places findByNomPlace(String nom);

    @Query(value = "SELECT ST_AsText(location) FROM places WHERE trip_day_id = :id", nativeQuery = true)
    List<String> findLocationAsText(Long id);
}