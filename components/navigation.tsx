'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/products', label: 'Products' },
    { href: '/contact', label: 'Contact' },
  ];

  const isActive = (href: string) => pathname === href;

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="bg-white/90 backdrop-blur-md border-b border-gray-200/50 fixed top-0 left-0 right-0 z-50 shadow-sm">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Centered on mobile */}
          <Link href="/" className="flex items-center md:flex-none">
            <h1 className="text-lg md:text-xl font-semibold text-gray-900 tracking-tight">Leyuwork Pharmacy</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 text-sm font-medium transition-all duration-200 ease-in-out relative ${
                  isActive(link.href)
                    ? 'text-primary-600'
                    : 'text-gray-600 hover:text-primary-600'
                }`}
              >
                {link.label}
                {isActive(link.href) && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1/3 h-0.5 bg-primary-600"></span>
                )}
              </Link>
            ))}
            <Link
              href="/login"
              className="ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-primary-600 border border-gray-300 hover:border-primary-600 rounded transition-all duration-200 ease-in-out"
            >
              Login
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-primary-600 focus:outline-none transition-all duration-200 ease-in-out"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 transition-transform duration-200"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation - Smooth slide animation */}
        <div 
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 border-t border-gray-200">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 text-base font-medium transition-all duration-200 ease-in-out ${
                  isActive(link.href)
                    ? 'text-primary-600 bg-primary-50 border-l-4 border-primary-600'
                    : 'text-gray-600 hover:text-primary-600 hover:bg-primary-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/login"
              onClick={() => setIsOpen(false)}
              className="block px-4 py-3 text-base font-medium text-gray-600 hover:text-primary-600 border border-gray-300 hover:border-primary-600 rounded transition-all duration-200 ease-in-out mt-2 mx-4"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
