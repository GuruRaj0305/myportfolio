import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PROJECTS } from "../../data";
import Button from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const labelRef   = useRef(null);
  const cardsRef   = useRef([]);
  const btnRef     = useRef(null);

  const projects = Object.values(PROJECTS);

  useGSAP(() => {
    const el    = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!el || !cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "restart none none none" },
    });

    tl.from(labelRef.current, { y: 24, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(cards, {
        y: 60, opacity: 0, scale: 0.9,
        duration: 0.7, ease: "power3.out", stagger: 0.12,
      }, "-=0.25")
      .from(btnRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.6)" }, "-=0.2");

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-24 px-8 md:px-20 text-white">
      <div className="fluid-container">
        <p ref={labelRef} className="section-eyebrow text-center mb-4">What I&apos;ve Built</p>
        <h2 className="text-3xl md:text-4xl font-black text-center text-white mb-14">
          Featured Projects
        </h2>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={project.slug}
              ref={(el) => (cardsRef.current[index] = el)}
              className="project-card"
            >
              {/* Big faded index number */}
              <span className="project-card-num">
                {String(index + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <h3 className="project-card-title">{project.name}</h3>
              <p className="project-card-tag">{project.tagline}</p>

              {/* Tech chips */}
              {project.techStack?.length > 0 && (
                <div className="flex flex-wrap mb-5 mt-1">
                  {project.techStack.slice(0, 4).map((t) => (
                    <span key={t} className="tech-chip">{t}</span>
                  ))}
                </div>
              )}

              <Link
                to={`/project/${project.slug}`}
                className="project-card-link"
              >
                View Detail <span className="project-card-link-arrow">→</span>
              </Link>
            </div>
          ))}
        </div>

        <div ref={btnRef} className="flex justify-center mt-14">
          <Button arrow="right" to="/projects">View All Projects</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
