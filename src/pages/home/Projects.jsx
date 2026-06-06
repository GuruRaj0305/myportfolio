import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HOME, PROJECTS } from "../../data";
import Button from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const FeaturedProjects = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
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

    tl.from(headingRef.current, { y: 24, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(cards, {
        y: 60, opacity: 0, scale: 0.9,
        duration: 0.7, ease: "power3.out", stagger: 0.12,
      }, "-=0.25")
      .from(btnRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.6)" }, "-=0.2");

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="home-section relative pt-16 md:pt-20 pb-20 md:pb-28 px-8 md:px-20 text-white">
      <div className="fluid-container">
        <h2 ref={headingRef} className="section-heading mb-8 md:mb-10">
          {HOME.projects.heading}
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
                {HOME.projects.detailLabel} <span className="project-card-link-arrow">{HOME.projects.detailArrow}</span>
              </Link>
            </div>
          ))}
        </div>

        <div ref={btnRef} className="flex justify-center mt-14 md:mt-32">
          <Button arrow="right" to={HOME.projects.action.link}>{HOME.projects.action.label}</Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjects;
