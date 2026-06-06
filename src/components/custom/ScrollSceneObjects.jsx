import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

const ScrollSceneObjects = () => {
  const sceneRef = useRef(null);
  const architectureRef = useRef(null);
  const fileFlowRef = useRef(null);
  const deploymentRef = useRef(null);
  const requestPacketRef = useRef(null);
  const eventPacketRef = useRef(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
      if (reduceMotion.matches || window.innerWidth < 768) return;

      const scrollTrigger = {
        trigger: document.documentElement,
        start: "top top",
        end: "bottom bottom",
        scrub: 1.4,
      };

      gsap.to(architectureRef.current, {
        xPercent: 18,
        yPercent: 115,
        scale: 1.05,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(fileFlowRef.current, {
        xPercent: -35,
        yPercent: -145,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(deploymentRef.current, {
        xPercent: 45,
        yPercent: -260,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(requestPacketRef.current, {
        y: 270,
        repeat: 3,
        ease: "none",
        scrollTrigger,
      });

      gsap.to(eventPacketRef.current, {
        x: 330,
        repeat: 3,
        ease: "none",
        scrollTrigger,
      });
    },
    { scope: sceneRef }
  );

  return (
    <div ref={sceneRef} className="scroll-scene" aria-hidden="true">
      <div ref={architectureRef} className="architecture-map">
        <p className="scroll-scene-label">{HOME.scrollScene.architecture.label}</p>

        <div className="architecture-row">
          {HOME.scrollScene.architecture.tenants.map((item) => (
            <span className="architecture-node" key={item}>{item}</span>
          ))}
        </div>
        <span className="architecture-connector" />
        <span className="architecture-node architecture-gateway">
          {HOME.scrollScene.architecture.gateway}
        </span>
        <span className="architecture-connector" />
        <div className="architecture-row">
          {HOME.scrollScene.architecture.services.map((item) => (
            <span className="architecture-node" key={item}>{item}</span>
          ))}
        </div>
        <span className="architecture-connector" />
        <div className="architecture-row">
          {HOME.scrollScene.architecture.data.map((item) => (
            <span className="architecture-node architecture-data" key={item}>{item}</span>
          ))}
        </div>
        <span ref={requestPacketRef} className="architecture-packet" />
      </div>

      <div ref={fileFlowRef} className="event-flow">
        <p className="scroll-scene-label">{HOME.scrollScene.fileFlow.label}</p>
        <div className="event-flow-track">
          {HOME.scrollScene.fileFlow.steps.map((item, index) => (
            <div className="event-flow-step" key={item}>
              <span className="event-flow-icon">{index + 1}</span>
              <span>{item}</span>
            </div>
          ))}
          <span ref={eventPacketRef} className="event-packet" />
        </div>
      </div>

      <div ref={deploymentRef} className="deployment-flow">
        <p className="scroll-scene-label">{HOME.scrollScene.deployment.label}</p>
        <div>
          {HOME.scrollScene.deployment.steps.map((item, index) => (
            <span key={item}>
              {item}
              {index < HOME.scrollScene.deployment.steps.length - 1 && <b>→</b>}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollSceneObjects;
