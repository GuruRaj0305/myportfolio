import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FizzyButton from "../../components/custom/DownloadButton";
import Button from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const CallToAction = () => {
  const sectionRef  = useRef(null);
  const headingRef  = useRef(null);
  const subRef      = useRef(null);
  const btnsRef     = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "restart none none reverse" },
    });

    tl.from(headingRef.current, { y: 40, opacity: 0, duration: 0.7, ease: "power3.out" })
      .from(subRef.current,     { y: 24, opacity: 0, duration: 0.6, ease: "power3.out" }, "-=0.4")
      .from(btnsRef.current,    { y: 24, opacity: 0, duration: 0.6, ease: "back.out(1.5)" }, "-=0.35");

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, []);

  return (
    <section ref={sectionRef} className="py-28 px-8 md:px-20 text-white">
      <div className="fluid-container">
        <div className="cta-band text-center py-20 px-8 md:px-16">
          {/* Decorative top line */}
          <div className="cta-accent-line" aria-hidden="true" />

          <h2
            ref={headingRef}
            className="text-3xl md:text-5xl font-black mb-5 leading-tight"
          >
            {HOME.cta.heading}
          </h2>

          <p ref={subRef} className="text-gray-400 text-lg max-w-xl mx-auto mb-10">
            {HOME.cta.sub}
          </p>

          <div ref={btnsRef} className="flex flex-wrap justify-center gap-6">
            <FizzyButton />
            <Button to="/contact">Let&apos;s Connect</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
