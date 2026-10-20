import React, { useState } from 'react';
import { MapPin, Clock, Phone, Copy, Check, Navigation, ExternalLink, Calendar } from 'lucide-react';
import { BUSINESS_HOURS, SHOP_INFO } from '../data/barbershopData';

interface HoursLocationSectionProps {
  onOpenBooking: () => void;
}

export const HoursLocationSection: React.FC<HoursLocationSectionProps> = ({ onOpenBooking }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(SHOP_INFO.fullAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // Determine current day for highlight
  const currentDayName = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  return (
    <section id="hours-location" className="py-12 sm:py-16 lg:py-20 bg-neutral-900/40 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl mb-10">
          <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mb-2">
            Visit Ace of Fades
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-display [text-wrap:balance]">
            Business Hours & Wichita Falls Location
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400">
            Conveniently situated at 1512 Harrison St with dedicated free customer parking out front. Walk-ins always accommodated between appointments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Business Hours Table & Status */}
          <div className="lg:col-span-5 bg-neutral-900 border border-neutral-800 rounded-2xl p-6 sm:p-7 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2 text-white font-bold font-display uppercase tracking-wide">
                <Clock className="w-5 h-5 text-amber-400" />
                <span>Weekly Hours</span>
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2.5 py-1 rounded-md">
                Open Today
              </span>
            </div>

            {/* Hours Rows */}
            <div className="space-y-2.5">
              {BUSINESS_HOURS.map((item) => {
                const isToday = item.day.toLowerCase() === currentDayName.toLowerCase();
                return (
                  <div
                    key={item.day}
                    className={`flex items-center justify-between py-2 px-3 rounded-lg text-xs sm:text-sm transition-colors ${
                      isToday
                        ? 'bg-amber-400/10 text-white font-semibold border border-amber-400/30'
                        : 'text-neutral-300 hover:bg-neutral-800/50'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span>{item.day}</span>
                      {isToday && (
                        <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider">
                          Today
                        </span>
                      )}
                    </span>
                    <span className="tabular-nums text-neutral-200">
                      {item.open} – {item.close}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Walk-in notice */}
            <div className="p-3.5 rounded-xl bg-neutral-950/80 border border-neutral-800/80 text-xs text-neutral-300 space-y-1">
              <div className="font-semibold text-white">Walk-in Policy:</div>
              <div className="text-neutral-400 leading-relaxed">
                Walk-ins are welcomed on a first-come queue. For zero wait time, we recommend booking a chair in advance online.
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-all shadow-md shadow-amber-500/15 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4" />
              <span>Reserve Your Time Slot</span>
            </button>
          </div>

          {/* Right Column: Address, Interactive Map Card & Local Landmark Drive Times */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Address Banner Card */}
            <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/20 text-amber-400 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-neutral-400 font-medium uppercase tracking-wider">
                      Shop Address
                    </div>
                    <div className="text-lg sm:text-xl font-bold text-white font-display mt-0.5">
                      1512 Harrison St
                    </div>
                    <div className="text-sm text-neutral-300">
                      Wichita Falls, TX 76309
                    </div>
                  </div>
                </div>

                {/* Quick Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleCopyAddress}
                    className="px-3 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
                    title="Copy full address to clipboard"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>

                  <a
                    href={SHOP_INFO.googleMapsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-neutral-950 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Get Directions</span>
                  </a>
                </div>
              </div>

              {/* Call Bar */}
              <div className="pt-4 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                <span className="text-neutral-400">Have questions about beard grooming or specific cuts?</span>
                <a
                  href={`tel:${SHOP_INFO.phoneRaw}`}
                  className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call (940) 767-3233</span>
                </a>
              </div>
            </div>

            {/* Stylized Dark Map Preview Visual Card */}
            <div className="relative rounded-2xl overflow-hidden border border-neutral-800 bg-neutral-950 aspect-[16/9] sm:aspect-[21/9] flex items-center justify-center group">
              {/* Dark textured map grid canvas styling */}
              <div className="absolute inset-0 bg-[radial-gradient(#262626_1px,transparent_1px)] [background-size:16px_16px] opacity-70" />
              
              {/* Street grid stylized aesthetic lines */}
              <div className="absolute inset-0 opacity-20 pointer-events-none">
                <div className="absolute top-1/2 left-0 right-0 h-1 bg-neutral-400" />
                <div className="absolute top-0 bottom-0 left-1/2 w-1 bg-neutral-400" />
                <div className="absolute top-1/4 left-0 right-0 h-0.5 bg-neutral-600" />
                <div className="absolute top-3/4 left-0 right-0 h-0.5 bg-neutral-600" />
                <div className="absolute top-0 bottom-0 left-1/3 w-0.5 bg-neutral-600" />
                <div className="absolute top-0 bottom-0 left-2/3 w-0.5 bg-neutral-600" />
              </div>

              {/* Map Center Pin Callout */}
              <div className="relative z-10 flex flex-col items-center text-center p-4">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <MapPin className="w-6 h-6 fill-neutral-950" />
                  </div>
                  <div className="w-12 h-12 rounded-full bg-amber-400/20 absolute inset-0 animate-ping pointer-events-none" />
                </div>
                
                <div className="mt-3 px-4 py-2 bg-neutral-900/95 backdrop-blur-md border border-neutral-700 rounded-xl shadow-xl">
                  <div className="text-sm font-bold text-white font-display uppercase tracking-wide">
                    Ace of Fades Barbershop
                  </div>
                  <div className="text-xs text-neutral-300">
                    1512 Harrison St, Wichita Falls
                  </div>
                </div>

                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold underline underline-offset-4"
                >
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Travel Times from Local Wichita Falls Hubs */}
            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-center">
                <div className="text-xs text-neutral-400">From Downtown WF</div>
                <div className="text-base sm:text-lg font-bold text-white font-display tabular-nums mt-0.5">
                  ~3 mins
                </div>
                <div className="text-[11px] text-amber-400">1.2 miles</div>
              </div>

              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-center">
                <div className="text-xs text-neutral-400">From MSU Texas</div>
                <div className="text-base sm:text-lg font-bold text-white font-display tabular-nums mt-0.5">
                  ~6 mins
                </div>
                <div className="text-[11px] text-amber-400">2.8 miles</div>
              </div>

              <div className="p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-center">
                <div className="text-xs text-neutral-400">Sheppard AFB</div>
                <div className="text-base sm:text-lg font-bold text-white font-display tabular-nums mt-0.5">
                  ~12 mins
                </div>
                <div className="text-[11px] text-amber-400">5.5 miles</div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
