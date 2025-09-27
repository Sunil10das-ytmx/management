import React, { useState, useContext } from 'react';
import { User, Settings, Activity } from 'lucide-react';
import TabButton from './TabButton';
import FarmerProfile from './FarmerProfile';

const FarmerProfileWithTabs = ({ initialTab = 'profile' }) => {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [preferences, setPreferences] = useState({
    language: 'en',
    voice: 'male',
    darkMode: false,
    notifications: true,
    timeZone: 'ist'
  });

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return <FarmerProfile preferences={preferences} onPreferencesChange={setPreferences} />;
      case 'settings':
        return (
          <div className="space-y-6">
            {/* Notification Preferences Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                {/* Email Notifications */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Email Notifications</h3>
                    <p className="text-sm text-gray-500">Receive important updates via email</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                {/* SMS Alerts */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">SMS Alerts</h3>
                    <p className="text-sm text-gray-500">Get instant alerts on your phone</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                {/* Weekly Reports */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Weekly Reports</h3>
                    <p className="text-sm text-gray-500">Get a summary of your farm's performance</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                {/* Training Reminders */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Training Reminders</h3>
                    <p className="text-sm text-gray-500">Get reminders for incomplete training modules</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>

                {/* Compliance Alerts */}
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-800">Compliance Alerts</h3>
                    <p className="text-sm text-gray-500">Important updates about compliance requirements</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-green-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
                  </label>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
                  Save Preferences
                </button>
              </div>
            </div>

            {/* Account Settings Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-6">Account Settings</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select 
                    onChange={(e) => {
                      changeLanguage(e.target.value);
                      setPreferences(prev => ({
                        ...prev,
                        language: e.target.value
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    {Object.entries({
                      en: 'English',
                      hi: 'हिंदी (Hindi)',
                      te: 'తెలుగు (Telugu)',
                      ta: 'தமிழ் (Tamil)',
                      bn: 'বাংলা (Bengali)'
                    }).map(([code, name]) => (
                      <option key={code} value={code}>{name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Gender
                  </label>
                  <select 
                    value={preferences.voice}
                    onChange={(e) => {
                      setPreferences(prev => ({
                        ...prev,
                        voice: e.target.value
                      }));
                    }} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time Zone
                  </label>
                  <select 
                    value={preferences.timeZone}
                    onChange={(e) => {
                      setPreferences(prev => ({
                        ...prev,
                        timeZone: e.target.value
                      }));
                    }}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="ist">IST</option>
                    <option value="gmt">GMT</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );
      case 'activity':
        return (
          <div className="space-y-6">
            {/* Risk Assessment Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-blue-500 rounded-full mr-2"></span>
                Risk Assessment
              </h3>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600">Last Assessment: <span className="text-green-600 font-medium">Completed</span></p>
                  <p className="text-sm text-gray-500">Next assessment due in 30 days</p>
                </div>
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100">
                  View Report
                </button>
              </div>
            </div>

            {/* Training Progress Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-purple-500 rounded-full mr-2"></span>
                Training Progress
              </h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Biosecurity Basics</span>
                    <span className="font-medium">100%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Disease Prevention</span>
                    <span className="font-medium">75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Compliance Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-green-500 rounded-full mr-2"></span>
                Compliance
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-md">
                  <div>
                    <p className="font-medium">Biosecurity Standards</p>
                    <p className="text-sm text-gray-500">Last updated: 2 days ago</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-green-100 text-green-800 rounded-full">Compliant</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-md">
                  <div>
                    <p className="font-medium">Record Keeping</p>
                    <p className="text-sm text-gray-500">Update required in 5 days</p>
                  </div>
                  <span className="px-3 py-1 text-sm bg-yellow-100 text-yellow-800 rounded-full">Pending</span>
                </div>
              </div>
            </div>

            {/* Alerts Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                <span className="w-2 h-6 bg-red-500 rounded-full mr-2"></span>
                Alerts
              </h3>
              <div className="space-y-3">
                <div className="flex items-start p-3 border-l-4 border-red-500 bg-red-50 rounded-r-md">
                  <div className="flex-1">
                    <p className="font-medium">High Risk Alert</p>
                    <p className="text-sm text-gray-600">Unusual activity detected in poultry house #3</p>
                    <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
                  </div>
                  <button className="text-red-600 hover:text-red-800">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity Section */}
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Completed Risk Assessment</p>
                    <p className="text-sm text-gray-500">Today, 10:30 AM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Finished Training Module</p>
                    <p className="text-sm text-gray-500">Yesterday, 3:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium">Updated Compliance Record</p>
                    <p className="text-sm text-gray-500">Sep 23, 2023</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return <FarmerProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-[#fff] p-4 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-green-900">Farmer Profile</h1>
          <p className="text-green-700">Manage your personal and farm information</p>
        </div>

        {/* Tabs */}
        <div className="mb-6 border-b border-gray-200">
          <div className="flex space-x-2">
            <TabButton 
              active={activeTab === 'profile'} 
              onClick={() => setActiveTab('profile')}
              icon={User}
            >
              Profile
            </TabButton>
            <TabButton 
              active={activeTab === 'settings'} 
              onClick={() => setActiveTab('settings')}
              icon={Settings}
            >
              Settings
            </TabButton>
            <TabButton 
              active={activeTab === 'activity'} 
              onClick={() => setActiveTab('activity')}
              icon={Activity}
            >
              Activity
            </TabButton>
          </div>
        </div>

        {renderTabContent()}
      </div>
    </div>
  );
};

export default FarmerProfileWithTabs;
