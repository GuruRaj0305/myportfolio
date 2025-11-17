import { useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import { useGSAP } from "@gsap/react";

import { Cog, Laptop, Rocket, BrainCircuit, Puzzle, Package } from "lucide-react";

gsap.registerPlugin(TextPlugin);

const SkillsProjectsBanner = () => {
  const headingRef = useRef(null);
  const subHeadingRef = useRef(null);
  const lineRef = useRef(null);
  const iconsRef = useRef([]);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.fromTo(
      headingRef.current,
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 1.2 }
    )
      .fromTo(
        lineRef.current,
        { width: 0 },
        { width: "6rem", duration: 0.6 },
        "-=0.8"
      )
      .fromTo(
        subHeadingRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1 },
        "-=0.4"
      )
      .fromTo(
        iconsRef.current,
        { opacity: 0, y: 15, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
        },
        "-=0.3"
      );
  }, []);

  const icons = [Cog, Laptop, Rocket, BrainCircuit, Puzzle, Package];

  return (
    <section className="min-h-screen flex flex-col justify-center items-center text-center">
      {/* Main Heading */}
      <h1
        ref={headingRef}
        className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-wide"
      >
        Skills & Projects
      </h1>

      {/* Accent Line */}
      <div
        ref={lineRef}
        className="h-1 bg-cyan-400 rounded-full mb-5"
        style={{ width: 0 }}
      ></div>

      {/* Subheading */}
      <p
        ref={subHeadingRef}
        className="text-lg sm:text-xl text-gray-300 max-w-2xl leading-relaxed mb-10"
      >
        Showcasing my expertise in crafting scalable, performant, and intelligent
        systems — blending development skills with impactful projects.
      </p>

      {/* Floating Tech Icons */}
      <div className="flex gap-4 sm:gap-6 justify-center flex-wrap">
        {icons.map((Icon, i) => (
          <div
            key={i}
            ref={(el) => (iconsRef.current[i] = el)}
            className="text-3xl sm:text-4xl drop-shadow-lg bg-white/10 rounded-2xl p-3 backdrop-blur-md hover:scale-110 transition-transform duration-300"
          >
            <Icon size={36} strokeWidth={1.8} color="white" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsProjectsBanner;
