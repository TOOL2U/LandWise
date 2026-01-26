'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import Button from '@/components/ui/Button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Logo - Responsive sizing */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-forest rounded-md flex items-center justify-center">
              <div className="w-5 h-5 sm:w-6 sm:h-6 border-2 border-sand rounded-sm transform rotate-45"></div>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-forest tracking-tight">LANDWISE</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            <Link href="#packages" className="text-sm lg:text-base text-charcoal hover:text-forest transition-colors font-medium">
              Packages
            </Link>
            <Link href="#deliverables" className="text-sm lg:text-base text-charcoal hover:text-forest transition-colors font-medium">
              Deliverables
            </Link>
            <Link href="#contact" className="text-sm lg:text-base text-charcoal hover:text-forest transition-colors font-medium">
              Contact
            </Link>
            <Button variant="primary" size="md" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-forest hover:bg-forest/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation - Smooth, clean dropdown */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 flex flex-col gap-3 border-t border-sand/30 pt-4">
            <Link 
              href="#packages" 
              className="text-base text-charcoal hover:text-forest transition-colors font-medium py-3 px-2 hover:bg-sand/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Packages
            </Link>
            <Link 
              href="#deliverables" 
              className="text-base text-charcoal hover:text-forest transition-colors font-medium py-3 px-2 hover:bg-sand/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Deliverables
            </Link>
            <Link 
              href="#contact" 
              className="text-base text-charcoal hover:text-forest transition-colors font-medium py-3 px-2 hover:bg-sand/20 rounded-lg"
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </Link>
            <Button 
              variant="primary" 
              size="md" 
              className="w-full mt-2"
              onClick={() => {
                setIsMenuOpen(false);
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Get a Quote
            </Button>
          </div>
        )}
      </nav>
    </header>
  );
}
