'use client';

import { useState, useEffect } from 'react';
import DynamicQRCustomizer from './DynamicQRCustomizer';

interface QRDestination {
  id: string;
  url: string;
  active: boolean;
  conditions: {
    timeRange: { start: string; end: string };
    dateRange: { start: string; end: string };
    location: { countries: string[]; cities: string[] };
    device: { types: string[] };
    weekdays: string[];
  };
}

interface QRData {
  id: string;
  name: string;
  type: string;
  destinations: QRDestination[];
  settings: {
    passwordProtected: boolean;
    password: string;
    analytics: boolean;
    expiryDate: string;
    maxScans: number;
  };
  createdAt?: string;
  updatedAt?: string;
  scanCount?: number;
}

export default function DynamicQRGenerator() {
  const [qrData, setQrData] = useState<QRData>({
    id: '',
    name: '',
    type: 'url',
    destinations: [
      {
        id: '1',
        url: '',
        active: true,
        conditions: {
          timeRange: { start: '', end: '' },
          dateRange: { start: '', end: '' },
          location: { countries: [], cities: [] },
          device: { types: ['all'] },
          weekdays: []
        }
      }
    ],
    settings: {
      passwordProtected: false,
      password: '',
      analytics: true,
      expiryDate: '',
      maxScans: 0
    }
  });

  const [activeDestination, setActiveDestination] = useState(0);
  const [previewMode, setPreviewMode] = useState(false);
  const [generatedUrl, setGeneratedUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [savedQRs, setSavedQRs] = useState<QRData[]>([]);

  const qrTypes = [
    { id: 'url', name: 'Website URL', icon: 'ri-global-line', description: 'Redirect to any website' },
    { id: 'landing', name: 'Landing Page', icon: 'ri-rocket-line', description: 'Custom landing page' },
    { id: 'menu', name: 'Digital Menu', icon: 'ri-restaurant-line', description: 'Restaurant or service menu' },
    { id: 'contact', name: 'Contact Card', icon: 'ri-contacts-line', description: 'vCard contact information' },
    { id: 'event', name: 'Event Page', icon: 'ri-calendar-event-line', description: 'Event details and registration' },
    { id: 'social', name: 'Social Links', icon: 'ri-share-line', description: 'Multiple social media links' },
    { id: 'file', name: 'File Download', icon: 'ri-download-line', description: 'PDF, images, or documents' },
    { id: 'video', name: 'Video Content', icon: 'ri-video-line', description: 'YouTube, Vimeo, or direct video' }
  ];

  const deviceTypes = [
    { id: 'all', name: 'All Devices', icon: 'ri-device-line' },
    { id: 'mobile', name: 'Mobile Only', icon: 'ri-smartphone-line' },
    { id: 'desktop', name: 'Desktop Only', icon: 'ri-computer-line' },
    { id: 'tablet', name: 'Tablet Only', icon: 'ri-tablet-line' }
  ];

  const weekdays = [
    { id: 'mon', name: 'Monday' },
    { id: 'tue', name: 'Tuesday' },
    { id: 'wed', name: 'Wednesday' },
    { id: 'thu', name: 'Thursday' },
    { id: 'fri', name: 'Friday' },
    { id: 'sat', name: 'Saturday' },
    { id: 'sun', name: 'Sunday' }
  ];

  // Load saved QR codes on component mount
  useEffect(() => {
    loadSavedQRCodes();
  }, []);

  // Generate dynamic URL when name changes
  useEffect(() => {
    if (qrData.name) {
      const urlId = qrData.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-+|-+$/g, '');
      setGeneratedUrl(`https://qr.example.com/${urlId}`);
      setQrData(prev => ({ ...prev, id: urlId }));
    }
  }, [qrData.name]);

  // API Functions
  const loadSavedQRCodes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch('/api/qr-codes/dynamic', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (response.ok) {
        const data = await response.json();
        setSavedQRs(data.qrCodes || []);
      }
    } catch (error) {
      console.error('Error loading QR codes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveQRCode = async () => {
    if (!qrData.name || !qrData.destinations[0]?.url) {
      alert('Please fill in the QR name and at least one destination URL');
      return;
    }

    try {
      setIsSaving(true);
      const response = await fetch('/api/qr-codes/dynamic', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...qrData,
          dynamicUrl: generatedUrl,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setQrData(result.qrCode);
        setPreviewMode(true);
        await loadSavedQRCodes(); // Refresh the list
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed z-50 px-6 py-3 text-white bg-green-500 rounded-lg shadow-lg top-4 right-4';
        successMsg.textContent = 'Dynamic QR Code saved successfully!';
        document.body.appendChild(successMsg);
        setTimeout(() => document.body.removeChild(successMsg), 3000);
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to save QR code');
      }
    } catch (error) {
      console.error('Error saving QR code:', error);
      alert('Failed to save QR code. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const updateQRCode = async () => {
    if (!qrData.id) return;

    try {
      setIsSaving(true);
      const response = await fetch(`/api/qr-codes/dynamic/${qrData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(qrData),
      });

      if (response.ok) {
        const result = await response.json();
        setQrData(result.qrCode);
        await loadSavedQRCodes();
        
        // Show success message
        const successMsg = document.createElement('div');
        successMsg.className = 'fixed z-50 px-6 py-3 text-white bg-blue-500 rounded-lg shadow-lg top-4 right-4';
        successMsg.textContent = 'QR Code updated successfully!';
        document.body.appendChild(successMsg);
        setTimeout(() => document.body.removeChild(successMsg), 3000);
      }
    } catch (error) {
      console.error('Error updating QR code:', error);
      alert('Failed to update QR code. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const deleteQRCode = async (id: string) => {
    if (!confirm('Are you sure you want to delete this QR code?')) return;

    try {
      const response = await fetch(`/api/qr-codes/dynamic/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadSavedQRCodes();
        if (qrData.id === id) {
          // Reset form if current QR was deleted
          setQrData({
            id: '',
            name: '',
            type: 'url',
            destinations: [{
              id: '1',
              url: '',
              active: true,
              conditions: {
                timeRange: { start: '', end: '' },
                dateRange: { start: '', end: '' },
                location: { countries: [], cities: [] },
                device: { types: ['all'] },
                weekdays: []
              }
            }],
            settings: {
              passwordProtected: false,
              password: '',
              analytics: true,
              expiryDate: '',
              maxScans: 0
            }
          });
          setPreviewMode(false);
        }
      }
    } catch (error) {
      console.error('Error deleting QR code:', error);
      alert('Failed to delete QR code. Please try again.');
    }
  };

  const loadQRCode = (qr: QRData) => {
    setQrData(qr);
    setGeneratedUrl(`https://qr.example.com/${qr.id}`);
    setPreviewMode(true);
    setActiveDestination(0);
  };

  const getQRAnalytics = async (id: string) => {
    try {
      const response = await fetch(`/api/qr-codes/dynamic/${id}/analytics`);
      if (response.ok) {
        const analytics = await response.json();
        return analytics;
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    }
    return null;
  };

  const addDestination = () => {
    const newDestination = {
      id: Date.now().toString(),
      url: '',
      active: true,
      conditions: {
        timeRange: { start: '', end: '' },
        dateRange: { start: '', end: '' },
        location: { countries: [], cities: [] },
        device: { types: ['all'] },
        weekdays: []
      }
    };
    setQrData(prev => ({
      ...prev,
      destinations: [...prev.destinations, newDestination]
    }));
    setActiveDestination(qrData.destinations.length);
  };

  const removeDestination = (index: number) => {
    if (qrData.destinations.length > 1) {
      setQrData(prev => ({
        ...prev,
        destinations: prev.destinations.filter((_, i) => i !== index)
      }));
      if (activeDestination >= qrData.destinations.length - 1) {
        setActiveDestination(0);
      }
    }
  };

  const updateDestination = (index: number, field: string, value: any) => {
    setQrData(prev => ({
      ...prev,
      destinations: prev.destinations.map((dest, i) => 
        i === index ? { ...dest, [field]: value } : dest
      )
    }));
  };

  const updateDestinationCondition = (index: number, condition: string, value: any) => {
    setQrData(prev => ({
      ...prev,
      destinations: prev.destinations.map((dest, i) => 
        i === index ? { 
          ...dest, 
          conditions: { ...dest.conditions, [condition]: value }
        } : dest
      )
    }));
  };

  const handleGenerateQR = () => {
    if (!qrData.name || !qrData.destinations[0].url) {
      alert('Please fill in the QR name and at least one destination URL');
      return;
    }
    setPreviewMode(true);
  };

  const commonInputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";
  const labelClass = "block text-sm font-medium text-gray-700 mb-2";

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      {/* Configuration Panel */}
      <div className="space-y-6 lg:col-span-2">
        {/* Saved QR Codes */}
        {savedQRs.length > 0 && (
          <div className="p-6 bg-white shadow-xl rounded-2xl">
            <h3 className="mb-4 text-xl font-bold text-gray-900">Saved Dynamic QR Codes</h3>
            <div className="grid grid-cols-1 gap-4 overflow-y-auto md:grid-cols-2 max-h-48">
              {savedQRs.map((qr) => (
                <div key={qr.id} className="p-4 transition-shadow border border-gray-200 rounded-lg hover:shadow-md">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{qr.name}</h4>
                      <p className="text-sm text-gray-500">{qr.type}</p>
                      <p className="mt-1 text-xs text-gray-400">
                        {qr.scanCount || 0} scans • {qr.destinations.length} rules
                      </p>
                    </div>
                    <div className="flex space-x-1">
                      <button
                        onClick={() => loadQRCode(qr)}
                        className="p-1 text-blue-600 rounded cursor-pointer hover:bg-blue-50"
                        title="Load QR"
                      >
                        <i className="text-sm ri-edit-line"></i>
                      </button>
                      <button
                        onClick={() => deleteQRCode(qr.id)}
                        className="p-1 text-red-600 rounded cursor-pointer hover:bg-red-50"
                        title="Delete QR"
                      >
                        <i className="text-sm ri-delete-bin-line"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="p-8 bg-white shadow-xl rounded-2xl">
          {/* Basic Settings */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Dynamic QR Configuration</h3>
              {qrData.id && (
                <span className="px-3 py-1 text-sm text-green-800 bg-green-100 rounded-full">
                  Saved • ID: {qrData.id}
                </span>
              )}
            </div>
            
            <div className="grid grid-cols-1 gap-6 mb-6 md:grid-cols-2">
              <div>
                <label className={labelClass}>QR Code Name *</label>
                <input
                  type="text"
                  value={qrData.name}
                  onChange={(e) => setQrData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="My Campaign QR"
                  className={commonInputClass}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">This creates your dynamic URL</p>
              </div>
              
              <div>
                <label className={labelClass}>QR Type</label>
                <select
                  value={qrData.type}
                  onChange={(e) => setQrData(prev => ({ ...prev, type: e.target.value }))}
                  className={`${commonInputClass} pr-8`}
                >
                  {qrTypes.map(type => (
                    <option key={type.id} value={type.id}>{type.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Generated URL Display */}
            {generatedUrl && (
              <div className="p-4 mb-6 border border-blue-200 rounded-lg bg-blue-50">
                <label className="block mb-2 text-sm font-medium text-blue-800">Generated Dynamic URL</label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 p-2 font-mono text-sm text-gray-800 bg-white border rounded">
                    {generatedUrl}
                  </code>
                  <button
                    onClick={() => navigator.clipboard.writeText(generatedUrl)}
                    className="p-2 text-blue-600 rounded cursor-pointer hover:bg-blue-100"
                    title="Copy URL"
                  >
                    <i className="ri-clipboard-line"></i>
                  </button>
                </div>
                <p className="mt-1 text-xs text-blue-600">This URL will redirect based on your conditions below</p>
              </div>
            )}
          </div>

          {/* Destinations */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-gray-900">Destination Rules</h4>
              <button
                onClick={addDestination}
                className="px-4 py-2 text-sm text-white transition-colors bg-green-600 rounded-lg hover:bg-green-700 whitespace-nowrap"
              >
                <i className="mr-1 ri-add-line"></i>
                Add Rule
              </button>
            </div>

            {/* Destination Tabs */}
            <div className="flex mb-6 space-x-2 overflow-x-auto">
              {qrData.destinations.map((dest, index) => (
                <button
                  key={dest.id}
                  onClick={() => setActiveDestination(index)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    activeDestination === index
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Rule {index + 1}
                  {qrData.destinations.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeDestination(index);
                      }}
                      className="ml-2 text-red-400 hover:text-red-600"
                    >
                      <i className="text-xs ri-close-line"></i>
                    </button>
                  )}
                </button>
              ))}
            </div>

            {/* Active Destination Configuration */}
            {qrData.destinations[activeDestination] && (
              <div className="p-6 space-y-6 rounded-lg bg-gray-50">
                {/* Destination URL */}
                <div>
                  <label className={labelClass}>Destination URL *</label>
                  <input
                    type="url"
                    value={qrData.destinations[activeDestination].url}
                    onChange={(e) => updateDestination(activeDestination, 'url', e.target.value)}
                    placeholder="https://example.com"
                    className={commonInputClass}
                    required
                  />
                </div>

                {/* Conditions */}
                <div>
                  <h5 className="mb-4 font-medium text-gray-900">Conditions (Leave empty for always active)</h5>
                  
                  {/* Time Range */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={labelClass}>Start Time</label>
                      <input
                        type="time"
                        value={qrData.destinations[activeDestination].conditions.timeRange.start}
                        onChange={(e) => updateDestinationCondition(
                          activeDestination, 
                          'timeRange', 
                          { ...qrData.destinations[activeDestination].conditions.timeRange, start: e.target.value }
                        )}
                        className={commonInputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>End Time</label>
                      <input
                        type="time"
                        value={qrData.destinations[activeDestination].conditions.timeRange.end}
                        onChange={(e) => updateDestinationCondition(
                          activeDestination, 
                          'timeRange', 
                          { ...qrData.destinations[activeDestination].conditions.timeRange, end: e.target.value }
                        )}
                        className={commonInputClass}
                      />
                    </div>
                  </div>

                  {/* Date Range */}
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <label className={labelClass}>Start Date</label>
                      <input
                        type="date"
                        value={qrData.destinations[activeDestination].conditions.dateRange.start}
                        onChange={(e) => updateDestinationCondition(
                          activeDestination, 
                          'dateRange', 
                          { ...qrData.destinations[activeDestination].conditions.dateRange, start: e.target.value }
                        )}
                        className={commonInputClass}
                      />
                    </div>
                    <div>
                      <label className={labelClass}>End Date</label>
                      <input
                        type="date"
                        value={qrData.destinations[activeDestination].conditions.dateRange.end}
                        onChange={(e) => updateDestinationCondition(
                          activeDestination, 
                          'dateRange', 
                          { ...qrData.destinations[activeDestination].conditions.dateRange, end: e.target.value }
                        )}
                        className={commonInputClass}
                      />
                    </div>
                  </div>

                  {/* Device Targeting */}
                  <div className="mb-4">
                    <label className={labelClass}>Target Devices</label>
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      {deviceTypes.map(device => (
                        <button
                          key={device.id}
                          onClick={() => {
                            const currentTypes = qrData.destinations[activeDestination].conditions.device.types;
                            const newTypes = currentTypes.includes(device.id)
                              ? currentTypes.filter(t => t !== device.id)
                              : [...currentTypes.filter(t => t !== 'all'), device.id];
                            
                            // If selecting 'all', clear other selections
                            if (device.id === 'all') {
                              updateDestinationCondition(activeDestination, 'device', { types: ['all'] });
                            } else {
                              updateDestinationCondition(activeDestination, 'device', { types: newTypes });
                            }
                          }}
                          className={`p-3 rounded-lg border-2 text-sm transition-all ${
                            qrData.destinations[activeDestination].conditions.device.types.includes(device.id)
                              ? 'border-blue-500 bg-blue-50 text-blue-700'
                              : 'border-gray-200 hover:border-gray-300 text-gray-700'
                          }`}
                        >
                          <div className="flex flex-col items-center space-y-1">
                            <i className={`${device.icon} text-lg`}></i>
                            <span className="text-xs">{device.name}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Weekdays */}
                  <div>
                    <label className={labelClass}>Active Days (Leave empty for all days)</label>
                    <div className="flex flex-wrap gap-2">
                      {weekdays.map(day => (
                        <button
                          key={day.id}
                          onClick={() => {
                            const currentDays = qrData.destinations[activeDestination].conditions.weekdays;
                            const newDays = currentDays.includes(day.id)
                              ? currentDays.filter(d => d !== day.id)
                              : [...currentDays, day.id];
                            updateDestinationCondition(activeDestination, 'weekdays', newDays);
                          }}
                          className={`px-3 py-2 rounded-lg text-sm transition-all ${
                            qrData.destinations[activeDestination].conditions.weekdays.includes(day.id)
                              ? 'bg-blue-600 text-white'
                              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                          }`}
                        >
                          {day.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Advanced Settings */}
          <div className="mb-8">
            <h4 className="mb-4 text-lg font-semibold text-gray-900">Advanced Settings</h4>
            
            <div className="space-y-4">
              {/* Password Protection */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="passwordProtected"
                  checked={qrData.settings.passwordProtected}
                  onChange={(e) => setQrData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, passwordProtected: e.target.checked }
                  }))}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="passwordProtected" className="text-sm font-medium text-gray-700">
                  Password Protection
                </label>
              </div>

              {qrData.settings.passwordProtected && (
                <div>
                  <input
                    type="password"
                    value={qrData.settings.password}
                    onChange={(e) => setQrData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, password: e.target.value }
                    }))}
                    placeholder="Enter password"
                    className={commonInputClass}
                  />
                </div>
              )}

              {/* Analytics */}
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="analytics"
                  checked={qrData.settings.analytics}
                  onChange={(e) => setQrData(prev => ({
                    ...prev,
                    settings: { ...prev.settings, analytics: e.target.checked }
                  }))}
                  className="w-4 h-4 text-blue-600"
                />
                <label htmlFor="analytics" className="text-sm font-medium text-gray-700">
                  Enable Analytics Tracking
                </label>
              </div>

              {/* Expiry Date */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Expiry Date (Optional)</label>
                  <input
                    type="date"
                    value={qrData.settings.expiryDate}
                    onChange={(e) => setQrData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, expiryDate: e.target.value }
                    }))}
                    className={commonInputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Max Scans (0 = unlimited)</label>
                  <input
                    type="number"
                    min="0"
                    value={qrData.settings.maxScans}
                    onChange={(e) => setQrData(prev => ({
                      ...prev,
                      settings: { ...prev.settings, maxScans: parseInt(e.target.value) || 0 }
                    }))}
                    placeholder="0"
                    className={commonInputClass}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              onClick={handleGenerateQR}
              disabled={!qrData.name || !qrData.destinations[0]?.url}
              className="flex-1 px-6 py-4 font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
            >
              <i className="mr-2 ri-qr-code-fill"></i>
              Preview QR Code
            </button>
            
            {previewMode && (
              <button
                onClick={qrData.id ? updateQRCode : saveQRCode}
                disabled={isSaving}
                className="flex-1 px-6 py-4 font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
              >
                {isSaving ? (
                  <>
                    <i className="mr-2 ri-loader-4-line animate-spin"></i>
                    {qrData.id ? 'Updating...' : 'Saving...'}
                  </>
                ) : (
                  <>
                    <i className="mr-2 ri-save-line"></i>
                    {qrData.id ? 'Update QR Code' : 'Save QR Code'}
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Preview Panel */}
      <div className="lg:col-span-1">
        <DynamicQRCustomizer 
          data={generatedUrl} 
          qrConfig={qrData}
          previewMode={previewMode}
          onAnalyticsClick={() => qrData.id && getQRAnalytics(qrData.id)}
        />
      </div>
    </div>
  );
}