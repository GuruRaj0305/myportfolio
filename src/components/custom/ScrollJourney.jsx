import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

/*
 * Delivery-pipeline scroll journey.
 *
 * Meaning: the profile summary says "owns the full delivery cycle" — so the
 * page IS the pipeline. A glowing orb (the feature being built) travels one
 * continuous S-curve down the home page as the visitor scrolls, passing
 * labeled pipeline stages: idea → design → build → test → deploy → live.
 * It goes "live" at the contact CTA.
 *
 * Performance: the orb moves with transforms only (GPU-composited), the
 * line is painted once (static SVG), and stage nodes light up via
 * occasional class toggles — no per-frame repaints, safe on old machines.
 */
const LANES = [0.5, 0.08, 0.92, 0.08, 0.5];
const START_STAGE = "idea";
const STAGES = ["design", "build", "test", "deploy", "live"];

const SVG_NS = "http://www.w3.org/2000/svg";

export default function ScrollJourney() {
  const rootRef = useRef(null);
  const svgRef = useRef(null);
  const basePathRef = useRef(null);
  const orbRef = useRef(null);
  const orbCoreRef = useRef(null);

  useGSAP(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 767px)").matches;
    const story = document.querySelector(".home-scroll-story");
    const root = rootRef.current;
    if (!story || !root || reduceMotion || isMobile) return;

    const sections = [
      story.querySelector("section"),
      ...story.querySelectorAll(".home-section"),
    ].filter(Boolean);
    const footer = story.querySelector("footer");

    let tweens = [];
    let triggers = [];
    let extras = [];
    let stops = [];

    const killAll = () => {
      tweens.forEach((t) => { t.scrollTrigger?.kill(); t.kill(); });
      triggers.forEach((t) => t.kill());
      extras.forEach((n) => n.remove());
      tweens = [];
      triggers = [];
      extras = [];
      stops = [];
    };

    const addStop = (svg, p, stage, side) => {
      const node = document.createElementNS(SVG_NS, "circle");
      node.setAttribute("cx", p.x);
      node.setAttribute("cy", p.y);
      node.setAttribute("r", 5);
      node.setAttribute("class", "journey-node");
      svg.appendChild(node);

      const label = document.createElementNS(SVG_NS, "text");
      label.setAttribute("x", p.x + (side === "right" ? 16 : -16));
      label.setAttribute("y", p.y + 4);
      label.setAttribute("text-anchor", side === "right" ? "start" : "end");
      label.setAttribute("class", "journey-node-label");
      label.textContent = stage;
      svg.appendChild(label);

      extras.push(node, label);
      return { node, label };
    };

    const build = () => {
      killAll();

      const svg = svgRef.current;
      const W = story.clientWidth;
      const H = story.scrollHeight;
      svg.setAttribute("width", W);
      svg.setAttribute("height", H);
      svg.setAttribute("viewBox", `0 0 ${W} ${H}`);

      // One waypoint per chapter, plus a final stop at the footer.
      const pts = sections.map((section, i) => ({
        x: W * LANES[Math.min(i, LANES.length - 1)],
        y: section.offsetTop + section.offsetHeight * (i === 0 ? 0.8 : 0.52),
      }));
      if (footer) {
        pts.push({ x: W * 0.5, y: footer.offsetTop + footer.offsetHeight * 0.25 });
      }

      // Smooth S-curve through the waypoints (vertical tangents at stops).
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const p0 = pts[i - 1];
        const p1 = pts[i];
        const midY = (p0.y + p1.y) / 2;
        d += ` C ${p0.x} ${midY} ${p1.x} ${midY} ${p1.x} ${p1.y}`;
      }
      basePathRef.current.setAttribute("d", d);

      // Pipeline stages: "idea" marks the start, then one stage per stop.
      const startLabel = document.createElementNS(SVG_NS, "text");
      startLabel.setAttribute("x", pts[0].x + 24);
      startLabel.setAttribute("y", pts[0].y + 4);
      startLabel.setAttribute("text-anchor", "start");
      startLabel.setAttribute("class", "journey-node-label is-lit");
      startLabel.textContent = START_STAGE;
      svg.appendChild(startLabel);
      extras.push(startLabel);

      stops = pts.slice(1).map((p, i) =>
        addStop(svg, p, STAGES[Math.min(i, STAGES.length - 1)], p.x < W / 2 ? "right" : "left")
      );

      // The orb rides the path — transform-only, GPU-composited.
      tweens.push(
        gsap.to(orbRef.current, {
          motionPath: {
            path: basePathRef.current,
            align: basePathRef.current,
            alignOrigin: [0.5, 0.5],
          },
          ease: "none",
          scrollTrigger: { trigger: story, start: "top top", end: "bottom bottom", scrub: 0.5 },
        })
      );

      // Stage arrival: light the node + label, pulse the orb.
      const pulse = () => {
        gsap.fromTo(
          orbCoreRef.current,
          { scale: 1.5 },
          { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
        );
      };
      const setLit = (i, lit) => {
        const stop = stops[i];
        if (!stop) return;
        stop.node.classList.toggle("is-lit", lit);
        stop.label.classList.toggle("is-lit", lit);
      };
      sections.forEach((section, i) => {
        triggers.push(
          ScrollTrigger.create({
            trigger: section,
            start: "top 55%",
            onEnter: () => { if (i > 0) setLit(i - 1, true); pulse(); },
            onLeaveBack: () => { if (i > 0) setLit(i - 1, false); pulse(); },
          })
        );
      });
      if (footer) {
        triggers.push(
          ScrollTrigger.create({
            trigger: footer,
            start: "top 75%",
            onEnter: () => setLit(stops.length - 1, true),
            onLeaveBack: () => setLit(stops.length - 1, false),
          })
        );
      }
    };

    // Build after layout settles, then keep the path in sync on resize.
    gsap.set(orbRef.current, { autoAlpha: 0 });
    const raf = requestAnimationFrame(() => {
      build();
      ScrollTrigger.refresh();
      gsap.to(orbRef.current, { autoAlpha: 1, duration: 0.8, delay: 0.6 });
    });

    let resizeTimer;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        build();
        ScrollTrigger.refresh();
        gsap.set(orbRef.current, { autoAlpha: 1 });
      }, 250);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      killAll();
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-journey" aria-hidden="true">
      <svg ref={svgRef}>
        <path ref={basePathRef} className="journey-line-base" />
      </svg>
      <div ref={orbRef} className="journey-orb">
        <span ref={orbCoreRef} className="journey-orb-core" />
      </div>
    </div>
  );
}
