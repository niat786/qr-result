'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <nav className="px-6 mx-auto lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl font-['Pacifico'] text-blue-600">logo</span>
          </Link>

          <div className="items-center hidden space-x-8 md:flex">
            <Link href="/" className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600">
              Home
            </Link>
            <Link href="/posts" className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600">
              Blog
            </Link>
            <Link href="/about" className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600">
              Contact
            </Link>
          </div>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex items-center justify-center w-6 h-6 cursor-pointer md:hidden"
          >
            <i className="text-xl ri-menu-line"></i>
          </button>
        </div>

        {isMenuOpen && (
          <div className="py-4 border-t border-gray-200 md:hidden">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/posts" 
                className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link 
                href="/about" 
                className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-gray-700 transition-colors cursor-pointer hover:text-blue-600"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}