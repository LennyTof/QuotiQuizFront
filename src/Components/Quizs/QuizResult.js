import {useState} from "react";
import { useLocation } from "react-router-dom";
import { useLogin } from '../Users/LoginContext';
import { Link } from "react-router-dom";
import '../../style/result.css';

const QuizResult = () => {

  // récupére le score
  const location = useLocation();
  const { isLoggedIn } = useLogin();

  const [message, setMessage] = useState('')

  let numberOfCorrectAnswer = location.state.totalScore ?? 0;

  const questionPlural = numberOfCorrectAnswer >= 2 ? "bonnes réponses" : "bonne réponse";

  const handleShareScore = () => {
    const baseUrl = window.location.origin;
    const quizDetails = location.state.quizDetails.map(detail => {
      const resultColor = detail.userAnswer === detail.correctAnswer ? '🟩' : '🟥';
      return `${resultColor}`;
    }).join('');

    const shareText = `Je viens de finir un quiz sur QuotiQuiz!\n${quizDetails}\nRejoins moi sur ${baseUrl} !`;

    navigator.clipboard.writeText(shareText)
      .then(() => {
        setMessage('copié');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <>
      <h1 className="mt-3">Quiz terminé !</h1>
      { isLoggedIn && <h4>Tu peux accéder à l'historique de tes quiz dans ton profil et voir les résultats des autres joueurs via le menu !</h4> }
      <div className="result-display">
          <Link to="/quiz-form" className='btn btn-success m-1 mt-3'>Propose ta propose ta propre question</Link>
          <button onClick={handleShareScore} className="btn btn-success mt-3">Partage ton score</button><span style={{color: 'red'}}>{message}</span>
        <h3>
          Tu as obtenu {numberOfCorrectAnswer} {questionPlural} sur 5 !
        </h3>
        <br/>
        <ul className="list-result">
            {location.state.quizDetails.map((score, index) => (
              <li key={index}>
                <div>
                  <h5>{score.question}</h5>
                  <span className={score.userAnswer === score.correctAnswer ? "correct result-answer" : "false result-answer"}>{score.userAnswer}</span>
                </div>
              </li>
              ))}
          </ul>
        </div>
        <h4>{!isLoggedIn && 'Connecte toi pour enregistrer ton score !'}</h4>
    </>
  );
};

export default QuizResult;
