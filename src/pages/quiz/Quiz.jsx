import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./quiz.module.css";
import signImage from "../../assets/learning1.png";

const Quiz = () => {
  const navigate = useNavigate();
  const [submitted, setSubmitted] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);

  const questions = [
    { id: 1, letter: "A", options: [signImage, signImage, signImage] },
    { id: 2, letter: "B", options: [signImage, signImage, signImage] },
    { id: 3, letter: "C", options: [signImage, signImage, signImage] },
    { id: 4, letter: "D", options: [signImage, signImage, signImage] },
  ];

  const handleSelect = (questionId, optionIndex) => {
    if (submitted) return;
    setSelectedAnswers({ ...selectedAnswers, [questionId]: optionIndex });
  };

  const handleSubmit = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === 0) correctCount++;
    });
    setScore(correctCount);
    setSubmitted(true);
  };

  return (
    <div className={style.quizPage}>
      <h1 className={style.resultTitle}>Sign Language Quiz</h1>

      <div className={style.questionsContainer}>
        {questions.map((q, index) => (
          <div key={q.id} className={style.questionWrapper}>
            <h2 className={style.questionText}>
              {index + 1}. Choose the correct sign for letter "{q.letter}"
            </h2>
            <div className={style.optionsGrid}>
              {q.options.map((img, i) => {
                const isSelected = selectedAnswers[q.id] === i;
                const isCorrect = submitted && i === 0;
                const isWrong = submitted && isSelected && i !== 0;
                return (
                  <div
                    key={i}
                    className={`${style.optionCard} ${isSelected ? style.selectedBorder : ""} ${isCorrect ? style.correctResult : ""} ${isWrong ? style.wrongResult : ""}`}
                    onClick={() => handleSelect(q.id, i)}
                  >
                    <img src={img} alt="Sign option" />
                  </div>
                );
              })}
            </div>
            {index !== questions.length - 1 && <hr className={style.line} />}
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
              Your Score:{" "}
              <span>
                {score} / {questions.length}
              </span>
            </div>
            <button
              className={style.backBtn}
              onClick={() => navigate("/learning/letters")}
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
