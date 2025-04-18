import React from 'react';
import { Routes, Route } from 'react-router-dom';
import WelcomePage from './Component/Welcome.jsx';
import LearnMore from './Component/LearnMore.jsx';
import SignupPage from './Component/NGORegistration';
import LoginPage from './Component/NGOLogin.jsx';
import SignUpPage from  './Component/FarmerSignUp.jsx';
import FarmerSignupPage from './Component/FarmerSignUp.jsx';
import RetailerSignUpPage from './Component/retailerSignup.jsx';
function App() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/learnMore" element={<LearnMore />} />
      <Route path="/ngosignUp" element={<SignupPage/>} />
      <Route path="/ngosignIn" element={<LoginPage/>} />
      <Route path='/farmerSignUp' element={<FarmerSignupPage/>} />
      <Route path='/retailerSignup' element={<RetailerSignUpPage/>} />
      
    </Routes>
  );
}

export default App;
