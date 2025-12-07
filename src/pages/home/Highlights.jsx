import { useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

function Highlights({ aboutRef }) {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useGSAP(() => {
    const sectionEl = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean); // remove any nulls

    if (!sectionEl || !aboutRef.current || cards.length === 0) return;

    // Clip-path reveal animation
    const clipTl = gsap.to(sectionEl, {
      clipPath: "circle(100% at 50% 50%)",
      ease: "power3.inOut",
      scrollTrigger: {
        trigger: aboutRef.current,
        start: "top 50%",
        end: "bottom -10%",
        scrub: true,
      },
    });

    // Cards stagger animation
    const cardsTl = gsap.fromTo(
      cards,
      { y: 50, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power3.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionEl,
          start: "top 95%",
          toggleActions: "restart none none reverse",
        },
      }
    );

    // GSAP HOVER ANIMATIONS
    cards.forEach((card) => {
      let hoverTl = gsap.timeline({ paused: true });

      hoverTl
        .to(card, {
          scale: 1.07,
          y: -10,
          rotateX: 8,
          rotateY: -8,
          // boxShadow: "0px 20px 40px rgba(59,130,246,0.35)",
          duration: 0.4,
          ease: "power3.out",
        })
        .to(
          card.querySelector(".glow"),
          {
            opacity: 0.5,
            scale: 1.2,
            duration: 0.4,
            ease: "power3.out",
          },
          0
        );

      card.addEventListener("mouseenter", () => hoverTl.play());
      card.addEventListener("mouseleave", () => hoverTl.reverse());
    });

    // Cleanup only this component's ScrollTriggers
    return () => {
      clipTl.scrollTrigger && clipTl.scrollTrigger.kill();
      clipTl.kill();
      cardsTl.scrollTrigger && cardsTl.scrollTrigger.kill();
      cardsTl.kill();
    };
  }, [aboutRef]);

  return (
    <>
      <div className=" bg-[rgba(0,0,0,0.5)] ">
        <section
          id="highlights"
          ref={sectionRef}
          className="min-h-96 flex flex-col items-center justify-center bg-gray-900/50 text-white px-6 relative py-14"
          style={{ clipPath: "circle(0% at 50% 50%)" }} // start hidden
        >
          <h2 className="text-4xl font-bold mb-12">Highlights</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
            {HOME.highlights?.map((item, i) => (
              <Link
                to={item.link}
                key={item.name}
                ref={(el) => (cardsRef.current[i] = el)}
                className="
    group relative block bg-gray-800 rounded-2xl 
    shadow-lg p-6 text-center 
    transform-gpu
    perspective-1000
  "
              >
                {/* Glow layer for GSAP */}
                <div className="glow absolute inset-0 -z-10 rounded-2xl opacity-0 blur-xl"></div>

                <h3 className="text-2xl font-semibold mb-4">{item.name}</h3>
                <p className="text-gray-300">{item.value}</p>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Highlights;
