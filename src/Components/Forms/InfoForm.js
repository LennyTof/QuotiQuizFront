import {useState} from 'react';
import axios from 'axios';

const InfoForm = ({ emailState, usernameState, userId}) => {
  const [email, setEmail] = useState(emailState);
  const [username, setUsername] = useState(usernameState);
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:3000/api/user/update/${userId}`, {
        email,
        username,
        password,
      });
      alert("Le changement a bien été effectué");
    } catch (error) {
      console.error('Erreur:', error);
    }
  }
  return (
    <div>
      <h3>Modifier les informations</h3>
      <form onSubmit={handleSignUp}>
        <label for="email">Email :</label>
        <input
          type='email'
          placeholder={emailState}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label for="text">Pseudo :</label>
        <input
          type='text'
          placeholder={usernameState}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="password">Mot de passe :</label>
        <input
          type='password'
          placeholder='Nouveau mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Modifier</button>
      </form>
    </div>
  );
};

export default InfoForm;
