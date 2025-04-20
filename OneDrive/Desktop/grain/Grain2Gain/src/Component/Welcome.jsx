import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import welcomeImage from "../assets/pppp.png"; // Ensure this path is correct

const WelcomePage = () => {
  const navigate = useNavigate();

  // State to control the modal visibility
  const [isModalOpen, setIsModalOpen] = useState(false);

  // State to track if the page has been scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  // State for fade-in animation when the component loads
  const [isVisible, setIsVisible] = useState(false);

  // useEffect for scroll detection and fade-in animation
  useEffect(() => {
    // Function to handle scroll event
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    // Timer to trigger fade-in effect
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up listeners on unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timer);
    };
  }, []);

  // Handle user type selection from modal
  const handleUserTypeSelect = (userType) => {
    setIsModalOpen(false);
    console.log("Selected User Type:", userType);

    // Redirect user based on selected type
    if (userType === "NGO") {
      navigate("/ngosignUp");
    }
    if (userType === "Farmer") {
      navigate("/farmerSignUp");
    }
    if (userType === "Retailer") {
      navigate("/retailerSignup");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-green-50 via-white to-emerald-50">
      {/* Navbar */}
      <header className="fixed w-full z-40 py-6 bg-white bg-opacity-90 backdrop-blur-md shadow-lg">
        <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
          {/* Logo and Title */}
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-400 rounded-lg mr-3 shadow-lg transform rotate-45">
              <div className="w-full h-full flex items-center justify-center transform -rotate-45">
                <span className="text-white font-bold text-xl">G2G</span>
              </div>
            </div>
            <h1 className="font-extrabold tracking-tight text-emerald-600 text-3xl">Grain2Gain</h1>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              {["Home", "About Us", "Services", "Contact"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="font-medium relative text-emerald-700 hover:text-emerald-900"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Welcome Section */}
      <section className={`pt-32 pb-20 px-4 transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left Text Section */}
            <div className="order-2 md:order-1 space-y-8 px-4">
              <div>
                {/* Tagline */}
                <div className="inline-block px-4 py-1 bg-emerald-100 text-emerald-700 rounded-full font-medium text-sm mb-4">
                  Sustainable Food Redistribution
                </div>

                {/* Main Heading */}
                <h2 className="text-5xl md:text-6xl font-extrabold text-gray-800 leading-tight relative">
                  From Waste to
                  <span className="text-emerald-600 relative ml-3 inline-block">
                    Nourishment
                    <span className="absolute bottom-0 left-0 w-full h-2 bg-emerald-300 opacity-50 rounded-full -z-10"></span>
                  </span>
                </h2>

                {/* Description */}
                <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                  Connect with our AI-powered platform that bridges surplus food providers with communities in need, creating sustainable impact for everyone.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                {/* Join Button */}
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="relative bg-gradient-to-r from-emerald-600 to-green-500 hover:from-emerald-700 hover:to-green-600 text-white px-8 py-4 rounded-xl font-semibold shadow-lg group transition transform hover:-translate-y-1"
                >
                  <span className="z-10 relative">Join the Movement</span>
                  <span className="absolute inset-0 bg-emerald-800 opacity-0 group-hover:opacity-10 rounded-xl transition-opacity"></span>
                </button>

                {/* Learn More Button */}
                <button
                  onClick={() => navigate("/learnMore")}
                  className="group bg-white hover:bg-emerald-50 text-emerald-700 border-2 border-emerald-500 px-8 py-4 rounded-lg font-semibold transition duration-300 flex items-center justify-center"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="order-1 md:order-2 relative flex justify-center">
              {/* Background Glow */}
              <div className="absolute -z-10 w-72 h-72 bg-gradient-to-r from-emerald-300 to-green-200 rounded-full filter blur-3xl opacity-50 transform translate-x-10 translate-y-10"></div>

              {/* Main Image */}
              <div className="relative w-full max-w-md">
                {/* <img
                  src={welcomeImage} // Using the imported image
                  alt="Grain2Gain"
                  className="relative z-10 rounded-2xl shadow-2xl w-full object-cover transform hover:scale-105 transition-transform duration-500"
                /> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal for Selecting User Type */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-2xl max-w-sm w-full border border-gray-100 animate-scaleIn">
            {/* Modal Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-emerald-700">Join Grain2Gain</h3>
                <p className="text-gray-500 mt-1">Select your role to get started</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
                aria-label="Close modal"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Buttons */}
            <div className="flex flex-col gap-4">
              {[{ type: "Retailer", description: "List and donate surplus food" },
                { type: "NGO", description: "Claim and distribute donations" },
                { type: "Farmer", description: "Share fresh produce directly" },
              ].map((item) => (
                <button
                  key={item.type}
                  onClick={() => handleUserTypeSelect(item.type)}
                  className="flex items-center justify-between bg-white border-2 border-emerald-100 hover:border-emerald-500 text-gray-700 p-4 rounded-xl hover:bg-emerald-50 transition-all group"
                >
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-emerald-700">{item.type}</span>
                    <span className="text-sm text-gray-500">{item.description}</span>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 group-hover:bg-emerald-500 flex items-center justify-center transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-500 group-hover:text-white transition-colors" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 3a1 1 0 011 1v12a1 1 0 01-1 1 1 1 0 01-1-1V4a1 1 0 011-1zM15 3a1 1 0 011 1v12a1 1 0 01-1 1 1 1 0 01-1-1V4a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WelcomePage;
