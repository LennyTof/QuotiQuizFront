import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const PasswordForgot = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit= async (e) => {
    e.preventDefault();
    try {
      await axios.post('/user/reset-password-email', { email });
      setMessage("Email correctement envoyé, vérifie tes spams si il n'apparait pas.");
      navigate('/password-forgot-reset');
    } catch (error) {
      console.error('Error sending reset email:', error);
      setMessage("Une erreur est survenue, essaie à nouveau.");
    }
  }

  return (
    <>
      <h3>Mot de passe oublié</h3>
      <form onSubmit={handleSubmit}>
        <label>Entre ton adresse mail :</label>
        <input
          type='email'
          value={email}
          // eslint-disable-next-line no-sequences
          onChange={(e) => (setEmail(e.target.value), setMessage(""))}
        />
        <button type='submit'>Envoyer un email</button>
      </form>
      {message && <p>{message}</p>}
    </>
    )
}

export default PasswordForgot;
