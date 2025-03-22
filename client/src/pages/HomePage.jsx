import { Footer } from "@/components";
import NavBar from "@/components/Header/Nav/NavBar";
import { FAQ } from "@/components/Home/FAQ";
import { Hero } from "@/components/Home/Hero";
import { AvailablePets } from "@/components/Home/Petcard";
import { Services } from "@/components/Home/Services";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <AvailablePets />
      <Services/>
      <FAQ />
      <Footer/>
    </>
  );
};

export default HomePage;
