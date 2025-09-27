import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Home } from 'lucide-react';
import Sidebar from './Sidebar';
import FarmerProfile from './FarmerProfileWithTabs';
import FarmData from './FarmData';
import BiosecurityGuidelines from './BiosecurityGuidelines';
import DiseaseAlert from './DiseaseAlert';
import WeatherSoilInfo from './WeatherSoilInfo';
import Reports from './Reports';
import Chatbot from './Chatbot';
import { motion, AnimatePresence } from 'framer-motion';

const Maindashboard = () => {
  const navigate = useNavigate();
  const { view: urlView, tab: urlTab } = useParams();
  const [currentView, setCurrentView] = useState(urlView || 'profile');
  const [activeProfileTab, setActiveProfileTab] = useState(urlTab || 'profile');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  // Update active tab when URL parameters change
  useEffect(() => {
    if (urlView) {
      setCurrentView(urlView);
    }
    if (urlTab) {
      setActiveProfileTab(urlTab);
    }
  }, [urlView, urlTab]);

  const handleNavigate = (view, tab = null) => {
    setIsLoading(true);
    setTimeout(() => {
      setCurrentView(view);
      if (tab) {
        setActiveProfileTab(tab);
      }
      setIsLoading(false);
    }, 300);
  };

  const renderView = () => {
    const views = {
      'profile': <FarmerProfile initialTab={activeProfileTab} />,
      'farm-data': <FarmData />,
      'biosecurity': <BiosecurityGuidelines />,
      'disease-alerts': <DiseaseAlert />,
      'weather-soil': <WeatherSoilInfo />,
      'reports': <Reports />,
      'chatbot': <Chatbot />
    };

    return views[currentView] || (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-20"
      >
        <div className="text-6xl text-green-600 mb-4">🚜</div>
        <h2 className="text-2xl font-bold text-green-800 mb-2">Coming Soon!</h2>
        <p className="text-green-600">We're working on something amazing for you.</p>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ 
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="text-green-600"
        >
          <div className="w-16 h-16 border-4 border-green-300 border-t-green-600 rounded-full"></div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white relative">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        {[...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-green-100 opacity-20"
            style={{
              width: Math.random() * 200 + 50,
              height: Math.random() * 200 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * 100 - 50, 0],
              x: [0, Math.random() * 100 - 50, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Back to Home Button - Top Right */}
      <motion.div 
        className="fixed top-4 right-4 z-50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <button 
          onClick={() => navigate('/')}
          className="flex items-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
        >
          <Home className="w-5 h-5 mr-2" />
          GO TO HOME
        </button>
      </motion.div>

      <div className="flex flex-col md:flex-row min-h-screen">
        <Sidebar
          currentView={currentView}
          onNavigate={handleNavigate}
          mobileMenuOpen={mobileMenuOpen}
          setMobileMenuOpen={setMobileMenuOpen}
        />

        {/* Mobile menu button */}
        <button
          data-mobile-menu-toggle
          onClick={() => setMobileMenuOpen(prev => !prev)}
          className="md:hidden fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-200"
          aria-label="Toggle menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        <main className="flex-1 md:ml-[280px] px-4 md:px-8 py-8 overflow-auto mt-16 md:mt-0 transition-all duration-300">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentView}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-green-100 min-h-[80vh]"
            >
              {renderView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default Maindashboard;
