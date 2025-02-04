package com.example.voyage.repositories;

import com.example.voyage.entities.Photos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

@Repository
public interface PhotosRepository extends JpaRepository<Photos,Long> {
    @Query(value = "SELECT json_agg(json_build_object('url', url)) AS photos FROM photos WHERE place_id IN (SELECT id FROM places WHERE trip_day_id = :id); ", nativeQuery = true)
    Object findPhotos(Long id);
}
