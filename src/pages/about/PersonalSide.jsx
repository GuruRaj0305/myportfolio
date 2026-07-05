import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutPersonalSide = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    const items = el.querySelectorAll(".personal-item");

    // Set initial state
    gsap.set(items, { opacity: 0, y: 40 });

    // Animate on scroll
    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none reverse",
      },
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 md:px-16 text-center overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <span className="section-heading mb-4">Beyond Code</span>
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-14 tracking-wide">
          Personal Side
        </h2>

        <p className="text-gray-400 text-lg mb-10">
          Beyond coding and technology, I believe in staying curious, balanced,
          and constantly inspired. Here’s a glimpse of what keeps me going:
        </p>

        <ul className="space-y-6 text-left md:text-center">
          {ABOUT.personalSide.map((item, index) => (
            <li
              key={index}
              className="personal-item bg-gray-800/40 backdrop-blur-lg border border-gray-700/40 rounded-xl p-5 text-gray-300 text-lg shadow-[0_0_20px_rgba(0,0,0,0.4)] hover:shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.4)] hover:text-blue-300 transition-all duration-500 transform hover:-translate-y-1"
            >
              ✦ {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default AboutPersonalSide;
