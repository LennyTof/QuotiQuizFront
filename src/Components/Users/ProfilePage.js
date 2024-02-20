import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { Link } from 'react-router-dom';
import IsConnect from './UserLoggedIn';
import LogoutButton from '../Buttons/LogoutButton';

import '../../style/profile.css';


const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const isLoggedIn = IsConnect();

  const formatDate = (dateString) => {
    return moment(dateString).tz('Europe/Paris').format('DD/MM/YYYY');
  };

  useEffect(() => {
    axios.get('http://localhost:3000/api/user/profil', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      withCredentials: true,
    })
    .then(response => {
      setUserProfile(response.data);
    })
    .catch(error => {
      console.error('Impossible de récupérer les données du profil :', error);
    });
  }, []);

  return (
    <div className='profil-page'>
      <div className='profil-button'>
        <Link to="/quiz-page" className='btn btn-success mb-1 me-1'>Lancer une session Quiz</Link>
        <Link to="/profil-info" className='btn btn-success mb-1 me-1'>Voir/Modifier les informations</Link>
        {isLoggedIn && <LogoutButton /> }
      </div>
      <h1>Profil</h1>
      {userProfile ? (
        <div>
          <h3>Salut {userProfile.username} !</h3>
          <h4>Tu as déjà répondu à {userProfile.scores.length} quiz !</h4>
          <h2>Scores :</h2>
            <ul className='score-list'>
              {userProfile.scores.map((score, index) => (
                <li key={index}>Tu as obtenu {score.value} points sur 5 le {formatDate(score.date)}</li>

              ))}
            </ul>
        </div>
      ) : (
        <p>Chargement du profil...</p>
      )}
    </div>
  );
};

export default ProfilePage;
