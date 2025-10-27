import {  useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ABOUT } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const AboutWhatsNext = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    const items = el.querySelectorAll(".next-item");

    // Subtle rise-in animation
    gsap.set(items, { opacity: 0, y: 80, scale: 0.95 });
    gsap.to(items, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 1.4,
      stagger: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        end: "bottom 70%",
        toggleActions: "play none none reverse",
      },
    });

    // Floating effect for “forward motion” feeling
    gsap.to(items, {
      y: "+=10",
      repeat: -1,
      yoyo: true,
      duration: 3,
      ease: "sine.inOut",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-28 px-6 md:px-16 bg-gradient-to-b text-center overflow-hidden"
    >
      {/* Futuristic ambient glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)] pointer-events-none"></div>

      <div className="max-w-4xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12 tracking-wide">
          What’s Next
        </h2>

        <p className="text-gray-400 text-lg mb-10 max-w-3xl mx-auto">
          I believe growth never stops. Here’s what I’m focusing on next in my journey:
        </p>

        <div className="space-y-8">
          {ABOUT.whatsNext.map((item, index) => (
            <div
              key={index}
              className="next-item bg-gray-800/40 backdrop-blur-lg border border-gray-700/40 rounded-2xl p-8 text-gray-300 text-lg leading-relaxed shadow-[0_0_30px_rgba(0,0,0,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] hover:text-blue-300 transition-all duration-500"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutWhatsNext;
