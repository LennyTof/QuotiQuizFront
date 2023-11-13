import React from "react";
import QuizPage from "./QuizPage";
import { useLocation } from "react-router-dom";

const ResultPage = () => {

  const location = useLocation();
  let question = "";
  if (location.state >= 2) {
    question = "questions";
  } else {
    question = "question";
  };

  return (
    <div>
      <h1>C'est terminé pour aujourd'hui !</h1>
      <p>
        Tu as correctement répondu à {location.state} {question} sur 5 !
      </p>
    </div>
  );
};

export default ResultPage;
