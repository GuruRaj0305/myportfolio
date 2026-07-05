import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Logo from "./Logo";
import NavButton from "./NavButton";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(TextPlugin);

const NAV_LINKS = [
  { text: "Home", link: "/" },
  // { text: "About", link: "/about" },
  { text: "Projects", link: "/projects" },
  { text: "Experience", link: "/experience" },
  { text: "Contact", link: "/contact" },
];

function Header() {
  const location = useLocation();
  const headerRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const linksRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Animate logo and desktop nav
  useEffect(() => {
    const ctx = gsap.context(() => {
      
      gsap.from(".logo", {
        y: -50,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });
      gsap.from("header nav.desktop ul li", {
        y: -20,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.5,
        ease: "power3.out",
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);


  // Animate mobile menu
  useEffect(() => {
    if (!menuRef.current) return;

    if (menuOpen) {
      gsap.to(line1Ref.current, { rotate: 45, y: 8, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.3 });
      gsap.to(line3Ref.current, { rotate: -45, y: -8, duration: 0.3 });

      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" });

      linksRef.current.forEach((link, i) => {
        gsap.fromTo(
          link,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.4,
            delay: i * 0.1,
            ease: "power2.out",
          }
        );
      });

    } else {
      gsap.to(line1Ref.current, { rotate: 0, y: 0, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 1, duration: 0.3 });
      gsap.to(line3Ref.current, { rotate: 0, y: 0, duration: 0.3 });

      gsap.to(menuRef.current, { x: "100%", duration: 0.5, ease: "power3.in" });
    }
  }, [menuOpen]);


  return (
    <>
      <header
        ref={headerRef}
        className={`site-header fixed top-0 left-0 w-full z-50 ${scrolled ? "is-scrolled" : ""}`}
      >
        <div className="site-header-shell">
          <div className="logo site-brand">
            <Logo />
            <div className="site-brand-copy">
              <strong>Gururaj HR</strong>
              <span>Software Engineer</span>
            </div>
          </div>

          <nav className="desktop hidden md:block">
            <span className="site-nav-caption">Portfolio index</span>
            <ul className="site-nav-list">
              {NAV_LINKS.map((link) => (
                <li key={link.link}>
                  <NavButton to={link.link}>{link.text}</NavButton>
                </li>
              ))}
            </ul>
          </nav>

          <button
            type="button"
            className="site-menu-toggle md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
          >
            <span ref={line1Ref} />
            <span ref={line2Ref} />
            <span ref={line3Ref} />
          </button>
        </div>

        {/* Mobile menu */}
        <nav
          ref={menuRef}
          className="site-mobile-menu md:hidden"
          style={{ transform: "translateX(100%)" }}
        >
          <p>Navigation / 05</p>
          <ul>
            {NAV_LINKS.map((info, idx) => (
              <Link
                to={info.link}
                key={idx}
                ref={(el) => (linksRef.current[idx] = el)}
                onClick={() => setMenuOpen(false)}
                className={location.pathname === info.link ? "is-active" : ""}
              >
                <span>{String(idx + 1).padStart(2, "0")}</span>
                {info.text}
              </Link>
            ))}
          </ul>
        </nav>
      </header>

      
      
    </>
  );
}

export default Header;
