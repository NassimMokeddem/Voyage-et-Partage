package com.example.voyage.repositories;

import com.example.voyage.entities.Photos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface PhotosRepository extends JpaRepository<Photos,Long> {
    @Query(value = "SELECT p.url  FROM photos p JOIN places pl ON p.place_id = pl.id WHERE pl.trip_day_id = :id", nativeQuery = true)
    List<String> findPhotos(Long id);
}
