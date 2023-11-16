import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import '../../style/result.css';

const QuizResult = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  let numberOfCorrectAnswer = location.state ?? 0;

  const questionPlural = numberOfCorrectAnswer >= 2 ? "questions" : "question";

  return (
    <div>
      <h1 className="mt-3">C'est terminé pour aujourd'hui !</h1>
      <div className="container">
        <h2 className="result">
          Tu as correctement répondu à {numberOfCorrectAnswer} {questionPlural} sur 5 !
        </h2>
    </div>
    {isLoggedIn && <Link to="/profil" className='btn btn-success mb-1'>Profil</Link>}
    <h4>Rendez-vous demain pour un autre quiz !</h4>
    </div>
  );
};

export default QuizResult;
