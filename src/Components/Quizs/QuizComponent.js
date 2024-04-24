import { useState, useEffect} from 'react';
import  axios  from "axios";
import { Link } from 'react-router-dom';

const QuizComponent = () => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    fetchQuizList()
  }, []);

  const fetchQuizList = () => {
    axios.get('http://localhost:3000/api/quiz')
    .then(response => {setQuizList(response.data)})
    .catch(error => {console.error("Impossible de récupérer les Questions :", error)});
  };

  const handleAnswerClick = (answer, correctAnswer) => {
    if (answer === correctAnswer) {
      alert('Bonne réponse !');
    } else {
      alert('Mauvaise réponse !');
    }
  };

  const handleDelete = (quizId) => {
    axios.delete(`http://localhost:3000/api/quiz/${quizId}`)
      .then(() => {
        alert('Quiz supprimé avec succès!');
        fetchQuizList();
      })
      .catch(error => {
        alert('Erreur lors de la suppression du quiz');
        console.error("Erreur lors de la suppression :", error);
      });
  };

  return (
    <div>
      <h1>Cette page ne sera pas affichée pour les utilisateurs</h1>
      <Link to="/login" className='btn btn-success mb-1'>Créer un compte/ Se connecter</Link>
      <Link to="/profil" className='btn btn-success mb-1'>Profil</Link>
      <Link to="/quiz-page" className='btn btn-success mb-1'>Passer au test</Link>
      <br />
      <Link to="/quiz-form" className='btn btn-success'>Rajouter des questions</Link>
      <div className="App">
        <h2>Liste des Questions</h2>
        <ul style={{listStyleType: "none"}}>
          {quizList.map(quiz => (
            <li key={quiz._id}>
              <div>
                <h3>{quiz.question}</h3>
                <ul style={{listStyleType: "none"}}>
                  {quiz.options.map((answer, index) => (
                    <li key={index} onClick={() => handleAnswerClick(answer, quiz.correctAnswer)}>{answer}</li>
                  ))}
                </ul>
                <button className="btn btn-danger" onClick={() => handleDelete(quiz._id)}>Supprimer</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default QuizComponent;
