import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ScrollFalling = ( {children} ) => {
  const backRef = useRef(null);
  const frontRef = useRef(null);
  const containerRef = useRef(null);

  const createLights = (container) => {
    if (!containerRef.current) return;
    const elements = container.querySelectorAll(".light");

    elements.forEach((el) => {
      const randomStartY = gsap.utils.random(-1000, -100);
      const randomEndY = gsap.utils.random(
        window.innerHeight,
        window.innerHeight + 400
      );
      const randomScale = gsap.utils.random(0.6, 1.4);
      const randomScrollOffset = gsap.utils.random(0, 0.5);

      gsap.fromTo(
        el,
        {
          y: randomStartY,
          scale: randomScale,
          opacity: 0, // start at 0
        },
        {
          y: randomEndY,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: `${randomScrollOffset * 100}% top`,
            end: "bottom bottom",
            scrub: 6,
            onUpdate: (self) => {
              const progress = self.progress; // 0 → 1
              el.style.opacity = Math.sin(progress * Math.PI).toString(); // 0 → 1 → 0
            },
          },
        }
      );
    });
  };

  const randomColor = () =>
    gsap.utils.random(["#ffffff", "#b3e5fc", "#cce7ff", "#e0f7ff"]);

  useGSAP(() => {
    // cleanup any old triggers before creating new ones
    ScrollTrigger.getAll().forEach((st) => st.kill());
    gsap.killTweensOf(".light");

    if (backRef.current) createLights(backRef.current);
    if (frontRef.current) createLights(frontRef.current);

    // cleanup when leaving route
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [backRef, frontRef, containerRef]);

  return (
    <>
    <div ref={containerRef}>
      {/* Back layer */}
      <div
        ref={backRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5] overflow-hidden"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="light absolute rounded-full bg-sky-400 "
            style={{
              width: `${gsap.utils.random(1, 2)}px`,
              height: `${gsap.utils.random(80, 160)}px`,
              background: `linear-gradient(to top, ${randomColor()} 0%, transparent 100%)`,
              left: `${gsap.utils.random(0, 100)}vw`,
              top: `${gsap.utils.random(-200, window.innerHeight)}px`,
              opacity: 0,
              filter: `blur(${gsap.utils.random(1, 3)}px)`,
              boxShadow: `0 0 ${gsap.utils.random(6, 12)}px ${randomColor()}`,
              // transform: `rotate(${gsap.utils.random(-10, 10)}deg)`,
              mixBlendMode: "screen",
              borderRadius: "50%",
            }}

          ></div>
        ))}
      </div>

      {/* Front layer */}
      <div
        ref={frontRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-[10000] overflow-hidden"
      >
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="light absolute rounded-full bg-sky-400 "
            style={{
              width: `${gsap.utils.random(1, 2)}px`,
              height: `${gsap.utils.random(80, 160)}px`,
              background: `linear-gradient(to top, ${randomColor()} 0%, transparent 100%)`,
              left: `${gsap.utils.random(0, 100)}vw`,
              top: `${gsap.utils.random(-200, window.innerHeight)}px`,
              opacity: 0,
              filter: `blur(${gsap.utils.random(1, 3)}px)`,
              boxShadow: `0 0 ${gsap.utils.random(6, 12)}px ${randomColor()}`,
              // transform: `rotate(${gsap.utils.random(-10, 10)}deg)`,
              mixBlendMode: "screen",
              borderRadius: "50%",
            }}

          ></div>
        ))}
      </div>
      {children}
      </div>
    </>
  );
};

export default ScrollFalling;



