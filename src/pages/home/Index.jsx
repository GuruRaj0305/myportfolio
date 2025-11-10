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
import JetFly from "../../components/custom/JetFly";
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
      <JetFly>
        <ScrollFalling>
          <div className="relative w-full h-full">
            {/* Blurred background layer */}
            <TypingBackgroundText key={Math.random()}>
              {/* Foreground content */}
              <div className="relative z-10 ">
                <div className="w-full flex flex-col ">
                  <Banner />
                </div>
                <About ref={aboutRef} /> 
                <Highlights aboutRef={aboutRef} /> 
                <FeaturedProjects />

                <div className="flex justify-center align-middle max-md:flex-col ">
                  <CallToAction />
                  <div className="my-auto ">
                    <Footer />
                  </div>
                </div>
              </div>
            </TypingBackgroundText>
          </div>
        </ScrollFalling>
      </JetFly>
    </>
  );
}

export default Home;
