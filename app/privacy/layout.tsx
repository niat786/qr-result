import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy',
    description: 'QRResult Privacy Policy - Learn how we protect your data. Client-side QR code generation means your data stays private. No tracking, no data collection for static codes.',
    keywords: [
        'QRResult privacy policy',
        'QR code privacy',
        'data protection QR generator',
        'GDPR QR code',
        'browser-based QR privacy',
    ],
    openGraph: {
        title: 'Privacy Policy - QRResult',
        description: 'Learn how QRResult protects your privacy with client-side generation and minimal data collection.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Privacy Policy - QRResult',
        description: 'Learn how we protect your privacy.',
    },
    alternates: {
        canonical: 'https://www.qrresult.com/privacy',
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
