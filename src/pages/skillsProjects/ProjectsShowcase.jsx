import { useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const ProjectsShowcase = () => {
  const containerRef = useRef(null);
  const projectRefs = useRef([]);

  const projects = Object.values(PROJECTS);

  // GSAP scroll animations
  useGSAP(() => {
    const animate = () => {
      projectRefs.current.forEach((el) => {
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
          },
        });
      });

      // Make sure ScrollTrigger positions are correct
      ScrollTrigger.refresh();
    };

    const id = setTimeout(animate, 50); // Delay ensures layout is ready

    return () => {
      clearTimeout(id);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="px-6 py-20 bg-gradient-to-b from-gray-950/50 to-gray-950/0 text-white min-h-screen flex flex-col items-center"
    >
      <h2 className="text-4xl sm:text-5xl font-extrabold mb-12 text-center">
        Projects Showcase
      </h2>

      <div className="flex flex-col gap-16 w-full max-w-6xl">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (projectRefs.current[i] = el)}
            onClick={() =>
              window.open(`/project/${project.slug}`, "_blank")
            }
            className="cursor-pointer bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-md shadow-lg hover:shadow-cyan-500/20 transition-all duration-300"
          >
            <h3 className="text-2xl sm:text-3xl font-semibold text-cyan-400 mb-2">
              {project.name}
            </h3>
            <p className="text-gray-300 mb-2">{project.description.short}</p>

            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech, j) => (
                <span
                  key={j}
                  className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsShowcase;
