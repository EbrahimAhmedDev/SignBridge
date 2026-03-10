import  { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./learningCategory.module.css";
import {  FaTimes } from "react-icons/fa";
import API from "../../api/authService"; // استيراد ملف الـ API بتاعك

const LearningCategory = () => {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const response = await API.get(`/modules/${id}`);
        setModuleData(response.data);
      } catch (err) {
        console.error("Error fetching category data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [id]);

  if (loading) return <div className={style.loader}>Loading...</div>;
  if (!moduleData) return <div className={style.error}>Module not found</div>;

  const { title, signs } = moduleData;

  const themeColor = "#fcd4b4";

  return (
    <div className={style.container}>
      <h1 className={style.mainTitle}>{title}</h1>

      <div className={style.itemsGrid}>
        {signs &&
          signs.map((item, index) => (
            <div
              key={index}
              className={style.itemCard}
              onClick={() => setSelectedItem(item)}
            >
              <div className={style.imageBox}>
                <img src={item.imageUrl?.url || item.image} alt={item.label} />
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
              <img
                src={selectedItem.imageUrl?.url || selectedItem.image}
                alt={selectedItem.label}
                onError={(e) =>
                  console.log("Error loading image: ", e.target.src)
                }
              />
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
        <h2 className={style.quizTitle}>Test Your Knowledge!</h2>
        <p className={style.quizDesc}>
          Ready to see how much you've learned about {title}?
        </p>

        <Link to={`/learning/${id}/quiz`} className={style.startQuizBtn}>
          Start the Quiz
        </Link>
      </div>
    </div>
  );
};

export default LearningCategory;
