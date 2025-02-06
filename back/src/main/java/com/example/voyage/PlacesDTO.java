package com.example.voyage;

import org.locationtech.jts.geom.Geometry;

public interface PlacesDTO {
    String getName();
    String getDescription();
    String getType();
    String getArrival_time();
    String getDeparture_time();
    String getUrl();
    String getPoint();
}
