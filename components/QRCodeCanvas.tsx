
'use client';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import { QRCustomization } from './QRCodeGenerator';

interface QRCodeCanvasProps {
  data: string;
  customization: QRCustomization;
}

const QRCodeCanvas = forwardRef<HTMLCanvasElement, QRCodeCanvasProps>(
  ({ data, customization }, ref) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    
    useImperativeHandle(ref, () => canvasRef.current!);

    useEffect(() => {
      const canvas = canvasRef.current;
      if (!canvas || !data) return;

      const generateQR = async () => {
        try {
          // Dynamic import of qrcode library
          const QRCode = (await import('qrcode')).default;
          
          const ctx = canvas.getContext('2d');
          if (!ctx) return;

          // Set canvas size
          canvas.width = customization.size;
          canvas.height = customization.size;

          // Generate QR code
          await QRCode.toCanvas(canvas, data, {
            width: customization.size,
            margin: customization.margin,
            color: {
              dark: customization.foregroundColor,
              light: customization.backgroundColor,
            },
            errorCorrectionLevel: customization.errorCorrectionLevel,
          });

          // Add logo if exists
          if (customization.logoImage) {
            // Create image using document.createElement to avoid constructor issues
            const logo = document.createElement('img');
            logo.crossOrigin = 'anonymous';
            logo.onload = () => {
              const logoSize = customization.logoSize;
              const x = (customization.size - logoSize) / 2;
              const y = (customization.size - logoSize) / 2;
              
              // Create a white background for the logo
              ctx.fillStyle = customization.backgroundColor;
              ctx.fillRect(x - 5, y - 5, logoSize + 10, logoSize + 10);
              
              // Draw the logo
              ctx.drawImage(logo, x, y, logoSize, logoSize);
            };
            logo.src = customization.logoImage;
          }
        } catch (error) {
          console.error('Error generating QR code:', error);
        }
      };

      generateQR();
    }, [data, customization]);

    return (
      <div className="flex flex-col items-center space-y-4">
        <div className="bg-gray-50 p-4 rounded-xl">
          <canvas
            ref={canvasRef}
            className="border border-gray-200 rounded-lg shadow-sm"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
        </div>
        
        {!data && (
          <div className="text-center py-8">
            <i className="ri-qr-code-line text-4xl text-gray-400 mb-2 block"></i>
            <p className="text-gray-500">Fill in the details to generate QR code</p>
          </div>
        )}
      </div>
    );
  }
);

QRCodeCanvas.displayName = 'QRCodeCanvas';

export default QRCodeCanvas;
