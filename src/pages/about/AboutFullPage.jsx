import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";

import AboutBanner from "./Banner";
import AboutPersonalSide from "./PersonalSide";
import AboutStrengths from "./Strengths";
import AboutVisionMission from "./VissionMission";
import AboutWhatsNext from "./WhatsNext";
import Footer from "../home/Footer";
import { useGSAP } from "@gsap/react";

// Lucide Icons
import { Info, Eye, Dumbbell, Brain, FastForward } from "lucide-react";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

export default function AboutFullPage() {
  const [currentIcon, setCurrentIcon] = useState(<Info size="64" color="#fff" />);
  const [currentLabel, setCurrentLabel] = useState("About");

  const symbolRef = useRef(null);
  const sectionsRef = useRef([]);

  useGSAP(() => {
    ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.3,
      effects: true,
    });

    // Floating effect
    gsap.to(symbolRef.current, {
      y: "+=15",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2,
    });

    const icons = [
      { icon: <Info size={64} color="#fff" />, label: "About" },
      { icon: <Eye size={64} color="#fff" />, label: "Vision" },
      { icon: <Dumbbell size={64} color="#fff" />, label: "Strengths" },
      { icon: <Brain size={64} color="#fff" />, label: "Personal" },
      { icon: <FastForward size={64} color="#fff" />, label: "Next" },
    ];


    sectionsRef.current.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => switchIcon(i),
        onEnterBack: () => switchIcon(i),
      });
    });

    function switchIcon(i) {
      const { icon, label } = icons[i];

      // Animate icon wrapper
      gsap.to(symbolRef.current, {
        opacity: 0,
        scale: 0.7,
        duration: 0.25,
        ease: "power2.in",
        onComplete: () => {
          setCurrentIcon(icon);
          setCurrentLabel(label);

          gsap.to(symbolRef.current, {
            opacity: 1,
            scale: 1,
            duration: 0.4,
            ease: "back.out(1.7)",
          });
        },
      });
    }
  }, []);

  return (
    <div id="smooth-wrapper" className="relative">
      <div
        ref={symbolRef}
        className="fixed right-10 top-1/3 flex flex-col items-center z-[30] 
                  max-md:right-3 w-20"
      >
        <div className="mb-2 transition-all duration-300 drop-shadow-lg
                        max-md:scale-[0.65] max-sm:scale-[0.5]">
          {currentIcon}
        </div>

        <span className="symbol-label text-white/80 text-lg font-semibold tracking-wide
                        max-md:text-base max-sm:text-sm">
          {currentLabel}
        </span>

        <div className="w-1 h-24 bg-white/20 rounded-full mt-4
                        max-md:h-20 max-sm:h-14" />
      </div>

      <div id="smooth-content">
        <div ref={(el) => (sectionsRef.current[0] = el)}><AboutBanner /></div>
        <div ref={(el) => (sectionsRef.current[1] = el)}><AboutVisionMission /></div>
        <div ref={(el) => (sectionsRef.current[2] = el)}><AboutStrengths /></div>
        <div ref={(el) => (sectionsRef.current[3] = el)}><AboutPersonalSide /></div>
        <div ref={(el) => (sectionsRef.current[4] = el)}><AboutWhatsNext /></div>
        <Footer />
      </div>
    </div>
  );
}