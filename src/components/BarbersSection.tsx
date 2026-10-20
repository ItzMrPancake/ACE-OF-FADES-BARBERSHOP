import React from 'react';
import { Scissors, Award, Calendar } from 'lucide-react';
import { BARBERS } from '../data/barbershopData';

interface BarbersSectionProps {
  onSelectBarberToBook: (barberId: string) => void;
}

export const BarbersSection: React.FC<BarbersSectionProps> = ({ onSelectBarberToBook }) => {
  return (
    <section id="barbers" className="py-12 sm:py-16 lg:py-20 bg-neutral-950 border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs sm:text-sm font-semibold tracking-wider uppercase text-amber-400 mb-2">
              Master Craftsmen
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white uppercase font-display [text-wrap:balance]">
              Meet The Barbers
            </h2>
            <p className="mt-2 text-sm sm:text-base text-neutral-400 max-w-xl">
              Our barbers aren't just stylists—they are dedicated tradesmen trained in traditional straight-razor craft, precision scissor geometry, and modern gradient fades.
            </p>
          </div>

          <div className="text-xs text-neutral-400">
            Select a barber for tailored appointment scheduling
          </div>
        </div>

        {/* Barbers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BARBERS.map((barber) => (
            <div
              key={barber.id}
              className="flex flex-col justify-between rounded-2xl bg-neutral-900 border border-neutral-800 overflow-hidden hover:border-neutral-700 transition-colors group"
            >
              <div>
                {/* Barber Portrait */}
                <div className="relative aspect-[4/3] overflow-hidden bg-neutral-950">
                  <img
                    src={barber.image}
                    alt={`${barber.name} - ${barber.title}`}
                    className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                  
                  {/* Experience Marker (Clean unboxed inline) */}
                  <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-xs">
                    <span className="bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-amber-400 font-semibold tabular-nums">
                      {barber.experienceYears} Years Experience
                    </span>
                    <span className="bg-neutral-950/80 backdrop-blur-md px-2.5 py-1 rounded-md text-neutral-300">
                      {barber.nextAvailable}
                    </span>
                  </div>
                </div>

                {/* Barber Details */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-white font-display uppercase tracking-tight group-hover:text-amber-400 transition-colors">
                      {barber.name}
                    </h3>
                    <div className="text-xs text-amber-400 font-medium mt-0.5">
                      {barber.title}
                    </div>
                  </div>

                  <p className="text-xs text-neutral-300 leading-relaxed">
                    {barber.bio}
                  </p>

                  <div className="pt-2 text-xs text-neutral-400 flex items-center gap-1.5">
                    <Scissors className="w-3.5 h-3.5 text-neutral-500 shrink-0" />
                    <span>Specialty: <strong className="text-neutral-200">{barber.specialty}</strong></span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="p-5 pt-0">
                <button
                  onClick={() => onSelectBarberToBook(barber.id)}
                  className="w-full py-2.5 px-4 bg-neutral-800 hover:bg-amber-400 text-neutral-200 hover:text-neutral-950 font-semibold text-xs sm:text-sm rounded-xl transition-all duration-150 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book with {barber.name.split(' ')[0]}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
