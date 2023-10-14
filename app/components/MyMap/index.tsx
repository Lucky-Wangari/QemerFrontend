import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import React, { useEffect, useState } from "react";
import Overview from "./overview";
const blueIcon = new L.Icon({
  iconUrl: "location.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
interface LocationData {
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
        const newLocations = data.map((item: any) => {
          const coordinates = item.location ? item.location.split(", ").map(Number) : null;
          if (coordinates && !isNaN(coordinates[0]) && !isNaN(coordinates[1])) {
            return {
              name: item.parent_name,
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
        {locations.map((location, index) => (
          <Marker key={index} position={location.coordinates} icon={blueIcon}>
            <Popup>
              {location.name}
              <br />
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};
export default MyMap;