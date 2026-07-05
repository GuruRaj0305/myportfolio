import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutStrengths = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    const cards = el.querySelectorAll(".strength-card");

    gsap.set(cards, { opacity: 0, y: 50 });

    gsap.to(cards, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      ease: "power3.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  const strengths = ABOUT.strengths;

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-16 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center relative z-10">
        <span className="section-heading mb-4">What I Bring</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-wide">
          Strengths
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(strengths).map(([key, value], index) => (
            <div
              key={index}
              className="strength-card group bg-gray-800/40 border border-gray-700/40 rounded-2xl p-8 text-left transition-all duration-500 transform hover:-translate-y-2"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-3 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h3>
              <p className="text-gray-300 leading-relaxed">{value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStrengths;
