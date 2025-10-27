import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SKILLS } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SkillsGrid = () => {
  const containerRef = useRef(null);
  const categoryRefs = useRef([]);

  const skillCategories = [
    { title: "Frontend", items: SKILLS.development.frontend },
    { title: "Backend", items: SKILLS.development.backend },
    { title: "Programming", items: SKILLS.development.programming },
    { title: "Databases", items: SKILLS.development.databases },
    { title: "DevOps", items: SKILLS.devops },
    { title: "Architectures", items: SKILLS.architectures },
    { title: "Tools", items: SKILLS.tools },
  ];

  useGSAP(() => {
  const animate = () => {
    categoryRefs.current.forEach((el) => {
      if (!el) return;
      gsap.from(el, {
        opacity: 0,
        y: 60,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none reverse",
          markers: false,
        },
      });
    });
    ScrollTrigger.refresh(); // Refresh after all animations
  };

  // Delay slightly to ensure DOM layout is complete
  const id = setTimeout(animate, 50);

  return () => {
    clearTimeout(id);
    ScrollTrigger.getAll().forEach((t) => t.kill());
  };
}, []);

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-gradient-to-b from-gray-900/0 to-white/10"
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-12 text-center">
        Skills Overview
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl w-full">
        {skillCategories.map((category, i) => (
          <div
            key={i}
            ref={(el) => (categoryRefs.current[i] = el)}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <h3 className="text-2xl font-semibold text-cyan-400 mb-4 text-center">
              {category.title}
            </h3>
            <div className="flex flex-wrap justify-center gap-3">
              {category.items.map((skill, j) => (
                <span
                  key={j}
                  className="px-4 py-2 bg-white/10 text-gray-200 rounded-full text-sm font-medium hover:bg-cyan-500/20 transition-all duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillsGrid;
