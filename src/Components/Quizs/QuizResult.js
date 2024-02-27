import React from "react";
import { useLocation } from "react-router-dom";

import '../../style/result.css';

const QuizResult = () => {
  const location = useLocation();
  
  let numberOfCorrectAnswer = location.state ?? 0;

  const questionPlural = numberOfCorrectAnswer >= 2 ? "questions" : "question";

  return (
    <div>
      <h1 className="mt-3">Quiz terminé !</h1>
      <div className="container">
        <h2 className="result">
          Tu as correctement répondu à {numberOfCorrectAnswer} {questionPlural} sur 5 !
        </h2>
      </div>
    </div>
  );
};

export default QuizResult;
