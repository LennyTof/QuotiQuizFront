import { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Components/QuizComponent'
import QuizComponent from "./Components/QuizComponent";
import QuizForm from "./Components/QuizForm";
import QuizPage from "./Components/QuizPage";

function App() {

  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    fetchQuizList()
  }, []);

  const fetchQuizList = () => {
    axios.get('http://localhost:3000/api/quiz')
    .then(response => {setQuizList(response.data)})
    .catch(error => {console.error("Impossible de récupérer les Questions :", error)});
  };

  const handleAnswerClick = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      alert('Bonne réponse !');
    } else {
      alert('Mauvaise réponse !');
    }
  };

  const handleQuizSubmit = () => {
    fetchQuizList();
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<QuizComponent quizList={quizList} handleAnswerClick={handleAnswerClick} />} />
        <Route path="/quiz-form" element={<QuizForm onQuizSubmit={handleQuizSubmit} />} />
        <Route path="/quiz-page" element={<QuizPage />} />
      </Routes>
    </div>

  );
}

export default App;
