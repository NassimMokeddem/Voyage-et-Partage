package com.example.voyage.services;

import com.example.voyage.entities.Trips;
import com.example.voyage.repositories.TripsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TripsService {

    @Autowired
    TripsRepository tripsResRepository;

    public TripsService(){

    }

    public List<Trips> getVoyages(){
        return tripsResRepository.findAll();
    }

    public Trips saveVoyages(Trips voyages) {
        return tripsResRepository.save(voyages);
    }

    public Trips getVoyage(String voyageName) {
        return tripsResRepository.findByNomVoyage(voyageName);
    }
}
