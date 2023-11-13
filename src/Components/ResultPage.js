import React from "react";
import QuizPage from "./QuizPage";
import { useLocation } from "react-router-dom";

const ResultPage = () => {

  const location = useLocation();

  let numberOfCorrectAnswer = location.state ?? 0;

  const questionPlural = numberOfCorrectAnswer >= 2 ? "questions" : "question";

  return (
    <div>
      <h1>C'est terminé pour aujourd'hui !</h1>
      <p>
        Tu as correctement répondu à {numberOfCorrectAnswer} {questionPlural} sur 5 !
      </p>
    </div>
  );
};

export default ResultPage;
