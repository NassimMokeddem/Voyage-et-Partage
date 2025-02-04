package com.example.voyage.services;

import com.example.voyage.entities.Places;
import com.example.voyage.repositories.PlacesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlacesService {

    @Autowired
    PlacesRepository placesResRepository;

    public PlacesService(){

    }

    public List<Places> getPlaces(){
        return placesResRepository.findAll();
    }

    public Places savePlaces(Places voyages) {
        return placesResRepository.save(voyages);
    }

    public Places getPlace(String voyageName) {
        return placesResRepository.findByNomPlace(voyageName);
    }
    public List<String> getLocationAsText(Long id) {
        return placesResRepository.findLocationAsText(id);
    }


}
