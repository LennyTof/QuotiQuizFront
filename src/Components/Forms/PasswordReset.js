import { useState } from "react";
import axios from '../axiosConfig';

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
      const response = await axios.post('/user/reset-password', {
        token: otp,
        newPassword: password
      });
      setMessage("Ton mot de passe a bien été réinitialisé.")
    } catch (error) {
      setMessage("Le token est invalide ou a expiré.")
    }

  }

  return (
    <>
      <h2>Email correctement envoyé, vérifie tes spams si il n'apparait pas.</h2>
      <h3>Changement du mot de passe</h3>
      <form onSubmit={handleResetSubmit}>
        <label>Code à fournir :</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <label>Nouveau mot de passe :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>Confirme le mot de passe :</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit">Réinitialiser le mot de passe</button>
      </form>
      {message && <p>{message}</p>}
    </>
  )
}

export default PasswordReset;
