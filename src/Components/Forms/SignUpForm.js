import {useState} from 'react';
import axios from '../axiosConfig';
import '../../style/connexionForm.css'

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
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
    } catch (error) {
      console.error('Erreur:', error);
      alert("Les mot de passe sont différents")
    }
  };

  return (
    <div className='form-container'>
      <h3 className='form-title'>Créer un compte</h3>
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
          placeholder='Choisissez un pseudo'
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
