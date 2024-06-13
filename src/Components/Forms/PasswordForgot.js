import { useState } from 'react';
import axios from '../axiosConfig';
import { useNavigate } from 'react-router-dom';
import '../../style/passwordForgot.css';

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
      <h3 className="text-center">Mot de passe oublié</h3>
      <form onSubmit={handleSubmit} className="form-signin">
        <div className="form-group">
          <label>Entre ton adresse mail :</label>
          <input
            type='email'
            className="form-control"
            value={email}
            // eslint-disable-next-line no-sequences
            onChange={(e) => (setEmail(e.target.value), setMessage(""))}
          />
        </div>
        <button type='submit' className="btn btn-primary btn-block mt-3">Envoyer un email</button>
      </form>
      {message && <p className="mt-3 text-center">{message}</p>}
    </>
    )
}

export default PasswordForgot;
