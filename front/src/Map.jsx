import React, { useEffect, useState, useRef } from "react";
import { MapContainer, TileLayer, useMap, useMapEvents, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";

// const RouteLayer = ({ accessToken, start, end }) => {

//   const map = useMap();

//   useEffect(() => {
//     const addRoute = async () => {

//       // L.marker([15.966636, -61.653889])
//       // .bindPopup(`
//       //   <div>
//       //     <h3>Nom du lieu</h3>
//       //     <p>Ceci est une description du lieu.</p>
//       //     <a href="https://www.iles.com/images/main/guadeloupe.jpg" target="_blank">
//       //       <img src="https://www.iles.com/images/main/guadeloupe.jpg" alt="Description du lieu" style="width:100%;border-radius:8px;">
//       //     </a>
//       //   </div>
//       // `)
//       // .bindTooltip("Test", { permanent: true, direction: "auto" })
//       // .addTo(map);
//       try {
//         const coordinates = `${start.join()};${end.join()}`;
//         // const response = await fetch(
//         //   `https://api.jawg.io/routing/route/v1/car/${coordinates}?alternatives=false&geometries=geojson&overview=full&access-token=${accessToken}`
//         // );
//         const data = await response.json();

//         if (data.routes && data.routes.length > 0) {
//           const route = data.routes[0].geometry;

//           const mainRouteLayer = L.geoJSON(route, {
//             style: {
//               color: "#13BBFA",
//               weight: 4,
//               opacity: 0.8,
//             },
//           });

//           const caseLayer = L.geoJSON(route, {
//             style: {
//               color: "#4D93E3",
//               weight: 6,
//               opacity: 0.6,
//             },
//           });

//           caseLayer.addTo(map);
//           mainRouteLayer.addTo(map);

//           const startEndLayer = L.geoJSON(
//             {
//               type: "MultiPoint",
//               coordinates: [
//                 route.coordinates[0],
//                 route.coordinates[route.coordinates.length - 1],
//               ],
//             },
//             {
//               pointToLayer: (feature, latlng) => {
//                 return L.circleMarker(latlng, {
//                   radius: 8,
//                   fillColor: "#13BBFA",
//                   color: "#4D93E3",
//                   weight: 3,
//                   opacity: 1,
//                   fillOpacity: 0.9,
//                 });
//               },
//             }
//           );

//           startEndLayer.addTo(map);

//           map.fitBounds(mainRouteLayer.getBounds());
//         }
//       } catch (error) {
//         console.error("Erreur lors de l'ajout de l'itinéraire :", error);
//       }
//     };

//    addRoute();
//   }, [accessToken, start, end, map]);

//   return null;
// };

const removeAllMarkers = (map) => {
  map.eachLayer((layer) => {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
};


const AddMarker = ({ places }) => {
  const map = useMap();

  useEffect(() => {
    console.log(places)
    if (places[0] !== undefined) {
      places.forEach((place) => {
        L.marker([place.coordinates.lat, place.coordinates.lng])
          .bindPopup(`
            <div>
              <h3>${place.name}</h3>
              <p>${place.description}</p>
              <a href="${place.url}" target="_blank">
                <img src="${place.url}" alt="${place.name}" style="width:100%;border-radius:8px;">
              </a>
            </div>
          `)
          .bindTooltip(place.name, {permanent: true, direction: "auto" })
          .addTo(map);
      })
      map.setView([places[0].coordinates.lat, places[0].coordinates.lng], 13);
    }else{
      removeAllMarkers(map);
      map.setView([46.5, 2.5], 6);
    }
    
  }, [places]); // Eventuellement ajouter map

  return null;
};


const Map = () => {
  const accessToken = "31JhO7BoVix0fm9Kn4N91xaLyFspUroEOgrZNaQLIW0bgxoXTC0NhgPbeHmD24Me";
  const start = [2.3522, 48.8566]; // Paris [lng, lat]
  const end = [5.3698, 43.2965]; // Marseille [lng, lat]

  const [selectedDay, setSelectedDay] = useState("");
  const [places, setPlaces] = useState([]);

  const extractCoordinates = (pointString) => {
    const match = pointString.match(/POINT\(([^ ]+) ([^ ]+)\)/);
    if (match) {
      return { lat: parseFloat(match[2]), lng: parseFloat(match[1]) };
    }
    return { lat: null, lng: null };
  };

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedDay(selectedValue);
    
    let dayId = 0;
    if (selectedValue === "Jour 1") {
      dayId = 1;
    } else if (selectedValue === "Jour 2") {
      dayId = 2;
    } else if (selectedValue === "Jour 3") {
      dayId = 3;
    }

    if (dayId > 0) {
      fetch(`http://localhost:8080/getPlaces?id=${dayId}`)
        .then((response) => response.json())
        .then((data) => {
          const placesWithCoordinates = data.map((place) => ({
            ...place,
            coordinates: extractCoordinates(place.point),
          }));
          setPlaces(placesWithCoordinates);
        })
        .catch((error) => {
          console.error("Erreur lors de la requête:", error);
        });
    }
    else{
      setPlaces([])
    }
  };

  return (
    <div>
      <select value={selectedDay} onChange={handleChange}>
        <option value="">Sélectionner un jour</option>
        <option value="Jour 1">Jour 1</option>
        <option value="Jour 2">Jour 2</option>
        <option value="Jour 3">Jour 3</option>
      </select>

      <MapContainer
        center={[46.5, 2.5]}
        zoom={6}
        style={{ height: "100vh", width: "100%" }}
      >
        <TileLayer
          url={`https://tile.jawg.io/jawg-streets/{z}/{x}/{y}.png?access-token=${accessToken}`}
          attribution='<a href="https://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank" class="jawg-attrib">&copy; <b>Jawg</b>Maps</a> | <a href="https://www.openstreetmap.org/copyright" title="OpenStreetMap is open data licensed under ODbL" target="_blank" class="osm-attrib">&copy; OSM contributors</a>'
          maxZoom={22}
        />
        <AddMarker places = {places}/>
      </MapContainer>
    </div>
  );
};

export default Map;
