import {useState} from 'react';
import axios from '../axiosConfig';
import '../../style/infoForm.css';

const InfoForm = ({ emailState, usernameState, onClose, userId}) => {
  const [email, setEmail] = useState(emailState);
  const [username, setUsername] = useState(usernameState);
  const [oldPassword, setOldPassword] = useState('')
  const [password, setPassword] = useState('');

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`/user/update/${userId}`, {
        email,
        username,
        oldPassword,
        password,
      });
      alert("Le changement a bien été effectué");
      setOldPassword('')
      setPassword('')
    } catch (error) {
      console.error('Erreur:', error);
      alert(error.response.data.message);
    }
  }
  return (
    <div className='infoForm'>
      <h3>Modifier les informations</h3>
      <form onSubmit={handleSignUp}>
        <label htmlFor="email">Email :</label>
        <input
          type='email'
          placeholder={emailState}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="text">Pseudo :</label>
        <input
          type='text'
          placeholder={usernameState}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label htmlFor="oldPassword">Ancien mot de passe :</label>
        <input
          type='password'
          placeholder='Laissez vide si vous gardez votre mot de passe'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <label htmlFor="password">Nouveau mot de passe :</label>
        <input
          type='password'
          placeholder='Nouveau mot de passe'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type='submit'>Modifier</button>
      </form>
      <button onClick={onClose}>Fermer</button>
    </div>
  );
};

export default InfoForm;
