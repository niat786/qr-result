import type { Metadata } from 'next';
import HomeClient from './home-client';

export const metadata: Metadata = {
    title: 'Free QR Code Generator - Create Custom QR Codes Online',
    description: 'Create beautiful, customizable QR codes instantly. Free QR code generator with 100+ types including WiFi, vCard, URLs, crypto, social media, and more. No sign-up required. Export as PNG or SVG.',
    keywords: [
        'QR code generator',
        'free QR code',
        'custom QR code',
        'QR code maker',
        'QR code creator',
        'WiFi QR code',
        'vCard QR code',
        'QR code with logo',
        'business QR code',
        'marketing QR code',
        'social media QR code',
        'crypto QR code',
        'payment QR code',
        'QR code designer',
        'professional QR code',
        'QR code generator online',
        'create QR code free',
        'QR code customizer',
        'QR code download',
    ],
    openGraph: {
        title: 'Free QR Code Generator - Create Custom QR Codes Online',
        description: 'Create beautiful, customizable QR codes instantly. 100+ QR code types. Free to use, no sign-up required.',
        type: 'website',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'QRResult - Free QR Code Generator',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Free QR Code Generator - QRResult',
        description: 'Create beautiful, customizable QR codes instantly. 100+ types. Free to use.',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://www.qrresult.com',
    },
    other: {
        'google-site-verification': '',
    },
};

export default function Home() {
    return <HomeClient />;
}
