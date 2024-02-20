import {useState} from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/user/signup', {
        email,
        username,
        password,
      });
      alert("Ton compte a correctement été créé");
      setEmail('');
      setUsername('');
      setPassword('');
    } catch (error) {
      console.error('Erreur:', error);
    }
  };

  return (
    <div>
      <h3>Créer un compte</h3>
      <form onSubmit={handleSignUp}>
        <input
          type='email'
          placeholder='Entrez votre email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type='text'
          placeholder='Choisissez un pseudonyme'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type='password'
          placeholder='Entrez votre mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>S'inscrire</button>
      </form>
    </div>
  );
};

export default SignUpForm;
