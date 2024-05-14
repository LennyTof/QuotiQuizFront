import "../../style/scoredisplay.css";

const ScoreDisplay = ({quizDetails, onClose, showAnswers}) => {

  const answerClass = (quiz) => quiz.userAnswer === quiz.correctAnswer ? "green score-answer" : "red score-answer";
  const answerText = (quiz) => showAnswers ? quiz.userAnswer : (quiz.userAnswer === quiz.correctAnswer ? "Bonne réponse" : "Mauvaise réponse");

  return (
    <div>
      <ul className="score-display">
        {quizDetails.map((quiz, index) => (
          <li key={index}>
            <div>
              <h5>{quiz.question}</h5>
              <span className={answerClass(quiz)}>{answerText(quiz)}</span>
            </div>
          </li>
          ))}
      </ul>
      <button onClick={onClose} className='btn btn-success'>Fermer</button>
    </div>
  )
}

export default ScoreDisplay;
