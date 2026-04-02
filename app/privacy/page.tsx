"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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
                            Last Updated: <time dateTime="2026-04-03">April 3, 2026</time>
                        </p>
                    </header>

                    {/* Introduction */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">1. Introduction</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Welcome to QRResult. Your privacy is important to us. This Privacy Policy explains how we collect, use, protect, and handle your personal information when you visit <strong>qrresult.com</strong> and use our free QR code generator.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We are committed to transparency. We follow the data protection principles outlined by the <a href="https://commission.europa.eu/law/law-topic/data-protection_en" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">European Commission&apos;s GDPR framework</a> and respect the privacy guidelines recommended by the <a href="https://www.eff.org/issues/privacy" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Electronic Frontier Foundation (EFF)</a>. By using our website, you agree to the practices described in this policy.
                        </p>
                    </section>

                    {/* Data We Collect */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">2. Information We Collect</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult is designed with a privacy-first approach. We collect minimal data to deliver our service effectively. Here is exactly what we collect and why:
                        </p>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">2.1 Static QR Code Generation</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            When you create a static QR code, <strong>all processing happens in your browser</strong>. The text, URL, or data you enter never leaves your device. We do not transmit, store, or log any content you encode into static QR codes. This is the safest approach to QR code generation available.
                        </p>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">2.2 Dynamic QR Codes</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Dynamic QR codes require server-side processing to enable URL redirection and scan tracking. When you create a dynamic QR code, we store the destination URL and basic scan analytics (scan count and timestamps). This data is stored locally in your browser or in our database when applicable. We use this information solely to provide the redirect service and display your analytics dashboard.
                        </p>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">2.3 Automatically Collected Data</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Like most websites, we may collect anonymous, aggregated usage data to improve our service. This may include:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li>Browser type and version</li>
                            <li>Device type (desktop, mobile, or tablet)</li>
                            <li>Pages visited and time spent on each page</li>
                            <li>Referring website or search engine</li>
                            <li>General geographic region (country level only)</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            This data is anonymous and cannot be used to identify you personally. We never collect names, email addresses, or payment information through normal website usage.
                        </p>
                    </section>

                    {/* How We Use Data */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">3. How We Use Your Information</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We use the limited information we collect for the following purposes:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Service delivery:</strong> To generate QR codes and provide dynamic link redirection</li>
                            <li><strong>Analytics:</strong> To understand how visitors use our site so we can improve the experience</li>
                            <li><strong>Security:</strong> To detect and prevent abuse, spam, or malicious activity</li>
                            <li><strong>Communication:</strong> To respond to your inquiries if you contact us directly</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We do not sell, rent, or trade your personal information to third parties. We never use your data for advertising purposes.
                        </p>
                    </section>

                    {/* Local Storage */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">4. Local Storage and Cookies</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult uses your browser&apos;s Local Storage to save your QR code history, dynamic link settings, and user preferences. This data remains on your device and is not sent to our servers unless explicitly required for dynamic QR code functionality.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We may use essential cookies to ensure the website functions correctly. For detailed information about our cookie practices, please visit our <Link href="/cookies" className="text-[#007AFF] hover:underline">Cookie Policy</Link>.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            You can clear your Local Storage data at any time through your browser settings. The <a href="https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">MDN Web Docs</a> explain how Local Storage works in modern browsers.
                        </p>
                    </section>

                    {/* Third-Party Services */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">5. Third-Party Services</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult may use the following third-party services to improve your experience:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Vercel:</strong> Our hosting provider. Vercel processes server requests in accordance with their <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Privacy Policy</a>.</li>
                            <li><strong>GitHub:</strong> Our source code is hosted on GitHub. Interactions with our repository are governed by <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">GitHub&apos;s Privacy Statement</a>.</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We carefully select partners who share our commitment to user privacy. We do not integrate advertising networks, social media trackers, or data brokers into our platform.
                        </p>
                    </section>

                    {/* Data Security */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">6. Data Security</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We take data security seriously. Our website is served over HTTPS, which encrypts all data transmitted between your browser and our servers. We follow security best practices recommended by <a href="https://owasp.org/www-project-top-ten/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">OWASP (Open Worldwide Application Security Project)</a> to protect against common web vulnerabilities.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            However, no method of electronic transmission or storage is completely secure. While we strive to protect your information, we cannot guarantee absolute security. We encourage you to use strong passwords and keep your browser updated.
                        </p>
                    </section>

                    {/* Your Rights */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">7. Your Rights</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Depending on your location, you may have the following rights regarding your personal data:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Right to access:</strong> You can request a copy of any personal data we hold about you.</li>
                            <li><strong>Right to deletion:</strong> You can ask us to delete your personal data at any time.</li>
                            <li><strong>Right to correction:</strong> You can request corrections to any inaccurate data.</li>
                            <li><strong>Right to restrict processing:</strong> You can ask us to limit how we use your data.</li>
                            <li><strong>Right to data portability:</strong> You can request your data in a portable format.</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            To exercise any of these rights, please contact us at <a href="mailto:support@qrresult.com" className="text-[#007AFF] hover:underline">support@qrresult.com</a>. We will respond to your request within 30 days.
                        </p>
                    </section>

                    {/* Children's Privacy */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">8. Children&apos;s Privacy</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult does not knowingly collect personal information from children under the age of 13. If you believe a child has provided us with personal data, please contact us immediately, and we will take steps to remove that information. We comply with the <a href="https://www.ftc.gov/legal-library/browse/rules/childrens-online-privacy-protection-rule-coppa" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Children&apos;s Online Privacy Protection Act (COPPA)</a>.
                        </p>
                    </section>

                    {/* Changes */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">9. Changes to This Policy</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. When we make significant changes, we will update the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy periodically.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">10. Contact Us</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Email:</strong> <a href="mailto:support@qrresult.com" className="text-[#007AFF] hover:underline">support@qrresult.com</a></li>
                            <li><strong>Contact Page:</strong> <Link href="/contact" className="text-[#007AFF] hover:underline">qrresult.com/contact</Link></li>
                            <li><strong>GitHub:</strong> <a href="https://github.com/niat786/qr-result-new" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">github.com/niat786/qr-result-new</a></li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We value your trust and are committed to protecting your privacy. Thank you for choosing QRResult.
                        </p>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}
