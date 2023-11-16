import { useState, useEffect } from "react";
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './Components/QuizComponent'
import QuizComponent from "./Components/QuizComponent";
import QuizForm from "./Components/QuizForm";
import QuizPage from "./Components/QuizPage";
import ResultPage from "./Components/ResultPage";
import LoginForm from "./Components/LoginForm";
import SignUpForm from "./Components/SignUpForm";
import ProfilePage from "./Components/ProfilePage";

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<QuizComponent/>} />
        <Route path="/quiz-form" element={<QuizForm/>} />
        <Route path="/quiz-page" element={<QuizPage />} />
        <Route path="/result" element={<ResultPage />} />
        <Route path="/profil" element={<ProfilePage />} />
        <Route path="/login" element={<><LoginForm /><SignUpForm /></>} />
      </Routes>
    </div>

  );
}

export default App;
