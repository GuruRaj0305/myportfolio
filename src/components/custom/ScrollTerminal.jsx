import { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

/*
 * One continuous terminal session pinned to the bottom-right of the
 * viewport while the home page scrolls.
 *
 * The terminal itself never moves — as each chapter takes over, it types
 * a new command whose output tells that chapter's story, and the session
 * history stays, like a real shell. Scrolling back up pops the history.
 *
 * Performance: fixed element, no per-frame work — typing touches one small
 * text node every ~26ms only when a chapter changes.
 */
const SESSION = [
  {
    cmd: "whoami",
    out: [
      { t: "gururaj-hr · full-stack engineer" },
      { t: "3+ yrs · saas · aws · ai/llm" },
    ],
  },
  {
    cmd: "cat about.txt",
    out: [
      { t: "99.9% uptime · 12 microservices" },
      { t: "owns design → build → ship → run" },
    ],
  },
  {
    cmd: "gururaj --stack",
    out: [
      { t: "react · node.js · fastapi" },
      { t: "postgresql · docker · claude api" },
    ],
  },
  {
    cmd: "ls ~/projects",
    out: [
      { t: "multi-tenant-saas/   filestream/" },
      { t: "pms-ai-assistant/    ecommerce/" },
    ],
  },
  {
    cmd: "./connect",
    out: [
      { t: "200 OK · open to opportunities", accent: true },
      { t: "let’s build something great ↗" },
    ],
  },
];

const TYPE_MS = 26;

export default function ScrollTerminal() {
  const rootRef = useRef(null);
  const feedRef = useRef(null);
  const idleRef = useRef(null);

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
    const feed = feedRef.current;
    const idle = idleRef.current;

    let entries = [];
    let currentIndex = -1;
    let typeTimer = null;

    const stopTyping = () => {
      if (typeTimer) {
        clearInterval(typeTimer);
        typeTimer = null;
      }
    };

    const makeLine = (className, html) => {
      const p = document.createElement("p");
      p.className = `term-line ${className}`;
      p.innerHTML = html;
      return p;
    };

    const appendOutputs = (entry, item, animated) => {
      const lines = item.out.map((o) =>
        makeLine(`term-out${o.accent ? " term-accent" : ""}`, o.t)
      );
      lines.forEach((l) => entry.appendChild(l));
      if (animated) {
        gsap.fromTo(lines, { opacity: 0, y: 5 }, {
          opacity: 1, y: 0, duration: 0.4, stagger: 0.16, ease: "power2.out",
        });
      }
      idle.style.display = "";
    };

    // Append one command+output to the session; type it out unless instant.
    const appendEntry = (i, animated) => {
      const item = SESSION[Math.min(i, SESSION.length - 1)];
      const entry = document.createElement("div");
      entry.className = "term-entry";
      const typed = document.createElement("span");
      typed.className = "term-typed";
      const cmdLine = makeLine("term-cmd", `<span class="term-prompt">➜&nbsp;~</span> `);
      cmdLine.appendChild(typed);
      entry.appendChild(cmdLine);
      feed.insertBefore(entry, idle);
      entries.push(entry);

      if (!animated) {
        typed.textContent = item.cmd;
        appendOutputs(entry, item, false);
        return;
      }

      idle.style.display = "none";
      const caret = document.createElement("span");
      caret.className = "term-caret";
      cmdLine.appendChild(caret);

      let pos = 0;
      typeTimer = setInterval(() => {
        pos += 1;
        typed.textContent = item.cmd.slice(0, pos);
        if (pos >= item.cmd.length) {
          stopTyping();
          caret.remove();
          appendOutputs(entry, item, true);
        }
      }, TYPE_MS);
    };

    // Sync the session with the active chapter, both scroll directions.
    const syncSession = (index) => {
      if (index === currentIndex) return;
      stopTyping();
      if (index > currentIndex) {
        for (let k = currentIndex + 1; k <= index; k++) {
          const last = entries[entries.length - 1];
          if (last && !last.querySelector(".term-out")) {
            // finish an interrupted entry instantly before moving on
            const item = SESSION[Math.min(entries.length - 1, SESSION.length - 1)];
            last.querySelector(".term-typed").textContent = item.cmd;
            last.querySelector(".term-caret")?.remove();
            appendOutputs(last, item, false);
          }
          appendEntry(k, k === index);
        }
      } else {
        while (entries.length > index + 1) {
          entries.pop()?.remove();
        }
        idle.style.display = "";
      }
      currentIndex = index;
    };

    // Run the session command for whichever chapter is active.
    const triggers = sections.map((section, i) =>
      ScrollTrigger.create({
        trigger: section,
        start: "top 55%",
        end: "bottom 55%",
        onToggle: ({ isActive }) => {
          if (isActive) syncSession(i);
        },
      })
    );

    // Session over — fade out at the footer.
    let footerTween;
    if (footer) {
      footerTween = gsap.to(root, {
        autoAlpha: 0,
        ease: "none",
        immediateRender: false,
        scrollTrigger: { trigger: footer, start: "top 95%", end: "top 70%", scrub: true },
      });
    }

    // Entrance, then start the session.
    gsap.set(root, { autoAlpha: 0, y: 24 });
    gsap.to(root, { autoAlpha: 1, y: 0, duration: 0.9, delay: 0.8, ease: "power3.out" });
    syncSession(0);

    return () => {
      stopTyping();
      triggers.forEach((t) => t.kill());
      footerTween?.scrollTrigger?.kill();
      footerTween?.kill();
      entries.forEach((e) => e.remove());
    };
  }, []);

  return (
    <div ref={rootRef} className="scroll-terminal" aria-hidden="true">
      <div className="term-float">
        <div className="term-frame">
          <div className="term-bar">
            <span className="term-dot" />
            <span className="term-dot" />
            <span className="term-dot" />
            <span className="term-title">guru@portfolio — zsh</span>
          </div>
          <div className="term-body">
            <div ref={feedRef} className="term-feed">
              <p ref={idleRef} className="term-line term-cmd term-idle">
                <span className="term-prompt">➜&nbsp;~</span> <span className="term-caret" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
