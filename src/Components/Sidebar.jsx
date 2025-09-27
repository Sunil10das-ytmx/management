import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaBars,
  FaTimes,
  FaUser,
  FaDatabase,
  FaShieldAlt,
  FaExclamationTriangle,
  FaCloudSun,
  FaComments,
  FaFileAlt,
} from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ onNavigate, mobileMenuOpen, setMobileMenuOpen, currentView }) => {
  const sidebarRef = React.useRef(null);
  const [extended, setExtended] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const location = useLocation();
  const navigate = useNavigate();

  const items = [
    { 
      id: 'profile',
      icon: <FaUser className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "Profile", 
      action: () => onNavigate('profile') 
    },
    { 
      id: 'farm-data',
      icon: <FaDatabase className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "My Farm Data", 
      action: () => onNavigate('farm-data') 
    },
    { 
      id: 'biosecurity',
      icon: <FaShieldAlt className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "Biosecurity", 
      action: () => onNavigate('biosecurity') 
    },
    { 
      id: 'disease-alerts',
      icon: <FaExclamationTriangle className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "Disease Alerts", 
      action: () => onNavigate('disease-alerts') 
    },
    { 
      id: 'weather-soil',
      icon: <FaCloudSun className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "Weather & Soil", 
      action: () => onNavigate('weather-soil') 
    },
    { 
      id: 'reports',
      icon: <FaFileAlt className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "Reports", 
      action: () => onNavigate('reports') 
    },
    { 
      id: 'chatbot',
      icon: <FaComments className="text-green-600 group-hover:text-white transition-colors" />, 
      label: "Chatbot", 
      action: () => onNavigate('chatbot') 
    },
  ];

  const toggleSidebar = () => {
    setExtended((prev) => !prev);
  };

  const handleMenuItemClick = (action, id) => {
    action();
    setHoveredItem(id);
    if (setMobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  // Handle window resize and mobile detection
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, ensure sidebar is always visible
      if (!mobile) {
        setMobileMenuOpen(true);
      }
    };
    
    // Initial check
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [setMobileMenuOpen]);

  // Handle click outside to close sidebar on mobile
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobile && mobileMenuOpen) {
        // Ignore clicks on the mobile toggle button
        const target = event.target;
        if (target && typeof target.closest === 'function' && target.closest('[data-mobile-menu-toggle]')) {
          return;
        }

        const sidebar = sidebarRef.current;
        if (sidebar && !sidebar.contains(event.target)) {
          setMobileMenuOpen(false);
        }
      }
    };

    if (isMobile) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isMobile, mobileMenuOpen, setMobileMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [location.pathname]);

  return (
    <>

      {/* Sidebar */}
      <motion.aside
        ref={sidebarRef}
        initial={{ x: isMobile ? -280 : 0 }}
        animate={{ 
          x: isMobile ? (mobileMenuOpen ? 0 : -280) : 0,
        }}
        transition={{ type: 'tween', duration: 0.2 }}
        className={`fixed top-0 left-0 h-full z-40 flex flex-col w-[280px] bg-white/95 backdrop-blur-md shadow-lg`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-green-100">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold text-xl">
              DF
            </div>
            <span className="ml-3 text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Digital Farm
            </span>
          </div>
          {/* Close button for mobile */}
          {isMobile && (
            <button 
              onClick={() => setMobileMenuOpen(false)}
              className="text-gray-500 hover:text-gray-700 transition-colors"
            >
              <FaTimes size={20} />
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">
            {items.map((item) => {
              const isActive = currentView === item.id;
              return (
                <motion.div
                  key={item.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative"
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {hoveredItem === item.id && (
                    <motion.div
                      layoutId={`hoverBg-${item.id}`}
                      className="absolute inset-0 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl"
                      initial={false}
                      transition={spring}
                    />
                  )}
                  <button
                    onClick={() => handleMenuItemClick(item.action, item.id)}
                    className={`w-full flex items-center p-3 rounded-xl relative z-10 transition-all duration-200 ${
                      isActive 
                        ? 'text-white bg-gradient-to-r from-green-600 to-emerald-600 shadow-lg' 
                        : 'text-gray-700 hover:text-green-700'
                    }`}
                  >
                    <span className={`flex-shrink-0 ${isActive ? 'text-white' : 'text-green-600'}`}>
                      {React.cloneElement(item.icon, {
                        className: `w-5 h-5 ${isActive ? 'text-white' : 'text-green-600'}`
                      })}
                    </span>
                    <span className="ml-3 font-medium">{item.label}</span>
                    {isActive && (
                      <motion.div
                        layoutId={`activeIndicator-${item.id}`}
                        className="absolute right-3 w-1.5 h-6 bg-white rounded-full"
                        initial={false}
                        transition={spring}
                      />
                    )}
                  </button>
                </motion.div>
              );
            })}
          </div>
        </nav>

        {/* User Profile */}
        <div className="p-4 border-t border-green-100">
          <div className="flex items-center p-3 rounded-xl bg-green-50 hover:bg-green-100 transition-colors cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-semibold">
              U
            </div>
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium text-gray-900 truncate">Farmer Name</p>
              <p className="text-xs text-gray-500 truncate">View Profile</p>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Overlay for mobile */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

const spring = {
  type: "spring",
  stiffness: 500,
  damping: 30
};

export default Sidebar;