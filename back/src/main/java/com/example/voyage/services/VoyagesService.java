package com.example.voyage.services;

import com.example.voyage.Voyages;
import com.example.voyage.repositories.VoyagesRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VoyagesService {

    @Autowired VoyagesRepository voyagesresRepository;

    public VoyagesService(){

    }

    public List<Voyages> getVoyages(){
        return voyagesresRepository.findAll();
    }

    public Voyages saveVoyages(Voyages voyages) {
        return voyagesresRepository.save(voyages);
    }

    public Voyages getVoyage(String voyageName) {
        return voyagesresRepository.findByNomVoyage(voyageName);
    }
}
