package com.example.voyage.repositories;

import com.example.voyage.Voyages;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VoyagesRepository extends JpaRepository<Voyages,Long> {
    Voyages findByNomVoyage(String voyageName);
}
