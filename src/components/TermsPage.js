import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-gray-950/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                RebuildCV
              </Link>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
              <Link to="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
              <Link to="/privacy" className="text-gray-300 hover:text-white transition">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h1 className="text-3xl font-bold mb-8">Terms and Conditions</h1>
        <div className="prose prose-invert max-w-none">
          <p className="text-gray-400">Terms and conditions content will go here.</p>
          <p className="text-gray-400">This page is currently a placeholder and will be populated with the appropriate legal information.</p>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 border-t border-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} RebuildCV. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};
  
  // Privacy Policy Page
  const PrivacyPage = () => {
    return (
      <div className="min-h-screen bg-gray-950 text-white">
        {/* Navigation */}
        <nav className="border-b border-gray-800 backdrop-blur-lg bg-gray-950/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <Link to="/" className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                  RebuildCV
                </Link>
              </div>
              <div className="flex items-center space-x-8">
                <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
                <Link to="/pricing" className="text-gray-300 hover:text-white transition">Pricing</Link>
                <Link to="/terms" className="text-gray-300 hover:text-white transition">Terms & Conditions</Link>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Content */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
          <div className="prose prose-invert max-w-none">
            <p className="text-gray-400">Privacy policy content will go here.</p>
            <p className="text-gray-400">This page is currently a placeholder and will be populated with the appropriate legal information.</p>
          </div>
        </div>
  
        {/* Footer */}
        <footer className="bg-gray-950 border-t border-gray-800 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} RebuildCV. All rights reserved.</p>
          </div>
        </footer>
      </div>
    );
  };
  
  export { TermsPage, PrivacyPage };
  