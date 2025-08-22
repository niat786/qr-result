
'use client';
import { useState } from 'react';
import { QRType } from './QRCodeGenerator';

interface QRTypeSelectorProps {
  activeType: QRType;
  onTypeChange: (type: QRType) => void;
}

const QR_TYPES: { type: QRType; icon: string; label: string; description: string }[] = [
  { type: 'URL', icon: 'ri-link', label: 'Website', description: 'Link to any website or webpage' },
  { type: 'Contact', icon: 'ri-contacts-book-line', label: 'Contact', description: 'Share contact information' },
  { type: 'WiFi', icon: 'ri-wifi-line', label: 'WiFi', description: 'Connect to wireless network' },
  { type: 'Text', icon: 'ri-file-text-line', label: 'Text', description: 'Plain text message' },
  { type: 'Email', icon: 'ri-mail-line', label: 'Email', description: 'Send pre-filled email' },
  { type: 'Event', icon: 'ri-calendar-event-line', label: 'Event', description: 'Add calendar event' },
  { type: 'Phone', icon: 'ri-phone-line', label: 'Phone', description: 'Make phone call' },
  { type: 'SMS', icon: 'ri-message-2-line', label: 'SMS', description: 'Send text message' },
  { type: 'WhatsApp', icon: 'ri-whatsapp-line', label: 'WhatsApp', description: 'Start WhatsApp chat' },
  { type: 'Location', icon: 'ri-map-pin-line', label: 'Location', description: 'Share GPS coordinates' },
  { type: 'Social', icon: 'ri-share-line', label: 'Social', description: 'Social media profiles' },
  { type: 'App', icon: 'ri-smartphone-line', label: 'App Store', description: 'Link to mobile app' }
];

