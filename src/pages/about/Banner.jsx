import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ABOUT } from "../../data";

const AboutBanner = () => {
  const headingRef = useRef([]);
  const paragraphRef = useRef([]);
  const animationDone = useRef(false);

  const splitTextToWords = (text, refArray) => {
    refArray.current = [];
    return text.split(" ").map((word, i) => (
      <span
        key={i}
        className="inline-block mr-2"
        ref={(el) => el && refArray.current.push(el)}
      >
        {word}
      </span>
    ));
  };

  useLayoutEffect(() => {
    if (animationDone.current) return;

    const headingWords = headingRef.current;
    const paragraphWords = paragraphRef.current;

    // Scatter all words initially
    gsap.set([...headingWords, ...paragraphWords], {
      opacity: 0,
      scale: 0,
      x: () => gsap.utils.random(-300, 300),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-180, 180),
    });

    const tl = gsap.timeline({ delay: 0.3 });

    // Phase 1: Explode in (burst outward quickly)
    tl.to([...headingWords, ...paragraphWords], {
      opacity: 1,
      scale: 1.2,
      duration: 0.4,
      ease: "back.out(2)",
      stagger: 0.03,
    });

    // Phase 2: Snap to final position (reassemble)
    tl.to(
      [...headingWords, ...paragraphWords],
      {
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        ease: "elastic.out(1, 0.6)",
        duration: 1.2,
        stagger: 0.02,
      },
      "-=0.2"
    );

    animationDone.current = true;
  }, []);

  return (
    <div className="flex items-center justify-center h-[100vh] bg-transparent overflow-x-hidden">
      <section className="flex flex-col items-center justify-center text-center px-10 max-md:px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          {splitTextToWords("About Me", headingRef)}
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
          {splitTextToWords(ABOUT.about, paragraphRef)}
        </p>
      </section>
    </div>
  );
};

export default AboutBanner;
