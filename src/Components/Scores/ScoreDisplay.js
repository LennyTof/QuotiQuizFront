import "../../style/scoredisplay.css";

const ScoreDisplay = ({quizDetails, onClose, showAnswers}) => {

  return (
    <div>
      <ul className="score-display">
        {quizDetails.map((quiz, index) => (
          <li key={index}>
            <div>
              <h5>{quiz.question}</h5>
              {showAnswers ? (
                <span className={quiz.userAnswer === quiz.correctAnswer ? "green score-answer" : "red score-answer"}>{quiz.userAnswer}</span>
              ) : (
                <span className={quiz.userAnswer === quiz.correctAnswer ? "green score-answer" : "red score-answer"}>{quiz.userAnswer === quiz.correctAnswer ? "Bonne réponse" : "Mauvaise réponse"}</span>
              )}
            </div>
          </li>
          ))}
      </ul>
      <button onClick={onClose} className='btn btn-success'>Fermer</button>
    </div>
  )
}

export default ScoreDisplay;
