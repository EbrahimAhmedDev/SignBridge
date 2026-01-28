import logo from "../../assets/Logo.png";
import { NavLink, Link } from "react-router-dom"; // استعملنا NavLink للينكات
import style from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className={style.nav}>
      <Link to="/">
        <img src={logo} alt="SignBridge Logo" style={{ height: "45px" }} />
      </Link>

      <ul className={style.navLinks}>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/sign-to-text">Sign to Text</NavLink>
        </li>
        <li>
          <NavLink to="/text-to-sign">Text to Sign</NavLink>
        </li>
        <li>
          <NavLink to="/learning">Learning</NavLink>
        </li>
        <li>
          <NavLink to="/about">About us</NavLink>
        </li>
      </ul>

      <div className={style.auth}>
        <NavLink to="/login" className={style.loginBtn}>
          Login
        </NavLink>
        <NavLink to="/signup" className={style.signupBtn}>
          SignUp
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
