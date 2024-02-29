import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    onLogout();
    navigate('/login');
  };

  return (
    <button onClick={handleClick} className='btn btn-success mb-1'>Se déconnecter</button>
  );
};

export default LogoutButton;
