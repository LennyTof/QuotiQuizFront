import { useState } from "react";
import axios from '../axiosConfig';
import '../../style/passwordForgot.css';

const PasswordReset = () => {
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }
    try {
      await axios.post('/user/reset-password', {
        token: otp,
        newPassword: password
      });
      setMessage("Ton mot de passe a bien été réinitialisé.")
      setOtp('')
      setPassword('')
      setConfirmPassword('')
    } catch (error) {
      setMessage("Le token est invalide ou a expiré.")
    }

  }

  return (
      <div className="container mt-5">
      <h2 className="text-center">Email correctement envoyé, vérifie tes spams si il n'apparait pas.</h2>
      <h3 className="text-center">Changement du mot de passe</h3>
      <form onSubmit={handleResetSubmit} className="form-signin">
        <div className="form-group">
          <label>Code à fournir :</label>
          <input
            type="text"
            className="form-control"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>Nouveau mot de passe :</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
          <div className="form-group">
          <label>Confirme le mot de passe :</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Réinitialiser le mot de passe</button>
        </form>
        {message && <p className="mt-3 text-center">{message}</p>}
      </div>
  )
}

export default PasswordReset;
