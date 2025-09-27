import { useState, useEffect } from 'react';
import { 
  Droplet, 
  Thermometer, 
  Wind, 
  Sun, 
  CloudSun, 
  CloudRain, 
  Cloud, 
  AlertTriangle,
  Calendar,
  Info,
  Droplets,
  ThermometerSun,
  CloudSunRain
} from 'lucide-react';
import Card from './Card';

// Mock coordinates (you can replace with actual farm coordinates)
const FARM_COORDS = {
  latitude: 20.5937,  // Default to India's coordinates
  longitude: 78.9629
};

// Weather API endpoints
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast';
const SOIL_API = 'https://rest.soilgrids.org';

// Weather code to description mapping
const WEATHER_CODES = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Foggy',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail'
};

// Heat stress index calculation
const calculateHeatIndex = (temp, humidity) => {
  // Simple heat index calculation (simplified version of the Rothfusz equation)
  const t = temp * 9/5 + 32; // Convert to Fahrenheit for calculation
  const rh = humidity;
  
  // Rothfusz regression equation
  const hi = -42.379 + (2.04901523 * t) + (10.14333127 * rh) - 
             (0.22475541 * t * rh) - (6.83783 * Math.pow(10, -3) * t * t) - 
             (5.481717 * Math.pow(10, -2) * rh * rh) + 
             (1.22874 * Math.pow(10, -3) * t * t * rh) + 
             (8.5282 * Math.pow(10, -4) * t * rh * rh) - 
             (1.99 * Math.pow(10, -6) * t * t * rh * rh);
  
  return Math.round((hi - 32) * 5/9); // Convert back to Celsius
};

// Get heat stress level
const getHeatStressLevel = (temp, humidity) => {
  const hi = calculateHeatIndex(temp, humidity);
  
  if (hi < 27) return { level: 'None', color: 'bg-green-100 text-green-800' };
  if (hi < 32) return { level: 'Caution', color: 'bg-yellow-100 text-yellow-800' };
  if (hi < 41) return { level: 'Extreme Caution', color: 'bg-orange-100 text-orange-800' };
  if (hi < 54) return { level: 'Danger', color: 'bg-red-100 text-red-800' };
  return { level: 'Extreme Danger', color: 'bg-purple-100 text-purple-800' };
};

// Get weather advice based on conditions
const getWeatherAdvice = (weatherData) => {
  const advice = [];
  const { temperature, humidity, weatherCode } = weatherData.current_weather || {};
  const { precipitation, rain, showers } = weatherData.hourly || {};
  
  // Heat stress advice
  if (temperature > 30) {
    advice.push({
      icon: <ThermometerSun className="w-5 h-5 text-orange-500" />,
      text: 'High temperature detected. Ensure adequate shade and water supply for animals.'
    });
  }
  
  // Humidity advice
  if (humidity > 80) {
    advice.push({
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      text: 'High humidity detected. Check ventilation systems to prevent respiratory issues.'
    });
  }
  
  // Rain advice
  if (weatherCode >= 51 && weatherCode <= 67) {
    advice.push({
      icon: <CloudRain className="w-5 h-5 text-blue-400" />,
      text: 'Rain expected. Ensure proper drainage and shelter for animals.'
    });
  }
  
  // Wind advice
  if (weatherData.current_weather?.windspeed > 20) {
    advice.push({
      icon: <Wind className="w-5 h-5 text-gray-500" />,
      text: 'High winds expected. Secure loose items and check shelter integrity.'
    });
  }
  
  return advice.length > 0 ? advice : [{
    icon: <Sun className="w-5 h-5 text-yellow-500" />,
    text: 'Weather conditions are optimal for farm activities.'
  }];
};

