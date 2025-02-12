import Image from 'next/image';
import { FiAward, FiTarget, FiUsers, FiTrendingUp, FiArrowRight, FiCheck } from 'react-icons/fi';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Enhanced Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px] -z-10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50/50 -z-10 backdrop-blur-3xl" />
        <div className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/30 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-left space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 animate-fade-in">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-600">Transforming Local Governance</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                About <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">WOW-BATO</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Empowering barangays through innovative digital solutions for efficient project management 
                and transparent governance.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Get Started
                  <FiArrowRight className="ml-2 w-5 h-5" />
                </button>
                <button className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-blue-600 bg-blue-50 hover:bg-blue-100 transition-all duration-300">
                  Learn More
                </button>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                {[
                  { number: "100+", label: "Barangays" },
                  { number: "1000+", label: "Projects" },
                  { number: "95%", label: "Satisfaction" }
                ].map((stat, index) => (
                  <div key={index} className="text-center p-4 bg-white/60 backdrop-blur-lg rounded-lg shadow-sm">
                    <div className="text-2xl font-bold text-blue-600">{stat.number}</div>
                    <div className="text-sm text-gray-600">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Elements */}
            <div className="relative lg:h-[600px] hidden lg:block">
              <div className="absolute inset-0 bg-blue-50 rounded-3xl transform rotate-3 shadow-lg" />
              <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-3 shadow-lg">
                <div className="p-8 space-y-6">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>
                  
                  {/* Feature List */}
                  {[
                    "Real-time Project Tracking",
                    "Transparent Governance",
                    "Community Engagement",
                    "Efficient Resource Management"
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center space-x-3 p-4 bg-blue-50/50 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiCheck className="w-4 h-4 text-blue-600" />
                      </div>
                      <span className="text-gray-700 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision with enhanced styling */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur-lg relative">
        <div className="absolute inset-0 bg-grid-slate-900/[0.02] bg-[size:24px]" />
        <div className="max-w-7xl mx-auto relative">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-50">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                  <FiTarget className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Our Mission</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To provide a comprehensive digital platform that streamlines barangay project management,
                  enhances community engagement, and promotes transparency in local governance.
                </p>
              </div>
            </div>
            <div className="transform hover:scale-105 transition-transform duration-300">
              <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300 border border-blue-50">
                <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 mb-6">
                  <FiTrendingUp className="text-blue-600" />
                  <span className="text-sm font-medium text-blue-600">Our Vision</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  To be the leading digital solution that transforms barangay administration across the Philippines,
                  fostering efficient, transparent, and community-driven local governance.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Key Features */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Key Features</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FiUsers className="w-6 h-6" />,
                title: "User-Friendly Interface",
                description: "Intuitive design that makes project management accessible to all barangay officials"
              },
              {
                icon: <FiAward className="w-6 h-6" />,
                title: "Project Tracking",
                description: "Real-time monitoring of project progress, budgets, and timelines"
              },
              {
                icon: <FiTarget className="w-6 h-6" />,
                title: "Transparency",
                description: "Clear reporting and documentation of all barangay projects and initiatives"
              }
            ].map((feature, index) => (
              <div key={index} 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100">
                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Ready to Transform Your Barangay?</h2>
          <p className="text-gray-600 mb-8 text-lg">
            Join the growing number of barangays that are revolutionizing their project management with WOW-BATO.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
              Get Started Now
              <FiArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}