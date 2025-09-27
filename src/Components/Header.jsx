import React, { useState, useEffect } from 'react';
import { Menu, X, Activity, Home, Info, Shield, MessageCircle, User, ChevronDown, PawPrint, BookOpen, Globe } from 'lucide-react';
import { Link, NavLink } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, UserButton, SignOutButton } from '@clerk/clerk-react';


export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const menuItems = [
    { name: 'Home', path: '/', icon: Home },
    { name: 'About', path: '/about', icon: Info },
    { name: 'Dashboard', path: '/dashboard', icon: Activity },
    { name: 'Chatbot', path: '/chatbot', icon: MessageCircle },
    { name: 'Risk Assessment', path: '/riskassessment', icon: Shield },
    { name: 'Training', path: '/training', icon: BookOpen },
    { name: 'Animal Profile', path: '/animal-profile', icon: User },
  ];

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isLanguageOpen && !event.target.closest('.language-selector')) {
        setIsLanguageOpen(false);
      }
      if (isProfileOpen && !event.target.closest('.profile-menu')) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
    setIsLanguageOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="fixed w-full z-50 bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left: Logo and Title */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-600 text-white">
                <PawPrint className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold text-gray-800 hidden sm:inline">Farm Biosecurity Portal</span>
            </Link>
          </div>

          {/* Center: Navigation */}
          <nav className="hidden md:flex items-center justify-center flex-1 px-4">
            <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
              {menuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200 flex items-center space-x-1.5 ${isActive
                      ? 'bg-white text-green-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }`
                  }
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </NavLink>
              ))}
            </div>
            </nav>
          {/* Right side: User Profile and Mobile Menu */}
          <div className="flex items-center space-x-4">
            {/* Desktop User Button */}
            <div className="hidden md:flex items-center">
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonBox: "flex items-center space-x-2",
                      userButtonTrigger: "hover:bg-green-50 rounded-lg px-3 py-2 transition-colors duration-200"
                    },
                  }}
                />
              </SignedIn>
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-50 rounded-lg transition-colors duration-200">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                type="button"
                className="relative flex flex-col items-center justify-center w-12 h-12 rounded-full bg-green-50 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-all duration-200 group"
                aria-expanded={isMenuOpen}
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                <span className={`block absolute h-0.5 w-6 bg-green-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-green-600 rounded-full transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
                <span className={`block absolute h-0.5 w-6 bg-green-600 rounded-full transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}></span>
                
                {/* Animated circles for extra visual feedback */}
                <span className={`absolute inset-0 rounded-full border-2 border-green-600 transition-all duration-300 ${isMenuOpen ? 'opacity-0 scale-110' : 'opacity-0 group-hover:opacity-30'}`}></span>
                <span className={`absolute inset-0 rounded-full bg-green-600/10 transition-all duration-500 ${isMenuOpen ? 'opacity-0 scale-150' : 'opacity-0 group-hover:opacity-100'}`}></span>
              </button>
            </div>

            {/* Enhanced Mobile Navigation */}
            <div
              className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                isMenuOpen
                  ? "opacity-100 visible"
                  : "opacity-0 invisible delay-300"
              }`}
            >
              {/* Animated Backdrop */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-green-900/80 to-green-800/80 backdrop-blur-sm transition-opacity duration-500 ${
                  isMenuOpen ? "opacity-100" : "opacity-0"
                }`}
                onClick={toggleMenu}
              />

              {/* Mobile Menu Panel with Slide-in Animation */}
              <div
                className={`absolute right-0 top-0 h-full w-4/5 max-w-sm bg-green-400 shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] ${
                  isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
              >
                {/* Header with Gradient Background */}
                <div className="bg-gradient-to-r from-green-600 to-green-500 p-5 shadow-md">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-lg transform transition-transform hover:scale-110">
                        <PawPrint className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h2 className="text-xl font-bold text-white">Menu</h2>
                        <p className="text-xs text-green-100/90">Farm Biosecurity</p>
                      </div>
                    </div>
                    <button
                      onClick={toggleMenu}
                      className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white/90 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-green-600 transform hover:rotate-90 hover:scale-110"
                      aria-label="Close menu"
                    >
                      <X className="h-6 w-6" />
                    </button>
                  </div>
                </div>

                {/* Navigation Links with Staggered Animation */}
                <nav className="flex-1 overflow-y-auto py-6 px-4  bg-gradient-to-t from-green-50 to-white space-y-1">
                  {menuItems.map((item, index) => (
                    <NavLink
                      key={item.path}
                      to={item.path}
                      onClick={() => setIsMenuOpen(false)}
                      style={{
                        animationDelay: isMenuOpen ? `${index * 50}ms` : "0ms",
                        opacity: isMenuOpen ? 1 : 0,
                        transform: isMenuOpen ? "translateX(0)" : "translateX(20px)",
                        transition: `opacity 300ms ease-out ${index * 50}ms, transform 300ms ease-out ${
                          index * 50
                        }ms`,
                      }}
                      className={({ isActive }) =>
                        `flex items-center px-4 py-3.5 text-base font-medium rounded-xl transition-all duration-200 group ${
                          isActive
                            ? "bg-gradient-to-r from-green-50 to-green-100 text-green-700 shadow-sm border-l-4 border-green-600"
                            : "text-gray-700 hover:bg-green-50/80 hover:text-green-600 hover:translate-x-1"
                        }`
                      }
                    >
                      <div
                        className={`mr-3 h-10 w-10 rounded-lg flex items-center justify-center transition-all duration-200 ${
                          menuItems.find((i) => i.path === item.path)?.isActive
                            ? "bg-green-600 text-white shadow-md"
                            : "bg-green-50 text-green-600 group-hover:bg-green-100 group-hover:text-green-700"
                        }`}
                      >
                        <item.icon className="h-5 w-5" />
                      </div>
                      <span className="flex-1">{item.name}</span>
                      <ChevronDown className="h-4 w-4 opacity-0 group-hover:opacity-100 -rotate-90 transition-all duration-200" />
                    </NavLink>
                  ))}
                </nav>

                {/* Enhanced Account Section */}
                <div className="border-t border-green-100 p-5 bg-gradient-to-t from-green-50 to-white">
                  <div className="flex items-center space-x-3 p-4 rounded-xl bg-white/90 backdrop-blur-sm shadow-sm border border-green-100 mb-4 transform transition-transform hover:scale-[1.01]">
                    <div className="h-12 w-12 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center shadow-md">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <SignedIn>
                        <p className="text-sm font-semibold text-gray-900 truncate">
                          Your Account
                        </p>
                        <p className="text-xs text-green-600/80">Manage profile</p>
                      </SignedIn>
                      <SignedOut>
                        <p className="text-sm font-semibold text-gray-900">Welcome</p>
                        <p className="text-xs text-green-600/80">Sign in to continue</p>
                      </SignedOut>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <SignedIn>
                      <div className="grid grid-cols-2 gap-3">
                        <UserButton
                          afterSignOutUrl="/"
                          showName={true}
                          appearance={{
                            elements: {
                              userButtonBox: "flex items-center w-full",
                              userButtonTrigger:
                                "w-full px-4 py-2.5 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 rounded-lg border border-gray-200 transition-all duration-200 hover:shadow-sm",
                              userButtonOuterIdentifier:
                                "text-sm font-medium text-gray-700",
                            },
                          }}
                        />
                        <SignOutButton>
                          <button className="w-full flex items-center justify-center px-4 py-2.5 text-sm font-medium text-red-600 bg-white hover:bg-red-50 rounded-lg border border-red-100 transition-all duration-200 hover:shadow-sm">
                            Sign Out
                          </button>
                        </SignOutButton>
                      </div>
                    </SignedIn>
                    <SignedOut>
                      <SignInButton mode="modal">
                        <button className="w-full flex items-center justify-center px-4 py-3 text-sm font-semibold text-white bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                          Sign In to Continue
                        </button>
                      </SignInButton>
                    </SignedOut>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}