'use client';

import { useState } from 'react';

export default function DynamicQRPreview() {
  const [selectedExample, setSelectedExample] = useState('restaurant');

  const examples = [
    {
      id: 'restaurant',
      name: 'Restaurant Menu',
      description: 'Dynamic menu that changes based on time of day',
      icon: 'ri-restaurant-line',
      qrUrl: 'https://qr.example.com/bella-italia-menu',
      color: 'from-orange-500 to-red-500',
      scenarios: [
        {
          time: 'Breakfast (6AM - 11AM)',
          url: 'https://restaurant.com/breakfast-menu',
          description: 'Light breakfast items, coffee specials'
        },
        {
          time: 'Lunch (11AM - 4PM)', 
          url: 'https://restaurant.com/lunch-menu',
          description: 'Quick lunch options, business deals'
        },
        {
          time: 'Dinner (4PM - 11PM)',
          url: 'https://restaurant.com/dinner-menu', 
          description: 'Full dinner menu, wine pairings'
        },
        {
          time: 'Late Night (11PM - 6AM)',
          url: 'https://restaurant.com/closed',
          description: 'Closed message with opening hours'
        }
      ]
    },
    {
      id: 'event',
      name: 'Event Campaign',
      description: 'Conference QR that updates based on event schedule',
      icon: 'ri-calendar-event-line',
      qrUrl: 'https://qr.example.com/tech-conference-2024',
      color: 'from-blue-500 to-purple-500',
      scenarios: [
        {
          time: 'Registration (Pre-event)',
          url: 'https://conference.com/register',
          description: 'Registration form and early bird tickets'
        },
        {
          time: 'Day 1 Schedule',
          url: 'https://conference.com/day1-schedule',
          description: 'Live schedule, speaker profiles, networking'
        },
        {
          time: 'Day 2 Schedule',
          url: 'https://conference.com/day2-schedule',
          description: 'Workshop schedules, exhibition map'
        },
        {
          time: 'Post-event',
          url: 'https://conference.com/resources',
          description: 'Session recordings, slides, feedback survey'
        }
      ]
    },
    {
      id: 'retail',
      name: 'Retail Promotion',
      description: 'Store promotion that changes based on location and device',
      icon: 'ri-shopping-bag-line',
      qrUrl: 'https://qr.example.com/fashion-store-deals',
      color: 'from-pink-500 to-purple-500',
      scenarios: [
        {
          time: 'Mobile Users',
          url: 'https://store.com/mobile-app-download',
          description: 'App download with exclusive mobile discounts'
        },
        {
          time: 'Desktop Users',
          url: 'https://store.com/online-catalog',
          description: 'Full online catalog with detailed product views'
        },
        {
          time: 'Weekend Special',
          url: 'https://store.com/weekend-sale',
          description: '50% off weekend flash sale'
        },
        {
          time: 'International Visitors',
          url: 'https://store.com/international',
          description: 'Multi-language support, global shipping info'
        }
      ]
    },
    {
      id: 'landing',
      name: 'Marketing Campaign',
      description: 'Landing page that adapts based on traffic source',
      icon: 'ri-rocket-line',
      qrUrl: 'https://qr.example.com/product-launch-2024',
      color: 'from-green-500 to-cyan-500',
      scenarios: [
        {
          time: 'Print Ad Scan',
          url: 'https://landing.com/print-exclusive',
          description: 'Special offer for print ad readers'
        },
        {
          time: 'Business Hours',
          url: 'https://landing.com/contact-sales',
          description: 'Direct sales contact form'
        },
        {
          time: 'After Hours',
          url: 'https://landing.com/product-demo',
          description: 'Self-service product demo and trial'
        },
        {
          time: 'Mobile Scan',
          url: 'https://landing.com/mobile-optimized',
          description: 'Mobile-first experience, one-click actions'
        }
      ]
    }
  ];

  const currentExample = examples.find(ex => ex.id === selectedExample);

  return (
    <div className="space-y-8">
      {/* Example Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {examples.map((example) => (
          <button
            key={example.id}
            onClick={() => setSelectedExample(example.id)}
            className={`p-6 rounded-xl text-left transition-all duration-200 transform hover:scale-105 ${
              selectedExample === example.id
                ? `bg-gradient-to-r ${example.color} text-white shadow-lg`
                : 'bg-white border-2 border-gray-200 text-gray-700 hover:shadow-md'
            }`}
          >
            <div className="w-12 h-12 flex items-center justify-center mb-4">
              <i className={`${example.icon} text-2xl`}></i>
            </div>
            <h3 className="font-semibold text-lg mb-2">{example.name}</h3>
            <p className={`text-sm ${selectedExample === example.id ? 'text-white/80' : 'text-gray-500'}`}>
              {example.description}
            </p>
          </button>
        ))}
      </div>

      {/* Example Details */}
      {currentExample && (
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className={`bg-gradient-to-r ${currentExample.color} text-white p-8`}>
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center">
                <i className={`${currentExample.icon} text-3xl`}></i>
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-2">{currentExample.name}</h2>
                <p className="text-white/90">{currentExample.description}</p>
              </div>
            </div>
            
            {/* QR URL Display */}
            <div className="mt-6 p-4 bg-white/10 rounded-lg">
              <p className="text-white/80 text-sm mb-2">Dynamic QR URL:</p>
              <div className="flex items-center space-x-3">
                <code className="flex-1 text-white font-mono text-lg">
                  {currentExample.qrUrl}
                </code>
                <button 
                  onClick={() => navigator.clipboard.writeText(currentExample.qrUrl)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors cursor-pointer"
                  title="Copy URL"
                >
                  <i className="ri-clipboard-line text-xl"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Scenarios Grid */}
          <div className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Dynamic Scenarios</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {currentExample.scenarios.map((scenario, index) => (
                <div key={index} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start space-x-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${currentExample.color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-bold">{index + 1}</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{scenario.time}</h4>
                      <p className="text-sm text-gray-600 mb-3">{scenario.description}</p>
                      <div className="flex items-center space-x-2">
                        <i className="ri-external-link-line text-gray-400"></i>
                        <code className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded font-mono">
                          {scenario.url}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mock QR Code */}
          <div className="p-8 bg-gray-50 border-t">
            <div className="flex items-center justify-center space-x-8">
              <div className="text-center">
                <div className="w-48 h-48 bg-white rounded-xl shadow-lg flex items-center justify-center mb-4">
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentExample.qrUrl)}&margin=2`}
                    alt={`${currentExample.name} QR Code`}
                    className="w-44 h-44"
                  />
                </div>
                <p className="text-sm font-medium text-gray-700">Scan to Experience</p>
                <p className="text-xs text-gray-500">Dynamic behavior in action</p>
              </div>
              
              <div className="max-w-md">
                <h4 className="font-semibold text-gray-900 mb-3">How It Works</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start space-x-2">
                    <i className="ri-arrow-right-s-line text-blue-500 mt-0.5"></i>
                    <span>Same QR code, different destinations based on conditions</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="ri-arrow-right-s-line text-blue-500 mt-0.5"></i>
                    <span>Real-time updates without reprinting</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="ri-arrow-right-s-line text-blue-500 mt-0.5"></i>
                    <span>Detailed analytics and user tracking</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <i className="ri-arrow-right-s-line text-blue-500 mt-0.5"></i>
                    <span>Perfect for campaigns, menus, and events</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white">
        <h3 className="text-2xl font-bold mb-4">Ready to Create Your Dynamic QR?</h3>
        <p className="text-blue-100 mb-6">
          Start with our examples or create your own custom dynamic QR code campaign
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            Create Dynamic QR
          </button>
          <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
            <i className="ri-download-line mr-2"></i>
            Download Examples
          </button>
        </div>
      </div>
    </div>
  );
}