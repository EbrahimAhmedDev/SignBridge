import { useState } from "react";
import logo from "../../assets/Logo.png";
import { NavLink, Link, useNavigate } from "react-router-dom";
import style from "./navbar.module.css";
import { FaBars, FaTimes, FaSignOutAlt } from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsOpen(false);
    navigate("/login");
  };

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
            <span className={style.beta}>Beta</span>
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

        <div className={style.mobileAuth}>
          {token ? (
            <div className={style.mobileUserInfo}>
              <span className={style.mobileName}>{user?.name}</span>
              <button onClick={handleLogout} className={style.logoutBtnMobile}>
                <FaSignOutAlt /> Logout
              </button>
            </div>
          ) : (
            <>
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
            </>
          )}
        </div>
      </ul>

      {/* الشاشات الكبيرة: عرض الأفتار والاسم أو أزرار الدخول */}
      <div className={style.auth}>
        {token ? (
          <div className={style.userProfile}>
            <span className={style.userName}>{user?.name?.split(" ")[0]}</span>
            <div className={style.avatar}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className={style.logoutIconBtn}
              title="Logout"
            >
              <FaSignOutAlt />
            </button>
          </div>
        ) : (
          <>
            <NavLink to="/login" className={style.loginBtn}>
              Login
            </NavLink>
            <NavLink to="/signup" className={style.signupBtn}>
              SignUp
            </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
