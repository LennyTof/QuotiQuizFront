import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import '../style/quiz.css';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [answeredQuestions, setAnswerQuestions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomQuiz();
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
  }, []);

  const fetchRandomQuiz = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/quiz/random');

      if(askedQuestions.includes(response.data._id)) {
        fetchRandomQuiz();
        return;
      }
      setAskedQuestions([...askedQuestions, response.data._id]);
      setQuiz(response.data);
    } catch (error) {
      console.error("Impossible de récupérer un quiz :", error);
    }
  };

  const handleAnswerClick = () => {
    const isAnswerCorrect = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setRightAnswer(prev => prev +1);
      alert("Bonne réponse !");
    } else {
      alert("Mauvaise réponse :( ")
    };

    setAnswerQuestions([...answeredQuestions, isAnswerCorrect ? 'correct' : 'false']);

    if (askedQuestions.length === 5) {
      setTimeout(() => {
        navigate('/result', { state: rightAnswer + (isAnswerCorrect ? 1 : 0) });
      }, 500);
    } else {
      fetchRandomQuiz();
    }
  };

  if (!quiz) {
    return <p>Chargement en cours...</p>
  }

  return (
    <div className="quiz-page">
      {!isLoggedIn && <Link to="/login" className='btn btn-success mb-1'>Créer un compte/ Se connecter</Link>}
      {isLoggedIn && <Link to="/profil" className='btn btn-success mb-1'>Profil</Link>}
      <h1>Prêt pour les questions du jour ?</h1>
      <div className="quiz">
        <h2>{quiz.question}</h2>
        <ul className="answer">
          {quiz.options.map((answer, index) => (
            <li key={index}>
              <button onClick={() => setSelectedAnswer(answer)} className={selectedAnswer === answer ? "btn btn-warning" : "btn btn-success"}>{answer}</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={handleAnswerClick} className="btn btn-info">Valider</button>
      </div>
      <p>Tu as correctement répondu {rightAnswer} fois</p>
      <div className="rectangles container">
        {askedQuestions.map((question, index) => (
          <div key={index} className={`${index < answeredQuestions.length ? answeredQuestions[index] : ""}`}></div>
        ))}
      </div>
    </div>
  )
}

export default QuizPage;
