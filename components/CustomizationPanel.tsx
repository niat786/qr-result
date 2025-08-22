
'use client';
import { useRef } from 'react';
import { QRCustomization } from './QRCodeGenerator';

interface CustomizationPanelProps {
  customization: QRCustomization;
  onCustomizationChange: (updates: Partial<QRCustomization>) => void;
}

export default function CustomizationPanel({
  customization,
  onCustomizationChange,
}: CustomizationPanelProps) {
  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const maxSize = 2 * 1024 * 1024;
    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file.');
      event.target.value = '';
      return;
    }
    if (file.size > maxSize) {
      alert('Image size must be 2 MB or less.');
      event.target.value = '';
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const result = e.target?.result as string | undefined;
      if (result) {
        onCustomizationChange({ logoImage: result });
      } else {
        alert('Failed to read the selected image.');
      }
    };

    reader.onerror = () => {
      console.error('FileReader error:', reader.error);
      alert('An error occurred while reading the file.');
    };

    reader.readAsDataURL(file);
  };

  const removeLogo = () => {
    onCustomizationChange({ logoImage: null });
    if (logoInputRef.current) {
      logoInputRef.current.value = '';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Customization</h3>

      <div className="space-y-6">
        {/* Colors */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Foreground Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={customization.foregroundColor}
                onChange={(e) =>
                  onCustomizationChange({ foregroundColor: e.target.value })
                }
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={customization.foregroundColor}
                onChange={(e) =>
                  onCustomizationChange({ foregroundColor: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Background Color
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="color"
                value={customization.backgroundColor}
                onChange={(e) =>
                  onCustomizationChange({ backgroundColor: e.target.value })
                }
                className="w-12 h-10 rounded-lg border border-gray-300 cursor-pointer"
              />
              <input
                type="text"
                value={customization.backgroundColor}
                onChange={(e) =>
                  onCustomizationChange({ backgroundColor: e.target.value })
                }
                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              />
            </div>
          </div>
        </div>

        {/* Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Size: {customization.size}px
          </label>
          <input
            type="range"
            min="200"
            max="800"
            step="50"
            value={customization.size}
            onChange={(e) =>
              onCustomizationChange({ size: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>200px</span>
            <span>800px</span>
          </div>
        </div>

        {/* Error Correction Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Error Correction Level
          </label>
          <div className="relative">
            <select
              value={customization.errorCorrectionLevel}
              onChange={(e) =>
                onCustomizationChange({
                  errorCorrectionLevel: e.target
                    .value as 'L' | 'M' | 'Q' | 'H',
                })
              }
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm appearance-none cursor-pointer"
            >
              <option value="L">Low (7%)</option>
              <option value="M">Medium (15%)</option>
              <option value="Q">Quartile (25%)</option>
              <option value="H">High (30%)</option>
            </select>
            <i className="ri-arrow-down-s-line absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"></i>
          </div>
        </div>

        {/* Margin */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Margin: {customization.margin}
          </label>
          <input
            type="range"
            min="0"
            max="10"
            step="1"
            value={customization.margin}
            onChange={(e) =>
              onCustomizationChange({ margin: Number(e.target.value) })
            }
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>10</span>
          </div>
        </div>

        {/* Logo */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Logo/Image Embed
          </label>

          {!customization.logoImage ? (
            <div
              onClick={() => logoInputRef.current?.click()}
              className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
            >
              <i className="ri-image-add-line text-3xl text-gray-400 mb-2 block"></i>
              <p className="text-sm text-gray-600">Click to upload logo</p>
              <p className="text-xs text-gray-500">PNG, JPEG up to 2MB</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="relative inline-block">
                <img
                  src={customization.logoImage}
                  alt="Logo preview"
                  className="w-20 h-20 object-cover rounded-lg border border-gray-300"
                />
                <button
                  onClick={removeLogo}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-red-600 transition-colors cursor-pointer"
                >
                  <i className="ri-close-line"></i>
                </button>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Logo Size: {customization.logoSize}px
                </label>
                <input
                  type="range"
                  min="30"
                  max="120"
                  step="10"
                  value={customization.logoSize}
                  onChange={(e) =>
                    onCustomizationChange({ logoSize: Number(e.target.value) })
                  }
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>30px</span>
                  <span>120px</span>
                </div>
              </div>
            </div>
          )}

          <input
            ref={logoInputRef}
            type="file"
            accept="image/*"
            onChange={handleLogoUpload}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
