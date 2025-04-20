import React from 'react';
import { Routes, Route } from 'react-router-dom';

// General Pages
import WelcomePage from './Component/Welcome.jsx';
import LearnMore from './Component/LearnMore.jsx';

// NGO Pages
import NGOSignUpPage from './Component/NGORegistration.jsx';
import NGOLoginPage from './Component/NGOLogin.jsx';
import NGODashboard from './Component/ngoDashboard.jsx';

// Farmer Pages
import FarmerSignUpPage from './Component/FarmerSignUp.jsx';
import FarmerLoginPage from './Component/FarmerSignIn.jsx';
import FarmerDashboard from './Component/farmerDashboard.jsx';

// Retailer Pages
import RetailerSignUpPage from './Component/RetailerSignup.jsx';
import RetailerSignInPage from './Component/retailerSignin.jsx';
import FoodWasteDashboard from './Component/retailerDashboard.jsx';
// Removed duplicate imports:
// import RetailerSignUpPage from './RetailerSignUpPage';
// import RetailerSignInPage from './RetailerSignInPage';

function App() {
  return (
    <Routes>
      {/* General Routes */}
      <Route path="/" element={<WelcomePage />} />
      <Route path="/learnMore" element={<LearnMore />} />
      
      {/* NGO Routes */}
      <Route path="/ngosignUp" element={<NGOSignUpPage />} />
      <Route path="/ngosignIn" element={<NGOLoginPage />} />
      <Route path="/ngo-dashboard" element={<NGODashboard />} />
      
      {/* Farmer Routes */}
      <Route path="/farmerSignUp" element={<FarmerSignUpPage />} />
      <Route path="/farmerLogin" element={<FarmerLoginPage />} />
      <Route path="/farmerDashboard" element={<FarmerDashboard />} />
      
      {/* Retailer Routes */}
      <Route path="/retailerSignUp" element={<RetailerSignUpPage />} />
      <Route path="/retailerSignIn" element={<RetailerSignInPage />} />
      <Route path="/retailerDashboard" element={<FoodWasteDashboard/>} />
      {/* Uncommented the retailer sign-in route */}
      
      {/* <Route path="/retailerDashboard" element={<RetailerDashboard />} /> */}
      {/* Left commented out as RetailerDashboard isn't imported yet */}
    </Routes>
  );
}

export default App;