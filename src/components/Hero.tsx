import React from 'react';
import { Calendar, MapPin, Star, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { SHOP_INFO } from '../data/barbershopData';

interface HeroProps {
  onOpenBooking: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking }) => {
  return (
    <section className="relative overflow-hidden bg-neutral-950 pt-6 pb-12 sm:pt-10 sm:pb-16 lg:pb-20 border-b border-neutral-800">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-96 bg-amber-500/5 blur-3xl pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Bold Copy & Primary Actions */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-6">
            
            {/* Clean Unboxed Metadata Kicker (Anti-slop zero pill) */}
            <div className="flex items-center flex-wrap gap-2 text-xs sm:text-sm font-medium text-amber-400/90 tracking-wide">
              <span>Wichita Falls, TX</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>1512 Harrison St</span>
              <span aria-hidden="true" className="text-neutral-600">·</span>
              <span>Est. 2018</span>
            </div>

            {/* Bold Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white uppercase font-display leading-[1.08] [text-wrap:balance]">
              Precision Fades. <br className="hidden sm:inline" />
              <span className="text-neutral-400">Razor-Sharp Detail.</span> <br />
              Wichita Falls Craft.
            </h1>

            {/* Subtitle / Value proposition */}
            <p className="text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              Ace of Fades delivers top-tier skin tapers, architectural beard sculpting, and traditional steamed hot towel straight-razor shaves. Crafted by master barbers with zero compromises.
            </p>

            {/* Call-to-action Button Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-400 hover:bg-amber-300 active:scale-[0.98] text-neutral-950 font-bold text-base rounded-xl transition-all shadow-lg shadow-amber-500/15 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-5 h-5 text-neutral-950" />
                <span>Book an Appointment</span>
              </button>

              <a
                href="#services"
                className="w-full sm:w-auto px-5 py-3.5 bg-neutral-900 hover:bg-neutral-800 text-neutral-200 hover:text-white font-medium text-sm rounded-xl border border-neutral-800 hover:border-neutral-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>View All Services & Rates</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </a>
            </div>

            {/* Social Proof & Trust Strip (Clean unboxed inline metrics) */}
            <div className="pt-4 border-t border-neutral-900 grid grid-cols-3 gap-4 text-neutral-300">
              <div>
                <div className="flex items-center gap-1.5 text-amber-400 font-bold text-lg sm:text-xl tabular-nums">
                  <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  <span>4.8</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">101 local reviews</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-white font-bold text-lg sm:text-xl">
                  <Clock className="w-4 h-4 text-neutral-400" />
                  <span>Open Daily</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Mon–Sun walk-ins</div>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-white font-bold text-lg sm:text-xl">
                  <ShieldCheck className="w-4 h-4 text-neutral-400" />
                  <span>Master</span>
                </div>
                <div className="text-xs text-neutral-400 mt-0.5">Licensed & sterile</div>
              </div>
            </div>

          </div>

          {/* Right Column: High-Impact Focal Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-900 shadow-2xl group">
              <img
                src={SHOP_INFO.heroImage}
                alt="Ace of Fades Barbershop modern dark interior at 1512 Harrison St Wichita Falls"
                className="w-full aspect-[4/3] lg:aspect-square object-cover transition-transform duration-700 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80" />

              {/* Bottom Card Kicker */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-neutral-950/85 backdrop-blur-md border border-neutral-800/80">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-amber-400 font-medium">Ace of Fades Barbershop</div>
                    <div className="text-sm font-semibold text-white flex items-center gap-1.5 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">1512 Harrison St, Wichita Falls</span>
                    </div>
                  </div>
                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 text-xs font-medium text-white bg-neutral-800 hover:bg-neutral-700 rounded-lg transition-colors shrink-0"
                  >
                    Directions
                  </a>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
