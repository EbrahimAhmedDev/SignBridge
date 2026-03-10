import { useState } from "react";
import style from "./signup.module.css";
import signupImg from "../../../assets/image 10.png";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import API from "../../../api/authService";

const Signup = () => {
  const navigate = useNavigate();

  const [formdata, setFormData] = useState({
    firstName: "",
    secondName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const fullData = {
        name: `${formdata.firstName.trim()} ${formdata.secondName.trim()}`,
        email: formdata.email.trim(),
        password: formdata.password,
      };

      const response = await API.post(
        "http://localhost:5000/api/auth/register",
        fullData,
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
          didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
          },
        });

        await Toast.fire({
          icon: "success",
          title: "Account created!",
        });

        navigate("/");
      }
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: err.response?.data?.error || "Something went wrong!",
      });
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
              value={formdata.firstName}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="secondName"
              placeholder="Second Name"
              value={formdata.secondName}
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
