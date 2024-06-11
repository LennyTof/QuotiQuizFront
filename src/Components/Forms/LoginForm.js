import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useLogin } from '../Users/LoginContext';
import { Link } from 'react-router-dom';
import '../../style/connexionForm.css'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const { updateLoginStatus } = useLogin();

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    const re = /^[A-Za-z\d]{5,}$/; // Minimum 5 caractères, juste des lettres et/ou chiffres
    return re.test(password);
  };


  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setErrorMessage("Le format de l'email est invalide");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Le format du mot de passe est invalide");
      return;
    }

    try {
      const response = await axios.post('/user/login', {
        email,
        password,
      });

      const expirationTime = new Date().getTime() + 7 * 24 * 60 * 60 * 1000;
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('username', response.data.username);
      localStorage.setItem('expirationTime', expirationTime);

      updateLoginStatus(true);
      navigate('/quiz-page');
    } catch (error) {
      setErrorMessage('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className='form-container'>
      <h3 className='form-title'>Tu possèdes déjà un compte ?</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
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
