import React, { useState } from 'react';
import { Clock, Check, Scissors, Sparkles, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data/barbershopData';
import { ServiceItem } from '../types/barbershop';

interface ServicesSectionProps {
  onSelectServiceToBook: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectServiceToBook }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'fades' | 'beard' | 'shave' | 'combo'>('all');

  const filteredServices = activeCategory === 'all'
    ? SERVICES
    : SERVICES.filter((s) => s.category === activeCategory || (activeCategory === 'fades' && s.id === 'young-gentleman'));

  return (
    <section id="services" className="py-12 sm:py-16 lg:py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-12">
          <div className="max-w-2xl">
            {/* Clean unboxed editorial kicker */}
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mb-2">
              Menu & Master Services
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-display [text-wrap:balance]">
              Precision Fades, Beard Craft & Hot Towel Shaves
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400">
              Every appointment includes consultation, razor perimeter detailing, and premium finishing tonic. No rushed cuts, only artisan craftsmanship.
            </p>
          </div>

          {/* Interactive Category Filter Tabs (Segmented control) */}
          <div className="flex items-center gap-1.5 p-1 bg-neutral-900 border border-neutral-800 rounded-xl overflow-x-auto scrollbar-none self-start md:self-auto max-w-full">
            <button
              onClick={() => setActiveCategory('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'all'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              All Services
            </button>
            <button
              onClick={() => setActiveCategory('fades')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'fades'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Fades & Cuts
            </button>
            <button
              onClick={() => setActiveCategory('beard')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'beard'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Beard Trims
            </button>
            <button
              onClick={() => setActiveCategory('shave')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'shave'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Hot Towel Shaves
            </button>
            <button
              onClick={() => setActiveCategory('combo')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                activeCategory === 'combo'
                  ? 'bg-amber-400 text-neutral-950 shadow-sm'
                  : 'text-neutral-400 hover:text-white'
              }`}
            >
              Combos
            </button>
          </div>
        </div>

        {/* Featured Big Three Spotlight: Fades, Beard Trims, Hot Towel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {SERVICES.slice(0, 3).map((service, index) => (
            <div
              key={service.id}
              className="flex flex-col justify-between rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-all duration-200 group"
            >
              {/* Image Banner */}
              <div className="relative aspect-[16/10] overflow-hidden bg-neutral-950">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/40 to-transparent" />
                
                {/* Price & Duration Overlays (Unboxed clean styling) */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white">
                  <div className="text-2xl font-bold font-display tabular-nums text-amber-400">
                    ${service.price}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-neutral-300 bg-neutral-950/70 backdrop-blur-md px-2 py-1 rounded-md">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span className="tabular-nums">{service.durationMinutes} min</span>
                  </div>
                </div>
              </div>

              {/* Body Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase font-display tracking-tight group-hover:text-amber-400 transition-colors">
                    {service.name}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-300 leading-relaxed line-clamp-3">
                    {service.description}
                  </p>

                  {/* Feature list */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-neutral-800/80">
                    {service.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2 text-xs text-neutral-300">
                        <Check className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct Action Button */}
                <div className="pt-2">
                  <button
                    onClick={() => onSelectServiceToBook(service.id)}
                    className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-amber-400 text-neutral-200 hover:text-neutral-950 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer group-hover:bg-amber-400 group-hover:text-neutral-950"
                  >
                    <span>Book {service.name.split(' ')[0]}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Secondary / Full Menu List (Combos, Young Gentleman, Senior) */}
        <div className="bg-neutral-900/60 rounded-2xl border border-neutral-800 p-5 sm:p-6 lg:p-8">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-neutral-800">
            <div className="text-sm sm:text-base font-bold text-white uppercase font-display tracking-wide">
              All Packages & Specialized Haircuts
            </div>
            <div className="text-xs text-neutral-400">
              Walk-ins welcome based on chair availability
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredServices.map((service) => (
              <div
                key={service.id}
                className="flex items-start justify-between gap-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800/80 hover:border-neutral-700 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2">
                    <h4 className="text-sm sm:text-base font-bold text-white font-display uppercase truncate">
                      {service.name}
                    </h4>
                  </div>
                  <p className="mt-1 text-xs text-neutral-400 line-clamp-2">
                    {service.description}
                  </p>
                  <div className="mt-2 flex items-center gap-3 text-xs text-neutral-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span className="tabular-nums">{service.durationMinutes}m</span>
                    </span>
                    <span aria-hidden="true" className="text-neutral-700">·</span>
                    <span className="text-amber-400 font-bold tabular-nums text-sm">
                      ${service.price}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onSelectServiceToBook(service.id)}
                  className="shrink-0 px-3 py-2 bg-neutral-800 hover:bg-amber-400 text-neutral-300 hover:text-neutral-950 font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Book
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
