"use client"

import { useRouter } from 'next/navigation';
import { 
  FiMail, 
  FiPhone, 
  FiMapPin, 
  FiSend, 
} from 'react-icons/fi';

export default function ContactPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-grid-slate-900/[0.04] bg-[size:32px] -z-10" />
        <div className="absolute inset-y-0 right-0 w-1/2 bg-blue-50/50 -z-10 backdrop-blur-3xl" />
        <div className="absolute top-0 left-1/2 w-96 h-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-100/30 blur-3xl" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Contact Form */}
            <div className="text-left space-y-8">
              <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 border border-blue-100 animate-fade-in">
                <span className="flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-2 w-2 rounded-full bg-blue-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                </span>
                <span className="text-sm font-medium text-blue-600">Get in Touch</span>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">Us</span>
              </h1>
              
              <p className="text-xl text-gray-600 leading-relaxed">
                Have questions or need assistance? We're here to help you with any inquiries about WOW-BATO.
              </p>

              {/* Contact Form */}
              <div className="bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-lg space-y-6">
                <div className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="How can we help you?"
                    />
                  </div>
                </div>
                <button className="w-full inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                  Send Message
                  <FiSend className="ml-2 w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Right Column - Contact Information */}
            <div className="relative lg:h-[600px]">
              <div className="absolute inset-0 bg-blue-50 rounded-3xl transform rotate-3 shadow-lg" />
              <div className="absolute inset-0 bg-white rounded-3xl transform -rotate-3 shadow-lg">
                <div className="p-8 space-y-8">
                  <div className="flex items-center space-x-4 mb-8">
                    <div className="w-3 h-3 rounded-full bg-red-400" />
                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                  </div>

                  {/* Contact Information Cards */}
                  <div className="space-y-6">
                    <div className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiMapPin className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Visit Us</h3>
                        <p className="text-gray-600 mt-1">123 Main Office Building<br />Batangas City, Philippines</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiPhone className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Call Us</h3>
                        <p className="text-gray-600 mt-1">+63 (43) 123-4567<br />Monday to Friday, 8AM to 5PM</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4 p-6 bg-blue-50/50 rounded-xl">
                      <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                        <FiMail className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">Email Us</h3>
                        <p className="text-gray-600 mt-1">support@wowbato.gov.ph<br />We'll respond within 24 hours</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}