import { useState, useEffect} from 'react';
import  axios  from "../axiosConfig";
import isAdmin  from '../Users/IsAdmin';

const QuizComponent = () => {
  const [quizList, setQuizList] = useState([]);

  const shuffle = (array) => {
    for (let i = array.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  useEffect(() => {
    fetchQuizList()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchQuizList = () => {
    axios.get('/quiz')
    .then(response => {
      const quizs = response.data;
      quizs.forEach(quiz => shuffle(quiz.options));
      setQuizList(quizs);
    })
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
    axios.delete(`/quiz/${quizId}`)
      .then(() => {
        alert('Quiz supprimé avec succès!');
        fetchQuizList();
      })
      .catch(error => {
        alert('Erreur lors de la suppression du quiz');
        console.error("Erreur lors de la suppression :", error);
      });
  };

  const size = quizList.length


  if (!isAdmin()) {
    return <h2>Vous n'avez pas les droits pour accéder à cette page</h2>
  }

  return (
    <div>
      <h1>Cette page ne sera pas affichée pour les utilisateurs</h1>
      <div className="App">
        <h2>Liste des Questions ({size})</h2>
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
