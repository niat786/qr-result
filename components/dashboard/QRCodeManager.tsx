'use client';

import { useState } from 'react';

export default function QRCodeManager() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('created');

  const qrCodes = [
    {
      id: '1',
      name: 'Restaurant Menu QR',
      type: 'URL',
      category: 'Business',
      scans: 234,
      created: '2024-01-15',
      status: 'active',
      url: 'https://restaurant.com/menu',
      lastScan: '2024-01-20 14:30'
    },
    {
      id: '2',
      name: 'WiFi Password',
      type: 'WiFi',
      category: 'Connection',
      scans: 89,
      created: '2024-01-14',
      status: 'active',
      url: 'WIFI:T:WPA;S:MyNetwork;P:password123;;',
      lastScan: '2024-01-20 09:15'
    },
    {
      id: '3',
      name: 'Contact Card - John Doe',
      type: 'vCard',
      category: 'Contact',
      scans: 156,
      created: '2024-01-13',
      status: 'active',
      url: 'BEGIN:VCARD...',
      lastScan: '2024-01-19 16:45'
    },
    {
      id: '4',
      name: 'PayPal Payment',
      type: 'PayPal',
      category: 'Payment',
      scans: 67,
      created: '2024-01-12',
      status: 'paused',
      url: 'https://paypal.me/johndoe/25',
      lastScan: '2024-01-18 11:20'
    },
    {
      id: '5',
      name: 'Event Tickets - Concert 2024',
      type: 'URL',
      category: 'Event',
      scans: 423,
      created: '2024-01-11',
      status: 'active',
      url: 'https://tickets.com/concert2024',
      lastScan: '2024-01-20 18:00'
    },
    {
      id: '6',
      name: 'WhatsApp Contact',
      type: 'WhatsApp',
      category: 'Communication',
      scans: 78,
      created: '2024-01-10',
      status: 'active',
      url: 'https://wa.me/1234567890',
      lastScan: '2024-01-20 12:30'
    },
    {
      id: '7',
      name: 'Google Maps Location',
      type: 'Maps',
      category: 'Location',
      scans: 145,
      created: '2024-01-09',
      status: 'active',
      url: 'https://maps.google.com/maps?q=40.7128,-74.0060',
      lastScan: '2024-01-19 20:15'
    },
    {
      id: '8',
      name: 'Crypto Wallet - Bitcoin',
      type: 'Crypto',
      category: 'Payment',
      scans: 34,
      created: '2024-01-08',
      status: 'paused',
      url: 'bitcoin:1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa',
      lastScan: '2024-01-17 13:45'
    }
  ];

  const categories = [
    'all', 'Business', 'Connection', 'Contact', 'Payment', 'Event', 'Communication', 'Location'
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'paused':
        return 'bg-yellow-100 text-yellow-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Business':
        return 'ri-briefcase-line';
      case 'Connection':
        return 'ri-wifi-line';
      case 'Contact':
        return 'ri-user-line';
      case 'Payment':
        return 'ri-bank-card-line';
      case 'Event':
        return 'ri-calendar-event-line';
      case 'Communication':
        return 'ri-message-line';
      case 'Location':
        return 'ri-map-pin-line';
      default:
        return 'ri-qr-code-line';
    }
  };

  const filteredQRCodes = qrCodes.filter(qr => {
    const matchesSearch = qr.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         qr.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || qr.category === filterCategory;
    const matchesStatus = filterStatus === 'all' || qr.status === filterStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Filters and Search */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div className="relative">
              <i className="ri-search-line absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search QR codes..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category === 'all' ? 'All Categories' : category}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="expired">Expired</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm pr-8"
            >
              <option value="created">Date Created</option>
              <option value="scans">Most Scanned</option>
              <option value="name">Name A-Z</option>
              <option value="lastScan">Last Scan</option>
            </select>
          </div>
        </div>
      </div>

      {/* QR Codes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredQRCodes.map((qr) => (
          <div key={qr.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                  <i className={`${getCategoryIcon(qr.category)} text-white text-sm`}></i>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 text-sm">{qr.name}</h4>
                  <p className="text-xs text-gray-500">{qr.type}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(qr.status)}`}>
                {qr.status.charAt(0).toUpperCase() + qr.status.slice(1)}
              </span>
            </div>

            {/* QR Code Preview */}
            <div className="bg-gray-50 rounded-lg p-4 text-center mb-4">
              <div className="w-20 h-20 bg-white rounded-lg mx-auto flex items-center justify-center shadow-sm">
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${encodeURIComponent(qr.url)}`}
                  alt="QR Code"
                  className="w-16 h-16"
                />
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">{qr.scans.toLocaleString()}</div>
                <div className="text-xs text-gray-500">Total Scans</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-gray-900">
                  {Math.floor((Date.now() - new Date(qr.created).getTime()) / (1000 * 60 * 60 * 24))}d
                </div>
                <div className="text-xs text-gray-500">Days Active</div>
              </div>
            </div>

            {/* Last Scan */}
            <div className="text-xs text-gray-500 mb-4">
              <i className="ri-time-line mr-1"></i>
              Last scan: {new Date(qr.lastScan).toLocaleDateString()} {new Date(qr.lastScan).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center space-x-2">
                <button className="w-8 h-8 flex items-center justify-center text-blue-600 hover:bg-blue-50 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-eye-line text-sm"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-edit-line text-sm"></i>
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                  <i className="ri-download-line text-sm"></i>
                </button>
              </div>
              <button className="w-8 h-8 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer">
                <i className="ri-delete-bin-line text-sm"></i>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {filteredQRCodes.length === 0 && (
        <div className="bg-white rounded-xl shadow-sm p-12 text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <i className="ri-qr-code-line text-2xl text-gray-400"></i>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No QR codes found</h3>
          <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria</p>
          <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
            <i className="ri-add-line mr-2"></i>
            Create New QR Code
          </button>
        </div>
      )}
    </div>
  );
}