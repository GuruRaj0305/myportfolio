import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate, useParams } from "react-router-dom";
import {PROJECTS} from "../../data"; // <-- your project list file
import ProjectImages from "./ProjectCarousel";



export default function ProjectDetail() {
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { id } = useParams();


  // Fetch project from data
  const selectedProject = PROJECTS[id];

  // Redirect if not found
  if (!selectedProject) {
    navigate("/404", { replace: true });
    return null;
  }

  // GSAP intro animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

    tl.fromTo(
      containerRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8 }
    ).fromTo(
      containerRef.current.querySelectorAll("h1, h2, p, li, button, img, section"),
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.04 },
      "-=0.4"
    );
  }, []);

  return (
    <div
      ref={containerRef}
      className="min-h-screen text-white 
                 px-6 pt-28 pb-12 md:px-20"
    >
      <div className="fluid-container">

      {/* Title + Description */}
      <div>
        <h1 className="text-5xl font-bold text-cyan-400 mb-6">
          {selectedProject.name}
        </h1>

        <p className="text-gray-300 text-lg leading-relaxed mb-10">
          {selectedProject.description.detailed}
        </p>
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
              <h2 className="text-3xl font-semibold mb-3 text-white/90">
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

      {/* Image Showcase */}
      {selectedProject.images && selectedProject.images.length > 0 && (
        <div className="mt-10 ">
          {/* Add your ProjectImages carousel here */}
          <ProjectImages images={selectedProject.images} projectName={selectedProject.name} />
        </div>
      )}
      
      </div>
    </div>
  );
}
