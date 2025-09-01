
'use client';

import { useState } from 'react';
import QRCustomizer from './QRCustomizer';

interface QRGeneratorProps {
  selectedCategory: string;
}
// type FormValue = string | number | boolean;
// type FormData = Record<string, FormValue>;
// put these near the top (after types/state)
type FormValue = string | number | boolean;
type FormData = Record<string, FormValue>;

const str = (v: FormValue | undefined) =>
  typeof v === 'string' ? v : v == null ? '' : String(v);

const num = (v: FormValue | undefined) =>
  typeof v === 'number' ? v : v == null || v === '' ? '' : Number(v);

const bool = (v: FormValue | undefined) => Boolean(v);

export default function QRGenerator({ selectedCategory }: QRGeneratorProps) {
  const [qrData, setQrData] = useState('');
  const [selectedType, setSelectedType] = useState('');


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
      
      // Pakistan Local Payments
      { id: 'easypaisa', name: 'EasyPaisa', icon: 'ri-money-dollar-circle-line', placeholder: 'Mobile number' },
      { id: 'jazzcash', name: 'JazzCash', icon: 'ri-phone-line', placeholder: 'Mobile number' },
      
      // India Local Payments
      { id: 'paytm', name: 'Paytm', icon: 'ri-smartphone-line', placeholder: 'Mobile/UPI ID' },
      { id: 'phonepe', name: 'PhonePe', icon: 'ri-phone-line', placeholder: 'UPI ID' },
      { id: 'googlepay', name: 'Google Pay', icon: 'ri-google-line', placeholder: 'UPI ID' },
      { id: 'bhim', name: 'BHIM UPI', icon: 'ri-bank-line', placeholder: 'UPI ID' },
      
      // USA Local Payments
      { id: 'zelle', name: 'Zelle', icon: 'ri-bank-line', placeholder: 'Email or phone' },
      { id: 'applepay', name: 'Apple Pay', icon: 'ri-apple-line', placeholder: 'Contact info' },
      { id: 'googlepay_us', name: 'Google Pay US', icon: 'ri-google-line', placeholder: 'Email or phone' },
      
      // Europe Local Payments
      { id: 'revolut', name: 'Revolut', icon: 'ri-bank-card-line', placeholder: 'Username' },
      { id: 'klarna', name: 'Klarna', icon: 'ri-bank-card-line', placeholder: 'Payment link' },
      { id: 'sepa', name: 'SEPA Transfer', icon: 'ri-bank-line', placeholder: 'IBAN' },
      
      // Southeast Asia Local Payments
      { id: 'grabpay', name: 'GrabPay', icon: 'ri-taxi-line', placeholder: 'Mobile number' },
      { id: 'dana', name: 'DANA', icon: 'ri-wallet-line', placeholder: 'Mobile number' },
      { id: 'gcash', name: 'GCash', icon: 'ri-smartphone-line', placeholder: 'Mobile number' },
      { id: 'paymaya', name: 'PayMaya', icon: 'ri-bank-card-line', placeholder: 'Mobile number' },
      
      // Middle East Local Payments
      { id: 'stcpay', name: 'STC Pay', icon: 'ri-smartphone-line', placeholder: 'Mobile number' },
      { id: 'careem', name: 'Careem Pay', icon: 'ri-taxi-line', placeholder: 'Mobile number' },
      
      // Africa Local Payments
      { id: 'mpesa', name: 'M-Pesa', icon: 'ri-smartphone-line', placeholder: 'Mobile number' },
      { id: 'airtel', name: 'Airtel Money', icon: 'ri-phone-line', placeholder: 'Mobile number' },
      
      // Latin America Local Payments
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

  // at the top of your component file
type FormValue = string | number | boolean;
type FormData = Record<string, FormValue>;

const [formData, setFormData] = useState<FormData>({});

// update handleFormChange
const handleFormChange = (field: string, value: FormValue) => {
  const newFormData = { ...formData, [field]: value };
  setFormData(newFormData);
  generateQRData(selectedType, newFormData);
};

  const generateQRData = (type: string, data: any) => {
    let qrContent = '';
    
    switch (type) {
      // Links
      case 'url':
      case 'social':
      case 'app':
      case 'cloud':
      case 'landing':
      case 'coupon':
        qrContent = data.url || '';
        break;
        
      // Info
      case 'vcard':
        qrContent = `BEGIN:VCARD
VERSION:3.0
FN:${data.firstName || ''} ${data.lastName || ''}
ORG:${data.organization || ''}
TITLE:${data.title || ''}
TEL:${data.phone || ''}
EMAIL:${data.email || ''}
URL:${data.website || ''}
ADR:;;${data.address || ''};;;;
END:VCARD`;
        break;
        
      case 'mecard':
        qrContent = `MECARD:N:${data.lastName || ''},${data.firstName || ''};ORG:${data.organization || ''};TEL:${data.phone || ''};EMAIL:${data.email || ''};URL:${data.website || ''};ADR:${data.address || ''};;`;
        break;
        
      case 'bizcard':
        qrContent = `Business Card:
Name: ${data.firstName || ''} ${data.lastName || ''}
Company: ${data.organization || ''}
Position: ${data.title || ''}
Phone: ${data.phone || ''}
Email: ${data.email || ''}
Website: ${data.website || ''}`;
        break;
        
      case 'email':
        qrContent = `mailto:${data.email || ''}${data.subject ? `?subject=${encodeURIComponent(data.subject)}` : ''}${data.body ? `${data.subject ? '&' : '?'}body=${encodeURIComponent(data.body)}` : ''}`;
        break;
        
      case 'emailmsg':
        qrContent = `mailto:${data.email || ''}?subject=${encodeURIComponent(data.subject || '')}&body=${encodeURIComponent(data.body || '')}`;
        break;
        
      // Communications
      case 'phone':
        qrContent = `tel:${data.phone || ''}`;
        break;
        
      case 'sms':
        qrContent = `sms:${data.phone || ''}${data.message ? `?body=${encodeURIComponent(data.message)}` : ''}`;
        break;
        
      case 'whatsapp':
        qrContent = `https://wa.me/${data.phone?.replace(/[^0-9]/g, '') || ''}${data.message ? `?text=${encodeURIComponent(data.message)}` : ''}`;
        break;
        
      case 'telegram':
        qrContent = `https://t.me/${data.username || ''}`;
        break;
        
      case 'messenger':
        qrContent = `https://m.me/${data.username || ''}`;
        break;
        
      case 'skype':
        qrContent = `skype:${data.username || ''}?${data.action || 'call'}`;
        break;
        
      case 'zoom':
        qrContent = data.meetingUrl || '';
        break;
        
      // Location
      case 'maps':
        qrContent = data.coordinates ? `geo:${data.coordinates}` : `https://maps.google.com/maps?q=${encodeURIComponent(data.address || '')}`;
        break;
        
      case 'gps':
        qrContent = `geo:${data.latitude || ''},${data.longitude || ''}`;
        break;
        
      case 'event':
        qrContent = `Event: ${data.name || ''}
Location: ${data.location || ''}
Date: ${data.date || ''} ${data.time || ''}
Description: ${data.description || ''}`;
        break;
        
      case 'booking':
        qrContent = data.bookingUrl || '';
        break;
        
      // Connection
      case 'wifi':
        qrContent = `WIFI:T:${data.security || 'WPA'};S:${data.ssid || ''};P:${data.password || ''};H:${data.hidden ? 'true' : 'false'};;`;
        break;
        
      case 'bluetooth':
        qrContent = `Bluetooth Device: ${data.deviceName || ''}
MAC Address: ${data.macAddress || ''}`;
        break;
        
      // Payment - Standard International
      case 'paypal':
        qrContent = data.paypalUrl || `https://paypal.me/${data.username || ''}${data.amount ? `/${data.amount}` : ''}`;
        break;
        
      case 'venmo':
        qrContent = `venmo://paycharge?txn=pay&recipients=${data.username || ''}${data.amount ? `&amount=${data.amount}` : ''}${data.note ? `&note=${encodeURIComponent(data.note)}` : ''}`;
        break;
        
      case 'cashapp':
        qrContent = `https://cash.app/$${data.cashtag || ''}${data.amount ? `/${data.amount}` : ''}`;
        break;
        
      case 'stripe':
        qrContent = data.paymentUrl || '';
        break;
        
      case 'upi':
        qrContent = `upi://pay?pa=${data.upiId || ''}&pn=${data.name || ''}${data.amount ? `&am=${data.amount}` : ''}${data.note ? `&tn=${encodeURIComponent(data.note)}` : ''}&cu=INR`;
        break;
        
      case 'wechat':
        qrContent = `weixin://wxpay/bizpayurl?pr=${data.wechatId || ''}`;
        break;
        
      case 'crypto':
        qrContent = `${data.currency || 'bitcoin'}:${data.address || ''}${data.amount ? `?amount=${data.amount}` : ''}`;
        break;
        
      // Pakistan Local Payments - Deep Links
      case 'easypaisa':
        if (data.mobile && data.amount) {
          // EasyPaisa deep link format
          qrContent = `easypaisa://pay?mobile=${data.mobile.replace(/[^0-9]/g, '')}&amount=${data.amount}${data.note ? `&note=${encodeURIComponent(data.note)}` : ''}`;
        } else {
          // Fallback with USSD code
          qrContent = `tel:*786*${data.mobile?.replace(/[^0-9]/g, '') || ''}*${data.amount || ''}%23`;
        }
        break;
        
      case 'jazzcash':
        if (data.mobile && data.amount) {
          // JazzCash deep link format
          qrContent = `jazzcash://pay?mobile=${data.mobile.replace(/[^0-9]/g, '')}&amount=${data.amount}${data.note ? `&note=${encodeURIComponent(data.note)}` : ''}`;
        } else {
          // Fallback with USSD code
          qrContent = `tel:*786*${data.mobile?.replace(/[^0-9]/g, '') || ''}*${data.amount || ''}%23`;
        }
        break;
        
      // India Local Payments - UPI Deep Links
      case 'paytm':
        qrContent = `upi://pay?pa=${data.upiId || ''}&pn=${data.name || ''}${data.amount ? `&am=${data.amount}` : ''}${data.note ? `&tn=${encodeURIComponent(data.note)}` : ''}&cu=INR&mode=02&orgid=159761`;
        break;
        
      case 'phonepe':
        qrContent = `upi://pay?pa=${data.upiId || ''}&pn=${data.name || ''}${data.amount ? `&am=${data.amount}` : ''}${data.note ? `&tn=${encodeURIComponent(data.note)}` : ''}&cu=INR&mode=02&orgid=159001`;
        break;
        
      case 'googlepay':
        qrContent = `upi://pay?pa=${data.upiId || ''}&pn=${data.name || ''}${data.amount ? `&am=${data.amount}` : ''}${data.note ? `&tn=${encodeURIComponent(data.note)}` : ''}&cu=INR&mode=02&orgid=160005`;
        break;
        
      case 'bhim':
        qrContent = `upi://pay?pa=${data.upiId || ''}&pn=${data.name || ''}${data.amount ? `&am=${data.amount}` : ''}${data.note ? `&tn=${encodeURIComponent(data.note)}` : ''}&cu=INR&mode=02&orgid=159759`;
        break;
        
      // USA Local Payments - Deep Links
      case 'zelle':
        qrContent = `zelle://pay?contact=${encodeURIComponent(data.recipient || '')}${data.amount ? `&amount=${data.amount}` : ''}${data.note ? `&memo=${encodeURIComponent(data.note)}` : ''}`;
        break;
        
      case 'applepay':
        qrContent = `https://cash.me/${data.contact || ''}${data.amount ? `/${data.amount}` : ''}`;
        break;
        
      case 'googlepay_us':
        qrContent = `https://pay.google.com/send/home?contact=${encodeURIComponent(data.contact || '')}${data.amount ? `&amount=${data.amount}` : ''}${data.note ? `&note=${encodeURIComponent(data.note)}` : ''}`;
        break;
        
      // Europe Local Payments - Deep Links
      case 'revolut':
        qrContent = `revolut://pay?recipient=${data.username || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      case 'klarna':
        qrContent = data.paymentUrl || '';
        break;
        
      case 'sepa':
        qrContent = `sepa://pay?iban=${data.iban || ''}&name=${encodeURIComponent(data.recipientName || '')}${data.amount ? `&amount=${data.amount}` : ''}${data.reference ? `&reference=${encodeURIComponent(data.reference)}` : ''}`;
        break;
        
      // Southeast Asia Local Payments - Deep Links
      case 'grabpay':
        qrContent = `grab://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      case 'dana':
        qrContent = `dana://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      case 'gcash':
        qrContent = `gcash://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}${data.note ? `&note=${encodeURIComponent(data.note)}` : ''}`;
        break;
        
      case 'paymaya':
        qrContent = `paymaya://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      // Middle East Local Payments - Deep Links
      case 'stcpay':
        qrContent = `stcpay://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      case 'careem':
        qrContent = `careem://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      // Africa Local Payments - Deep Links
      case 'mpesa':
        qrContent = `mpesa://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}${data.note ? `&note=${encodeURIComponent(data.note)}` : ''}`;
        break;
        
      case 'airtel':
        qrContent = `airtelmoney://pay?mobile=${data.mobile?.replace(/[^0-9]/g, '') || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      // Latin America Local Payments - Deep Links
      case 'pix':
        // PIX uses a specific QR format for instant payments
        const pixPayload = {
          key: data.pixKey || '',
          name: data.name || '',
          city: 'BR',
          amount: data.amount ? parseFloat(data.amount).toFixed(2) : '',
          description: data.note || ''
        };
        qrContent = `00020126${pixPayload.key.length.toString().padStart(2, '0')}${pixPayload.key}52040000530398654${pixPayload.amount ? pixPayload.amount.length.toString().padStart(2, '0') + pixPayload.amount : ''}5802BR59${pixPayload.name.length.toString().padStart(2, '0')}${pixPayload.name}6304`;
        break;
        
      case 'mercadopago':
        qrContent = `mercadopago://pay?user=${data.username || ''}${data.amount ? `&amount=${data.amount}` : ''}`;
        break;
        
      // Events
      case 'calendar':
        qrContent = `BEGIN:VEVENT
SUMMARY:${data.title || ''}
DTSTART:${data.startDate || ''}
DTEND:${data.endDate || ''}
LOCATION:${data.location || ''}
DESCRIPTION:${data.description || ''}
END:VEVENT`;
        break;
        
      case 'tickets':
        qrContent = data.ticketUrl || '';
        break;
        
      case 'music':
      case 'video':
      case 'gallery':
      case 'pdf':
        qrContent = data.url || '';
        break;
        
      // Utility
      case 'text':
      case 'notes':
        qrContent = data.content || '';
        break;
        
      case 'coupon':
        qrContent = `Coupon Code: ${data.code || ''}
Description: ${data.description || ''}
Valid Until: ${data.expiry || ''}
Terms: ${data.terms || ''}`;
        break;
        
      case 'survey':
      case 'menu':
      case 'product':
      case 'login':
      case 'arvr':
        qrContent = data.url || '';
        break;
        
      default:
        qrContent = data.content || '';
    }
    
    setQrData(qrContent);
  };

  const renderDynamicForm = () => {
    if (!selectedType) return null;

    const commonInputClass = "w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm";
    const labelClass = "block text-sm font-medium text-gray-700 mb-2";

    switch (selectedType) {
      // Links
      case 'url':
      case 'social':
      case 'app':
      case 'cloud':
      case 'landing':
      case 'coupon':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>URL *</label>
              <input
                type="url"
                value={str(formData.url || '')}
                onChange={(e) => handleFormChange('url', e.target.value)}
                placeholder="https://example.com"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Info - vCard
      case 'vcard':
        return ( 
          <>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  type="text"
                  value={str(formData.firstName || '')}
                  onChange={(e) => handleFormChange('firstName', e.target.value)}
                  placeholder="John"
                  className={commonInputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  type="text"
                  value={str(formData.lastName || '')}
                  onChange={(e) => handleFormChange('lastName', e.target.value)}
                  placeholder="Doe"
                  className={commonInputClass}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Organization</label>
              <input
                type="text"
                value={str(formData.organization || '')}
                onChange={(e) => handleFormChange('organization', e.target.value)}
                placeholder="Company Name"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Job Title</label>
              <input
                type="text"
                value={str(formData.title || '')}
                onChange={(e) => handleFormChange('title', e.target.value)}
                placeholder="Software Engineer"
                className={commonInputClass}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={num(formData.phone || '')}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="+1234567890"
                  className={commonInputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={str(formData.email || '')}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={commonInputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                value={str(formData.website || '')}
                onChange={(e) => handleFormChange('website', e.target.value)}
                placeholder="https://example.com"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Address</label>
              <textarea
                value={str(formData.address || '')}
                onChange={(e) => handleFormChange('address', e.target.value)}
                placeholder="123 Main St, City, State, Country"
                className={commonInputClass}
                rows={2}
              />
            </div>
          </div>
          </>
        );

      // Info - MeCard
      case 'mecard':
        return ( 
          <>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  type="text"
                  value={str(formData.firstName || '')}
                  onChange={(e) => handleFormChange('firstName', e.target.value)}
                  placeholder="John"
                  className={commonInputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  type="text"
                  value={str(formData.lastName || '')}
                  onChange={(e) => handleFormChange('lastName', e.target.value)}
                  placeholder="Doe"
                  className={commonInputClass}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={num(formData.phone || '')}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="+1234567890"
                  className={commonInputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={str(formData.email || '')}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={commonInputClass}
                />
              </div>
            </div>
          </div>
          </>
        );

      // Info - Business Card
      case 'bizcard':
        return ( 
          <>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>First Name *</label>
                <input
                  type="text"
                  value={str(formData.firstName || '')}
                  onChange={(e) => handleFormChange('firstName', e.target.value)}
                  placeholder="John"
                  className={commonInputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Last Name *</label>
                <input
                  type="text"
                  value={str(formData.lastName || '')}
                  onChange={(e) => handleFormChange('lastName', e.target.value)}
                  placeholder="Doe"
                  className={commonInputClass}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Company</label>
                <input
                  type="text"
                  value={str(formData.organization || '')}
                  onChange={(e) => handleFormChange('organization', e.target.value)}
                  placeholder="Company Name"
                  className={commonInputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Position</label>
                <input
                  type="text"
                  value={str(formData.title || '')}
                  onChange={(e) => handleFormChange('title', e.target.value)}
                  placeholder="Manager"
                  className={commonInputClass}
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Phone</label>
                <input
                  type="tel"
                  value={num(formData.phone || '')}
                  onChange={(e) => handleFormChange('phone', e.target.value)}
                  placeholder="+1234567890"
                  className={commonInputClass}
                />
              </div>
              <div>
                <label className={labelClass}>Email</label>
                <input
                  type="email"
                  value={str(formData.email || '')}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  placeholder="john@example.com"
                  className={commonInputClass}
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Website</label>
              <input
                type="url"
                value={str(formData.website || '')}
                onChange={(e) => handleFormChange('website', e.target.value)}
                placeholder="https://company.com"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Info - Email
      case 'email':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                value={str(formData.email || '')}
                onChange={(e) => handleFormChange('email', e.target.value)}
                placeholder="recipient@example.com"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Subject (Optional)</label>
              <input
                type="text"
                value={str(formData.subject || '')}
                onChange={(e) => handleFormChange('subject', e.target.value)}
                placeholder="Email subject"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Message (Optional)</label>
              <textarea
                value={str(formData.body || '')}
                onChange={(e) => handleFormChange('body', e.target.value)}
                placeholder="Email message content"
                className={commonInputClass}
                rows={3}
              />
            </div>
          </div>
          </>
        );

      // Info - Email Message
      case 'emailmsg':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Email Address *</label>
              <input
                type="email"
                value={str(formData.email || '')}
                onChange={(e) => handleFormChange('email', e.target.value)}
                placeholder="recipient@example.com"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Subject *</label>
              <input
                type="text"
                value={str(formData.subject || '')}
                onChange={(e) => handleFormChange('subject', e.target.value)}
                placeholder="Email subject"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Message *</label>
              <textarea
                value={str(formData.body || '')}
                onChange={(e) => handleFormChange('body', e.target.value)}
                placeholder="Email message content"
                className={commonInputClass}
                rows={4}
                required
              />
            </div>
          </div>
          </>
        );

      // Communications - Phone
      case 'phone':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                value={num(formData.phone || '')}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder="+1234567890"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Communications - SMS
      case 'sms':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                value={num(formData.phone || '')}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder="+1234567890"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Message (Optional)</label>
              <textarea
                value={str(formData.message || '')}
                onChange={(e) => handleFormChange('message', e.target.value)}
                placeholder="SMS message content"
                className={commonInputClass}
                rows={3}
                maxLength={160}
              />
              <p className="mt-1 text-xs text-gray-500">
                {str(formData.message || '').length}/160 characters
              </p>
            </div>
          </div>
          </>
        );

      // Communications - WhatsApp
      case 'whatsapp':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Phone Number *</label>
              <input
                type="tel"
                value={num(formData.phone || '')}
                onChange={(e) => handleFormChange('phone', e.target.value)}
                placeholder="+1234567890"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Pre-filled Message (Optional)</label>
              <textarea
                value={str(formData.message || '')}
                onChange={(e) => handleFormChange('message', e.target.value)}
                placeholder="Hello! I found your contact through QR code"
                className={commonInputClass}
                rows={3}
              />
            </div>
          </div>
          </>
        );

      // Communications - Telegram
      case 'telegram':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Telegram Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="username (without @)"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Communications - Messenger
      case 'messenger':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Facebook Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="facebook.username"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Communications - Skype
      case 'skype':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Skype Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="skype.username"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Action</label>
              <select
                value={str(formData.action || 'call')}
                onChange={(e) => handleFormChange('action', e.target.value)}
                className={`${commonInputClass} pr-8`}
              >
                <option value="call">Voice Call</option>
                <option value="chat">Chat</option>
                <option value="userinfo">View Profile</option>
              </select>
            </div>
          </div>
          </>
        );

      // Communications - Zoom
      case 'zoom':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Meeting URL *</label>
              <input
                type="url"
                value={str(formData.meetingUrl || '')}
                onChange={(e) => handleFormChange('meetingUrl', e.target.value)}
                placeholder="https://zoom.us/j/1234567890"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Location - Maps
      case 'maps':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Location Type</label>
              <select
                value={str(formData.locationType || 'address')}
                onChange={(e) => handleFormChange('locationType', e.target.value)}
                className={`${commonInputClass} pr-8`}
              >
                <option value="address">Address</option>
                <option value="coordinates">GPS Coordinates</option>
              </select>
            </div>
            {formData.locationType === 'coordinates' ? (
              <div>
                <label className={labelClass}>Coordinates *</label>
                <input
                  type="text"
                  value={str(formData.coordinates || '')}
                  onChange={(e) => handleFormChange('coordinates', e.target.value)}
                  placeholder="40.7128,-74.0060"
                  className={commonInputClass}
                  required
                />
                <p className="mt-1 text-xs text-gray-500">Format: latitude,longitude</p>
              </div>
            ) : (
              <div>
                <label className={labelClass}>Address *</label>
                <textarea
                  value={str(formData.address || '')}
                  onChange={(e) => handleFormChange('address', e.target.value)}
                  placeholder="123 Main Street, New York, NY 10001"
                  className={commonInputClass}
                  rows={2}
                  required
                />
              </div>
            )}
          </div>
          </>
        );

      // Location - GPS
      case 'gps':
        return ( 
          <>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Latitude *</label>
                <input
                  type="number"
                  step="any"
                  value={str(formData.latitude || '')}
                  onChange={(e) => handleFormChange('latitude', e.target.value)}
                  placeholder="40.7128"
                  className={commonInputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Longitude *</label>
                <input
                  type="number"
                  step="any"
                  value={str(formData.longitude || '')}
                  onChange={(e) => handleFormChange('longitude', e.target.value)}
                  placeholder="-74.0060"
                  className={commonInputClass}
                  required
                />
              </div>
            </div>
          </div>
          </>
        );

      // Location - Event
      case 'event':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Event Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="Conference 2024"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Location *</label>
              <input
                type="text"
                value={str(formData.location || '')}
                onChange={(e) => handleFormChange('location', e.target.value)}
                placeholder="Convention Center, New York"
                className={commonInputClass}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Date *</label>
                <input
                  type="date"
                  value={str(formData.date || '')}
                  onChange={(e) => handleFormChange('date', e.target.value)}
                  className={commonInputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>Time *</label>
                <input
                  type="time"
                  value={str(formData.time || '')}
                  onChange={(e) => handleFormChange('time', e.target.value)}
                  className={commonInputClass}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={str(formData.description || '')}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Event description and details"
                className={commonInputClass}
                rows={3}
              />
            </div>
          </div>
          </>
        );

      // Location - Booking
      case 'booking':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Booking URL *</label>
              <input
                type="url"
                value={str(formData.bookingUrl || '')}
                onChange={(e) => handleFormChange('bookingUrl', e.target.value)}
                placeholder="https://booking.com/..."
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Connection - WiFi
      case 'wifi':
        return (
          <>
       
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Network Name (SSID) *</label>
              <input
                type="text"
                value={str(formData.ssid || '')}
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
                value={str(formData.password || '')}
                onChange={(e) => handleFormChange('password', e.target.value)}
                placeholder="WiFi password"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Security Type</label>
              <select
                value={str(formData.security || 'WPA')}
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

      // Connection - Bluetooth
      case 'bluetooth':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Device Name *</label>
              <input
                type="text"
                value={str(formData.deviceName || '')}
                onChange={(e) => handleFormChange('deviceName', e.target.value)}
                placeholder="My Device"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>MAC Address</label>
              <input
                type="text"
                value={str(formData.macAddress || '')}
                onChange={(e) => handleFormChange('macAddress', e.target.value)}
                placeholder="00:11:22:33:44:55"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - PayPal
      case 'paypal':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>PayPal Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="paypal.username"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="25.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Venmo
      case 'venmo':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Venmo Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="venmo-username"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="25.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment for services"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Cash App
      case 'cashapp':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Cash App Tag *</label>
              <input
                type="text"
                value={str(formData.cashtag || '')}
                onChange={(e) => handleFormChange('cashtag', e.target.value)}
                placeholder="cashtag (without $)"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="25.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Stripe
      case 'stripe':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Payment URL *</label>
              <input
                type="url"
                value={str(formData.paymentUrl || '')}
                onChange={(e) => handleFormChange('paymentUrl', e.target.value)}
                placeholder="https://buy.stripe.com/..."
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Payment - UPI
      case 'upi':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>UPI ID *</label>
              <input
                type="text"
                value={str(formData.upiId || '')}
                onChange={(e) => handleFormChange('upiId', e.target.value)}
                placeholder="user@paytm"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Payee Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="John Doe"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="100.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - WeChat
      case 'wechat':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>WeChat ID *</label>
              <input
                type="text"
                value={str(formData.wechatId || '')}
                onChange={(e) => handleFormChange('wechatId', e.target.value)}
                placeholder="wechat-id"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Payment - Crypto
      case 'crypto':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Cryptocurrency</label>
              <select
                value={str(formData.currency || 'bitcoin')}
                onChange={(e) => handleFormChange('currency', e.target.value)}
                className={`${commonInputClass} pr-8`}
              >
                <option value="bitcoin">Bitcoin (BTC)</option>
                <option value="ethereum">Ethereum (ETH)</option>
                <option value="litecoin">Litecoin (LTC)</option>
                <option value="dogecoin">Dogecoin (DOGE)</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Wallet Address *</label>
              <input
                type="text"
                value={str(formData.address || '')}
                onChange={(e) => handleFormChange('address', e.target.value)}
                placeholder="1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="any"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="0.001"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - EasyPaisa
      case 'easypaisa':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="03XXXXXXXXX"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="1000.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - JazzCash
      case 'jazzcash':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="03XXXXXXXXX"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="1000.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Paytm
      case 'paytm':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile/UPI ID *</label>
              <input
                type="text"
                value={str(formData.upiId || formData.mobile || '')}
                onChange={(e) => handleFormChange('upiId', e.target.value)}
                placeholder="9876543210 or user@paytm"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="Recipient Name"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="500.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - PhonePe
      case 'phonepe':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>UPI ID *</label>
              <input
                type="text"
                value={str(formData.upiId || '')}
                onChange={(e) => handleFormChange('upiId', e.target.value)}
                placeholder="user@ybl"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="Recipient Name"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="500.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Google Pay India
      case 'googlepay':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>UPI ID *</label>
              <input
                type="text"
                value={str(formData.upiId || '')}
                onChange={(e) => handleFormChange('upiId', e.target.value)}
                placeholder="user@okaxis"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="Recipient Name"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="500.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - BHIM UPI
      case 'bhim':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>UPI ID *</label>
              <input
                type="text"
                value={str(formData.upiId || '')}
                onChange={(e) => handleFormChange('upiId', e.target.value)}
                placeholder="user@upi"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="Recipient Name"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="500.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Zelle
      case 'zelle':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Email or Phone *</label>
              <input
                type="text"
                value={str(formData.recipient || '')}
                onChange={(e) => handleFormChange('recipient', e.target.value)}
                placeholder="user@email.com or +1234567890"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="100.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Apple Pay
      case 'applepay':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Contact Info *</label>
              <input
                type="text"
                value={str(formData.contact || '')}
                onChange={(e) => handleFormChange('contact', e.target.value)}
                placeholder="Email or phone number"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="50.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Google Pay US
      case 'googlepay_us':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Email or Phone *</label>
              <input
                type="text"
                value={str(formData.contact || '')}
                onChange={(e) => handleFormChange('contact', e.target.value)}
                placeholder="user@gmail.com or +1234567890"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="50.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Revolut
      case 'revolut':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Revolut Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="revolut-username"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="25.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Klarna
      case 'klarna':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Payment URL *</label>
              <input
                type="url"
                value={str(formData.paymentUrl || '')}
                onChange={(e) => handleFormChange('paymentUrl', e.target.value)}
                placeholder="https://klarna.com/pay/..."
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Payment - SEPA
      case 'sepa':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>IBAN *</label>
              <input
                type="text"
                value={str(formData.iban || '')}
                onChange={(e) => handleFormChange('iban', e.target.value)}
                placeholder="DE89 3704 0044 0532 0130 00"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Recipient Name *</label>
              <input
                type="text"
                value={str(formData.recipientName || '')}
                onChange={(e) => handleFormChange('recipientName', e.target.value)}
                placeholder="John Doe"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="100.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Reference (Optional)</label>
              <input
                type="text"
                value={str(formData.reference || '')}
                onChange={(e) => handleFormChange('reference', e.target.value)}
                placeholder="Payment reference"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - GrabPay
      case 'grabpay':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="+60123456789"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="50.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - DANA
      case 'dana':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="+62812345678"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="100000"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - GCash
      case 'gcash':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="09123456789"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="1000.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - PayMaya
      case 'paymaya':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="09123456789"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="1000.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - STC Pay
      case 'stcpay':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="+966501234567"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="100.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Careem Pay
      case 'careem':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="+971501234567"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="50.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - M-Pesa
      case 'mpesa':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="+254712345678"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="1000.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Airtel Money
      case 'airtel':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mobile Number *</label>
              <input
                type="tel"
                value={num(formData.mobile || '')}
                onChange={(e) => handleFormChange('mobile', e.target.value)}
                placeholder="+254734567890"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="1000.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - PIX
      case 'pix':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>PIX Key *</label>
              <input
                type="text"
                value={str(formData.pixKey || '')}
                onChange={(e) => handleFormChange('pixKey', e.target.value)}
                placeholder="user@email.com, +5511999999999, or random key"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Name *</label>
              <input
                type="text"
                value={str(formData.name || '')}
                onChange={(e) => handleFormChange('name', e.target.value)}
                placeholder="João Silva"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="50.00"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Note (Optional)</label>
              <input
                type="text"
                value={str(formData.note || '')}
                onChange={(e) => handleFormChange('note', e.target.value)}
                placeholder="Payment description"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Payment - Mercado Pago
      case 'mercadopago':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Mercado Pago Username *</label>
              <input
                type="text"
                value={str(formData.username || '')}
                onChange={(e) => handleFormChange('username', e.target.value)}
                placeholder="username"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Amount (Optional)</label>
              <input
                type="number"
                step="0.01"
                value={num(formData.amount || '')}
                onChange={(e) => handleFormChange('amount', e.target.value)}
                placeholder="100.00"
                className={commonInputClass}
              />
            </div>
          </div>
          </>
        );

      // Events - Calendar
      case 'calendar':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Event Title *</label>
              <input
                type="text"
                value={str(formData.title || '')}
                onChange={(e) => handleFormChange('title', e.target.value)}
                placeholder="Meeting with client"
                className={commonInputClass}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Start Date & Time *</label>
                <input
                  type="datetime-local"
                  value={str(formData.startDate || '')}
                  onChange={(e) => handleFormChange('startDate', e.target.value)}
                  className={commonInputClass}
                  required
                />
              </div>
              <div>
                <label className={labelClass}>End Date & Time *</label>
                <input
                  type="datetime-local"
                  value={str(formData.endDate || '')}
                  onChange={(e) => handleFormChange('endDate', e.target.value)}
                  className={commonInputClass}
                  required
                />
              </div>
            </div>
            <div>
              <label className={labelClass}>Location</label>
              <input
                type="text"
                value={str(formData.location || '')}
                onChange={(e) => handleFormChange('location', e.target.value)}
                placeholder="Conference Room A"
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Description</label>
              <textarea
                value={str(formData.description || '')}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="Event description and agenda"
                className={commonInputClass}
                rows={3}
              />
            </div>
          </div>
          </>
        );

      // Events - Tickets/Music/Video/Gallery/PDF
      case 'tickets':
      case 'music':
      case 'video':
      case 'gallery':
      case 'pdf':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>URL *</label>
              <input
                type="url"
                value={str(formData.url || '')}
                onChange={(e) => handleFormChange('url', e.target.value)}
                placeholder="https://example.com"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      // Utility - Text/Notes
      case 'text':
      case 'notes':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Content *</label>
              <textarea
                value={str(formData.content || '')}
                onChange={(e) => handleFormChange('content', e.target.value)}
                placeholder="Enter your text content here"
                className={commonInputClass}
                rows={5}
                maxLength={500}
                required
              />
              <p className="mt-1 text-xs text-gray-500">
                {str(formData.content || '').length}/500 characters
              </p>
            </div>
          </div>
          </>
        );

      // Utility - Coupon
      case 'coupon':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>Coupon Code *</label>
              <input
                type="text"
                value={str(formData.code || '')}
                onChange={(e) => handleFormChange('code', e.target.value)}
                placeholder="SAVE20"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Description *</label>
              <input
                type="text"
                value={str(formData.description || '')}
                onChange={(e) => handleFormChange('description', e.target.value)}
                placeholder="20% off all items"
                className={commonInputClass}
                required
              />
            </div>
            <div>
              <label className={labelClass}>Expiry Date</label>
              <input
                type="date"
                value={str(formData.expiry || '')}
                onChange={(e) => handleFormChange('expiry', e.target.value)}
                className={commonInputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Terms & Conditions</label>
              <textarea
                value={str(formData.terms || '')}
                onChange={(e) => handleFormChange('terms', e.target.value)}
                placeholder="Valid for first-time customers only"
                className={commonInputClass}
                rows={2}
              />
            </div>
          </div>
          </>
        );

      // Utility - Survey/Menu/Product/Login/ARVR
      case 'survey':
      case 'menu':
      case 'product':
      case 'login':
      case 'arvr':
        return ( 
          <>
          
          <div className="space-y-4">
            <div>
              <label className={labelClass}>URL *</label>
              <input
                type="url"
                value={str(formData.url || '')}
                onChange={(e) => handleFormChange('url', e.target.value)}
                placeholder="https://example.com"
                className={commonInputClass}
                required
              />
            </div>
          </div>
          </>
        );

      default:
        return null;
    }
  };

  const handleGenerate = () => {
    if (!qrData.trim()) {
      alert('Please fill in the required fields to generate QR code');
      return;
    }
    // QR generation logic will be handled by QRCustomizer
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
      {/* Input Section */}
      <div className="space-y-6">
        <div>
          <h3 className="mb-4 text-2xl font-bold text-gray-900">
            {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} QR Codes
          </h3>
          <p className="mb-6 text-gray-600">
            Choose the specific type and fill in the details to generate a professional QR code.
          </p>
        </div>

        {/* Type Selection */}
        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700">
            Select Type
          </label>
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
              {currentTypes.find(t => t.id === selectedType)?.name} Details
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
