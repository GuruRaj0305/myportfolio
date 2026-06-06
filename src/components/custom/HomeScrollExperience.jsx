import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const CHAPTERS = [
  { label: "Profile", word: "THINK" },
  { label: "About", word: "DESIGN" },
  { label: "Focus", word: "BUILD" },
  { label: "Work", word: "SHIP" },
  { label: "Contact", word: "CREATE" },
];

export default function HomeScrollExperience() {
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const wordsRef = useRef([]);
  const labelsRef = useRef([]);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const story = document.querySelector(".home-scroll-story");
    if (!story || reduceMotion) return;

    const sections = [
      story.querySelector("section"),
      ...story.querySelectorAll(".home-section"),
    ].filter(Boolean);

    sections.forEach((section, index) => {
      section.dataset.chapter = String(index + 1).padStart(2, "0");
      section.dataset.chapterName = CHAPTERS[index]?.label ?? "Explore";

      if (index > 0) {
        gsap.fromTo(
          section,
          {
            xPercent: index % 2 ? 3 : -3,
            autoAlpha: 0.35,
          },
          {
            xPercent: 0,
            autoAlpha: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "top 42%",
              scrub: 1,
            },
          },
        );
      }

      const heading = section.querySelector(".section-heading");
      if (heading) {
        gsap.fromTo(
          heading,
          { letterSpacing: "0.55em", opacity: 0.25 },
          {
            letterSpacing: "0.22em",
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top 88%",
              end: "top 52%",
              scrub: true,
            },
          },
        );
      }

      ScrollTrigger.create({
        trigger: section,
        start: "top center",
        end: "bottom center",
        onToggle: ({ isActive }) => {
          if (!isActive) return;
          wordsRef.current.forEach((word, wordIndex) => {
            gsap.to(word, {
              autoAlpha: wordIndex === index ? 0.075 : 0,
              yPercent: wordIndex === index ? 0 : 18,
              duration: 0.8,
              ease: "power3.out",
            });
          });
          labelsRef.current.forEach((label, labelIndex) => {
            label?.classList.toggle("is-active", labelIndex === index);
          });
        },
      });
    });

    gsap.fromTo(
      progressRef.current,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: story,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.25,
        },
      },
    );

    gsap.utils.toArray(".project-card").forEach((card, index) => {
      gsap.to(card, {
        yPercent: index % 2 ? -10 : -18,
        rotate: index % 2 ? 0.8 : -0.8,
        ease: "none",
        scrollTrigger: {
          trigger: card,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    return () => {
      sections.forEach((section) => {
        delete section.dataset.chapter;
        delete section.dataset.chapterName;
      });
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-experience" aria-hidden="true">
      <div className="scroll-ambient-words">
        {CHAPTERS.map((chapter, index) => (
          <span
            key={chapter.word}
            ref={(el) => (wordsRef.current[index] = el)}
            className="scroll-ambient-word"
          >
            {chapter.word}
          </span>
        ))}
      </div>

      <aside className="scroll-chapters">
        <div className="scroll-progress-track">
          <span ref={progressRef} className="scroll-progress-fill" />
        </div>
        <div className="scroll-chapter-list">
          {CHAPTERS.map((chapter, index) => (
            <span
              key={chapter.label}
              ref={(el) => (labelsRef.current[index] = el)}
              className={`scroll-chapter-label ${index === 0 ? "is-active" : ""}`}
            >
              <b>{String(index + 1).padStart(2, "0")}</b>
              {chapter.label}
            </span>
          ))}
        </div>
      </aside>
    </div>
  );
}
