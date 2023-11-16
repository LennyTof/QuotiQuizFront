import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IsConnect from './UserLoggedIn';
import LogoutButton from '../Buttons/LogoutButton';
import '../../style/profile.css';


const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const isLoggedIn = IsConnect();

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
            <ul className='score-list'>
              {userProfile.scores.map((score, index) => (
                <li key={index}>Tu as obtenu {score.value} points sur 5 le {score.date}</li>
              ))}
            </ul>
        </div>
      ) : (
        <p>Chargement du profil...</p>
      )}
      <Link to="/quiz-page" className='btn btn-success mb-1'>Lancer une session Quiz</Link>
      {isLoggedIn && <LogoutButton /> }
    </div>
  );
};

export default ProfilePage;
