import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; // Correct import for Vite

gsap.registerPlugin(ScrollTrigger);

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
      // Refresh ScrollTrigger after scroll
      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 0);
    }, 0);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
