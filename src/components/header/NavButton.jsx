import { Box, Button } from "@mui/material";
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

  // Check if this button's URL matches current route
  const isActive = location.pathname === to;

  // Combine hover + active effect
  const isAnimated = hover || isActive;

  return (
    <Box
      component="span"
      sx={{
        position: "relative",
        display: "inline-block",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={to} style={{ textDecoration: "none" }}>
        <Button
          sx={{
            position: "relative",
            zIndex: 2,
            color: isActive ? hoverColor : color,
            backgroundColor,
            textTransform: "none",
            borderRadius: borderRadius,
            overflow: "hidden",
            transform: isActive && liftOnHover ? "translateY(-3px)" : "none",
            transition: "color 0.3s ease, transform 0.3s ease",
            "&:hover": {
              color: hoverColor,
              transform: liftOnHover ? "translateY(-3px)" : "none",
            },
          }}
        >
          {children}
        </Button>
      </Link>

      {/* Border animation */}
      <>
        {/* Top line */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: isAnimated ? "15px" : "0",
            height: strokeWidth,
            background: strokeColor,
            transition: `width ${animationDuration}s ease`,
            zIndex: 1,
          }}
        />
        {/* Left line */}
        <span
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: strokeWidth,
            height: isAnimated ? "15px" : "0",
            background: strokeColor,
            transition: `height ${animationDuration}s ease`,
            transitionDelay: isAnimated ? `${animationDuration}s` : "0s",
            zIndex: 1,
          }}
        />
      </>
    </Box>
  );
}

export default NavButton;
