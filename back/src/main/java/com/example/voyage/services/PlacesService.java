package com.example.voyage.services;

import com.example.voyage.PlacesDTO;
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

    public List<PlacesDTO> getPlaces(Long id){
        return placesResRepository.findPlaces(id);
    }

    public Places savePlaces(Places voyages) {
        return placesResRepository.save(voyages);
    }

    public Places getPlace(String voyageName) {
        return placesResRepository.findByNomPlace(voyageName);
    }
    public Object getLocationAsText(Long id) {
        return placesResRepository.findLocationAsText(id);
    }


}
