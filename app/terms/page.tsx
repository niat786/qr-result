"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';

export default function TermsPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen text-[#1D1D1F] font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF] bg-[#F5F5F7]">
            <Header
                title="Terms of Service"
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
                        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Terms of Service</h1>
                        <p className="text-[#86868B] text-sm">
                            Last Updated: <time dateTime={new Date().toISOString()}>{new Date().toLocaleDateString()}</time>
                        </p>
                    </header>

                    <section className="space-y-4" itemScope itemType="https://schema.org/Article">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">1. Agreement to Terms</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            By accessing or using QRResult, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use our services.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">2. Use of Service</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Our service allows you to generate QR codes. You agree to use this service only for lawful purposes and in accordance with these Terms. You are responsible for the content you encode into QR codes.
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">3. Disclaimer of Warranties</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            The service is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis. We make no warranties that the service will be uninterrupted, error-free, or completely secure. We are not liable for any issues arising from the use of generated QR codes (e.g., printing errors, broken links).
                        </p>
                    </section>

                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">4. Dynamic Links</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We reserve the right to suspend or delete any dynamic link that violates our acceptable use policy (e.g., phishing, malware, illegal content).
                        </p>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}
