import React, { useState } from 'react';
import { Menu, X, Calendar, Phone } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';

interface HeaderProps {
  onOpenBooking: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooking }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 lg:px-8 h-16">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg sm:text-xl font-bold tracking-tight text-white uppercase font-display whitespace-nowrap shrink-0 hover:text-amber-400 transition-colors"
        >
          Ace of Fades
        </a>

        {/* Zone 2: 4-5 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300">
          <a href="#services" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Services
          </a>
          <a href="#satisfaction" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Reviews
          </a>
          <a href="#barbers" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Barbers
          </a>
          <a href="#hours-location" className="hover:text-amber-400 transition-colors whitespace-nowrap shrink-0">
            Hours & Location
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={`tel:${SHOP_INFO.phoneRaw}`}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs text-neutral-400 hover:text-white px-3 py-2 transition-colors whitespace-nowrap"
            title="Call Ace of Fades"
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>{SHOP_INFO.phone}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2 text-xs sm:text-sm font-semibold text-neutral-950 bg-amber-400 hover:bg-amber-300 active:scale-95 rounded-lg transition-all duration-150 whitespace-nowrap shrink-0 shadow-sm shadow-amber-500/20 flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-neutral-950" />
            <span>Book an Appointment</span>
          </button>

          {/* Mobile hamburger menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-neutral-400 hover:text-white rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation drawer dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-neutral-800 bg-neutral-950 px-4 pt-3 pb-6 space-y-3">
          <div className="flex flex-col space-y-2 text-sm font-medium text-neutral-300">
            <a
              href="#services"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-amber-400 transition-colors"
            >
              Services & Pricing
            </a>
            <a
              href="#satisfaction"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-amber-400 transition-colors"
            >
              4.8-Star Customer Reviews
            </a>
            <a
              href="#barbers"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-amber-400 transition-colors"
            >
              Meet the Barbers
            </a>
            <a
              href="#hours-location"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 px-3 rounded-md hover:bg-neutral-900 hover:text-amber-400 transition-colors"
            >
              Hours & 1512 Harrison St
            </a>
          </div>

          <div className="pt-2 border-t border-neutral-800/80 flex flex-col gap-2">
            <a
              href={`tel:${SHOP_INFO.phoneRaw}`}
              className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-neutral-900 text-sm text-neutral-200 border border-neutral-800 hover:border-neutral-700"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>Call (940) 767-3233</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-2.5 px-4 rounded-lg bg-amber-400 text-neutral-950 font-semibold text-sm hover:bg-amber-300 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment Now</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