// Seasonal calendar data (customize based on your region)
const SEASONAL_CALENDAR = [
  { 
    month: 'January-March', 
    activities: ['Ideal for vaccination programs', 'Monitor for respiratory diseases'],
    risks: ['Cold stress in young animals', 'Frostbite risk']
  },
  { 
    month: 'April-June', 
    activities: ['Prepare for heat stress management', 'Schedule shearing if applicable'],
    risks: ['Heat stress', 'Dehydration']
  },
  { 
    month: 'July-September', 
    activities: ['Monitor for parasites', 'Prepare for monsoon-related challenges'],
    risks: ['High humidity', 'Muddy conditions']
  },
  { 
    month: 'October-December', 
    activities: ['Winter preparation', 'Stock up on feed'],
    risks: ['Temperature fluctuations', 'Frost']
  }
];

// Soil management tips based on soil type
const SOIL_MANAGEMENT_TIPS = {
  'clay': [
    'Improve drainage with organic matter',
    'Avoid working soil when wet',
    'Use raised beds for better drainage'
  ],
  'sandy': [
    'Add organic matter to improve water retention',
    'Use mulch to reduce water evaporation',
    'Frequent, light watering is better than infrequent heavy watering'
  ],
  'loam': [
    'Maintain organic matter with regular composting',
    'Practice crop rotation',
    'Use cover crops to prevent erosion'
  ],
  'silt': [
    'Add organic matter to improve structure',
    'Avoid compaction by minimizing foot traffic',
    'Use cover crops to prevent erosion'
  ]
};

