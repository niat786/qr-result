
'use client';
import { useState, RefObject } from 'react';
import { QRCustomization } from './QRCodeGenerator';

interface DownloadPanelProps {
  canvasRef: RefObject<HTMLCanvasElement | null>; 
  customization: QRCustomization;
  data: string;
}

type ExportFormat = 'PNG' | 'JPEG' | 'SVG';

export default function DownloadPanel({
  canvasRef,
  customization,
  data,
}: DownloadPanelProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat>('PNG');
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadQRCode = async () => {
    if (!canvasRef.current || !data) return;

    setIsDownloading(true);

    try {
      if (selectedFormat === 'SVG') {
        await downloadSVG();
      } else {
        await downloadCanvas();
      }
    } catch (error) {
      console.error('Download failed:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  const downloadCanvas = async () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const format = selectedFormat.toLowerCase();
    const quality = selectedFormat === 'JPEG' ? 0.9 : undefined;

    // Using string concatenation instead of template literals for broader compatibility
    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'qrcode.' + format; // <-- fixed line
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      },
      'image/' + format, // <-- fixed line
      quality
    );
  };

  const downloadSVG = async () => {
    try {
      // Dynamic import of qrcode library
      const QRCode = (await import('qrcode')).default;

      const svgString = await QRCode.toString(data, {
        type: 'svg',
        width: customization.size,
        margin: customization.margin,
        color: {
          dark: customization.foregroundColor,
          light: customization.backgroundColor,
        },
        errorCorrectionLevel: customization.errorCorrectionLevel,
      });

      let finalSvg = svgString;

      // Add logo to SVG if exists
      if (customization.logoImage) {
        const logoSize = customization.logoSize;
        const x = (customization.size - logoSize) / 2;
        const y = (customization.size - logoSize) / 2;

        // Build the logo element using string concatenation to avoid template literal issues
        const logoElement =
          '<rect x="' +
          (x - 5) +
          '" y="' +
          (y - 5) +
          '" width="' +
          (logoSize + 10) +
          '" height="' +
          (logoSize + 10) +
          '" fill="' +
          customization.backgroundColor +
          '"/>' +
          '<image x="' +
          x +
          '" y="' +
          y +
          '" width="' +
          logoSize +
          '" height="' +
          logoSize +
          '" href="' +
          customization.logoImage +
          '"/>';

        finalSvg = finalSvg.replace('</svg>', logoElement + '</svg>');
      }

      const blob = new Blob([finalSvg], { type: 'image/svg+xml' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.svg';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('SVG generation failed:', error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h3 className="mb-4 text-lg font-semibold text-center text-gray-900">
        Download Options
      </h3>

      <div className="space-y-4">
        {/* Format Selection */}
        <div>
          <label className="block mb-3 text-sm font-medium text-gray-700">
            Export Format
          </label>
          <div className="grid grid-cols-3 gap-2">
            {(['PNG', 'JPEG', 'SVG'] as ExportFormat[]).map((format) => (
              <button
                key={format}
                onClick={() => setSelectedFormat(format)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                  selectedFormat === format
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Format Info */}
        <div className="p-3 rounded-lg bg-gray-50">
          <div className="flex items-start space-x-2">
            <i className="ri-information-line text-blue-500 mt-0.5 flex-shrink-0"></i>
            <div className="text-sm text-gray-600">
              {selectedFormat === 'PNG' &&
                'Best for web use with transparency support'}
              {selectedFormat === 'JPEG' &&
                'Smaller file size, good for printing'}
              {selectedFormat === 'SVG' &&
                'Vector format, scalable without quality loss'}
            </div>
          </div>
        </div>

        {/* Download Button */}
        <div className='flex gap-2'>
<button
          onClick={downloadQRCode}
          disabled={!data || isDownloading}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all whitespace-nowrap cursor-pointer ${
            !data || isDownloading
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isDownloading ? (
            <span className="flex items-center justify-center space-x-2">
              <i className="ri-loader-4-line animate-spin"></i>
              <span>Downloading...</span>
            </span>
          ) : (
            <span className="flex items-center justify-center space-x-2">
              <i className="ri-download-2-line"></i>
              <span>Download {selectedFormat}</span>
            </span>
          )}
        </button>

        
        </div>

        {!data && (
          <p className="text-sm text-center text-gray-500">
            Complete the form to enable download
          </p>
        )}
      </div>
    </div>
  );
}
