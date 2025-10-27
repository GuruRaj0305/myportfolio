import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutVisionMission = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    const cards = el.querySelectorAll(".card");
    const headingLetters = headingRef.current.querySelectorAll("span");

    // Initial states
    gsap.set(cards, { opacity: 0, y: 120, scale: 0.9, rotateX: 15 });
    gsap.set(headingLetters, { opacity: 0, y: 40 });

    // Animate heading letters (smooth rise)
    gsap.to(headingLetters, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power3.out",
      stagger: 0.05,
      scrollTrigger: {
        trigger: el,
        start: "top 90%",
      },
    });

    // Animate cards with depth & glow
    gsap.to(cards, {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      boxShadow: "0 0 40px rgba(59,130,246,0.25)",
      duration: 1.5,
      ease: "power4.out",
      stagger: 0.3,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 60%",
        toggleActions: "play none none reverse",
      },
      onComplete: () => {
        // Gentle floating motion
        cards.forEach((card, i) => {
          gsap.to(card, {
            y: "+=10",
            repeat: -1,
            yoyo: true,
            duration: 3 + i,
            ease: "sine.inOut",
          });
        });
      },
    });

    // Parallax drift effect
    gsap.to(cards, {
      yPercent: -10,
      ease: "none",
      scrollTrigger: {
        trigger: el,
        scrub: 1,
      },
    });
  }, []);

  // Split heading text into letters
  const splitHeading = (text) =>
    text.split("").map((char, i) => (
      <span key={i} className="inline-block">
        {char === " " ? "\u00A0" : char}
      </span>
    ));

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-16 overflow-hidden"
    >
      {/* Subtle glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.07),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <h2
          ref={headingRef}
          className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-wide"
        >
          {splitHeading("Vision & Mission")}
        </h2>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Vision */}
          <div className="card bg-gray-800/40 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-500">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              Vision
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {ABOUT.vission}
            </p>
          </div>

          {/* Mission */}
          <div className="card bg-gray-800/40 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-8 shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_50px_rgba(59,130,246,0.5)] transition-all duration-500">
            <h3 className="text-2xl font-semibold text-blue-400 mb-4">
              Mission
            </h3>
            <p className="text-gray-300 text-lg leading-relaxed">
              {ABOUT.mission}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutVisionMission;
