import React, { useState, useEffect } from 'react';
import { ArrowRight, Shield, CloudRain, AlertTriangle, MessageCircle, Leaf, Droplet, Sun } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import video1 from '../assets/video1.mp4';
import video2 from '../assets/video2.mp4';

export default function HeroSection() {
  const [showHenVideo, setShowHenVideo] = useState(true);
  const [showPigVideo, setShowPigVideo] = useState(false);
  // const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  useEffect(() => {
    const elements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    elements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const features = [
    {
      title: 'Smart Farm Analytics',
      description: 'Real-time insights and analytics for better farm management decisions',
      icon: Leaf,
      color: 'from-emerald-500 to-green-600',
      hoverColor: 'hover:from-emerald-600 hover:to-green-700'
    },
    {
      title: 'Disease Prediction & Alerts',
      description: 'AI-powered early detection of plant diseases and instant alerts',
      icon: AlertTriangle,
      color: 'from-purple-400 to-indigo-500',
      hoverColor: 'hover:from-purple-500 hover:to-indigo-600'
    },
    {
      title: 'AI-powered Chatbot',
      description: '24/7 virtual assistant for all your farming queries and support',
      icon: MessageCircle,
      color: 'from-blue-400 to-cyan-500',
      hoverColor: 'hover:from-blue-500 hover:to-cyan-600'
    },
    {
      title: 'Weather Intelligence',
      description: 'Hyper-local weather forecasts and climate adaptation tools',
      icon: Sun,
      color: 'from-yellow-400 to-amber-500',
      hoverColor: 'hover:from-yellow-500 hover:to-amber-600'
    }
  ];

  return (
    <motion.div
      className="min-h-screen w-full relative overflow-hidden bg-gradient-to-br from-white to-emerald-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Animated Background Elements */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full overflow-hidden z-0"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 4, repeat: Infinity, repeatType: 'reverse' }}
      >
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-1/3 right-0 w-96 h-96 bg-teal-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-green-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </motion.div>
      {/* Video Background with Overlay */}
      <AnimatePresence mode="wait">
        {showHenVideo && (
          <motion.video
            key="hen-video"
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            playsInline
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
            onEnded={() => {
              setShowHenVideo(false);
              setShowPigVideo(true);
            }}
          >
            <source src={video1} type="video/mp4" />
          </motion.video>
        )}

        {showPigVideo && (
          <motion.video
            key="pig-video"
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            loop
            playsInline
            muted
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          >
            <source src={video2} type="video/mp4" />
          </motion.video>
        )}
      </AnimatePresence>

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/20 to-white/80 z-0"></div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-transparent to-white/80 z-0"></div>

      {/* Hero Content */}
      <div className="relative z-10 pt-24 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <motion.div
              className="mb-12 max-w-6xl mx-auto text-center"
              variants={itemVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                className="inline-block px-6 py-2 mb-6 rounded-full bg-emerald-100/80 backdrop-blur-sm border border-emerald-200 shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                <span className="bg-gradient-to-r from-emerald-600 to-teal-500 bg-clip-text text-transparent font-semibold text-sm tracking-wide">
                  THE FUTURE OF PRECISION AGRICULTURE
                </span>
              </motion.div>

              <motion.h1
                className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-6 leading-tight"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      delay: 0.3,
                      staggerChildren: 0.1,
                      when: "beforeChildren"
                    }
                  }
                }}
              >
                <motion.span
                  className="block bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent drop-shadow-md"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  Grow Smarter,
                </motion.span>
                <motion.span
                  className="block bg-gradient-to-r from-green-700 via-emerald-600 to-cyan-600 bg-clip-text text-transparent drop-shadow-md"
                  variants={{
                    hidden: { opacity: 0, y: 30 },
                    visible: { opacity: 1, y: 0 }
                  }}
                >
                  Harvest Better
                </motion.span>
              </motion.h1>

              <motion.p
                className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium px-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
              >
                Transform your farm with AI-powered insights. Monitor crops, optimize resources, and maximize yields with our all-in-one digital farming platform.
              </motion.p>

              <motion.div
                className="mt-10 flex flex-col sm:flex-row justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
              >

                <motion.button
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-4 bg-white/90 backdrop-blur-sm text-emerald-700 font-semibold rounded-xl border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-300 flex items-center gap-2 group shadow-sm"
                  onClick={() => window.scrollTo({ top: document.getElementById('features').offsetTop - 100, behavior: 'smooth' })}
                >
                  <span>Explore Features</span>
                  <motion.span
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  </motion.span>
                </motion.button>
              </motion.div>

              <motion.div
                className="mt-16 flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                {['Precision Farming', 'Smart Irrigation', 'Crop Monitoring', 'Yield Prediction'].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-2 bg-white/50 backdrop-blur-sm px-4 py-2 rounded-full border border-emerald-100 shadow-sm"
                    whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                    <span className="text-sm font-medium text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Features Grid with Enhanced Design */}
            <div id="features" className="py-24 bg-gradient-to-b from-white to-emerald-50/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
              <div className="max-w-7xl mx-auto">
                <motion.div
                  className="text-center mb-16"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <span className="inline-block px-4 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-full mb-4">
                    Our Features
                  </span>
                  <h2 className="text-4xl font-bold text-gray-900 mb-4">
                    Everything You Need for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Smart Farming</span>
                  </h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                    Harness the power of technology to optimize your farm's potential with our comprehensive suite of tools.
                  </p>
                </motion.div>

                <motion.div
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: {
                        staggerChildren: 0.1,
                        delayChildren: 0.2
                      }
                    }
                  }}
                >
                  {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <motion.div
                        key={index}
                        className="group relative bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden"
                        variants={cardVariants}
                        whileHover={{ y: -10 }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-br from-white to-gray-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="relative z-10">
                          <motion.div
                            className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-gradient-to-r ${feature.color} text-white mb-6 mx-auto group-hover:scale-110 transition-transform duration-300 shadow-md`}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                          >
                            <Icon className="w-8 h-8" />
                          </motion.div>
                          <h3 className="text-xl font-bold text-gray-900 mb-3 text-center">{feature.title}</h3>
                          <p className="text-gray-600 leading-relaxed text-center">{feature.description}</p>
                          <motion.div
                            className="mt-6 text-center"
                            initial={{ opacity: 0, y: 10 }}
                            whileHover={{ opacity: 1, y: 0 }}
                          >
                            <a
                              href="#"
                              className="inline-flex items-center text-sm font-medium text-emerald-600 hover:text-emerald-700 group-hover:underline"
                            >
                              Learn more
                              <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                            </a>
                          </motion.div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -right-6 -bottom-6 w-24 h-24 rounded-full bg-emerald-100/50 group-hover:bg-emerald-100/80 transition-colors duration-300"></div>
                        <div className="absolute -left-3 -top-3 w-12 h-12 rounded-full bg-emerald-50 group-hover:bg-emerald-100/50 transition-colors duration-300"></div>
                      </motion.div>
                    );
                  })}
                </motion.div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="relative py-24 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-white"></div>
                <div className="absolute top-0 left-0 w-full h-full opacity-10" style={{
                  backgroundImage: 'radial-gradient(#10b981 1px, transparent 1px)',
                  backgroundSize: '40px 40px',
                }}></div>
                <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-emerald-100/50 blur-3xl"></div>
                <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-teal-100/50 blur-3xl"></div>
              </div>

              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <motion.h2
                    className="text-4xl font-bold text-gray-900 mb-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Ready to Transform Your Farm?
                  </motion.h2>
                  <motion.p
                    className="text-xl text-gray-600 max-w-3xl mx-auto mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Join thousands of farmers who are already increasing their yields and reducing costs with our platform.
                  </motion.p>

                  <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <motion.button
                      whileHover={{ scale: 1.03, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:shadow-emerald-200 transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden"
                    >
                      <span className="relative z-10">Start Free Trial</span>
                      <motion.span
                        className="relative z-10"
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </motion.span>
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-teal-600 to-emerald-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ x: '-100%' }}
                        whileHover={{ x: 0 }}
                        transition={{ duration: 0.4, ease: 'easeOut' }}
                      />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.03, y: -2, backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
                      whileTap={{ scale: 0.98 }}
                      className="px-8 py-4 bg-white/90 backdrop-blur-sm text-emerald-700 font-semibold rounded-xl border-2 border-emerald-100 hover:border-emerald-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      <span>Login as Farmer</span>
                      <motion.span
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />

                      </motion.span>
                    </motion.button>
                  </motion.div>

                  <motion.p
                    className="mt-6 text-sm text-gray-500"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                  >
                    No credit card required • 14-day free trial • Cancel anytime
                  </motion.p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}