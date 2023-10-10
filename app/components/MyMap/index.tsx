import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import L from "leaflet";
import Link from "next/link";

const locations = [
  { name: "Kayole", coordinates: [-1.2801, 36.9057], link: "/kayole1" },
  { name: "Masimba", coordinates: [-1.2779, 36.8995], link: "/kayole2" },
  { name: "Kayole1", coordinates: [-1.2825, 36.8948], link: "/kayole3" },
  { name: "Nairobi", coordinates: [-1.2921, 36.8219], link: "/nairobi1" },
  { name: "Nairobi", coordinates: [-1.2833, 36.8172], link: "/nairobi2" },
  { name: "Nairobi", coordinates: [-1.2744, 36.8131], link: "/nairobi3" },
];

const blueIcon = new L.Icon({
  iconUrl: "location.svg",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MyMap = () => {
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
          <Marker key={index}    position={[location.coordinates[0], location.coordinates[1]]} icon={blueIcon}>
            <Popup>
              {location.name}
              <br />
              <Link href="/overview">Go to Page</Link>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MyMap;
