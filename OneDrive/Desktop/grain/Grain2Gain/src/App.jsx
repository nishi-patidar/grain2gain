import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './Component/Welcome.jsx';
import LearnMore from './Component/LearnMore.jsx';
import SignupPage from './Component/NGORegistration';

function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/learnMore" element={<LearnMore />} />
      <Route path="/signUp" element={<SignupPage/>} />
    </Routes>
  );
}

export default App;
