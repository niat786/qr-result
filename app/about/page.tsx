"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import { CheckCircle2 } from 'lucide-react';

export default function AboutPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen text-[#1D1D1F] font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF] bg-[#F5F5F7]">
            <Header
                title="About Us"
                mobileMenu={
                    <Sidebar
                        activeCategory="web"
                        onSelect={(id) => router.push(`/?category=${id}`)}
                    />
                }
            />

            <div className="max-w-4xl mx-auto p-6 lg:p-12 pb-20">
                <article itemScope itemType="https://schema.org/AboutPage">
                    <header className="mb-12 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#0055B3] rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl shadow-blue-500/20" aria-hidden="true">Q</div>
                        <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4 tracking-tight" itemProp="headline">QRResult</h1>
                        <p className="text-xl text-[#86868B] max-w-2xl mx-auto" itemProp="description">
                            The professional's choice for secure, customizable, and high-performance QR code generation.
                        </p>
                    </header>

                    <div className="card-pro p-10 space-y-12">
                        <section itemScope itemType="https://schema.org/Article">
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Our Mission</h2>
                            <p className="text-[#1D1D1F] leading-relaxed text-lg" itemProp="articleBody">
                                We built QRResult with a single goal: to provide a premium, privacy-focused QR code tool that doesn't compromise on design or functionality. In a world of cluttered, ad-filled generators, we offer a clean, professional workspace for your campaign needs.
                            </p>
                        </section>

                        <div className="grid md:grid-cols-2 gap-8">
                            <section>
                                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">Why Choose Us?</h3>
                                <ul className="space-y-3" role="list">
                                    {[
                                        "No account required for static codes",
                                        "Privacy-first architecture",
                                        "Premium vector (SVG) export",
                                        "Advanced customization options",
                                        "Real-time preview rendering",
                                        "Dynamic link management"
                                    ].map((item, i) => (
                                        <li key={i} className="flex items-center gap-3 text-[#1D1D1F]">
                                            <CheckCircle2 size={20} className="text-[#34C759]" aria-hidden="true" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </section>
                            <section className="bg-[#F5F5F7] rounded-2xl p-6 border border-black/5">
                                <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">For Developers & Brands</h3>
                                <p className="text-[#86868B] text-sm leading-relaxed mb-4">
                                    Our tools are designed for professionals who need reliability. From marketing campaigns to inventory management, our robust generation engine ensures your codes scan perfectly every time.
                                </p>
                                <div className="flex gap-2" role="list" aria-label="Technologies used">
                                    <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-black/5">React</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-black/5">Next.js</span>
                                    <span className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-black/5">TypeScript</span>
                                </div>
                            </section>
                        </div>
                    </div>
                </article>
            </div>

            <Footer />
        </main>
    );
}
