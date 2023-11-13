import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const QuizComponent = ({ quizList, handleAnswerClick }) => (
  <div>
    <h1>Cette page ne sera pas affichée pour les utilisateurs</h1>
    <Link to="/quiz-page" className='btn btn-success mb-1'>Passer au test</Link>
    <br />
    <Link to="/quiz-form" className='btn btn-success'>Rajouter des questions</Link>
    <div className="App">
      <h2>Liste des Questions</h2>
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
