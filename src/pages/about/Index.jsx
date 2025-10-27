import { useRef } from "react";
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

gsap.registerPlugin(ScrollTrigger, ScrollSmoother);

const AboutPage = () => {
  const symbolRef = useRef(null);
  const iconTextRef = useRef(null);
  const sectionsRef = useRef([]);

  useGSAP(() => {
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.3,
      effects: true,
    });

    const symbol = symbolRef.current;
    const iconText = iconTextRef.current;
    const sections = sectionsRef.current;

    const icons = [
      { symbol: "ℹ️", label: "About" },
      { symbol: "🎯", label: "Vision" },
      { symbol: "💪", label: "Strengths" },
      { symbol: "🧠", label: "Personal" },
      { symbol: "⏭️", label: "Next" },
    ];

    // Floating animation (gentle up-down motion)
    gsap.to(symbol, {
      y: "+=15",
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 2,
    });

    // Trigger icon changes when sections enter view
    sections.forEach((section, i) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onEnter: () => switchIcon(i),
        onEnterBack: () => switchIcon(i),
      });
    });

    function switchIcon(i) {
      const { symbol: newIcon, label } = icons[i];

      // Fade + scale transition for icon
      gsap.to(iconText, {
        opacity: 0,
        scale: 0.6,
        duration: 0.3,
        ease: "power2.in",
        onComplete: () => {
          iconText.innerText = newIcon;
          gsap.to(iconText, {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            ease: "back.out(1.7)",
          });
        },
      });

      // Animate label text
      const labelEl = document.querySelector(".symbol-label");
      gsap.to(labelEl, {
        opacity: 0,
        y: 10,
        duration: 0.2,
        ease: "power1.in",
        onComplete: () => {
          labelEl.innerText = label;
          gsap.to(labelEl, {
            opacity: 1,
            y: 0,
            duration: 0.4,
            ease: "power1.out",
          });
        },
      });
    }
  }, []);

  return (
    <>
    <div id="smooth-wrapper" className="relative">
      {/* 🧭 Floating Symbol OUTSIDE scroll-smooth content */}
      <div
        ref={symbolRef}
        className="fixed right-10 top-1/3 flex flex-col items-center z-[999] max-md:right-3"
      >
        <div
          ref={iconTextRef}
          className="text-5xl mb-2 drop-shadow-lg transition-all duration-300 max-md:text-3xl max-md:mb-1"
        >
          ℹ️
        </div>
        <span className="symbol-label text-white/80 text-lg font-semibold tracking-wide">
          About
        </span>
        <div className="w-1 h-24 bg-white/20 rounded-full mt-4" />
      </div>

      {/* Smooth Scroll Content */}
      <div id="smooth-content" className="relative">
        <div ref={(el) => (sectionsRef.current[0] = el)}>
          <AboutBanner />
        </div>

        <div ref={(el) => (sectionsRef.current[1] = el)}>
          <AboutVisionMission />
        </div>

        <div ref={(el) => (sectionsRef.current[2] = el)}>
          <AboutStrengths />
        </div>

        <div ref={(el) => (sectionsRef.current[3] = el)}>
          <AboutPersonalSide />
        </div>

        <div ref={(el) => (sectionsRef.current[4] = el)}>
          <AboutWhatsNext />
        </div>

        <Footer />
      </div>
    </div></>
  );
};

export default AboutPage;
