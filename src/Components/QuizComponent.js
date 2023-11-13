import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const QuizComponent = ({ quizList, handleAnswerClick }) => (
  <div>
    <Link to="/quiz-page">Passer au test</Link>
    <br />
    <Link to="/quiz-form">Rajouter des questions</Link>
    <div className="App">
      <h1>Liste des Questions</h1>
      <ul>
        {quizList.map(quiz => (
          <li key={quiz._id}>
            <div>
              <h3>{quiz.question}</h3>
              <ul>
                {quiz.options.map((answer, index) => (
                  <li key={index} onClick={() => handleAnswerClick(answer, quiz.correctAnswer)}>{answer}</li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

export default QuizComponent;
