import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GraduationCap, Award } from "lucide-react";
import { EXPERIENCE } from "../../data";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const EducationCerts = () => {
  const sectionRef = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    const cards = el.querySelectorAll(".credential-card");

    gsap.fromTo(
      cards,
      { opacity: 0, y: 60, scale: 0.97 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 82%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  const { education, certifications } = EXPERIENCE;

  return (
    <section
      ref={sectionRef}
      className="relative py-24 px-6 text-gray-100 overflow-hidden"
    >
      <span className="section-heading mb-4">Credentials</span>
      <h3 className="text-4xl sm:text-5xl font-bold text-center mb-16 text-white">
        Education & Certifications
      </h3>

      <div className="max-w-5xl mx-auto grid gap-8 lg:grid-cols-[1.1fr_1fr] relative z-10">
        {/* Education */}
        <div className="credential-card achievement-card relative rounded-xl p-7 overflow-hidden">
          <div className="flex items-center gap-3 mb-5 pl-4">
            <GraduationCap size={26} className="text-[var(--color-accent)]" strokeWidth={1.6} />
            <h4 className="text-xl font-semibold text-white">Education</h4>
          </div>
          <div className="pl-4">
            <p className="text-lg text-gray-100 font-medium leading-snug">{education.degree}</p>
            <p className="text-[var(--color-accent)] mt-1">{education.institution}</p>
            <p className="text-gray-400 text-sm italic mt-2">
              {education.time[0]} — {education.time[1]} &nbsp;·&nbsp; GPA: {education.gpa}
            </p>
            <p className="text-gray-300 mt-4 leading-relaxed">{education.note}</p>
          </div>
        </div>

        {/* Certifications */}
        <div className="flex flex-col gap-6">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="credential-card achievement-card relative rounded-xl p-6 overflow-hidden"
            >
              <div className="flex items-start gap-3 pl-4">
                <Award size={22} className="text-[var(--color-accent)] mt-1 flex-shrink-0" strokeWidth={1.6} />
                <div>
                  <p className="text-gray-100 font-semibold leading-snug">{cert.title}</p>
                  <p className="text-[var(--color-accent)] text-sm mt-1">{cert.issuer}</p>
                  <p className="text-gray-400 text-sm mt-2 leading-relaxed">{cert.note}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationCerts;
