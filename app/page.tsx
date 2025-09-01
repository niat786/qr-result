
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import QRGenerator from '@/components/QRGenerator';
import FeatureCard from '@/components/FeatureCard';

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState('links');

  const qrCategories = [
    {
      id: 'links',
      title: 'Links',
      icon: 'ri-link',
      description: 'Website, Social, App, Cloud/File, Landing/Campaign, Coupon',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'info',
      title: 'Info',
      icon: 'ri-user-line',
      description: 'vCard, MeCard, Digital Biz Card, Email, Email Msg',
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'comms',
      title: 'Communications',
      icon: 'ri-phone-line',
      description: 'Phone, SMS, WhatsApp, Telegram, Messenger, Skype, Zoom',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'location',
      title: 'Location',
      icon: 'ri-map-pin-line',
      description: 'Maps, GPS, Event, Booking',
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'connection',
      title: 'Connection',
      icon: 'ri-wifi-line',
      description: 'Wi-Fi, Bluetooth',
      color: 'from-indigo-500 to-blue-500'
    },
    {
      id: 'payment',
      title: 'Payment',
      icon: 'ri-bank-card-line',
      description: 'PayPal, Venmo, CashApp, Stripe, UPI, WeChat, Crypto',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'events',
      title: 'Events',
      icon: 'ri-calendar-line',
      description: 'Calendar, Tickets, Music, Video, Gallery, PDF',
      color: 'from-teal-500 to-cyan-500'
    },
    {
      id: 'utility',
      title: 'Utility',
      icon: 'ri-tools-line',
      description: 'Text, Notes, Coupon, Survey, Menu, Product, Login, AR/VR',
      color: 'from-gray-500 to-slate-600'
    }
  ];

  const features = [
    {
      icon: 'ri-gift-line',
      title: '100% Free Forever',
      description: 'Generate unlimited QR codes with no restrictions or hidden fees'
    },
    {
      icon: 'ri-palette-line',
      title: 'Maximum Customization',
      description: 'Colors, gradients, logos, frames, shapes, shadows, and transparency'
    },
    {
      icon: 'ri-smartphone-line',
      title: 'Mobile-First Design',
      description: 'Optimized for all devices with responsive, user-friendly interface'
    },
    {
      icon: 'ri-bar-chart-line',
      title: 'Analytics Dashboard',
      description: 'Track scans, locations, and performance with detailed insights'
    },
    {
      icon: 'ri-download-line',
      title: 'Multiple Formats',
      description: 'Export as SVG, PNG, or PDF in any size you need'
    },
    {
      icon: 'ri-shield-check-line',
      title: 'Secure & Reliable',
      description: 'Your data is protected with enterprise-grade security'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-cyan-50">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-4">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url('https://readdy.ai/api/search-image?query=Modern%20digital%20technology%20workspace%20with%20QR%20codes%20floating%20in%20a%20clean%20minimal%20environment%2C%20holographic%20elements%2C%20soft%20blue%20and%20purple%20gradients%2C%20professional%20lighting%2C%20high-tech%20atmosphere%2C%20futuristic%20design%20elements&width=1920&height=1080&seq=hero-bg&orientation=landscape')`
          }}
        />
        <div className="relative max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Create QR Codes
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              That Convert
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Generate professional QR codes for any purpose. Free, unlimited, and fully customizable with advanced analytics.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              <i className="ri-qr-code-fill mr-2 text-xl"></i>
              Start Creating Now
            </button>
            <Link href="/dashboard" className="px-8 py-4 border-2 border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              <i className="ri-dashboard-line mr-2"></i>
              View Dashboard
            </Link>
          </div>
        </div>
      </section>

      {/* QR Generator Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your QR Code Type</h2>
            <p className="text-xl text-gray-600">Select from our comprehensive collection of QR code categories</p>
          </div>
          
          {/* Category Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {qrCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r ' + category.color + ' text-white shadow-lg'
                    : 'bg-white border-2 border-gray-200 text-gray-700 hover:shadow-md'
                }`}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-4">
                  <i className={`${category.icon} text-2xl`}></i>
                </div>
                <h3 className="font-semibold text-lg mb-2">{category.title}</h3>
                <p className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-gray-500'}`}>
                  {category.description}
                </p>
              </button>
            ))}
          </div>

          {/* QR Generator Component */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <QRGenerator selectedCategory={selectedCategory} />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose QRResult?</h2>
            <p className="text-xl text-gray-600">Powerful features that make us the best QR code generator</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <FeatureCard key={index} {...feature} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-4">Ready to Get Started?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who trust QRResult for their QR code needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              Create Your First QR Code
            </button>
            <Link href="/about" className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
              Learn More About Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
