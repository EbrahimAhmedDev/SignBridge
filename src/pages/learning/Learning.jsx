import React from "react";
import { Link } from "react-router-dom"; // استيراد Link
import style from "./learning.module.css";
import lettersImg from "../../assets/learning1.png";
import colorsImg from "../../assets/learninig2.png";
import numbersImg from "../../assets/learninig3.png";
import sentencesImg from "../../assets/learninig4.png";

const Learning = () => {
  const modules = [
    {
      id: 1,
      title: "Learning Letters",
      description: "Learn Arabic alphabet in sign language.",
      image: lettersImg,
      btnColor: "#fcd4b4",
      path: "/learning/letters", // المسار الخاص بكل موديول
    },
    {
      id: 2,
      title: "Learning Colors",
      description: "Learn Colors in sign language.",
      image: colorsImg,
      btnColor: "#c1e8ed",
      path: "/learning/colors",
    },
    {
      id: 3,
      title: "Learning Numbers",
      description: "Learn to Count in sign language.",
      image: numbersImg,
      btnColor: "#d3d3df",
      path: "/learning/numbers",
    },
    {
      id: 4,
      title: "Learning Famous Sentences",
      description: "Learn the Most Famous Sentences in Sign Language",
      image: sentencesImg,
      btnColor: "#cce4b0",
      path: "/learning/sentences",
    },
  ];

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
        {modules.map((mod) => (
          <div key={mod.id} className={style.card}>
            <div className={style.imageWrapper}>
              <img src={mod.image} alt={mod.title} className={style.modImage} />
            </div>
            <div className={style.infoWrapper}>
              <h3 className={style.modTitle}>{mod.title}</h3>
              <p className={style.modDesc}>{mod.description}</p>
              {/* تحويل الـ button إلى Link وتمرير الـ path */}
              <Link
                to={mod.path}
                className={style.startBtn}
                style={{ backgroundColor: mod.btnColor }}
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