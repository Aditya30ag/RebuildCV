import React, { useState, useEffect, useRef, useMemo, memo } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, useScroll } from 'framer-motion';
import { ChevronRight, ArrowRight, Check, Star, Clock, Award, Zap, MousePointer, ArrowDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import Howitwork from './Howitwork';
import Pricing from './Pricing';
import Testimonials from './Testimonials';
import Footer from './Footer';
import Navigation from './Navigation';
import { useAuth } from '../context/AuthContext';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, PresentationControls, Environment, ContactShadows, Float } from '@react-three/drei';
import * as THREE from 'three';
import ParticleBackground from './design/ParticleBackground';
import FlipCard from './design/FlipCard';
import ScrollPrompt from './design/ScrollPrompt';

// Animated 3D document model component
const ResumeModel = () => {
  const { nodes, materials } = useGLTF("/resume.glb");
  const group = useRef();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.sin(t / 2) / 10,
        0.05
      );
      group.current.position.y = THREE.MathUtils.lerp(
        group.current.position.y,
        Math.sin(t / 1.5) / 10,
        0.05
      );
    }
  });
  
  return (
    <group ref={group} dispose={null} scale={1.5}>
      <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes?.Document?.geometry}
          material={materials?.DocumentMaterial}
          position={[0, 0, 0]}
        />
      </Float>
    </group>
  );
};


// Typing animation component
const TypeWriter = ({ text, className }) => {
  const [displayText, setDisplayText] = useState('');
  const index = useRef(0);
  
  useEffect(() => {
    if (index.current < text.length) {
      const timeoutId = setTimeout(() => {
        setDisplayText(text.substring(0, index.current + 1));
        index.current += 1;
      }, 50);
      
      return () => clearTimeout(timeoutId);
    }
  }, [displayText, text]);
  
  return <span className={className}>{displayText}</span>;
};

// Floating elements animation
const FloatingElement = memo(({ children, delay = 0, duration = 4, y = 15 }) => {
  return (
    <motion.div
      className="will-change-transform"
      animate={{ 
        y: [0, -y, 0],
        transition: {
          duration,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          delay
        }
      }}
    >
      {children}
    </motion.div>
  );
});



