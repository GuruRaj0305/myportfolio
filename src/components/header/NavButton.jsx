import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function NavButton({
  children,
  to = "#",
  strokeColor = "#51a2ff",
  strokeWidth = 2,
  animationDuration = 0.3,
  hoverColor = "#51a2ff",
  color = "#51a2ff",
  liftOnHover = true,
  backgroundColor = "transparent",
}) {
  const [hover, setHover] = useState(false);
  const location = useLocation();

  const isActive = location.pathname === to;
  const isAnimated = hover || isActive;

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={to} className="no-underline">
        <button
          className="relative z-20 py-1 transition-all duration-300 text-sm font-medium"
          style={{
            color: isActive ? hoverColor : color,
            transform: isAnimated && liftOnHover ? "translateY(-3px)" : "translateY(0)",
            backgroundColor,
          }}
        >
          {children}
        </button>
      </Link>

      {/* Underline animation */}
      <span
        className="absolute left-0 bottom-0"
        style={{
          width: isAnimated ? "100%" : "0%",
          height: strokeWidth,
          background: strokeColor,
          transition: `width ${animationDuration}s ease`,
        }}
      />
    </span>
  );
}

export default NavButton;
