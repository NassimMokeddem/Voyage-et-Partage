import React, { useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as L from "leaflet";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

const RouteLayer = ({ accessToken, start, end }) => {
  const map = useMap();

  L.marker([15.966636, -61.653889])
  .bindPopup(`
    <div>
      <h3>Nom du lieu</h3>
      <p>Ceci est une description du lieu.</p>
      <a href="https://www.iles.com/images/main/guadeloupe.jpg" target="_blank">
        <img src="https://www.iles.com/images/main/guadeloupe.jpg" alt="Description du lieu" style="width:100%;border-radius:8px;">
      </a>
    </div>
  `)
  .bindTooltip("Test", { permanent: true, direction: "auto" })
  .addTo(map);

  useEffect(() => {
    const addRoute = async () => {
      try {
        const coordinates = `${start.join()};${end.join()}`;
        // const response = await fetch(
        //   `https://api.jawg.io/routing/route/v1/car/${coordinates}?alternatives=false&geometries=geojson&overview=full&access-token=${accessToken}`
        // );
        const data = await response.json();

        if (data.routes && data.routes.length > 0) {
          const route = data.routes[0].geometry;

          const mainRouteLayer = L.geoJSON(route, {
            style: {
              color: "#13BBFA",
              weight: 4,
              opacity: 0.8,
            },
          });

          const caseLayer = L.geoJSON(route, {
            style: {
              color: "#4D93E3",
              weight: 6,
              opacity: 0.6,
            },
          });

          caseLayer.addTo(map);
          mainRouteLayer.addTo(map);

          const startEndLayer = L.geoJSON(
            {
              type: "MultiPoint",
              coordinates: [
                route.coordinates[0],
                route.coordinates[route.coordinates.length - 1],
              ],
            },
            {
              pointToLayer: (feature, latlng) => {
                return L.circleMarker(latlng, {
                  radius: 8,
                  fillColor: "#13BBFA",
                  color: "#4D93E3",
                  weight: 3,
                  opacity: 1,
                  fillOpacity: 0.9,
                });
              },
            }
          );

          startEndLayer.addTo(map);

          map.fitBounds(mainRouteLayer.getBounds());
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout de l'itinéraire :", error);
      }
    };

    addRoute();
  }, [accessToken, start, end, map]);

  return null;
};

const Map = () => {
  const accessToken = "31JhO7BoVix0fm9Kn4N91xaLyFspUroEOgrZNaQLIW0bgxoXTC0NhgPbeHmD24Me";
  const start = [2.3522, 48.8566]; // Paris [lng, lat]
  const end = [5.3698, 43.2965]; // Marseille [lng, lat]

  return (
    <div>
      <select>
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
        {}
        <RouteLayer accessToken={accessToken} start={start} end={end} />
      </MapContainer>
    </div>
  );
};

export default Map;