import React, { useState } from "react";
import style from "./login.module.css"; // تأكد من إنشاء هذا الملف
import loginImg from "../../../assets/image 10.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

import Swal from "sweetalert2";
import API from "../../../api/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await API.post(
        "http://localhost:3000/api/auth/login",
        formData,
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 1500,
          timerProgressBar: true,
        });

        await Toast.fire({
          icon: "success",
          title: `Welcome back, ${response.data.user.name.split(" ")[0]}!`,
        });

        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Login Failed",
        text: err.response?.data?.error || "Invalid email or password",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <div className={style.imageSection}>
          <img src={loginImg} alt="Login visualization" />
        </div>

        <div className={style.formSection}>
          <h2 className={style.title}>Welcome Back</h2>
          <p className={style.subtitle}>
            Log in to continue your sign language journey
          </p>

          <div className={style.socialButtons}>
            <button className={style.socialBtn} type="button">
              <FcGoogle className={style.icon} /> Google
            </button>
            <button className={style.socialBtn} type="button">
              <FaFacebook className={`${style.icon} ${style.fbIcon}`} />{" "}
              Facebook
            </button>
          </div>

          <div className={style.divider}>
            <span>or</span>
          </div>

          <form className={style.form} onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={style.submitBtn}
              disabled={loading}
            >
              {loading ? "Verifying..." : "Log In"}
            </button>
          </form>

          <p className={style.footerText}>
            Don't have an account? <Link to="/signup">Sign Up</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
