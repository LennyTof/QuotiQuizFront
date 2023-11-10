import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';
import './Components/QuizComponent'
import QuizComponent from "./Components/QuizComponent";
import QuizForm from "./Components/QuizForm";

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
    <div className="App">
      <QuizComponent quizList={quizList} handleAnswerClick={handleAnswerClick} />
      <QuizForm onQuizSubmit={handleQuizSubmit} />
    </div>

  );
}

export default App;
