"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Map, {
  Marker,
  NavigationControl,
  GeolocateControl,
  Popup,
  useMap,
} from "react-map-gl";
import { Button } from "./button";
import { SearchPlace } from "../map/searchplaces";
import "@/components/map/map.css";

interface Hospital {
  id: string;
  name: string;
  lat: number;
  lng: number;
  address: string;
  patient_email: string;
  Name: string;
  Disease: string;
  Address: string;
  Severe: string;
}

export const HospitalMap = () => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(
    null
  );
  const [error, setError] = useState("");
  const { current: map } = useMap();

  let email: string | null;
  if (typeof window !== "undefined") {
    email = window.localStorage.getItem("user");
  }

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        if (email != null) {
          const response = await axios.get(`/api/hos?email=${email}`);
          setHospitals(response.data.admin);
          console.log(response.data);
        }
      } catch (error) {
        setError("Failed to fetch hospital data. Please try again later.");
        console.log(error);
      }
    };
    fetchHospitals();
  }, []);

  const handleLocationChange = ({ lat, lng }: { lat: number; lng: number }) => {
    map?.flyTo({
      center: { lat, lng },
      essential: true,
    });
  };

  return (
    <div className="w-full h-full">
      <div>
        <Map
          initialViewState={{
            latitude: 20, // Default latitude
            longitude: 78, // Default longitude
            zoom: 10,
          }}
          style={{ width: "80vw", height: "500px" }}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          mapboxAccessToken="pk.eyJ1IjoiaWFta2FydGhpY2siLCJhIjoiY2t4b3AwNjZ0MGtkczJub2VqMDZ6OWNrYSJ9.-FMKkHQHvHUeDEvxz2RJWQ"
          onClick={() => setSelectedHospital(null)} // Close popup when clicking on the map
        >
          {hospitals.map((hospital) => (
            <Marker
              key={hospital.id}
              latitude={hospital.lat}
              longitude={hospital.lng}
              anchor="bottom"
              onClick={(e) => {
                e.originalEvent.stopPropagation(); // Prevent map click event from closing the popup
                setSelectedHospital(hospital);
                console.log(selectedHospital); // Set selected hospital to show popup
              }}
            />
          ))}

          {selectedHospital && (
            <Popup
              latitude={selectedHospital.lat}
              longitude={selectedHospital.lng}
              onClose={() => setSelectedHospital(null)}
              closeOnClick={false}
              anchor="top"
            >
              <div className="p-2 w-72 h-60 text-black">
                <h3 className="text-lg font-semibold">
                  {selectedHospital.Name}
                </h3>
                <h2>{selectedHospital.Disease}</h2>
                <p>{selectedHospital.Address}</p>
                <p>{selectedHospital.Severe}</p>
                <p> {selectedHospital.patient_email}</p>
              </div>
            </Popup>
          )}

          <NavigationControl position="top-left" />
          <GeolocateControl position="top-left" />

          <div className="absolute top-10 left-28">
            <SearchBox onChange={handleLocationChange} />
          </div>
        </Map>
        <Button
          onClick={() => window.open("https://www.google.com/maps", "_blank")}
          type="button"
          className="mt-3"
        >
          Open in Google Maps
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
};

export const SearchBox = ({
  onChange,
}: {
  onChange: ({ lat, lng }: { lat: number; lng: number }) => void;
}) => {
  const { current: map } = useMap();
  return (
    <div className="mid">
      <SearchPlace
        onLocationChange={(locationInfo) => {
          const lat = locationInfo.latitude;
          const lng = locationInfo.longitude;
          onChange({ lat, lng });

          map?.flyTo({
            center: { lat, lng },
            essential: true,
          });
        }}
      />
    </div>
  );
};
