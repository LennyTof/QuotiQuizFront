import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/profil', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    })
    .then(response => {
      setUserProfile(response.data);
      console.log(response.data)
    })
    .catch(error => {
      console.error('Impossible de récupérer les données du profil :', error);
    });
  }, []);

  return (
    <div>
      <h2>Profil</h2>
      {userProfile ? (
        <div>
          <h3>Salut {userProfile.username} !</h3>
          <h2>Scores :</h2>
            <ul>
              {userProfile.scores.map((score, index) => (
                <li key={index}>{score.value} points - {score.date}</li>
              ))}
            </ul>
        </div>
      ) : (
        <p>Chargement du profil...</p>
      )}
      <Link to="/quiz-page" className='btn btn-success mb-1'>Lancer une session Quiz</Link>
    </div>
  );
};

export default ProfilePage;
