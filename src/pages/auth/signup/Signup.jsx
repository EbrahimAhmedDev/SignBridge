import { useState } from "react";
import style from "./signup.module.css";
import signupImg from "../../../assets/image 10.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const fullData = {
        name: `${formdata.firstName} ${formdata.secondName}`,
        email: formdata.email,
        password: formdata.password,
      };

      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        fullData,
      );

      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Account created successfully!");
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

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

          {error && (
            <p
              style={{ color: "red", fontSize: "0.8rem", marginBottom: "10px" }}
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
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formdata.firstName.trim()}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="secondName"
              placeholder="Second Name"
              value={formdata.secondName.trim()}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formdata.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formdata.password}
              onChange={handleChange}
              required
            />

            <button
              type="submit"
              className={style.submitBtn}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Sign Up"}
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
