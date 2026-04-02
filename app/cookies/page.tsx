"use client";

import React from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Sidebar } from '../components/Sidebar';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CookiePolicyPage() {
    const router = useRouter();

    return (
        <main className="min-h-screen text-[#1D1D1F] font-sans selection:bg-[#007AFF]/20 selection:text-[#007AFF] bg-[#F5F5F7]">
            <Header
                title="Cookie Policy"
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
                        <h1 className="text-3xl font-bold text-[#1D1D1F] mb-4" itemProp="headline">Cookie Policy</h1>
                        <p className="text-[#86868B] text-sm">
                            Last Updated: <time dateTime="2026-04-03">April 3, 2026</time>
                        </p>
                    </header>

                    {/* Introduction */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">1. What Are Cookies?</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Cookies are small text files that websites place on your device when you visit them. They help websites remember your preferences, understand how you interact with the site, and improve your overall experience. Cookies are a standard technology used by virtually every website on the internet.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            The <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">MDN Web Docs</a> provide an excellent technical overview of how cookies work. In simple terms, cookies allow websites to recognize your browser and remember certain information across visits.
                        </p>
                    </section>

                    {/* How We Use Cookies */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">2. How QRResult Uses Cookies</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult is designed with a minimal-cookie approach. We prioritize your privacy and use cookies only when necessary to deliver core functionality. Here is a transparent breakdown of how we use cookies and similar technologies:
                        </p>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">2.1 Essential Cookies</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Essential cookies are required for the basic operation of our website. Without them, certain features may not work properly. These cookies do not collect personal information or track your browsing activity. Examples include:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Session management:</strong> Keeps the website functioning correctly during your visit</li>
                            <li><strong>Security tokens:</strong> Protects against cross-site request forgery (CSRF) attacks</li>
                            <li><strong>Load balancing:</strong> Ensures fast and reliable page delivery</li>
                        </ul>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">2.2 Local Storage</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            In addition to cookies, QRResult makes extensive use of your browser&apos;s Local Storage. This technology stores data directly on your device and provides a faster, more private alternative to traditional cookies. We use Local Storage to save:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>QR code history:</strong> Your recently created QR codes for easy access</li>
                            <li><strong>Dynamic link data:</strong> Destination URLs and settings for your dynamic QR codes</li>
                            <li><strong>User preferences:</strong> Your customization settings like preferred colors and export options</li>
                            <li><strong>Application state:</strong> UI preferences to maintain a smooth experience</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Local Storage data never leaves your device. It is not sent to our servers, shared with third parties, or used for tracking purposes. You can learn more about Local Storage from the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Web Storage API documentation</a>.
                        </p>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">2.3 Analytics Cookies</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We may use anonymous analytics cookies to understand how visitors interact with our website. This data helps us identify popular features, discover usability issues, and improve the overall experience. Analytics data is always aggregated and anonymized, meaning it cannot be used to identify individual users.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We do not use analytics data for advertising, remarketing, or building user profiles. Our goal is simply to build a better product for you.
                        </p>
                    </section>

                    {/* Types of Cookies */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">3. Types of Cookies We Use</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Here is a clear overview of the cookie categories on QRResult:
                        </p>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left border border-black/5 rounded-xl overflow-hidden">
                                <thead className="bg-[#F5F5F7]">
                                    <tr>
                                        <th className="px-4 py-3 font-semibold text-[#1D1D1F]">Category</th>
                                        <th className="px-4 py-3 font-semibold text-[#1D1D1F]">Purpose</th>
                                        <th className="px-4 py-3 font-semibold text-[#1D1D1F]">Duration</th>
                                        <th className="px-4 py-3 font-semibold text-[#1D1D1F]">Required</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-black/5">
                                    <tr>
                                        <td className="px-4 py-3 text-[#1D1D1F]">Essential</td>
                                        <td className="px-4 py-3 text-[#86868B]">Core website functionality</td>
                                        <td className="px-4 py-3 text-[#86868B]">Session</td>
                                        <td className="px-4 py-3 text-[#34C759] font-medium">Yes</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-[#1D1D1F]">Local Storage</td>
                                        <td className="px-4 py-3 text-[#86868B]">QR history, preferences, dynamic links</td>
                                        <td className="px-4 py-3 text-[#86868B]">Persistent</td>
                                        <td className="px-4 py-3 text-[#FF9500] font-medium">Functional</td>
                                    </tr>
                                    <tr>
                                        <td className="px-4 py-3 text-[#1D1D1F]">Analytics</td>
                                        <td className="px-4 py-3 text-[#86868B]">Anonymous usage statistics</td>
                                        <td className="px-4 py-3 text-[#86868B]">Up to 12 months</td>
                                        <td className="px-4 py-3 text-[#86868B] font-medium">No</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="text-[#1D1D1F] leading-relaxed mt-4">
                            <strong>Important:</strong> QRResult does not use advertising cookies, tracking pixels, social media cookies, or any form of cross-site tracking. We do not participate in any advertising networks or data broker programs.
                        </p>
                    </section>

                    {/* Third-Party Cookies */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">4. Third-Party Cookies</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Our hosting provider, Vercel, may set cookies for performance optimization and security purposes. These cookies help deliver our website quickly and securely. You can review <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Vercel&apos;s Privacy Policy</a> for more details on their cookie practices.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We do not embed third-party advertising scripts, social media widgets, or tracking pixels that would place additional cookies on your device.
                        </p>
                    </section>

                    {/* Managing Cookies */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">5. How to Manage Your Cookies</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            You have full control over cookies and Local Storage on your device. Here is how to manage them:
                        </p>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">Browser Settings</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            Most modern browsers allow you to block, delete, or manage cookies through their settings. Here are direct links to cookie management guides for popular browsers:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Google Chrome</a> - Manage cookies in Chrome</li>
                            <li><a href="https://support.mozilla.org/en-US/kb/enhanced-tracking-protection-firefox-desktop" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Mozilla Firefox</a> - Enhanced tracking protection</li>
                            <li><a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Apple Safari</a> - Manage cookies in Safari</li>
                            <li><a href="https://support.microsoft.com/en-us/microsoft-edge/manage-cookies-in-microsoft-edge-view-allow-block-delete-and-use-168dab11-0753-043d-7c16-ede5947fc64d" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">Microsoft Edge</a> - Cookie management in Edge</li>
                        </ul>

                        <h3 className="text-lg font-medium text-[#1D1D1F] mt-6">Clearing Local Storage</h3>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            To clear QRResult&apos;s Local Storage data, open your browser&apos;s developer tools (usually by pressing F12), navigate to the Application or Storage tab, and clear the Local Storage for qrresult.com. Please note that clearing Local Storage will remove your saved QR code history and dynamic link settings.
                        </p>
                    </section>

                    {/* Impact of Disabling */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">6. What Happens If You Disable Cookies?</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            QRResult is designed to work with minimal cookie dependency. If you disable cookies:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Static QR code generation</strong> will continue to work normally since it runs entirely in your browser</li>
                            <li><strong>Your QR code history</strong> may not be saved between sessions</li>
                            <li><strong>Dynamic QR code settings</strong> stored in Local Storage may not persist</li>
                            <li><strong>Some website features</strong> may not function as expected</li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We have designed our tool so that the core QR code generation feature works even with cookies completely disabled. Your ability to create and download QR codes will not be affected.
                        </p>
                    </section>

                    {/* Legal Basis */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">7. Legal Basis for Cookies</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We use essential cookies based on our legitimate interest in providing a functional website. For analytics cookies, we rely on your consent. You can withdraw consent at any time by clearing your cookies or adjusting your browser settings.
                        </p>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            This policy is aligned with the <a href="https://commission.europa.eu/law/law-topic/data-protection_en" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">EU General Data Protection Regulation (GDPR)</a> and the <a href="https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">UK Privacy and Electronic Communications Regulations (PECR)</a>. For users in California, we also respect the <a href="https://oag.ca.gov/privacy/ccpa" target="_blank" rel="noopener noreferrer" className="text-[#007AFF] hover:underline">California Consumer Privacy Act (CCPA)</a>.
                        </p>
                    </section>

                    {/* Changes */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">8. Changes to This Cookie Policy</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We may update this Cookie Policy from time to time. When we make changes, we will revise the &quot;Last Updated&quot; date at the top of this page. We encourage you to review this policy periodically to stay informed about how we use cookies.
                        </p>
                    </section>

                    {/* Contact */}
                    <section className="space-y-4">
                        <h2 className="text-xl font-semibold text-[#1D1D1F]">9. Contact Us</h2>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            If you have any questions about this Cookie Policy or how we handle your data, please reach out:
                        </p>
                        <ul className="list-disc pl-5 space-y-2 text-[#1D1D1F]">
                            <li><strong>Email:</strong> <a href="mailto:support@qrresult.com" className="text-[#007AFF] hover:underline">support@qrresult.com</a></li>
                            <li><strong>Privacy Policy:</strong> <Link href="/privacy" className="text-[#007AFF] hover:underline">qrresult.com/privacy</Link></li>
                            <li><strong>Contact Page:</strong> <Link href="/contact" className="text-[#007AFF] hover:underline">qrresult.com/contact</Link></li>
                        </ul>
                        <p className="text-[#1D1D1F] leading-relaxed">
                            We are committed to being transparent about our cookie practices. Thank you for trusting QRResult with your QR code needs.
                        </p>
                    </section>
                </article>
            </div>

            <Footer />
        </main>
    );
}
