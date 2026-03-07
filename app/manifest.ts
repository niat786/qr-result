import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'QRResult - Free QR Code Generator',
        short_name: 'QRResult',
        description: 'Professional QR Code Generator and Dynamic Link Manager. Create beautiful, customizable QR codes with 100+ types. Free to use.',
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
            {
                src: '/icon-192.png',
                sizes: '192x192',
                type: 'image/png',
                purpose: 'any maskable' as any,
            },
            {
                src: '/icon-512.png',
                sizes: '512x512',
                type: 'image/png',
                purpose: 'any maskable' as any,
            },
        ],
        screenshots: [
            {
                src: '/screenshot-wide.png',
                sizes: '1280x720',
                type: 'image/png',
                form_factor: 'wide',
            },
            {
                src: '/screenshot-narrow.png',
                sizes: '750x1334',
                type: 'image/png',
                form_factor: 'narrow',
            },
        ],
        shortcuts: [
            {
                name: 'Create QR Code',
                short_name: 'Create',
                description: 'Quickly create a new QR code',
                url: '/',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
            {
                name: 'Dynamic Manager',
                short_name: 'Dynamic',
                description: 'Manage your dynamic QR codes',
                url: '/dynamic',
                icons: [{ src: '/icon-192.png', sizes: '192x192' }],
            },
        ],
    };
}
