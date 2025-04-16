import React from "react";
import { useEffect } from "react";
import { useState } from "react";

type QuestionType = {
  category: string;
  difficulty: string;
  question: string;
  correctAnswer: string;
  incorrectAnswers: string[];
}

interface Props{
  question: QuestionType,
  setCorrectAnswers: React.Dispatch<React.SetStateAction<number>>,
  questionNumber: number,
  setQuestionNumber: React.Dispatch<React.SetStateAction<number>>,
  timer: React.MutableRefObject<number>
  timeLeft: number,
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>,
  setEndScreen: React.Dispatch<React.SetStateAction<boolean>>
}

const QuestionCard = ({
  question,
  setCorrectAnswers,
  questionNumber,
  setQuestionNumber,
  timer,
  timeLeft,
  setTimeLeft,
  setEndScreen,
}: Props) => {
  let { correctAnswer, incorrectAnswers } = question;
  const [isLoaded, setIsLoaded] = useState(false);
  const [answerChoices, setAnswerChoices] = useState<string[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number>(-1);
  const [classType, setClassType] = useState("");

  useEffect(() => {
    const answers = [...incorrectAnswers, correctAnswer];
    let randomOrder = answers.sort();
    setAnswerChoices(randomOrder);
    setIsLoaded(true);
  }, [question]);

  const handleChoice = (choice: string, index: number) => {
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
        timer.current = 0;
        setTimeLeft(timer.current);
        setEndScreen(true);
        setClassType("");
      }, 1000);
    }
  };

  const getClassName = (choice: string, index: number) => {
    if (selectedAnswer === -1) return "answer-choice";

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
