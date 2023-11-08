'use client'
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import SingleHousehold from "../singleHousehold";

const blueIcon = new L.Icon({
  iconUrl: "locationRed.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
interface LocationData {
  id: number;
  name: string;
  coordinates: [number, number];
}
const MyMap = () => {
  const [showOverview, setShowOverview] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const [locations, setLocations] = useState<LocationData[]>([]);
  const openOverview = (location: LocationData) => {
    setSelectedLocation(location);
    setShowOverview(true);
  };
  const closeOverview = () => {
    setSelectedLocation(null);
    setShowOverview(false);
  };
  useEffect(() => {
    fetch("https://qemer-backend-764e0de661a5.herokuapp.com/api/guardians/")
      .then((response) => response.json())
      .then((data) => {
        const newLocations = data.map((item: any, index: number) => {
          const coordinates = item.location ? item.location.split(", ").map(Number) : null;
          if (coordinates && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
            const paddedId = (index + 1).toString().padStart(3, '0');
            return {
              id: item.id,
              name: paddedId,
              coordinates: coordinates as [number, number],
            };
          }
          return null;
        });
        if (newLocations.length === data.length) {
          setLocations(newLocations.filter(Boolean));
        } else {
          console.error("Number of valid locations does not match the response length.");
        }
      })
      .catch((error) => {
        console.error("Error fetching location data:", error);
      });
  }, []);

  const customGeocoder = async (latlng: any[]) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latlng[0]}&lon=${latlng[1]}`);
      const data = await response.json();
      return data.display_name;
    } catch (error) {
      console.error("Geocoding error:", error);
      return "Location not found";
    }
  };
  return (
    <div style={{ height: "800px", width: "90%", display: "flex", justifyContent: "center", alignItems: "center" }}>
      <MapContainer
        center={[-1.2921, 36.8219]}
        zoom={12}
        maxZoom={18}
        minZoom={10}
        scrollWheelZoom={true}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((location) => (
          <Marker key={location.id} position={location.coordinates} icon={blueIcon}>
            <Popup>
              {location.name}
              <br />
              <button onClick={() => openOverview(location)}>Show Overview</button>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {showOverview && selectedLocation && (
        <SingleHousehold location={selectedLocation} onClose={closeOverview} householdId={selectedLocation.id} />
      )}

    </div>
  );
};
export default MyMap;

