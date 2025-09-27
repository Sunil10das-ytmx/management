import { useState, useRef } from "react";
import {
  User,
  MapPin,
  Calendar,
  CheckCircle,
  Upload,
  ShieldCheck,
  Globe,
  Mic,
  Edit
} from "lucide-react";

export default function FarmerDashboardProfile({ preferences, onPreferencesChange }) {
  // Farmer personal details state
  const [farmerDetails, setFarmerDetails] = useState({
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "+91 98765 43210",
    memberSince: "Jan 2022",
  });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [tempFarmerDetails, setTempFarmerDetails] = useState(farmerDetails);

  // Farm details state
  const [farmDetails, setFarmDetails] = useState({
    location: "Village Greenfields, District Agro, State Farmingland",
    coordinates: "23.4567° N, 78.9012° E",
    size: "12.5 acres",
    species: "Wheat, Rice, Cotton",
    productionType: "Organic",
  });
  const [isEditingFarm, setIsEditingFarm] = useState(false);
  const [tempFarmDetails, setTempFarmDetails] = useState(farmDetails);


  // Preferences are now managed by the parent component

  // Verification state
  const [verificationStatus, setVerificationStatus] = useState("pending");
  const [documents, setDocuments] = useState([]);
  const fileInputRef = useRef(null);
  const memberSincePickerRef = useRef(null);
  const [isMemberSinceOpen, setIsMemberSinceOpen] = useState(false);
  const [isProcessingVerification, setIsProcessingVerification] = useState(false);
  
  // Subscription state
  const [subscription, setSubscription] = useState({
    plan: "Free",
    renewsOn: "—",
    status: "active",
    features: [
      "Basic dashboard",
      "Community support",
    ],
  });

  // Handle file upload
  const handleFileUpload = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles = Array.from(e.target.files);
      setDocuments(prev => [...prev, ...newFiles]);
    }
  };

  // Trigger file input
  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle preferences change
  const handlePreferenceChange = (key, value) => {
    if (onPreferencesChange) {
      onPreferencesChange(prev => ({
        ...prev,
        [key]: value
      }));
    }
  };

  // Handle geolocation
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setFarmDetails(prev => ({
            ...prev,
            coordinates: `${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E`,
            location: "Current Location (Auto-geotagged)"
          }));
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to retrieve your location. Please try again.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  // Helpers for month formatting
  const toMonthInputValue = (displayStr) => {
    // Expecting format like "Jan 2022" → returns "2022-01"
    if (!displayStr) return "";
    const parts = displayStr.split(" ");
    if (parts.length !== 2) return "";
    const [mon, year] = parts;
    const months = {
      Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
      Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
    };
    const mm = months[mon];
    if (!mm) return "";
    return `${year}-${mm}`;
  };

  const toDisplayMonth = (ym) => {
    // Expecting "YYYY-MM" → "Mon YYYY"
    if (!ym || ym.indexOf('-') === -1) return "";
    const [y, m] = ym.split('-');
    const date = new Date(parseInt(y, 10), parseInt(m, 10) - 1, 1);
    return date.toLocaleString('en-US', { month: 'short', year: 'numeric' });
  };

  // Personal edit handlers
  const startPersonalEdit = () => {
    setTempFarmerDetails(farmerDetails);
    setIsEditingPersonal(true);
  };

  const cancelPersonalEdit = () => {
    setIsEditingPersonal(false);
  };

  const savePersonalEdit = () => {
    setFarmerDetails(tempFarmerDetails);
    setIsEditingPersonal(false);
    // Any profile change resets to pending until documents are submitted
    setVerificationStatus("pending");
    setIsProcessingVerification(false);
  };

  // Farm edit handlers (only some fields editable)
  const startFarmEdit = () => {
    setTempFarmDetails(farmDetails);
    setIsEditingFarm(true);
  };

  const cancelFarmEdit = () => {
    setIsEditingFarm(false);
  };

  const saveFarmEdit = () => {
    setFarmDetails(tempFarmDetails);
    setIsEditingFarm(false);
    // Any profile change resets to pending until documents are submitted
    setVerificationStatus("pending");
    setIsProcessingVerification(false);
  };

  const handleSubmitVerification = () => {
    if (!documents || documents.length === 0) {
      alert("Please upload your verification ID (PDF or DOC) before submitting.");
      return;
    }
    setVerificationStatus("pending");
    setIsProcessingVerification(true);
    // Simulate backend verification
    setTimeout(() => {
      setVerificationStatus("verified");
      setIsProcessingVerification(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">Farmer Dashboard</h1>
          <p className="text-green-600">Manage your farming profile and preferences</p>
        </div>

        <div className="space-y-6">
          {/* Personal Information Card */}
          <div className="rounded-xl shadow-sm border border-green-100 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="flex flex-row items-center justify-between p-5 border-b border-green-100 bg-gradient-to-r from-green-50 to-green-50">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-green-800">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <User className="h-5 w-5" />
                  </div>
                  Personal Information
                </h3>
                <div className="flex items-center gap-2">
                  {!isEditingPersonal && (
                    <button onClick={startPersonalEdit} className="text-green-800 hover:bg-green-100 rounded px-2 py-1">
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
                  {isEditingPersonal && (
                    <>
                      <button
                        onClick={savePersonalEdit}
                        className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800 text-sm font-medium transition-all duration-200"
                      >
                        Save
                      </button>
                      <button
                        onClick={cancelPersonalEdit}
                        className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium transition-all duration-200"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-green-900">Full Name</label>
                    <input
                      id="name"
                      value={isEditingPersonal ? tempFarmerDetails.name : farmerDetails.name}
                      onChange={(e) => isEditingPersonal && setTempFarmerDetails(prev => ({ ...prev, name: e.target.value }))}
                      readOnly={!isEditingPersonal}
                      className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-green-900">Email Address</label>
                    <input
                      id="email"
                      value={isEditingPersonal ? tempFarmerDetails.email : farmerDetails.email}
                      onChange={(e) => isEditingPersonal && setTempFarmerDetails(prev => ({ ...prev, email: e.target.value }))}
                      readOnly={!isEditingPersonal}
                      className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-green-900">Phone Number</label>
                    <input
                      id="phone"
                      value={isEditingPersonal ? tempFarmerDetails.phone : farmerDetails.phone}
                      onChange={(e) => isEditingPersonal && setTempFarmerDetails(prev => ({ ...prev, phone: e.target.value }))}
                      readOnly={!isEditingPersonal}
                      className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="memberSince" className="block text-sm font-medium text-green-900">Member Since</label>
                    <div className="flex items-center gap-2 relative">
                      <button
                        type="button"
                        onClick={() => isEditingPersonal && setIsMemberSinceOpen((v) => !v)}
                        className={`p-1 rounded ${isEditingPersonal ? 'hover:bg-green-100' : ''}`}
                        title={isEditingPersonal ? 'Pick month' : ''}
                      >
                        <Calendar className="h-4 w-4 text-green-600" />
                      </button>
                      <input
                        id="memberSince"
                        value={isEditingPersonal ? tempFarmerDetails.memberSince : farmerDetails.memberSince}
                        onChange={(e) => isEditingPersonal && setTempFarmerDetails(prev => ({ ...prev, memberSince: e.target.value }))}
                        readOnly={!isEditingPersonal}
                        className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                      />
                      {/* Popup month picker above field when editing */}
                      {isEditingPersonal && isMemberSinceOpen && (
                        <div className="absolute -top-12 left-8 bg-white border border-green-200 rounded shadow p-2 z-10">
                          <input
                            ref={memberSincePickerRef}
                            type="month"
                            value={toMonthInputValue(tempFarmerDetails.memberSince)}
                            onChange={(e) => setTempFarmerDetails(prev => ({ ...prev, memberSince: toDisplayMonth(e.target.value) }))}
                            className="rounded border border-green-200 px-2 py-1"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Farm Details Card */}
            <div className="h-full rounded-xl shadow-sm border border-green-100 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="flex flex-row items-center justify-between p-5 border-b border-green-100 bg-gradient-to-r from-green-50 to-green-50">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-green-800">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <MapPin className="h-5 w-5" />
                  </div>
                  Farm Details
                </h3>
                <div className="flex items-center gap-2">
                  {!isEditingFarm && (
                    <button onClick={startFarmEdit} className="text-green-800 hover:bg-green-100 rounded px-2 py-1">
                      <Edit className="h-4 w-4" />
                    </button>
                  )}
                  {isEditingFarm && (
                    <>
                      <button onClick={saveFarmEdit} className="px-3 py-1 rounded bg-green-600 text-white hover:bg-green-700 text-sm">Save</button>
                      <button onClick={cancelFarmEdit} className="px-3 py-1 rounded border border-green-300 text-green-800 hover:bg-green-100 text-sm">Cancel</button>
                    </>
                  )}
                </div>
              </div>
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label htmlFor="location" className="block text-sm font-medium text-green-900">Farm Location</label>
                    <div className="flex gap-2">
                      <input id="location" value={farmDetails.location} readOnly className="mt-1 w-full rounded border border-green-200 px-3 py-2" />
                      <button onClick={handleGetLocation} className="mt-1 px-3 py-2 rounded border border-green-300 bg-white text-green-800 hover:bg-green-50">
                        Auto-Tag
                      </button>
                    </div>
                  </div>
                  <div>
                    <label htmlFor="coordinates" className="block text-sm font-medium text-green-900">Coordinates</label>
                    <input id="coordinates" value={farmDetails.coordinates} readOnly className="mt-1 w-full rounded border border-green-200 px-3 py-2" />
                  </div>
                  <div>
                    <label htmlFor="size" className="block text-sm font-medium text-green-900">Farm Size</label>
                    <input
                      id="size"
                      value={isEditingFarm ? tempFarmDetails.size : farmDetails.size}
                      onChange={(e) => isEditingFarm && setTempFarmDetails(prev => ({ ...prev, size: e.target.value }))}
                      readOnly={!isEditingFarm}
                      className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="species" className="block text-sm font-medium text-green-900">Cultivated Species</label>
                    <input
                      id="species"
                      value={isEditingFarm ? tempFarmDetails.species : farmDetails.species}
                      onChange={(e) => isEditingFarm && setTempFarmDetails(prev => ({ ...prev, species: e.target.value }))}
                      readOnly={!isEditingFarm}
                      className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                    />
                  </div>
                  <div>
                    <label htmlFor="productionType" className="block text-sm font-medium text-green-900">Production Type</label>
                    <input
                      id="productionType"
                      value={isEditingFarm ? tempFarmDetails.productionType : farmDetails.productionType}
                      onChange={(e) => isEditingFarm && setTempFarmDetails(prev => ({ ...prev, productionType: e.target.value }))}
                      readOnly={!isEditingFarm}
                      className="mt-1 w-full rounded border border-green-200 px-3 py-2"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          
            {/* Onboarding Checklist */}
            <div className="h-full rounded-xl shadow-sm border border-green-100 mt-5 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="p-5 border-b border-green-100 bg-gradient-to-r from-green-50 to-green-50">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-green-800">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  Onboarding Checklist
                </h3>
              </div>
              <div className="p-4 space-y-4">
                {(() => {
                  const steps = [
                    { key: 'personal', label: 'Complete personal info', done: !!(farmerDetails.name && farmerDetails.email && farmerDetails.phone && farmerDetails.memberSince) },
                    { key: 'language', label: 'Set language preference', done: !!preferences.language },
                    { key: 'farm', label: 'Add farm size/species/production type', done: !!(farmDetails.size && farmDetails.species && farmDetails.productionType) },
                    { key: 'location', label: 'Auto-tag farm location', done: !!(farmDetails.coordinates) },
                    { key: 'documents', label: 'Upload verification document', done: documents.length > 0 },
                  ];
                  const completed = steps.filter(s => s.done).length;
                  const total = steps.length;
                  const pct = Math.round((completed / total) * 100);
                  return (
                    <>
                      <div>
                        <div className="flex justify-between text-sm text-green-900 mb-1">
                          <span>Progress</span>
                          <span>{completed}/{total} ({pct}%)</span>
                        </div>
                        <div className="h-2 w-full bg-green-200 rounded">
                          <div className="h-2 bg-green-600 rounded" style={{ width: `${pct}%` }} />
                        </div>
                      </div>
                      <ul className="space-y-2">
                        {steps.map((s) => (
                          <li key={s.key} className="flex items-center justify-between text-sm">
                            <span className={`text-green-900 ${s.done ? '' : ''}`}>{s.label}</span>
                            <span className={`px-2 py-0.5 rounded text-xs ${s.done ? 'bg-green-500 text-white' : 'bg-green-200 text-green-900'}`}>{s.done ? 'Done' : 'Pending'}</span>
                          </li>
                        ))}
                      </ul>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>

          {/* Verification Status */}
          <div className="mt-6 rounded-xl shadow-sm border border-green-100 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
          <div className="p-5 border-b border-green-100 bg-gradient-to-r from-green-50 to-green-50">
            <h3 className="flex items-center gap-3 text-xl font-semibold text-green-800">
              <div className="p-2 rounded-lg bg-green-100 text-green-600">
                <ShieldCheck className="h-5 w-5" />
              </div>
              Verification Status
            </h3>
          </div>
          <div className="space-y-4 p-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Status:</span>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded text-white text-xs ${
                verificationStatus === "verified" ? "bg-green-500" : 
                verificationStatus === "pending" ? "bg-yellow-500" : 
                "bg-red-500"
              }`}>
                {verificationStatus === "verified" ? "Verified" : 
                 verificationStatus === "pending" ? (
                  <>
                    Processing
                    <span className="inline-flex gap-0.5">
                      <span className="animate-pulse">.</span>
                      <span className="animate-pulse [animation-delay:150ms]">.</span>
                      <span className="animate-pulse [animation-delay:300ms]">.</span>
                    </span>
                  </>
                ) : "Rejected"}
              </span>
            </div>

            {verificationStatus !== "verified" && (
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-green-900">Upload Documents for Verification</label>
                  <textarea
                    placeholder="Additional information (optional)"
                    className="mt-2 w-full rounded border border-green-200 px-3 py-2"
                  />
                </div>

                <div className="space-y-2">
                  <button onClick={triggerFileInput} className="w-full border-2 border-dashed rounded px-3 py-2 hover:bg-amber-50 border-amber-300 text-amber-800">
                    <Upload className="h-4 w-4 mr-2" />
                    Upload ID/Documents
                  </button>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    className="hidden"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                  />

                  {documents.length > 0 && (
                    <div className="mt-2">
                      <p className="text-sm text-green-800 mb-2">Uploaded Documents:</p>
                      <ul className="space-y-1">
                        {documents.map((doc, index) => (
                          <li key={index} className="text-sm flex items-center">
                            <CheckCircle className="h-4 w-4 text-green-600 mr-2" />
                            {doc.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <button
                  onClick={handleSubmitVerification}
                  className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-700 text-white font-medium hover:from-green-700 hover:to-green-800 transition-all duration-200 transform hover:-translate-y-0.5 shadow-md hover:shadow-lg"
                >
                  Submit for Verification
                </button>
              </div>
            )}

            {verificationStatus === "verified" && (
              <div className="text-center py-4">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-2" />
                <p className="text-green-700 font-medium">Your profile is verified!</p>
                <p className="text-sm text-green-800 mt-1">
                  You have full access to all platform features
                </p>
              </div>
            )}
          </div>
        </div>
        {/* Subscription Plans */}
        <div className="rounded-xl shadow-sm border border-green-100 mt-5 bg-white overflow-hidden transition-all duration-200 hover:shadow-md">
              <div className="p-5 border-b border-green-100 bg-gradient-to-r from-green-50 to-green-50">
                <h3 className="flex items-center gap-3 text-xl font-semibold text-green-800">
                  <div className="p-2 rounded-lg bg-green-100 text-green-600">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  </div>
                  Subscription Plans
                </h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="rounded border border-green-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">Free</h4>
                    <span className="px-2 py-0.5 rounded bg-green-500 text-white text-xs">Current</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-amber-900 space-y-1">
                    <li>Basic dashboard access</li>
                    <li>Community support</li>
                    <li>Manual data entry</li>
                    <li>Standard alerts</li>
                  </ul>
                </div>
                <div className="rounded border border-green-200 p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-green-900">Paid (Pro)</h4>
                    <span className="px-2 py-0.5 rounded bg-green-700 text-white text-xs">Upgrade</span>
                  </div>
                  <ul className="list-disc pl-5 text-sm text-green-900 space-y-1">
                    <li>Advanced analytics & reports</li>
                    <li>Priority support</li>
                    <li>Automated data imports</li>
                    <li>Real-time weather & disease insights</li>
                    <li>Export data (CSV/PDF)</li>
                  </ul>
                  <button className="mt-3 px-3 py-2 rounded bg-green-600 text-white hover:bg-green-700 text-sm w-full">Upgrade to Pro</button>
                </div>
              </div>
            </div>

      </div>
    );
}
