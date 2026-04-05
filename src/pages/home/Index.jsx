import { useEffect, useRef } from "react";
import About from "./About";
import Highlights from "./Highlights";
import FeaturedProjects from "./Projects";
import CallToAction from "./CallToAction ";
import Footer from "./Footer";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TypingBackgroundText from "../../components/custom/TypingBackgroundText";
import ScrollFalling from "../../components/custom/ScrollFalling";
import WanderingOrb from "../../components/custom/WanderingOrb";
import Banner from "./Banner";
import { useLocation } from "react-router-dom";
import { useGSAP } from "@gsap/react";

// Register plugin once
gsap.registerPlugin(ScrollTrigger, useGSAP);

function Home() {
  const aboutRef = useRef(null);

  const location = useLocation();

  useGSAP(() => {
    gsap.defaults({ ease: "power3.out", duration: 1 });
    ScrollTrigger.defaults({ toggleActions: "restart reverse none none", markers: false, start: "top 80%" });
  }, []);

  // SPA-safe refresh
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      ScrollTrigger.refresh();
    });
    return () => cancelAnimationFrame(raf);
  }, [location]);

  return (
    <>
      <div className="relative w-full h-full">
        <TypingBackgroundText key={location.pathname}>
          <div className="relative z-10">
            <Banner />
            <About ref={aboutRef} />
            <Highlights />
            <FeaturedProjects />
            <CallToAction />
            <Footer />
          </div>
        </TypingBackgroundText>
      </div>
    </>
    );
}

export default Home;
