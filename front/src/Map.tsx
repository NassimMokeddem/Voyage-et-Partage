import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useMap, Polyline } from 'react-leaflet';

import React, {useEffect, useState} from 'react';

import './Map.css';
import 'leaflet/dist/leaflet.css';

import 'leaflet.locatecontrol/dist/L.Control.Locate.css';
import 'leaflet.locatecontrol';

// import 'leaflet-routing-machine';
// import 'leaflet.locatecontrol';
//import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
const Openrouteservice = require('openrouteservice-js');

type LatLngTuple = [number, number];

//const map = useMap();
//const apiKey = '5b3ce3597851110001cf62489c8e763afc104624bc3fa15b1e78bb57';

const LeafletRoutingMachine = () => {
  const map = useMap();
  const apiKey = '5b3ce3597851110001cf62489c8e763afc104624bc3fa15b1e78bb57';
  
  useEffect(() => {
    L.control.locate({
      locateOptions: {
        enableHighAccuracy: true
      }
    }).addTo(map);
  });
  
  const orsDirections = new Openrouteservice.Directions({
    api_key: apiKey
  })
  
    orsDirections.calculate({
    coordinates: [[8.681495,49.41461],[8.686507,49.41943],[8.687872,49.420318]],
    profile: "driving-car",
    extra_info: ["waytype", "steepness"],
    format: "geojson",
    api_version: 'v2',
  })
  
  .then(function(response: { features: any[]; }) {
    console.log(response);
    
    if (response && response.features && response.features[0]) {
      const feature = response.features[0];
      const result = {
        coordinates: [],
      };
        if (feature.geometry && Array.isArray(feature.geometry.coordinates)) {
          result.coordinates = feature.geometry.coordinates;
          const polyline = L.polyline(result.coordinates, {color: 'red'}).addTo(map);
          map.fitBounds(polyline.getBounds());
        }
      }
  })
  .catch(function(error: any) {
    console.log('Error:', error);
  });
  
  };


function Map() {
  const locations: { position: LatLngTuple; name: string; description: string; image: string }[] = [
    {
      position: [51.505, -0.09],
      name: 'Musée',
      description: 'Un musée très interessant...',
      image: 'https://musee-magnin.fr/sites/magnin/files/styles/w1920_extra_wide/public/2023-05/visitevirtuelle2.jpg?itok=g3bMMsHV',
    },
    {
      position: [51.515, -0.1],
      name: 'Une route',
      description: 'Elle est grande.',
      image: 'https://via.placeholder.com/150',
    },
    {
      position: [51.525, -0.08],
      name: 'Hôtel',
      description: 'ZZZZ.',
      image: 'https://via.placeholder.com/150',
    },
    {
      position: [51.535, -0.07],
      name: 'Aéroport',
      description: 'C\'est un aéroport.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  const data: { id: Number; name: string; position: LatLngTuple;  type: string }[]= [
    { id: 1, name: 'Tour Eiffel', position: [48.8588443, 2.2943506], type: 'attraction' },
    { id: 2, name: 'Musée du Louvre', position: [48.8606111, 2.337644], type: 'museum' },
  ];

  return (
    <MapContainer id="map" center={[51.505, -0.09]} zoom={13} scrollWheelZoom={true} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {locations.map((location, index) => (
        <Marker
          key={index}
          position={location.position} // Type vérifié comme LatLngTuple
          icon={L.icon({ iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Tooltip>{location.name}</Tooltip>
          <Popup>
            <div>
              <h3>{location.name}</h3>
              <p>{location.description}</p>
              <img src={location.image} alt={location.name} style={{ width: '100px', height: 'auto' }} />
            </div>
          </Popup>
        </Marker>
      ))}
      {data.map((location, index) => (
        <Marker
          key={index}
          position={location.position}
          icon={L.icon({ iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png', iconSize: [25, 41], iconAnchor: [12, 41] })}
        >
          <Tooltip>{location.name}</Tooltip>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;