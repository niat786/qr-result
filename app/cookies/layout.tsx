import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Cookie Policy',
    description: 'QRResult Cookie Policy — Learn how we use cookies and Local Storage. Minimal cookies, no advertising trackers, and full transparency about data stored on your device.',
    keywords: [
        'QRResult cookie policy',
        'QR code generator cookies',
        'local storage policy',
        'privacy cookies',
        'GDPR cookies',
    ],
    openGraph: {
        title: 'Cookie Policy - QRResult',
        description: 'Learn how QRResult uses cookies and Local Storage to deliver a fast, privacy-first QR code experience.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Cookie Policy - QRResult',
        description: 'How QRResult uses cookies and Local Storage.',
    },
    alternates: {
        canonical: 'https://www.qrresult.com/cookies',
    },
};

export default function CookiesLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
