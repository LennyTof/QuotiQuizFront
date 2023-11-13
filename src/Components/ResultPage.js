import React from "react";
import { useLocation } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();

  let numberOfCorrectAnswer = location.state ?? 0;

  const questionPlural = numberOfCorrectAnswer >= 2 ? "questions" : "question";

  return (
    <div>
      <h1>C'est terminé pour aujourd'hui !</h1>
      <h2>
        Tu as correctement répondu à {numberOfCorrectAnswer} {questionPlural} sur 5 !
      </h2>
      <h4>Rendez-vous demain pour un autre quiz !</h4>
    </div>
  );
};

export default ResultPage;
