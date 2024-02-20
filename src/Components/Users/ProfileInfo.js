import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IsConnect from './UserLoggedIn';
import InfoForm from '../Forms/InfoForm';

import '../../style/profile.css';

const ProfileInfo = () => {
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
    })
    .catch(error => {
      console.error('Impossible de récupérer les données du profil :', error);
    });
  }, []);

  return (
    <div>
      {userProfile ? (
        <div>
          <InfoForm emailState={userProfile.email} usernameState={userProfile.username} userId={userProfile._id}  />
        </div>
      ) : (
        <p>Chargement de la page </p>
      )}
    </div>
  );
};

export default ProfileInfo;
