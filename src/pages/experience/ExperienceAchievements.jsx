import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { EXPERIENCE } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ExperienceAchievements = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    const cards = el.querySelectorAll(".achievement-card");

    // Scroll animation (fade + depth)
    gsap.fromTo(
      cards,
      { opacity: 0, y: 80, rotateX: 15 },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        duration: 1.2,
        stagger: 0.2,
        ease: "power4.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
        },
      }
    );

    // Subtle magnetic hover motion
    cards.forEach((card) => {
      card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * 8,
          rotationX: -y * 8,
          duration: 0.4,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          rotationX: 0,
          rotationY: 0,
          duration: 0.6,
          ease: "elastic.out(1, 0.4)",
        });
      });
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 text-gray-100 overflow-hidden"
    >
      {/* Section heading */}
      <h3 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-[var(--color-accent)] drop-shadow-[0_0_12px_rgba(var(--color-accent-rgb),0.4)]">
        Achievements & Highlights
      </h3>

      {/* Cards */}
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 gap-10 relative z-10">
        {EXPERIENCE.achievements.map((item, idx) => (
          <div
            key={idx}
            className="achievement-card relative border border-[rgba(var(--color-accent-rgb),0.5)] rounded-xl p-6
                       shadow-[0_0_20px_rgba(var(--color-accent-rgb),0.15)] hover:shadow-[0_0_25px_rgba(var(--color-accent-rgb),0.3)]
                       transition-all duration-500 backdrop-blur-sm overflow-hidden"
          >
            {/* Animated glow line */}
            <span className="absolute left-0 top-0 h-full w-[2px] bg-[var(--color-accent)] opacity-80 animate-pulse shadow-[0_0_20px_var(--color-accent)]" />

            {/* Card content */}
            <div className="flex items-start gap-3 relative z-10 pl-4">
              <span className="mt-2 w-3 h-3 rounded-full bg-[var(--color-accent)] shadow-[0_0_10px_var(--color-accent)] flex-shrink-0" />
              <p className="text-lg text-gray-200 leading-relaxed">{item}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceAchievements;
