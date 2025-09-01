
'use client';

import { useState, useEffect } from 'react';

interface QRCustomizerProps {
  data: string;
  type: string;
}

export default function QRCustomizer({ data, type }: QRCustomizerProps) {
  const [qrSettings, setQrSettings] = useState({
    size: 256,
    margin: 4,
    errorLevel: 'M',
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    style: 'square',
    logo: null as File | null,
    logoUrl: '',
    logoSize: 20,
    gradient: false,
    gradientStart: '#000000',
    gradientEnd: '#666666'
  });

  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    if (data && type) {
      generateQRCode();
    }
  }, [data, type, qrSettings]);

  const generateQRCode = () => {
    // Using QR Server API for demonstration
    const params = new URLSearchParams({
      data: data,
      size: `${qrSettings.size}x${qrSettings.size}`,
      bgcolor: qrSettings.backgroundColor.replace('#', ''),
      color: qrSettings.foregroundColor.replace('#', ''),
      margin: qrSettings.margin.toString(),
      qzone: '1',
      format: 'png'
    });

    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`);
  };

  const downloadQR = (format: 'png' | 'svg' | 'pdf') => {
    if (qrCodeUrl) {
      const link = document.createElement('a');
      link.href = qrCodeUrl;
      link.download = `qr-code.${format}`;
      link.click();
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processLogoFile(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processLogoFile(file);
    } else {
      setUploadStatus('Please select a valid image file');
      setTimeout(() => setUploadStatus(''), 3000);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const processLogoFile = (file: File) => {
    // Validate file size (2MB limit)
    if (file.size > 2 * 1024 * 1024) {
      setUploadStatus('File size must be less than 2MB');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    // Validate file type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setUploadStatus('Please upload PNG, JPG, SVG, or WebP images only');
      setTimeout(() => setUploadStatus(''), 3000);
      return;
    }

    setUploadStatus('Uploading...');
    setQrSettings({...qrSettings, logo: file});
    
    // Create preview URL
    const reader = new FileReader();
    reader.onload = (e) => {
      setQrSettings(prev => ({...prev, logoUrl: e.target?.result as string}));
      setUploadStatus('Logo uploaded successfully!');
      setTimeout(() => setUploadStatus(''), 2000);
    };
    reader.onerror = () => {
      setUploadStatus('Error reading file');
      setTimeout(() => setUploadStatus(''), 3000);
    };
    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    setQrSettings({...qrSettings, logo: null, logoUrl: ''});
  };

  const presetColors = [
    '#000000', '#333333', '#666666', '#999999',
    '#1e40af', '#7c3aed', '#059669', '#dc2626',
    '#ea580c', '#ca8a04', '#be185d', '#4338ca'
  ];

  return (
    <div className="space-y-6">
      {/* QR Code Preview */}
      <div className="bg-gray-50 rounded-xl p-8 text-center">
        {qrCodeUrl ? (
          <div className="inline-block relative">
            <img
              src={qrCodeUrl}
              alt="Generated QR Code"
              className="mx-auto shadow-lg"
              style={{
                maxWidth: '200px',
                height: 'auto'
              }}
            />
            {/* Logo Overlay Preview */}
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
              {type.charAt(0).toUpperCase() + type.slice(1)} QR Code
            </p>
          </div>
        ) : (
          <div className="w-48 h-48 mx-auto bg-gray-200 rounded-lg flex items-center justify-center">
            <div className="text-center text-gray-400">
              <i className="ri-qr-code-line text-4xl mb-2"></i>
              <p>QR code will appear here</p>
            </div>
          </div>
        )}
      </div>

      {/* Customization Options */}
      <div className="space-y-4">
        <h4 className="font-semibold text-gray-900">Customize Your QR Code</h4>

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
              Foreground Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={qrSettings.foregroundColor}
                onChange={(e) => setQrSettings({...qrSettings, foregroundColor: e.target.value})}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <div className="grid grid-cols-4 gap-1">
                {presetColors.slice(0, 8).map((color) => (
                  <button
                    key={color}
                    onClick={() => setQrSettings({...qrSettings, foregroundColor: color})}
                    className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={qrSettings.backgroundColor}
                onChange={(e) => setQrSettings({...qrSettings, backgroundColor: e.target.value})}
                className="w-10 h-10 rounded border border-gray-300 cursor-pointer"
              />
              <div className="grid grid-cols-4 gap-1">
                {['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8', '#64748b', '#475569'].map((color) => (
                  <button
                    key={color}
                    onClick={() => setQrSettings({...qrSettings, backgroundColor: color})}
                    className="w-6 h-6 rounded border border-gray-300 cursor-pointer"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Logo/Icon Section */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Add Custom Logo
          </label>
          
          {/* Enhanced Logo Upload */}
          <div className="mb-4">
            <div 
              className={`relative flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all duration-200 ${
                dragActive 
                  ? 'border-blue-500 bg-blue-50' 
                  : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <label className="flex flex-col items-center justify-center w-full cursor-pointer">
                <div className="text-center">
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-full flex items-center justify-center ${
                    dragActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    <i className={`ri-upload-cloud-line text-2xl ${
                      dragActive ? 'text-blue-500' : 'text-gray-400'
                    }`}></i>
                  </div>
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    {dragActive ? 'Drop your logo here' : 'Upload Custom Logo'}
                  </p>
                  <p className="text-xs text-gray-500 mb-2">
                    Drag & drop or click to browse
                  </p>
                  <p className="text-xs text-gray-400">
                    PNG, JPG, SVG, WebP • Max 2MB
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                />
              </label>
              
              {/* Upload Status */}
              {uploadStatus && (
                <div className={`absolute top-2 right-2 px-2 py-1 rounded text-xs font-medium ${
                  uploadStatus.includes('Error') || uploadStatus.includes('must be') 
                    ? 'bg-red-100 text-red-700' 
                    : uploadStatus.includes('successfully')
                    ? 'bg-green-100 text-green-700'
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {uploadStatus}
                </div>
              )}
            </div>
            
            {/* Logo Preview */}
            {qrSettings.logoUrl && (
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-4 mb-4 border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-white rounded-lg border flex items-center justify-center overflow-hidden">
                    <img
                      src={qrSettings.logoUrl}
                      alt="Logo preview"
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Logo selected</p>
                    <p className="text-xs text-gray-500">
                      {qrSettings.logo?.name || 'Custom logo'} 
                      {qrSettings.logo && ` • ${(qrSettings.logo.size / 1024).toFixed(1)}KB`}
                    </p>
                  </div>
                </div>
                <button
                  onClick={removeLogo}
                  className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors cursor-pointer"
                  title="Remove logo"
                >
                  <i className="ri-close-line text-lg"></i>
                </button>
              </div>
            )}
          </div>

          {/* Logo Size */}
          {qrSettings.logoUrl && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Logo Size: {qrSettings.logoSize}%
              </label>
              <input
                type="range"
                min="10"
                max="30"
                step="2"
                value={qrSettings.logoSize}
                onChange={(e) => setQrSettings({...qrSettings, logoSize: parseInt(e.target.value)})}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">
                Keep logo size under 30% for optimal scanning
              </p>
            </div>
          )}
        </div>

        {/* Error Correction */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Error Correction Level
          </label>
          <select
            value={qrSettings.errorLevel}
            onChange={(e) => setQrSettings({...qrSettings, errorLevel: e.target.value})}
            className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-8"
          >
            <option value="L">Low (7%) - Basic protection</option>
            <option value="M">Medium (15%) - Standard use</option>
            <option value="Q">Quartile (25%) - Good with small logos</option>
            <option value="H">High (30%) - Best for logos and branding</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            Higher error correction allows better logo integration and damage resistance
          </p>
        </div>
      </div>

      {/* Download Options */}
      {qrCodeUrl && (
        <div className="space-y-3">
          <h4 className="font-semibold text-gray-900">Download Options</h4>
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={() => downloadQR('png')}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm whitespace-nowrap"
            >
              <i className="ri-download-line mr-1"></i>
              PNG
            </button>
            <button
              onClick={() => downloadQR('svg')}
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm whitespace-nowrap"
            >
              <i className="ri-download-line mr-1"></i>
              SVG
            </button>
            <button
              onClick={() => downloadQR('pdf')}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm whitespace-nowrap"
            >
              <i className="ri-download-line mr-1"></i>
              PDF
            </button>
          </div>
          <button className="w-full px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:shadow-lg transform hover:scale-105 transition-all duration-200 whitespace-nowrap">
            <i className="ri-save-line mr-2"></i>
            Save to Dashboard
          </button>
        </div>
      )}
    </div>
  );
}
