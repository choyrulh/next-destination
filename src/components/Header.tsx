'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2"
          >
            <span className={`text-2xl font-bold ${
              isScrolled ? 'text-emerald-600' : 'text-white'
            }`}>
              TravelID
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/destinasi" 
              className={`transition-colors duration-200 hover:text-emerald-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Destinasi
            </Link>
            <Link 
              href="/categories" 
              className={`transition-colors duration-200 hover:text-emerald-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Kategori
            </Link>
            <Link 
              href="/search" 
              className={`transition-colors duration-200 hover:text-emerald-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Search
            </Link>
            <Link 
              href="/wishlist" 
              className={`transition-colors duration-200 hover:text-emerald-500 ${
                isScrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              Wishlist
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg
              className={`w-6 h-6 ${isScrolled ? 'text-gray-700' : 'text-white'}`}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white rounded-b-lg shadow-lg">
            <Link
              href="/destinations"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-500 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Destinasi
            </Link>
            <Link
              href="/categories"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-500 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Kategori
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-500 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Tentang
            </Link>
            <Link
              href="/wishlist"
              className="block px-3 py-2 rounded-md text-gray-700 hover:text-emerald-500 hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wishlist
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}