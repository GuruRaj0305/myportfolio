import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Button({ children, to = "#", arrow = false, targetBlank = false }) {
  return (
    <Link
      to={to}
      target={targetBlank ? "_blank" : undefined}
      rel={targetBlank ? "noopener noreferrer" : undefined}
      className="btn-editorial"
    >
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow" size={15} strokeWidth={2.2} />}
    </Link>
  );
}

export default Button;
