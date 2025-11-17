import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function NavButton({
  children,
  to = "#",
  strokeColor = "#51a2ff",
  strokeWidth = 2,
  animationDuration = 0.2,
  borderRadius = 0,
  hoverColor = "#51a2ff",
  color = "#51a2ff",
  liftOnHover = true,
  backgroundColor = "transparent",
}) {
  const [hover, setHover] = useState(false);
  const location = useLocation();

  // Active route
  const isActive = location.pathname === to;
  const isAnimated = hover || isActive;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Button */}
      <Link to={to} className="no-underline">
        <button
          className="
            relative z-20 px-3 py-1 transition-all duration-300
            text-sm font-medium
          "
          style={{
            color: isActive ? hoverColor : color,
            transform:
              isActive && liftOnHover ? "translateY(-3px)" : "translateY(0)",
            backgroundColor,
            borderRadius,
          }}
        >
          {children}
        </button>
      </Link>

      {/* Top Border */}
      <span
        className="absolute top-0 left-0"
        style={{
          width: isAnimated ? "15px" : "0px",
          height: strokeWidth,
          background: strokeColor,
          transition: `width ${animationDuration}s ease`,
        }}
      />

      {/* Left Border */}
      <span
        className="absolute top-0 left-0"
        style={{
          width: strokeWidth,
          height: isAnimated ? "15px" : "0px",
          background: strokeColor,
          transition: `height ${animationDuration}s ease`,
          transitionDelay: isAnimated ? `${animationDuration}s` : "0s",
        }}
      />
    </span>
  );
}

export default NavButton;
