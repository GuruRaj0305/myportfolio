import { Link, useLocation } from "react-router-dom";

function NavButton({
  children,
  to = "#",
}) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`site-nav-link ${isActive ? "is-active" : ""}`}>
      <strong>{children}</strong>
      <span>{isActive ? "Current" : "Explore"}</span>
    </Link>
  );
}

export default NavButton;
