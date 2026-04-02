"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
                            Last Updated: <time dateTime="2026-04-03">April 3, 2026</time>
                        </p>
                    </header>

                    {/* Agreement */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">1. Agreement to Terms</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Welcome to QRResult. By accessing or using our website at <strong>qrresult.com</strong>, you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, you must stop using our service immediately.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            These terms apply to all visitors, users, and anyone who accesses QRResult. We encourage you to read them carefully before using our QR code generator. For more information about online terms of service, the <a href="https://www.ftc.gov/business-guidance/resources/advertising-and-marketing-internet-rules-road" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Federal Trade Commission (FTC)</a> provides helpful guidance.
                        </p>
                    </section>

                    {/* Description */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">2. Description of Service</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult is a free, browser-based QR code generator. Our platform allows you to create, customize, and download QR codes for a wide range of purposes. These include URLs, WiFi networks, vCards, text, email, SMS, social media profiles, cryptocurrency wallets, calendar events, geographic locations, and many more.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We also offer dynamic QR codes that enable you to change the destination URL after the code has been created. Dynamic codes include built-in scan analytics so you can track performance. Our service supports high-resolution PNG downloads (up to 4096px) and scalable SVG exports for professional print use.
                        </p>
                    </section>

                    {/* Acceptable Use */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">3. Acceptable Use</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            You agree to use QRResult only for lawful purposes. You are fully responsible for the content you encode into QR codes. The following activities are strictly prohibited:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Malicious content:</strong> Creating QR codes that link to malware, viruses, phishing pages, or any harmful software</li>
                            <li><strong>Illegal activity:</strong> Encoding content that violates any applicable local, state, national, or international law</li>
                            <li><strong>Fraud and deception:</strong> Using QR codes to deceive, scam, or mislead others</li>
                            <li><strong>Spam:</strong> Mass-generating QR codes for unsolicited bulk distribution</li>
                            <li><strong>Intellectual property violation:</strong> Creating codes that infringe on trademarks, copyrights, or other proprietary rights</li>
                            <li><strong>Harassment:</strong> Using QR codes to harass, threaten, or intimidate any person</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We reserve the right to suspend or terminate any dynamic link that violates these guidelines without prior notice. For guidance on responsible internet use, visit the <a href="https://www.internetsociety.org/issues/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Internet Society</a>.
                        </p>
                    </section>

                    {/* Intellectual Property */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">4. Intellectual Property</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            The QRResult website, including its design, code, logos, and original content, is the intellectual property of <strong>WebWise LLC</strong> and its contributors. Our source code is available under an open-source license on <a href="https://github.com/niat786/qr-result-new" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">GitHub</a>.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            <strong>QR codes you create belong to you.</strong> Once you generate and download a QR code using our tool, you own full rights to that QR code. You may use it for personal, commercial, or educational purposes without attribution. However, you may not claim ownership of the QRResult platform itself or redistribute our tool as your own product.
                        </p>
                    </section>

                    {/* Dynamic Links */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">5. Dynamic QR Codes and Links</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Dynamic QR codes rely on our redirect service to function. While we strive to maintain uninterrupted service, we cannot guarantee 100% uptime. By using dynamic QR codes, you acknowledge the following:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li>We may suspend or remove dynamic links that violate our acceptable use policy</li>
                            <li>Service interruptions may occur due to maintenance, updates, or unforeseen circumstances</li>
                            <li>You are responsible for maintaining backup copies of your destination URLs</li>
                            <li>Dynamic link analytics data is provided as-is and may not be perfectly accurate</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            For mission-critical applications, we recommend testing your dynamic QR codes regularly to ensure they point to the correct destinations.
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">6. Disclaimer of Warranties</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult is provided on an <strong>&quot;AS IS&quot;</strong> and <strong>&quot;AS AVAILABLE&quot;</strong> basis. We make no warranties, whether express or implied, regarding the service. This includes, but is not limited to:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li>The service will be uninterrupted, timely, secure, or error-free</li>
                            <li>The results obtained from using the service will be accurate or reliable</li>
                            <li>Any defects in the service will be corrected within a specific timeframe</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            You use QRResult at your own risk. We are not responsible for printing errors, broken links, misinterpretation of QR code data, or any losses that arise from using our generated QR codes.
                        </p>
                    </section>

                    {/* Limitation of Liability */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">7. Limitation of Liability</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            To the fullest extent permitted by law, QRResult and its creators shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the service. This includes, without limitation, loss of profits, data, business opportunities, or goodwill.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Our total liability for any claims related to the service shall not exceed the amount you paid to us (which is zero, since QRResult is free). This limitation applies regardless of the legal theory under which the claim is made.
                        </p>
                    </section>

                    {/* Third-Party Links */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">8. Third-Party Links and Content</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QR codes generated on QRResult may contain links to third-party websites and services. We have no control over the content, privacy practices, or availability of these external sites. We do not endorse or accept responsibility for any third-party content accessed through QR codes created using our tool.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We encourage you to review the terms and privacy policies of any external website you visit. The <a href="https://www.w3.org/WAI/standards-guidelines/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">W3C Web Accessibility Initiative</a> provides helpful resources for evaluating website quality and safety.
                        </p>
                    </section>

                    {/* Modifications */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">9. Modifications to Terms</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We reserve the right to update or modify these Terms of Service at any time. When we make changes, we will update the &quot;Last Updated&quot; date at the top of this page. Your continued use of QRResult after changes are published constitutes your acceptance of the revised terms.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We recommend checking this page periodically to stay informed about any updates. Significant changes will be communicated through a notice on our website.
                        </p>
                    </section>

                    {/* Termination */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">10. Termination</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We may terminate or suspend your access to QRResult at any time, without prior notice, if you violate these Terms of Service. Upon termination, your right to use the service ceases immediately. Any dynamic QR codes associated with a terminated account may be deactivated.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Static QR codes you have already downloaded will continue to function since they do not depend on our servers. You are free to stop using QRResult at any time without any obligations.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">11. Governing Law</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            These Terms of Service shall be governed by and interpreted in accordance with applicable laws. Any disputes arising from these terms or your use of QRResult shall be resolved through good-faith negotiation. If negotiation fails, disputes shall be submitted to the appropriate legal jurisdiction.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">12. Contact Us</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            If you have questions or concerns about these Terms of Service, please contact us:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Email:</strong> <a href="mailto:support@qrresult.com" className="text-[#007AFF] hover:underline">support@qrresult.com</a></li>
                            <li><strong>Contact Page:</strong> <Link href="/contact" className="text-[#007AFF] hover:underline">qrresult.com/contact</Link></li>
                            <li><strong>GitHub:</strong> <a href="https://github.com/niat786/qr-result-new" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">github.com/niat786/qr-result-new</a></li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Thank you for using QRResult. We appreciate your trust and are committed to providing a reliable, transparent service.
                        </p>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}
