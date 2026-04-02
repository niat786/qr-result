"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import { Mail, MessageSquare, Clock, Github, HelpCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

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
                    {/* Hero */}
                    <header className="text-center mb-12">
                        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Contact Us</h1>
                        <p className="text-[#86868B] max-w-xl mx-auto text-lg" itemProp="description">
                            We would love to hear from you. Whether you have a question, feedback, or need help with our QR code generator, our team is ready to assist.
                        </p>
                    </header>

                    {/* Contact Cards */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12" itemScope itemType="https://schema.org/Organization">
                        <div className="card-pro p-8 text-center hover:scale-[1.02] transition-transform" itemScope itemType="https://schema.org/ContactPoint">
                            <div className="w-12 h-12 bg-[#007AFF]/10 text-[#007AFF] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <Mail size={24} />
                            </div>
                            <h2 className="font-semibold text-[#1D1D1F] mb-2" itemProp="contactType">Email Support</h2>
                            <p className="text-sm text-[#86868B] mb-4">Best for detailed questions and feature requests</p>
                            <a href="mailto:support@qrresult.com" className="text-[#007AFF] font-medium hover:underline" itemProp="email">support@qrresult.com</a>
                        </div>

                        <div className="card-pro p-8 text-center hover:scale-[1.02] transition-transform" itemScope itemType="https://schema.org/ContactPoint">
                            <div className="w-12 h-12 bg-[#34C759]/10 text-[#34C759] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <Github size={24} />
                            </div>
                            <h2 className="font-semibold text-[#1D1D1F] mb-2" itemProp="contactType">GitHub Issues</h2>
                            <p className="text-sm text-[#86868B] mb-4">Report bugs or request features directly</p>
                            <a href="https://github.com/niat786/qr-result-new/issues" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] font-medium hover:underline">Open an Issue</a>
                        </div>

                        <div className="card-pro p-8 text-center hover:scale-[1.02] transition-transform">
                            <div className="w-12 h-12 bg-[#FF9500]/10 text-[#FF9500] rounded-full flex items-center justify-center mx-auto mb-4" aria-hidden="true">
                                <Clock size={24} />
                            </div>
                            <h2 className="font-semibold text-[#1D1D1F] mb-2">Response Time</h2>
                            <p className="text-sm text-[#86868B] mb-4">We aim to respond within 24 hours</p>
                            <span className="text-[#1D1D1F] text-sm font-medium bg-[#F5F5F7] px-3 py-1 rounded-full">Monday - Friday</span>
                        </div>
                    </div>

                    {/* How to Reach Us */}
                    <section className="card-pro p-10 mb-8">
                        <h2 className="text-xl font-bold text-[#1D1D1F] mb-4">How to Reach Us</h2>
                        <div className="space-y-4 text-[#1D1D1F] leading-relaxed">
                            <p>
                                Getting in touch with the QRResult team is simple. We value every message we receive and strive to provide helpful, timely responses. Here are the best ways to connect with us:
                            </p>
                            <p>
                                <strong>For general questions:</strong> Send us an email at <a href="mailto:support@qrresult.com" className="text-[#007AFF] hover:underline">support@qrresult.com</a>. Whether you need help generating a specific QR code type, want to understand our dynamic link features, or have questions about exporting options, our support team is happy to guide you.
                            </p>
                            <p>
                                <strong>For bug reports and feature requests:</strong> We encourage you to use our <a href="https://github.com/niat786/qr-result-new/issues" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">GitHub repository</a>. Filing an issue helps us track, prioritize, and resolve problems faster. Plus, the open-source community can often provide quick solutions.
                            </p>
                            <p>
                                <strong>For business inquiries:</strong> If you represent a company interested in partnerships, integrations, or enterprise-level QR code solutions, please email us directly. We are always open to exploring new opportunities that help more people create better QR codes.
                            </p>
                            <p>
                                Before reaching out, you might find your answer below in our frequently asked questions. We have compiled the most common queries to save you time.
                            </p>
                        </div>
                    </section>

                    {/* FAQ Section */}
                    <section className="card-pro p-10 mb-8" itemScope itemType="https://schema.org/FAQPage">
                        <h2 className="text-xl font-bold text-[#1D1D1F] mb-6">Frequently Asked Questions</h2>
                        <div className="space-y-6">
                            <div itemScope itemType="https://schema.org/Question">
                                <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">Is QRResult really free to use?</h3>
                                <div itemScope itemType="https://schema.org/Answer">
                                    <p className="text-[#86868B]" itemProp="text">
                                        Yes, absolutely. QRResult is 100% free for generating static QR codes. There are no hidden charges, no watermarks, and no account required. Dynamic QR codes with analytics are also free during our beta period. We believe powerful tools should be accessible to everyone.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-black/5 pt-6" itemScope itemType="https://schema.org/Question">
                                <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">Can I use QRResult QR codes for commercial purposes?</h3>
                                <div itemScope itemType="https://schema.org/Answer">
                                    <p className="text-[#86868B]" itemProp="text">
                                        Of course. You have full rights to use any QR code you generate on QRResult for personal, commercial, or educational purposes. Print them on business cards, product packaging, flyers, restaurant menus, or digital campaigns. There are no restrictions.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-black/5 pt-6" itemScope itemType="https://schema.org/Question">
                                <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">What QR code formats can I download?</h3>
                                <div itemScope itemType="https://schema.org/Answer">
                                    <p className="text-[#86868B]" itemProp="text">
                                        QRResult supports PNG downloads in multiple resolutions (512px, 1024px, 2048px, and 4096px) as well as scalable SVG format. SVG is ideal for print materials because it scales to any size without losing quality. For more about vector graphics, see the <a href="https://developer.mozilla.org/en-US/docs/Web/SVG" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">MDN SVG documentation</a>.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-black/5 pt-6" itemScope itemType="https://schema.org/Question">
                                <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">Is my data safe with QRResult?</h3>
                                <div itemScope itemType="https://schema.org/Answer">
                                    <p className="text-[#86868B]" itemProp="text">
                                        Your privacy is our top priority. Static QR codes are generated entirely in your browser. No data is sent to our servers. For dynamic QR codes, we store only the minimum information needed to enable the redirect service. Read our full <Link href="/privacy" className="text-[#007AFF] hover:underline">Privacy Policy</Link> for complete details.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-black/5 pt-6" itemScope itemType="https://schema.org/Question">
                                <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">How many QR codes can I create?</h3>
                                <div itemScope itemType="https://schema.org/Answer">
                                    <p className="text-[#86868B]" itemProp="text">
                                        There is no limit. You can generate as many static QR codes as you need, whenever you need them. We do not throttle usage or require registration for basic QR code creation.
                                    </p>
                                </div>
                            </div>

                            <div className="border-t border-black/5 pt-6" itemScope itemType="https://schema.org/Question">
                                <h3 className="font-semibold text-[#1D1D1F] mb-2" itemProp="name">Do QRResult QR codes expire?</h3>
                                <div itemScope itemType="https://schema.org/Answer">
                                    <p className="text-[#86868B]" itemProp="text">
                                        Static QR codes never expire. Once you download a static QR code, it works forever. Dynamic QR codes remain active as long as the link is maintained in your dashboard. You can update the destination URL at any time without changing the QR code itself.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* CTA */}
                    <section className="text-center card-pro p-10">
                        <h2 className="text-xl font-bold text-[#1D1D1F] mb-3">Still Have Questions?</h2>
                        <p className="text-[#86868B] mb-6 max-w-lg mx-auto">
                            We are here to help. Drop us an email and our team will get back to you as quickly as possible. Your feedback helps us build a better product for everyone.
                        </p>
                        <a
                            href="mailto:support@qrresult.com"
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#007AFF] text-white font-semibold rounded-xl hover:bg-[#0055B3] transition-colors shadow-lg shadow-blue-500/20"
                        >
                            Send Us an Email
                            <ArrowRight size={18} />
                        </a>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}
