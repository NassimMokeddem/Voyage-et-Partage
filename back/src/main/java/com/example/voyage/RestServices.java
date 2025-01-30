package com.example.voyage;

import com.example.voyage.services.VoyagesService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class RestServices {

    private static final Logger logger = LoggerFactory.getLogger(RestServices.class);

    @Autowired
    VoyagesService voyagesService;

    @GetMapping(value = "/voyage")
    public ResponseEntity<String> pong()
    {
        logger.info("Démarrage des services OK .....");
        return new ResponseEntity<String>("Réponse du serveur: "+HttpStatus.OK.name(), HttpStatus.OK);
    }

    @GetMapping(value = "/getVoyages")
    public List<Voyages> getVoyages(){
        return voyagesService.getVoyages();
    }

    @PostMapping("addVoyages")
    public Voyages SaveVoyages(@RequestBody Voyages voyages){
        return voyagesService.saveVoyages(voyages);
    }

    @GetMapping(value = "/getVoyage")
    public Voyages getVoyage(String voyageName){
        return voyagesService.getVoyage(voyageName);
    }
}