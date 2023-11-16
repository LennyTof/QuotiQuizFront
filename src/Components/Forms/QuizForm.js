import { useState } from "react";
import axios from 'axios';
import '../../App.css';

const QuizForm = ({ onQuizSubmit}) => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim().endsWith('?')) {
      alert('La question doit se terminer par un ?')
      return;
    }

    if (!question.trim() || !option1.trim() || !option2.trim() || !option3.trim() || !option4.trim() || !correctAnswer.trim()) {
      alert('Champs non remplis');
      return;
    }

    const options = [option1.trim(), option2.trim(), option3.trim(), option4.trim()];

    if (!options.includes(correctAnswer.trim())) {
      alert("La bonne réponse doit être l'une des réponses écrites.")
      return;
    }

    const newQuiz = {
      question: question.trim(),
      options: [option1.trim(), option2.trim(), option3.trim(), option4.trim()],
      correctAnswer: correctAnswer.trim(),
    };

    axios.post('http://localhost:3000/api/quiz', newQuiz)
      .then(response => alert("Quiz ajouté !"))
      .catch(error => alert("Erreur lors de l'ajout du quiz. Essayez à nouveau"));

    };
    return (
      <div>
        <h2>Ajoute ton Quiz</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Question :
            <input type="text" value={question} onChange={(e) => setQuestion(e.target.value)}></input>
          </label>
          <br />
          <label>
            Réponse 1:
            <input type="text" value={option1} onChange={(e) => setOption1(e.target.value)}></input>
          </label>
          <label>
            Réponse 2:
            <input type="text" value={option2} onChange={(e) => setOption2(e.target.value)}></input>
          </label>
          <label>
            <br />
            Réponse 3:
            <input type="text" value={option3} onChange={(e) => setOption3(e.target.value)}></input>
          </label>
          <label>
            Réponse 4:
            <input type="text" value={option4} onChange={(e) => setOption4(e.target.value)}></input>
          </label>
          <br />
          <label>
            La Bonne Réponse :
            <input type="text" value={correctAnswer} onChange={(e) => setCorrectAnswer(e.target.value)} placeholder="Récrivez la bonne réponse"></input>
          </label>
          <button type="submit">Ajouter le Quiz</button>
        </form>
      </div>
    );

};

export default QuizForm;
