import React, { useState } from "react";
import { Link } from "react-router-dom"; 
import style from "./learningCategory.module.css";
import { FaPlay, FaTimes } from "react-icons/fa";

const LearningCategory = ({
  title,
  items,
  themeColor,
  quizTitle,
  quizDesc,
  // quizPath,
  categoryName,
}) => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className={style.container}>
      <h1 className={style.mainTitle}>{title}</h1>

      <div className={style.itemsGrid}>
        {items.map((item, index) => (
          <div
            key={index}
            className={style.itemCard}
            onClick={() => setSelectedItem(item)}
          >
            <div className={style.imageBox}>
              <img src={item.image} alt={item.label} />
            </div>
            <div
              className={style.labelBox}
              style={{ backgroundColor: themeColor }}
            >
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {selectedItem && (
        <div
          className={style.modalOverlay}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className={style.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={style.closeBtn}
              onClick={() => setSelectedItem(null)}
            >
              <FaTimes />
            </button>
            <div className={style.modalImageBox}>
              <img src={selectedItem.image} alt={selectedItem.label} />
              <div className={style.playOverlay}>
                <FaPlay className={style.playIcon} />
              </div>
            </div>
            <div
              className={style.modalLabelBox}
              style={{ backgroundColor: themeColor }}
            >
              {selectedItem.label}
            </div>
          </div>
        </div>
      )}

      <div className={style.quizSection}>
        <h2 className={style.quizTitle}>{quizTitle}</h2>
        <p className={style.quizDesc}>{quizDesc}</p>

        {/* <Link to={quizPath || "/quiz"} className={style.startQuizBtn}>
          Start the Quiz
        </Link> */}
        <Link
          to={`/learning/${categoryName}/quiz`}
          className={style.startQuizBtn}
        >
          Start the Quiz
        </Link>
      </div>
    </div>
  );
};

export default LearningCategory;
