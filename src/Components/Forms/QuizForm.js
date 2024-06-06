import { useState } from "react";
import axios from '../axiosConfig';
import '../../style/quizForm.css'

const QuizForm = ({ onQuizSubmit}) => {
  const [question, setQuestion] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [errorMessage, setErrorMessage] = useState('');


  const validateInput = (input) => {
    const re = /^[A-Za-z\d\s?]+$/; // Only letters, numbers, spaces, and question mark
    return re.test(input);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!question.trim().endsWith('?')) {
      setErrorMessage('La question doit se terminer par un ?');
      return;
    }

    if (!question.trim() || !option1.trim() || !option2.trim() || !option3.trim() || !option4.trim()) {
      setErrorMessage('Champs non remplis');
      return;
    }

    if (!validateInput(question)) {
      setErrorMessage('La question contient des caractères non autorisés');
      return;
    }

    const options = [option1.trim(), option2.trim(), option3.trim(), option4.trim()];

    // Vérifier que toutes les options sont uniques
    const uniqueOptions = new Set();

    for (let option of options) {
      if (!validateInput(option)) {
        setErrorMessage('Les options contiennent des caractères non autorisés');
        return;
      }
      uniqueOptions.add(option);
    }

    if (uniqueOptions.size < 4) {
      setErrorMessage('Il ne peut pas avoir plusieurs fois la même réponse');
      return;
    }

    const newQuiz = {
      question: question.trim(),
      options: [option1.trim(), option2.trim(), option3.trim(), option4.trim()],
      correctAnswer: option4.trim(),
    };

    axios.post('/quiz/asked', newQuiz)
      .then(response => {
        alert("Quiz proposé avec succès !");
        setQuestion('');
        setOption1('');
        setOption2('');
        setOption3('');
        setOption4('');
        setCorrectAnswer('');
        setErrorMessage('');
      })
      .catch(error => setErrorMessage("Erreur lors de l'ajout du quiz. Essayez à nouveau"));
    };
    return (
      <div className="quiz-form-container">
        <h2 className="quiz-form-title">Propose ta question</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label className="quiz-form-label">
            Question :
            <input
              type="text"
              className="quiz-form-input"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </label>
          <br />
          <div className="quiz-form-input-answers">
            <label className="quiz-form-label">
              Réponse 1:
              <input
                type="text"
                className="quiz-form-input"
                value={option1}
                onChange={(e) => setOption1(e.target.value)}
              />
            </label>
            <label className="quiz-form-label">
              Réponse 2:
              <input
                type="text"
                className="quiz-form-input"
                value={option2}
                onChange={(e) => setOption2(e.target.value)}
              />
            </label>
            <label className="quiz-form-label">
              <br />
              Réponse 3:
              <input
                type="text"
                className="quiz-form-input"
                value={option3}
                onChange={(e) => setOption3(e.target.value)}
              />
            </label>
            <label className="quiz-form-label">
              Réponse 4 (Bonne Réponse):
              <input
                type="text"
                className="quiz-form-input"
                value={option4}
                onChange={(e) => setOption4(e.target.value)}
              />
            </label>
            <br />
          </div>
          <label className="d-none">
            La Bonne Réponse :
            <input type="text" value={option4} onChange={(e) => setCorrectAnswer(option4)} placeholder="Récrivez la bonne réponse"></input>
          </label>
          <button type="submit" className="quiz-form-button">Envoyer</button>
        </form>
      </div>
    );

};

export default QuizForm;
