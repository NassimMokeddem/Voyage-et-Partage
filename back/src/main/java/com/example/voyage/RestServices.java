package com.example.voyage;

import com.example.voyage.entities.Places;
import com.example.voyage.entities.Trips;
import com.example.voyage.repositories.PlacesRepository;
import com.example.voyage.services.PhotosService;
import com.example.voyage.services.TripsService;
import com.example.voyage.services.PlacesService;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.Point;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.locationtech.jts.geom.GeometryFactory;

import java.util.List;

@RestController
public class RestServices {

    private static final Logger logger = LoggerFactory.getLogger(RestServices.class);

    @Autowired
    TripsService tripsService;

    @Autowired
    PlacesService placesService;

    @Autowired
    PhotosService photosService;

    @Autowired
    PlacesRepository placesRepository;

    @GetMapping(value = "/voyage")
    public ResponseEntity<String> pong()
    {
        logger.info("Démarrage des services OK .....");
        return new ResponseEntity<String>("Réponse du serveur: "+HttpStatus.OK.name(), HttpStatus.OK);
    }

    @GetMapping(value = "/getVoyages")
    public List<Trips> getVoyages(){
        return tripsService.getVoyages();
    }

    @GetMapping("/getPlaces")
    public List<PlacesDTO> getPlaces(Long id){
        return placesService.getPlaces(id);
    }
//    public ResponseEntity<Point> getPlaces() {
//        GeometryFactory gf = new GeometryFactory();
//
//        Places point = new Places();
//        point.setLocation(gf.createPoint(new Coordinate(1.2345678, 2.3456789)));
//        //Point geojson = point;
//        return ResponseEntity.ok(point.getLocation());
//    }

    @GetMapping("/getLocation")
    public Object getLocation(@RequestParam Long id) {
        return placesService.getLocationAsText(id);
        //return location;
        //return ResponseEntity.ok(location);
    }

    @GetMapping("/getPhotos")
    public Object getPhotos(@RequestParam Long id) {
        return photosService.findPhotos(id);
    }

//    @GetMapping("getAllInfos")
//    public Object getAllInfos(@RequestParam Long id){
//
//        return jsonFile;
//    }


    @PostMapping("/addVoyages")
    public Trips SaveVoyages(@RequestBody Trips voyages){
        return tripsService.saveVoyages(voyages);
    }

    @GetMapping(value = "/getVoyage")
    public Trips getVoyage(String voyageName){
        return tripsService.getVoyage(voyageName);
    }
}