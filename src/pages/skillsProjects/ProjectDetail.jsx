import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate, useParams } from "react-router-dom";
import { PROJECTS } from "../../data";
import ProjectImages from "./ProjectCarousel";
import LaserButton from "../../components/custom/Button";

export default function ProjectDetail() {
  const containerRef = useRef(null);
  const revealRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();

  const selectedProject = PROJECTS[id];

  if (!selectedProject) {
    navigate("/404", { replace: true });
    return null;
  }

  // GSAP 🔥 Cinematic Page Reveal Animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    // Curtain reveal
    tl.fromTo(
      revealRef.current,
      { x: 0 },
      {
        x: "100%",
        duration: 1,
        ease: "power3.inOut",
      }
    );

    // Fade & lift main container
    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
      },
      "-=0.6"
    );

    // Stagger texts
    tl.fromTo(
      containerRef.current.querySelectorAll("h1, h2, p, li"),
      { opacity: 0, y: 18 },
      {
        opacity: 1,
        y: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out",
      },
      "-=0.4"
    );

    // Images float-in effect
    tl.fromTo(
      containerRef.current.querySelectorAll("img"),
      { opacity: 0, scale: 0.96, y: 20 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.3"
    );
  }, []);

  return (
    <div className="relative">
      {/* Curtain Reveal Layer */}
      <div
        ref={revealRef}
        className="fixed top-0 left-0 w-full h-full bg-gray-900 z-40 pointer-events-none"
      />

      {/* Main Content */}
      <div
        ref={containerRef}
        className="min-h-screen text-white px-6 pt-28 pb-12 md:px-20 relative z-10"
      >
        <div className="fluid-container max-w-5xl mx-auto">

          {/* Title + Description */}
          <div className="mb-10">
            <h1 className="text-5xl font-extrabold text-cyan-400 mb-6 drop-shadow-lg">
              {selectedProject.name}
            </h1>

            <p className="text-gray-300 text-lg leading-relaxed text-justify">
              {selectedProject?.description?.detailed}
            </p>

            {/* Demo Link Button */}
            
              {selectedProject?.links?.demo && (
                <div className="mt-5">
                  <LaserButton arrow={"right"} targetBlank={true} to="selectedProject?.links?.demo" > 🔗 View Live Demo </LaserButton>
                </div>
              )}
            
            
          </div>

          

          {/* Sections */}
          {[
            ["Roles", selectedProject.role],
            ["Features", selectedProject.features],
            ["Challenges", selectedProject.challenges],
            ["Outcomes", selectedProject.outcomes],
          ].map(
            ([title, items], idx) =>
              items && (
                <section key={idx} className="mb-10">
                  <h2 className="text-3xl font-semibold mb-3">
                    {title}
                  </h2>
                  <ul className="list-disc list-inside text-gray-300 space-y-2 text-lg">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )
          )}

          {/* Images Carousel */}
          {selectedProject.images?.length > 0 && (
            <div className="mt-12">
              <ProjectImages
                images={selectedProject.images}
                projectName={selectedProject.name}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
