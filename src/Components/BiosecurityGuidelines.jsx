import React, { useState } from 'react';
import { 
  FaCheckSquare, 
  FaClipboardCheck, 
  FaMapMarkedAlt, 
  FaCalculator, 
  FaBell, 
  FaPrint, 
  FaFileAlt,
  FaDownload,
  FaUpload,
  FaPlus,
  FaTrash,
  FaEdit
} from 'react-icons/fa';

const BiosecurityGuidelines = () => {
  const [activeTab, setActiveTab] = useState('checklists');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [farmMap, setFarmMap] = useState(null);
  
  // Mock data for checklists
  const checklists = {
    entry: [
      'Wear clean PPE before entry',
      'Disinfect footwear in footbath',
      'Wash hands with sanitizer',
      'Sign visitor log',
      'Follow designated pathways'
    ],
    cleaning: [
      'Remove all organic material',
      'Apply detergent and scrub',
      'Rinse with clean water',
      'Apply disinfectant',
      'Allow proper drying time'
    ],
    transport: [
      'Clean and disinfect vehicles before entry',
      'Use designated parking areas',
      'Keep windows up when near livestock',
      'Disinfect tires and wheel wells',
      'Maintain cleaning log'
    ]
  };

  // Mock data for protocols
  const protocols = [
    {
      id: 1,
      title: 'Footbath Setup',
      steps: [
        'Choose a well-drained location',
        'Fill with recommended disinfectant',
        'Ensure proper concentration',
        'Change solution regularly'
      ],
      image: '/path/to/footbath.jpg'
    },
    // Add more protocols as needed
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // In a real app, you would upload the file to your server here
      setFarmMap(URL.createObjectURL(file));
    }
  };

  const calculatePPE = (numWorkers, days) => {
    return {
      coveralls: numWorkers * days,
      gloves: numWorkers * 2 * days,
      masks: numWorkers * days,
      bootCovers: numWorkers * days,
      disinfectant: Math.ceil(numWorkers * 0.5 * days) // in liters
    };
  };

  const [ppeCalc, setPpeCalc] = useState({
    workers: 5,
    days: 7
  });

  const ppeNeeds = calculatePPE(ppeCalc.workers, ppeCalc.days);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-green-800 mb-6">Biosecurity Guidelines</h1>
      
      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex space-x-8 overflow-x-auto">
          <button
            onClick={() => setActiveTab('checklists')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'checklists' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaClipboardCheck /> Checklists
          </button>
          <button
            onClick={() => setActiveTab('protocols')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'protocols' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCheckSquare /> Protocols
          </button>
          <button
            onClick={() => setActiveTab('zoning')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'zoning' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaMapMarkedAlt /> Farm Zoning
          </button>
          <button
            onClick={() => setActiveTab('ppe-calculator')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'ppe-calculator' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaCalculator /> PPE Calculator
          </button>
          <button
            onClick={() => setActiveTab('compliance')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'compliance' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaBell /> Compliance
          </button>
          <button
            onClick={() => setActiveTab('resources')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'resources' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaPrint /> Printable Resources
          </button>
          <button
            onClick={() => setActiveTab('policies')}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center gap-2 ${
              activeTab === 'policies' 
                ? 'border-green-500 text-green-600' 
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            <FaFileAlt /> Policies
          </button>
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow p-6">
        {activeTab === 'checklists' && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Biosecurity Checklists</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(checklists).map(([type, items]) => (
                <div key={type} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg capitalize mb-3">{type} Checklist</h3>
                  <ul className="space-y-2">
                    {items.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <input 
                          type="checkbox" 
                          id={`${type}-${index}`}
                          className="mt-1 h-4 w-4 text-green-600 rounded border-gray-300"
                        />
                        <label htmlFor={`${type}-${index}`} className="ml-2 text-gray-700">
                          {item}
                        </label>
                      </li>
                    ))}
                  </ul>
                  <button className="mt-3 text-sm text-green-600 hover:text-green-800 flex items-center">
                    <FaDownload className="mr-1" /> Download PDF
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'zoning' && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Farm Zoning & Layout</h2>
              <button 
                onClick={() => setShowUploadModal(true)}
                className="bg-green-600 text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-green-700"
              >
                <FaUpload /> Upload Farm Map
              </button>
            </div>
            
            {farmMap ? (
              <div className="mt-4 border rounded-lg p-4">
                <img 
                  src={farmMap} 
                  alt="Farm Map" 
                  className="max-w-full h-auto border rounded"
                />
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">
                    Last updated: {new Date().toLocaleDateString()}
                  </span>
                  <button 
                    onClick={() => setShowUploadModal(true)}
                    className="text-green-600 hover:text-green-800 flex items-center gap-1"
                  >
                    <FaEdit /> Update Map
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
                <FaMapMarkedAlt className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">No farm map uploaded</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Upload your farm layout to get started with zoning recommendations.
                </p>
                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => setShowUploadModal(true)}
                    className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    <FaUpload className="-ml-1 mr-2 h-5 w-5" />
                    Upload Farm Map
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'ppe-calculator' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">PPE & Disinfectant Calculator</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Input</h3>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Workers
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ppeCalc.workers}
                    onChange={(e) => setPpeCalc({...ppeCalc, workers: parseInt(e.target.value) || 1})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Number of Days
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={ppeCalc.days}
                    onChange={(e) => setPpeCalc({...ppeCalc, days: parseInt(e.target.value) || 1})}
                    className="w-full p-2 border rounded-md"
                  />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-4">You'll Need:</h3>
                <ul className="space-y-2">
                  <li className="flex justify-between">
                    <span>Coveralls:</span>
                    <span className="font-medium">{ppeNeeds.coveralls} pcs</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Gloves (pairs):</span>
                    <span className="font-medium">{ppeNeeds.gloves} pcs</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Masks:</span>
                    <span className="font-medium">{ppeNeeds.masks} pcs</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Boot Covers:</span>
                    <span className="font-medium">{ppeNeeds.bootCovers} pcs</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Disinfectant:</span>
                    <span className="font-medium">{ppeNeeds.disinfectant} liters</span>
                  </li>
                </ul>
                <div className="mt-6 p-4 bg-yellow-50 rounded-md">
                  <h4 className="font-medium text-yellow-800">Recommendation</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Order {Math.ceil(ppeNeeds.coveralls * 1.1)} coveralls to account for replacements.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add other tab contents here */}
        {activeTab === 'protocols' && <div>Protocols content coming soon</div>}
        {activeTab === 'compliance' && <div>Compliance timeline coming soon</div>}
        {activeTab === 'resources' && <div>Printable resources coming soon</div>}
        {activeTab === 'policies' && <div>Policy documents coming soon</div>}
      </div>

      {/* Upload Farm Map Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-4">Upload Farm Map</h2>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <input
                type="file"
                id="farm-map-upload"
                accept="image/*,.pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
              <label
                htmlFor="farm-map-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <FaUpload className="mx-auto h-12 w-12 text-gray-400" />
                <span className="mt-2 block text-sm font-medium text-gray-900">
                  {selectedFile ? selectedFile.name : 'Click to upload or drag and drop'}
                </span>
                <span className="mt-1 block text-sm text-gray-500">
                  PNG, JPG, PDF up to 10MB
                </span>
              </label>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 border rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (selectedFile) {
                    // Handle file upload here
                    setShowUploadModal(false);
                  }
                }}
                className={`px-4 py-2 rounded-md ${
                  selectedFile
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!selectedFile}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BiosecurityGuidelines;
