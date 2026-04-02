import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service',
    description: 'QRResult Terms of Service - Read our terms and conditions for using our free QR code generator and dynamic link manager.',
    keywords: [
        'QRResult terms of service',
        'QR code generator terms',
        'QRResult acceptable use',
        'free QR code terms',
        'dynamic QR code terms',
    ],
    openGraph: {
        title: 'Terms of Service - QRResult',
        description: 'Read our terms and conditions for using QRResult.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Terms of Service - QRResult',
        description: 'Read our terms and conditions.',
    },
    alternates: {
        canonical: 'https://www.qrresult.com/terms',
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
