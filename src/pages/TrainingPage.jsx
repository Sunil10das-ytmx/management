import React, { useState } from 'react';
import { 
  Play, 
  BookOpen, 
  TrendingUp, 
  Shield, 
  Clock, 
  Users, 
  Award, 
  CheckCircle,
  Lightbulb,
  Target,
  Star,
  ArrowRight,
  PlayCircle,
  Eye,
  ThumbsUp,
  Calendar
} from 'lucide-react';

export default function FarmerEducationVideos() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Farm Productivity",
      description: "Learn modern farming techniques that can boost your yield by up to 40%",
      color: "from-green-400 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Disease Prevention",
      description: "Master biosecurity practices to protect your livestock from diseases",
      color: "from-emerald-400 to-teal-500"
    },
    {
      icon: Lightbulb,
      title: "Expert Knowledge",
      description: "Access insights from top agricultural experts and successful farmers",
      color: "from-teal-400 to-cyan-500"
    },
    {
      icon: Target,
      title: "Practical Solutions",
      description: "Get actionable advice you can implement immediately on your farm",
      color: "from-cyan-400 to-blue-500"
    },
    {
      icon: Award,
      title: "Proven Methods",
      description: "Learn time-tested strategies that have helped thousands of farmers succeed",
      color: "from-blue-400 to-indigo-500"
    },
    {
      icon: Users,
      title: "Community Learning",
      description: "Connect with a network of progressive farmers sharing best practices",
      color: "from-indigo-400 to-purple-500"
    }
  ];

  const videos = [
    {
      id: 1,
      title: "Modern Poultry Farm Management",
      description: "Complete guide to setting up and managing a successful poultry farm with modern techniques",
      url: "https://youtu.be/eyQ4t1wHl2M?si=hKKIsixSt24XrQYc",
      embedId: "eyQ4t1wHl2M",
      duration: "15:30",
      views: "125K",
      likes: "3.2K",
      category: "poultry",
      difficulty: "Beginner",
      topics: ["Farm Setup", "Disease Prevention", "Feed Management"]
    },
    {
      id: 2,
      title: "Pig Farming Best Practices",
      description: "Learn essential pig farming techniques for healthy livestock and maximum profit",
      url: "https://youtu.be/XNcFGuzxjSo?si=FfoLzCosPdpxPryG",
      embedId: "XNcFGuzxjSo",
      duration: "22:45",
      views: "89K",
      likes: "2.1K",
      category: "pig",
      difficulty: "Intermediate",
      topics: ["Breeding", "Nutrition", "Health Management"]
    },
    {
      id: 3,
      title: "Biosecurity Fundamentals",
      description: "Essential biosecurity measures every farmer must know to protect their animals",
      url: "https://youtu.be/PedajVADLGw?si=n3MGOChhNvFUwI2W",
      embedId: "PedajVADLGw",
      duration: "18:20",
      views: "76K",
      likes: "1.8K",
      category: "biosecurity",
      difficulty: "Beginner",
      topics: ["Disease Prevention", "Quarantine", "Sanitation"]
    },
    {
      id: 4,
      title: "Advanced Animal Health Monitoring",
      description: "Technology-driven approaches to monitor and maintain animal health",
      url: "https://youtu.be/8_dAyDuvjmg?si=vhg513AxH-9_GY90",
      embedId: "8_dAyDuvjmg",
      duration: "25:10",
      views: "112K",
      likes: "2.9K",
      category: "health",
      difficulty: "Advanced",
      topics: ["Health Monitoring", "Technology", "Data Analysis"]
    },
    {
      id: 5,
      title: "Sustainable Farming Techniques",
      description: "Eco-friendly farming methods that improve sustainability and profitability",
      url: "https://youtu.be/_Njy7R4ngoo?si=vNm2sW-QClugMgFW",
      embedId: "_Njy7R4ngoo",
      duration: "20:35",
      views: "95K",
      likes: "2.4K",
      category: "sustainability",
      difficulty: "Intermediate",
      topics: ["Sustainability", "Environment", "Cost Reduction"]
    }
  ];

  const categories = [
    { id: 'all', name: 'All Videos', count: videos.length },
    { id: 'poultry', name: 'Poultry', count: videos.filter(v => v.category === 'poultry').length },
    { id: 'pig', name: 'Pig Farming', count: videos.filter(v => v.category === 'pig').length },
    { id: 'biosecurity', name: 'Biosecurity', count: videos.filter(v => v.category === 'biosecurity').length },
    { id: 'health', name: 'Animal Health', count: videos.filter(v => v.category === 'health').length },
    { id: 'sustainability', name: 'Sustainability', count: videos.filter(v => v.category === 'sustainability').length }
  ];

  const filteredVideos = activeCategory === 'all' 
    ? videos 
    : videos.filter(video => video.category === activeCategory);

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-700';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'Advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-2xl mx-auto mb-6 flex items-center justify-center backdrop-blur">
              <BookOpen className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-5xl font-black mb-4">
              Farm Education Center
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto leading-relaxed">
              Master modern farming techniques through expert-led video tutorials designed specifically for progressive farmers
            </p>
          </div>
        </div>
      </div>

      {/* Why Watch Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Should You Watch These Videos?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Transform your farming knowledge and boost your success with these carefully curated educational resources
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <div 
                  key={index}
                  className="group relative bg-white rounded-2xl p-8 shadow-lg border border-green-100 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
                >
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {benefit.description}
                  </p>
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl"></div>
                </div>
              );
            })}
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-gradient-to-r from-green-100 to-emerald-100 rounded-3xl p-12">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-black text-green-600 mb-2">500K+</div>
                <div className="text-gray-700 font-semibold">Video Views</div>
              </div>
              <div>
                <div className="text-4xl font-black text-emerald-600 mb-2">15K+</div>
                <div className="text-gray-700 font-semibold">Farmers Trained</div>
              </div>
              <div>
                <div className="text-4xl font-black text-teal-600 mb-2">98%</div>
                <div className="text-gray-700 font-semibold">Success Rate</div>
              </div>
              <div>
                <div className="text-4xl font-black text-cyan-600 mb-2">40%</div>
                <div className="text-gray-700 font-semibold">Avg. Yield Increase</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Section */}
      <div className="py-20 bg-gradient-to-br from-gray-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Expert Video Library
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Learn from industry experts and successful farmers through our comprehensive video collection
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 ${
                  activeCategory === category.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-600 hover:bg-green-50 hover:text-green-600 shadow-md'
                }`}
              >
                <span>{category.name}</span>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  activeCategory === category.id
                    ? 'bg-white/20'
                    : 'bg-gray-100'
                }`}>
                  {category.count}
                </span>
              </button>
            ))}
          </div>

          {/* Video Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredVideos.map((video) => (
              <div 
                key={video.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
              >
                {/* Video Thumbnail */}
                <div className="relative aspect-video bg-gradient-to-br from-green-400 to-emerald-600 overflow-hidden">
                  <img 
                    src={`https://img.youtube.com/vi/${video.embedId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center" style={{display: 'none'}}>
                    <div className="text-6xl">🎬</div>
                  </div>
                  
                  {/* Play Button Overlay */}
                  <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => window.open(video.url, '_blank')}
                      className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-2xl"
                    >
                      <Play className="h-8 w-8 text-green-600 ml-1" fill="currentColor" />
                    </button>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded text-sm font-semibold">
                    <Clock className="h-3 w-3 inline mr-1" />
                    {video.duration}
                  </div>

                  {/* Difficulty Badge */}
                  <div className={`absolute top-3 left-3 px-2 py-1 rounded text-xs font-semibold ${getDifficultyColor(video.difficulty)}`}>
                    {video.difficulty}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-green-600 transition-colors duration-300 line-clamp-2">
                    {video.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {video.description}
                  </p>

                  {/* Topics */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {video.topics.map((topic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Eye className="h-4 w-4" />
                        <span>{video.views}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{video.likes}</span>
                      </div>
                    </div>
                  </div>

                  {/* Watch Button */}
                  <button
                    onClick={() => window.open(video.url, '_blank')}
                    className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105 flex items-center justify-center space-x-2 shadow-lg"
                  >
                    <PlayCircle className="h-5 w-5" />
                    <span>Watch Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-20 text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white">
            <h3 className="text-3xl font-bold mb-4">Ready to Transform Your Farm?</h3>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Join thousands of successful farmers who have improved their operations with our educational content
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-green-600 font-bold rounded-xl hover:bg-gray-50 transition-colors duration-300 transform hover:scale-105">
                Start Learning Today
              </button>
              <button className="px-8 py-4 bg-green-700 text-white font-bold rounded-xl hover:bg-green-800 transition-colors duration-300 transform hover:scale-105">
                Subscribe for Updates
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}