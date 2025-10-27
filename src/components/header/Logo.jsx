import { Link } from "react-router-dom";
import LogoImage from "../../../public/logo.webp";

function Logo() {
  return (
    <div className="flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 md:w-17 md:h-17 lg:w-20 lg:h-20">
      <Link to={"/"}>
        <img
          src={LogoImage}
          alt="Logo"
          className="max-w-full max-h-full object-contain"
        />
      </Link>
    </div>
  );
}

export default Logo;
