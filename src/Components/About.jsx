import Card from './Card';
import { Shield, Users, Clock, Heart, Activity, Leaf } from "lucide-react";
import { motion } from 'framer-motion';

// Destructure the Card components from your custom Card
const { Header: CardHeader, Title: CardTitle, Content: CardContent, Description: CardDescription } = Card;

export default function AboutPage() {
  const features = [
    {
      title: "Biosecurity Management",
      description: "Comprehensive tools to implement and monitor biosecurity protocols across your farm operations.",
      icon: <Shield className="h-8 w-8 text-green-600" />
    },
    {
      title: "Real-time Monitoring",
      description: "Track animal health, environmental conditions, and farm activities with live data feeds.",
      icon: <Clock className="h-8 w-8 text-blue-600" />
    },
    {
      title: "Expert Guidance",
      description: "Access to veterinary expertise and best practices for pig and poultry farmer.",
      icon: <Users className="h-8 w-8 text-purple-600" />
    }
  ];

  const biosecurityMeasures = [
    {
      title: "Hygiene Protocols",
      description: "Strict sanitation procedures for personnel, equipment, and facilities to prevent pathogen spread.",
      icon: <Heart className="h-6 w-6 text-red-500" />
    },
    {
      title: "Vaccination Programs",
      description: "Customized immunization schedules to protect livestock from common diseases.",
      icon: <Shield className="h-6 w-6 text-blue-500" />
    },
    {
      title: "Health Monitoring",
      description: "Continuous surveillance systems to detect early signs of illness or distress.",
      icon: <Clock className="h-6 w-6 text-green-500" />
    },
    {
      title: "Access Control",
      description: "Restricted entry systems to minimize exposure to external contaminants.",
      icon: <Users className="h-6 w-6 text-purple-500" />
    }
  ];

  // Enhanced animation variants
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

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12 px-4 sm:px-6 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-6xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <motion.div
          className="text-center mb-20"
          variants={itemVariants}
        >
          <motion.div
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-8 shadow-2xl"
            whileHover={{ scale: 1.1, rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Activity className="h-10 w-10 text-white" />
          </motion.div>

          <motion.span
            className="inline-block text-sm tracking-wider font-semibold text-emerald-700 bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200 px-4 py-2 rounded-full mb-6 shadow-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
          >
            About Our Platform
          </motion.span>

          <motion.h1
            className="text-5xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-green-700 via-emerald-600 to-green-600 bg-clip-text text-transparent leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Digital Farm Management Portal
          </motion.h1>

          <motion.div
            className="max-w-3xl mx-auto"
            variants={itemVariants}
          >
            <motion.p
              className="text-xl text-gray-700 mb-6 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              Empowering farmers with smart tools to enhance productivity and implement critical biosecurity measures.
            </motion.p>
            <motion.p
              className="text-lg text-gray-600 leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Our platform provides farmers with the tools they need to maintain optimal biosecurity standards
              while maximizing productivity and ensuring animal welfare.
            </motion.p>
          </motion.div>
        </motion.div>

        {/* Enhanced Introduction Section */}
        <motion.div
          variants={itemVariants}
          className="mb-20"
        >
          <motion.div
            className="bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-green-100 relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Card background gradient */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50 opacity-0 hover:opacity-100 transition-opacity duration-300"
              initial={false}
            />

            <CardHeader className="relative z-10">
              <motion.div
                className="flex items-center mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <Leaf className="h-6 w-6 text-green-600 mr-2" />
                <CardTitle className="text-3xl md:text-4xl font-bold text-green-700">Our Mission</CardTitle>
              </motion.div>
            </CardHeader>
            <CardContent className="relative z-10">
              <motion.p
                className="text-gray-700 mb-6 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                The Digital Farm Management Portal is designed to revolutionize pig and poultry farming through technology-driven solutions.
                Our platform provides farmers with the tools they need to maintain optimal biosecurity standards while maximizing productivity
                and ensuring animal welfare.
              </motion.p>
              <motion.p
                className="text-gray-700 leading-relaxed text-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                We believe that modern agriculture requires modern solutions. By integrating real-time monitoring, data analytics,
                and expert guidance, we help farmers make informed decisions that protect their livestock and livelihoods.
              </motion.p>
            </CardContent>
          </motion.div>
        </motion.div>

        {/* Enhanced Key Features */}
        <section className="mb-20">
          <motion.h2
            className="text-4xl font-bold text-center text-green-800 mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Key Features
          </motion.h2>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -8,
                  scale: 1.02,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <motion.div
                  className="h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100 relative overflow-hidden"
                  variants={cardVariants}
                >
                  {/* Card hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className="mb-6 flex justify-center"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-4 rounded-2xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                        {feature.icon}
                      </div>
                    </motion.div>

                    <CardTitle className="text-center text-green-700 mb-4 text-xl font-bold group-hover:text-green-800 transition-colors duration-300">
                      {feature.title}
                    </CardTitle>

                    <p className="text-gray-600 text-center leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                      {feature.description}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Enhanced Biosecurity Measures */}
        <section>
          <motion.h2
            className="text-4xl font-bold text-center text-green-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Biosecurity Measures
          </motion.h2>

          <motion.p
            className="text-gray-600 text-center mb-16 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Protecting your livestock from disease is critical to farm success. Our portal helps you implement comprehensive biosecurity protocols.
          </motion.p>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            {biosecurityMeasures.map((measure, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  scale: 1.01,
                  transition: { duration: 0.3 }
                }}
                className="group"
              >
                <motion.div
                  className="h-full bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all duration-500 border border-green-100 relative overflow-hidden"
                  variants={cardVariants}
                >
                  {/* Card hover effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-green-50 to-emerald-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    initial={false}
                  />

                  <div className="relative z-10 flex items-start">
                    <motion.div
                      className="mr-5 mt-1"
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-green-100 p-2 rounded-full shadow-md">
                        {measure.icon}
                      </div>
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-green-700 mb-3 group-hover:text-green-800 transition-colors duration-300">
                        {measure.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">
                        {measure.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* Enhanced Closing Statement */}
        <motion.div
          className="mt-20 text-center py-12 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-100 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.div
            className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full mb-6 shadow-xl"
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
          >
            <Heart className="h-8 w-8 text-white" />
          </motion.div>

          <motion.p
            className="text-gray-700 max-w-3xl mx-auto text-lg leading-relaxed"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of farmers who trust our platform to protect their livestock and optimize their operations.
            Together, we're building a safer, more sustainable future for agriculture.
          </motion.p>
        </motion.div>
      </div>
    </motion.div>
  );
}