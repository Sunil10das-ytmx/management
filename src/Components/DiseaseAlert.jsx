import { useState } from "react";
import Card from "./Card";
import { 
  Bell, 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  TrendingUp, 
  Camera,
  Phone,
  MessageSquare
} from "lucide-react";

// Custom Select component
const Select = ({ value, onValueChange, children, className = '', ...props }) => {
  return (
    <div className="relative">
      <select 
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        className={`block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white ${className}`}
        {...props}
      >
        {children}
      </select>
      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </div>
    </div>
  );
};

const SelectItem = ({ children, value, className = '', ...props }) => (
  <option 
    value={value} 
    className={`px-4 py-2 ${className}`}
    {...props}
  >
    {children}
  </option>
);

// Button component
const Button = ({ children, className = '', variant = 'default', ...props }) => {
  const baseStyles = 'inline-flex items-center justify-center px-4 py-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    default: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    outline: 'border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:ring-green-500',
    secondary: 'bg-gray-100 text-gray-700 hover:bg-gray-200 focus:ring-gray-500',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant] || variants.default} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge component
const Badge = ({ children, variant = 'default', className = '', ...props }) => {
  const baseStyles = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium';
  
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    secondary: 'bg-blue-100 text-blue-800',
    outline: 'bg-white border border-gray-300 text-gray-700',
    green: 'bg-green-100 text-green-800',
    red: 'bg-red-100 text-red-800',
    yellow: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`${baseStyles} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </span>
  );
};

// Card component sub-components
const CardHeader = ({ children, className = '' }) => (
  <div className={`p-6 pb-0 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className = '' }) => (
  <h2 className={`text-xl font-semibold ${className}`}>
    {children}
  </h2>
);

