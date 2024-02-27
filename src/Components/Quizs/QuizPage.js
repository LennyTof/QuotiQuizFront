import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import IsConnect from '../Users/UserLoggedIn';
import '../../style/quiz.css';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [answeredQuestions, setAnswerQuestions] = useState([]);
  const isLoggedIn = IsConnect()
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomQuiz();
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
      const totalScore = rightAnswer + (isAnswerCorrect ? 1 : 0);

      setTimeout(() => {
        handleQuizCompletion(totalScore);
        navigate('/result', { state: totalScore });
      }, 500);
    } else {
      fetchRandomQuiz();
    }
  };

  const handleQuizCompletion = async (totalScore) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.post('http://localhost:3000/api/user/score',
      { score: totalScore },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error("Erreur lors de l'enregistrement du score:", error)
;    };
  };

  if (!quiz) {
    return <p>Chargement en cours...</p>
  }

  return (
    <div className="quiz-page">
      <div className="quiz">
        <h1>Question {askedQuestions.length}</h1>
        <h2>{quiz.question}</h2>
        <ul className="answer">
          {quiz.options.map((answer, index) => (
            <li key={index}>
              <button onClick={() => setSelectedAnswer(answer)} className={selectedAnswer === answer ? "btn btn-warning" : "btn btn-success"}>{answer}</button>
            </li>
          ))}
        </ul>
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
    </div>
  )
}

export default QuizPage;
