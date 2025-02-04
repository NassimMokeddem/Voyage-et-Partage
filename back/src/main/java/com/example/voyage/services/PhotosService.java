package com.example.voyage.services;

import com.example.voyage.repositories.PhotosRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhotosService {

    @Autowired
    PhotosRepository photosResRepository;

    public List<String> findPhotos(Long id){
        return photosResRepository.findPhotos(id);
    }
}
