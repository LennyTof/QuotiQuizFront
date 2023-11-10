import { useState, useEffect } from "react";
import axios from 'axios';
import './App.css';

function App() {

  const [quizList, setQuizList] = useState([]);

  useEffect(() => {

    axios.get('http://localhost:3000/api/quiz')
      .then(response => {setQuizList(response.data)})
      .catch(error => {console.error("Impossible de récupérer les Questions :", error)});
  }, []);

  return (
    <div className="App">
      <h1>Liste des Questions</h1>
      <ul>
        {quizList.map(quiz => (
          <li key={quiz._id}>
            <div>
              <h3>{quiz.question}</h3>
              <ul>
                {quiz.options.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
