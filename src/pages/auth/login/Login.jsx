import React from "react";
import style from "./login.module.css";
import loginImg from "../../../assets/image 10.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
       
        <div className={style.imageSection}>
          <img src={loginImg} alt="Welcome Back" />
        </div>

      
        <div className={style.formSection}>
          <h2 className={style.title}>Welcome Back</h2>
          <p className={style.subtitle}>LogIn to continue your journey</p>

          <div className={style.socialButtons}>
            <button className={style.socialBtn}>
              <FcGoogle className={style.icon} /> Google
            </button>
            <button className={style.socialBtn}>
              <FaFacebook className={`${style.icon} ${style.fbIcon}`} />{" "}
              Facebook
            </button>
          </div>

          <div className={style.divider}>
            <span>or</span>
          </div>

          <form className={style.form}>
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />

            <div className={style.optionsRow}>
              <label className={style.rememberMe}>
                <input type="checkbox" /> Remember me
              </label>
              <Link to="/forgot-password" className={style.forgotPass}>
                Forgot password?
              </Link>
            </div>

            <button type="submit" className={style.submitBtn}>
              Log In
            </button>
          </form>

          <p className={style.footerText}>
            Don't have an account? <Link to="/signup">Sign UP</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
