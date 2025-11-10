import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const JetFly = ({ children }) => {
  const jetRef = useRef(null);
  const jetContainerRef = useRef(null);

  useGSAP(() => {
    // Skip animation for small screens
    if (window.innerWidth < 678) return;

    const jet = jetRef.current;
    if (!jetContainerRef.current) return;

    // Add 3D perspective
    gsap.set(jet.parentNode, { perspective: 800 });
    gsap.set(jet, { transformStyle: "preserve-3d" });

    // Timeline
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
      { opacity: 0, y: 500, scale: 0.3 }, // 50vh ≈ 500px
      {
        opacity: 0.9,
        y: 0,
        scale: 1,
        rotateY: 0,
        rotateZ: 0,
        ease: "power3.out",
        duration: 1,
      }
    );

    // Phase 2: move to right with 3D rotation
    tl.to(jet, {
      x: window.innerWidth, // same as 100vw
      rotateY: 70,
      rotateZ: 55,
      opacity: 0,
      scale: 5,
      y: 0,
      ease: "power2.inOut",
      duration: 1,
    });

    return () => {
      ScrollTrigger.killAll();
      tl.kill();
    };
  }, [jetRef, jetContainerRef]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 678;

  return (
    <>
      <div ref={jetContainerRef}>
        {/* Render jet only for larger screens */}
        {!isMobile && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-0 blur-[5px]">
            <img
              ref={jetRef}
              src="/jet-fighter-up-solid-full.svg"
              alt="Jet flying animation"
              className="w-32 h-32 filter brightness-0 invert"
            />
          </div>
        )}
        {children}
      </div>
    </>
  );
};

export default JetFly;
