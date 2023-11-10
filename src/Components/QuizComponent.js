import React from 'react';

const QuizComponent = ({ quizList, handleAnswerClick }) => (
  <div>
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
);

export default QuizComponent;
