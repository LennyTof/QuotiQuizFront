import { useState } from 'react';
import axios from '../axiosConfig';

const PasswordForgot = () => {


  const handleSubmit= async (e) => {
    e.preventDefault();
  }

  return (
    <>
      <h3>Mot de passe oublié</h3>
      <form onSubmit={handleSubmit}>
        <label>Entrez votre votre email :</label>
        <input type='email'></input>
        <button type='submit'>Envoyer un email</button>
      </form>
    </>
    )
}

export default PasswordForgot;
