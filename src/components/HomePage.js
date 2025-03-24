import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import Howitwork from './Howitwork';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';

export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  
  const handleOnChange = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  return (
    <div>
      <Navigation handleOnChange={handleOnChange} />
      <section className="relative overflow-hidden py-20 sm:py-32 mt-16">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/20 to-transparent"></div>
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-12">
          <div className="lg:w-1/2 space-y-8">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight"
            >
              Land Your Dream Job With An
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400"> ATS-Optimized Resume</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-xl text-white"
            >
              Upload your resume, target your dream job, and let our AI transform your application into a recruiter magnet in seconds.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-lg text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center gap-2"
                >
                  Go to Dashboard <ChevronRight size={16} />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-lg text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center gap-2"
                >
                  Try for Free <ChevronRight size={16} />
                </Link>
              )}
              <a href="#pricing" className="px-8 py-4 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition text-lg font-medium flex items-center justify-center text-white">
                View Pricing
              </a>
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-2xl blur opacity-30"></div>
              <div className="relative bg-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-800">
                <img src="/image.png" alt="Resume Preview" className="w-full h-auto" />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent h-32"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Howitwork />
      <Pricing handleonchange={handleOnChange} />
      <Testimonials />
      <Footer />
    </div>
  );
}
// {isModalOpen && (
//   <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}>
//     <div 
//       className="bg-gray-900 rounded-xl border border-gray-800 p-8 w-full max-w-md relative" 
//       onClick={(e) => e.stopPropagation()}
//     >
//       <button 
//         className="absolute top-4 right-4 text-gray-400 hover:text-white"
//         onClick={() => setIsModalOpen(false)}
//       >
//         <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//       <h2 className="text-2xl font-bold mb-6">Start Your Free Trial</h2>
//       <p className="text-white mb-6">Create one fully optimized resume for free, no credit card required.</p>
      
//       <form className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
//           <input 
//             type="email" 
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//             placeholder="your@email.com"
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
//           <input 
//             type="password" 
//             className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
//             placeholder="Create a password"
//           />
//         </div>
//         <div className="flex items-center">
//           <input 
//             type="checkbox" 
//             id="terms" 
//             className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
//           />
//           <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
//             I agree to the <Link to="/terms" className="text-purple-400 hover:text-purple-300">Terms & Conditions</Link> and <Link to="/privacy" className="text-purple-400 hover:text-purple-300">Privacy Policy</Link>
//           </label>
//         </div>
//         <button 
//           type="submit"
//           className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
//         >
//           Create Free Account
//         </button>
//       </form>
      
//       <div className="mt-6 text-center text-sm text-gray-400">
//         Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300">Sign in</Link>
//       </div>
//     </div>
//   </div>
// )}