// import logo from "../../assets/Logo.png";
// import { NavLink, Link } from "react-router-dom";
// import style from "./navbar.module.css";
// const Navbar = () => {
//   return (
//     <nav className={style.nav}>
//       <Link to="/">
//         <img src={logo} alt="SignBridge Logo" style={{ height: "45px" }} />
//       </Link>
//       <ul className={style.navLinks}>
//         <li>
//           <NavLink to="/">Home</NavLink>
//         </li>
//         <li>
//           <NavLink to="/sign-to-text">Sign to Text</NavLink>
//         </li>
//         <li>
//           <NavLink to="/text-to-sign">Text to Sign</NavLink>
//         </li>
//         <li>
//           <NavLink to="/learning">Learning</NavLink>
//         </li>
//         <li>
//           <NavLink to="/about">About us</NavLink>
//         </li>
//       </ul>

//       <div className={style.auth}>
//         <NavLink to="/login" className={style.loginBtn}>
//           Login
//         </NavLink>
//         <NavLink to="/signup" className={style.signupBtn}>
//           SignUp
//         </NavLink>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import logo from "../../assets/Logo.png";
import { NavLink, Link } from "react-router-dom";
import style from "./navbar.module.css";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className={style.nav}>
      <Link to="/" className={style.logoContainer}>
        <img src={logo} alt="SignBridge Logo" style={{ height: "45px" }} />
      </Link>

      <div className={style.menuIcon} onClick={toggleMenu}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`${style.navLinks} ${isOpen ? style.activeMenu : ""}`}>
        <li>
          <NavLink to="/" onClick={() => setIsOpen(false)}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/sign-to-text" onClick={() => setIsOpen(false)}>
            Sign to Text
          </NavLink>
        </li>
        <li>
          <NavLink to="/text-to-sign" onClick={() => setIsOpen(false)}>
            Text to Sign
          </NavLink>
        </li>
        <li>
          <NavLink to="/learning" onClick={() => setIsOpen(false)}>
            Learning
          </NavLink>
        </li>
        {/* <li>
          <NavLink to="/about" onClick={() => setIsOpen(false)}>
            About us
          </NavLink>
        </li> */}

        <div className={style.mobileAuth}>
          <NavLink to="/login" onClick={() => setIsOpen(false)}>
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={style.signupBtn}
            onClick={() => setIsOpen(false)}
          >
            SignUp
          </NavLink>
        </div>
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
