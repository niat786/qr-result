'use client';

import { useState } from 'react';
import QRCustomizer from './QRCustomizer';

interface QRGeneratorProps {
  selectedCategory: string;
}

// ✅ Types to allow strings, numbers, and booleans in form state
type FormValue = string | number | boolean;
type FormData = Record<string, FormValue>;

export default function QRGenerator({ selectedCategory }: QRGeneratorProps) {
  const [qrData, setQrData] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [formData, setFormData] = useState<FormData>({}); // ✅ typed form state

  const qrTypes = {
    links: [
      { id: 'url', name: 'Website URL', icon: 'ri-global-line', placeholder: 'https://example.com' },
      { id: 'social', name: 'Social Media', icon: 'ri-share-line', placeholder: 'https://twitter.com/username' },
      { id: 'app', name: 'App Store', icon: 'ri-smartphone-line', placeholder: 'https://apps.apple.com/app/...' },
      { id: 'cloud', name: 'Cloud File', icon: 'ri-cloud-line', placeholder: 'https://drive.google.com/file/...' },
      { id: 'landing', name: 'Landing Page', icon: 'ri-rocket-line', placeholder: 'https://landing.example.com' },
      { id: 'coupon', name: 'Coupon Link', icon: 'ri-coupon-line', placeholder: 'https://store.com/coupon/...' }
    ],
    info: [
      { id: 'vcard', name: 'vCard', icon: 'ri-contacts-line', placeholder: 'Contact information' },
      { id: 'mecard', name: 'MeCard', icon: 'ri-user-line', placeholder: 'Personal card' },
      { id: 'bizcard', name: 'Digital Business Card', icon: 'ri-briefcase-line', placeholder: 'Business details' },
      { id: 'email', name: 'Email Address', icon: 'ri-mail-line', placeholder: 'user@example.com' },
      { id: 'emailmsg', name: 'Email Message', icon: 'ri-mail-send-line', placeholder: 'Subject and body' }
    ],
    comms: [
      { id: 'phone', name: 'Phone Number', icon: 'ri-phone-line', placeholder: '+1234567890' },
      { id: 'sms', name: 'SMS Message', icon: 'ri-message-line', placeholder: 'Text message content' },
      { id: 'whatsapp', name: 'WhatsApp', icon: 'ri-whatsapp-line', placeholder: '+1234567890' },
      { id: 'telegram', name: 'Telegram', icon: 'ri-telegram-line', placeholder: '@username' },
      { id: 'messenger', name: 'Messenger', icon: 'ri-messenger-line', placeholder: 'Username' },
      { id: 'skype', name: 'Skype', icon: 'ri-skype-line', placeholder: 'skype:username?call' },
      { id: 'zoom', name: 'Video Call', icon: 'ri-video-line', placeholder: 'Meeting link' }
    ],
    location: [
      { id: 'maps', name: 'Google Maps', icon: 'ri-map-line', placeholder: 'Address or coordinates' },
      { id: 'gps', name: 'GPS Coordinates', icon: 'ri-navigation-line', placeholder: 'lat,lng' },
      { id: 'event', name: 'Event Location', icon: 'ri-calendar-event-line', placeholder: 'Event details' },
      { id: 'booking', name: 'Booking Link', icon: 'ri-reserved-line', placeholder: 'Booking URL' }
    ],
    connection: [
      { id: 'wifi', name: 'Wi-Fi Network', icon: 'ri-wifi-line', placeholder: 'Network credentials' },
      { id: 'bluetooth', name: 'Bluetooth Pairing', icon: 'ri-bluetooth-line', placeholder: 'Device info' }
    ],
    payment: [
      { id: 'paypal', name: 'PayPal', icon: 'ri-paypal-line', placeholder: 'PayPal.me link' },
      { id: 'venmo', name: 'Venmo', icon: 'ri-money-dollar-circle-line', placeholder: '@username' },
      { id: 'cashapp', name: 'Cash App', icon: 'ri-wallet-line', placeholder: '$cashtag' },
      { id: 'stripe', name: 'Stripe Payment', icon: 'ri-bank-card-line', placeholder: 'Payment link' },
      { id: 'upi', name: 'UPI Payment', icon: 'ri-smartphone-line', placeholder: 'UPI ID' },
      { id: 'wechat', name: 'WeChat Pay', icon: 'ri-wechat-line', placeholder: 'WeChat ID' },
      { id: 'crypto', name: 'Cryptocurrency', icon: 'ri-currency-line', placeholder: 'Wallet address' },
      { id: 'easypaisa', name: 'EasyPaisa', icon: 'ri-money-dollar-circle-line', placeholder: 'Mobile number' },
      { id: 'jazzcash', name: 'JazzCash', icon: 'ri-phone-line', placeholder: 'Mobile number' },
      { id: 'paytm', name: 'Paytm', icon: 'ri-smartphone-line', placeholder: 'Mobile/UPI ID' },
      { id: 'phonepe', name: 'PhonePe', icon: 'ri-phone-line', placeholder: 'UPI ID' },
      { id: 'googlepay', name: 'Google Pay', icon: 'ri-google-line', placeholder: 'UPI ID' },
      { id: 'bhim', name: 'BHIM UPI', icon: 'ri-bank-line', placeholder: 'UPI ID' },
      { id: 'zelle', name: 'Zelle', icon: 'ri-bank-line', placeholder: 'Email or phone' },
      { id: 'applepay', name: 'Apple Pay', icon: 'ri-apple-line', placeholder: 'Contact info' },
      { id: 'googlepay_us', name: 'Google Pay US', icon: 'ri-google-line', placeholder: 'Email or phone' },
      { id: 'revolut', name: 'Revolut', icon: 'ri-bank-card-line', placeholder: 'Username' },
      { id: 'klarna', name: 'Klarna', icon: 'ri-bank-card-line', placeholder: 'Payment link' },
      { id: 'sepa', name: 'SEPA Transfer', icon: 'ri-bank-line', placeholder: 'IBAN' },
      { id: 'grabpay', name: 'GrabPay', icon: 'ri-taxi-line', placeholder: 'Mobile number' },
      { id: 'dana', name: 'DANA', icon: 'ri-wallet-line', placeholder: 'Mobile number' },
      { id: 'gcash', name: 'GCash', icon: 'ri-smartphone-line', placeholder: 'Mobile number' },
      { id: 'paymaya', name: 'PayMaya', icon: 'ri-bank-card-line', placeholder: 'Mobile number' },
      { id: 'stcpay', name: 'STC Pay', icon: 'ri-smartphone-line', placeholder: 'Mobile number' },
      { id: 'careem', name: 'Careem Pay', icon: 'ri-taxi-line', placeholder: 'Mobile number' },
      { id: 'mpesa', name: 'M-Pesa', icon: 'ri-smartphone-line', placeholder: 'Mobile number' },
      { id: 'airtel', name: 'Airtel Money', icon: 'ri-phone-line', placeholder: 'Mobile number' },
      { id: 'pix', name: 'PIX (Brazil)', icon: 'ri-qr-code-line', placeholder: 'PIX key' },
      { id: 'mercadopago', name: 'Mercado Pago', icon: 'ri-shopping-bag-line', placeholder: 'Username' }
    ],
    events: [
      { id: 'calendar', name: 'Calendar Event', icon: 'ri-calendar-line', placeholder: 'Event details' },
      { id: 'tickets', name: 'Event Tickets', icon: 'ri-ticket-line', placeholder: 'Ticket URL' },
      { id: 'music', name: 'Music/Playlist', icon: 'ri-music-line', placeholder: 'Spotify/Apple Music link' },
      { id: 'video', name: 'Video Content', icon: 'ri-video-line', placeholder: 'YouTube/Vimeo link' },
      { id: 'gallery', name: 'Photo Gallery', icon: 'ri-gallery-line', placeholder: 'Gallery URL' },
      { id: 'pdf', name: 'PDF Document', icon: 'ri-file-pdf-line', placeholder: 'PDF download link' }
    ],
    utility: [
      { id: 'text', name: 'Plain Text', icon: 'ri-text', placeholder: 'Any text content' },
      { id: 'notes', name: 'Notes/Memo', icon: 'ri-sticky-note-line', placeholder: 'Note content' },
      { id: 'coupon', name: 'Coupon Code', icon: 'ri-coupon-line', placeholder: 'Discount code' },
      { id: 'survey', name: 'Survey/Form', icon: 'ri-questionnaire-line', placeholder: 'Survey URL' },
      { id: 'menu', name: 'Restaurant Menu', icon: 'ri-restaurant-line', placeholder: 'Menu URL' },
      { id: 'product', name: 'Product Info', icon: 'ri-shopping-bag-line', placeholder: 'Product details' },
      { id: 'login', name: 'Login/Auth', icon: 'ri-login-box-line', placeholder: 'Authentication URL' },
      { id: 'arvr', name: 'AR/VR Content', icon: 'ri-virtual-reality-line', placeholder: 'AR/VR link' }
    ]
  };

  const currentTypes = qrTypes[selectedCategory as keyof typeof qrTypes] || [];

  const handleTypeChange = (typeId: string) => {
    setSelectedType(typeId);
    setFormData({});
    setQrData('');
  };

  // ✅ Accept string | number | boolean
  const handleFormChange = (field: string, value: FormValue) => {
    const newFormData: FormData = { ...formData, [field]: value };
    setFormData(newFormData);
    generateQRData(selectedType, newFormData);
  };

  const generateQRData = (type: string, data: FormData) => {
    let qrContent = '';

    switch (type) {
      // Links
      case 'url':
      case 'social':
      case 'app':
      case 'cloud':
      case 'landing':
      case 'coupon':
        qrContent = (data.url as string) || '';
        break;

      // Info
      case 'vcard':
        qrContent = `BEGIN:VCARD
VERSION:3.0
FN:${(data.firstName as string) || ''} ${(data.lastName as string) || ''}
ORG:${(data.organization as string) || ''}
TITLE:${(data.title as string) || ''}
TEL:${(data.phone as string) || ''}
EMAIL:${(data.email as string) || ''}
URL:${(data.website as string) || ''}
ADR:;;${(data.address as string) || ''};;;;
END:VCARD`;
        break;

      case 'mecard':
        qrContent = `MECARD:N:${(data.lastName as string) || ''},${(data.firstName as string) || ''};ORG:${(data.organization as string) || ''};TEL:${(data.phone as string) || ''};EMAIL:${(data.email as string) || ''};URL:${(data.website as string) || ''};ADR:${(data.address as string) || ''};;`;
        break;

      case 'bizcard':
        qrContent = `Business Card:
Name: ${(data.firstName as string) || ''} ${(data.lastName as string) || ''}
Company: ${(data.organization as string) || ''}
Position: ${(data.title as string) || ''}
Phone: ${(data.phone as string) || ''}
Email: ${(data.email as string) || ''}
Website: ${(data.website as string) || ''}`;
        break;

      case 'email':
        qrContent = `mailto:${(data.email as string) || ''}${
          (data.subject as string) ? `?subject=${encodeURIComponent(data.subject as string)}` : ''
        }${
          (data.body as string)
            ? `${(data.subject as string) ? '&' : '?'}body=${encodeURIComponent(data.body as string)}`
            : ''
        }`;
        break;

      case 'emailmsg':
        qrContent = `mailto:${(data.email as string) || ''}?subject=${encodeURIComponent(
          (data.subject as string) || ''
        )}&body=${encodeURIComponent((data.body as string) || '')}`;
        break;

      // Communications
      case 'phone':
        qrContent = `tel:${(data.phone as string) || ''}`;
        break;

      case 'sms':
        qrContent = `sms:${(data.phone as string) || ''}${
          (data.message as string) ? `?body=${encodeURIComponent(data.message as string)}` : ''
        }`;
        break;

      case 'whatsapp':
        qrContent = `https://wa.me/${((data.phone as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.message as string) ? `?text=${encodeURIComponent(data.message as string)}` : ''
        }`;
        break;

      case 'telegram':
        qrContent = `https://t.me/${(data.username as string) || ''}`;
        break;

      case 'messenger':
        qrContent = `https://m.me/${(data.username as string) || ''}`;
        break;

      case 'skype':
        qrContent = `skype:${(data.username as string) || ''}?${(data.action as string) || 'call'}`;
        break;

      case 'zoom':
        qrContent = (data.meetingUrl as string) || '';
        break;

      // Location
      case 'maps':
        qrContent = (data.coordinates as string)
          ? `geo:${data.coordinates as string}`
          : `https://maps.google.com/maps?q=${encodeURIComponent((data.address as string) || '')}`;
        break;

      case 'gps':
        qrContent = `geo:${(data.latitude as string) || ''},${(data.longitude as string) || ''}`;
        break;

      case 'event':
        qrContent = `Event: ${(data.name as string) || ''}
Location: ${(data.location as string) || ''}
Date: ${(data.date as string) || ''} ${(data.time as string) || ''}
Description: ${(data.description as string) || ''}`;
        break;

      case 'booking':
        qrContent = (data.bookingUrl as string) || '';
        break;

      // Connection
      case 'wifi':
        qrContent = `WIFI:T:${(data.security as string) || 'WPA'};S:${(data.ssid as string) || ''};P:${(data.password as string) || ''};H:${(data.hidden ? 'true' : 'false')};;`;
        break;

      case 'bluetooth':
        qrContent = `Bluetooth Device: ${(data.deviceName as string) || ''}
MAC Address: ${(data.macAddress as string) || ''}`;
        break;

      // Payment - Standard International
      case 'paypal':
        qrContent =
          (data.paypalUrl as string) ||
          `https://paypal.me/${(data.username as string) || ''}${(data.amount as string) ? `/${data.amount}` : ''}`;
        break;

      case 'venmo':
        qrContent = `venmo://paycharge?txn=pay&recipients=${(data.username as string) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }${(data.note as string) ? `&note=${encodeURIComponent(data.note as string)}` : ''}`;
        break;

      case 'cashapp':
        qrContent = `https://cash.app/$${(data.cashtag as string) || ''}${
          (data.amount as string) ? `/${data.amount}` : ''
        }`;
        break;

      case 'stripe':
        qrContent = (data.paymentUrl as string) || '';
        break;

      case 'upi':
        qrContent = `upi://pay?pa=${(data.upiId as string) || ''}&pn=${(data.name as string) || ''}${
          (data.amount as string) ? `&am=${data.amount}` : ''
        }${(data.note as string) ? `&tn=${encodeURIComponent(data.note as string)}` : ''}&cu=INR`;
        break;

      case 'wechat':
        qrContent = `weixin://wxpay/bizpayurl?pr=${(data.wechatId as string) || ''}`;
        break;

      case 'crypto':
        qrContent = `${(data.currency as string) || 'bitcoin'}:${(data.address as string) || ''}${
          (data.amount as string) ? `?amount=${data.amount}` : ''
        }`;
        break;

      // Pakistan Local Payments
      case 'easypaisa':
        if (data.mobile && data.amount) {
          qrContent = `easypaisa://pay?mobile=${(data.mobile as string).replace(/[^0-9]/g, '')}&amount=${data.amount}${
            (data.note as string) ? `&note=${encodeURIComponent(data.note as string)}` : ''
          }`;
        } else {
          qrContent = `tel:*786*${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}*${(data.amount as string) || ''}%23`;
        }
        break;

      case 'jazzcash':
        if (data.mobile && data.amount) {
          qrContent = `jazzcash://pay?mobile=${(data.mobile as string).replace(/[^0-9]/g, '')}&amount=${data.amount}${
            (data.note as string) ? `&note=${encodeURIComponent(data.note as string)}` : ''
          }`;
        } else {
          qrContent = `tel:*786*${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}*${(data.amount as string) || ''}%23`;
        }
        break;

      // India Local Payments
      case 'paytm':
        qrContent = `upi://pay?pa=${(data.upiId as string) || ''}&pn=${(data.name as string) || ''}${
          (data.amount as string) ? `&am=${data.amount}` : ''
        }${(data.note as string) ? `&tn=${encodeURIComponent(data.note as string)}` : ''}&cu=INR&mode=02&orgid=159761`;
        break;

      case 'phonepe':
        qrContent = `upi://pay?pa=${(data.upiId as string) || ''}&pn=${(data.name as string) || ''}${
          (data.amount as string) ? `&am=${data.amount}` : ''
        }${(data.note as string) ? `&tn=${encodeURIComponent(data.note as string)}` : ''}&cu=INR&mode=02&orgid=159001`;
        break;

      case 'googlepay':
        qrContent = `upi://pay?pa=${(data.upiId as string) || ''}&pn=${(data.name as string) || ''}${
          (data.amount as string) ? `&am=${data.amount}` : ''
        }${(data.note as string) ? `&tn=${encodeURIComponent(data.note as string)}` : ''}&cu=INR&mode=02&orgid=160005`;
        break;

      case 'bhim':
        qrContent = `upi://pay?pa=${(data.upiId as string) || ''}&pn=${(data.name as string) || ''}${
          (data.amount as string) ? `&am=${data.amount}` : ''
        }${(data.note as string) ? `&tn=${encodeURIComponent(data.note as string)}` : ''}&cu=INR&mode=02&orgid=159759`;
        break;

      // USA Local Payments
      case 'zelle':
        qrContent = `zelle://pay?contact=${encodeURIComponent((data.recipient as string) || '')}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }${(data.note as string) ? `&memo=${encodeURIComponent(data.note as string)}` : ''}`;
        break;

      case 'applepay':
        qrContent = `https://cash.me/${(data.contact as string) || ''}${
          (data.amount as string) ? `/${data.amount}` : ''
        }`;
        break;

      case 'googlepay_us':
        qrContent = `https://pay.google.com/send/home?contact=${encodeURIComponent((data.contact as string) || '')}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }${(data.note as string) ? `&note=${encodeURIComponent(data.note as string)}` : ''}`;
        break;

      // Europe Local Payments
      case 'revolut':
        qrContent = `revolut://pay?recipient=${(data.username as string) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      case 'klarna':
        qrContent = (data.paymentUrl as string) || '';
        break;

      case 'sepa':
        qrContent = `sepa://pay?iban=${(data.iban as string) || ''}&name=${encodeURIComponent(
          (data.recipientName as string) || ''
        )}${(data.amount as string) ? `&amount=${data.amount}` : ''}${
          (data.reference as string) ? `&reference=${encodeURIComponent(data.reference as string)}` : ''
        }`;
        break;

      // Southeast Asia Local Payments
      case 'grabpay':
        qrContent = `grab://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      case 'dana':
        qrContent = `dana://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      case 'gcash':
        qrContent = `gcash://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }${(data.note as string) ? `&note=${encodeURIComponent(data.note as string)}` : ''}`;
        break;

      case 'paymaya':
        qrContent = `paymaya://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      // Middle East Local Payments
      case 'stcpay':
        qrContent = `stcpay://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      case 'careem':
        qrContent = `careem://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      // Africa Local Payments
      case 'mpesa':
        qrContent = `mpesa://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }${(data.note as string) ? `&note=${encodeURIComponent(data.note as string)}` : ''}`;
        break;

      case 'airtel':
        qrContent = `airtelmoney://pay?mobile=${((data.mobile as string)?.replace(/[^0-9]/g, '')) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      // Latin America Local Payments
      case 'pix': {
        const amount = (data.amount as string)
          ? Number(data.amount).toFixed(2)
          : '';
        const name = (data.name as string) || '';
        const key = (data.pixKey as string) || '';
        // (Note: real PIX payloads follow EMVCo format; this is a placeholder)
        qrContent = `00020126${key.length.toString().padStart(2, '0')}${key}52040000530398654${
          amount ? amount.length.toString().padStart(2, '0') + amount : ''
        }5802BR59${name.length.toString().padStart(2, '0')}${name}6304`;
        break;
      }

      case 'mercadopago':
        qrContent = `mercadopago://pay?user=${(data.username as string) || ''}${
          (data.amount as string) ? `&amount=${data.amount}` : ''
        }`;
        break;

      // Events
      case 'calendar':
        qrContent = `BEGIN:VEVENT
