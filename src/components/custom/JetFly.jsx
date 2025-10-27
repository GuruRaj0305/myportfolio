import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const JetFly = ({ children }) => {
  const jetRef = useRef(null);
  const jetContainerRef = useRef(null);

  useGSAP(() => {
    const jet = jetRef.current;
    if (!jetContainerRef.current) return;

    // Timeline for both phases
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: jetContainerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        once: true,
        markers: false,
      },
    });

    // Phase 1: bottom → center
    tl.fromTo(
      jet,
      { opacity: 0, y: "50vh", scale: 0.3 },
      {
        opacity: 1,
        y: "0vh",
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        ease: "power3.out",
        duration: 1,
      }
    );

    // Add 3D perspective first
    gsap.set(jet.parentNode, { perspective: 800 });
    gsap.set(jet, { transformStyle: "preserve-3d" });

    // Animate both at once
    tl.to(jet, {
      x: "100vw",
      rotateY: 70,
      rotateZ: 55,
      opacity: 0,
      scale: 5,
      y: "0vh",
      ease: "power2.inOut",
      duration: 1,
    });

    return () => {
      ScrollTrigger.killAll();
      tl.kill();
    };
  }, [jetRef, jetContainerRef]);

  return (
    <>
      <div ref={jetContainerRef}>
        <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0">
          <img
            ref={jetRef}
            src="/jet-fighter-up-solid-full.svg"
            alt="Jet flying animation"
            className="w-32 h-32 filter brightness-0 invert"
          />
        </div>
        {children}
      </div>
    </>
  );
};

export default JetFly;
