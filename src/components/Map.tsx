"use client";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Define interface for a VaccinationCenter
interface VaccinationCenter {
  id: number;
  name: string;
  position: [number, number];
}

// Define the props type
interface MapComponentProps {
  vaccinationCenters: VaccinationCenter[];
}

// Custom marker icon (optional)
const defaultIcon = new L.Icon({
  iconUrl: "/assets/vaccination.png", // Ensure this path points to the correct location
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const MapComponent: React.FC<MapComponentProps> = ({ vaccinationCenters }) => {
  const [isMounted, setIsMounted] = useState(false);

  // Make sure to only render the map on the client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div>Loading map...</div>; // Placeholder while map loads
  }

  return (
    <div style={{ height: "900px", width: "100%" }}>
      <MapContainer
        center={[51.505, -0.09]} // Initial center of the map
        zoom={13} // Initial zoom level
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {vaccinationCenters.map((center) => (
          <Marker key={center.id} position={center.position} icon={defaultIcon}>
            <Popup>
              {center.name} <br /> Coordinates: {center.position.join(", ")}
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
