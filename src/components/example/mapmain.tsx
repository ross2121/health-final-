"use client";
import { Map } from "../map/map";
import { Marker } from "../map/mapmarker";
import { Panel } from "../map/panel";
import { DefaultZoomControls } from "../map/zoomcontrol";
import { CenterOfMap } from "../map/zoomcontrol";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import "@/components/map/map.css";
import { Input } from "./input";
import { Label } from "@radix-ui/react-label";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { useMap } from "react-map-gl";
import { SearchPlace } from "../map/searchplaces";


export const HospitalForm = () => {
  const [form, setForm] = useState({
    patient_email: "",
    Name: "",
    Disease: "",
    Precaution: "",
    Severe: "",
    Address: "",
    Pincode:"",
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(false);
 
  const [error, setError] = useState("");
  const router = useRouter();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    const email=localStorage.getItem("user");
   
    const formWithAdminEmail = {
        ...form,
        admin_email: email ?? "", 
          };

    try {
      const response = await axios.post("/api/hospital", formWithAdminEmail
      );
      if (response.status === 200) {
        router.push("/admin/hos");
      }
    } catch (error) {
      setError("Form submission failed. Please try again later.");
      console.log(error);
    } finally {

      setLoading(false);
    }
  };

  const handleDragEnd = ({ lngLat }: { lngLat: { lat: number; lng: number } }) => {
    const { lat, lng } = lngLat;
    setForm((prevForm) => ({
      ...prevForm,
      lat: parseFloat(lat.toFixed(6)),
      lng: parseFloat(lng.toFixed(6)),
    }));
  };

  

  const openInMaps = () => {
    if (form.lat && form.lng) {
      const googleMapsUrl = `https://www.google.com/maps?q=${form.lat},${form.lng}`;
      window.open(googleMapsUrl, "_blank");
    } else {
      setError("No location marked yet.");
    }
  };

  return (
    <div className="grid gap-3 md:grid-cols-2">
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-2">
          <div className="grid grid-cols-2 gap-2">
            <LabelInputContainer>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Tyler"
                type="text"
                value={form.Name}
                onChange={(e) => setForm({ ...form, Name: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="id">Email</Label>
              <Input
                id="id"
                placeholder="1"
                type="text"
                value={form.patient_email}
                onChange={(e) => setForm({ ...form, patient_email: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="Disease">Disease</Label>
              <Input
                id="Disease"
                placeholder="Typhoid"
                type="text"
                value={form.Disease}
                onChange={(e) => setForm({ ...form, Disease: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Sriram colony"
                type="text"
                value={form.Address}
                onChange={(e) => setForm({ ...form, Address: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
         
            <LabelInputContainer>
              <Label htmlFor="precaution">Precaution</Label>
              <Input
                id="precaution"
                placeholder="Stay at home"
                type="text"
                value={form.Precaution}
                onChange={(e) => setForm({ ...form, Precaution: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="severe">Severe</Label>
              <Input
                id="severe"
                placeholder="High alert"
                type="text"
                value={form.Severe}
                onChange={(e) => setForm({ ...form, Severe: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
            <LabelInputContainer>
              <Label htmlFor="pincode">PinCode</Label>
              <Input
                id="pincode"
                placeholder="282007"
                type="text"
                value={form.Pincode}
                onChange={(e) => setForm({ ...form, Pincode: e.target.value })}
                className="text-black"
                disabled={loading}
              />
            </LabelInputContainer>
          </div>
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </Button>
        {error && <p className="text-red-500">{error}</p>}
      </form>

      <div>
        <Map>
          <Marker
            latitude={form.lat || 0}
            longitude={form.lng || 0}
            draggable
            onDragEnd={handleDragEnd}
          />
          <Panel>
            <SearchBox
              onChange={({ lat, lng }) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  lat: parseFloat(lat.toFixed(6)),
                  lng: parseFloat(lng.toFixed(6)),
                }));
              }}
            />
            <DefaultZoomControls />
            <CenterOfMap
              onClick={(latLng) => {
                const lat = parseFloat(latLng.lat.toFixed(6));
                const lng = parseFloat(latLng.lng.toFixed(6));
                setForm((prevForm) => ({
                  ...prevForm,
                  lat,
                  lng,
                }));
              }}
            />
          </Panel>
        </Map>
        <Button onClick={openInMaps} type="button" className="mt-3">
          Open in Maps
        </Button>
      </div>
    </div>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};

export function SearchBox({
  onChange,
}: {
  onChange: ({ lat, lng }: { lat: number; lng: number; }) => void;
}) {
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
        } } />
    </div>
  );
}
