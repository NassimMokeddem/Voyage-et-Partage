package com.example.voyage.repositories;

import com.example.voyage.entities.Trips;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TripsRepository extends JpaRepository<Trips,Long> {
    Trips findByNomVoyage(String voyageName);
}
