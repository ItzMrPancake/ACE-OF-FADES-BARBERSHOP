import React from 'react';
import { Calendar, Phone, MapPin } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';

interface MobileStickyBarProps {
  onOpenBooking: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({ onOpenBooking }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-neutral-950/95 backdrop-blur-md border-t border-neutral-800 px-3 py-2">
      <div className="flex items-center gap-2 max-w-md mx-auto h-12">
        {/* Quick Call */}
        <a
          href={`tel:${SHOP_INFO.phoneRaw}`}
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 active:scale-95 transition-all"
          aria-label="Call barbershop"
        >
          <Phone className="w-5 h-5" />
        </a>

        {/* Primary Thumb Zone Book CTA */}
        <button
          onClick={onOpenBooking}
          className="flex-1 h-[44px] bg-amber-400 active:scale-[0.98] hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-amber-500/15 cursor-pointer whitespace-nowrap"
        >
          <Calendar className="w-4 h-4 text-neutral-950" />
          <span>Book an Appointment</span>
        </button>

        {/* Quick Maps Direction */}
        <a
          href={SHOP_INFO.googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="min-h-[44px] min-w-[44px] flex items-center justify-center rounded-xl bg-neutral-900 border border-neutral-800 text-neutral-300 hover:text-amber-400 active:scale-95 transition-all"
          aria-label="Directions to 1512 Harrison St"
        >
          <MapPin className="w-5 h-5" />
        </a>
      </div>
    </div>
  );
};
