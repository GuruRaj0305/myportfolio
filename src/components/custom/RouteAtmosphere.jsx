import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function RouteAtmosphere({ variant }) {
  const rootRef = useRef(null);

  useGSAP(() => {
    const root = rootRef.current;
    const page = root?.parentElement;
    if (!root || !page || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    if (variant === "about") {
      gsap.to(root.querySelectorAll(".about-orbit"), {
        rotate: (index) => index % 2 ? -110 : 140,
        scale: (index) => 1 + index * 0.08,
        ease: "none",
        scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: 1.5 },
      });
    }

    if (variant === "experience") {
      gsap.fromTo(root.querySelector(".experience-route-fill"), { scaleY: 0 }, {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: 0.4 },
      });
      gsap.to(root.querySelectorAll(".experience-year"), {
        yPercent: -180,
        stagger: 0.12,
        ease: "none",
        scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: 1.2 },
      });
    }

    if (variant === "projects") {
      gsap.to(root.querySelector(".blueprint-crosshair"), {
        x: "55vw",
        y: "45vh",
        rotate: 180,
        ease: "none",
        scrollTrigger: { trigger: page, start: "top top", end: "bottom bottom", scrub: 1.4 },
      });
      gsap.utils.toArray(page.querySelectorAll(".project-blueprint-card")).forEach((card, index) => {
        gsap.fromTo(card, { clipPath: "inset(0 100% 0 0)", x: index % 2 ? 40 : -40 }, {
          clipPath: "inset(0 0% 0 0)",
          x: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 88%" },
        });
      });
    }
  }, [variant]);

  if (variant === "about") {
    return (
      <div ref={rootRef} className="route-atmosphere about-atmosphere" aria-hidden="true">
        <span className="about-orbit" /><span className="about-orbit" /><span className="about-orbit" />
        <span className="about-core">ME</span>
      </div>
    );
  }

  if (variant === "experience") {
    return (
      <div ref={rootRef} className="route-atmosphere experience-atmosphere" aria-hidden="true">
        <div className="experience-route"><span className="experience-route-fill" /></div>
        <span className="experience-year">NOW</span><span className="experience-year">2024</span><span className="experience-year">2023</span>
      </div>
    );
  }

  return (
    <div ref={rootRef} className="route-atmosphere projects-atmosphere" aria-hidden="true">
      <div className="blueprint-crosshair"><span /><span /></div>
      <span className="blueprint-coordinate coordinate-a">X 03.05</span>
      <span className="blueprint-coordinate coordinate-b">Y 09.24</span>
    </div>
  );
}
