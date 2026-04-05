import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Button from "../../components/custom/Button";
import { HOME } from "../../data";

gsap.registerPlugin(ScrollTrigger);

export default function Banner() {
  const bannerRef  = useRef(null);
  const canvasRef  = useRef(null);
  const greetRef   = useRef(null);
  const h1Ref      = useRef(null);
  const underlineRef = useRef(null);
  const roleRef    = useRef(null);
  const taglineRef = useRef(null);
  const buttonRef  = useRef(null);
  const rightRef   = useRef(null);
  const scrollRef  = useRef(null);

  // ── Fire canvas ─────────────────────────────────────────────────
  useEffect(() => {
    const canvas  = canvasRef.current;
    const section = bannerRef.current;
    if (!canvas || !section) return;

    const ctx = canvas.getContext("2d");
    const particles = [];
    let mouseIn = false;
    const mouse = { x: 0, y: 0 };
    let raf;

    const resize = () => {
      const r   = section.getBoundingClientRect();
      canvas.width  = r.width;
      canvas.height = r.height;
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(section);

    const spawnParticle = (x, y) => {
      particles.push({
        x: x + (Math.random() - 0.5) * 12,
        y: y + (Math.random() - 0.5) * 12,
        vx: (Math.random() - 0.5) * 1.6,
        vy: -(Math.random() * 3.2 + 1.4),
        turbX: (Math.random() - 0.5) * 0.14,
        life: 1,
        decay: Math.random() * 0.022 + 0.016,
        size: Math.random() * 18 + 7,
      });
    };

    const tick = () => {
      if (particles.length > 380) particles.splice(0, particles.length - 380);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.vx += p.turbX;
        p.vy -= 0.055;
        p.x  += p.vx;
        p.y  += p.vy;
        p.size *= 0.983;
        p.life -= p.decay;

        if (p.life <= 0 || p.size < 0.5) { particles.splice(i, 1); continue; }

        const t  = Math.max(p.life, 0);
        // Core: white-hot → bright yellow → orange → deep red → transparent
        const r1 = 255;
        const g1 = Math.min(Math.floor(Math.pow(t, 0.4) * 220), 255);
        const b1 = Math.floor(Math.pow(t, 2.2) * 70);
        const a  = t * 0.9;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        grad.addColorStop(0,   `rgba(255, ${Math.min(g1 + 60, 255)}, ${Math.min(b1 + 80, 255)}, ${a})`);
        grad.addColorStop(0.25,`rgba(255, ${g1}, ${Math.max(b1 - 20, 0)}, ${a * 0.85})`);
        grad.addColorStop(0.6, `rgba(240, ${Math.floor(g1 * 0.38)}, 0, ${a * 0.45})`);
        grad.addColorStop(1,   `rgba(140, 0, 0, 0)`);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = section.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      if (mouseIn) {
        const dist = Math.hypot(nx - mouse.x, ny - mouse.y);
        if (dist > 1.8) {
          const count = Math.min(Math.ceil(dist * 0.55) + 2, 10);
          for (let i = 0; i < count; i++) spawnParticle(nx, ny);
        }
      }
      mouse.x = nx;
      mouse.y = ny;
    };
    const onEnter = () => { mouseIn = true; };
    const onLeave = () => { mouseIn = false; };

    section.addEventListener("mousemove", onMove, { passive: true });
    section.addEventListener("mouseenter", onEnter);
    section.addEventListener("mouseleave", onLeave);
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      section.removeEventListener("mousemove", onMove);
      section.removeEventListener("mouseenter", onEnter);
      section.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // ── GSAP entrance + role cycling + parallax ──────────────────────
  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    tl.from(greetRef.current,   { y: 28, opacity: 0, duration: 0.6 })
      .from(h1Ref.current,      { y: 40, opacity: 0, duration: 0.7 }, "-=0.35")
      .from(underlineRef.current, {
        scaleX: 0, duration: 0.55, ease: "power2.inOut", transformOrigin: "left center",
      }, "-=0.45")
      .from(roleRef.current,    { y: 16, opacity: 0, duration: 0.5 }, "-=0.35")
      .from(taglineRef.current, { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
      .from(buttonRef.current,  { y: 16, opacity: 0, duration: 0.5, ease: "back.out(1.7)" }, "-=0.25")
      .from(rightRef.current,   { x: 50, opacity: 0, duration: 0.8 }, 0.15)
      .from(scrollRef.current,  { opacity: 0, duration: 0.6 }, "-=0.2");

    const roles = HOME.banner.roles;
    let idx = 0;
    const cycleRole = () => {
      gsap.to(roleRef.current, {
        opacity: 0, y: -10, duration: 0.28,
        onComplete: () => {
          idx = (idx + 1) % roles.length;
          roleRef.current.textContent = roles[idx];
          gsap.fromTo(roleRef.current,
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.35, ease: "power2.out" }
          );
        },
      });
    };
    const roleTimer = setInterval(cycleRole, 3000);

    gsap.to(bannerRef.current, {
      scrollTrigger: {
        trigger: bannerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
      y: -80,
      opacity: 0,
    });

    return () => clearInterval(roleTimer);
  }, []);

  const { roles, tagline, skills, badges } = HOME.banner;

  return (
    <section
      ref={bannerRef}
      className="relative h-screen flex items-center justify-between px-10 md:px-20 overflow-hidden fluid-container"
    >
      {/* Fire canvas — screen blend so it glows naturally on dark bg */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[50]"
        style={{ mixBlendMode: "screen" }}
        aria-hidden="true"
      />

      {/* Dot-grid pattern */}
      <div className="absolute inset-0 pointer-events-none banner-dot-grid" aria-hidden="true" />

      {/* Bottom ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[220px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse at center, rgba(59,130,246,0.13) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      {/* ── LEFT CONTENT ─── z-10 so it renders above dot-grid but below fire canvas (fire is screen-blended anyway) */}
      <div className="max-w-2xl relative z-10 text-left md:w-1/2">
        <p ref={greetRef} className="text-blue-400 font-mono text-sm mb-4 tracking-[0.22em] uppercase select-none">
          Hello, World 👋
        </p>

        <h1 ref={h1Ref} className="text-4xl md:text-6xl font-bold text-white leading-tight mb-3">
          I&rsquo;m{" "}
          <span className="banner-name-gradient">Gururaj HR</span>
        </h1>

        <div
          ref={underlineRef}
          className="h-[2px] mb-4 w-36"
          style={{ background: "linear-gradient(90deg,#60a5fa 0%,transparent 100%)", transformOrigin: "left center" }}
        />

        <p ref={roleRef} className="text-blue-300 font-mono text-lg md:text-xl mb-5">
          {roles[0]}
        </p>

        <p ref={taglineRef} className="text-gray-400 text-base md:text-lg max-w-xl leading-relaxed mb-8">
          {tagline}
        </p>

        <div ref={buttonRef} className="flex gap-4 flex-wrap">
          <Button animation="filled" arrow="right" to="/projects">View Projects</Button>
        </div>
      </div>

      {/* ── RIGHT — code window ──────────────────────────────────── */}
      <div ref={rightRef} className="relative flex items-center justify-center md:w-1/2 h-full max-md:hidden">
        <div
          className="absolute w-80 h-80 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(59,130,246,0.18) 0%, transparent 70%)" }}
          aria-hidden="true"
        />
        <div
          className="absolute w-52 h-52 rounded-full pointer-events-none translate-x-24 translate-y-12"
          style={{ background: "radial-gradient(circle, rgba(168,85,247,0.10) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        {/* macOS code card */}
        <div className="relative z-10 w-full max-w-[390px] rounded-2xl overflow-hidden shadow-2xl code-window-border bg-[#0c0c10]">
          <div className="flex items-center gap-2 px-4 py-3 bg-black/50 border-b border-white/[0.06]">
            <span className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <span className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <span className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-[11px] text-gray-500 select-none">about-me.ts</span>
          </div>
          <div className="p-5 font-mono text-[13px] leading-7 text-left select-none">
            <p><span className="text-purple-400">const </span><span className="text-blue-300">developer</span><span className="text-white"> = {`{`}</span></p>
            <p className="pl-5"><span className="text-emerald-300">name</span><span className="text-gray-500">: </span><span className="text-amber-300">&quot;Gururaj HR&quot;</span><span className="text-gray-500">,</span></p>
            <p className="pl-5"><span className="text-emerald-300">role</span><span className="text-gray-500">: </span><span className="text-amber-300">&quot;Full Stack Dev&quot;</span><span className="text-gray-500">,</span></p>
            <p className="pl-5"><span className="text-emerald-300">skills</span><span className="text-gray-500">: [</span></p>
            <p className="pl-10">
              {skills.slice(0, 3).map((s, i) => (
                <span key={s}>
                  <span className="text-amber-300">&quot;{s}&quot;</span>
                  {i < 2 && <span className="text-gray-500">, </span>}
                </span>
              ))}
              <span className="text-gray-500">,</span>
            </p>
            <p className="pl-10">
              {skills.slice(3).map((s, i, arr) => (
                <span key={s}>
                  <span className="text-amber-300">&quot;{s}&quot;</span>
                  {i < arr.length - 1 && <span className="text-gray-500">, </span>}
                </span>
              ))}
            </p>
            <p className="pl-5"><span className="text-gray-500">],</span></p>
            <p className="pl-5"><span className="text-emerald-300">passion</span><span className="text-gray-500">: </span><span className="text-amber-300">&quot;Building great UX&quot;</span></p>
            <p><span className="text-white">{`}`}</span><span className="text-gray-500">;</span></p>
            <p className="mt-2 text-[11px]"><span className="text-gray-600">// </span><span className="text-gray-500">Open to opportunities 🚀</span></p>
          </div>
        </div>

        {/* Floating badges */}
        {badges.map((b, i) => {
          const pos   = ["top-[20%] right-[4%]", "top-[60%] right-[2%]", "bottom-[20%] left-[8%]", "top-[16%] left-[14%]"];
          const delay = ["0s", "1.2s", "0.7s", "1.9s"];
          return (
            <div key={b.label} className={`absolute ${pos[i]} badge-float`} style={{ animationDelay: delay[i] }}>
              <span className={`badge-pill badge-${b.color}`}>{b.label}</span>
            </div>
          );
        })}
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-gray-600 scroll-indicator-anim"
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <span className="font-mono tracking-[0.2em] uppercase text-[9px]">scroll</span>
        <div className="w-px h-8" style={{ background: "linear-gradient(to bottom,rgba(107,114,128,0.8),transparent)" }} />
      </div>
    </section>
  );
}