// Main HomePage component
export default function HomePage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { currentUser } = useAuth();
  const { scrollYProgress } = useScroll();
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  
  // Refs for sections
  const heroRef = useRef(null);
  const ctaRef = useRef(null);
  
  // State for animation triggers
  const [heroInView, setHeroInView] = useState(true);
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  
  // Optimized stats for psychological impact
  const stats = useMemo(() => [
    { value: "93%", label: "Success Rate", icon: <Star className="w-5 h-5 text-yellow-400" /> },
    { value: "2.5×", label: "More Interviews", icon: <Zap className="w-5 h-5 text-cyan-400" /> },
    { value: "48 Hrs", label: "Average Time to Interview", icon: <Clock className="w-5 h-5 text-purple-400" /> },
    { value: "150K+", label: "Resumes Optimized", icon: <Award className="w-5 h-5 text-green-400" /> }
  ], []);
  
  const handleOnChange = () => {
    setIsModalOpen(!isModalOpen);
  };
  
  // Intersection observer setup
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeroInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (heroRef.current) {
      observer.observe(heroRef.current);
    }
    
    return () => {
      if (heroRef.current) {
        observer.unobserve(heroRef.current);
      }
    };
  }, []);
  
  // Hide scroll indicator after delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIndicator(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Optimized mouse follower effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const cursorX = useSpring(0, { stiffness: 100, damping: 25 });
  const cursorY = useSpring(0, { stiffness: 100, damping: 25 });
  
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  useEffect(() => {
    cursorX.set(mousePosition.x);
    cursorY.set(mousePosition.y);
  }, [mousePosition, cursorX, cursorY]);
  
  return (
    <div className="relative bg-gray-950 overflow-hidden">
      {/* Optimized cursor effect */}
      <motion.div
        className="fixed w-10 h-10 rounded-full border-2 border-purple-500/50 pointer-events-none mix-blend-difference z-50 hidden md:block will-change-transform"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: "-50%",
          translateY: "-50%"
        }}
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.5, 1],
          repeat: Infinity,
          repeatDelay: 0
        }}
      />
      
      {/* Optimized scroll progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-600 to-cyan-500 z-50 origin-left will-change-transform"
        style={{ scaleX }}
      />
      
      {/* Background particles effect */}
      <div className="fixed inset-0 z-0">
        <ParticleBackground />
      </div>
      
      {/* Noise texture overlay */}
      <div className="fixed inset-0 z-0 opacity-30 pointer-events-none bg-repeat"></div>
      
      <Navigation handleOnChange={handleOnChange} />
      
      {/* Hero section */}
      <section 
        ref={heroRef}
        className="relative min-h-screen pt-32 pb-20 overflow-hidden z-10"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-purple-900/10 via-gray-950 to-gray-950 z-0"></div>
        
        {/* Animated 3D elements */}
        <div className="absolute top-1/4 -right-40 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-1/3 -left-40 w-80 h-80 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center mb-16"
          >
            <FlipCard />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.1 }}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-white"
              >
                <TypeWriter
                  text="Transform Your Resume Into"
                  className=""
                />
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400 mt-2 block">
                  Your Career Superpower
                </span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-xl text-gray-300 leading-relaxed"
              >
                Our AI-powered platform analyzes job descriptions to create perfectly tailored resumes that bypass ATS systems and catch recruiters' attention in <span className="text-cyan-400 font-semibold">8.2 seconds</span> - the average time spent reviewing each application.
              </motion.p>
              
              {/* Optimized stats display */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 0.8 }}
                className="grid grid-cols-2 gap-6 my-8"
              >
                {stats.map((stat, index) => (
                  <FloatingElement key={index} delay={index * 0.2} y={8} duration={3 + index}>
                    <div className="bg-gray-900/50 backdrop-blur-sm p-4 rounded-xl border border-gray-800 hover:border-purple-500/50 transition group">
                      <div className="flex items-center gap-3 mb-2">
                        {stat.icon}
                        <span className="text-2xl font-bold text-white">{stat.value}</span>
                      </div>
                      <p className="text-gray-400 text-sm">{stat.label}</p>
                    </div>
                  </FloatingElement>
                ))}
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                {currentUser ? (
                  <Link
                    to="/dashboard"
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-lg text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center gap-2 group"
                  >
                    <span className="relative z-10">Go to Dashboard</span>
                    <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                ) : (
                  <Link
                    to="/signup"
                    className="relative overflow-hidden bg-gradient-to-r from-purple-600 to-cyan-500 px-8 py-4 rounded-lg text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition flex items-center justify-center gap-2 group"
                  >
                    <span className="relative z-10">Try for Free</span>
                    <ChevronRight size={16} className="relative z-10 transition-transform group-hover:translate-x-1" />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                  </Link>
                )}
                <a 
                  href="#pricing" 
                  className="relative overflow-hidden px-8 py-4 rounded-lg border border-gray-700 bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700 transition text-lg font-medium flex items-center justify-center text-white group"
                >
                  <span className="relative z-10">View Pricing</span>
                  <div className="absolute inset-0 bg-gray-700 translate-x-full group-hover:translate-x-0 transition-transform duration-300"></div>
                </a>
              </motion.div>
              
              {/* Trust signals */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.7, delay: 1.2 }}
                className="flex flex-col space-y-3 mt-6"
              >
                <div className="text-sm text-gray-400">Trusted by professionals from:</div>
                <div className="flex flex-wrap gap-6 items-center opacity-60">
                  <img src="companies/google.svg " alt="Google" className="h-6" />
                  <img src="companies/microsoft.svg " alt="Microsoft" className="h-6" />
                  <img src="43.svg "  alt="Apple" className="h-6 invert" />
                  <img src="45.svg " alt="Amazon" className="h-6 invert" />
                  <img src="46.svg " alt="Meta" className="h-6 invert" />

                </div>
              </motion.div>
            </div>
            
            {/* 3D Resume Preview */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="hidden lg:block relative h-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 rounded-2xl blur-3xl"></div>
              <div className="absolute inset-0">
                <Canvas shadows camera={{ position: [0, 0, 8], fov: 45 }}>
                  <ambientLight intensity={0.5} />
                  <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
                  <PresentationControls
                    global
                    rotation={[0, 0, 0]}
                    polar={[-Math.PI / 4, Math.PI / 4]}
                    azimuth={[-Math.PI / 4, Math.PI / 4]}
                    config={{ mass: 2, tension: 500 }}
                    snap={{ mass: 4, tension: 250 }}
                  >
                    <Float rotationIntensity={0.4}>
                      <ResumeModel />
                    </Float>
                  </PresentationControls>
                  <ContactShadows position={[0, -3.5, 0]} opacity={0.4} scale={20} blur={1.5} />
                  <Environment preset="city" />
                </Canvas>
              </div>
              
              {/* Animated annotations */}
              <div className="absolute top-12 right-12">
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2, duration: 0.5 }}
                  className="bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-cyan-500/30 shadow-lg shadow-cyan-500/10"
                >
                  <div className="text-cyan-400 font-semibold">ATS-Optimized Format</div>
                  <div className="text-xs text-gray-300">Guaranteed to pass screening systems</div>
                </motion.div>
              </div>
              <div className="absolute bottom-24 left-4">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="bg-gray-900/80 backdrop-blur-sm p-3 rounded-lg border border-purple-500/30 shadow-lg shadow-purple-500/10"
                >
                  <div className="text-purple-400 font-semibold">Tailored Content</div>
                  <div className="text-xs text-gray-300">Aligned with job requirements</div>
                </motion.div>
              </div>
              <div className="absolute top-1/2 -translate-y-1/2 left-1/3">
                <motion.div
                  animate={{ 
                    rotate: [0, 5, 0, -5, 0],
                    scale: [1, 1.05, 1, 1.05, 1]
                  }}
                  transition={{
                    duration: 5,
                    ease: "easeInOut",
                    times: [0, 0.25, 0.5, 0.75, 1],
                    repeat: Infinity,
                    repeatDelay: 0
                  }}
                  className="w-16 h-16 flex items-center justify-center bg-gradient-to-br from-purple-600 to-cyan-500 rounded-full shadow-lg shadow-purple-500/20"
                >
                  <MousePointer className="w-6 h-6 text-white" />
                </motion.div>
                <div className="text-xs text-center mt-2 text-white">Interactive Preview</div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll prompt */}
        {showScrollIndicator && (
          <ScrollPrompt />
        )}
      </section>
      
      {/* Value Proposition section */}
      <section className="relative py-20 z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-gray-950 z-0"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Why Job Seekers <span className="text-cyan-400">Love</span> RebuildCV</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Our platform transforms the job application process with AI-powered precision.</p>
          </motion.div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "AI Keyword Optimization",
                description: "Our algorithm identifies and incorporates the exact keywords that ATS systems prioritize.",
                icon: <div className="w-16 h-16 rounded-xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012 2v0a2 2 0 002 2h0a2 2 0 012-2" />
                  </svg>
                </div>
              },
              {
                title: "Job-Specific Tailoring",
                description: "Each resume version is specifically engineered to match the exact requirements of your target position.",
                icon: <div className="w-16 h-16 rounded-xl bg-cyan-900/30 flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition text-cyan-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
              },
              {
                title: "Real-time Analytics",
                description: "See exactly how your resume scores against job requirements with our match percentage technology.",
                icon: <div className="w-16 h-16 rounded-xl bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition-all duration-300 group hover:shadow-lg hover:shadow-cyan-900/20 hover:translate-y-[-5px]"
              >
                {feature.icon}
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-cyan-400 transition-colors">{feature.title}</h3>
                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                
                <div className="mt-6 flex items-center text-cyan-400 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Learn more</span>
                  <ArrowRight className="ml-2 w-4 h-4" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Social proof section */}
      <section className="relative py-20 z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-900/50 to-gray-950 z-0"></div>
        <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        <div className="absolute left-0 right-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative pt-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              The <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">Secret Weapon</span> of Successful Job Seekers
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join thousands who've transformed their job search with RebuildCV's AI technology.
            </p>
          </motion.div>
          
          <div className="grid md:grid-cols-12 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7 }}
              className="md:col-span-8 bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/30 transition"
            >
              <div className="flex items-center mb-4">
                {[1, 2, 3, 4, 5].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                ))}
                <span className="ml-2 text-sm text-gray-400">Verified review</span>
              </div>
              <blockquote className="text-xl text-white mb-6 font-light italic relative">
                <span className="absolute top-0 left-0 text-6xl text-purple-500/20">"</span>
                <p className="relative z-10 pl-6">
                  After 3 months of zero responses, I used RebuildCV to optimize my resume for a senior developer role. 
                  Within a week, I had <span className="font-semibold text-cyan-400">5 interview requests</span>, including from two FAANG companies. 
                  The keyword optimization made all the difference in getting past the ATS systems.
                </p>
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-lg font-bold text-white">M</div>
                <div className="ml-4">
                  <p className="font-medium text-white">Michael Chen</p>
                  <p className="text-sm text-gray-400">Senior Software Engineer at Google</p>
                </div>
              </div>
            </motion.div>
            
            <div className="md:col-span-4 grid grid-rows-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-cyan-500/30 transition"
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-white mb-4">
                  <p>
                    "The ATS optimization is incredible. My interview rate went from 5% to 35% overnight!"
                  </p>
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">J</div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Jessica T.</p>
                    <p className="text-xs text-gray-400">Marketing Director</p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.7, delay: 0.4 }}
                className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800 hover:border-purple-500/30 transition"
              >
                <div className="flex items-center mb-4">
                  {[1, 2, 3, 4, 5].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-white mb-4">
                  <p>
                    "RebuildCV helped me highlight transferable skills that I didn't know how to showcase before."
                  </p>
                </blockquote>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-sm font-bold text-white">A</div>
                  <div className="ml-3">
                    <p className="font-medium text-white">Alex W.</p>
                    <p className="text-xs text-gray-400">Career Changer</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section 
        ref={ctaRef}
        className="relative py-24 z-10 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-950 to-purple-900/20 z-0"></div>
        
        {/* Animated background elements */}
        <div className="absolute w-full h-full overflow-hidden">
          <motion.div
            animate={{ 
              rotate: [0, 360],
              x: ['-50%', '-30%', '-50%', '-70%', '-50%'],
              y: ['-50%', '-30%', '-50%', '-70%', '-50%'],
            }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-[800px] h-[800px] border border-purple-500/10 rounded-full"
          />
          <motion.div
            animate={{ 
              rotate: [360, 0],
              x: ['-50%', '-40%', '-50%', '-60%', '-50%'],
              y: ['-50%', '-60%', '-50%', '-40%', '-50%'],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-[600px] h-[600px] border border-cyan-500/10 rounded-full"
          />
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute left-1/2 top-1/2 w-[400px] h-[400px] border border-purple-500/20 rounded-full transform -translate-x-1/2 -translate-y-1/2"
          />
        </div>
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7 }}
            className="bg-gray-900/70 backdrop-blur-sm p-12 rounded-2xl border border-gray-800 text-center"
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
              <div className="inline-block animate-bounce bg-gradient-to-r from-purple-600 to-cyan-500 p-4 rounded-full shadow-lg">
                <ArrowDown className="w-6 h-6 text-white" />
              </div>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-white">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-gray-100 mb-8">
              Join thousands of successful job seekers who've optimized their resumes with RebuildCV
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Go to Dashboard
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              ) : (
                <Link
                  to="/signup"
                  className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition group relative overflow-hidden"
                >
                  <span className="relative z-10 flex items-center">
                    Try RebuildCV for Free
                    <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-purple-700 to-cyan-600"
                    initial={{ x: "100%" }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  />
                </Link>
              )}
            </motion.div>
            
            <p className="mt-4 text-gray-400">
              No credit card required. One free resume optimization.
            </p>
          </motion.div>
        </div>
      </section>
      
      <Howitwork />
      <Pricing handleonchange={handleOnChange} />
      <Testimonials />
      <Footer />
      
      {/* Modal component - moved outside for cleaner code */}
      {isModalOpen && (
        <AnimatePresence>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm" 
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: "spring", bounce: 0.4 }}
              className="bg-gray-900 rounded-xl border border-gray-800 p-8 w-full max-w-md relative" 
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                onClick={() => setIsModalOpen(false)}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              {/* Modal content with gradient border animation */}
              <div className="relative rounded-xl p-[1px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-500"></div>
                <div className="absolute inset-[1px] bg-gray-900 rounded-lg"></div>
                <div className="relative z-10 p-5">
                  <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-400">Start Your Free Trial</h2>
                  <p className="text-white mb-6">Create one fully optimized resume for free, no credit card required.</p>
                  
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                      <input 
                        type="email" 
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                      <input 
                        type="password" 
                        className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition-all"
                        placeholder="Create a password"
                      />
                    </div>
                    <div className="flex items-center">
                      <input 
                        type="checkbox" 
                        id="terms" 
                        className="h-4 w-4 bg-gray-800 border-gray-700 rounded text-purple-500 focus:ring-purple-500"
                      />
                      <label htmlFor="terms" className="ml-2 text-sm text-gray-300">
                        I agree to the <Link to="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">Terms & Conditions</Link> and <Link to="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">Privacy Policy</Link>
                      </label>
                    </div>
                    <motion.button 
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition relative group overflow-hidden"
                    >
                      <span className="relative z-10">Create Free Account</span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-purple-600"
                        initial={{ x: "100%" }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      />
                    </motion.button>
                  </form>
                  
                  <div className="mt-6 text-center text-sm text-gray-400">
                    Already have an account? <Link to="/login" className="text-purple-400 hover:text-purple-300 transition-colors">Sign in</Link>
                  </div>
                </div>
              </div>
              
              {/* Trust badges */}
              <div className="mt-6 text-center">
                <p className="text-xs text-gray-500 mb-2">Trusted by thousands of professionals</p>
                <div className="flex justify-center space-x-4">
                  <div className="bg-gray-800 rounded-full p-2">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 16V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 8H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="bg-gray-800 rounded-full p-2">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M16.2399 7.76001L14.1199 14.12L7.75991 16.24L9.87991 9.88001L16.2399 7.76001Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div className="bg-gray-800 rounded-full p-2">
                    <svg className="w-5 h-5 text-gray-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      )}
      
      {/* Floating scroll-to-top button */}
      <motion.button
        className="fixed bottom-6 right-6 z-40 w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center shadow-lg shadow-purple-900/20"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.2 ? 1 : 0,
          scale: scrollYProgress.get() > 0.2 ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M18 15L12 9L6 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.button>
    </div>
  );
}
