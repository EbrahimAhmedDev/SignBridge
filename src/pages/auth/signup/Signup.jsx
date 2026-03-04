import React from "react";
import style from "./signup.module.css";
import signupImg from "../../../assets/image 10.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div className={style.signupContainer}>
      <div className={style.signupCard}>
        <div className={style.imageSection}>
          <img src={signupImg} alt="Person signing" />
        </div>

        <div className={style.formSection}>
          <h2 className={style.title}>Create your account</h2>
          <p className={style.subtitle}>
            Join our community to start learning sign language
          </p>

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
            <input type="text" placeholder="First Name" required />
            <input type="text" placeholder="Second Name" required />
            <input type="email" placeholder="Email address" required />
            <input type="password" placeholder="Password" required />

            <button type="submit" className={style.submitBtn}>
              Sign Up
            </button>
          </form>

          <p className={style.footerText}>
            Already have an account? <Link to="/login">Log In</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
