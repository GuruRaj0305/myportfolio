import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FizzyButton from "../../components/custom/DownloadButton";
import LaserButton from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const button1Ref = useRef(null);
  const button2Ref = useRef(null);

  useGSAP(() => {
      const section = sectionRef.current;
      const heading = headingRef.current;
      const buttons = [button1Ref.current, button2Ref.current];
  
      if (!section || !heading || buttons.some((b) => !b)) return;
  
      // 1️⃣ Section animation
      const sectionTl = gsap.fromTo(
        section,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 90%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
  
      // 2️⃣ Heading animation
      const headingTl = gsap.fromTo(
        heading,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: section,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
  
      // 3️⃣ Buttons stagger animation
      const buttonsTl = gsap.fromTo(
        buttons,
        { y: 30, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "bounce.inOut",
          stagger: 0.2,
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
  
      // Cleanup on unmount (SPA-safe)
      return () => {
        [sectionTl, headingTl, buttonsTl].forEach((tl) => {
          tl.scrollTrigger && tl.scrollTrigger.kill();
          tl.kill();
        });
      };
    }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 px-6 md:px-12 lg:px-24 text-white text-center rounded-2xl shadow-lg"
    >
      {/* Heading */}
      <h2 ref={headingRef} className="text-3xl md:text-4xl font-bold mb-8">
        Let’s Work Together
      </h2>

      {/* Buttons */}
      <div className="flex flex-col md:flex-row justify-center gap-6">
        <div ref={button1Ref}>
          <FizzyButton />
        </div>

        <div ref={button2Ref}>
          <LaserButton to="/contact">Let’s Connect</LaserButton>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
