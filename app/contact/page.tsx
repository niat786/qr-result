"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import { Mail, MapPin, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen text-[#1D1D1F] font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF] bg-[#F5F5F7]">
            <Header
                title="Contact Us"
                mobileMenu={
                    <Sidebar
                        activeCategory="web"
                        onSelect={(id) => router.push(`/?category=${id}`)}
                    />
                }
            />

            <div className="max-w-4xl mx-auto p-6 lg:p-12 pb-20">
                <article itemScope itemType="https://schema.org/ContactPage">
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Get in Touch</h1>
                        <p className="text-[#86868B] max-w-xl mx-auto" itemProp="description">
                            Have questions about our Premium or Dynamic features? We're here to help.
                        </p>
                    </header>

                    <div className="grid md:grid-cols-3 gap-6 mb-12" itemScope itemType="https://schema.org/Organization">
                        <div className="card-pro p-8 text-center hover:scale-[1.02] transition-transform" itemScope itemType="https://schema.org/ContactPoint">
                            <div className="w-12 h-12 bg-[#007AFF]/10 text-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <Mail size={24} />
                            </div>
                            <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="contactType">Email Support</h3>
                            <p className="text-sm text-[#86868B] mb-4">For general inquiries and support</p>
                            <a href="mailto:support@qrresult.com" className="text-[#007AFF] font-medium hover:underline" itemProp="email">support@qrresult.com</a>
                        </div>

                        <div className="card-pro p-8 text-center hover:scale-[1.02] transition-transform" itemScope itemType="https://schema.org/ContactPoint">
                            <div className="w-12 h-12 bg-[#34C759]/10 text-[#34C759] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <MessageSquare size={24} />
                            </div>
                            <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="contactType">Live Chat</h3>
                            <p className="text-sm text-[#86868B] mb-4">Available Mon-Fri, 9am-5pm EST</p>
                            <span className="text-[#86868B] text-sm bg-[#F5F5F7] px-3 py-1 rounded-full" aria-label="Chat status: Offline">Offline</span>
                        </div>

                        <div className="card-pro p-8 text-center hover:scale-[1.02] transition-transform" itemScope itemType="https://schema.org/PostalAddress">
                            <div className="w-12 h-12 bg-[#FF9500]/10 text-[#FF9500] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <MapPin size={24} />
                            </div>
                            <h3 className="font-semibold text-[#1D1D1F] mb-2">Office</h3>
                            <p className="text-sm text-[#86868B] mb-4">Headquarters</p>
                            <address className="text-[#1D1D1F] text-sm not-italic">
                                <span itemProp="streetAddress">123 Innovation Drive</span><br />
                                <span itemProp="addressLocality">Tech City</span>, <span itemProp="addressRegion">TC</span> <span itemProp="postalCode">94043</span>
                            </address>
                        </div>
                </div>

                        {/* FAQ Teaser */}
                        <section className="card-pro p-10" itemScope itemType="https://schema.org/FAQPage">
                            <h2 className="text-xl font-bold text-[#1D1D1F] mb-6">Frequently Asked Questions</h2>
                            <div className="space-y-6">
                                <div itemScope itemType="https://schema.org/Question">
                                    <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">Are the QR codes really free?</h3>
                                    <div itemScope itemType="https://schema.org/Answer">
                                        <p className="text-[#86868B]" itemProp="text">Yes! Static QR codes generated on our platform are 100% free and will never expire. Dynamic codes are free during our Beta period.</p>
                                    </div>
                                </div>
                                <div className="border-t border-black/5 pt-6" itemScope itemType="https://schema.org/Question">
                                    <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">Can I use the codes for commercial purposes?</h3>
                                    <div itemScope itemType="https://schema.org/Answer">
                                        <p className="text-[#86868B]" itemProp="text">Absolutely. You have full rights to use any QR code you generate for your business, marketing, or personal needs.</p>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </article>
                </div>

            <Footer />
        </main>
    );
}
