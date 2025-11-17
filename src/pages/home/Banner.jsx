import { useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/dist/TextPlugin";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../../components/custom/Button";
import { HOME } from "../../data";

gsap.registerPlugin(TextPlugin, ScrollTrigger);

export default function Banner() {
  const bannerRef = useRef(null);
  const titleRef = useRef(null);
  const nameRef = useRef(null);
  const underlineRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonRef = useRef(null);


  useGSAP(() => {
    // -----------------------
    // FIX: Prevent shifting during typing animation
    // -----------------------
    const fullText = taglineRef.current.innerText;

    // Lock final height before wiping text
    const finalHeight = taglineRef.current.offsetHeight;
    taglineRef.current.style.height = finalHeight + "px";

    // Reset text for animation
    gsap.set(taglineRef.current, { text: "" });

    // -----------------------
    // INITIAL LOAD ANIMATION
    // -----------------------
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(titleRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.8,
    })
      .from(nameRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
      })
      .from(underlineRef.current, {
        width: 0,
        duration: 1,
      })
      .to(taglineRef.current, {
        duration: 2,
        text: { value: fullText, delimiter: "" },
      })
      .from(buttonRef.current, {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
      });

    // -----------------------
    // FLOATING TITLE EFFECT
    // -----------------------

    // -----------------------
    // GLOW BEHIND NAME
    // -----------------------
    gsap.fromTo(
      nameRef.current,
      { textShadow: "0px 0px 0px #3b82f6" },
      {
        textShadow: "0px 0px 25px #3b82f6",
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: "power1.inOut",
      }
    );

    // -----------------------
    // BACKGROUND PARALLAX
    // -----------------------
    gsap.to(bannerRef.current, {
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -100,
      opacity: 0,
    });

  }, []);

return (
  <section
    ref={bannerRef}
    className="relative h-screen flex flex-row items-center justify-between px-10 md:px-20 overflow-hidden fluid-container"
  >
    {/* LEFT CONTENT */}
    <div className="max-w-3xl relative z-10 text-left md:w-1/2">
      <h1
        ref={titleRef}
        className="text-4xl md:text-6xl font-bold mb-4 text-white leading-tight"
      >
        Hi, I’m{" "}
        <span
          ref={nameRef}
          className="text-blue-400 relative inline-block"
        >
          Gururaj HR
        </span>
      </h1>

      {/* Underline */}
      <div
        ref={underlineRef}
        className="h-[3px] bg-blue-400 mb-6"
        style={{ width: "140px" }}
      ></div>

      <p
        ref={taglineRef}
        className="text-lg md:text-2xl text-gray-300 mb-8 leading-relaxed max-w-xl"
      >
        {HOME.banner.tagline}
      </p>

      <div ref={buttonRef} className="flex">
        <Button animation="filled" arrow="right" to="/projects">
          View Projects
        </Button>
      </div>
    </div>

    {/* RIGHT SIDE ANIMATION AREA */}
    <div className="relative flex items-center justify-center md:w-1/2 h-[300px] md:h-full max-md:hidden">
      
      {/* BLURRED MOVING GRADIENT BACKGROUND */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br 
        from-gray-500 via-blue-500 to-white blur-[120px] opacity-40 animate-slow-pulse"
      ></div>

      {/* FLOATING SHAPES */}
      <div className="absolute w-24 h-24 rounded-xl bg-gray-500/40 blur-sm animate-float1"></div>
      <div className="absolute w-16 h-16 rounded-full bg-white/40 blur-sm animate-float2"></div>
      <div className="absolute w-20 h-20 rounded-2xl bg-blue-500/40 blur-sm animate-float3"></div>
    </div>
  </section>
);

}
