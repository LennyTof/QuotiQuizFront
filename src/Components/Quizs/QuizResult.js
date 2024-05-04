import React from "react";
import { useLocation } from "react-router-dom";
import { useLogin } from '../Users/LoginContext';

import '../../style/result.css';

const QuizResult = () => {

  // récupére le score
  const location = useLocation();
  const { isLoggedIn } = useLogin();

  let numberOfCorrectAnswer = location.state.totalScore ?? 0;

  const questionPlural = numberOfCorrectAnswer >= 2 ? "questions" : "question";
  return (
    <>
      <h1 className="mt-3">Quiz terminé !</h1>
      <div className="result-display">
        <h3>
          Tu as correctement répondu à {numberOfCorrectAnswer} {questionPlural} sur 5 !
        </h3>
        <ul className="list-result">
            {location.state.quizDetails.map((score, index) => (
              <li key={index}>
                <div>
                  <h5>{score.question}</h5>
                  <span className={score.userAnswer === score.correctAnswer ? "correct result-answer" : "false result-answer"}>{score.userAnswer}</span>
                </div>
              </li>
              ))}
          </ul>
        </div>
        <h4>{!isLoggedIn && 'Connecte toi pour enregistrer ton score !'}</h4>
    </>
  );
};

export default QuizResult;
