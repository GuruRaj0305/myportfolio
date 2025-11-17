import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { TextPlugin } from "gsap/TextPlugin";
import Logo from "./Logo";
import NavButton from "./NavButton";
import { Link, useLocation } from "react-router-dom";

gsap.registerPlugin(TextPlugin);

function Header() {
  const location = useLocation();
  const headerRef = useRef(null);
  const navUl = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const linksRef = useRef([]);

  const mobileLinks = [{text:"Home", link: "/"}, {text:"About", link: "/about"}, {text:"Projects", link: "/projects"}, {text:"Experience", link: "/experience"}, {text:"Contact", link: "/contact"}];

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
      // Reset
      linksRef.current.forEach((link) => (link.innerText = ""));

      gsap.to(line1Ref.current, { rotate: 45, y: 8, duration: 0.3 });
      gsap.to(line2Ref.current, { opacity: 0, duration: 0.3 });
      gsap.to(line3Ref.current, { rotate: -45, y: -8, duration: 0.3 });

      gsap.to(menuRef.current, { x: 0, duration: 0.5, ease: "power3.out" });

      // Fade/slide in links instantly (no typing)
      linksRef.current.forEach((link, i) => {
        link.innerText = mobileLinks[i].text;

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

      linksRef.current.forEach((link) => (link.innerText = ""));
    }
  }, [menuOpen]);


  return (
    <>
      <header
        ref={headerRef}
        className="flex items-center justify-between py-5 px-6 md:px-10 fixed top-0 left-0 w-full z-50 text-white header"
      >
        <div className="logo">
          <Logo />
        </div>

        {/* Hamburger */}
        <div
          className="md:hidden cursor-pointer z-50 flex flex-col justify-center items-center gap-1"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <div ref={line1Ref} className="w-6 h-0.5 bg-white"></div>
          <div ref={line2Ref} className="w-6 h-0.5 bg-white"></div>
          <div ref={line3Ref} className="w-6 h-0.5 bg-white"></div>
        </div>

        {/* Desktop nav */}
        <nav ref={navUl} className="  desktop hidden md:block p-5">
          <ul className="flex gap-8 text-lg font-medium text-gray-300  ">
            {mobileLinks.map((link) => {
              return (
                <li key={link.link} >
                  <NavButton to={link.link}>{link.text}</NavButton>
                </li>
              )
            })}

          </ul>
        </nav>

        {/* Mobile menu */}
       <nav
          ref={menuRef}
          className="md:hidden fixed top-0 right-0 w-[100vw] h-[100vh] flex flex-col items-center justify-center gap-8 z-40 bg-black/90 backdrop-blur-sm"
          style={{ transform: "translateX(100%)" }}
        >
          <ul className="flex flex-col items-center gap-6 text-2xl">
            {mobileLinks.map((info, idx) => (
              <Link
                to={info.link}
                key={idx}
                ref={(el) => (linksRef.current[idx] = el)}
                onClick={() => setMenuOpen(false)}
                className="cursor-pointer"
              ></Link>
            ))}
          </ul>
        </nav>
      </header>

      
      
    </>
  );
}

export default Header;
