import React from 'react';
import { MapPin, Phone, Clock, ArrowUp } from 'lucide-react';
import { BUSINESS_HOURS, SHOP_INFO } from '../data/barbershopData';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-neutral-400 border-t border-neutral-800 pt-12 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-neutral-800/80">
          
          {/* Brand & Overview */}
          <div className="space-y-3">
            <div className="text-xl font-bold text-white uppercase font-display tracking-tight">
              Ace of Fades Barbershop
            </div>
            <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
              Wichita Falls' destination for precision fades, beard sculpting, and hot towel straight-razor shaves. Crafted by master tradesmen.
            </p>
            <div className="pt-2 text-xs text-neutral-500">
              Licensed Texas Barbershop · Est. 2018
            </div>
          </div>

          {/* Location & Contact */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Address & Contact
            </div>
            <div className="space-y-2 text-xs sm:text-sm">
              <a
                href={SHOP_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-neutral-300 hover:text-amber-400 transition-colors"
              >
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  1512 Harrison St<br />
                  Wichita Falls, TX 76309
                </span>
              </a>

              <a
                href={`tel:${SHOP_INFO.phoneRaw}`}
                className="flex items-center gap-2 text-neutral-300 hover:text-amber-400 transition-colors pt-1"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <span>(940) 767-3233</span>
              </a>
            </div>
          </div>

          {/* Business Hours Summary */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Shop Hours
            </div>
            <div className="space-y-1 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>Mon:</span>
                <span className="tabular-nums">9:00 AM – 6:00 PM</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Tue – Fri:</span>
                <span className="tabular-nums">9:00 AM – 7:00 PM</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Saturday:</span>
                <span className="tabular-nums">8:00 AM – 5:00 PM</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>Sunday:</span>
                <span className="tabular-nums">10:00 AM – 4:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Actions & Navigation */}
          <div className="space-y-3">
            <div className="text-xs font-bold text-white uppercase tracking-wider font-display">
              Appointments
            </div>
            <p className="text-xs text-neutral-400">
              Walk-ins welcome daily. For guaranteed zero wait time, schedule your appointment online.
            </p>
            <button
              onClick={onOpenBooking}
              className="w-full py-2.5 px-4 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs rounded-lg transition-colors cursor-pointer"
            >
              Book an Appointment
            </button>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © {new Date().getFullYear()} Ace of Fades Barbershop. 1512 Harrison St, Wichita Falls, TX. All rights reserved.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 hover:text-white transition-colors cursor-pointer"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
