import React from "react";
import { useLocation, Link } from "react-router-dom";
import IsConnect from "../Users/UserLoggedIn";
import LogoutButton from "../Buttons/LogoutButton";
import '../../style/result.css';

const QuizResult = () => {
  const location = useLocation();
  const isLoggedIn = IsConnect();

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
    {isLoggedIn && <Link to="/profil" className='btn btn-success mb-1'>Profil</Link>}
    {isLoggedIn && <LogoutButton />}
    </div>
  );
};

export default QuizResult;
