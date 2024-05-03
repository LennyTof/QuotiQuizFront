import "../../style/scoredisplay.css";

const ScoreDisplay = ({quizDetails, onClose}) => {

  return (
    <>
      <ul>
        {quizDetails.map((quiz, index) => (
          <li key={index}>
            <div>
              <h3>{quiz.question} :</h3>
              <span className={quiz.userAnswer === quiz.correctAnswer ? "green" : "red"}>{quiz.userAnswer}</span>
            </div>
          </li>
          ))}
      </ul>
      <button onClick={onClose} className='btn btn-success'>Fermer</button>
    </>
  )
}

export default ScoreDisplay;
