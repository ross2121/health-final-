"use client";
import React, {  useState } from "react";
import Map, { Marker, NavigationControl } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import axios from "axios";
import { Input } from "./input";
import { Button } from "./button";

const MAPBOX_TOKEN = "pk.eyJ1IjoiY2hyaXN3aG9uZ21hcGJveCIsImEiOiJjbDl6bzJ6N3EwMGczM3BudjZmbm5yOXFnIn0.lPhc5Z5H3byF_gf_Jz48Ug"; 

const GoogleMaps = () => {
  const [postalPin, setPostalPin] = useState("");
  const [patientName, setPatientName] = useState("");
  const [diseaseName, setDiseaseName] = useState("");
  const [markerPosition, setMarkerPosition] = useState<[number, number] | null>(
    null
  );

  const geocodePostalPin = async (postalPin: string) => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search`,
        {
          params: {
            q: postalPin,
            format: "json",
          },
        }
      );

      if (response.data.length > 0) {
        const { lat, lon } = response.data[0];
        return { lat: parseFloat(lat), lng: parseFloat(lon) };
      } else {
        alert("Postal pin not found");
      }
    } catch (error) {
      console.error("Geocoding failed", error);
    }
    return null;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const coordinates = await geocodePostalPin(postalPin);
    if (coordinates) {
      setMarkerPosition([coordinates.lat, coordinates.lng]);
    }
  };

  return (
    <div className="relative h-screen w-full">
      <nav className="bg-gray-800 p-4 text-white flex justify-between items-center">
        <form onSubmit={handleFormSubmit} className="flex space-x-4">
          <div>
            <label htmlFor="patient-name" className="sr-only">
              Patient Name
            </label>
            <Input
              id="patient-name"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              placeholder="Patient name"
              className="bg-gray-200 p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="disease-name" className="sr-only">
              Disease Name
            </label>
            <Input
              id="disease-name"
              value={diseaseName}
              onChange={(e) => setDiseaseName(e.target.value)}
              placeholder="Disease name"
              className="bg-gray-200 p-2 rounded"
            />
          </div>
          <div>
            <label htmlFor="postal-pin" className="sr-only">
              Postal Pin
            </label>
            <Input
              id="postal-pin"
              value={postalPin}
              onChange={(e) => setPostalPin(e.target.value)}
              placeholder="Postal pin"
              className="bg-gray-200 p-2 rounded"
            />
          </div>
          <Button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Submit
          </Button>
        </form>
      </nav>

      {/* Full Page Map Container */}
      <div className="absolute inset-0">
        <Map
          initialViewState={{
            latitude: 39.6013, 
            longitude: -9.0698,
            zoom: 5,
          }}
          style={{ width: "100%", height: "100%" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          <NavigationControl position="top-left" />
          {markerPosition && (
            <Marker
              latitude={markerPosition[0]}
              longitude={markerPosition[1]}
              anchor="bottom"
            >
              <img
                src="/path-to-your-custom-marker-image.png"
                alt="Custom Marker"
                style={{ width: "40px", height: "40px" }}
              />
            </Marker>
          )}
        </Map>
      </div>
    </div>
  );
};

export default GoogleMaps;
