'use client';
import { useState, useRef, useCallback } from 'react';
import QRCodeCanvas from './QRCodeCanvas';
import QRTypeSelector from './QRTypeSelector';
import CustomizationPanel from './CustomizationPanel';
import DownloadPanel from './DownloadPanel';

export type QRType =
  | 'URL' | 'Contact' | 'WiFi' | 'Text' | 'Email' | 'Event'
  | 'Phone' | 'SMS' | 'WhatsApp' | 'Location' | 'Social' | 'App';

export interface QRCustomization {
  foregroundColor: string;
  backgroundColor: string;
  size: number;
  errorCorrectionLevel: 'L' | 'M' | 'Q' | 'H';
  margin: number;
  logoImage: string | null;
  logoSize: number;
}

export default function QRCodeGenerator() {
  const [activeType, setActiveType] = useState<QRType>('URL');
  const [qrData, setQrData] = useState('');
  const [showCustomize, setShowCustomize] = useState(false);

  const [customization, setCustomization] = useState<QRCustomization>({
    foregroundColor: '#000000',
    backgroundColor: '#ffffff',
    size: 300,
    errorCorrectionLevel: 'M',
    margin: 4,
    logoImage: null,
    logoSize: 60,
  });

  // const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const handleTypeChange = useCallback((type: QRType) => {
    setActiveType(type);
    setQrData('');
  }, []);

  const handleDataChange = useCallback((data: string) => {
    setQrData(data);
  }, []);

  const handleCustomizationChange = useCallback((updates: Partial<QRCustomization>) => {
    setCustomization(prev => ({ ...prev, ...updates }));
  }, []);

  return (
    <div className="container px-4 py-8 mx-auto">
      <div className="mb-8 text-center">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">QR Code Generator</h1>
        <p className="text-lg text-gray-600">Create custom QR codes with advanced options</p>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-1">
         

          {/* Data form for the current type */}
          <QRTypeSelector.Form
            type={activeType}
            onDataChange={handleDataChange}
          />
           {/* Optional toggle to control order */}
          <div className="flex items-center justify-between p-3 bg-white rounded-xl">
            <span className="text-sm text-gray-700">Show customization first</span>
            <button
              type="button"
              onClick={() => setShowCustomize(v => !v)}
              className="px-3 py-1 text-sm font-medium bg-white border rounded-full hover:bg-gray-100"
            >
              {showCustomize ? 'Yes' : 'No'}
            </button>
          </div>

          {/* Order switches based on showCustomize */}
          {showCustomize ? (
            <>
              <CustomizationPanel
                customization={customization}
                onCustomizationChange={handleCustomizationChange}
              />
              <QRTypeSelector
                activeType={activeType}
                onTypeChange={handleTypeChange}
              />
            </>
          ) : (
            <>
              <QRTypeSelector
                activeType={activeType}
                onTypeChange={handleTypeChange}
              />
              <CustomizationPanel
                customization={customization}
                onCustomizationChange={handleCustomizationChange}
              />
            </>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="p-8 bg-white shadow-lg rounded-xl">
            <div className="flex flex-col items-center space-y-6">
              <QRCodeCanvas
                ref={qrCanvasRef}
                data={qrData}
                customization={customization}
              />

              <DownloadPanel
                canvasRef={qrCanvasRef}
                customization={customization}
                data={qrData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}