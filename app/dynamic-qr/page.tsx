'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicQRGenerator from '@/components/DynamicQRGenerator';
import DynamicQRPreview from '@/components/DynamicQRPreview';

export default function DynamicQRPage() {
  const [activeTab, setActiveTab] = useState('generator');

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-12 px-4">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Dynamic%20QR%20code%20technology%20with%20real-time%20data%20visualization%2C%20interactive%20digital%20elements%2C%20modern%20tech%20background%20with%20flowing%20data%20streams%2C%20holographic%20QR%20codes%2C%20blue%20and%20purple%20gradients%2C%20futuristic%20interface%20design&width=1920&height=1080&seq=dynamic-qr-hero&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Dynamic QR Codes
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              That Update in Real-Time
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Create QR codes that can be updated without reprinting. Perfect for campaigns, menus, and dynamic content.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button 
              onClick={() => setActiveTab('generator')}
              className={`px-8 py-4 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                activeTab === 'generator' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-qr-code-fill mr-2 text-xl"></i>
              QR Generator
            </button>
            <button 
              onClick={() => setActiveTab('preview')}
              className={`px-8 py-4 font-semibold rounded-xl transition-all duration-200 whitespace-nowrap ${
                activeTab === 'preview' 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg transform scale-105' 
                  : 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50'
              }`}
            >
              <i className="ri-eye-line mr-2"></i>
              Live Preview
            </button>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'generator' ? (
            <DynamicQRGenerator />
          ) : (
            <DynamicQRPreview />
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Dynamic QR Features</h2>
            <p className="text-xl text-gray-600">Why choose dynamic over static QR codes?</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-refresh-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Real-Time Updates</h3>
              <p className="text-gray-600">Change your QR code destination without reprinting. Update content instantly.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-bar-chart-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Advanced Analytics</h3>
              <p className="text-gray-600">Track scans, locations, devices, and user behavior with detailed insights.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-timer-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Campaign Scheduling</h3>
              <p className="text-gray-600">Schedule different destinations for different times and dates automatically.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-map-pin-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Geo-Targeting</h3>
              <p className="text-gray-600">Show different content based on user location for personalized experiences.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-smartphone-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Device Detection</h3>
              <p className="text-gray-600">Redirect users to different pages based on their device type and capabilities.</p>
            </div>

            <div className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mb-6">
                <i className="ri-shield-check-line text-white text-2xl"></i>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Password Protection</h3>
              <p className="text-gray-600">Secure your QR codes with password protection and access controls.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}