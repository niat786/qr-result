"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Home, Sparkles } from 'lucide-react';
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

    // Close menu function
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
                        <h1 className="text-lg md:text-xl font-semibold tracking-tight text-[#1D1D1F] truncate">
                            {title}
                        </h1>
                        {badge && (
                            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full tracking-wider uppercase shrink-0 ${badgeColor}`}>
                                {badge}
                            </span>
                        )}
                    </div>
                </div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-1">
                    <Link
                        href="/"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            pathname === '/' 
                                ? 'text-[#007AFF] bg-[#007AFF]/10' 
                                : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5'
                        }`}
                    >
                        Generator
                    </Link>
                    {/* Dynamic – commented for now
                    <Link
                        href="/dynamic"
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            pathname === '/dynamic' 
                                ? 'text-[#FF9500] bg-[#FF9500]/10' 
                                : 'text-[#86868B] hover:text-[#1D1D1F] hover:bg-black/5'
                        }`}
                    >
                        Dynamic
                    </Link>
                    */}
                </div>

                {/* Mobile Menu Toggle */}
                {mobileMenu && (
                    <div className="md:hidden ml-2">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="p-2 text-[#1D1D1F] hover:bg-black/5 rounded-lg transition-colors relative z-50"
                            aria-label="Toggle menu"
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
                                {/* Quick Links */}
                                <div className="mb-6 pb-6 border-b border-black/5">
                                    <div className="flex flex-col gap-2">
                                        <Link
                                            href="/"
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                pathname === '/'
                                                    ? 'bg-[#007AFF]/10 text-[#007AFF]'
                                                    : 'text-[#1D1D1F] hover:bg-black/5'
                                            }`}
                                        >
                                            <Home size={18} />
                                            Static Generator
                                        </Link>
                                        {/* Dynamic – commented for now
                                        <Link
                                            href="/dynamic"
                                            onClick={closeMenu}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                                                pathname === '/dynamic'
                                                    ? 'bg-[#FF9500]/10 text-[#FF9500]'
                                                    : 'text-[#1D1D1F] hover:bg-black/5'
                                            }`}
                                        >
                                            <Sparkles size={18} />
                                            Dynamic Manager
                                        </Link>
                                        */}
                                    </div>
                                </div>

                                {/* Menu Content */}
                                <div className="px-2">
                                    {typeof mobileMenu === 'function' ? mobileMenu(closeMenu) : mobileMenu}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    );
}
