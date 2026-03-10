import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./learning.module.css";
import API from "../../api/authService";
import lettersImg from "../../assets/learning1.png";

const Learning = () => {
  const [modules, setModules] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const token = localStorage.getItem("token");

  const btnColors = ["#fcd4b4", "#c1e8ed", "#d3d3df", "#cce4b0"];

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const getModules = async () => {
      try {
        const res = await API.get("/modules");
        setModules(res.data);
      } catch (err) {
        console.error("Error fetching modules:", err);
      } finally {
        setLoading(false);
      }
    };
    getModules();
  }, [token]);

  if (loading) return <div className={style.loader}>Loading...</div>;

  if (!token) {
    return (
      <div className={style.pageContainer}>
        <div className={style.authNoticeSection}>
          <h1 className={style.mainTitle}>Access Restricted</h1>
          <p className={style.description}>
            Please log in or create an account to view our learning modules and start your journey.
          </p>
          <div className={style.authActions}>
            <Link to="/login" className={style.loginBtn}>Login Now</Link>
            <Link to="/signup" className={style.signupBtn}>Create Account</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={style.pageContainer}>
      <div className={style.headerSection}>
        <h1 className={style.mainTitle}>Learn Sign Language</h1>
        <p className={style.description}>
          Choose a module to start your language journey. Select from the
          options below to begin learning.
        </p>
      </div>

      <div className={style.modulesGrid}>
        {modules.map((mod, index) => (
          <div key={mod._id} className={style.card}>
            <div className={style.imageWrapper}>
              <img
                src={mod.coverImage?.url || lettersImg}
                alt={mod.title}
              />
            </div>
            <div className={style.infoWrapper}>
              <h3 className={style.modTitle}>{mod.title}</h3>
              <p className={style.modDesc}>{mod.description}</p>
              <Link
                to={`/learning/${mod._id}`}
                className={style.startBtn}
                style={{ backgroundColor: btnColors[index % btnColors.length] }}
              >
                Start Learning
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Learning;