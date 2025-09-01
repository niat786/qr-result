
'use client';

import { useState, useEffect } from 'react';

interface DynamicQRCustomizerProps {
  data: string;
  qrConfig: any;
  previewMode: boolean;
  onAnalyticsClick?: () => void;
}

export default function DynamicQRCustomizer({ data, qrConfig, previewMode, onAnalyticsClick }: DynamicQRCustomizerProps) {
  const [qrSettings, setQrSettings] = useState({
    size: 256,
    margin: 4,
    errorLevel: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    style: 'square',
    logo: null as File | null,
    logoUrl: '',
    logoSize: 20
  });

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [activePreview, setActivePreview] = useState('qr');
  const [analytics, setAnalytics] = useState<any>(null);
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);

  useEffect(() => {
    if (data && previewMode) {
      generateQRCode();
    }
  }, [data, previewMode, qrSettings]);

  useEffect(() => {
    if (qrConfig.id && activePreview === 'analytics') {
      loadAnalytics();
    }
  }, [qrConfig.id, activePreview]);

  const generateQRCode = () => {
    // Use the redirect endpoint URL instead of the direct destination
    const redirectUrl = `${window.location.origin}/api/qr-redirect/${qrConfig.id}`;
    
    const params = new URLSearchParams({
      data: redirectUrl,
      size: `${qrSettings.size}x${qrSettings.size}`,
      bgcolor: qrSettings.backgroundColor.replace('#', ''),
      color: qrSettings.foregroundColor.replace('#', ''),
      margin: qrSettings.margin.toString(),
      qzone: '1',
      format: 'png'
    });

    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`);
  };

  const loadAnalytics = async () => {
    if (!qrConfig.id) return;
    
    try {
      setLoadingAnalytics(true);
      const response = await fetch(`/api/qr-codes/dynamic/${qrConfig.id}/analytics`);
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoadingAnalytics(false);
    }
  };

  const downloadQR = (format: 'png' | 'svg' | 'pdf') => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `dynamic-qr-${qrConfig.name || 'code'}.${format}`;
      link.click();
    }
  };

  const presetColors = [
    '#000000', '#333333', '#666666', '#999999',
    '#1e40af', '#7c3aed', '#059669', '#dc2626',
    '#ea580c', '#ca8a04', '#be185d', '#4338ca'
  ];

  const getCurrentDestination = () => {
    const now = new Date();
    const currentTime = now.toTimeString().slice(0, 5);
    const currentDate = now.toISOString().slice(0, 10);
    const currentDay = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'][now.getDay()];

    for (const dest of qrConfig.destinations) {
      const { timeRange, dateRange, weekdays } = dest.conditions;
      
      // Check time range
      if (timeRange.start && timeRange.end) {
        if (currentTime < timeRange.start || currentTime > timeRange.end) continue;
      }
      
      // Check date range
      if (dateRange.start && dateRange.end) {
        if (currentDate < dateRange.start || currentDate > dateRange.end) continue;
      }
      
      // Check weekdays
      if (weekdays.length > 0 && !weekdays.includes(currentDay)) continue;
      
      return dest;
    }
    
    return qrConfig.destinations[0] || null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 sticky top-8">
      <div className="space-y-6">
        {/* Preview Mode Toggle */}
        <div className="flex space-x-2 mb-4">
          <button
            onClick={() => setActivePreview('qr')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePreview === 'qr'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            QR Code
          </button>
          <button
            onClick={() => setActivePreview('preview')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activePreview === 'preview'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Live Preview
          </button>
          {qrConfig.id && (
            <button
              onClick={() => setActivePreview('analytics')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePreview === 'analytics'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Analytics
            </button>
          )}
        </div>

        {activePreview === 'qr' ? (
          <>
            {/* QR Code Preview */}
            <div className="bg-gray-50 rounded-xl p-8 text-center">
              {qrCodeUrl && previewMode ? (
                <div className="inline-block relative">
                  <img
                    src={qrCodeUrl}
                    alt="Dynamic QR Code"
                    className="mx-auto shadow-lg"
                    style={{
                      maxWidth: '200px',
                      height: 'auto'
                    }}
                  />
                  {qrSettings.logoUrl && (
                    <div 
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg p-1 shadow-md"
                      style={{
                        width: `${qrSettings.logoSize}%`,
                        height: `${qrSettings.logoSize}%`
                      }}
                    >
                      <img
                        src={qrSettings.logoUrl}
                        alt="Logo"
                        className="w-full h-full object-contain"
                      />
                    </div>
                  )}
                  <p className="text-sm text-gray-500 mt-4">
                    Dynamic QR Code: {qrConfig.name}
                  </p>
                  <p className="text-xs text-gray-400">
                    Redirects via: /api/qr-redirect/{qrConfig.id}
                  </p>
                </div>
              ) : (
                <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
                  <div className="text-center text-gray-400">
                    <i className="ri-qr-code-line text-4xl mb-2"></i>
                    <p className="text-sm">Configure and generate</p>
                    <p className="text-sm">your dynamic QR</p>
                  </div>
                </div>
              )}
            </div>

            {/* Customization Options */}
            {previewMode && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Customize Appearance</h4>

                {/* Size */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Size: {qrSettings.size}px
                  </label>
                  <input
                    type="range"
                    min="128"
                    max="512"
                    step="32"
                    value={qrSettings.size}
                    onChange={(e) => setQrSettings({...qrSettings, size: parseInt(e.target.value)})}
                    className="w-full"
                  />
                </div>

                {/* Colors */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Foreground
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={qrSettings.foregroundColor}
                        onChange={(e) => setQrSettings({...qrSettings, foregroundColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <div className="grid grid-cols-2 gap-1">
                        {presetColors.slice(0, 4).map((color) => (
                          <button
                            key={color}
                            onClick={() => setQrSettings({...qrSettings, foregroundColor: color})}
                            className="w-4 h-4 rounded border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Background
                    </label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        value={qrSettings.backgroundColor}
                        onChange={(e) => setQrSettings({...qrSettings, backgroundColor: e.target.value})}
                        className="w-8 h-8 rounded border border-gray-300 cursor-pointer"
                      />
                      <div className="grid grid-cols-2 gap-1">
                        {['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0'].map((color) => (
                          <button
                            key={color}
                            onClick={() => setQrSettings({...qrSettings, backgroundColor: color})}
                            className="w-4 h-4 rounded border border-gray-300 cursor-pointer"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Download Options */}
            {qrCodeUrl && previewMode && (
              <div className="space-y-3">
                <h4 className="font-semibold text-gray-900">Download</h4>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => downloadQR('png')}
                    className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
                  >
                    PNG
                  </button>
                  <button
                    onClick={() => downloadQR('svg')}
                    className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
                  >
                    SVG
                  </button>
                  <button
                    onClick={() => downloadQR('pdf')}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
                  >
                    PDF
                  </button>
                </div>
              </div>
            )}
          </>
        ) : activePreview === 'analytics' ? (
          /* Analytics Panel */
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold text-gray-900">Analytics</h4>
              <button
                onClick={loadAnalytics}
                disabled={loadingAnalytics}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded cursor-pointer disabled:opacity-50"
              >
                <i className={`ri-refresh-line ${loadingAnalytics ? 'animate-spin' : ''}`}></i>
              </button>
            </div>
            
            {loadingAnalytics ? (
              <div className="text-center py-8">
                <i className="ri-loader-4-line text-2xl animate-spin text-gray-400 mb-2"></i>
                <p className="text-sm text-gray-500">Loading analytics...</p>
              </div>
            ) : analytics ? (
              <div className="space-y-4">
                {/* Summary Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-2xl font-bold text-blue-600">{analytics.summary.totalScans}</p>
                    <p className="text-xs text-blue-700">Total Scans</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-2xl font-bold text-green-600">{analytics.summary.uniqueScans}</p>
                    <p className="text-xs text-green-700">Unique Scans</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-2xl font-bold text-purple-600">{analytics.summary.conversionRate}</p>
                    <p className="text-xs text-purple-700">Conversion</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <p className="text-2xl font-bold text-orange-600">{analytics.summary.averageScansPerDay}</p>
                    <p className="text-xs text-orange-700">Daily Avg</p>
                  </div>
                </div>

                {/* Device Breakdown */}
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Device Types</h5>
                  <div className="space-y-2">
                    {Object.entries(analytics.deviceStats).map(([device, scans]) => (
                      <div key={device} className="flex items-center justify-between text-sm">
                        <span className="capitalize">{device}</span>
                        <span className="font-medium">{scans as number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Locations */}
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Top Locations</h5>
                  <div className="space-y-2">
                    {Object.entries(analytics.locationStats).slice(0, 3).map(([location, scans]) => (
                      <div key={location} className="flex items-center justify-between text-sm">
                        <span>{location}</span>
                        <span className="font-medium">{scans as number}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Scans */}
                <div>
                  <h5 className="font-medium text-gray-800 mb-2">Recent Activity</h5>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {analytics.recentScans.slice(0, 5).map((scan: any) => (
                      <div key={scan.id} className="p-2 bg-gray-50 rounded text-xs">
                        <div className="flex items-center justify-between">
                          <span className="capitalize">{scan.deviceType}</span>
                          <span>{new Date(scan.timestamp).toLocaleTimeString()}</span>
                        </div>
                        <p className="text-gray-500 truncate">{scan.location}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <i className="ri-bar-chart-line text-2xl mb-2"></i>
                <p className="text-sm">No analytics data available</p>
                <p className="text-xs">Save your QR code to start tracking</p>
              </div>
            )}
          </div>
        ) : (
          /* Live Preview Panel */
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Live Preview</h4>
            
            {/* Current Status */}
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h5 className="font-medium text-blue-800 mb-2">Current Redirect</h5>
              {(() => {
                const currentDest = getCurrentDestination();
                return currentDest ? (
                  <div>
                    <p className="text-sm text-blue-700 mb-1">
                      <i className="ri-external-link-line mr-1"></i>
                      {currentDest.url}
                    </p>
                    <p className="text-xs text-blue-600">
                      Based on current time and conditions
                    </p>
                  </div>
                ) : (
                  <p className="text-sm text-blue-700">No active destination found</p>
                );
              })()}
            </div>

            {/* API Endpoint Info */}
            <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
              <h5 className="font-medium text-gray-800 mb-2">API Endpoint</h5>
              <code className="text-xs text-gray-600 break-all">
                GET /api/qr-redirect/{qrConfig.id || '{id}'}
              </code>
              <p className="text-xs text-gray-500 mt-1">
                This endpoint handles the dynamic routing logic
              </p>
            </div>

            {/* Destination Rules Summary */}
            <div className="space-y-3">
              <h5 className="font-medium text-gray-800">All Rules</h5>
              {qrConfig.destinations.map((dest: any, index: number) => {
                const hasConditions = 
                  dest.conditions.timeRange.start || 
                  dest.conditions.dateRange.start || 
                  dest.conditions.weekdays.length > 0 ||
                  (dest.conditions.device.types.length > 0 && !dest.conditions.device.types.includes('all'));

                return (
                  <div key={dest.id} className="p-3 bg-gray-50 rounded-lg border">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Rule {index + 1}
                        </p>
                        <p className="text-xs text-gray-600 mb-2 break-all">
                          {dest.url || 'No URL set'}
                        </p>
                        {hasConditions ? (
                          <div className="text-xs text-gray-500">
                            {dest.conditions.timeRange.start && (
                              <span className="inline-block bg-blue-100 text-blue-700 px-2 py-1 rounded mr-1 mb-1">
                                {dest.conditions.timeRange.start} - {dest.conditions.timeRange.end}
                              </span>
                            )}
                            {dest.conditions.dateRange.start && (
                              <span className="inline-block bg-green-100 text-green-700 px-2 py-1 rounded mr-1 mb-1">
                                {dest.conditions.dateRange.start} to {dest.conditions.dateRange.end}
                              </span>
                            )}
                            {dest.conditions.weekdays.length > 0 && (
                              <span className="inline-block bg-purple-100 text-purple-700 px-2 py-1 rounded mr-1 mb-1">
                                {dest.conditions.weekdays.join(', ')}
                              </span>
                            )}
                            {!dest.conditions.device.types.includes('all') && (
                              <span className="inline-block bg-orange-100 text-orange-700 px-2 py-1 rounded mr-1 mb-1">
                                {dest.conditions.device.types.join(', ')}
                              </span>
                            )}
                          </div>
                        ) : (
                          <p className="text-xs text-gray-500">Always active (default)</p>
                        )}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${dest === getCurrentDestination() ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Settings Summary */}
            {(qrConfig.settings.passwordProtected || qrConfig.settings.expiryDate || qrConfig.settings.maxScans > 0) && (
              <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <h5 className="font-medium text-yellow-800 mb-2">Security & Limits</h5>
                <div className="space-y-1 text-sm text-yellow-700">
                  {qrConfig.settings.passwordProtected && (
                    <p><i className="ri-lock-line mr-1"></i>Password protected</p>
                  )}
                  {qrConfig.settings.expiryDate && (
                    <p><i className="ri-time-line mr-1"></i>Expires: {qrConfig.settings.expiryDate}</p>
                  )}
                  {qrConfig.settings.maxScans > 0 && (
                    <p><i className="ri-bar-chart-line mr-1"></i>Max scans: {qrConfig.settings.maxScans}</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
