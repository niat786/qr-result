import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'QRResult - Free QR Code Generator',
        short_name: 'QRResult',
        description: 'Professional QR Code Generator and Dynamic Link Manager. Create beautiful, customizable QR codes with 80+ types across 18 categories. Free to use. A product of WebWise LLC.',
        start_url: '/',
        display: 'standalone',
        background_color: '#F5F5F7',
        theme_color: '#007AFF',
        orientation: 'portrait-primary',
        categories: ['utilities', 'productivity', 'business'],
        lang: 'en',
        dir: 'ltr',
        icons: [
            {
                src: '/qr-result-site-logo.webp',
                sizes: 'any',
                type: 'image/webp',
            },
        ],
        shortcuts: [
            {
                name: 'Create QR Code',
                short_name: 'Create',
                description: 'Quickly create a new QR code',
                url: '/',
            },
            {
                name: 'Dynamic Manager',
                short_name: 'Dynamic',
                description: 'Manage your dynamic QR codes',
                url: '/dynamic',
            },
        ],
    };
}
