import AboutBanner from "./Banner";
import AboutPersonalSide from "./PersonalSide";
import AboutStrengths from "./Strengths";
import AboutVisionMission from "./VissionMission";
import AboutWhatsNext from "./WhatsNext";
import Footer from "../home/Footer";
import RouteAtmosphere from "../../components/custom/RouteAtmosphere";

export default function AboutFullPage() {
  return (
    <div className="editorial-page about-editorial-page">
      <RouteAtmosphere variant="about" />
      <AboutBanner />
      <AboutVisionMission />
      <AboutStrengths />
      <AboutPersonalSide />
      <AboutWhatsNext />
      <Footer />
    </div>
  );
}
