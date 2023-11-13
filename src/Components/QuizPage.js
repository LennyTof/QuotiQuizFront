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
  const navigate = useNavigate();

  const fetchRandomQuiz = async () => {
    const isFifthQuestion = askedQuestions.length > 4;
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

    if (isFifthQuestion) {
      navigate('/result', { state: rightAnswer });
    };
  };

  useEffect(() => {
    fetchRandomQuiz();
  }, []);


  const handleAnswerClick = () => {

    const isAnswerCorrect = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    if (isAnswerCorrect) {
      setRightAnswer(prev => prev +1);
      alert("Bonne réponse !");
    } else {
      alert("Mauvaise réponse :( ")
    };
    fetchRandomQuiz();
  }

  if (!quiz) {
    return <p>Chargement en cours...</p>
  }

  return (
    <div className="quiz-page">
      <h1>Prêt pour les quizs du jour ?</h1>
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
    </div>
  )
}

export default QuizPage;
