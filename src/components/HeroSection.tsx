import { MoveRight } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <div className="bg-[#252B61] relative overflow-hidden w-[110rem] mx-auto rounded-3xl">
      <div className="flex justify-center">
        <h1 className="text-[#92BDF6] text-[18rem] font-semibold tracking-wide">
          Healthcare
        </h1>
      </div>
      <div className="relative mt-[-19rem] flex justify-center">
        <Image
          src="/assets/doctor.png"
          alt="Doctor"
          width={400}
          height={400}
          className="object-contain"
        />
      </div>
      <div className="absolute bottom-8 right-8 flex items-center gap-5">
        <button className="bg-[#E7C2D4] font-semibold text-xl h-14 px-5 rounded-full">
          Book Consultation
        </button>
        <div className="bg-[#E7C2D4] flex justify-center items-center rounded-full w-12 h-12">
          <MoveRight />
        </div>
      </div>
    </div>
  );
}
