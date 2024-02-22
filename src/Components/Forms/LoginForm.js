import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/login', {
        email,
        password,
      });
      navigate('/profil');
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div>
      <h3>Vous possédez déjà un compte ?</h3>
      <form onSubmit={handleLogin}>
      <label htmlFor="email">Email :</label>
        <input
          type='email'
          placeholder='Entrez votre email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Mot de passe">Mot de passe :</label>
        <input
          type='password'
          placeholder='Entrez votre mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Se connecter</button>
      </form>
    </div>
  );
};

export default LoginForm;
