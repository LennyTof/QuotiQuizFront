import {useState, useEffect} from 'react';
import axios from 'axios';

const NewQuizList = () => {
  const [quizList, setQuizList] = useState([]);

  useEffect(() => {
    fetchQuizList()
  }, []);

  const fetchQuizList = () => {
    axios.get('http://localhost:3000/api/quiz/asked')
    .then(response => {setQuizList(response.data)})
    .catch(error => {console.error("Impossible de récupérer les Questions :", error)});
  };

  const handleDelete = (quizId) => {
    axios.delete(`http://localhost:3000/api/quiz/asked/${quizId}`)
      .then(() => {
        alert('Quiz supprimé avec succès!');
        fetchQuizList();
      })
      .catch(error => {
        alert('Erreur lors de la suppression du quiz');
        console.error("Erreur lors de la suppression :", error);
      });
  };

  const handleAccept = (quiz) => {
    axios.post(`http://localhost:3000/api/quiz`, quiz)
      .then(() => {
        alert('Quiz ajouté dans la base de données');
        handleDelete(quiz._id);
      })
      .catch(error => {
        alert("Echec de l'ajout du quiz")
        console.error("Erreur lors de l'ajout du quiz :",  error);
      });
  };

  return (
    <>
      <h1>Questions proposés par les utilisateurs</h1>
      {console.log(quizList)}
      <ul>
        {quizList.map((quiz) => (
          <li key={quiz._id}>
            <div>
              <h3>{quiz.question}</h3>
              <ul>
                {quiz.options.map((answer, index) => (
                  <li key={index}>{answer}</li>
                ))}
              </ul>
            <button className="btn btn-danger" onClick={() => handleDelete(quiz._id)}>Supprimer</button>
            {/* <button className="btn btn-warning" onClick={() => handleChange(quiz._id)}>Modifier</button> */}
            <button className="btn btn-success" onClick={() => handleAccept(quiz)}>Ajouter la question dans la liste</button>
            </div>
          </li>
        ))}

      </ul>
    </>
  )
}

export default NewQuizList;
