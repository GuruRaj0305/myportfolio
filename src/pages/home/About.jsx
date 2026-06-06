import { useRef, forwardRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Button from "../../components/custom/Button";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const About = forwardRef((props, ref) => {
  const internalSectionRef = useRef(null);
  const sectionRef  = ref || internalSectionRef;
  const statsRef    = useRef([]);
  const textHeadRef = useRef(null);
  const paraRef     = useRef(null);
  const btnRef      = useRef(null);

  useGSAP(() => {
    const el = sectionRef.current;
    if (!el) return;

    const st = { trigger: el, start: "top 78%", toggleActions: "restart none none none" };

    const tl = gsap.timeline({ scrollTrigger: st });

    tl.from(statsRef.current.filter(Boolean), {
        y: 40, opacity: 0, scale: 0.92, duration: 0.7, ease: "power3.out", stagger: 0.1,
      })
      .from(textHeadRef.current, { x: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(paraRef.current,     { x: 30, opacity: 0, duration: 0.7, ease: "power3.out" }, "-=0.5")
      .from(btnRef.current,      { y: 20, opacity: 0, duration: 0.5, ease: "back.out(1.6)" }, "-=0.4");

    return () => { tl.scrollTrigger?.kill(); tl.kill(); };
  }, [sectionRef]);

  return (
    <section
      ref={sectionRef}
      id="hm-about"
      className="home-section relative py-16 md:py-20 px-8 md:px-20 text-white"
    >
      <h2 className="section-heading mb-8 md:mb-10">{HOME.about.sectionHeading}</h2>

      <div className="fluid-container flex flex-col md:flex-row gap-12 md:gap-16 items-start">

        {/* ── LEFT: stat cards ───────────────────────────────── */}
        <div className="md:w-[42%] flex-shrink-0">
          <div className="grid grid-cols-2 gap-4">
            {HOME.about.stats.map((s, i) => (
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
          <h3
            ref={textHeadRef}
            className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight"
          >
            {HOME.about.heading}{" "}
            <span className="banner-name-gradient">{HOME.about.emphasizedHeading}</span>
          </h3>

          <p
            ref={paraRef}
            className="text-gray-400 text-lg leading-relaxed mb-10 max-w-lg"
          >
            {HOME.about.description}
          </p>

          <div ref={btnRef}>
            <Button to={HOME.about.action.link}>{HOME.about.action.label}</Button>
          </div>
        </div>
      </div>
    </section>
  );
});

About.displayName = "About";
export default About;
