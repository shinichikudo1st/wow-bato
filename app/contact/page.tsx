"use client";

import ContactForm from "@/components/ui/contact/contactForm";
import ContactInfoCard from "@/components/ui/contact/contactInfoCard";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
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
                <span className="text-sm font-medium text-blue-600">
                  Get in Touch
                </span>
              </div>

              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Contact{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
                  Us
                </span>
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                Have questions or need assistance? We're here to help you with
                any inquiries about WOW-BATO.
              </p>

              <ContactForm />
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

                  <ContactInfoCard />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
