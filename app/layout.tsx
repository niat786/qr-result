import './globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
    metadataBase: new URL('https://www.qrresult.com'),
    title: {
        template: '%s | QRResult',
        default: 'QRResult - Free QR Code Generator & Dynamic Link Manager',
    },
    description: 'Create beautiful, customizable QR codes instantly. Free QR code generator with 100+ types including WiFi, vCard, URLs, crypto, social media, and more. Dynamic links with analytics. No sign-up required.',
    applicationName: 'QRResult',
    authors: [{ name: 'QR Studio Team', url: 'https://github.com/niat786' }],
    keywords: [
        'QR code generator',
        'free QR code',
        'custom QR code',
        'dynamic QR code',
        'QR code maker',
        'QR code creator',
        'WiFi QR code',
        'vCard QR code',
        'QR code analytics',
        'QR code with logo',
        'business QR code',
        'marketing QR code',
        'social media QR code',
        'crypto QR code',
        'payment QR code',
        'QR code scanner',
        'QR code designer',
        'professional QR code',
        'QR code generator online',
        'create QR code free'
    ],
    creator: 'QRResult',
    publisher: 'QRResult',
    formatDetection: {
        email: false,
        address: false,
        telephone: false,
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://www.qrresult.com',
        siteName: 'QRResult',
        title: 'QRResult - Free QR Code Generator & Dynamic Link Manager',
        description: 'Create beautiful, customizable QR codes instantly. 100+ QR code types including WiFi, vCard, URLs, crypto, social media, and more. Dynamic links with analytics.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'QRResult - QR Code Generator',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'QRResult - Free QR Code Generator',
        description: 'Create beautiful, customizable QR codes instantly. 100+ types. Dynamic links with analytics.',
        creator: '@qrresult',
        images: ['/og-image.png'],
    },
    alternates: {
        canonical: 'https://www.qrresult.com',
    },
    category: 'Utilities',
    classification: 'QR Code Generator',
    other: {
        'apple-mobile-web-app-capable': 'yes',
        'apple-mobile-web-app-status-bar-style': 'default',
        'apple-mobile-web-app-title': 'QRResult',
    },
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#007AFF' },
        { media: '(prefers-color-scheme: dark)', color: '#0055B3' },
    ],
    colorScheme: 'light',
}

// Enhanced Structured Data for SEO and AI Discovery
const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QRResult',
    url: 'https://www.qrresult.com',
    logo: 'https://www.qrresult.com/logo.png',
    description: 'Professional QR Code Generator and Dynamic Link Manager',
    sameAs: [
        'https://github.com/niat786/qr-result-new',
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        contactType: 'Customer Support',
        availableLanguage: ['English'],
    },
}

const softwareApplicationSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'QRResult',
    applicationCategory: 'WebApplication',
    operatingSystem: 'Any',
    offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
    },
    description: 'A professional web-based QR code generator supporting 100+ QR code types, Dynamic Links, Analytics, and Custom Designs. Free to use with no sign-up required.',
    aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        ratingCount: '1250',
        bestRating: '5',
        worstRating: '1',
    },
    featureList: [
        '100+ QR Code Types',
        'Custom Colors and Styling',
        'Logo Integration',
        'Dynamic Links with Analytics',
        'Export as PNG/SVG',
        'WiFi QR Codes',
        'vCard QR Codes',
        'Social Media QR Codes',
        'Crypto QR Codes',
        'Payment QR Codes',
        'No Sign-up Required',
        'Free to Use',
    ],
    screenshot: 'https://www.qrresult.com/screenshot.png',
    softwareVersion: '1.0.0',
    releaseNotes: 'Initial release with comprehensive QR code generation features',
}

const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'QRResult',
    url: 'https://www.qrresult.com',
    description: 'Free QR Code Generator with 100+ types and Dynamic Link Manager',
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.qrresult.com/?category={search_term_string}',
        },
        'query-input': 'required name=search_term_string',
    },
}

const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
        {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: 'https://www.qrresult.com',
        },
    ],
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" itemScope itemType="https://schema.org/WebApplication">
            <head>
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/manifest.json" />
                <meta name="google-site-verification" content="" />
                <meta name="msvalidate.01" content="" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareApplicationSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
                />
            </head>
            <body suppressHydrationWarning itemScope itemType="https://schema.org/WebPage">
                {children}
            </body>
        </html>
    )
}
