import {useState} from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        email,
        username,
        password,
        passwordConfirmation
      });
      alert("Ton compte a correctement été créé");
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
    <div>
      <h3>Créer un compte</h3>
      <form onSubmit={handleSignUp}>
      <label htmlFor="email">Email :</label>
        <input
          type='email'
          placeholder='Entrez votre email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="Pseudo">Pseudo :</label>
        <input
          type='text'
          placeholder='Choisissez un pseudo'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="Mot de passe">Mot de passe :</label>
        <input
          type='password'
          placeholder='Entrez votre mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label htmlFor="Confirmation mot de passe">Confirmez le mot de passe :</label>
        <input
          type='password'
          placeholder='Confirmation du mot de passe'
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button type='submit'>S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpForm;
