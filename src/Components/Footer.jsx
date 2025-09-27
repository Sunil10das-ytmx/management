import React from 'react';
import { Link } from 'react-router-dom';
import { PawPrint, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Risk Assessment', path: '/riskassessment' },
    { name: 'Training', path: '/training' },
    { name: 'Contact', path: '/contact' },
  ];

  const companyInfo = {
    name: 'Farm Biosecurity Portal',
    description: 'Empowering farmers with advanced biosecurity tools and real-time monitoring to protect livestock health and ensure sustainable farming practices.',
    address: 'Farm Biosecurity Center, Agricultural District',
    phone: '+1 (555) 123-4567',
    email: 'support@farmbiosecurity.com',
    socialMedia: {
      followUs: 'Follow Us',
      stayConnected: 'Stay connected for the latest updates and farming tips.'
    },
    copyright: `© ${currentYear} Farm Biosecurity Portal. All rights reserved.`
  };

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-green-600 text-white">
                <PawPrint className="h-6 w-6" />
              </div>
              <span className="text-xl font-bold">{companyInfo.name}</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              {companyInfo.description}
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-gray-300">
                <MapPin className="h-4 w-4 text-green-400" />
                <span className="text-sm">{companyInfo.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Phone className="h-4 w-4 text-green-400" />
                <span className="text-sm">{companyInfo.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-300">
                <Mail className="h-4 w-4 text-green-400" />
                <span className="text-sm">{companyInfo.email}</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{companyInfo.quickLinks}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">{companyInfo.socialMedia.followUs}</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-300 hover:text-green-400 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-400">
                {companyInfo.socialMedia.stayConnected}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              {companyInfo.copyright}
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Terms of Service
              </Link>
              <Link
                to="/support"
                className="text-sm text-gray-400 hover:text-green-400 transition-colors duration-200"
              >
                Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
