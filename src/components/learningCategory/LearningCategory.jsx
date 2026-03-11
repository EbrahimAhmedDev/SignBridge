import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import style from "./learningCategory.module.css";
import { FaTimes, FaCheckCircle } from "react-icons/fa";
import API from "../../api/authService";

const LearningCategory = () => {
  const { id } = useParams();
  const [moduleData, setModuleData] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [completedItems, setCompletedItems] = useState([]); 

  useEffect(() => {
    const fetchCategoryData = async () => {
      try {
        const [moduleRes, profileRes] = await Promise.all([
          API.get(`/modules/${id}`),
          API.get("/user/profile"),
        ]);

        setModuleData(moduleRes.data);

        // سحب البيانات المخزنة مسبقاً من الباك إند
        const progressData = profileRes.data.modulesCompleted?.find(
          (m) => (m.moduleId?._id || m.moduleId) === id
        );

        if (progressData) {
          setCompletedItems(progressData.completedSigns || []);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryData();
  }, [id]);

  const handleItemClick = async (item) => {
    setSelectedItem(item);

    if (!completedItems.includes(item._id)) {
      const newCompleted = [...completedItems, item._id];
      setCompletedItems(newCompleted);

      const totalSigns = moduleData.signs.length;
      const progressPercent = Math.round((newCompleted.length / totalSigns) * 100);

      try {
        await API.patch("/user/progress", {
          moduleId: id,
          signId: item._id, 
          progress: progressPercent,
        });
      } catch (err) {
        console.error("Failed to update progress in backend", err);
      }
    }
  };

  if (loading) return <div className={style.loader}>Loading...</div>;
  if (!moduleData) return <div className={style.error}>Module not found</div>;

  const { title, signs } = moduleData;
  const themeColor = "#fcd4b4";
  const completedColor = "#d4edda"; 

  return (
    <div className={style.container}>
      <h1 className={style.mainTitle}>{title}</h1>

      <div className={style.itemsGrid}>
        {signs &&
          signs.map((item, index) => {
            const isDone = completedItems.includes(item._id);
            return (
              <div
                key={index}
                className={`${style.itemCard} ${isDone ? style.completedCard : ""}`}
                onClick={() => handleItemClick(item)}
              >
                {isDone && (
                  <div className={style.checkIcon}>
                    <FaCheckCircle />
                  </div>
                )}

                <div className={style.imageBox}>
                  <img src={item.imageUrl?.url || item.image} alt={item.label} />
                </div>
                <div
                  className={style.labelBox}
                  style={{ backgroundColor: isDone ? completedColor : themeColor }}
                >
                  {item.label}
                </div>
              </div>
            );
          })}
      </div>

      {selectedItem && (
        <div className={style.modalOverlay} onClick={() => setSelectedItem(null)}>
          <div className={style.modalContent} onClick={(e) => e.stopPropagation()}>
            <button className={style.closeBtn} onClick={() => setSelectedItem(null)}>
              <FaTimes />
            </button>
            <div className={style.modalImageBox}>
              <img src={selectedItem.imageUrl?.url || selectedItem.image} alt={selectedItem.label} />
            </div>
            <div className={style.modalLabelBox} style={{ backgroundColor: themeColor }}>
              {selectedItem.label}
            </div>
          </div>
        </div>
      )}

      <div className={style.quizSection}>
        <h2 className={style.quizTitle}>Test Your Knowledge!</h2>
        <p className={style.quizDesc}>Ready to see how much you've learned about {title}?</p>
        <Link to={`/learning/${id}/quiz`} className={style.startQuizBtn}>
          Start the Quiz
        </Link>
      </div>
    </div>
  );
};

export default LearningCategory;