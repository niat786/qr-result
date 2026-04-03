"use client";

import React from 'react';
import { Github, Twitter, Mail, Heart, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { BackToTop } from './BackToTop';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <>
        <BackToTop />
        <footer className="mt-20 border-t border-black/5 bg-[#F5F5F7]/50">
            <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    {/* Brand Section */}
                    <div className="col-span-1 md:col-span-2">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#007AFF] to-[#0055B3] flex items-center justify-center font-bold text-white text-sm shadow-sm">
                                Q
                            </div>
                            <span className="text-lg font-semibold text-[#1D1D1F]">QRResult</span>
                        </div>
                        <p className="text-sm text-[#6E6E73] mb-4 max-w-md">
                            Create beautiful, customizable QR codes instantly. Generate static and dynamic codes with advanced analytics and professional design tools.
                        </p>
                        <div className="flex items-center gap-4">
                            <a
                                href="https://github.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5 rounded-lg transition-colors"
                                aria-label="GitHub"
                            >
                                <Github size={18} />
                            </a>
                            <a
                                href="https://twitter.com"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5 rounded-lg transition-colors"
                                aria-label="Twitter"
                            >
                                <Twitter size={18} />
                            </a>
                            <a
                                href="mailto:support@qrresult.com"
                                className="p-2 text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5 rounded-lg transition-colors"
                                aria-label="Email"
                            >
                                <Mail size={18} />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#1D1D1F] mb-4 uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors flex items-center gap-1 group">
                                    About
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors flex items-center gap-1 group">
                                    Contact
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                                </Link>
                            </li>
                            <li>
                                <a
                                    href="https://github.com/niat786/qr-result-new"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors flex items-center gap-1 group"
                                >
                                    GitHub
                                    <ExternalLink size={12} className="opacity-0 group-hover:opacity-50 transition-opacity" />
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Legal */}
                    <div>
                        <h3 className="text-sm font-semibold text-[#1D1D1F] mb-4 uppercase tracking-wider">Legal</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors">
                                    Privacy Policy
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors">
                                    Terms of Service
                                </Link>
                            </li>
                            <li>
                                <Link href="/cookies" className="text-sm text-[#6E6E73] hover:text-[#007AFF] transition-colors">
                                    Cookie Policy
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-8 border-t border-black/5">
                    <div className="flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-left">
                        <div className="text-xs text-[#6E6E73] space-y-1">
                            <p>&copy; {currentYear} <span className="font-semibold text-[#1D1D1F]">QRResult</span></p>
                            <p>
                                A product of <span className="font-medium text-[#1D1D1F]">WebWise LLC</span>
                            </p>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs text-[#6E6E73]">
                            <span>Made with</span>
                            <Heart size={12} className="text-[#FF3B30] fill-[#FF3B30]" />
                            <span>by</span>
                            <a
                                href="https://github.com/niat786"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-medium text-[#1D1D1F] hover:text-[#007AFF] transition-colors"
                            >
                                niat786
                            </a>
                            <span className="mx-1.5 text-[#6E6E73]/40">|</span>
                            <span>Free & Open Source</span>
                            <span className="mx-1.5 text-[#6E6E73]/40">|</span>
                            <span>v1.0.0</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    );
}
