import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const states = ["about", "highlights", "projects", "cta"];

const MorphingCodeWindow = () => {
  const windowRef = useRef(null);
  const panelsRef = useRef({});

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduceMotion.matches || window.innerWidth < 1024) return;

    const windowEl = windowRef.current;
    const panels = panelsRef.current;

    gsap.set(windowEl, {
      autoAlpha: 0,
      x: () => window.innerWidth * 0.63,
      y: () => window.innerHeight * 0.28,
      scale: 0.82,
    });
    gsap.set(Object.values(panels), { autoAlpha: 0, y: 12 });
    gsap.set(panels.about, { autoAlpha: 1, y: 0 });

    const activatePanel = (name) => {
      Object.entries(panels).forEach(([key, panel]) => {
        gsap.to(panel, {
          autoAlpha: key === name ? 1 : 0,
          y: key === name ? 0 : 12,
          duration: 0.35,
          overwrite: true,
        });
      });
    };

    const stages = [
      {
        trigger: "#hm-about",
        panel: "about",
        x: () => window.innerWidth * 0.04,
        y: () => window.innerHeight * 0.5,
        scale: 0.86,
      },
      {
        trigger: "#hm-highlights",
        panel: "highlights",
        x: () => window.innerWidth - 365,
        y: () => window.innerHeight * 0.52,
        scale: 0.82,
      },
      {
        trigger: "#hm-projects",
        panel: "projects",
        x: () => window.innerWidth * 0.035,
        y: () => window.innerHeight * 0.55,
        scale: 0.88,
      },
      {
        trigger: "#hm-cta",
        panel: "cta",
        x: () => window.innerWidth - 380,
        y: () => window.innerHeight * 0.5,
        scale: 0.84,
      },
    ];

    stages.forEach((stage, index) => {
      ScrollTrigger.create({
        trigger: stage.trigger,
        start: "top 72%",
        end: "bottom 28%",
        onEnter: () => activatePanel(stage.panel),
        onEnterBack: () => activatePanel(stage.panel),
      });

      gsap.to(windowEl, {
        autoAlpha: 0.58,
        x: stage.x,
        y: stage.y,
        scale: stage.scale,
        rotation: index % 2 === 0 ? -1.5 : 1.5,
        ease: "none",
        scrollTrigger: {
          trigger: stage.trigger,
          start: "top bottom",
          end: "center center",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });
    });
  }, []);

  return (
    <div ref={windowRef} className="morph-code-window" aria-hidden="true">
      <div className="morph-window-bar">
        <span className="mac-close" />
        <span className="mac-minimize" />
        <span className="mac-maximize" />
      </div>

      <div className="morph-window-content">
        {states.map((state) => {
          const content = HOME.banner.scrollWindow[state];

          return (
            <div
              ref={(element) => (panelsRef.current[state] = element)}
              className="morph-window-panel"
              key={state}
            >
              <p className="morph-window-file">{content.filename}</p>
              <h3>{content.title}</h3>
              <div className="morph-window-lines">
                {content.lines.map(([key, value]) => (
                  <p key={key}>
                    <span>{key}</span>
                    <strong>{value}</strong>
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MorphingCodeWindow;
