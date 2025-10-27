import { useState } from "react";
import { Button, Box } from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { Link } from "react-router-dom";

function LaserButton({ children, to = "#", arrow = false, targetBlank = false }) {
  const [hover, setHover] = useState(false);

  return (
    <Box
      component="span"
      sx={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Use Link instead of href */}
      <Button
        component={Link}
        to={to}
        target={targetBlank ? "_blank" : undefined}
        sx={{
          px: 3,
          py: 1,
          textTransform: "none",
          borderRadius: 0,
          color: "#51a2ff",
          border: "2px solid transparent",
          position: "relative",
          overflow: "hidden",
          background: "transparent",
          "&:hover": { color: "#fff", background: "#051937" },
        }}
      >
        {children}

        {/* Arrow wrapper */}
        {arrow && (
          <span
            style={{
              display: "inline-block",
              width: "25px",
              height: "25px",
              marginLeft: "12px",
              position: "relative",
              transition: "all 0.35s ease",
              transform: hover ? "translateX(6px)" : "translateX(0)",
            }}
          >
            <ArrowForward
              style={{
                width: "100%",
                height: "100%",
                fill: "#51a2ff",
                transition: "all 0.35s ease",
              }}
            />
            <span
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                border: hover ? "2px solid #51a2ff" : "2px solid transparent",
                transform: hover ? "rotate(45deg)" : "rotate(45deg) scale(0.6)",
                transition: "all 0.35s ease",
              }}
            />
          </span>
        )}
      </Button>

      {/* Laser Borders with glowing head */}
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "2px",
          width: hover ? "100%" : "0",
          background:
            "linear-gradient(90deg, #51a2ff 0%, #9fcdff 70%, rgba(81,162,255,0) 100%)",
          boxShadow: hover ? "0 0 10px #51a2ff, 0 0 20px #51a2ff" : "none",
          transition: "width 0.25s linear",
        }}
      />
      <span
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "2px",
          height: hover ? "100%" : "0",
          background:
            "linear-gradient(180deg, #51a2ff 0%, #9fcdff 70%, rgba(81,162,255,0) 100%)",
          boxShadow: hover ? "0 0 10px #51a2ff, 0 0 20px #51a2ff" : "none",
          transition: "height 0.25s linear 0.25s",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          right: 0,
          height: "2px",
          width: hover ? "100%" : "0",
          background:
            "linear-gradient(270deg, #51a2ff 0%, #9fcdff 70%, rgba(81,162,255,0) 100%)",
          boxShadow: hover ? "0 0 10px #51a2ff, 0 0 20px #51a2ff" : "none",
          transition: "width 0.25s linear 0.5s",
        }}
      />
      <span
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "2px",
          height: hover ? "100%" : "0",
          background:
            "linear-gradient(0deg, #51a2ff 0%, #9fcdff 70%, rgba(81,162,255,0) 100%)",
          boxShadow: hover ? "0 0 10px #51a2ff, 0 0 20px #51a2ff" : "none",
          transition: "height 0.25s linear 0.75s",
        }}
      />
    </Box>
  );
}

export default LaserButton;
