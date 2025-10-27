import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const CustomCursor = () => {
  const ballsRef = useRef([]);
  const mousePos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const rafId = useRef(null);
  const stopTimer = useRef(null);

  useEffect(() => {
    const balls = ballsRef.current;

    const configs = [
      { size: 22, color: "#fff", maxDistance: 300, speedMap: [{ percent: 0.33, duration: 1 }, { percent: 0.66, duration: 0.5 }, { percent: 1, duration: 0.8 }], wave: { size: 60, speed: 0.02 } },
      { size: 20, color: "#fff", maxDistance: 300, speedMap: [{ percent: 0.33, duration: 1 }, { percent: 0.66, duration: 0.2 }, { percent: 1, duration: 0.8 }], wave: { size: 100, speed: 0.1 } },
      { size: 20, color: "#fff", maxDistance: 300, speedMap: [{ percent: 0.33, duration: 1.5 }, { percent: 0.66, duration: 0.4 }, { percent: 1, duration: 0.2 }], wave: { size: 80, speed: 0.06 } },
      { size: 20, color: "#fff", maxDistance: 300, speedMap: [{ percent: 0.33, duration: 1.2 }, { percent: 0.66, duration: 0.9 }, { percent: 1, duration: 0.2 }], wave: { size: 30, speed: 0.3 } },
    ];

    // Initial positions
    balls.forEach((ball, i) => {
      const cfg = configs[i];
      if (!ball) return;
      gsap.set(ball, {
        width: cfg.size,
        height: cfg.size,
        backgroundColor: cfg.color,
        opacity: 0,
        x: mousePos.current.x - cfg.size / 2,
        y: mousePos.current.y - cfg.size / 2,
      });
    });

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };

      // Show all balls immediately
      balls.forEach((ball) => ball && gsap.to(ball, { opacity: 1, duration: 0.15 }));


      // Longer fade out (1s) after inactivity
      if (stopTimer.current) clearTimeout(stopTimer.current);
      const hoveredElement = document.elementFromPoint( e.clientX, e.clientY);
      const isBtnA = hoveredElement?.tagName === "BUTTON" || hoveredElement?.tagName === "A";
      const lightOffDelayMilliSec = isBtnA ? 100 : 1000;

    

      stopTimer.current = setTimeout(() => {

        balls.forEach((ball, i) => {
          if (!ball) return;
         
          gsap.to(ball, {
            opacity: 0,
            duration:lightOffDelayMilliSec/ 1000
          });
        });
      }, lightOffDelayMilliSec); // delay before fade starts
    };
    window.addEventListener("mousemove", handleMouseMove);

    let time = 0;
    const animate = () => {
      time += 1;

      balls.forEach((ball, i) => {
        const cfg = configs[i];
        if (!ball) return;

        const targetX = mousePos.current.x - cfg.size / 2;
        const targetY = mousePos.current.y - cfg.size / 2;

        const currentX = gsap.getProperty(ball, "x") || 0;
        const currentY = gsap.getProperty(ball, "y") || 0;

        const dx = targetX - currentX;
        const dy = targetY - currentY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        const percent = cfg.maxDistance ? Math.min(distance / cfg.maxDistance, 1) : 1;
        let duration = 0.3;
        for (let entry of cfg.speedMap) {
          if (percent <= entry.percent) {
            duration = entry.duration;
            break;
          }
        }

        // Wave effect only if far
        let waveX = 0, waveY = 0;
        if (cfg.wave && distance > 10) {
          const waveFactor = Math.min(distance / cfg.maxDistance, 1);
          waveX = Math.sin(time * cfg.wave.speed) * cfg.wave.size * waveFactor;
          waveY = Math.cos(time * cfg.wave.speed) * cfg.wave.size * waveFactor;
        }

        // Converge at cursor with slight stagger
        if (distance <= 10) {
          gsap.to(ball, {
            x: targetX,
            y: targetY,
            duration: 0.1 + i * 0.05,
            ease: "power2.out",
          });
        } else {
          gsap.to(ball, {
            x: targetX + waveX,
            y: targetY + waveY,
            duration,
            ease: "power2.out",
          });
        }
      });

      rafId.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (stopTimer.current) clearTimeout(stopTimer.current);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      gsap.killTweensOf(balls);
    };
  }, []);

  return (
    <>
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(el) => (ballsRef.current[i] = el)}
          className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] fire-ball"
          aria-hidden
        />
      ))}
    </>
  );
};

export default CustomCursor;
