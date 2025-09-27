import React, { useState, useEffect } from 'react';
import { Download, FileText, BarChart2, TrendingUp, Mail, Smartphone, AlertTriangle } from 'lucide-react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

// Mock data for demonstration
const mockReportData = {
  farmHealth: {
    score: 87,
    lastUpdated: '2023-10-15',
    recommendations: [
      'Vaccination schedule needs updating',
      'Feed storage area requires cleaning',
      'Water quality test due next week'
    ]
  },
  biosecurity: {
    score: 72,
    lastAudit: '2023-10-10',
    improvements: [
      'Install footbath at main entrance',
      'Update visitor log procedures',
      'Schedule biosecurity training for staff'
    ]
  },
  trends: {
    mortality: [12, 15, 10, 8, 7, 5, 4],
    feedConsumption: [1200, 1250, 1300, 1280, 1350, 1400, 1380],
    dates: ['2023-10-01', '2023-10-08', '2023-10-15', '2023-10-22', '2023-10-29', '2023-11-05', '2023-11-12']
  },
  regionAverages: {
    mortality: 8.5,
    feedEfficiency: 1.8,
    biosecurity: 68
  },
  caseDossiers: [
    { id: 1, date: '2023-10-12', type: 'Mortality', severity: 'High', notes: 'Sudden increase in mortality rate' },
    { id: 2, date: '2023-10-05', type: 'Feed', severity: 'Medium', notes: 'Feed quality issue reported' },
    { id: 3, date: '2023-09-28', type: 'Biosecurity', severity: 'Low', notes: 'Visitor protocol violation' }
  ]
};

