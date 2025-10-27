import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

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
            {[
              {
                title: "Years of Experience",
                text: "5+ years in full-stack development",
              },
              {
                title: "Skills",
                text: "React, Node.js, Django, Python, Linux",
              },
              { title: "Current Focus", text: "Learning DevOps & AI" },
            ].map((item, i) => (
              <div
                key={i}
                ref={(el) => (cardsRef.current[i] = el)}
                className="bg-gray-800 rounded-2xl shadow-lg p-6 text-center hover:scale-105 transition-transform duration-300"
              >
                <h3 className="text-2xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-300">{item.text}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}

export default Highlights;
