import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Dynamic Link Manager',
    description: 'Manage your dynamic QR codes with analytics. Create, edit, pause, and track QR code links. Export data, bulk operations, and advanced link management features.',
    openGraph: {
        title: 'Dynamic Link Manager - QRResult',
        description: 'Manage your dynamic QR codes with analytics, bulk operations, and advanced features.',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Dynamic Link Manager - QRResult',
        description: 'Manage dynamic QR codes with analytics and advanced features.',
    },
    alternates: {
        canonical: 'https://www.qrresult.com/dynamic',
    },
    keywords: [
        'dynamic QR code',
        'QR code analytics',
        'QR code manager',
        'trackable QR code',
        'QR code dashboard',
        'link management',
        'QR code statistics',
    ],
};

export default function DynamicLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return children;
}
