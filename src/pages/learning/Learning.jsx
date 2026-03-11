import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import style from "./learning.module.css";
import API from "../../api/authService";
import lettersImg from "../../assets/learning1.png";

const Learning = () => {
  const [modules, setModules] = useState([]);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");
  const btnColors = ["#fcd4b4", "#c1e8ed", "#d3d3df", "#cce4b0"];
  const successGreen = "#28a745";

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    const fetchData = async () => {
      try {
        const [modulesRes, profileRes] = await Promise.all([
          API.get("/modules"),
          API.get("/user/profile"),
        ]);

        setModules(modulesRes.data);
        setUserProfile(profileRes.data);
      } catch (err) {
        console.error("Error fetching learning data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const getProgress = (modId) => {
    if (!userProfile) return 0;
    const found = userProfile.modulesCompleted?.find(
      (m) => (m.moduleId?._id || m.moduleId) === modId,
    );
    return found ? found.progress : 0;
  };

  if (loading) return <div className={style.loader}>Loading...</div>;

  if (!token) {
    return (
      <div className={style.pageContainer}>
        <div className={style.authNoticeSection}>
          <h1 className={style.mainTitle}>Access Restricted</h1>
          <p className={style.description}>
            Please log in or create an account to view our learning modules.
          </p>
          <div className={style.authActions}>
            <Link to="/login" className={style.loginBtn}>
              Login Now
            </Link>
            <Link to="/signup" className={style.signupBtn}>
              Create Account
            </Link>
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
          Choose a module to start your language journey. Track your progress as
          you go.
        </p>
      </div>

      <div className={style.modulesGrid}>
        {modules.map((mod, index) => {
          const progress = getProgress(mod._id);
          const isCompleted = progress === 100;
          const isStarted = progress > 0;

          return (
            <div
              key={mod._id}
              className={`${style.card} ${isCompleted ? style.completedCardBorder : ""}`}
            >
              <div className={style.imageWrapper}>
                <img
                  src={mod.coverImage?.url || lettersImg}
                  alt={mod.title}
                  className={style.modImage}
                />
              </div>
              <div className={style.infoWrapper}>
                <h3 className={style.modTitle}>{mod.title}</h3>

                {/* منطقة التقدم */}
                <div className={style.progressArea}>
                  <div className={style.progressTrack}>
                    <div
                      className={style.progressFill}
                      style={{
                        width: `${progress}%`,
                        backgroundColor: isCompleted
                          ? successGreen
                          : btnColors[index % btnColors.length],
                      }}
                    ></div>
                  </div>
                  <span
                    className={style.progressText}
                    style={{ color: isCompleted ? successGreen : "#8899a6" }}
                  >
                    {isCompleted ? "100% Completed" : `${progress}% Completed`}
                  </span>
                </div>

                <p className={style.modDesc}>{mod.description}</p>

                <Link
                  to={`/learning/${mod._id}`}
                  className={style.startBtn}
                  style={{
                    backgroundColor: isCompleted
                      ? successGreen
                      : btnColors[index % btnColors.length],
                    color: isCompleted ? "#fff" : "#334e68",
                  }}
                >
                  {isCompleted
                    ? "Review Lessons"
                    : isStarted
                      ? "Continue"
                      : "Start Learning"}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Learning;
