import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { motion, AnimatePresence } from 'framer-motion';
import DashboardNavigation from './DashboardNavigation';
import DashboardSidebar from './DashboardSidebar';
import TemplateSelector from './TemplateSelector';
import { FaDownload, FaFont, FaLayerGroup, FaRedo, FaUndo } from 'react-icons/fa';
import ResumePreview from './ResumePreview';

const Dashboard = () => {
  const { currentUser } = useAuth();
  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobCompany, setJobCompany] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [optimizedResume, setOptimizedResume] = useState(null);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState('modern');
  const [showParameters, setShowParameters] = useState(false);
  const [parameters, setParameters] = useState({
    keywordEmphasis: 7,
    briefnessFactor: 5,
    technicalDetail: 5,
    experienceHighlight: 5,
    skillsEmphasis: 5
  });

  const handleResumeUpload = (file) => {
    // In a real app, this would parse the resume file
    // Here we just simulate having resume data
    const reader = new FileReader();
    reader.onload = (e) => {
      setResume({
        name: file.name,
        content: e.target.result,
        // Simulated structured data that would be extracted from the resume
        data: {
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "555-123-4567",
          title: "Senior Software Engineer",
          summary: "Experienced software engineer with expertise in React, Node.js, and cloud infrastructure. 8+ years building scalable web applications and leading development teams.",
          experience: [
            {
              title: "Senior Software Engineer",
              company: "Tech Solutions Inc.",
              period: "2018 - Present",
              responsibilities: [
                "Lead a team of 5 engineers developing a SaaS platform",
                "Architect and implement microservices using Node.js and AWS",
                "Optimize React frontend performance by reducing bundle size by 40%"
              ]
            },
            {
              title: "Software Engineer",
              company: "WebDev Agency",
              period: "2015 - 2018",
              responsibilities: [
                "Developed responsive web applications using React and Redux",
                "Implemented RESTful APIs using Express.js",
                "Collaborated with UX designers to improve user experience"
              ]
            }
          ],
          education: [
            {
              degree: "M.S. Computer Science",
              school: "Tech University",
              year: "2015"
            },
            {
              degree: "B.S. Computer Science",
              school: "State University",
              year: "2013"
            }
          ],
          skills: ["JavaScript", "React", "Node.js", "Express", "AWS", "MongoDB", "GraphQL", "TypeScript", "Docker", "Kubernetes"]
        }
      });
    };
    reader.readAsText(file);
  };

  const handleJobDescriptionUpload = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setJobDescription(e.target.result);
    };
    reader.readAsText(file);
  };

  const handleOptimizeResume = () => {
    if (!resume || (!jobDescription && (!jobTitle || !jobCompany))) {
      alert("Please provide a resume and job details");
      return;
    }

    setIsProcessing(true);

    // Simulate API call with a delay
    setTimeout(() => {
      // In a real app, this would call an API to optimize the resume
      setOptimizedResume({
        ...resume,
        data: {
          ...resume.data,
          // The optimization would highlight relevant skills and reorder/emphasize experience
          summary: "Detail-oriented software engineer with 8+ years of experience building modern web applications. Expert in React, Node.js, and cloud infrastructure with a proven track record of leading teams and delivering high-performance solutions that drive business results.",
          skills: ["JavaScript", "React", "Redux", "Node.js", "Express", "AWS", "MongoDB", "GraphQL", "TypeScript", "CI/CD", "Docker"],
          keywordMatches: 85,
          improvements: [
            "Added keywords from job description",
            "Reordered experience to highlight relevant achievements",
            "Quantified achievements with metrics",
            "Adjusted summary to align with job requirements"
          ]
        }
      });
      setIsProcessing(false);
      setShowParameters(true);
    }, 3000);
  };

  const handleResetOptimization = () => {
    setOptimizedResume(null);
    setShowParameters(false);
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or DOCX file
    alert("Resume would be downloaded here");
  };

  const handleParameterChange = (param, value) => {
    setParameters({
      ...parameters,
      [param]: value
    });

    // In a real app, this would refresh the optimized resume
    // based on the new parameters
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <DashboardNavigation />
      
      <div className="flex flex-col md:flex-row">
        <DashboardSidebar />
        
        <main className="flex-1 p-4">
          <div className="max-w-7xl mx-auto">
            {/* Header section with user info and credits */}
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h2 className="text-xl font-bold">Welcome, {currentUser.name}!</h2>
                <p className="text-gray-400">Let's optimize your resume for your dream job.</p>
              </div>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <div className="bg-gray-800 px-3 py-1 rounded-full text-sm">
                  {currentUser.subscription} Plan
                </div>
                <div className="bg-purple-900/50 px-3 py-1 rounded-full text-sm border border-purple-500/30">
                  {currentUser.credits} Credits
                </div>
                {currentUser.subscription !== "Free" && currentUser.expiresAt && (
                  <div className="bg-cyan-900/50 px-3 py-1 rounded-full text-sm border border-cyan-500/30">
                    Expires: {new Date(currentUser.expiresAt).toLocaleDateString()}
                  </div>
                )}
              </div>
            </div>

            {/* Main content with resume and job details */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left pane - Resume */}
              <div className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900">
                  <h3 className="font-medium">
                    {optimizedResume ? "Optimized Resume" : "Your Resume"}
                  </h3>
                  <div className="flex space-x-2">
                    {optimizedResume ? (
                      <>
                        <button 
                          onClick={handleResetOptimization}
                          className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                          title="Reset optimization"
                        >
                          <FaUndo className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => setIsTemplateModalOpen(true)}
                          className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                          title="Change template"
                        >
                          <FaLayerGroup className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={handleDownload}
                          className="p-2 bg-gray-800 rounded-md hover:bg-gray-700 transition"
                          title="Download resume"
                        >
                          <FaDownload className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <button 
                        onClick={() => document.getElementById('resume-upload').click()}
                        className="p-2 bg-purple-900/50 rounded-md hover:bg-purple-900/70 transition border border-purple-500/30"
                      >
                        Upload Resume
                      </button>
                    )}
                    <input
                      id="resume-upload"
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => {
                        if (e.target.files[0]) {
                          handleResumeUpload(e.target.files[0]);
                        }
                      }}
                      className="hidden"
                    />
                  </div>
                </div>

                <div className="p-4">
                  {!resume && !optimizedResume ? (
                    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
                      <div className="w-24 h-24 bg-gray-800 rounded-full flex items-center justify-center mb-4">
                        <FaFont className="w-10 h-10 text-gray-600" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No Resume Uploaded</h3>
                      <p className="text-gray-400 mb-4 max-w-xs">
                        Upload your current resume to get started with optimization
                      </p>
                      <button
                        onClick={() => document.getElementById('resume-upload').click()}
                        className="px-4 py-2 bg-purple-600 rounded-md hover:bg-purple-700 transition"
                      >
                        Upload Resume
                      </button>
                    </div>
                  ) : (
                    <div className="h-[calc(100vh-300px)] overflow-y-auto custom-scrollbar">
                      {optimizedResume ? (
                        <ResumePreview resume={optimizedResume.data} template={selectedTemplate} />
                      ) : (
                        <ResumePreview resume={resume.data} template="simple" />
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Right pane - Job details or parameters */}
              <AnimatePresence mode="wait">
                {!showParameters ? (
                  <motion.div
                    key="job-details"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-800 bg-gray-900">
                      <h3 className="font-medium">Job Details</h3>
                    </div>
                    <div className="p-4">
                      <form className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Job Title
                          </label>
                          <input
                            type="text"
                            value={jobTitle}
                            onChange={(e) => setJobTitle(e.target.value)}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                            placeholder="e.g. Senior Software Engineer"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Company
                          </label>
                          <input
                            type="text"
                            value={jobCompany}
                            onChange={(e) => setJobCompany(e.target.value)}
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
                            rows={10}
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-md focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none"
                            placeholder="Paste the job description here..."
                          ></textarea>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-300 mb-1">
                            Or upload job description file
                          </label>
                          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-700 border-dashed rounded-md hover:border-gray-600 transition cursor-pointer"
                            onClick={() => document.getElementById('job-description-upload').click()}
                          >
                            <div className="space-y-1 text-center">
                              <svg
                                className="mx-auto h-12 w-12 text-gray-400"
                                stroke="currentColor"
                                fill="none"
                                viewBox="0 0 48 48"
                                aria-hidden="true"
                              >
                                <path
                                  d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H8m36-12h-4m4 0H20"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <div className="flex text-sm text-gray-400">
                                <label
                                  htmlFor="job-description-upload"
                                  className="relative cursor-pointer rounded-md font-medium text-purple-400 hover:text-purple-300"
                                >
                                  <span>Upload a file</span>
                                  <input
                                    id="job-description-upload"
                                    type="file"
                                    accept=".pdf,.doc,.docx,.txt"
                                    onChange={(e) => {
                                      if (e.target.files[0]) {
                                        handleJobDescriptionUpload(e.target.files[0]);
                                      }
                                    }}
                                    className="sr-only"
                                  />
                                </label>
                                <p className="pl-1">or drag and drop</p>
                              </div>
                              <p className="text-xs text-gray-500">
                                PDF, DOC, DOCX, or TXT up to 10MB
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="pt-4">
                          <button
                            type="button"
                            onClick={handleOptimizeResume}
                            disabled={isProcessing || !resume}
                            className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition disabled:opacity-50"
                          >
                            {isProcessing ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Optimizing Resume...
                              </>
                            ) : (
                              'Optimize Resume'
                            )}
                          </button>
                        </div>
                      </form>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="optimization-parameters"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-gray-900/50 border border-gray-800 rounded-lg overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-800 bg-gray-900">
                      <h3 className="font-medium">Optimization Parameters</h3>
                    </div>
                    <div className="p-4">
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-300">Keyword Emphasis</span>
                          <span className="text-sm text-gray-400">{parameters.keywordEmphasis}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={parameters.keywordEmphasis}
                          onChange={(e) => handleParameterChange('keywordEmphasis', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Subtle</span>
                          <span>Balanced</span>
                          <span>Prominent</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-300">Content Length</span>
                          <span className="text-sm text-gray-400">{parameters.briefnessFactor}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={parameters.briefnessFactor}
                          onChange={(e) => handleParameterChange('briefnessFactor', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Concise</span>
                          <span>Balanced</span>
                          <span>Detailed</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-300">Technical Detail</span>
                          <span className="text-sm text-gray-400">{parameters.technicalDetail}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={parameters.technicalDetail}
                          onChange={(e) => handleParameterChange('technicalDetail', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Simplified</span>
                          <span>Balanced</span>
                          <span>Technical</span>
                        </div>
                      </div>
                      
                      <div className="mb-6">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-gray-300">Experience vs. Skills</span>
                          <span className="text-sm text-gray-400">{parameters.experienceHighlight}/10</span>
                        </div>
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={parameters.experienceHighlight}
                          onChange={(e) => handleParameterChange('experienceHighlight', parseInt(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>Skills Focus</span>
                          <span>Balanced</span>
                          <span>Experience Focus</span>
                        </div>
                      </div>

                      <div className="mt-8 space-y-4">
                        <div className="bg-green-900/20 border border-green-500/30 rounded-md p-4">
                          <h3 className="text-green-400 font-medium mb-2 flex items-center">
                            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                            </svg>
                            85% Keyword Match
                          </h3>
                          <p className="text-sm text-gray-300">
                            Your optimized resume includes 85% of the key skills and qualifications from the job description.
                          </p>
                        </div>
                        
                        <div className="bg-gray-800/50 border border-gray-700 rounded-md p-4">
                          <h3 className="font-medium mb-2">Improvements Made</h3>
                          <ul className="text-sm text-gray-300 space-y-2">
                            {optimizedResume?.data.improvements.map((improvement, index) => (
                              <li key={index} className="flex items-start">
                                <svg className="w-5 h-5 text-purple-400 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                </svg>
                                {improvement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>

                      <div className="mt-8 flex space-x-4">
                        <button
                          onClick={handleResetOptimization}
                          className="flex-1 py-2 px-4 border border-gray-700 rounded-md bg-gray-800 hover:bg-gray-700 transition"
                        >
                          Start Over
                        </button>
                        <button
                          onClick={handleDownload}
                          className="flex-1 py-2 px-4 border border-transparent rounded-md text-white bg-gradient-to-r from-purple-600 to-cyan-500 hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center"
                        >
                          <FaDownload className="mr-2" />
                          Download Resume
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </main>
      </div>

      {/* Template Selector Modal */}
      {isTemplateModalOpen && (
        <TemplateSelector
          currentTemplate={selectedTemplate}
          onSelectTemplate={(template) => {
            setSelectedTemplate(template);
            setIsTemplateModalOpen(false);
          }}
          onClose={() => setIsTemplateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
