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
            </div>
            <button className="btn btn-danger" onClick={() => handleDelete(quiz._id)}>Supprimer</button>
          </li>
        ))}

      </ul>
    </>
  )
}

export default NewQuizList;
