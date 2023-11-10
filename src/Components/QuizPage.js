import { useState, useEffect } from "react";
import axios from 'axios';
import '../App.css';

const QuizPage = () => {
  const [quiz, setQuiz] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [isCorrect, setIsCorrect] = useState(null);

  const fetchRandomQuiz = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/quiz/random');
      setQuiz(response.data);
    } catch (error) {
      console.error("Impossible de récupérer un quiz :", error);
    }
  };

  useEffect(() => {
    fetchRandomQuiz();
  }, []);


  const handleAnswerClick = () => {

    const isAnswerCorrect = selectedAnswer === quiz.correctAnswer;
    setIsCorrect(isAnswerCorrect);
    if (isCorrect) {
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
    <div className="App">
      <h1>{quiz.question}</h1>
      <ul>
        {quiz.options.map((answer, index) => (
          <li key={index}>
            <button onClick={() => setSelectedAnswer(answer)}>{answer}</button>
          </li>
        ))}
      </ul>
      <div>
        <button onClick={handleAnswerClick}>Valider</button>
      </div>
    </div>
  )
}

export default QuizPage;
