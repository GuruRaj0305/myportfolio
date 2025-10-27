import { gsap } from "gsap";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import ProjectImages from "./ProjectCarousel";
import { useGSAP } from "@gsap/react";

export default function ProjectDetailDialog({
  dialogRef,
  selectedProject,
  setSelectedProject,
}) {
  useGSAP(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const content = dialog.querySelector(".dialog-content");

    if (selectedProject) {
      dialog.showModal();
      document.body.style.overflow = "hidden";

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        dialog,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.8, ease: "bounce.inOut" }
      ).fromTo(
        content.querySelectorAll("h3, p, section, img, button"),
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.05 },
        "-=0.5"
      );
    } else if (dialog.open) {
      const tl = gsap.timeline({
        defaults: { ease: "power3.inOut" },
        onComplete: () => {
          dialog.close();
          document.body.style.overflow = "";
        },
      });

      tl.to(dialog, {
        opacity: 0,
        scale: 0.7,
        duration: 0.5,
      });
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProject, dialogRef]);

  useGSAP(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleClickOutside = (e) => {
      const rect = dialog.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setSelectedProject(null);
      }
    };

    dialog.addEventListener("click", handleClickOutside);
    return () => dialog.removeEventListener("click", handleClickOutside);
  }, [setSelectedProject, dialogRef]);

  return (
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center result-modal rounded-2xl
                 bg-transparent p-0 border-0 m-auto opacity-0 overflow-hidden perspective-[2000px]"
      onCancel={() => setSelectedProject(null)}
    >
      {selectedProject && (
        <div className="dialog-content relative bg-gradient-to-b from-gray-900/80 to-gray-950/95 text-white rounded-2xl p-10 max-w-5xl w-[100%] max-h-[100vh] overflow-y-auto scrollbar-none">
          {/* Close Button - fixed inside content */}
          <button
            onClick={() => setSelectedProject(null)}
            className="fixed top-5 right-5 w-5 h-5 rounded-full bg-red-500 hover:bg-red-600
                       flex items-center justify-cente cursor-pointer z-[10]"
          />
        

          <h3 className="text-4xl font-bold text-cyan-400 mb-4">
            {selectedProject.name}
          </h3>

          <p className="text-gray-300 mb-6">{selectedProject.description.detailed}</p>

          {[["Roles", selectedProject.role], ["Features", selectedProject.features], ["Challenges", selectedProject.challenges], ["Outcomes", selectedProject.outcomes]].map(
            ([title, items], idx) =>
              items && (
                <section key={idx} className="mb-6">
                  <h4 className="text-2xl font-semibold text-white/90 mb-2">{title}:</h4>
                  <ul className="list-disc list-inside text-gray-300 space-y-1 text-lg">
                    {items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </section>
              )
          )}

          {selectedProject.images && <ProjectImages images={selectedProject.images} projectName={selectedProject.name} /> }

          

        </div>
      )}
    </dialog>
  );
}
