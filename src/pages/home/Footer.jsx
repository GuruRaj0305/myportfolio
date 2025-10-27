import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const linksRef = useRef([]);
  const copyrightRef = useRef(null);

  useGSAP(() => {
    const links = linksRef.current.filter(Boolean);

    // Timeline for links + copyright
    const tl = gsap.timeline();

    if (links.length) {
      tl.fromTo(
        links,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }

    if (copyrightRef.current) {
      tl.fromTo(
        copyrightRef.current,
        { y: 10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
          },
        }
      );
    }

    // SPA-safe cleanup
    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);


  return (
    <footer
      ref={footerRef}
      className="text-white py-10 px-6 md:px-12 lg:px-24 text-center "
    >
      {/* Links */}
      <div className="flex justify-center gap-6 mb-4">
        {[
          { href: "https://github.com/gururaj0305", text: "GitHub" },
          { href: "https://linkedin.com/in/gururajhr", text: "LinkedIn" },
          { href: "mailto:gururajhr0305l@gmail.com", text: "Email" },
        ].map((link, idx) => (
          <a
            key={idx}
            ref={(el) => (linksRef.current[idx] = el)}
            href={link.href}
            target={link.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors duration-300"
          >
            {link.text}
          </a>
        ))}
      </div>

      {/* Copyright */}
      <p ref={copyrightRef} className="text-gray-400 text-sm">
       <strong> &copy; {new Date().getFullYear()} Gururaj H R. All rights reserved. </strong><br /> Crafted with React, Tailwind CSS, GSAP.
      </p>
    </footer>
  );
};

export default Footer;
