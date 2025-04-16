import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const QuestionCard = ({
  question,
  setCorrectAnswers,
  questionNumber,
  setQuestionNumber,
  timer,
  timeLeft,
  setTimeLeft,
  setEndScreen,
}) => {
  let { correctAnswer, incorrectAnswers } = question;
  const [isLoaded, setIsLoaded] = useState(false);
  const [answerChoices, setAnswerChoices] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [classType, setClassType] = useState("");

  useEffect(() => {
    const answers = [...incorrectAnswers, correctAnswer];
    let randomOrder = answers.sort();
    setAnswerChoices(randomOrder);
    setIsLoaded(true);
  }, [question]);

  const handleChoice = (choice, index) => {
    setSelectedAnswer(index);
    if (choice === correctAnswer) {
      setCorrectAnswers((c) => c + 1);
      setClassType("correct");
    } else {
      setClassType("incorrect");
    }
    if (questionNumber < 10) {
      setTimeout(() => {
        timer.current = 20;
        setTimeLeft(timer.current);
        setQuestionNumber((q) => q + 1);
        setClassType("");
      }, 1000);
    } else {
      setTimeout(() => {
        timer.current = null;
        setTimeLeft(timer.current);
        setEndScreen(true);
        setClassType("");
      }, 1000);
    }
  };

  const getClassName = (choice, index) => {
    if (selectedAnswer === null) return "answer-choice";

    if (choice === correctAnswer) return "answer-choice correct";
    if (index === selectedAnswer && choice !== correctAnswer)
      return "answer-choice incorrect";
    return "answer-choice";
  };

  return (
    <div className="question-card">
      <div className="question-info">
        <p>Category: {question.category}</p>
        <p>Difficulty: {question.difficulty}</p>
      </div>
      <div>
        <h2>{question.question}</h2>
        <div className="answer-choices">
          {isLoaded ? (
            answerChoices.map((choice, index) => (
              <button
                className={getClassName(choice, index)}
                onClick={() => handleChoice(choice, index)}
                key={index}
              >
                {choice}
              </button>
            ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
