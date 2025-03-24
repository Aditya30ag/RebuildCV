import React, { useState, useRef, useEffect } from 'react';
import { Menu, X, Upload, Briefcase, FileText } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'framer-motion';

export default function Navigation({ handleOnChange }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [company, setCompany] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);
  const jobDescInputRef = useRef(null);
  
  const rotateY = useMotionValue(0);
  const scale = useTransform(rotateY, [0, 180], [1, 0.9]);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  const handleLogoClick = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleResumeUpload = (e) => {
    if (e.target.files[0]) {
      setResumeFile(e.target.files[0]);
    }
  };
  
  const handleJobDescUpload = (e) => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setJobDescription(e.target.result);
      };
      reader.readAsText(e.target.files[0]);
    }
  };
  
  const handleContinue = () => {
    if (!resumeFile) {
      alert("Please upload your resume");
      return;
    }
    
    if (!jobTitle || !company) {
      if (!jobDescription) {
        alert("Please enter job details or upload a job description");
        return;
      }
    }
    
    // In a real app, you would store this data or pass it to another component
    // For now, we'll redirect to the dashboard
    if (!currentUser) {
      navigate('/login');
    } else {
      navigate('/dashboard');
    }
  };
  
  useEffect(() => {
    rotateY.set(isFlipped ? 180 : 0);
  }, [isFlipped, rotateY]);

  return (
    <div>
      <nav className="border-b border-gray-800 backdrop-blur-lg bg-gray-900 z-50 fixed top-0 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <motion.div 
                className="relative w-10 h-10 cursor-pointer"
                onClick={handleLogoClick}
                style={{ perspective: 1000 }}
              >
                <AnimatePresence initial={false} mode="wait">
                  {!isFlipped ? (
                    <motion.div
                      key="logo-front"
                      className="absolute inset-0 flex items-center justify-center"
                      animate={{ rotateY: 0, scale: 1 }}
                      exit={{ rotateY: -90, scale: 0.9 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      style={{ 
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                        R
                      </span>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="logo-back"
                      className="absolute inset-0 flex items-center justify-center"
                      initial={{ rotateY: 90, scale: 0.9 }}
                      animate={{ rotateY: 0, scale: 1 }}
                      exit={{ rotateY: 90, scale: 0.9 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      style={{ 
                        backfaceVisibility: "hidden",
                        transformStyle: "preserve-3d"
                      }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" className="w-6 h-6 text-cyan-400">
                        <path d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              <span className="ml-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">
                ebuildCV
              </span>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-300 hover:text-white transition">Features</a>
              <a href="#pricing" className="text-gray-300 hover:text-white transition">Pricing</a>
              <div className="relative group">
                <button className="text-gray-300 hover:text-white transition flex items-center">
                  Blog
                  <svg className="ml-1 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute left-0 mt-2 w-48 bg-gray-900 rounded-md shadow-lg border border-gray-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                  <div className="py-1">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Blog Posts</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Cover Letters</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800">Interview Prep</a>
                  </div>
                </div>
              </div>
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                >
                  Dashboard
                </Link>
              ) : (
                <button
                  onClick={handleOnChange}
                  className="bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                >
                  Try for Free
                </button>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMobileMenu}
                className="text-gray-300 hover:text-white p-2"
                aria-label="Toggle mobile menu"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900 border-t border-gray-800">
              <a 
                href="#features" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pricing
              </a>
              <div className="px-3 py-2">
                <div className="flex justify-between items-center text-base font-medium text-gray-300">
                  <span>Blog</span>
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="mt-2 pl-4 space-y-1 border-l border-gray-700">
                  <a href="#" className="block py-1 text-sm text-gray-400 hover:text-white">Blog Posts</a>
                  <a href="#" className="block py-1 text-sm text-gray-400 hover:text-white">Cover Letters</a>
                  <a href="#" className="block py-1 text-sm text-gray-400 hover:text-white">Interview Prep</a>
                </div>
              </div>
              <div className="px-3 py-2">
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="block w-full text-center bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      handleOnChange();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-cyan-500 px-4 py-2 rounded-lg text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition"
                  >
                    Try for Free
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>
      
      {/* 3D Flip Card Content */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsFlipped(false)}
          >
            <motion.div 
              className="bg-gray-900 rounded-xl border border-gray-800 p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.4 }}
            >
              <h2 className="text-2xl font-bold mb-6">Get Started</h2>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-400 mr-3">
                      1
                    </div>
                    <label className="block font-medium">Upload your resume</label>
                  </div>
                  <div 
                    className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md cursor-pointer hover:border-gray-600 transition"
                    onClick={() => fileInputRef.current.click()}
                  >
                    <div className="space-y-1 text-center">
                      {resumeFile ? (
                        <>
                          <svg className="mx-auto h-12 w-12 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <p className="text-sm text-gray-400">
                            {resumeFile.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            Click to change file
                          </p>
                        </>
                      ) : (
                        <>
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="text-sm text-gray-400">
                            <span className="font-medium text-purple-400 hover:text-purple-300">
                              Upload a file
                            </span> or drag and drop
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, DOC, DOCX up to 10MB
                          </p>
                        </>
                      )}
                    </div>
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleResumeUpload}
                    className="sr-only"
                  />
                </div>
                
                <div>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-purple-900/60 flex items-center justify-center text-purple-400 mr-3">
                      2
                    </div>
                    <label className="block font-medium">Enter job details</label>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Job Title
                      </label>
                      <input
                        type="text"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="e.g. Software Engineer"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Company
                      </label>
                      <input
                        type="text"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="e.g. Google"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">
                        Job Description
                      </label>
                      <textarea
                        value={jobDescription}
                        onChange={(e) => setJobDescription(e.target.value)}
                        rows={4}
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                        placeholder="Paste job description here..."
                      ></textarea>
                      <div className="mt-1 flex items-center text-sm">
                        <span className="text-gray-400 mr-2">Or</span>
                        <button
                          type="button"
                          onClick={() => jobDescInputRef.current.click()}
                          className="text-purple-400 hover:text-purple-300"
                        >
                          upload a file
                        </button>
                        <input
                          ref={jobDescInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx,.txt"
                          onChange={handleJobDescUpload}
                          className="sr-only"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button
                  type="button"
                  onClick={() => setIsFlipped(false)}
                  className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleContinue}
                  className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition"
                >
                  Continue
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