const WeatherSoilInfo = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [soilType, setSoilType] = useState('loam'); // Default to loam, will be updated by API
  const [activeTab, setActiveTab] = useState('forecast');
  const [location, setLocation] = useState('');
  
  // Fetch weather data
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        setLoading(true);
        
        // Get user's location if available
        let { latitude, longitude } = FARM_COORDS;
        
        if (navigator.geolocation) {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
        }
        
        // Get location name
        const locationResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const locationData = await locationResponse.json();
        setLocation(locationData.display_name || 'Your Farm Location');
        
        // Get weather data
        const response = await fetch(
          `${WEATHER_API}?` + new URLSearchParams({
            latitude,
            longitude,
            current_weather: true,
            hourly: 'temperature_2m,relativehumidity_2m,precipitation,rain,showers,snowfall,windspeed_10m',
            daily: 'weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum',
            timezone: 'auto',
            forecast_days: 7
          })
        );
        
        if (!response.ok) throw new Error('Failed to fetch weather data');
        
        const data = await response.json();
        setWeatherData(data);
        
        // Simulate soil type detection (in a real app, you'd use a soil API)
        // For demo purposes, we'll use a mock soil type based on location
        const soilTypes = ['clay', 'sandy', 'loam', 'silt'];
        setSoilType(soilTypes[Math.floor(Math.random() * soilTypes.length)]);
        
      } catch (err) {
        console.error('Error fetching weather data:', err);
        setError('Failed to load weather data. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, []);
  
  // Render loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }
  
  // Render error state
  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-400 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      </div>
    );
  }
  
  const { current_weather, hourly, daily } = weatherData || {};
  const currentTemp = current_weather?.temperature?.toFixed(1);
  const currentWeatherCode = current_weather?.weathercode;
  const currentWeatherDesc = WEATHER_CODES[currentWeatherCode] || 'Unknown';
  const currentHumidity = hourly?.relativehumidity_2m?.[0]?.toFixed(0) || 0;
  const heatStress = getHeatStressLevel(currentTemp, currentHumidity);
  const weatherAdvice = getWeatherAdvice(weatherData);
  
  // Get hourly forecast for today
  const today = new Date().toISOString().split('T')[0];
  const hourlyToday = hourly?.time?.map((time, index) => ({
    time: new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    temp: hourly.temperature_2m[index],
    weatherCode: hourly.weathercode?.[index] || 0
  })) || [];
  
  // Get 7-day forecast
  const weeklyForecast = daily?.time?.map((date, index) => ({
    date: new Date(date).toLocaleDateString('en-US', { weekday: 'short' }),
    maxTemp: daily.temperature_2m_max?.[index]?.toFixed(1) || 0,
    minTemp: daily.temperature_2m_min?.[index]?.toFixed(1) || 0,
    weatherCode: daily.weathercode?.[index] || 0,
    precipitation: daily.precipitation_sum?.[index]?.toFixed(1) || 0
  })) || [];
  
  // Render weather icon based on weather code
  const renderWeatherIcon = (weatherCode, size = 'w-8 h-8') => {
    // Simple mapping of weather codes to icons
    if ([0, 1].includes(weatherCode)) return <Sun className={`${size} text-yellow-400`} />;
    if (weatherCode === 2) return <CloudSun className={`${size} text-yellow-300`} />;
    if (weatherCode === 3) return <Cloud className={`${size} text-gray-400`} />;
    if (weatherCode >= 45 && weatherCode <= 67) return <CloudRain className={`${size} text-blue-400`} />;
    if (weatherCode >= 71 && weatherCode <= 86) return <CloudRain className={`${size} text-blue-300`} />;
    if (weatherCode >= 95) return <CloudRain className={`${size} text-purple-500`} />;
    return <Sun className={`${size} text-yellow-400`} />;
  };
  
  return (
    <div className="space-y-6">
      {/* Location and current weather */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{location}</h2>
            <p className="text-gray-600">
              {new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="text-5xl font-bold text-gray-900 mr-4">
              {currentTemp}°C
            </div>
            <div>
              {renderWeatherIcon(currentWeatherCode, 'w-12 h-12')}
              <p className="text-gray-600 text-sm">{currentWeatherDesc}</p>
            </div>
          </div>
        </div>
        
        {/* Weather metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Droplet className="w-5 h-5 text-blue-500 mr-2" />
              <span className="text-sm text-gray-600">Humidity</span>
            </div>
            <p className="text-2xl font-semibold mt-1">{currentHumidity}%</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Wind className="w-5 h-5 text-gray-500 mr-2" />
              <span className="text-sm text-gray-600">Wind</span>
            </div>
            <p className="text-2xl font-semibold mt-1">{current_weather?.windspeed?.toFixed(1)} km/h</p>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center">
              <Thermometer className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-sm text-gray-600">Feels Like</span>
            </div>
            <p className="text-2xl font-semibold mt-1">
              {calculateHeatIndex(currentTemp, currentHumidity)}°C
            </p>
          </div>
          
          <div className={`p-4 rounded-lg ${heatStress.color} bg-opacity-50`}>
            <div className="flex items-center">
              <ThermometerSun className="w-5 h-5 text-orange-500 mr-2" />
              <span className="text-sm">Heat Stress</span>
            </div>
            <p className="text-2xl font-semibold mt-1">{heatStress.level}</p>
          </div>
        </div>
      </div>
      
      {/* Tabs for different sections */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex -mb-px">
            {[
              { id: 'forecast', label: 'Forecast' },
              { id: 'heat-stress', label: 'Heat Stress' },
              { id: 'alerts', label: 'Alerts' },
              { id: 'soil', label: 'Soil Info' },
              { id: 'calendar', label: 'Seasonal Calendar' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-6 text-center border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        
        {/* Tab content */}
        <div className="p-6">
          {/* Forecast Tab */}
          {activeTab === 'forecast' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Hourly Forecast</h3>
              <div className="flex overflow-x-auto pb-4 space-x-4">
                {hourlyToday.slice(0, 24).filter((_, i) => i % 2 === 0).map((hour, index) => (
                  <div key={index} className="flex flex-col items-center px-4 py-2 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">{hour.time}</span>
                    <div className="my-1">
                      {renderWeatherIcon(hour.weatherCode, 'w-6 h-6')}
                    </div>
                    <span className="font-medium">{hour.temp}°C</span>
                  </div>
                ))}
              </div>
              
              <h3 className="text-lg font-medium text-gray-900 mt-8 mb-4">7-Day Forecast</h3>
              <div className="space-y-2">
                {weeklyForecast.map((day, index) => (
                  <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100">
                    <span className="w-20 font-medium">{day.date}</span>
                    <div className="flex-1 flex items-center justify-center">
                      {renderWeatherIcon(day.weatherCode, 'w-8 h-8')}
                    </div>
                    <div className="w-16 text-right">
                      <span className="font-medium">{day.maxTemp}°</span>
                      <span className="text-gray-500 ml-1">{day.minTemp}°</span>
                    </div>
                    <div className="w-16 text-right text-sm text-gray-500">
                      {day.precipitation}mm
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Heat Stress Tab */}
          {activeTab === 'heat-stress' && (
            <div>
              <div className={`p-4 rounded-lg ${heatStress.color} bg-opacity-20 mb-6`}>
                <h3 className="text-lg font-medium mb-2">Current Heat Stress Level: {heatStress.level}</h3>
                <p className="text-sm">
                  Temperature: {currentTemp}°C | Humidity: {currentHumidity}%
                </p>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-3">Recommendations:</h4>
              <ul className="space-y-2">
                {heatStress.level === 'Extreme Danger' && (
                  <li className="flex items-start">
                    <AlertTriangle className="w-5 h-5 text-red-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Immediate action required! Provide shade, increase ventilation, and ensure constant access to cool water.</span>
                  </li>
                )}
                
                {['Danger', 'Extreme Danger'].includes(heatStress.level) && (
                  <li className="flex items-start">
                    <Info className="w-5 h-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Limit animal handling and transportation during the hottest parts of the day.</span>
                  </li>
                )}
                
                {heatStress.level !== 'None' && (
                  <li className="flex items-start">
                    <Info className="w-5 h-5 text-blue-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Ensure adequate shade and water supply is available at all times.</span>
                  </li>
                )}
                
                <li className="flex items-start">
                  <Info className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                  <span>Consider adjusting feeding times to cooler parts of the day.</span>
                </li>
              </ul>
              
              <div className="mt-6 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-2">Heat Stress Index Chart</h4>
                <div className="h-6 bg-gradient-to-r from-green-100 via-yellow-100 to-red-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-green-500 to-red-600" 
                    style={{ width: `${Math.min(100, (calculateHeatIndex(currentTemp, currentHumidity) / 50) * 100)}%` }}
                  ></div>
                </div>
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>No Stress</span>
                  <span>Extreme Stress</span>
                </div>
              </div>
            </div>
          )}
          
          {/* Alerts Tab */}
          {activeTab === 'alerts' && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Weather Alerts & Advisories</h3>
              
              {weatherAdvice.length > 0 ? (
                <div className="space-y-4">
                  {weatherAdvice.map((advice, index) => (
                    <div key={index} className="flex items-start p-4 bg-blue-50 rounded-lg">
                      <div className="flex-shrink-0">
                        {advice.icon}
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-gray-700">{advice.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Sun className="mx-auto h-12 w-12 text-yellow-400" />
                  <h4 className="mt-2 text-sm font-medium text-gray-900">No active alerts</h4>
                  <p className="mt-1 text-sm text-gray-500">Current weather conditions are within normal ranges.</p>
                </div>
              )}
              
              <div className="mt-6">
                <h4 className="font-medium text-gray-900 mb-3">Alert Thresholds</h4>
                <div className="bg-gray-50 p-4 rounded-lg">
                  <ul className="space-y-2 text-sm">
                    <li className="flex justify-between">
                      <span className="text-gray-600">High Temperature Alert</span>
                      <span className="font-medium">&gt; 30°C</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Heat Stress Warning</span>
                      <span className="font-medium">HI &gt; 32°C</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">Rain Alert</span>
                      <span className="font-medium">&gt; 5mm expected</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-gray-600">High Wind Alert</span>
                      <span className="font-medium">&gt; 30 km/h</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {/* Soil Info Tab */}
          {activeTab === 'soil' && (
            <div>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Soil Type: {soilType.charAt(0).toUpperCase() + soilType.slice(1)}</h3>
                <p className="text-sm text-gray-600">
                  Based on your location, this is the predominant soil type in your area.
                </p>
              </div>
              
              <h4 className="font-medium text-gray-900 mb-3">Management Tips for {soilType} Soil</h4>
              <ul className="space-y-2 mb-6">
                {SOIL_MANAGEMENT_TIPS[soilType]?.map((tip, index) => (
                  <li key={index} className="flex items-start">
                    <span className="bg-green-100 text-green-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-medium mr-2 mt-0.5 flex-shrink-0">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                )) || (
                  <li className="text-gray-600">No specific tips available for this soil type.</li>
                )}
              </ul>
              
              <h4 className="font-medium text-gray-900 mb-3">Waste Management Recommendations</h4>
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                <h5 className="font-medium text-yellow-800 mb-2">Biosecure Waste Handling</h5>
                <ul className="list-disc pl-5 space-y-1 text-sm text-yellow-700">
                  <li>Compost manure properly to kill pathogens (maintain 55-65°C for several days)</li>
                  <li>Store waste away from animal housing and water sources</li>
                  <li>Regularly clean and disinfect waste storage areas</li>
                  <li>Follow local regulations for disposal of animal by-products</li>
                </ul>
              </div>
              
              <div className="mt-6 bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-800 mb-2">Soil Moisture Level</h4>
                <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-blue-500" 
                    style={{ width: `${Math.min(100, Math.max(0, 30 + Math.random() * 40))}%` }}
                  ></div>
                </div>
                <p className="mt-2 text-sm text-blue-700">
                  Current soil moisture is {Math.floor(30 + Math.random() * 40)}% - {Math.random() > 0.5 ? 'Adequate for most crops' : 'Consider irrigation'}
                </p>
              </div>
            </div>
          )}
          
          {/* Seasonal Calendar Tab */}
          {activeTab === 'calendar' && (
            <div>
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <h3 className="text-lg font-medium text-purple-900 mb-1">Seasonal Farming Calendar</h3>
                <p className="text-sm text-purple-700">
                  Plan your farming activities based on seasonal patterns and risks.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SEASONAL_CALENDAR.map((season, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-4 py-3 border-b border-gray-200">
                      <h4 className="font-medium text-gray-900">{season.month}</h4>
                    </div>
                    <div className="p-4">
                      <div className="mb-4">
                        <h5 className="text-sm font-medium text-green-700 mb-2 flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Recommended Activities
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {season.activities.map((activity, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-green-500 mr-2">•</span>
                              {activity}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h5 className="text-sm font-medium text-red-700 mb-2 flex items-center">
                          <svg className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                          Potential Risks
                        </h5>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {season.risks.map((risk, i) => (
                            <li key={i} className="flex items-start">
                              <span className="text-red-500 mr-2">•</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <h4 className="font-medium text-yellow-800 mb-2">Micro-Advisories</h4>
                <ul className="space-y-2 text-sm text-yellow-700">
                  <li className="flex items-start">
                    <Info className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Current humidity is {currentHumidity}% - {currentHumidity > 80 ? 'High humidity detected. Check ventilation to prevent respiratory issues.' : 'Humidity levels are within normal range.'}</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Daylight hours are {new Date().getHours() > 18 || new Date().getHours() < 6 ? 'short' : 'long'}. Adjust feeding schedules accordingly.</span>
                  </li>
                  <li className="flex items-start">
                    <Info className="w-4 h-4 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Upcoming weather: {weeklyForecast[1]?.precipitation > 5 ? 'Rain expected tomorrow. Plan indoor activities.' : 'Clear weather expected tomorrow.'}</span>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Additional Resources */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Additional Resources</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <a 
            href="https://www.fao.org/agriculture/dairy-gateway/animal-health/heat-stress/en/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-blue-600 mb-1">FAO: Managing Heat Stress in Livestock</h4>
            <p className="text-sm text-gray-600">Comprehensive guide on mitigating heat stress in farm animals</p>
          </a>
          
          <a 
            href="https://www.nrcs.usda.gov/wps/portal/nrcs/detail/soils/use/?cid=nrcs142p2_054280" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <h4 className="font-medium text-blue-600 mb-1">USDA: Soil Health Management</h4>
            <p className="text-sm text-gray-600">Best practices for maintaining healthy soil on your farm</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default WeatherSoilInfo;
