import axios from 'axios';
import { useEffect, useState } from 'react';
import moment from 'moment-timezone';
import { useLogin } from './LoginContext';
import InfoForm from '../Forms/InfoForm';

import '../../style/profile.css';


const ProfilePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [showModal, setShowModal] = useState(false)
  const isLoggedIn = useLogin();

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
    <div>
      {isLoggedIn ? (
        <div className='profil-page'>
          <div className='profil-button'>
            <button className='btn btn-success mb-1 me-1' onClick={() => setShowModal(true)}>Voir/Modifier les informations</button>
          </div>
        <h1>Profil</h1>
        {showModal && <InfoForm emailState={userProfile.email} usernameState={userProfile.username} userId={userProfile._id} onClose={() => setShowModal(false)} />}
        {userProfile ? (
          <div>
            {showModal ? (
            <div></div>
          ) : (
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
          )}
          </div>
        ) : (
          <p>Chargement du profil...</p>
        )}
      </div>) : (
        <div>
          <h2>Veuillez vous connecter pour accéder à cette page</h2>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
