"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import { CheckCircle2, Users, Shield, Zap, Globe, Award, Heart } from 'lucide-react';
import Link from 'next/link';
import { Breadcrumb } from '../components/Breadcrumb';

export default function AboutPage() {
    const router = useRouter();

    return (
        <main id="main-content" className="min-h-screen text-[#1D1D1F] font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF] bg-[#F5F5F7]">
            <Header
                title="About Us"
                mobileMenu={
                    <Sidebar
                        activeCategory="web"
                        onSelect={(id) => router.push(`/?category=${id}`)}
                    />
                }
            />

            <Breadcrumb items={[{ label: 'About Us' }]} />

            <div className="max-w-4xl mx-auto p-6 lg:p-12 pb-20">
                <article itemScope itemType="https://schema.org/AboutPage">
                    {/* Hero Section */}
                    <header className="mb-12 text-center">
                        <div className="w-16 h-16 bg-gradient-to-br from-[#007AFF] to-[#0055B3] rounded-2xl flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6 shadow-xl shadow-blue-500/20" aria-hidden="true">Q</div>
                        <h1 className="text-4xl font-bold text-[#1D1D1F] mb-4 tracking-tight" itemProp="headline">
                            About QRResult
                        </h1>
                        <p className="text-xl text-[#86868B] max-w-2xl mx-auto" itemProp="description">
                            We help millions of people create professional QR codes for free. No sign-ups. No hidden fees. Just powerful results.
                        </p>
                    </header>

                    <div className="card-pro p-10 space-y-12">
                        {/* Our Story */}
                        <section itemScope itemType="https://schema.org/Article">
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Our Story</h2>
                            <div className="space-y-4 text-[#1D1D1F] leading-relaxed text-lg" itemProp="articleBody">
                                <p>
                                    QRResult is a product of <strong>WebWise LLC</strong>, a company dedicated to building smart, user-friendly web tools. It started with a simple frustration. Every QR code tool we found was either full of ads, required a paid account, or added ugly watermarks. We knew there had to be a better way. So we built one.
                                </p>
                                <p>
                                    Today, QRResult is a trusted <strong>free QR code generator</strong> that supports over <strong>100 QR code types</strong>. From simple URL codes to advanced WiFi sharing, vCard contacts, cryptocurrency wallets, and dynamic trackable links, we cover every use case you can imagine.
                                </p>
                                <p>
                                    Our tool runs entirely in your browser. That means your data stays on your device. We never store, sell, or share your personal information. According to the <a href="https://www.eff.org/issues/privacy" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Electronic Frontier Foundation</a>, browser-based tools offer one of the strongest privacy protections available online. We take that seriously.
                                </p>
                            </div>
                        </section>

                        {/* Our Mission */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Our Mission</h2>
                            <div className="space-y-4 text-[#1D1D1F] leading-relaxed text-lg">
                                <p>
                                    We believe great tools should be accessible to everyone. Our mission is straightforward: provide the most reliable, privacy-focused, and beautifully designed QR code generator on the web, completely free of charge.
                                </p>
                                <p>
                                    Whether you run a small business, manage marketing campaigns, organize events, or simply want to share your WiFi password, QRResult gives you professional-grade results in seconds. We removed every barrier so you can focus on what matters most: connecting with your audience.
                                </p>
                            </div>
                        </section>

                        {/* Why Choose QRResult */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-6">Why Choose QRResult?</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-black/5">
                                    <div className="w-10 h-10 bg-[#007AFF]/10 text-[#007AFF] rounded-xl flex items-center justify-center mb-3" aria-hidden="true">
                                        <Shield size={22} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">Privacy-First Design</h3>
                                    <p className="text-[#86868B] text-sm leading-relaxed">
                                        Static QR codes generate entirely in your browser. No data leaves your device. We follow the privacy-by-design principles recommended by the <a href="https://commission.europa.eu/law/law-topic/data-protection_en" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">European Commission</a>.
                                    </p>
                                </div>

                                <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-black/5">
                                    <div className="w-10 h-10 bg-[#34C759]/10 text-[#34C759] rounded-xl flex items-center justify-center mb-3" aria-hidden="true">
                                        <Zap size={22} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">Lightning-Fast Performance</h3>
                                    <p className="text-[#86868B] text-sm leading-relaxed">
                                        Built with Next.js and React, our generator delivers instant real-time previews. Every change you make appears immediately. No waiting, no loading screens.
                                    </p>
                                </div>

                                <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-black/5">
                                    <div className="w-10 h-10 bg-[#FF9500]/10 text-[#FF9500] rounded-xl flex items-center justify-center mb-3" aria-hidden="true">
                                        <Award size={22} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">Professional Quality</h3>
                                    <p className="text-[#86868B] text-sm leading-relaxed">
                                        Export crisp, high-resolution QR codes in PNG (up to 4096px) or scalable SVG format. Add your brand logo, customize colors, and create codes that match your identity.
                                    </p>
                                </div>

                                <div className="bg-[#F5F5F7] rounded-2xl p-6 border border-black/5">
                                    <div className="w-10 h-10 bg-[#AF52DE]/10 text-[#AF52DE] rounded-xl flex items-center justify-center mb-3" aria-hidden="true">
                                        <Globe size={22} />
                                    </div>
                                    <h3 className="text-lg font-semibold text-[#1D1D1F] mb-2">100+ QR Code Types</h3>
                                    <p className="text-[#86868B] text-sm leading-relaxed">
                                        URLs, WiFi, vCards, SMS, email, social media, payments, cryptocurrency, events, locations, and much more. If it can be encoded, QRResult handles it.
                                    </p>
                                </div>
                            </div>
                        </section>

                        {/* Key Features List */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">What Makes Us Different</h2>
                            <p className="text-[#1D1D1F] leading-relaxed text-lg mb-6">
                                We designed QRResult for people who demand quality without compromise. Here is what sets us apart from other QR code generators:
                            </p>
                            <ul className="space-y-3" role="list">
                                {[
                                    "Completely free with no account required",
                                    "No watermarks on any generated QR code",
                                    "Dynamic QR codes with built-in scan analytics",
                                    "Premium vector SVG export for print materials",
                                    "Advanced color customization and gradient support",
                                    "Brand logo integration with adjustable sizing",
                                    "Real-time preview as you customize",
                                    "Multiple error correction levels for reliability",
                                    "Open-source transparency on GitHub"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-[#1D1D1F]">
                                        <CheckCircle2 size={20} className="text-[#34C759] flex-shrink-0" aria-hidden="true" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        {/* Who Uses QRResult */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Who Uses QRResult?</h2>
                            <div className="space-y-4 text-[#1D1D1F] leading-relaxed text-lg">
                                <p>
                                    Our users span every industry and background. <strong>Small business owners</strong> use QRResult to create scannable menus, product labels, and promotional materials. <strong>Marketing professionals</strong> track campaign performance with dynamic QR codes and built-in analytics.
                                </p>
                                <p>
                                    <strong>Event organizers</strong> generate ticket codes and check-in systems. <strong>Educators</strong> share classroom resources instantly. <strong>Developers</strong> integrate QR functionality into their workflows. And <strong>everyday users</strong> share WiFi passwords, contact cards, and links with a single scan.
                                </p>
                                <p>
                                    According to <a href="https://www.statista.com/topics/1145/internet-usage-worldwide/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Statista</a>, QR code usage has grown exponentially since 2020. More people scan QR codes today than ever before. QRResult ensures you are ready to meet that demand with beautiful, reliable codes.
                                </p>
                            </div>
                        </section>

                        {/* Open Source & Trust */}
                        <section>
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Open Source and Transparent</h2>
                            <div className="space-y-4 text-[#1D1D1F] leading-relaxed text-lg">
                                <p>
                                    Trust matters. That is why QRResult is fully open source. You can review our entire codebase on <a href="https://github.com/niat786/qr-result-new" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">GitHub</a>. We have nothing to hide. Every line of code is available for inspection, contribution, and improvement.
                                </p>
                                <p>
                                    The <a href="https://opensource.org/osd" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Open Source Initiative</a> defines open source as software that anyone can inspect, modify, and enhance. We proudly follow these principles because we believe transparency builds trust.
                                </p>
                            </div>
                        </section>

                        {/* Built With */}
                        <section className="bg-[#F5F5F7] rounded-2xl p-6 border border-black/5">
                            <h3 className="text-lg font-semibold text-[#1D1D1F] mb-3">Built With Modern Technology</h3>
                            <p className="text-[#86868B] text-sm leading-relaxed mb-4">
                                QRResult is built on a robust, modern tech stack designed for speed, reliability, and accessibility. We use industry-leading frameworks trusted by companies worldwide.
                            </p>
                            <div className="flex flex-wrap gap-2" role="list" aria-label="Technologies used">
                                {["React", "Next.js", "TypeScript", "Tailwind CSS", "PWA"].map((tech) => (
                                    <span key={tech} className="bg-white px-3 py-1 rounded-full text-xs font-medium border border-black/5">{tech}</span>
                                ))}
                            </div>
                        </section>

                        {/* CTA */}
                        <section className="text-center pt-4">
                            <h2 className="text-2xl font-bold text-[#1D1D1F] mb-4">Ready to Create Your QR Code?</h2>
                            <p className="text-[#86868B] mb-6 max-w-lg mx-auto">
                                Join thousands of satisfied users who trust QRResult for their QR code needs. Start generating beautiful, scannable codes right now.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                <Link
                                    href="/"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-[#007AFF] text-white font-semibold rounded-xl hover:bg-[#0055B3] transition-colors shadow-lg shadow-blue-500/20"
                                >
                                    Create Free QR Code
                                </Link>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#1D1D1F] font-semibold rounded-xl hover:bg-gray-50 transition-colors border border-black/10"
                                >
                                    Get in Touch
                                </Link>
                            </div>
                        </section>
                    </div>
                </article>
            </div>

            <Footer />
        </main>
    );
}
