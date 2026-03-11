import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import style from "./quiz.module.css";
import Swal from "sweetalert2";
import API from "../../api/authService";

const Quiz = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await API.get(`/quizzes/${id}`);
        if (response.data.success) {
          setQuestions(response.data.questions);
        }
      } catch (err) {
        Swal.fire({
          icon: "error",
          title: "Oops!",
          text: "Could not load the exam.",
        });
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const handleSelect = (qIndex, optIndex) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [qIndex]: optIndex });
  };

  const handleSubmit = async () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      if (
        selectedAnswers[index] !== undefined &&
        q.options[selectedAnswers[index]].correct
      ) {
        correctCount++;
      }
    });

    const finalPercent = Math.round((correctCount / questions.length) * 100);
    setScore(correctCount);
    setSubmitted(true);

    try {
      await API.patch("/user/progress", {
        moduleId: id,
        progress: 100,
        quizScore: finalPercent,
      });

      if (finalPercent >= 50) {
        Swal.fire({
          title: "🎉 Congratulations!",
          html: `<b style="color: #28a745; font-size: 1.2rem;">You passed with ${finalPercent}%</b><br/>Your certificate is now available in your profile!`,
          icon: "success",
          confirmButtonText: "Awesome!",
          confirmButtonColor: "#003366",
        });
      } else {
        Swal.fire({
          title: "Keep Practicing!",
          text: `You scored ${finalPercent}%. You need 50% to pass.`,
          icon: "warning",
          confirmButtonText: "Try Again",
          confirmButtonColor: "#003366",
        });
      }
    } catch (err) {
      console.error("Save score error:", err);
    }
  };

  if (loading)
    return <div className={style.loader}>Preparing Final Exam...</div>;

  return (
    <div className={style.quizPage}>
      <div className={style.header}>
        <h1 className={style.title}>Final Module Exam</h1>
        <p className={style.subtitle}>
          Test your knowledge and earn your certificate
        </p>
      </div>

      <div className={style.questionsList}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className={style.questionBox}>
            <h3 className={style.questionText}>
              {qIndex + 1}. {q.questionText}
            </h3>
            <div className={style.optionsGrid}>
              {q.options.map((opt, i) => {
                const isSelected = selectedAnswers[qIndex] === i;
                const isCorrect = submitted && opt.correct;
                const isWrong = submitted && isSelected && !opt.correct;
                const imgSrc = opt.imageUrl?.url || opt.imageUrl || opt.image;

                return (
                  <div
                    key={i}
                    className={`${style.optionCard} 
                      ${isSelected ? style.selected : ""} 
                      ${isCorrect ? style.correct : ""} 
                      ${isWrong ? style.wrong : ""}`}
                    onClick={() => handleSelect(qIndex, i)}
                  >
                    <img src={imgSrc} alt="Sign option" />
                    {submitted && (
                      <span className={style.labelHint}>{opt.label}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className={style.footer}>
        {!submitted ? (
          <button
            className={style.submitBtn}
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
          >
            Submit Final Exam
          </button>
        ) : (
          <div className={style.resultContainer}>
            <div className={style.scoreDisplay}>
              Your Score:{" "}
              <span>
                {score} / {questions.length}
              </span>
            </div>

            <div className={style.buttonGroup}>
              {/* يظهر فقط في حالة النجاح 50% فأكثر */}
              {score / questions.length >= 0.5 && (
                <button
                  className={style.profileBtn}
                  onClick={() => navigate("/learning")}
                >
                  View My Profile
                </button>
              )}

              <button
                className={style.backBtn}
                onClick={() => navigate("/learning")}
              >
                Back to Learning
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