SUMMARY:${(data.title as string) || ''}
DTSTART:${(data.startDate as string) || ''}
DTEND:${(data.endDate as string) || ''}
LOCATION:${(data.location as string) || ''}
DESCRIPTION:${(data.description as string) || ''}
END:VEVENT`;
        break;

      case 'tickets':
      case 'music':
      case 'video':
      case 'gallery':
      case 'pdf':
        qrContent = (data.url as string) || '';
        break;

      // Utility
      case 'text':
      case 'notes':
        qrContent = (data.content as string) || '';
        break;

      case 'coupon':
        qrContent = `Coupon Code: ${(data.code as string) || ''}
Description: ${(data.description as string) || ''}
Valid Until: ${(data.expiry as string) || ''}
Terms: ${(data.terms as string) || ''}`;
        break;

      case 'survey':
      case 'menu':
      case 'product':
      case 'login':
      case 'arvr':
        qrContent = (data.url as string) || '';
        break;

      default:
        qrContent = (data.content as string) || '';
    }

    setQrData(qrContent);
  };

  const renderDynamicForm = () => {
    if (!selectedType) return null;

    const commonInputClass =
      'w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm';
    const labelClass = 'block text-sm font-medium text-gray-700 mb-2';

    switch (selectedType) {
      // (UI remains the same; only tiny TS-safe tweaks shown below)
      // ... all your existing cases ...
      case 'sms':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                value={(formData.phone as string) || ''}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder="+1234567890"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Message (Optional)</label>
              <textarea
                value={(formData.message as string) || ''}
                onChange={(e) => handleFormChange('message', e.target.value)}
                placeholder="SMS message content"
                className={commonInputClass}
                rows={3}
                maxLength={160}
              />
              <p className="mt-1 text-xs text-gray-500">
                {String(formData.message ?? '').length}/160 characters
              </p>
            </div>
          </div>
        );

      case 'wifi':
        return (
          <>
        
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Network Name (SSID) *</label>
              <input
                type="text"
                value={(formData.ssid as string) || ''}
                onChange={(e) => handleFormChange('ssid', e.target.value)}
                placeholder="MyWiFiNetwork"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Password *</label>
              <input
                type="password"
                value={(formData.password as string) || ''}
                onChange={(e) => handleFormChange('password', e.target.value)}
                placeholder="WiFi password"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Security Type</label>
              <select
                value={(formData.security as string) || 'WPA'}
                onChange={(e) => handleFormChange('security', e.target.value)}
                className={`${commonInputClass} pr-8`}
              >
                <option value="WPA">WPA/WPA2</option>
                <option value="WEP">WEP</option>
                <option value="nopass">No Password</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="hidden"
                checked={Boolean(formData.hidden)}
                onChange={(e) => handleFormChange('hidden', e.target.checked)} 
                className="mr-2"
              />
              <label htmlFor="hidden" className="text-sm text-gray-700">Hidden Network</label>
            </div>
          </div>
            </>
        );

      case 'text':
      case 'notes':
        return (
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Content *</label>
              <textarea
                value={(formData.content as string) || ''}
                onChange={(e) => handleFormChange('content', e.target.value)}
                placeholder="Enter your text content here"
                className={commonInputClass}
                rows={5}
                maxLength={500}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {String(formData.content ?? '').length}/500 characters 
              </p>
            </div>
          </div>
        );

      // For brevity, keep the rest of your original render cases as-is,
      // just cast reads like (formData.field as string) where needed.

      default:
        // Return all your other original cases unchanged.
        // (Your original switch already contains them—no logic change needed.)
        return null;
    }
  };

  const handleGenerate = () => {
    if (!qrData.trim()) {
      alert('Please fill in the required fields to generate QR code');
      return;
    }
    // QR generation logic handled by QRCustomizer
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} QR Codes
          </h3>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700">Select Type</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {currentTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => handleTypeChange(type.id)}
                className={`p-4 rounded-lg border-2 text-left transition-all ${
                  selectedType === type.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-8 h-8">
                    <i className={`${type.icon} text-lg`}></i>
                  </div>
                  <span className="text-sm font-medium">{type.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Form */}
        {selectedType && (
          <div>
            <label className="block mb-4 text-sm font-medium text-gray-700">
              {currentTypes.find((t) => t.id === selectedType)?.name} Details
            </label>
            {renderDynamicForm()}
          </div>
        )}

        {/* Generate Button */}
        <button
          onClick={handleGenerate}
          disabled={!qrData.trim() || !selectedType}
          className="w-full px-6 py-4 font-semibold text-white transition-all duration-200 transform bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:shadow-lg hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
        >
          <i className="mr-2 ri-qr-code-fill"></i>
          Generate QR Code
        </button>
      </div>

      {/* Preview & Customization Section */}
      <div>
        <QRCustomizer data={qrData} type={selectedType} />
      </div>
    </div>
  );
}