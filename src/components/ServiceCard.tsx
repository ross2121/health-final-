import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link"; // Import Link from Next.js

type ServiceCardProps = {
  title: string;
  description: string;
  bgColor: string;
  image: string;
  link: string; // Ensure link prop is included
};

export default function ServiceCard({
  title,
  description,
  bgColor,
  image,
  link
}: ServiceCardProps) {
  return (
    <Link href={link} passHref>
      <div
        className={`rounded-lg ${bgColor} text-white w-80 h-[27rem] px-5 pt-3 pb-5 cursor-pointer`} // Add cursor-pointer for better UX
      >
        <div className="mt-5">
          <div className="w-52 h-36">
            <h3 className="text-4xl font-bold text-[#252B61]">{title}</h3>
          </div>
          <p className="mt-2 text-xl text-[#252B61]">{description}</p>
        </div>
        <div className="flex justify-between items-center mt-4 h-56">
          <div className="flex items-center">
            <ChevronsRight className="h-10 w-10 text-black" />
          </div>
          <Image
            src={image}
            alt="Service image"
            width={150}
            height={150}
            className="object-contain"
          />
        </div>
      </div>
    </Link>
  );
}