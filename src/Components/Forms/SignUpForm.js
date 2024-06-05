import {useState} from 'react';
import axios from '../axiosConfig';
import '../../style/connexionForm.css'

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [errorMessage, setErrorMessage] = useState('')

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateUsername = (username) => {
    const re = /^[a-zA-Z0-9_]{3,10}$/; // Alphanumeric and underscores, 3-10 characters
    return re.test(username);
  };

  const validatePassword = (password) => {
    const re =/^[A-Za-z\d]{5,}$/; // Minimum 5 caractères, seulement des lettres et/ou des chiffres
    return re.test(password);
  };


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirmation) {
      setErrorMessage("Les mots de passe sont différents !");
      return;
    }

    if (!validateEmail(email)) {
      setErrorMessage("Email invalide");
      return;
    }

    if (!validateUsername(username)) {
      setErrorMessage("Pseudo invalide. Utilisez uniquement des lettres, des chiffres et des underscores (3-10 caractères)");
      return;
    }

    if (!validatePassword(password)) {
      setErrorMessage("Le mot de passe doit contenir au moins 5 caractères et n'utiliser que des lettres et/ou des chiffres");
      return;
    }

    try {
      const response = await axios.post('/user/signup', {
        email,
        username,
        password,
        passwordConfirmation
      });
      alert("Ton compte a correctement été créé, tu peux désormer te connecter");
      setEmail('');
      setUsername('');
      setPassword('');
      setPasswordConfirmation('');
      setErrorMessage('')
    } catch (error) {
      console.error('Erreur:', error);
      if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("Une erreur est survenue");
      }
    }
  };

  return (
    <div className='form-container'>
      <h3 className='form-title'>Créer un compte</h3>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form onSubmit={handleSignUp}>
      <label htmlFor="email" className='form-label'>Email :</label>
        <input
          type='email'
          className="form-input"
          placeholder='Entrez votre email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Pseudo" className='form-label'>Pseudo :</label>
        <input
          type='text'
          className="form-input"
          placeholder='Entrez votre pseudo'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="Mot de passe" className='form-label'>Mot de passe :</label>
        <input
          type='password'
          className="form-input"
          placeholder='Entrez votre mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="Confirmation mot de passe" className='form-label'>Confirmez le mot de passe :</label>
        <input
          type='password'
          className="form-input"
          placeholder='Confirmation du mot de passe'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type='submit' className='form-button'>S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpForm;
