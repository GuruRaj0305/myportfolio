import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const About = forwardRef((props, ref) => {
  const sectionRef  = ref || useRef(null);
  const labelRef    = useRef(null);
  const statsRef    = useRef([]);
  const textHeadRef = useRef(null);
  const paraRef     = useRef(null);
  const btnRef      = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = { trigger: el, start: "top 78%", toggleActions: "restart none none none" };

    const tl = gsap.timeline({ scrollTrigger: st });

    tl.from(labelRef.current, { y: 20, opacity: 0, duration: 0.5, ease: "power3.out" })
      .from(statsRef.current.filter(Boolean), {
        y: 40, opacity: 0, scale: 0.92, duration: 0.7, ease: "power3.out", stagger: 0.1,
      }, "-=0.25")
      .from(textHeadRef.current, { x: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(paraRef.current,     { x: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(btnRef.current,      { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.6)" }, "-=0.4");

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="hm-about"
      className="relative py-28 px-8 md:px-20 text-white"
    >
      {/* Section eyebrow */}
      <p ref={labelRef} className="section-eyebrow text-center mb-12">About Me</p>

      <div className="fluid-container flex flex-col md:flex-row gap-14 md:gap-20 items-start">

        {/* ── LEFT: stat cards ───────────────────────────────── */}
        <div className="md:w-[42%] flex-shrink-0">
          <div className="grid grid-cols-2 gap-4">
            {HOME.aboutStats.map((s, i) => (
              <div
                key={s.label}
                ref={(el) => (statsRef.current[i] = el)}
                className="about-stat-card"
              >
                <div className="about-stat-value">{s.value}</div>
                <div className="about-stat-label">{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: prose ───────────────────────────────────── */}
        <div className="flex-1">
          <h2
            ref={textHeadRef}
            className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight"
          >
            Building Things That{" "}
            <span className="banner-name-gradient">Matter</span>
          </h2>

          <p
            ref={paraRef}
            className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
          >
            {HOME.about}
          </p>

          <div ref={btnRef}>
            <Button to="/about">View Full About</Button>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
