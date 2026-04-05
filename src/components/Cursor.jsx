import { useEffect, useRef } from "react";

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const rafId = useRef(null);

  useEffect(() => {
    // Hide cursor on touch devices
    if ("ontouchstart" in window) return;

    const dotEl = dotRef.current;
    const ringEl = ringRef.current;
    let visible = false;

    const lerp = (a, b, t) => a + (b - a) * t;

    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!visible) {
        visible = true;
        ringPos.current.x = e.clientX;
        ringPos.current.y = e.clientY;
        dotEl.style.opacity = "1";
        ringEl.style.opacity = "1";
      }
    };

    // mouseover is event-delegated — fires only on element change, not per-pixel
    const onOver = (e) => {
      const interactive = !!e.target.closest(
        "button, a, input, textarea, label, select, [data-cursor]"
      );
      dotEl.dataset.hover = interactive ? "true" : "false";
      ringEl.dataset.hover = interactive ? "true" : "false";
    };

    const onDown = () => {
      dotEl.dataset.click = "true";
      ringEl.dataset.click = "true";
    };
    const onUp = () => {
      dotEl.dataset.click = "false";
      ringEl.dataset.click = "false";
    };
    const onLeave = () => {
      dotEl.style.opacity = "0";
      ringEl.style.opacity = "0";
      visible = false;
    };

    // RAF loop — directly writes CSS transform, zero GSAP overhead
    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, mouse.current.x, 0.12);
      ringPos.current.y = lerp(ringPos.current.y, mouse.current.y, 0.12);
      dotEl.style.transform = `translate(${mouse.current.x}px, ${mouse.current.y}px)`;
      ringEl.style.transform = `translate(${ringPos.current.x}px, ${ringPos.current.y}px)`;
      rafId.current = requestAnimationFrame(tick);
    };

    tick();

    document.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseover", onOver, { passive: true });
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <>
      {/* Position wrapper — no transition, raw RAF updates */}
      <div ref={dotRef} className="cursor-dot" aria-hidden="true">
        <span className="cursor-dot-inner" />
      </div>
      {/* Ring — lerps behind */}
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span className="cursor-ring-inner" />
      </div>
    </>
  );
};

export default CustomCursor;
