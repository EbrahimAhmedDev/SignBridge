import  { useState, useEffect } from "react";
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
      console.error("Quiz Fetch Error:", err.response);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: err.response?.data?.message || "Could not load quiz questions",
      });
    } finally {
      setLoading(false);
    }
  };
  fetchQuiz();
}, [id]);

  const handleSelect = (questionIndex, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionIndex]: optionIndex });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q, index) => {
      const selectedIdx = selectedAnswers[index];
      if (selectedIdx !== undefined && q.options[selectedIdx].correct) {
        correctCount++;
      }
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  if (loading) return <div className={style.loader}>Generating Quiz...</div>;

  return (
    <div className={style.quizPage}>
      <h1 className={style.resultTitle}>Sign Language Quiz</h1>

      <div className={style.questionsContainer}>
        {questions.map((q, qIndex) => (
          <div key={qIndex} className={style.questionWrapper}>
            <h2 className={style.questionText}>
              {qIndex + 1}. {q.questionText}
            </h2>
            <div className={style.optionsGrid}>
              {q.options.map((opt, i) => {
                const isSelected = selectedAnswers[qIndex] === i;
                const isCorrect = submitted && opt.correct;
                const isWrong = submitted && isSelected && !opt.correct;

                return (
                  <div
                    key={i}
                    className={`${style.optionCard} 
                      ${isSelected ? style.selectedBorder : ""} 
                      ${isCorrect ? style.correctResult : ""} 
                      ${isWrong ? style.wrongResult : ""}`}
                    onClick={() => handleSelect(qIndex, i)}
                  >
                    <img src={opt.imageUrl?.url || opt.imageUrl} alt="Sign option" />
                  </div>
                );
              })}
            </div>
            {qIndex !== questions.length - 1 && <hr className={style.line} />}
          </div>
        ))}
      </div>

      <div className={style.actionSection}>
        {!submitted ? (
          <button
            className={style.submitBtn}
            onClick={handleSubmit}
            disabled={Object.keys(selectedAnswers).length < questions.length}
          >
            Submit Your Answers
          </button>
        ) : (
          <div className={style.resultControls}>
            <div className={style.scoreBadge}>
              Your Score: <span>{score} / {questions.length}</span>
            </div>
            <button
              className={style.backBtn}
              onClick={() => navigate(`/learning/${id}`)}
            >
              Back to Learning
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;