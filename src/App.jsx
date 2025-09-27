import React from 'react';
import { BrowserRouter as Router, Routes, Route, Outlet, Link } from 'react-router-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import MainDashboard from './Components/Maindashboard';
import Chatbot from './Components/Chatbot';
import RiskAssessmentPage from './pages/RiskAssessmentPage';
import AnimalProfile from './pages/AnimalProfile';
import FarmerEducationVideos from './pages/TrainingPage';

// Create placeholder components for the new routes
const FeaturesPage = () => <div className="container mx-auto p-6">Features Page - Coming Soon</div>;
const WeatherPage = () => <div className="container mx-auto p-6">Weather Page - Coming Soon</div>;
const DiseasesPage = () => <div className="container mx-auto p-6">Diseases Page - Coming Soon</div>;

// Layout component for routes with header and footer
const LayoutWithHeader = () => (
  <>
    <Header />
    <main className="pt-16 min-h-[calc(100vh-4rem)]">
      <Outlet />
    </main>
    <Footer />
  </>
);

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
        <Routes>
          {/* Dashboard route */}
          <Route path="/dashboard" element={<MainDashboard />} />
          <Route path="/dashboard/:view" element={<MainDashboard />} />
          <Route path="/dashboard/:view/:tab" element={<MainDashboard />} />
          
          {/* All other routes with header */}
          <Route element={<LayoutWithHeader />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="features" element={<FeaturesPage />} />
            <Route path="chatbot" element={<Chatbot />} />
            <Route path="riskassessment" element={<RiskAssessmentPage />} />
            <Route path="training" element={<FarmerEducationVideos />} />
            <Route path="weather" element={<WeatherPage />} />
            <Route path="diseases" element={<DiseasesPage />} />
            <Route path="animal-profile" element={<AnimalProfile />} />
            
            {/* 404 route - catches all other paths */}
            <Route path="*" element={
              <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
                <Header />
                <main className="pt-16 min-h-[calc(100vh-4rem)] flex items-center justify-center">
                  <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                    <p className="text-gray-600 mb-6">The page you're looking for doesn't exist or has been moved.</p>
                    <Link 
                      to="/" 
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                      Go back home
                    </Link>
                  </div>
                </main>
                <Footer />
              </div>
            } />
          </Route>
        </Routes>
    </div>
  );
}

export default App;
