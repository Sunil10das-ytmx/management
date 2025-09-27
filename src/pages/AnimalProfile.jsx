import React, { useState } from 'react';
import { ArrowLeft, Bird, Feather, Layers, Zap, Droplets, Hash, PiggyBank, Shield, Heart, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import BroilerChicken from '../assets/Chicken (Broiler).jpg';
import LayerChicken from '../assets/Chicken (Layer).jpg';
import NativeChicken from '../assets/Chicken (Native Desi).jpg';
import Duck from '../assets/Duck.jpg';
import EMu from '../assets/Emu.jpeg';
import Guinea from '../assets/Guineafowl.jpg';
import Ostrich from '../assets/Ostrich.png';
import Pigeon from '../assets/Pigeon.jpg';
import Quail from '../assets/Quail.png';
import Turkey from '../assets/Turkey.jpg';
import Yorkshire from '../assets/Yorkshire.jpg';
import Crossbreeds from '../assets/Crossbreeds.jpg';
import Hampshire from '../assets/Hampshire.jpg';
import Landrace from '../assets/Landrace.jpg';
import IndigenousBreedsIndia from '../assets/Indigenous Breeds (India).jpg';
import Duroc from '../assets/Duroc.jpg'



// Bird data with all the provided information
const birdData = {
  broiler: {
    name: 'Chicken (Broiler)',
    type: 'Broiler (meat)',
    breeds: 'Cobb, Ross, Vencobb (commercial hybrids)',
    maturity: '35–50 days (market broilers)',
    weight: '1.8–3.0 kg (market)',
    diseases: [
      'Newcastle disease (Ranikhet)',
      'Infectious Bursal Disease (Gumboro)',
      'Infectious Bronchitis',
      'Marek\'s disease',
      'Coccidiosis',
      'Salmonellosis'
    ],
    vaccinations: [
      'Day-0: Marek\'s',
      '5–7 days: Newcastle Disease (ND)',
      '14–21 days: Infectious Bursal Disease (IBD)',
      '3–4 weeks: Infectious Bronchitis (programs vary)'
    ],
    image: BroilerChicken,
    icon: <Zap className="h-5 w-5" />
  },
  layer: {
    name: 'Chicken (Layer)',
    type: 'Layer (egg)',
    breeds: 'White Leghorn, Hy-Line, Lohmann Brown, Rhode Island Red',
    maturity: 'Sexual maturity / first egg at ~18–20 weeks',
    weight: 'Hens ≈ 1.5–2.5 kg (adult)',
    diseases: [
      'Newcastle disease',
      'Infectious Bursal Disease (IBD)',
      'Infectious Bronchitis',
      'Fowl Pox',
      'Infectious Coryza',
      'Salmonella (egg-transmitted)'
    ],
    vaccinations: [
      'Marek\'s (day-old)',
      'Newcastle Disease (ND)',
      'Infectious Bursal Disease (IBD)',
      'Infectious Bronchitis (IB)',
      'Fowl Pox',
      'Infectious Coryza',
      'Inactivated ND/IB for layers before production'
    ],
    image: LayerChicken,
    icon: <Layers className="h-5 w-5" />
  },
  native: {
    name: 'Chicken (Native / Desi)',
    type: 'Backyard / native breeds',
    breeds: 'Aseel, Kadaknath, Vanaraja, Gramapriya',
    maturity: '~150–180 days (5–6 months) for sexual maturity',
    weight: 'Adults vary ≈ 1.5–3.0 kg (breed dependent)',
    diseases: [
      'Newcastle Disease (ND)',
      'Infectious Bursal Disease (IBD)',
      'Infectious Bronchitis (IB)',
      'Coccidiosis',
      'Generally more disease-resilient'
    ],
    vaccinations: [
      'Basic ND and IBD in backyard programs',
      'Follow local vet/extension guidance',
      'Adapted vaccination schedule based on disease prevalence'
    ],
    image: NativeChicken,
    icon: <Feather className="h-5 w-5" />
  },
  duck: {
    name: 'Duck',
    type: 'Duck (meat & eggs)',
    breeds: 'Indian Runner, Khaki Campbell, Muscovy',
    maturity: 'Egg laying begins ~5–6 months; meat ducks marketed at 8–12 weeks',
    weight: '~1.5 kg at 60 days; adults 1.7–3.0+ kg (breed dependent)',
    diseases: [
      'Duck viral enteritis (duck plague)',
      'Botulism',
      'Parasitic infections',
      'Respiratory infections',
      'Bacterial infections'
    ],
    vaccinations: [
      'Species-specific vaccination programs required',
      'Consult local veterinarian for specific schedules',
      'Some vaccines differ from chicken schedules',
      'Emphasis on biosecurity measures'
    ],
    image: Duck,
    icon: <Droplets className="h-5 w-5" />
  },
  quail: {
    name: 'Quail (Coturnix / Japanese)',
    type: 'Quail (meat & eggs)',
    breeds: 'Japanese quail (Coturnix japonica), Indian quail',
    maturity: 'Sexual maturity ~35–42 days (5–6 weeks)',
    weight: '100–250 g (adult, species dependent)',
    diseases: [
      'Newcastle disease',
      'Coccidiosis',
      'Salmonella',
      'Mycoplasma infections',
      'Respiratory diseases'
    ],
    vaccinations: [
      'Vaccinate for Newcastle Disease',
      'Anticoccidial program commonly used',
      'Administered via drinking water or spray',
      'Follow farm-specific protocols'
    ],
    image: Quail,
    icon: <Hash className="h-5 w-5" />
  },
  turkey: {
    name: 'Turkey',
    type: 'Turkey (meat)',
    breeds: 'Broad-breasted Bronze, Broad-breasted White, Beltsville Small White',
    maturity: '~5–6 months for meat production',
    weight: 'Average 4–8+ kg (commonly 6–8 kg at market)',
    diseases: [
      'Newcastle disease',
      'Enteric infections',
      'Bacterial infections',
      'Parasitic infestations',
      'Respiratory diseases'
    ],
    vaccinations: [
      'Adapted poultry vaccination program',
      'Timings vary — consult extension/veterinarian',
      'Special attention to respiratory diseases',
      'Biosecurity is crucial'
    ],
    image: Turkey,
    icon: <Bird className="h-5 w-5" />
  },
  guinea: {
    name: 'Guinea Fowl',
    type: 'Guinea fowl (meat / free-range)',
    breeds: 'Pearl (most common), White, Lavender',
    maturity: '~16–24 weeks (varies)',
    weight: '0.7–1.6 kg (adult; sex/variety dependent)',
    diseases: [
      'Coccidiosis',
      'Internal and external parasites',
      'Respiratory diseases',
      'Similar management concerns as chickens',
      'Susceptible to Newcastle disease'
    ],
    vaccinations: [
      'Vaccinate against Newcastle Disease',
      'Often reared extensively with minimal intervention',
      'Deworming program recommended',
      'Follow local disease prevalence guidelines'
    ],
    image: Guinea,
    icon: <Feather className="h-5 w-5" />
  },
  pigeon: {
    name: 'Pigeon (Squab)',
    type: 'Pigeon / squab (meat)',
    breeds: 'White King, French Mondain, utility Homers, Carneau',
    maturity: 'Squab ready at ~3–4 weeks for consumption',
    weight: 'Squab ≈ 300–600 g (breed dependent)',
    diseases: [
      'Paramyxovirus (PMV1)',
      'Coccidiosis',
      'Respiratory infections',
      'Trichomoniasis (canker)',
      'External parasites'
    ],
    vaccinations: [
      'Vaccination for paramyxovirus recommended',
      'Emphasize biosecurity and hygiene',
      'Regular deworming program',
      'Consult with avian veterinarian for specific protocols'
    ],
    image: Pigeon,
    icon: <Feather className="h-5 w-5" />
  },
  emu: {
    name: 'Emu',
    type: 'Ratite (emu) — niche/alternative poultry',
    breeds: 'Emu (Dromaius novaehollandiae) — single species farmed',
    maturity: 'Sexual maturity 18–24 months; fatten/market ~14–18 months',
    weight: 'Adults ≈ 45–65 kg',
    diseases: [
      'Bacterial infections',
      'Parasitic infections',
      'Nutritional deficiencies',
      'Requires specialist management',
      'Foot and leg problems'
    ],
    vaccinations: [
      'Species-specific health programs required',
      'Consult specialist vets',
      'Focus on biosecurity',
      'Regular health monitoring essential'
    ],
    image: EMu,
    icon: <Feather className="h-5 w-5" />
  },
  ostrich: {
    name: 'Ostrich',
    type: 'Ratite (ostrich) — niche/alternative poultry',
    breeds: 'Ostrich (Struthio camelus) — farmed varieties',
    maturity: 'Slaughter commonly ~12 months (varies by management)',
    weight: 'Adults often 80–100+ kg (sex and management dependent)',
    diseases: [
      'Species-specific bacterial diseases',
      'Parasitic diseases',
      'Nutritional disorders',
      'Gastrointestinal issues',
      'Leg and foot problems'
    ],
    vaccinations: [
      'Specialized vaccination required',
      'Health management by specialists',
      'Strict biosecurity measures',
      'Regular veterinary check-ups'
    ],
    image: Ostrich,
    icon: <Feather className="h-5 w-5" />
  }
};

// Pig data with comprehensive breed information
const pigData = {
  yorkshire: {
    name: 'Large White Yorkshire',
    type: 'Exotic breed (widely used in India)',
    marketAge: '8–10 months (fattening)',
    weight: '90–120 kg at market; adults can reach 250–350 kg',
    diseases: [
      'Swine fever',
      'Swine erysipelas',
      'Foot and mouth disease (FMD)',
      'Swine dysentery',
      'Parasitic infestations'
    ],
    vaccinations: [
      'Classical swine fever (CSF)',
      'Swine erysipelas',
      'FMD',
      'Deworming routine'
    ],
    image: Yorkshire,
    icon: <PiggyBank className="h-5 w-5" />
  },
  landrace: {
    name: 'Landrace',
    type: 'Exotic breed (imported, popular in India for crossbreeding)',
    marketAge: '8–10 months',
    weight: '100–130 kg market; adults 250–300 kg',
    diseases: [
      'Swine fever',
      'Pneumonia',
      'Helminthiasis',
      'Bacterial enteritis'
    ],
    vaccinations: [
      'CSF vaccine',
      'FMD vaccine',
      'Routine deworming'
    ],
    image: Landrace,
    icon: <PiggyBank className="h-5 w-5" />
  },
  duroc: {
    name: 'Duroc',
    type: 'Exotic breed (known for rapid growth & meat quality)',
    marketAge: '8–9 months',
    weight: 'Market 100–120 kg; adults 300–400 kg',
    diseases: [
      'CSF',
      'FMD',
      'Swine erysipelas',
      'Skin issues in hot climates'
    ],
    vaccinations: [
      'CSF',
      'FMD',
      'Erysipelas',
      'Deworming'
    ],
    image: Duroc,
    icon: <PiggyBank className="h-5 w-5" />
  },
  hampshire: {
    name: 'Hampshire',
    type: 'Exotic breed (meat purpose, often crossbred in India)',
    marketAge: '8–9 months',
    weight: '90–120 kg market; adults 250–300+ kg',
    diseases: [
      'Swine fever',
      'Mange',
      'Parasitic worms'
    ],
    vaccinations: [
      'CSF',
      'FMD',
      'Erysipelas',
      'Mange treatment/deworming'
    ],
    image: Hampshire,
    icon: <PiggyBank className="h-5 w-5" />
  },
  indigenous: {
    name: 'Indigenous Breeds (India)',
    type: 'Native breeds',
    marketAge: '10–12 months (slower growth than exotic breeds)',
    weight: 'Market 60–100 kg; adults 150–200 kg (varies)',
    diseases: [
      'CSF',
      'Worms',
      'Mange',
      'Bacterial infections'
    ],
    vaccinations: [
      'CSF',
      'FMD',
      'Erysipelas',
      'Deworming common'
    ],
    image: IndigenousBreedsIndia,
    icon: <PiggyBank className="h-5 w-5" />
  },
  crossbreeds: {
    name: 'Crossbreeds (Exotic × Indigenous)',
    type: 'Hybrid breeds',
    marketAge: '8–10 months',
    weight: 'Market 80–120 kg',
    diseases: [
      'CSF',
      'FMD',
      'Parasites',
      'Usually more hardy'
    ],
    vaccinations: [
      'CSF',
      'FMD',
      'Erysipelas',
      'Regular deworming'
    ],
    image: Crossbreeds,
    icon: <PiggyBank className="h-5 w-5" />
  }
};

export default function AnimalProfile() {
  const [activeTab, setActiveTab] = useState('poultry');
  const [activePoultryTab, setActivePoultryTab] = useState('broiler');
  const [activePigTab, setActivePigTab] = useState('yorkshire');
  const [isImageLoading, setIsImageLoading] = useState(true);

  const bird = birdData[activePoultryTab];
  const pig = pigData[activePigTab];
  const currentProfile = activeTab === 'poultry' ? bird : pig;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const tabVariants = {
    inactive: { scale: 1 },
    active: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative z-10 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <motion.div
            className="text-center mb-12"
            variants={itemVariants}
          >
            <motion.div
              className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-6 shadow-lg"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Activity className="h-10 w-10 text-white" />
            </motion.div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-4">
              {activeTab === 'poultry' ? 'Poultry Profiles' : 'Livestock Profiles'}
            </h1>
            <motion.p
              className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {activeTab === 'poultry'
                ? 'Discover comprehensive guides to different poultry farming practices'
                : 'Explore detailed livestock farming and management techniques'
              }
            </motion.p>
          </motion.div>

          {/* Enhanced Main Tabs */}
          <motion.div className="mb-12" variants={itemVariants}>
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
              <div className="border-b border-green-100">
                <nav className="flex" aria-label="Main Tabs">
                  <motion.button
                    onClick={() => setActiveTab('poultry')}
                    className={`relative py-6 px-8 font-semibold text-lg flex items-center space-x-3 transition-all duration-300 ${
                      activeTab === 'poultry'
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-25'
                    }`}
                    variants={tabVariants}
                    animate={activeTab === 'poultry' ? 'active' : 'inactive'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Bird className="h-6 w-6" />
                    <span>POULTRY PROFILES</span>
                    {activeTab === 'poultry' && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"
                        layoutId="activeTab"
                      />
                    )}
                  </motion.button>
                  <motion.button
                    onClick={() => setActiveTab('pig')}
                    className={`relative py-6 px-8 font-semibold text-lg flex items-center space-x-3 transition-all duration-300 ${
                      activeTab === 'pig'
                        ? 'text-green-600 bg-green-50'
                        : 'text-gray-600 hover:text-green-600 hover:bg-green-25'
                    }`}
                    variants={tabVariants}
                    animate={activeTab === 'pig' ? 'active' : 'inactive'}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <PiggyBank className="h-6 w-6" />
                    <span>PIG PROFILES</span>
                    {activeTab === 'pig' && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-emerald-500"
                        layoutId="activeTab"
                      />
                    )}
                  </motion.button>
                </nav>
              </div>
            </div>
          </motion.div>

          {/* Enhanced Sub-tabs */}
          <AnimatePresence mode="wait">
            {activeTab === 'poultry' && (
              <motion.div
                key="poultry-tabs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                  <div className="border-b border-green-100 p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                    <h3 className="text-lg font-semibold text-green-700 flex items-center">
                      <Bird className="h-5 w-5 mr-2" />
                      Select Poultry Type
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                      {Object.entries(birdData).map(([key, { name, icon }]) => (
                        <motion.button
                          key={key}
                          onClick={() => setActivePoultryTab(key)}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                            activePoultryTab === key
                              ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={`p-2 rounded-full ${
                            activePoultryTab === key ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {icon}
                          </div>
                          <span className={`text-sm font-medium text-center ${
                            activePoultryTab === key ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {name.split(' ')[0]}
                          </span>
                          {activePoultryTab === key && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'pig' && (
              <motion.div
                key="pig-tabs"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-green-100 overflow-hidden">
                  <div className="border-b border-green-100 p-4 bg-gradient-to-r from-green-50 to-emerald-50">
                    <h3 className="text-lg font-semibold text-green-700 flex items-center">
                      <PiggyBank className="h-5 w-5 mr-2" />
                      Select Pig Breed
                    </h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                      {Object.entries(pigData).map(([key, { name, icon }]) => (
                        <motion.button
                          key={key}
                          onClick={() => setActivePigTab(key)}
                          className={`relative p-4 rounded-xl border-2 transition-all duration-300 flex flex-col items-center space-y-2 ${
                            activePigTab === key
                              ? 'border-green-400 bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg'
                              : 'border-gray-200 bg-white hover:border-green-300 hover:shadow-md'
                          }`}
                          whileHover={{ scale: 1.05, y: -2 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <div className={`p-2 rounded-full ${
                            activePigTab === key ? 'bg-green-100' : 'bg-gray-100'
                          }`}>
                            {icon}
                          </div>
                          <span className={`text-sm font-medium text-center ${
                            activePigTab === key ? 'text-green-700' : 'text-gray-600'
                          }`}>
                            {name.split(' ')[0]}
                          </span>
                          {activePigTab === key && (
                            <motion.div
                              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full"
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Enhanced Content Card */}
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-green-100 overflow-hidden"
            variants={itemVariants}
            key={`${activeTab}-${activeTab === 'poultry' ? activePoultryTab : activePigTab}`}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-8">
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Column - Image and Basic Info */}
                <div className="space-y-8">
                  <motion.div
                    className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-green-100 to-emerald-100"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                  >
                    {isImageLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-green-100">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          className="w-8 h-8 border-2 border-green-300 border-t-green-600 rounded-full"
                        />
                      </div>
                    )}
                    <motion.img
                      src={currentProfile.image}
                      alt={`${currentProfile.name} illustration`}
                      className="w-full h-80 object-cover"
                      onLoad={() => setIsImageLoading(false)}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/400x300?text=Image+Not+Available';
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: isImageLoading ? 0 : 1 }}
                      transition={{ duration: 0.5 }}
                    />
                    <div className="absolute top-4 left-4">
                      <motion.div
                        className="bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-md"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="text-sm font-medium text-green-700 flex items-center">
                          <Heart className="h-4 w-4 mr-1 text-red-500" />
                          {currentProfile.name.split(' ')[0]}
                        </span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-2xl border border-green-200 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h2 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
                      <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                        {currentProfile.name}
                      </span>
                    </h2>
                    <div className="space-y-4">
                      {[
                        { label: 'Type', value: currentProfile.type, icon: <Layers className="h-4 w-4" /> },
                        { label: 'Market Age', value: currentProfile.marketAge, icon: <Activity className="h-4 w-4" /> },
                        { label: 'Weight Range', value: currentProfile.weight, icon: <Hash className="h-4 w-4" /> }
                      ].map((item, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start p-3 bg-white/50 rounded-lg"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.3 + index * 0.1 }}
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3">
                            <span className="text-green-600">{item.icon}</span>
                          </div>
                          <div className="flex-1">
                            <span className="font-semibold text-gray-700 block">{item.label}:</span>
                            <span className="text-gray-600">{item.value}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>

                {/* Right Column - Diseases and Vaccinations */}
                <div className="space-y-8">
                  <motion.div
                    className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl border border-red-200 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="flex items-center mb-4">
                      <Shield className="h-6 w-6 text-red-500 mr-2" />
                      <h3 className="text-xl font-bold text-red-700">Common Diseases</h3>
                    </div>
                    <div className="space-y-3">
                      {currentProfile.diseases.map((disease, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start p-3 bg-white/60 rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 + index * 0.1 }}
                        >
                          <span className="text-red-500 mr-3 mt-1">⚠️</span>
                          <span className="text-gray-700">{disease}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-blue-50 to-cyan-50 p-6 rounded-2xl border border-blue-200 shadow-lg"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="flex items-center mb-4">
                      <Activity className="h-6 w-6 text-blue-500 mr-2" />
                      <h3 className="text-xl font-bold text-blue-700">Vaccination Schedule</h3>
                    </div>
                    <div className="space-y-4">
                      {currentProfile.vaccinations.map((vaccine, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start p-4 bg-white/60 rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 + index * 0.1 }}
                        >
                          <span className="bg-gradient-to-r from-blue-400 to-cyan-400 text-white text-sm font-bold px-3 py-1 rounded-full mr-4 flex-shrink-0">
                            {index + 1}
                          </span>
                          <span className="text-gray-700 pt-1">{vaccine}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    className="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-2xl border border-yellow-200 shadow-lg"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <div className="flex items-center mb-4">
                      <Heart className="h-6 w-6 text-yellow-500 mr-2" />
                      <h3 className="text-xl font-bold text-yellow-700">Management Tips</h3>
                    </div>
                    <div className="space-y-3">
                      {[
                        'Maintain proper biosecurity measures',
                        'Provide clean water and balanced nutrition',
                        'Monitor for signs of disease regularly',
                        'Consult with a veterinarian for specific health concerns'
                      ].map((tip, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start p-3 bg-white/60 rounded-lg"
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.6 + index * 0.1 }}
                        >
                          <span className="text-yellow-500 mr-3">💡</span>
                          <span className="text-gray-700">{tip}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </div>
              </div>

              <motion.div
                className="mt-12 bg-gradient-to-r from-gray-50 to-green-50 p-8 rounded-2xl border border-green-100"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">Important Notes</h3>
                    <p className="text-gray-700 leading-relaxed">
                      The information provided is a general guideline for educational purposes.
                      Always consult with local agricultural extension services or a qualified
                      veterinarian for advice specific to your region and farming conditions.
                      Management practices, disease prevalence, and vaccination schedules may
                      vary based on location and specific farm conditions.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
