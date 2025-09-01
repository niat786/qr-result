
import type { Metadata } from "next";
import { Geist, Geist_Mono, Pacifico } from "next/font/google";
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
  title: "QRResult - Free QR Code Generator | Create Custom QR Codes Online",
  description: "Generate professional QR codes for free. Create custom QR codes for URLs, vCards, WiFi, payments, and more. Unlimited scans, full customization, analytics dashboard.",
  keywords: "QR code generator, free QR codes, custom QR codes, QR code maker, vCard QR, WiFi QR, payment QR codes",
  authors: [{ name: "QRResult Team" }],
  creator: "QRResult.com",
  publisher: "QRResult.com",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://qrresult.com",
    title: "QRResult - Free QR Code Generator",
    description: "Generate professional QR codes for free with unlimited customization options and analytics.",
    siteName: "QRResult",
    images: [
      {
        url: "https://qrresult.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "QRResult - QR Code Generator"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "QRResult - Free QR Code Generator",
    description: "Generate professional QR codes for free with unlimited customization options and analytics.",
    creator: "@QRResult",
    images: ["https://qrresult.com/twitter-image.png"]
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
  themeColor: '#3b82f6'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="google-site-verification" content="your-google-verification-code" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${pacifico.variable} antialiased`}
      >
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              "name": "QRResult",
              "url": "https://qrresult.com",
              "description": "Free QR code generator with unlimited customization options",
              "applicationCategory": "UtilityApplication",
              "operatingSystem": "Any",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "creator": {
                "@type": "Organization",
                "name": "QRResult Team"
              }
            })
          }}
        />
      </body>
    </html>
  );
}