export default function QRTypeSelector({ activeType, onTypeChange }: QRTypeSelectorProps) {
  return (
    <div className="flex flex-col">
      <div className="flex-shrink-0">
        {/* <h3 className="mb-2 text-lg font-semibold text-gray-900">Select QR Code Type</h3> */}
        {/* <p className="text-sm text-gray-600">Choose what type of information your QR code will contain</p> */}
      </div>
      <div className="grid grid-cols-2 gap-2 px-5 py-10 space-y-2 overflow-y-auto bg-white rounded-xl">
        {QR_TYPES.map(({ type, icon, label, description }) => (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={`w-full flex items-center p-4 rounded-xl border-2 transition-all text-left cursor-pointer ${
              activeType === type
                ? 'border-blue-500 bg-blue-50 text-blue-700'
                : 'border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
            }`}
          >
            <div
              className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                activeType === type ? 'bg-blue-100' : 'bg-gray-100'
              }`}
            >
              <i className={`${icon} text-xl`}></i>
            </div>
            <div className="flex-1">
              <div className="font-medium">{label}</div>
              <div className="text-xs opacity-75">{description}</div>
            </div>
            {activeType === type && <i className="text-xl text-blue-600 ri-check-line"></i>}
          </button>
        ))}
      </div>
    </div>
  );
}

interface QRTypeFormProps {
  type: QRType;
  onDataChange: (data: string) => void;
}

function QRTypeForm({ type, onDataChange }: QRTypeFormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({});

  const updateFormData = (field: string, value: string) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    generateQRData(type, newData);
  };

  const generateQRData = (type: QRType, data: Record<string, string>) => {
    let qrString = '';

    switch (type) {
      case 'URL':
        qrString = data.url || '';
        break;
      case 'Contact':
        qrString = `BEGIN:VCARD
VERSION:3.0
FN:${data.name || ''}
ORG:${data.organization || ''}
TEL:${data.phone || ''}
EMAIL:${data.email || ''}
URL:${data.website || ''}
END:VCARD`;
        break;
      case 'WiFi':
        qrString = `WIFI:T:${data.security || 'WPA'};S:${data.ssid || ''};P:${data.password || ''};H:${data.hidden === 'true' ? 'true' : 'false'};;`;
        break;
      case 'Text':
        qrString = data.text || '';
        break;
      case 'Email':
        qrString = `mailto:${data.to || ''}?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(data.body || '')}`;
        break;
      case 'Event':
        const startDate = data.startDate ? new Date(data.startDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
        const endDate = data.endDate ? new Date(data.endDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z' : '';
        qrString = `BEGIN:VEVENT
SUMMARY:${data.title || ''}
DTSTART:${startDate}
DTEND:${endDate}
DESCRIPTION:${data.description || ''}
LOCATION:${data.location || ''}
END:VEVENT`;
        break;
      case 'Phone':
        qrString = `tel:${data.phone || ''}`;
        break;
      case 'SMS':
        qrString = `sms:${data.phone || ''}?body=${encodeURIComponent(data.message || '')}`;
        break;
      case 'WhatsApp':
        qrString = `https://wa.me/${data.phone || ''}?text=${encodeURIComponent(data.message || '')}`;
        break;
      case 'Location':
        qrString = `geo:${data.latitude || ''},${data.longitude || ''}`;
        break;
      case 'Social':
        const platform = data.platform || 'twitter';
        let socialUrl = '';
        switch (platform) {
          case 'twitter':
            socialUrl = `https://twitter.com/${data.username || ''}`;
            break;
          case 'instagram':
            socialUrl = `https://instagram.com/${data.username || ''}`;
            break;
          case 'facebook':
            socialUrl = `https://facebook.com/${data.username || ''}`;
            break;
          case 'linkedin':
            socialUrl = `https://linkedin.com/in/${data.username || ''}`;
            break;
          case 'youtube':
            socialUrl = `https://youtube.com/@${data.username || ''}`;
            break;
        }
        qrString = socialUrl;
        break;
      case 'App':
        const store = data.store || 'google';
        if (store === 'google') {
          qrString = `https://play.google.com/store/apps/details?id=${data.packageId || ''}`;
        } else {
          qrString = `https://apps.apple.com/app/id${data.appId || ''}`;
        }
        break;
    }

    onDataChange(qrString);
  };

  const renderForm = () => {
    switch (type) {
      case 'URL':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Website URL</label>
            <input
              type="url"
              placeholder="https://example.com"
              value={formData.url || ''}
              onChange={(e) => updateFormData('url', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        );

      case 'Contact':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Full Name</label>
              <input
                type="text"
                placeholder="John Doe"
                value={formData.name || ''}
                onChange={(e) => updateFormData('name', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Organization</label>
              <input
                type="text"
                placeholder="Company Name"
                value={formData.organization || ''}
                onChange={(e) => updateFormData('organization', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                placeholder="john@example.com"
                value={formData.email || ''}
                onChange={(e) => updateFormData('email', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Website</label>
              <input
                type="url"
                placeholder="https://example.com"
                value={formData.website || ''}
                onChange={(e) => updateFormData('website', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
        );

      case 'WiFi':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Network Name (SSID)</label>
              <input
                type="text"
                placeholder="MyWiFiNetwork"
                value={formData.ssid || ''}
                onChange={(e) => updateFormData('ssid', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                placeholder="WiFi Password"
                value={formData.password || ''}
                onChange={(e) => updateFormData('password', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Security Type</label>
              <div className="relative">
                <select
                  value={formData.security || 'WPA'}
                  onChange={(e) => updateFormData('security', e.target.value)}
                  className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="WPA">WPA/WPA2</option>
                  <option value="WEP">WEP</option>
                  <option value="nopass">Open Network</option>
                </select>
                <i className="absolute text-gray-400 -translate-y-1/2 pointer-events-none ri-arrow-down-s-line right-2 top-1/2"></i>
              </div>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hidden"
                checked={formData.hidden === 'true'}
                onChange={(e) => updateFormData('hidden', e.target.checked ? 'true' : 'false')}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded cursor-pointer focus:ring-blue-500"
              />
              <label htmlFor="hidden" className="ml-2 text-sm text-gray-700 cursor-pointer">Hidden Network</label>
            </div>
          </div>
        );

      case 'Text':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Text Content</label>
            <textarea
              placeholder="Enter your text here..."
              value={formData.text || ''}
              onChange={(e) => updateFormData('text', e.target.value)}
              rows={4}
              maxLength={500}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">{(formData.text || '').length}/500 characters</p>
          </div>
        );

      case 'Email':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">To Email</label>
              <input
                type="email"
                placeholder="recipient@example.com"
                value={formData.to || ''}
                onChange={(e) => updateFormData('to', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Subject</label>
              <input
                type="text"
                placeholder="Email Subject"
                value={formData.subject || ''}
                onChange={(e) => updateFormData('subject', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Message</label>
              <textarea
                placeholder="Email message content..."
                value={formData.body || ''}
                onChange={(e) => updateFormData('body', e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">{(formData.body || '').length}/500 characters</p>
            </div>
          </div>
        );

      case 'Event':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                placeholder="Meeting Title"
                value={formData.title || ''}
                onChange={(e) => updateFormData('title', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="datetime-local"
                  value={formData.startDate || ''}
                  onChange={(e) => updateFormData('startDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="datetime-local"
                  value={formData.endDate || ''}
                  onChange={(e) => updateFormData('endDate', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                placeholder="Meeting Location"
                value={formData.location || ''}
                onChange={(e) => updateFormData('location', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Description</label>
              <textarea
                placeholder="Event description..."
                value={formData.description || ''}
                onChange={(e) => updateFormData('description', e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">{(formData.description || '').length}/500 characters</p>
            </div>
          </div>
        );

      case 'Phone':
        return (
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
            <input
              type="tel"
              placeholder="+1 234 567 8900"
              value={formData.phone || ''}
              onChange={(e) => updateFormData('phone', e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <p className="mt-1 text-xs text-gray-500">Include country code for international numbers</p>
          </div>
        );

      case 'SMS':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Phone Number</label>
              <input
                type="tel"
                placeholder="+1 234 567 8900"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Pre-filled Message</label>
              <textarea
                placeholder="Enter SMS message..."
                value={formData.message || ''}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={3}
                maxLength={160}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">{(formData.message || '').length}/160 characters</p>
            </div>
          </div>
        );

      case 'WhatsApp':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">WhatsApp Number</label>
              <input
                type="tel"
                placeholder="1234567890 (without + or country code)"
                value={formData.phone || ''}
                onChange={(e) => updateFormData('phone', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Enter number with country code but without + symbol</p>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Pre-filled Message</label>
              <textarea
                placeholder="Hello! I found your contact through the QR code..."
                value={formData.message || ''}
                onChange={(e) => updateFormData('message', e.target.value)}
                rows={3}
                maxLength={500}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">{(formData.message || '').length}/500 characters</p>
            </div>
          </div>
        );

      case 'Location':
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Latitude</label>
                <input
                  type="number"
                  step="any"
                  placeholder="40.7128"
                  value={formData.latitude || ''}
                  onChange={(e) => updateFormData('latitude', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Longitude</label>
                <input
                  type="number"
                  step="any"
                  placeholder="-74.0060"
                  value={formData.longitude || ''}
                  onChange={(e) => updateFormData('longitude', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
            <div className="p-3 rounded-lg bg-blue-50">
              <div className="flex items-start space-x-2">
                <i className="ri-information-line text-blue-500 mt-0.5 flex-shrink-0"></i>
                <div className="text-sm text-blue-700">
                  You can get coordinates from Google Maps by right-clicking on a location
                </div>
              </div>
            </div>
          </div>
        );

      case 'Social':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Social Platform</label>
              <div className="relative">
                <select
                  value={formData.platform || 'twitter'}
                  onChange={(e) => updateFormData('platform', e.target.value)}
                  className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="twitter">Twitter</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="youtube">YouTube</option>
                </select>
                <i className="absolute text-gray-400 -translate-y-1/2 pointer-events-none ri-arrow-down-s-line right-2 top-1/2"></i>
              </div>
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">Username</label>
              <input
                type="text"
                placeholder="your_username"
                value={formData.username || ''}
                onChange={(e) => updateFormData('username', e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <p className="mt-1 text-xs text-gray-500">Enter username without @ symbol</p>
            </div>
          </div>
        );

      case 'App':
        return (
          <div className="space-y-4">
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">App Store</label>
              <div className="relative">
                <select
                  value={formData.store || 'google'}
                  onChange={(e) => updateFormData('store', e.target.value)}
                  className="w-full px-3 py-2 pr-8 text-sm border border-gray-300 rounded-lg appearance-none cursor-pointer focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="google">Google Play Store</option>
                  <option value="apple">Apple App Store</option>
                </select>
                <i className="absolute text-gray-400 -translate-y-1/2 pointer-events-none ri-arrow-down-s-line right-2 top-1/2"></i>
              </div>
            </div>
            {formData.store === 'apple' ? (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">App ID</label>
                <input
                  type="text"
                  placeholder="123456789"
                  value={formData.appId || ''}
                  onChange={(e) => updateFormData('appId', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Find the App ID in the App Store URL</p>
              </div>
            ) : (
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">Package ID</label>
                <input
                  type="text"
                  placeholder="com.example.app"
                  value={formData.packageId || ''}
                  onChange={(e) => updateFormData('packageId', e.target.value)}
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <p className="mt-1 text-xs text-gray-500">Find the package ID in the Play Store URL</p>
              </div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl">
      <h3 className="mb-4 text-lg font-semibold text-gray-900">
        {type} Details
      </h3>
      {renderForm()}
    </div>
  );
}

QRTypeSelector.Form = QRTypeForm;
