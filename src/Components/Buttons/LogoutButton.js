import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout, className }) => {
  const navigate = useNavigate();

  // Déconnecte l'utilisateur et le renvoi sur la page de connection
  const handleClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    axios.defaults.headers.common['Authorization'] = null;

    onLogout();
    navigate('/login');
  };

  const buttonClass = className || 'btn btn-success mb-1';

  return (
    <button onClick={handleClick} className={buttonClass} aria-label="Se déconnecter">Se déconnecter</button>
  );
};

export default LogoutButton;
