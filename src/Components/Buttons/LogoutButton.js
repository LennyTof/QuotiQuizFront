import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  // Déconnecte l'utilisateur et le renvoi sur la page de connection
  const handleClick = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('roles');
    onLogout();
    navigate('/login');
  };

  return (
    <button onClick={handleClick} className='btn btn-success mb-1'>Se déconnecter</button>
  );
};

export default LogoutButton;
