import React, { useState } from 'react';
import { Shield, FileText, ChevronDown, Stethoscope, Users, Wheat, Syringe, Wand2, Activity, AlertTriangle, CheckCircle, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function RiskAssessmentPage() {
  const [form, setForm] = useState({
    sectionTitle: '',
    unitName: '',
    vaccinationLevel: 'standard',
    biosecurityMeasures: '',
    visitorProtocol: 'controlled-access',
    feedSource: 'certified-supplier',
    diseaseHistory: ''
  });

  const [result, setResult] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  React.useEffect(() => {
    // Trigger entry animations after mount
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const generateAssessment = (e) => {
    e.preventDefault();

    // Simple heuristic-based mock assessment (can be replaced with real AI later)
    let riskScore = 50;

    // Vaccination impact
    if (form.vaccinationLevel === 'none') riskScore += 20;
    if (form.vaccinationLevel === 'basic') riskScore += 10;
    if (form.vaccinationLevel === 'comprehensive') riskScore -= 10;

    // Visitor protocol
    if (form.visitorProtocol === 'none') riskScore += 15;
    if (form.visitorProtocol === 'sign-in') riskScore += 5;

    // Feed source
    if (form.feedSource === 'on-farm') riskScore += 5;
    if (form.feedSource === 'local-supplier') riskScore += 10;
    if (form.feedSource === 'mixed') riskScore += 5;
    if (form.feedSource === 'certified-supplier') riskScore -= 10;

    // Disease history heuristic
    const history = form.diseaseHistory.toLowerCase();
    if (history.includes('frequent') || history.includes('outbreak')) riskScore += 20;
    else if (history.includes('occasional')) riskScore += 10;
    else if (history.includes('none') || history.trim() === '') riskScore -= 5;

    riskScore = Math.max(0, Math.min(100, riskScore));

    let riskLevel = 'Moderate';
    let color = 'text-yellow-700 bg-yellow-50 border-yellow-200';
    if (riskScore < 35) { riskLevel = 'Low'; color = 'text-green-700 bg-green-50 border-green-200'; }
    if (riskScore >= 65) { riskLevel = 'High'; color = 'text-red-700 bg-red-50 border-red-200'; }

    const recommendations = [];
    if (form.vaccinationLevel === 'none' || form.vaccinationLevel === 'basic') {
      recommendations.push('Upgrade vaccination program to standard/comprehensive based on species and regional risks.');
    }
    if (form.visitorProtocol !== 'controlled-access') {
      recommendations.push('Implement controlled access with sign-in, PPE, and supervised entry for all visitors.');
    }
    if (form.biosecurityMeasures.trim().length < 30) {
      recommendations.push('Document and enforce detailed biosecurity SOPs (entry protocol, disinfection, quarantine, traffic flow).');
    }
    if (form.feedSource !== 'certified-supplier') {
      recommendations.push('Source feed from certified suppliers and keep traceability records.');
    }
    if (!recommendations.length) {
      recommendations.push('Your biosecurity posture looks strong. Maintain logs and periodic audits.');
    }

    setResult({ riskScore, riskLevel, color, recommendations });
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header banner */}
        <div className={`relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-emerald-600 to-green-500 text-white shadow-lg transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <div className="absolute inset-0 opacity-20">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" viewBox="0 0 800 200">
              <g fill="currentColor">
                <circle cx="50" cy="50" r="20" />
                <circle cx="200" cy="120" r="14" />
                <circle cx="380" cy="60" r="10" />
                <circle cx="620" cy="140" r="16" />
                <circle cx="740" cy="40" r="8" />
              </g>
            </svg>
          </div>
          <div className="relative px-6 py-6 flex items-center">
            <div className="p-3 bg-white/15 rounded-xl ring-1 ring-white/30 mr-4">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Risk Assessment Input</h1>
              <p className="text-white/90 text-sm md:text-base">Provide details about your farm's biosecurity to generate an AI-assisted risk assessment.</p>
            </div>
          </div>
        </div>

        <form onSubmit={generateAssessment} className="space-y-6">
          {/* 1. Section Title */}
          <div className={`bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            style={{ transitionDelay: '50ms' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">1. Section Title</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Section Title</label>
                <input
                  type="text"
                  name="sectionTitle"
                  value={form.sectionTitle}
                  onChange={onChange}
                  placeholder="e.g., Dairy Unit Risk Assessment"
                  className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Farm/Unit Name</label>
                <input
                  type="text"
                  name="unitName"
                  value={form.unitName}
                  onChange={onChange}
                  placeholder="e.g., GreenFields Dairy"
                  className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* 2. Input Fields */}
          <div className={`bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            style={{ transitionDelay: '100ms' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">2. Input Fields</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Visitor Protocol</label>
                <select
                  name="visitorProtocol"
                  value={form.visitorProtocol}
                  onChange={onChange}
                  className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="none">None</option>
                  <option value="sign-in">Sign-in Only</option>
                  <option value="controlled-access">Controlled Access (recommended)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Feed Source</label>
                <select
                  name="feedSource"
                  value={form.feedSource}
                  onChange={onChange}
                  className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="on-farm">On-farm</option>
                  <option value="local-supplier">Local Supplier</option>
                  <option value="certified-supplier">Certified Supplier</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>
          </div>

          {/* 3. Vaccination Program */}
          <div className={`bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            style={{ transitionDelay: '150ms' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3 flex items-center"><Syringe className="w-4 h-4 mr-2 text-emerald-600" />3. Vaccination Program</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Program Level</label>
                <select
                  name="vaccinationLevel"
                  value={form.vaccinationLevel}
                  onChange={onChange}
                  className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="none">None</option>
                  <option value="basic">Basic</option>
                  <option value="standard">Standard</option>
                  <option value="comprehensive">Comprehensive</option>
                </select>
              </div>
            </div>
          </div>

          {/* 4. Current Biosecurity Measures */}
          <div className={`bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            style={{ transitionDelay: '200ms' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">4. Current Biosecurity Measures</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Describe current biosecurity protocols</label>
            <textarea
              name="biosecurityMeasures"
              value={form.biosecurityMeasures}
              onChange={onChange}
              rows={4}
              placeholder="Examples: disinfection stations, controlled access, quarantine procedures"
              className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* 5. Disease History */}
          <div className={`bg-white/90 backdrop-blur-sm border border-emerald-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}
            style={{ transitionDelay: '350ms' }}>
            <h2 className="text-lg font-semibold text-gray-900 mb-3">5. Disease History</h2>
            <label className="block text-sm font-medium text-gray-700 mb-1">Describe any disease outbreaks or health issues</label>
            <textarea
              name="diseaseHistory"
              value={form.diseaseHistory}
              onChange={onChange}
              rows={4}
              placeholder="Examples: none, occasional respiratory issues, frequent digestive problems"
              className="w-full rounded-md border-gray-300 focus:ring-emerald-500 focus:border-emerald-500"
            />
          </div>

          {/* Action Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="group inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 shadow-emerald-500/20 hover:shadow-emerald-500/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <Wand2 className="w-5 h-5 mr-2 transform transition-transform duration-300 group-hover:rotate-12" />
              Generate AI Risk Assessment
            </button>
          </div>
        </form>

        {/* Result */}
        {result && (
          <div className={`mt-8 border rounded-2xl p-6 ring-1 ${result.color} transition-all duration-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'}`}>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold">Risk Level: {result.riskLevel}</h3>
                <p className="text-sm text-gray-600 mt-1">Estimated score: {result.riskScore}/100</p>
              </div>
            </div>
            {/* Risk meter */}
            <div className="mt-4">
              <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${result.riskScore < 35
                      ? 'bg-green-500'
                      : result.riskScore < 65
                        ? 'bg-yellow-500'
                        : 'bg-red-500'
                    }`}
                  style={{ width: `${result.riskScore}%` }}
                />
              </div>
            </div>
            <div className="mt-5">
              <h4 className="font-medium mb-2">Recommendations</h4>
              <ul className="space-y-2 text-sm">
                {result.recommendations.map((rec, i) => (
                  <li key={i} className="flex items-start">
                    <span className="mt-1 mr-2 h-2 w-2 rounded-full bg-emerald-500 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
