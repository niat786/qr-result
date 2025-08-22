'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <span className="text-2xl font-['Pacifico'] text-blue-400">logo</span>
            </Link>
            <p className="text-gray-300 mb-4 max-w-md">
              Discover amazing content, insights, and stories that inspire and inform. Join our community of readers and writers.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-twitter-x-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a href="#" className="w-10 h-10 flex items-center justify-center bg-gray-800 rounded-full hover:bg-blue-600 transition-colors cursor-pointer">
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/posts" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Technology
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Business
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Lifestyle
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors cursor-pointer">
                  Travel
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2024 Your Blog. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors cursor-pointer">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors cursor-pointer">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}