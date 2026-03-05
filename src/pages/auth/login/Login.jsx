import React, { useState } from "react";
import style from "./login.module.css"; // تأكد من وجود ملف التنسيق
import loginImg from "../../../assets/image 10.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/login",
        formData,
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        alert("Welcome back!");
        navigate("/");
      }
    } catch (err) {
      setError(
        err.response?.data?.error || "Login failed. Please check your data.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={style.loginContainer}>
      <div className={style.loginCard}>
        <div className={style.imageSection}>
          <img src={loginImg} alt="Welcome back" />
        </div>

        <div className={style.formSection}>
          <h2 className={style.title}>Welcome Back</h2>
          <p className={style.subtitle}>Log in to continue your journey</p>

          {error && (
            <p
              style={{ color: "red", fontSize: "0.9rem", marginBottom: "10px" }}
            >
              {error}
            </p>
          )}

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
              {loading ? "Logging in..." : "Log In"}
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
