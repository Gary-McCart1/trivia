import { useEffect, useRef, useState } from "react";

import "./index.css";
import EndScreen from "./components/EndScreen";
import QuestionCard from "./components/QuestionCard";

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [shouldRestart, setShouldRestart] = useState(false);
  const [endScreen, setEndScreen] = useState(false);

  const timer = useRef(20);
  const [timeLeft, setTimeLeft] = useState(timer.current);

  useEffect(() => {
    timer.current = 20;
    setTimeLeft(timer.current);
    setShouldRestart(false);
    setEndScreen(false);
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          "https://the-trivia-api.com/api/questions?limit=10&catagory=general_knowledge"
        );
        const data = await response.json();
        setQuestions(data);
        setQuestionNumber(1);
        setCorrectAnswers(0);
      } catch (error) {
        console.log(error);
      }
    };
    fetchQuestions();
  }, [shouldRestart]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer.current > 0) {
        timer.current = timer.current - 1;
        setTimeLeft(timer.current);
      } else {
        if (questionNumber < 10) {
          setQuestionNumber((q) => q + 1);
          timer.current = 20;
          setTimeLeft(timer.current);
          clearInterval(interval);
        }
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [questionNumber]);

  return (
    <div className="main">
      <h1>General Knowledge Trivia 🧐</h1>
      <div className="round-info">
        {!endScreen && <p>Question: {questionNumber}/10</p>}
        <p>Correct: {correctAnswers}/10</p>
        <p>Timer: {timeLeft}</p>
      </div>
      {!endScreen ? (
        <>
          <div className="questions-map">
            {questions.map(
              (question) =>
                questionNumber === questions.indexOf(question) + 1 && (
                  <QuestionCard
                    timer={timer}
                    timeLeft={timeLeft}
                    setTimeLeft={setTimeLeft}
                    setEndScreen={setEndScreen}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setCorrectAnswers={setCorrectAnswers}
                    question={question}
                  />
                )
            )}
          </div>
        </>
      ) : (
        <EndScreen
          shouldRestart={shouldRestart}
          setShouldRestart={setShouldRestart}
        />
      )}
    </div>
  );
};

export default App;
