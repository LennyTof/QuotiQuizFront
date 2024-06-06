import React, { Suspense, lazy } from 'react';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LoginProvider } from './Components/Users/LoginContext';
import Banner from "./Components/Banner";
import './App.css';
const HomePage = lazy(() => import("./Components/HomePage"));
const QuizComponent = lazy(() => import("./Components/Quizs/QuizComponent"));
const QuizForm = lazy(() => import("./Components/Forms/QuizForm"));
const QuizPage = lazy(() => import("./Components/Quizs/QuizPage"));
const QuizResult = lazy(() => import("./Components/Quizs/QuizResult"));
const LoginForm = lazy(() => import("./Components/Forms/LoginForm"));
const SignUpForm = lazy(() => import("./Components/Forms/SignUpForm"));
const ProfilePage = lazy(() => import("./Components/Users/ProfilePage"));
const ProfileInfo = lazy(() => import("./Components/Users/ProfileInfo"));
const Leaderboard = lazy(() => import("./Components/Scores/Leaderboard"));
const NewQuizList = lazy(() => import("./Components/Quizs/NewQuizList"));
const PasswordForgot = lazy(() => import("./Components/Forms/PasswordForgot"));
const PasswordReset = lazy(() => import("./Components/Forms/PasswordReset"));

function App() {

  return (
    <>
      <LoginProvider>
      <Banner />
      <div className="App">
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage/>} />
          <Route path="/component" element={<QuizComponent/>} />
          <Route path="/quiz-form" element={<QuizForm/>} />
          <Route path="/quiz-page" element={<QuizPage />} />
          <Route path="/result" element={<QuizResult />} />
          <Route path="/profil" element={<ProfilePage />} />
          <Route path="/profil-info" element={<ProfileInfo />} />
          <Route path="/login" element={
              <div className="login-container">
                <LoginForm className="login-form" />
                <SignUpForm className="login-form" />
              </div>
            } />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/asked-question" element={<NewQuizList />} />
          <Route path="/password-forgot" element={<PasswordForgot />} />
          <Route path="/password-forgot-reset" element={<PasswordReset/>} />
        </Routes>
      </Suspense>
      </div>
      </LoginProvider>
    </>
  );
}

export default App;
