import { useRef } from "react";
import { Mail, Linkedin, Github, Phone } from "lucide-react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const ContactPage = () => {
  const containerRef = useRef(null);
  const linksRef = useRef([]);
  const canvasRef = useRef(null);

  //  const linksRef = useRef([]);

  useGSAP(() => {
    // Subtle floating glow animation on hover
    linksRef.current.forEach((link) => {
      const icon = link.querySelector("svg");

      link.addEventListener("mouseenter", () => {
        gsap.to(link, {
          scale: 1.15,
          color: "#60a5fa", // Tailwind's blue-400
          textShadow: "0px 0px 10px #60a5fa",
          duration: 0.3,
          ease: "power2.out",
        });
        gsap.to(icon, { rotation: 10, duration: 0.3, ease: "power2.out" });
      });

      link.addEventListener("mouseleave", () => {
        gsap.to(link, {
          scale: 1,
          color: "#d1d5db", // gray-300
          textShadow: "0px 0px 0px transparent",
          duration: 0.3,
          ease: "power2.inOut",
        });
        gsap.to(icon, { rotation: 0, duration: 0.3, ease: "power2.inOut" });
      });
    });
  }, []);

  const links = [
    {
      icon: <Mail size={24} />,
      text: "Email",
      href: "mailto:gururajhr0305l@gmail.com",
    },
    {
      icon: <Linkedin size={24} />,
      text: "LinkedIn",
      href: "https://linkedin.com/in/gururajhr",
    },
    {
      icon: <Github size={24} />,
      text: "GitHub",
      href: "https://github.com/gururaj0305",
    },
    {
      icon: <Phone size={24} />,
      text: "+91 98806 99054",
      href: "tel:+919880699054",
    },
  ];

  useGSAP(() => {
    const links = linksRef.current;

    // --- LINK ANIMATION: rise + float ---
    gsap.set(links, { y: 10, opacity: 0, scale: 0.8 });
    gsap.to(links, {
      y: 0,
      opacity: 1,
      scale: 1,
      stagger: 0.2,
      duration: 1.2,
      ease: "elastic.out(1, 0.7)",
    });

    gsap.to(links, {
      y: 0,
      repeat: -1,
      yoyo: true,
      duration: 2.5,
      ease: "sine.inOut",
      stagger: 0.15,
    });

    // --- SPACE PARTICLES + SHOOTING STARS ---
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const stars = [];
    const shootingStars = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Initialize twinkling stars
    const numStars = 100;
    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.8 + 0.4,
        alpha: Math.random(),
        twinkleSpeed: Math.random() * 0.02 + 0.01,
      });
    }

    // Create random shooting stars
    const createShootingStar = () => {
      const startX = Math.random() * canvas.width;
      const startY = Math.random() * (canvas.height / 2);
      const length = Math.random() * 80 + 100;
      const speed = Math.random() * 8 + 6;
      shootingStars.push({
        x: startX,
        y: startY,
        len: length,
        speedX: speed,
        speedY: speed * 0.4,
        alpha: 1,
      });
    };

    // Launch new shooting stars periodically
    setInterval(() => {
      if (Math.random() < 0.6) createShootingStar();
    }, 1000);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- Draw twinkling stars ---
      for (let s of stars) {
        s.alpha += s.twinkleSpeed;
        if (s.alpha <= 0.1 || s.alpha >= 1) s.twinkleSpeed *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(200,220,255,${s.alpha})`;
        ctx.fill();
      }

      // --- Draw shooting stars ---
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.x -= s.speedX;
        s.y += s.speedY;
        s.alpha -= 0.02;

        const grad = ctx.createLinearGradient(
          s.x,
          s.y,
          s.x + s.len,
          s.y - s.len * 0.4
        );
        grad.addColorStop(0, `rgba(180,220,255,${s.alpha})`);
        grad.addColorStop(1, "rgba(255,255,255,0)");

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + s.len, s.y - s.len * 0.4);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (s.alpha <= 0) shootingStars.splice(i, 1);
      }

      requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative flex flex-col items-center justify-center h-screen px-6 text-center text-white overflow-hidden"
    >
      {/* Canvas (behind content) */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-0 pointer-events-none"
      />

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight">
          Let’s <span className="text-blue-400">Connect</span>
        </h1>

        <p className="text-gray-300 text-lg md:text-xl mb-12 leading-relaxed">
          I’m always open to collaboration, project opportunities, or just a
          friendly tech chat. Reach out through any of the following channels:
        </p>

        <div className="flex flex-wrap justify-center gap-10">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              ref={(el) => (linksRef.current[i] = el)}
              className="flex items-center gap-3 text-lg font-medium text-gray-300 transition-transform"
            >
              {link.icon}
              {link.text}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
