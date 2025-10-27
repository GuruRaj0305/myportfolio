import React, { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ABOUT } from "../../data";

const AboutBanner = () => {
  const headingRef = useRef([]);
  const paragraphRef = useRef([]);
  const animationDone = useRef(false);

  const splitTextToLetters = (text, refArray) => {
    refArray.current = [];
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="inline-block"
        ref={(el) => el && refArray.current.push(el)}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  useLayoutEffect(() => {
    if (animationDone.current) return;

    // Step 1: Scatter letters randomly
    gsap.set([...headingRef.current, ...paragraphRef.current], {
      x: () => gsap.utils.random(-200, 200),
      y: () => gsap.utils.random(-200, 200),
      rotation: () => gsap.utils.random(-180, 180),
      opacity: 0,
    });

    const tl = gsap.timeline();

    // Step 2: Gather heading letters first
    tl.to(headingRef.current, {
      x: 0,
      y: 0,
      rotation: 0,
      opacity: 1,
      duration: 0.5,
      stagger: 0.05,
      ease: "power3.out",
    })
      // Step 3: Gather paragraph letters next
      .to(
        paragraphRef.current,
        {
          x: 0,
          y: 0,
          rotation: 0,
          opacity: 1,
          duration: 1.2,
          stagger: 0.02,
          ease: "power3.out",
        },
        "-=0.8"
      )
      // Step 4: Subtle bounce to settle letters
      .to([...headingRef.current, ...paragraphRef.current], {
        y: "+=10",
        duration: 0.3,
        yoyo: true,
        repeat: 1,
        ease: "power1.inOut",
      });

    animationDone.current = true;
  }, [animationDone]);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <section className="flex flex-col items-center justify-center text-center px-10 max-md:px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
          {splitTextToLetters("About Me", headingRef)}
        </h1>
        <p className="text-gray-300 text-base md:text-lg max-w-3xl leading-relaxed">
          {splitTextToLetters(ABOUT.about, paragraphRef)}
        </p>
      </section>
    </div>
  );
};

export default AboutBanner;
