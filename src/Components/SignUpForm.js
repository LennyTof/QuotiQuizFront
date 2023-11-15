import {useState} from 'react';
import axios from 'axios';

const SignUpForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/auth/signup', {
        email,
        password,
      });
      console.log(response.data);
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
