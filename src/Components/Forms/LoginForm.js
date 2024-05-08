import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../Users/LoginContext';
import { Link } from 'react-router-dom';
import '../../style/connexionForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateLoginStatus } = useLogin();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/login', {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      updateLoginStatus(true);
      navigate('/profil');
    } catch (error) {
      alert('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className='form-container'>
      <h3 className='form-title'>Tu possèdes déjà un compte ?</h3>
      <form onSubmit={handleLogin}>
      <label htmlFor="email" className='form-label'>Email :</label>
        <input
          type='email'
          className="form-input"
          placeholder='Entrez votre email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Mot de passe" className='form-label'>Mot de passe :</label>
        <input
          type='password'
          className="form-input"
          placeholder='Entrez votre mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit' className='form-button'>Se connecter</button>
        <Link to='/password-forgot'>Mot de passe oublié ?</Link>
      </form>
    </div>
  );
};

export default LoginForm;