const CardDescription = ({ children, className = '' }) => (
  <p className={`text-sm text-gray-500 ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className = '' }) => (
  <div className={`p-6 ${className}`}>
    {children}
  </div>
);

// Mock data for alerts
const mockAlerts = [
  {
    id: "ALERT-001",
    title: "Avian Influenza Detected",
    location: "Farm A - 12km NW",
    severity: "high",
    time: "2 hours ago",
    confidence: 92,
    status: "active",
    description: "Confirmed case in nearby poultry farm. Immediate biosecurity measures recommended.",
    nextSteps: [
      "Increase perimeter surveillance",
      "Review visitor logs from last 7 days",
      "Prepare for possible quarantine"
    ],
    sources: ["Veterinary Authority Report #VET-2023-045", "Regional Disease Database"]
  },
  {
    id: "ALERT-002",
    title: "Swine Fever Outbreak",
    location: "Farm B - 8km SE",
    severity: "medium",
    time: "5 hours ago",
    confidence: 78,
    status: "investigating",
    description: "Suspected case reported. Further testing required.",
    nextSteps: [
      "Monitor animal behavior for symptoms",
      "Review recent feed suppliers",
      "Prepare isolation facilities"
    ],
    sources: ["Farm Health Sensor Network", "Regional Disease Database"]
  },
  {
    id: "ALERT-003",
    title: "Mortality Spike Detected",
    location: "Farm C - 3km E",
    severity: "low",
    time: "1 day ago",
    confidence: 65,
    status: "resolved",
    description: "Unusual mortality pattern detected. Cause identified as feed contamination.",
    nextSteps: [
      "Review feed supplier quality certificates",
      "Implement enhanced feed storage protocols",
      "Monitor recovery trends"
    ],
    sources: ["Farm Sensor Network", "Historical Data Analysis"]
  }
];

const severityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

const statusColors = {
  active: "bg-red-500",
  investigating: "bg-yellow-500",
  resolved: "bg-green-500"
};

export default function DiseaseAlertsDashboard() {
  const [alerts] = useState(mockAlerts);
  const [filter, setFilter] = useState("all");

  const filteredAlerts = filter === "all" 
    ? alerts 
    : alerts.filter(alert => alert.severity === filter);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Disease Alerts</h1>
            <p className="text-gray-600 mt-2">Real-time monitoring and alerts for regional disease outbreaks</p>
          </div>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <div className="w-[180px]">
              <Select 
                value={filter} 
                onValueChange={setFilter}
                className="w-full"
              >
                <option value="all">All Alerts</option>
                <option value="high">High Severity</option>
                <option value="medium">Medium Severity</option>
                <option value="low">Low Severity</option>
              </Select>
            </div>
            <Button className="bg-green-600 hover:bg-green-700">
              <Bell className="mr-2 h-4 w-4" />
              New Alert
            </Button>
          </div>
        </div>

        {/* Map Section */}
        <Card className="mb-8 border border-gray-200 shadow-sm" hoverEffect={false}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <MapPin className="mr-2 h-5 w-5 text-blue-500" />
              Regional Outbreak Map
            </CardTitle>
            <CardDescription>Real-time disease outbreak locations and local risk heatmap</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 rounded-lg h-80 flex items-center justify-center relative overflow-hidden">
              {/* Simplified map visualization */}
              <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-blue-50"></div>
              
              {/* Risk heatmap areas */}
              <div className="absolute top-10 left-20 w-32 h-32 rounded-full bg-red-200 opacity-50"></div>
              <div className="absolute bottom-20 right-32 w-24 h-24 rounded-full bg-yellow-200 opacity-50"></div>
              <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-green-200 opacity-50"></div>
              
              {/* Farm markers */}
              <div className="absolute top-1/4 left-1/3 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-red-500 border-2 border-white shadow"></div>
                <span className="text-xs mt-1 bg-white px-1 rounded">Farm A</span>
              </div>
              <div className="absolute bottom-1/3 right-1/3 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-yellow-500 border-2 border-white shadow"></div>
                <span className="text-xs mt-1 bg-white px-1 rounded">Farm B</span>
              </div>
              <div className="absolute top-2/3 left-1/4 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-green-500 border-2 border-white shadow"></div>
                <span className="text-xs mt-1 bg-white px-1 rounded">Farm C</span>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                <h4 className="font-medium text-sm mb-2">Risk Level</h4>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                  <span className="text-xs">High Risk</span>
                </div>
                <div className="flex items-center mb-1">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                  <span className="text-xs">Medium Risk</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                  <span className="text-xs">Low Risk</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Alerts List */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Active Alerts</h2>
            <Badge variant="secondary" className="text-sm">
              {alerts.filter(a => a.status === "active").length} Active
            </Badge>
          </div>
          
          <div className="space-y-6">
            {filteredAlerts.map((alert) => (
              <Card key={alert.id} className="border border-gray-200 shadow-sm" hoverEffect={false}>
                <CardHeader className="pb-3">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start">
                      <div className={`w-3 h-3 rounded-full mt-1.5 mr-3 ${statusColors[alert.status] || ''}`}></div>
                      <div>
                        <CardTitle className="text-lg flex items-center">
                          {alert.title}
                          <Badge className={`ml-2 ${severityColors[alert.severity] || ''}`}>
                            {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)} Severity
                          </Badge>
                        </CardTitle>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          {alert.location} • {alert.time}
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 sm:mt-0 flex items-center">
                      <Badge variant="outline" className="mr-2">
                        {alert.id}
                      </Badge>
                      <Badge variant="secondary">
                        {alert.confidence}% Confidence
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 mb-4">{alert.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <AlertTriangle className="h-4 w-4 mr-2 text-yellow-500" />
                        Recommended Actions
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {alert.nextSteps.map((step, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{step}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <TrendingUp className="h-4 w-4 mr-2 text-blue-500" />
                        Supporting Data
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline">Sensor Trends</Badge>
                        <Badge variant="outline">Visitor Logs</Badge>
                        <Badge variant="outline">Photos</Badge>
                      </div>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-2 flex items-center">
                        <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                        Sources
                      </h3>
                      <ul className="list-disc pl-5 space-y-1">
                        {alert.sources.map((source, idx) => (
                          <li key={idx} className="text-sm text-gray-600">{source}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button variant="outline" size="sm">
                      <Camera className="h-4 w-4 mr-2" />
                      View Case File
                    </Button>
                    <Button variant="outline" size="sm">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Share with Vet
                    </Button>
                    <Button variant="outline" size="sm">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact Authority
                    </Button>
                    <Button variant="outline" size="sm">
                      <Clock className="h-4 w-4 mr-2" />
                      Alert History
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Alert Channels */}
        <Card className="border border-gray-200 shadow-sm" hoverEffect={false}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="mr-2 h-5 w-5 text-blue-500" />
              Alert Delivery Channels
            </CardTitle>
            <CardDescription>Configure how you receive critical alerts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 rounded-lg p-4 flex items-start">
                <div className="bg-blue-100 p-2 rounded-lg mr-3">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Push Notifications</h3>
                  <p className="text-sm text-gray-600 mt-1">Receive alerts directly in the app</p>
                  <Badge className="mt-2">Enabled</Badge>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-start">
                <div className="bg-green-100 p-2 rounded-lg mr-3">
                  <MessageSquare className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">SMS Alerts</h3>
                  <p className="text-sm text-gray-600 mt-1">Text messages for critical alerts</p>
                  <Badge className="mt-2">Enabled</Badge>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 flex items-start">
                <div className="bg-purple-100 p-2 rounded-lg mr-3">
                  <Phone className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">IVR Calls</h3>
                  <p className="text-sm text-gray-600 mt-1">Voice calls for low-connectivity areas</p>
                  <Badge variant="secondary" className="mt-2">Disabled</Badge>
                </div>
              </div>
            </div>
            
            <div className="mt-6 flex justify-end">
              <Button variant="outline">Configure Channels</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}