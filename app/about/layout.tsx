import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About Us',
    description: 'Learn about QRResult - A professional QR code generator with 100+ types, dynamic links, analytics, and custom designs. Free to use, privacy-first, and built for professionals.',
    keywords: [
        'about QRResult',
        'QR code generator company',
        'WebWise LLC',
        'free QR code tool',
        'open source QR generator',
    ],
    openGraph: {
        title: 'About QRResult',
        description: 'Learn about our mission to provide premium, privacy-focused QR code generation tools.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'About QRResult',
        description: 'Learn about our mission to provide premium, privacy-focused QR code generation tools.',
    },
    alternates: {
        canonical: 'https://www.qrresult.com/about',
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
