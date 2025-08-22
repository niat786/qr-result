import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const pacifico = Pacifico({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-pacifico',
})

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "QRMaster - Professional QR Code Generator",
  description: "Create custom QR codes with advanced features. Support for URLs, contacts, WiFi, events, and more. Download in PNG, JPEG, or SVG format.",
  keywords: "QR code generator, custom QR codes, QR code maker, free QR generator, business QR codes, WiFi QR code, contact QR code",
  authors: [{ name: "QRMaster Team" }],
  creator: "QRMaster",
  publisher: "QRMaster",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qrresult.com",
    siteName: "QRMaster",
    title: "QRMaster - Professional QR Code Generator",
    description: "Create custom QR codes with advanced features. Support for URLs, contacts, WiFi, events, and more. Download in PNG, JPEG, or SVG format.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "QRMaster - Professional QR Code Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "QRMaster - Professional QR Code Generator",
    description: "Create custom QR codes with advanced features. Support for URLs, contacts, WiFi, events, and more.",
    creator: "@qrmaster",
    site: "@qrmaster",
    images: ["/og-image.jpg"]
  },
  alternates: {
    canonical: "https://qrresult.com"
  }
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#2563eb',
  colorScheme: 'light'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="canonical" href="https://qrresult.com" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="your-google-site-verification-code" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "QRMaster",
              "applicationCategory": "UtilitiesApplication",
              "description": "Create custom QR codes with advanced features. Support for URLs, contacts, WiFi, events, and more. Download in PNG, JPEG, or SVG format.",
              "url": "https://qrresult.com",
              "author": {
                "@type": "Organization",
                "name": "QRMaster Team"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "operatingSystem": "Web Browser",
              "permissions": "No special permissions required",
              "screenshot": "/og-image.jpg",
              "softwareVersion": "1.0",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "1250"
              }
            })
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}