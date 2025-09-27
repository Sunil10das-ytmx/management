import React, { useState, useEffect } from 'react';
import { 
  FaPlus, FaFileExport, FaCamera, FaMicrophone, FaSync, 
  FaSearch, FaFilter, FaDownload, FaTrash, FaEdit, 
  FaExclamationTriangle, FaClipboardList, FaTint
} from 'react-icons/fa';
import { TbVaccine } from 'react-icons/tb';
import { GiCow } from 'react-icons/gi';
import { MdSensors, MdPerson, MdGroups } from 'react-icons/md';

const FarmData = () => {
    const [activeTab, setActiveTab] = useState('quick-snapshot');
    const [showAddLogModal, setShowAddLogModal] = useState(false);
    const [showExportModal, setShowExportModal] = useState(false);
    const [lastSync, setLastSync] = useState(new Date());
    const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data - replace with actual API calls
  const [farmData, setFarmData] = useState({
    herdCount: 124,
    lastMortality: { date: '2025-09-20', count: 1, reason: 'Natural causes' },
    lastVaccine: { date: '2025-09-15', type: 'Foot and Mouth Disease', nextDue: '2025-12-15' },
    dailyLogs: [],
    animals: [],
    sensorData: { temperature: 24.5, humidity: 65, lastUpdated: new Date() },
    visitors: []
  });

  // Tabs configuration
  const tabs = [
    { id: 'quick-snapshot', label: 'Quick Snapshot', icon: <FaClipboardList /> },
    { id: 'daily-logs', label: 'Daily Logs', icon: <FaClipboardList /> },
    { id: 'media', label: 'Media Gallery', icon: <FaCamera /> },
    { id: 'movement', label: 'Movement Logs', icon: <MdGroups /> },
    { id: 'animals', label: 'Animal Records', icon: <GiCow /> },
    { id: 'sensors', label: 'Sensor Data', icon: <MdSensors /> },
    { id: 'incidents', label: 'Incident Reports', icon: <FaExclamationTriangle /> },
  ];

  // Format date to readable string
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Quick Snapshot Tab
  const QuickSnapshot = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-gray-700">Herd Overview</h3>
        <div className="mt-2 text-3xl font-bold text-green-600">{farmData.herdCount}</div>
        <p className="text-sm text-gray-500">Total Animals</p>
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-gray-700">Last Mortality</h3>
        {farmData.lastMortality ? (
          <>
            <div className="mt-2 text-lg font-semibold">{farmData.lastMortality.count} animal</div>
            <p className="text-sm text-gray-500">{formatDate(farmData.lastMortality.date)}</p>
            <p className="text-sm">Reason: {farmData.lastMortality.reason}</p>
          </>
        ) : (
          <p className="mt-2 text-gray-500">No recent mortality</p>
        )}
      </div>
      
      <div className="bg-white p-4 rounded-lg shadow">
        <h3 className="font-semibold text-gray-700">Vaccination</h3>
        {farmData.lastVaccine ? (
          <>
            <div className="mt-2 text-lg font-semibold">{farmData.lastVaccine.type}</div>
            <p className="text-sm">Last: {formatDate(farmData.lastVaccine.date)}</p>
            <p className="text-sm">Next due: {formatDate(farmData.lastVaccine.nextDue)}</p>
          </>
        ) : (
          <p className="mt-2 text-gray-500">No vaccination records</p>
        )}
      </div>
    </div>
  );

  // Daily Logs Tab
  const DailyLogs = () => (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Daily Logs</h2>
        <button 
          onClick={() => setShowAddLogModal(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Log
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">Date</th>
              <th className="py-2 px-4 text-left">Feed (kg)</th>
              <th className="py-2 px-4 text-left">Water (L)</th>
              <th className="py-2 px-4 text-left">Mortality</th>
              <th className="py-2 px-4 text-left">Medications</th>
              <th className="py-2 px-4 text-left">Notes</th>
            </tr>
          </thead>
          <tbody>
            {farmData.dailyLogs.length > 0 ? (
              farmData.dailyLogs.map((log, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2 px-4">{formatDate(log.date)}</td>
                  <td className="py-2 px-4">{log.feed || '-'}</td>
                  <td className="py-2 px-4">{log.water || '-'}</td>
                  <td className="py-2 px-4">{log.mortality || '-'}</td>
                  <td className="py-2 px-4">{log.medications || '-'}</td>
                  <td className="py-2 px-4">
                    <button className="text-blue-600 hover:underline">View</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No logs found. Add your first log to get started.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  // Add Log Modal
  const AddLogModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add Daily Log</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
            <input 
              type="datetime-local" 
              className="w-full p-2 border rounded-md"
              defaultValue={new Date().toISOString().slice(0, 16)}
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Feed (kg)</label>
              <input type="number" className="w-full p-2 border rounded-md" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Water (L)</label>
              <input type="number" className="w-full p-2 border rounded-md" />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mortality</label>
            <input type="text" className="w-full p-2 border rounded-md" placeholder="Count and reason" />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Medications</label>
            <textarea className="w-full p-2 border rounded-md" rows="2" placeholder="Medications administered"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea className="w-full p-2 border rounded-md" rows="2" placeholder="Additional notes"></textarea>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Attachments</label>
            <div className="flex items-center gap-2">
              <button className="p-2 border rounded-md hover:bg-gray-50">
                <FaCamera className="text-gray-600" />
              </button>
              <button className="p-2 border rounded-md hover:bg-gray-50">
                <FaMicrophone className="text-gray-600" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end gap-3">
          <button 
            onClick={() => setShowAddLogModal(false)}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Cancel
          </button>
          <button 
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            onClick={() => {
              // Handle save
              setShowAddLogModal(false);
            }}
          >
            Save Log
          </button>
        </div>
      </div>
    </div>
  );

  // Render active tab content
  const renderTabContent = () => {
    switch(activeTab) {
      case 'quick-snapshot':
        return <QuickSnapshot />;
      case 'daily-logs':
        return <DailyLogs />;
      // Add other tab contents here
      default:
        return <div className="p-4">Content for {activeTab} will be displayed here.</div>;
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">My Farm Data</h1>
        <div className="flex items-center gap-2">
          <div className="text-sm text-gray-500">
            Last synced: {formatDate(lastSync)}
          </div>
          <button 
            onClick={() => setLastSync(new Date())}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full"
            title="Refresh data"
          >
            <FaSync />
          </button>
          <button 
            onClick={() => setShowExportModal(true)}
            className="p-2 text-gray-600 hover:text-green-600 hover:bg-gray-100 rounded-full"
            title="Export data"
          >
            <FaFileExport />
          </button>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
                activeTab === tab.id
                  ? 'border-green-500 text-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      
      {/* Tab Content */}
      {renderTabContent()}
      
      {/* Modals */}
      {showAddLogModal && <AddLogModal />}
      
      {showExportModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Export Data</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Select Format</label>
                <select className="w-full p-2 border rounded-md">
                  <option>CSV</option>
                  <option>PDF</option>
                  <option>Excel</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <input type="date" className="p-2 border rounded-md" />
                  <input type="date" className="p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded text-green-600" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Include all data</span>
                </label>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button 
                onClick={() => setShowExportModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center gap-2"
                onClick={() => {
                  // Handle export
                  setShowExportModal(false);
                }}
              >
                <FaDownload /> Export
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmData;
