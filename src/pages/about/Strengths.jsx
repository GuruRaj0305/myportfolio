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

    gsap.set(cards, { opacity: 0, x: -100, y: 80, rotateY: -15 });

    gsap.to(cards, {
      opacity: 1,
      x: 0,
      y: 0,
      rotateY: 0,
      duration: 1.4,
      ease: "power4.out",
      stagger: 0.2,
      scrollTrigger: {
        trigger: el,
        start: "top 80%",
        end: "bottom 70%",
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
      {/* Background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.05),transparent_75%)] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 tracking-wide">
          Strengths
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {Object.entries(strengths).map(([key, value], index) => (
            <div
              key={index}
              className="strength-card group bg-gray-800/40 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-8 text-left shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition-all duration-500 transform hover:-translate-y-2 hover:rotate-1"
            >
              <h3 className="text-xl font-semibold text-blue-400 mb-3 capitalize">
                {key.replace(/([A-Z])/g, " $1")}
              </h3>
              <p className="text-gray-300 leading-relaxed">{value}</p>

              {/* Glow pulse */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 bg-blue-500 blur-2xl transition duration-500 rounded-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStrengths;
