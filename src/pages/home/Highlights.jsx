import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Highlights() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef   = useRef([]);

  useGSAP(() => {
    const el    = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean);
    if (!el || !cards.length) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 80%", toggleActions: "restart none none reverse" },
    });

    tl.from(headingRef.current, { y: 24, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(cards, {
        y: 50, opacity: 0, scale: 0.95,
        duration: 0.65, ease: "power3.out", stagger: 0.14,
      }, "-=0.2");

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="home-section relative py-16 md:py-20 px-8 md:px-20 text-white">
      <div className="fluid-container">
        <h2 ref={headingRef} className="section-heading mb-8 md:mb-10">
          {HOME.highlights.heading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {HOME.highlights.items.map((item, i) => (
            <Link
              to={item.link}
              key={item.name}
              ref={(el) => (cardsRef.current[i] = el)}
              className="highlight-card group"
            >
              <span className="highlight-card-icon">{item.icon}</span>
              <h3 className="highlight-card-name">{item.name}</h3>
              <p className="highlight-card-value">{item.value}</p>
              <span className="highlight-card-arrow">{HOME.highlights.arrow}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Highlights;
