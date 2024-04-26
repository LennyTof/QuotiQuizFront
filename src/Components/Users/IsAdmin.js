import {useState, useEffect} from 'react';
import axios from 'axios';

// vérifie si l'utilisateur est un admin ou non

const IsAdmin = () => {

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
    })
    .catch(error => {
      console.error('Impossible de récupérer les données du profil :', error);
    });
  }, []);

  if (userProfile !== null) {
    if (userProfile.roles === 'admin') {
      return true
    } else {
      return false
    }
  }
}

export default IsAdmin;
