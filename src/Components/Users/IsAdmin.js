import {useState, useEffect} from 'react';
import axios from '../axiosConfig';
import { useLogin } from './LoginContext';

// vérifie si l'utilisateur est un admin ou non

const IsAdmin = () => {
  const [userProfile, setUserProfile] = useState(null);
  const { isLoggedIn } = useLogin();

  useEffect(() => {

    if(isLoggedIn) {
      axios.get('user/profil', {
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
    }
  }, [isLoggedIn]);

  if (userProfile !== null) {
    if (userProfile.roles === 'admin') {
      return true
    } else {
      return false
    }
  }
}

export default IsAdmin;
