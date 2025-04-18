import React from 'react';

const LearnMore = () => {
  return (
    <div className="min-h-screen bg-white px-6 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-emerald-600 mb-3">About Grain2Gain</h1>
          <div className="h-1 w-24 bg-emerald-500 mx-auto rounded"></div>
        </div>

        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm mb-8 border-l-4 border-emerald-500">
          <p className="text-lg text-gray-700 leading-relaxed">
            Our project <span className="font-semibold text-emerald-600">"Grain2Gain"</span> introduces an AI-powered food redistribution
            ecosystem that connects surplus food suppliers with those in need.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-emerald-600 mb-3">Smart Analytics</h2>
            <p className="text-gray-700 leading-relaxed">
              The platform features <span className="font-medium">predictive analytics</span> for demand forecasting,
              enabling better production planning and significantly reducing waste.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold text-emerald-600 mb-3">Real-Time Matching</h2>
            <p className="text-gray-700 leading-relaxed">
              A <span className="font-medium">real-time matching system</span> pairs suppliers with recipients based on food type,
              quantity, location, and time sensitivity.
            </p>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <h2 className="text-xl font-semibold text-emerald-600 mb-3">User Experience</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            Stakeholders benefit from a <span className="font-medium">user-friendly mobile application</span>, allowing
            farmers and retailers to list surplus food quickly while NGOs can easily claim donations.
            A <span className="font-medium">blockchain-based verification system</span> ensures food safety and traceability.
          </p>
        </div>

        <div className="bg-emerald-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-xl font-semibold text-emerald-600 mb-3">Key Features</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {[
              "Route optimization for efficient pickup and delivery",
              "Food quality assessment tools",
              "Impact tracking dashboards for suppliers",
              "Data analytics for identifying waste patterns"
            ].map((item, index) => (
              <li key={index} className="flex items-start">
                <span className="text-emerald-500 mr-2">•</span>
                <span className="text-gray-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center bg-white p-6 rounded-lg shadow-sm border-t-2 border-emerald-500">
          <p className="text-lg text-gray-700 leading-relaxed">
            By addressing inefficiencies in food distribution, <span className="font-semibold text-emerald-600">Grain2Gain</span> offers a sustainable,
            efficient, and impactful solution to reduce waste while tackling food insecurity.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LearnMore;