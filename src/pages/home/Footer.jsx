import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef(null);
  const innerRef  = useRef(null);

  useGSAP(() => {
    const el = innerRef.current;
    if (!el) return;

    gsap.from(el, {
      y: 30, opacity: 0, duration: 0.8, ease: "power3.out",
      scrollTrigger: { trigger: footerRef.current, start: "top 92%" },
    });
  }, []);

  return (
    <footer ref={footerRef} className="pb-12 px-8 md:px-20 text-white">
      <div className="fluid-container" ref={innerRef}>
        {/* Divider */}
        <div className="footer-divider mb-10" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <p className="text-lg font-bold text-white tracking-tight">{HOME.footer.brand}</p>
            <p className="text-gray-500 text-sm mt-1">{HOME.footer.tagline}</p>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-8">
            {HOME.social.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="footer-link"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <p className="text-center text-gray-600 text-xs mt-8 font-mono">
          &copy; {new Date().getFullYear()} {HOME.footer.copyrightName} &nbsp;&middot;&nbsp; {HOME.footer.builtWith}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
