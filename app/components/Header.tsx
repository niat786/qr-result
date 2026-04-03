"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Info, Mail, Shield } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
    title: string;
    subtitle?: string;
    badge?: string;
    badgeColor?: string;
    icon?: React.ReactNode;
    iconGradient?: string;
    mobileMenu?: React.ReactNode | ((close: () => void) => React.ReactNode);
}

const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
    { href: '/privacy', label: 'Privacy' },
];

export function Header({
    title,
    badge,
    badgeColor = "text-[#007AFF] bg-[#007AFF]/10",
    icon,
    iconGradient = "from-[#007AFF] to-[#0055B3]",
    mobileMenu
}: HeaderProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const pathname = usePathname();

    // Close menu on route change
    useEffect(() => {
        setIsMenuOpen(false);
    }, [pathname]);

    const closeMenu = () => setIsMenuOpen(false);

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isMenuOpen]);

    return (
        <>
            <header className="bg-white/90 backdrop-blur-xl sticky top-0 z-50 h-16 flex items-center px-4 md:px-6 border-b border-black/5 shadow-sm transition-all">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Logo/Icon */}
                    {icon ? (
                        <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${iconGradient} flex items-center justify-center font-bold text-white text-lg shadow-sm shrink-0`}>
                            {icon}
                        </div>
                    ) : (
                        <Link href="/" className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 overflow-hidden hover:opacity-90 transition-opacity" aria-label="QRResult home">
                            <Image src="/qr-result-site-logo.webp" alt="QRResult — Free QR Code Generator" className="object-contain" width={36} height={36} priority />
                        </Link>
                    )}

                    {/* Title */}
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Link href="/" className="text-lg md:text-xl font-semibold tracking-tight text-[#1D1D1F] truncate hover:text-[#007AFF] transition-colors">
                            {title}
                        </Link>
                        {badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shrink-0 ${badgeColor}`}>
                                {badge}
                            </span>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                pathname === link.href
                                    ? 'text-[#007AFF] bg-[#007AFF]/10'
                                    : 'text-[#6E6E73] hover:text-[#1D1D1F] hover:bg-black/5'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>

                {/* Mobile Menu Toggle */}
                {mobileMenu && (
                    <div className="md:hidden ml-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[#1D1D1F] hover:bg-black/5 rounded-lg transition-colors relative z-50"
                            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
                            aria-expanded={isMenuOpen}
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                )}
            </header>

            {/* Mobile Menu Overlay with Slide Animation */}
            {mobileMenu && (
                <>
                    {/* Backdrop */}
                    <div
                        className={`fixed inset-0 top-16 z-40 bg-black/20 backdrop-blur-sm md:hidden transition-opacity duration-300 ${
                            isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
                        }`}
                        onClick={closeMenu}
                    />

                    {/* Slide-in Menu */}
                    <div
                        className={`fixed top-16 left-0 bottom-0 z-50 w-80 max-w-[85vw] bg-white border-r border-black/5 shadow-2xl md:hidden transform transition-transform duration-300 ease-out ${
                            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                    >
                        <div className="h-full overflow-y-auto scrollbar-clean">
                            <div className="p-4">
                                {/* Page Links */}
                                <div className="mb-6 pb-6 border-b border-black/5">
                                    <p className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider px-4 mb-2">Pages</p>
                                    <div className="flex flex-col gap-1">
                                        <Link
                                            href="/"
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                pathname === '/'
                                                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                                                    : 'text-[#1D1D1F] hover:bg-black/5'
                                            }`}
                                        >
                                            <Home size={18} aria-hidden="true" />
                                            Generator
                                        </Link>
                                        <Link
                                            href="/about"
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                pathname === '/about'
                                                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                                                    : 'text-[#1D1D1F] hover:bg-black/5'
                                            }`}
                                        >
                                            <Info size={18} aria-hidden="true" />
                                            About Us
                                        </Link>
                                        <Link
                                            href="/contact"
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                pathname === '/contact'
                                                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                                                    : 'text-[#1D1D1F] hover:bg-black/5'
                                            }`}
                                        >
                                            <Mail size={18} aria-hidden="true" />
                                            Contact
                                        </Link>
                                        <Link
                                            href="/privacy"
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                pathname === '/privacy'
                                                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                                                    : 'text-[#1D1D1F] hover:bg-black/5'
                                            }`}
                                        >
                                            <Shield size={18} aria-hidden="true" />
                                            Privacy
                                        </Link>
                                    </div>
                                </div>

                                {/* Categories (if sidebar provided) */}
                                {mobileMenu && (
                                    <div>
                                        <p className="text-[11px] font-semibold text-[#6E6E73] uppercase tracking-wider px-4 mb-2">QR Categories</p>
                                        <div className="px-2">
                                            {typeof mobileMenu === 'function' ? mobileMenu(closeMenu) : mobileMenu}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
