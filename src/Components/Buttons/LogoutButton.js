import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <button onClick={handleClick} className='btn btn-success mb-1'>Se déconnecter</button>
  );
};

export default LogoutButton;
