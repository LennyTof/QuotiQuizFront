import { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import QuizComponent from "./Components/Quizs/QuizComponent";
import QuizForm from "./Components/Forms/QuizForm";
import QuizPage from "./Components/Quizs/QuizPage";
import QuizResult from "./Components/Quizs/QuizResult";
import LoginForm from "./Components/Forms/LoginForm";
import SignUpForm from "./Components/Forms/SignUpForm";
import ProfilePage from "./Components/Users/ProfilePage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<QuizComponent/>} />
        <Route path="/quiz-form" element={<QuizForm/>} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/result" element={<QuizResult />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/login" element={<><LoginForm /><SignUpForm /></>} />
      </Routes>
    </div>

  );
}

export default App;