const Reports = () => {
  const [reportType, setReportType] = useState('health');
  const [timeframe, setTimeframe] = useState('weekly');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [schedule, setSchedule] = useState('none');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedReport, setGeneratedReport] = useState(null);

  // Chart data for mortality trends
  const mortalityChartData = {
    labels: mockReportData.trends.dates,
    datasets: [
      {
        label: 'Your Farm',
        data: mockReportData.trends.mortality,
        borderColor: 'rgba(220, 38, 38, 1)',
        backgroundColor: 'rgba(220, 38, 38, 0.1)',
        tension: 0.3,
        fill: true
      },
      {
        label: 'Region Average',
        data: Array(mockReportData.trends.dates.length).fill(mockReportData.regionAverages.mortality),
        borderColor: 'rgba(75, 85, 99, 0.5)',
        borderDash: [5, 5],
        borderWidth: 1,
        pointRadius: 0
      }
    ]
  };

  // Chart data for feed consumption
  const feedChartData = {
    labels: mockReportData.trends.dates,
    datasets: [
      {
        label: 'Feed Consumption (kg)',
        data: mockReportData.trends.feedConsumption,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 1,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Amount',
        },
      },
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
    },
  };

  const generateReport = () => {
    setIsGenerating(true);
    // Simulate API call
    setTimeout(() => {
      setGeneratedReport({
        id: `RPT-${Date.now()}`,
        type: reportType,
        timeframe,
        generatedAt: new Date().toISOString(),
        data: mockReportData
      });
      setIsGenerating(false);
    }, 1500);
  };

  const downloadReport = (format) => {
    // In a real app, this would generate and download the report
    alert(`Downloading ${reportType} report in ${format} format`);
  };

  const scheduleReport = (e) => {
    e.preventDefault();
    alert(`Report scheduled for ${schedule} delivery to ${email || phone}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Farm Reports</h1>
          <p className="text-gray-600">Generate and manage your farm reports and analytics</p>
        </div>
        <div className="flex space-x-4">
          <select
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
          >
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          <button
            onClick={generateReport}
            disabled={isGenerating}
            className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 flex items-center"
          >
            {isGenerating ? 'Generating...' : 'Generate Report'}
            {!isGenerating && <FileText className="ml-2 h-4 w-4" />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div 
          onClick={() => setReportType('health')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${reportType === 'health' ? 'bg-green-50 border-2 border-green-500' : 'bg-white border border-gray-200 hover:border-green-300'}`}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${reportType === 'health' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Farm Health</h3>
              <p className="text-sm text-gray-500">Comprehensive farm status</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setReportType('biosecurity')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${reportType === 'biosecurity' ? 'bg-green-50 border-2 border-green-500' : 'bg-white border border-gray-200 hover:border-green-300'}`}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${reportType === 'biosecurity' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
              <AlertTriangle className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Biosecurity</h3>
              <p className="text-sm text-gray-500">Compliance & improvements</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setReportType('trends')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${reportType === 'trends' ? 'bg-green-50 border-2 border-green-500' : 'bg-white border border-gray-200 hover:border-green-300'}`}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${reportType === 'trends' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
              <TrendingUp className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Trends</h3>
              <p className="text-sm text-gray-500">Mortality & feed analysis</p>
            </div>
          </div>
        </div>

        <div 
          onClick={() => setReportType('case-dossiers')}
          className={`p-6 rounded-lg cursor-pointer transition-all ${reportType === 'case-dossiers' ? 'bg-green-50 border-2 border-green-500' : 'bg-white border border-gray-200 hover:border-green-300'}`}
        >
          <div className="flex items-center">
            <div className={`p-3 rounded-full ${reportType === 'case-dossiers' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-600'}`}>
              <FileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="font-medium text-gray-900">Case Dossiers</h3>
              <p className="text-sm text-gray-500">Incident documentation</p>
            </div>
          </div>
        </div>
      </div>

      {generatedReport && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">
                {reportType === 'health' && 'Farm Health Report'}
                {reportType === 'biosecurity' && 'Biosecurity Compliance Report'}
                {reportType === 'trends' && 'Farm Trends Analysis'}
                {reportType === 'case-dossiers' && 'Case Dossiers'}
              </h2>
              <p className="text-sm text-gray-500">
                Generated on {new Date(generatedReport.generatedAt).toLocaleString()}
              </p>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => downloadReport('pdf')}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" /> PDF
              </button>
              <button
                onClick={() => downloadReport('excel')}
                className="px-3 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 flex items-center"
              >
                <Download className="h-4 w-4 mr-2" /> Excel
              </button>
            </div>
          </div>

          {reportType === 'health' && (
            <div className="space-y-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-green-800">Farm Health Score</h3>
                <div className="mt-2 flex items-center">
                  <div className="text-4xl font-bold text-green-600">
                    {mockReportData.farmHealth.score}/100
                  </div>
                  <div className="ml-4">
                    <p className="text-sm text-green-700">
                      Last updated: {mockReportData.farmHealth.lastUpdated}
                    </p>
                    <div className="mt-1 h-2 w-full bg-green-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-600 rounded-full"
                        style={{ width: `${mockReportData.farmHealth.score}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Key Recommendations</h4>
                  <ul className="space-y-2">
                    {mockReportData.farmHealth.recommendations.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-500 mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-white p-4 border border-gray-200 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-3">Region Comparison</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Your Farm</span>
                        <span className="font-medium">{mockReportData.farmHealth.score}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-green-600 h-2.5 rounded-full"
                          style={{ width: `${mockReportData.farmHealth.score}%` }}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Region Average</span>
                        <span className="font-medium">{mockReportData.regionAverages.biosecurity}/100</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-gray-400 h-2.5 rounded-full"
                          style={{ width: `${mockReportData.regionAverages.biosecurity}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {reportType === 'biosecurity' && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800">Biosecurity Compliance</h3>
                <div className="mt-2">
                  <div className="text-4xl font-bold text-blue-600">
                    {mockReportData.biosecurity.score}%
                  </div>
                  <p className="text-sm text-blue-700 mt-1">
                    Last audit: {mockReportData.biosecurity.lastAudit}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">Recommended Improvements</h4>
                <div className="space-y-3">
                  {mockReportData.biosecurity.improvements.map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="flex-shrink-0 h-5 w-5 text-blue-500">
                        <AlertTriangle className="h-5 w-5" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item}</p>
                        <p className="text-sm text-gray-500 mt-1">Priority: {index === 0 ? 'High' : index === 1 ? 'Medium' : 'Low'}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {reportType === 'trends' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Mortality Rate Trend</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Line data={mortalityChartData} options={chartOptions} />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">
                  Current: {mockReportData.trends.mortality[mockReportData.trends.mortality.length - 1]}% 
                  (Region avg: {mockReportData.regionAverages.mortality}%)
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4">Feed Consumption</h3>
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Bar data={feedChartData} options={chartOptions} />
                </div>
                <p className="text-sm text-gray-500 mt-2 text-right">
                  Current: {mockReportData.trends.feedConsumption[mockReportData.trends.feedConsumption.length - 1]} kg
                </p>
              </div>
            </div>
          )}

          {reportType === 'case-dossiers' && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Case ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Date
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Severity
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Notes
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {mockReportData.caseDossiers.map((dossier) => (
                    <tr key={dossier.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {dossier.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dossier.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {dossier.type}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${dossier.severity === 'High' ? 'bg-red-100 text-red-800' : 
                            dossier.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-green-100 text-green-800'}`}>
                          {dossier.severity}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {dossier.notes}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-green-600 hover:text-green-900 mr-4">View</button>
                        <button className="text-blue-600 hover:text-blue-900">Export</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Schedule Report Delivery</h3>
        <form onSubmit={scheduleReport} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="your.email@example.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone (SMS)</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
                placeholder="+1234567890"
              />
            </div>
            <div>
              <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">Schedule</label>
              <select
                id="schedule"
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
              >
                <option value="none">Select schedule</option>
                <option value="weekly">Weekly (Mondays)</option>
                <option value="biweekly">Bi-weekly</option>
                <option value="monthly">Monthly (1st of month)</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={!email && !phone}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Mail className="h-4 w-4 mr-2" />
              Schedule Report
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Reports;
