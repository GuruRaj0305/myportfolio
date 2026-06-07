import { Link } from "react-router-dom";
import LogoImage from "../../../public/logo.webp";

function Logo() {
  return (
    <div className="site-logo">
      <Link to={"/"}>
        <img
          src={LogoImage}
          alt="Logo"
        />
      </Link>
    </div>
  );
}

export default Logo;
