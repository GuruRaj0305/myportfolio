import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../../data";
import LaserButton from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const buttonRef = useRef(null);
  
  const projects = Object.values(PROJECTS);

  useGSAP(() => {
      const sectionEl = sectionRef.current;
      const cards = cardRefs.current.filter(Boolean);
      const buttonEl = buttonRef.current;
  
      if (!sectionEl || cards.length === 0 || !buttonEl) return;
  
      // Cards stagger animation
      const cardsTl = gsap.fromTo(
        cards,
        { y: 100, opacity: 0, scale: 0.85 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: "power3.out",
          stagger: 0.2,
          scrollTrigger: {
            trigger: sectionEl,
            start: "top 80%",
            toggleActions: "restart none none none",
          },
        }
      );
  
      // Button animation
      const buttonTl = gsap.fromTo(
        buttonEl,
        { opacity: 0, scale: 0.8, y: -50 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 0.8,
          ease: "bounce.out",
          scrollTrigger: {
            trigger: buttonEl,
            start: "top 80%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
  
      // Cleanup SPA-safe
      return () => {
        cardsTl.scrollTrigger && cardsTl.scrollTrigger.kill();
        cardsTl.kill();
        buttonTl.scrollTrigger && buttonTl.scrollTrigger.kill();
        buttonTl.kill();
      };
    }, []);

  return (
    <section
      ref={sectionRef}
      className="py-16 px-6 md:px-12 lg:px-24 backdrop-blur-sm text-white"
    >
      <div className="fluid-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>

        {/* Project Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              ref={(el) => (cardRefs.current[index] = el)}
              className="bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300"
            >
              <img
                src={project.images[0]}
                alt={project.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-4">{project.tagline}</p>
                <a
                  href={project.links.caseStudy}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  View Project →
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* See All Projects Button */}
        <div ref={buttonRef} className="flex justify-center mt-12">
          <LaserButton arrow={true} to="/projects">
            View Project
          </LaserButton>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
