"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';

export default function PrivacyPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen text-[#1D1D1F] font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF] bg-[#F5F5F7]">
            <Header
                title="Privacy Policy"
                mobileMenu={
                    <Sidebar
                        activeCategory="web"
                        onSelect={(id) => router.push(`/?category=${id}`)}
                    />
                }
            />

            <div className="max-w-4xl mx-auto p-6 lg:p-12 pb-20">
                <article className="card-pro p-10 space-y-8" itemScope itemType="https://schema.org/WebPage">
                    <header>
                        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Privacy Policy</h1>
                        <p className="text-[#86868B] text-sm">
                            Last Updated: <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
                        </p>
                    </header>

                    <section className="space-y-4" itemScope itemType="https://schema.org/Article">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">1. Introduction</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Welcome to QRResult. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you as to how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">2. Data We Collect</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult operates primarily as a client-side tool. This means:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Static QR Codes:</strong> No data is sent to our servers. The QR code generation happens entirely within your browser.</li>
                            <li><strong>Dynamic QR Codes:</strong> We store the redirection data in your browser&apos;s local storage or our database (if applicable) to enable the redirect service.</li>
                            <li><strong>Analytics:</strong> We may collect anonymous usage data to improve our service structure.</li>
                        </ul>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">3. Local Storage</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            To provide features like your history of created QR codes and Dynamic Link management, we use your browser&apos;s Local Storage. This data stays on your device and is not accessible to us unless explicitly shared.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">4. Contact Us</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            If you have any questions about this privacy policy, please contact us via our Contact page.
                        </p>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}
