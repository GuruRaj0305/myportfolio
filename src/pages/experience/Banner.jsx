import { useRef } from "react";
import { gsap } from "gsap";
import LaserButton from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";

const ExperienceBanner = () => {
  const bannerRef = useRef(null);
  const headingRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);

  useGSAP(() => {
    const ctx = gsap.context(() => {
      // Heading animation: slide from left + rotate
      gsap.fromTo(
        headingRef.current,
        { x: -200, rotation: -10, opacity: 0 },
        {
          x: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
        }
      );

      // Paragraph animation: fade + skew + from bottom
      gsap.fromTo(
        textRef.current,
        { y: 60, skewY: 5, opacity: 0 },
        {
          y: 0,
          skewY: 0,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      // Button animation: pop in + slight bounce
      gsap.fromTo(
        buttonRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          delay: 0.8,
          ease: "back.out(1.7)",
        }
      );
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={bannerRef}
      className="relative flex flex-col items-center justify-center text-center 
                 h-screen min-h-[600px] px-6 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none" />

      <h2
        ref={headingRef}
        className="text-5xl sm:text-6xl font-extrabold text-white mb-6"
      >
        Experience & Resume
      </h2>

      <p
        ref={textRef}
        className="text-gray-300 text-lg max-w-2xl sm:max-w-3xl leading-relaxed mb-10"
      >
        A journey through my professional growth — from testing and hardware-level
        development to full-stack web engineering and SaaS product building.
      </p>

      <div ref={buttonRef}>
        <LaserButton targetBlank={true} to="/resume/resume_gururaj.pdf" >Resume</LaserButton>
      </div>
    </section>
  );
};

export default ExperienceBanner;
