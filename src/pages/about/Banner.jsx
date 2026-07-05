import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ABOUT } from "../../data";

const AboutBanner = () => {
  const headingRef = useRef(null);
  const paragraphRef = useRef(null);
  const animationDone = useRef(false);

  useLayoutEffect(() => {
    if (animationDone.current) return;

    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Animate heading letters individually
    const headingLetters = headingRef.current.textContent.split("");
    headingRef.current.innerHTML = headingLetters
      .map((char) =>
        char === " "
          ? `<span class="inline-block w-2">&nbsp;</span>`
          : `<span class="inline-block">${char}</span>`
      )
      .join("");

    const headingSpans = headingRef.current.querySelectorAll("span");

    tl.fromTo(
      headingSpans,
      { opacity: 0, y: 26 },
      { opacity: 1, y: 0, duration: 0.55, stagger: 0.035 }
    );

    // Animate paragraph sentences one after another
    const paragraphLines = paragraphRef.current.textContent.split(". ").filter(Boolean);
    paragraphRef.current.innerHTML = paragraphLines
      .map((line) => `<p class="mb-4">${line.endsWith(".") ? line : `${line}.`}</p>`)
      .join("");

    const paragraphSpans = paragraphRef.current.querySelectorAll("p");

    tl.fromTo(
      paragraphSpans,
      { opacity: 0, y: 18 },
      { opacity: 1, y: 0, duration: 0.7, stagger: 0.18 },
      "-=0.25"
    );

    animationDone.current = true;
  }, []);

  return (
    <div className="flex items-center justify-center h-[100vh] bg-transparent overflow-x-hidden">
      <section className="flex flex-col items-center justify-center text-center px-10 max-md:px-6">
        <h1
          ref={headingRef}
          className="text-4xl md:text-6xl font-bold mb-6 text-white leading-tight"
        >
          About Me
        </h1>
        <div
          ref={paragraphRef}
          className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed"
        >
          {ABOUT.about}
        </div>
      </section>
    </div>
  );
};

export default AboutBanner;
