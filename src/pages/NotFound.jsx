import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import LaserButton from "../components/custom/Button";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const NotFound = () => {
  const containerRef = useRef(null);
  // const frameRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const buttonRef = useRef(null);
  useGSAP(() => {
    const ctx = gsap.context(() => {
      // IMAGE FLOAT + BREATHING SCALE

      // MOUSE PARALLAX
      const handleMouseMove = (e) => {
        const { innerWidth, innerHeight } = window;
        const x = (e.clientX / innerWidth - 0.5) * 35;
        const y = (e.clientY / innerHeight - 0.5) * 25;
        gsap.to(imageRef.current, {
          x: x,
          y: y,
          duration: 1,
          ease: "power3.out",
        });
      };
      window.addEventListener("mousemove", handleMouseMove);

      // TEXT ("404") SLIDE UP + GLITCH JITTER
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1.2, ease: "back.out(1.5)", delay: 1 }
      );

      // BUTTON POP-IN WITH BOUNCE
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.7, y: 50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1,
          ease: "back.out(1.7)",
          delay: 1.5,
        }
      );

      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={containerRef}
        className="relative flex flex-col justify-center items-center w-full h-screen overflow-hidden"
      >
        {/* Neon Glass Frame */}

        {/* Main Image */}
        <img
          ref={imageRef}
          src="/notfoundImage.webp"
          alt="404"
          className="max-h-[90vh] w-auto object-contain rounded-2xl m-auto max-w-[90vw]"
          style={{
            pointerEvents: "none",
            boxShadow: "0 0 60px rgba(0, 191, 255, 0.8)", // Blue glow
            border: "2px solid rgba(255, 255, 255, 0.6)", // Optional white border
            borderRadius: "16px",
          }}
        />
        {/* Reflection Overlay */}

        {/* Text & Button */}
        <div
          ref={textRef}
          className="absolute bottom-16 text-center text-gray-300 drop-shadow-lg space-y-3"
        >
          <div ref={buttonRef} className="mt-4">
            <LaserButton animation="filled" arrow="right" to="/">
              Go Back Home
            </LaserButton>
          </div>
        </div>
      </div>
      
    </>
  );
};

export default NotFound;
