import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us',
    description: 'Get in touch with QRResult. Contact our support team for questions about QR code generation, dynamic links, analytics, or feature requests.',
    keywords: [
        'contact QRResult',
        'QR code support',
        'QRResult help',
        'QR code generator FAQ',
        'QRResult email',
    ],
    openGraph: {
        title: 'Contact QRResult',
        description: 'Get in touch with our support team for questions about QR code generation and features.',
        type: 'website',
    },
    twitter: {
        card: 'summary',
        title: 'Contact QRResult',
        description: 'Get in touch with our support team.',
    },
    alternates: {
        canonical: 'https://www.qrresult.com/contact',
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
