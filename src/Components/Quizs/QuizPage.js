import { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../style/quiz.css';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);
  const [askedQuestions, setAskedQuestions] = useState([]);
  const [rightAnswer, setRightAnswer] = useState(0);
  const [answeredQuestions, setAnswerQuestions] = useState([]);
  const [announcement, setAnnoucement] = useState('');
  const [quizDetails, setQuizDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchRandomQuiz();
  }, []);

  useEffect(() => {
    // au bout de 5 questions répondues, termine le quiz est redirige sur la page de score
    if (askedQuestions.length === 5 && quizDetails.length === 5) {
      const totalScore = rightAnswer;
      handleQuizCompletion(totalScore, quizDetails);
      navigate('/result', { state: { totalScore, quizDetails } });
    }
  }, [quizDetails, askedQuestions.length, rightAnswer, navigate]);

  // récupére une question aléatoire depuis la base de donnée et la stock le temps du quiz
  const fetchRandomQuiz = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/quiz/random');

      // vérifie que la question n'a pas déjà été posée
      if(askedQuestions.includes(response.data._id)) {
        fetchRandomQuiz();
        return;
      }
      shuffle(response.data.options)
      setAskedQuestions([...askedQuestions, response.data._id]);
      setQuiz(response.data);
    } catch (error) {
      console.error("Impossible de récupérer un quiz :", error);
    }
  };

  const handleAnswerClick = () => {

    // vérifie si la réponse est correcte
    const isAnswerCorrect = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(isAnswerCorrect);

    if (isAnswerCorrect) {
      setRightAnswer(prev => prev +1);
      setAnnoucement('Bonne réponse !')
    } else {
      setAnnoucement('Mauvaise réponse :(')
    };

    setQuizDetails(prevDetails => [...prevDetails, {
      question: quiz.question,
      userAnswer: selectedAnswer,
      correctAnswer: quiz.correctAnswer
    }]);

    setAnswerQuestions([...answeredQuestions, isAnswerCorrect ? 'correct' : 'false']);

    // au bout de 5 questions répondues, termine le quiz est redirige sur la page de score
    if (askedQuestions.length !== 5 ) {
      fetchRandomQuiz();
    }
  };

  // créer un score basé sur les réponses du  quiz et le lie à l'utilisateur
  const handleQuizCompletion = async (totalScore, quizDetails) => {
    const token = localStorage.getItem('token');
    try {
      console.log(quizDetails)
      const response = await axios.post('http://localhost:3000/api/user/score',
      {
         score: totalScore,
         quizDetails: quizDetails
      },
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

  //méthode utilisée pour mélanger les questions
  const shuffle = (array) => {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  if (!quiz) {
    return <p>Chargement en cours...</p>
  }

  return (
    <>
      <div className="quiz">
        <h1>Question {askedQuestions.length} sur 5</h1>
        <h2>{quiz.question}</h2>
        <ul className="answer">
          {quiz.options.map((answer, index) => (
            <li key={index}>
              <button onClick={() => setSelectedAnswer(answer)} className={selectedAnswer === answer ? "btn btn-warning" : "btn btn-success"}>{answer}</button>
            </li>
          ))}
        </ul>
        <div>
          <button onClick={handleAnswerClick} className="validation-button">Valider</button>
        </div>
        <h2>{announcement}</h2>
        <div className="rectangles container h-25 ">
          {askedQuestions.map((question, index) => (
            <div key={index} className={`${index < answeredQuestions.length ? answeredQuestions[index] : ""}`}></div>
          ))}
        </div>
      </div>
    </>
  )
}

export default QuizPage;
