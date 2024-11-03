// components/Services.js
import ServiceCard from "./ServiceCard";

export default function Services() {
  return (
    <div className="flex gap-10 justify-center items-center my-10">
      <ServiceCard
      link="/admin/hospital"
        title="UPLOAD PATIENT DETAILS"
        description="Connect with a doctor."
        bgColor="bg-[#A3DAC2]"
        image="/assets/phone2.png"
      />
      <ServiceCard
      link="/admin/hos"
        title="ALL THE ACTIVE PATIENT NEAR YOU"
        description="Certified Appointments."
        bgColor="bg-[#F0DA69]"
        image="/assets/laptop2.png"
          
      />
      <ServiceCard
      link="/"
        title="24/7 Medicine"
        description="Emergency at Your Doorstep.  COMING SOON"
        bgColor="bg-[#E7C2D4]"
        image="/assets/horse2.png"
      />
      <ServiceCard
      link="/"
        title="Lab Tests"
        description="Sample Collection at Home. COMING SOON"
        bgColor="bg-[#92BDF6]"
        image="/assets/plane2.png"
      />
    </div>
  );
}
