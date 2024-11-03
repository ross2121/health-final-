import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/HeroSection";
import Services from "@/components/Services";
import Statistics from "@/components/Statistics";

export default function Home() {
  return (
    <div className="bg-white text-gray-900 mx-auto">
      <Header />
      <Hero />
      <Services />
      <Statistics />
      <Footer />
    </div>
  );
}
