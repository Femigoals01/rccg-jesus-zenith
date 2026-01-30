import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutSection from "../components/AboutSection";
import PastorSection from "../components/PastorSection";
import WorshipSection from "../components/WorshipSection";
import LiveStreamSection from "../components/LiveStreamSection";
import MinistriesSection from "../components/MinistriesSection";
import GivingSection from "../components/GivingSection";
import Footer from "../components/Footer";

import UpcomingProgramsSection from "../components/UpcomingProgramsSection";
import OutreachSection from "../components/OutreachSection";
import NewHereSection from "../components/NewHereSection";
import TestimoniesSection from "../components/TestimoniesSection";





export default function Page() {
  return (
    <>
      <Navbar />
      <Hero />
      {/* <NewHereSection />  */}
      <AboutSection />
      
    
      {/* <PastorSection /> */}
      <WorshipSection />
      <LiveStreamSection />
      <TestimoniesSection />
      <UpcomingProgramsSection />
      <OutreachSection />
      
      <MinistriesSection />
      <GivingSection />
      <Footer />
    </>
  );
}
