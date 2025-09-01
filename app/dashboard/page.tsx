'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentQRCodes from '@/components/dashboard/RecentQRCodes';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';
import QRCodeManager from '@/components/dashboard/QRCodeManager';
import QuickActions from '@/components/dashboard/QuickActions';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  const tabs = [
    { id: 'overview', name: 'Overview', icon: 'ri-dashboard-line' },
    { id: 'qrcodes', name: 'QR Codes', icon: 'ri-qr-code-line' },
    { id: 'analytics', name: 'Analytics', icon: 'ri-bar-chart-line' },
    { id: 'settings', name: 'Settings', icon: 'ri-settings-line' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-16">
        {/* Dashboard Header */}
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600 mt-1">Manage and track your QR codes</p>
              </div>
              <div className="mt-4 md:mt-0">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
                  <i className="ri-add-line mr-2"></i>
                  Create New QR Code
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4">
            <nav className="flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <i className={`${tab.icon} mr-2`}></i>
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 py-8">
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <DashboardStats />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <AnalyticsChart />
                </div>
                <div>
                  <QuickActions />
                </div>
              </div>
              <RecentQRCodes />
            </div>
          )}

          {activeTab === 'qrcodes' && (
            <QRCodeManager />
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <AnalyticsChart />
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Average Scans per QR</span>
                      <span className="font-semibold text-gray-900">24.3</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Top Performing Category</span>
                      <span className="font-semibold text-blue-600">Payment</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Peak Usage Hours</span>
                      <span className="font-semibold text-gray-900">2PM - 4PM</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Most Used Device</span>
                      <span className="font-semibold text-gray-900">Mobile (78%)</span>
                    </div>
                  </div>
                </div>
              </div>
              <DashboardStats />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Account Settings</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default QR Code Size</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>256x256 px</option>
                    <option>512x512 px</option>
                    <option>1024x1024 px</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Default Format</label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8">
                    <option>PNG</option>
                    <option>SVG</option>
                    <option>PDF</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="analytics" className="mr-2" />
                  <label htmlFor="analytics" className="text-sm text-gray-700">Enable detailed analytics tracking</label>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" id="notifications" className="mr-2" />
                  <label htmlFor="notifications" className="text-sm text-gray-700">Email notifications for scan milestones</label>
                </div>
                <button className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}