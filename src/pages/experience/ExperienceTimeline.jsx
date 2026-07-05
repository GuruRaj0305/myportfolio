import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ExperienceTimeline = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;

    const cards = el.querySelectorAll(".timeline-card");

    //Line growth animation
    gsap.fromTo(
      lineRef.current,
      { scaleY: 0, transformOrigin: "top center" },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top center",
          end: "bottom bottom",
          scrub: true,
        },
      }
    );

    //Cards entrance animation
    cards.forEach((card) => {
      const dot = card.querySelector(".timeline-dot");

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      tl.fromTo(
        card,
        {
          opacity: 0,
          y: 80,
          rotateX: 15,
          scale: 0.95,
          filter: "blur(6px)",
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
        }
      ).to(
        dot,
        {
          boxShadow: "0 0 25px rgba(var(--color-accent-rgb),0.9), 0 0 50px rgba(var(--color-accent-rgb),0.6)",
          scale: 1.3,
          duration: 0.9,
          yoyo: true,
          repeat: 1,
          ease: "power2.inOut",
        },
        "-=0.5"
      );
    });

    return () => ScrollTrigger.getAll().forEach((st) => st.kill());
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 bg-black/30 text-gray-200 overflow-hidden"
    >
      {/* Section Heading */}
      <span className="section-heading mb-4">Career Timeline</span>
      <h3 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-white">
        Professional Journey
      </h3>

      {/* Timeline Container */}
      <div className="relative max-w-5xl mx-auto pl-8 space-y-16">
        {/* Main timeline line */}
        <div
          ref={lineRef}
          className="absolute left-0 top-0 w-[2px] h-full bg-gradient-to-b from-[var(--color-accent)] via-[rgba(var(--color-accent-rgb),0.8)] to-transparent origin-top"
        />

        {EXPERIENCE.timeline.map((exp, idx) => (
          <div key={idx} className="timeline-card relative pl-8">
            {/* Glowing dot */}
            <span
              className="timeline-dot absolute left-[-1.1rem] top-2 w-4 h-4 rounded-full bg-[var(--color-accent)] shadow-[0_0_15px_rgba(var(--color-accent-rgb),0.7)]"
            ></span>

            {/* Card Content */}
            <div className="">
              <h4 className="text-2xl font-semibold text-white mb-1">
                {exp.company}
              </h4>
              <p className="text-[var(--color-accent)] font-medium mb-2">{exp.role}</p>
              <p className="text-gray-400 text-sm italic mb-3">
                {exp.time?.[0]} — {exp.time?.[1]}
              </p>
              <p className="text-gray-300 mb-3 leading-relaxed">
                {exp.description}
              </p>
              {exp.highlights?.length > 0 && (
                <ul className="space-y-2 mb-4">
                  {exp.highlights.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-300 text-[0.95rem] leading-relaxed">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--color-accent)] flex-shrink-0" />
                      {point}
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-2">
                {exp.technologies.map((tech, i) => (
                  <span
                    key={i}
                    className="text-sm bg-[rgba(var(--color-accent-rgb),0.1)] border border-[rgba(var(--color-accent-rgb),0.4)] px-3 py-1 rounded-full text-[var(--color-accent)]"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceTimeline;
