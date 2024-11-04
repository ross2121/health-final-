// import MapComponent from "@/components/Map";
import dynamic from "next/dynamic";
const MapComponent = dynamic(() => import("../../../../components/Map"), {
  ssr: false,
});
const vaccinationCenters = [
  { id: 1, name: "Health Facility 1", position: [51.505, -0.09] },
  { id: 2, name: "Health Facility 2", position: [51.51, -0.1] },
  { id: 3, name: "Health Facility 3", position: [51.51, -0.12] },
];
const VaccinationCenters = () => {
  return (
    <div>
      <div className="container mx-auto p-8">
        <h1 className="text-4xl font-bold">
          Vaccination Centers and Health Facilities
        </h1>
        <p className="mt-4">
          Find nearby vaccination centers and schedule appointments.
        </p>

        {/* Map integration and list of health facilities */}
        <div className="w-[1000px]">
          <MapComponent vaccinationCenters={vaccinationCenters} />
        </div>
      </div>
    </div>
  );
};
export default VaccinationCenters;
