import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function LaserButton({ children, to = "#", arrow = false, targetBlank = false }) {
  const [hover, setHover] = useState(false);

  return (
    <span
      className="relative inline-block"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* INNER WRAPPER (BG + TEXT) */}
      <Link
        to={to}
        target={targetBlank ? "_blank" : undefined}
        className="
          px-4 py-2
          text-[#51a2ff]
          transition-all duration-300
          relative
          inline-flex items-center
          z-10   /* <-- above bg but below borders */
        "
        style={{ borderRadius: 0 }}
      >
        {/* BACKGROUND LAYER BELOW */} 
        <span
          className="absolute inset-0 -z-10 transition-all duration-300"
          style={{
            backgroundColor: hover ? "#051937" : "transparent",
          }}
        />

        {children}

        {/* ARROW */}
        {arrow && (
          <span
            className="ml-3 relative inline-block"
            style={{
              width: "25px",
              height: "25px",
              transition: "all 0.35s ease",
              transform: hover ? "translateX(6px)" : "translateX(0)",
            }}
          >
            <ArrowRight
              className="absolute top-0 left-0"
              style={{
                width: "100%",
                height: "100%",
                color: "#51a2ff",
                transition: "all 0.35s ease",
              }}
            />
            <span
              className="absolute inset-0"
              style={{
                border: hover ? "2px solid #51a2ff" : "2px solid transparent",
                transform: hover
                  ? "rotate(45deg)"
                  : "rotate(45deg) scale(0.6)",
                transition: "all 0.35s ease",
              }}
            />
          </span>
        )}
      </Link>

      {/* ------------------------- */}
      {/* LASER BORDERS (TOP LAYER) */}
      {/* ------------------------- */}

      {/* TOP */}
      <span
        className="absolute top-0 left-0 h-[2px] z-20"   // <-- top layer
        style={{
          width: hover ? "100%" : "0",
          background:
            "linear-gradient(90deg,#51a2ff,#9fcdff 70%,rgba(81,162,255,0))",
          boxShadow: hover ? "0 0 10px #51a2ff,0 0 20px #51a2ff" : "none",
          transition: "width 0.25s linear",
        }}
      />

      {/* RIGHT */}
      <span
        className="absolute top-0 right-0 w-[2px] z-20"
        style={{
          height: hover ? "100%" : "0",
          background:
            "linear-gradient(180deg,#51a2ff,#9fcdff 70%,rgba(81,162,255,0))",
          boxShadow: hover ? "0 0 10px #51a2ff,0 0 20px #51a2ff" : "none",
          transition: "height 0.25s linear 0.25s",
        }}
      />

      {/* BOTTOM */}
      <span
        className="absolute bottom-0 right-0 h-[2px] z-20"
        style={{
          width: hover ? "100%" : "0",
          background:
            "linear-gradient(270deg,#51a2ff,#9fcdff 70%,rgba(81,162,255,0))",
          boxShadow: hover ? "0 0 10px #51a2ff,0 0 20px #51a2ff" : "none",
          transition: "width 0.25s linear 0.5s",
        }}
      />

      {/* LEFT */}
      <span
        className="absolute bottom-0 left-0 w-[2px] z-20"
        style={{
          height: hover ? "100%" : "0",
          background:
            "linear-gradient(0deg,#51a2ff,#9fcdff 70%,rgba(81,162,255,0))",
          boxShadow: hover ? "0 0 10px #51a2ff,0 0 20px #51a2ff" : "none",
          transition: "height 0.25s linear 0.75s",
        }}
      />
    </span>
  );
}

export default LaserButton;
