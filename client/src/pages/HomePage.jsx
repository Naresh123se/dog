import { Footer } from "@/components";
import NavBar from "@/components/Header/Nav/NavBar";
import { AvailablePets } from "@/components/Home/AvailablePets";
import { FAQ } from "@/components/Home/FAQ";
import { Hero } from "@/components/Home/Hero";
import { Services } from "@/components/Home/Services";
import { Testimonial } from "@/components/Landing";

import ScrollToTop from "@/components/ScrollToTop";

const HomePage = () => {
  return (
    <>
      <NavBar />
      <Hero />
      <AvailablePets />
      <Services/>
      <FAQ />
      <Testimonial/>
      <Footer/>
      <ScrollToTop/>
    </>
  );
};

export default HomePage;
