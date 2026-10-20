/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
import { SatisfactionSection } from './components/SatisfactionSection';
import { BarbersSection } from './components/BarbersSection';
import { HoursLocationSection } from './components/HoursLocationSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { MobileStickyBar } from './components/MobileStickyBar';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedBarberId, setSelectedBarberId] = useState<string | null>(null);

  const handleOpenBooking = (serviceId?: string, barberId?: string) => {
    setSelectedServiceId(serviceId || null);
    setSelectedBarberId(barberId || null);
    setIsBookingOpen(true);
  };

  const handleCloseBooking = () => {
    setIsBookingOpen(false);
    setSelectedServiceId(null);
    setSelectedBarberId(null);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100 flex flex-col font-sans selection:bg-amber-400 selection:text-neutral-950">
      {/* Top Bar Header */}
      <Header onOpenBooking={() => handleOpenBooking()} />

      {/* Main Page Content */}
      <main className="flex-1">
        {/* Bold Hero with Wichita Falls branding & CTA */}
        <Hero onOpenBooking={() => handleOpenBooking()} />

        {/* Services Section featuring Fades, Beard Trims, Hot Towel Shaves */}
        <ServicesSection onSelectServiceToBook={(serviceId) => handleOpenBooking(serviceId)} />

        {/* 4.8-Star Customer Satisfaction Section */}
        <SatisfactionSection />

        {/* Meet the Barbers */}
        <BarbersSection onSelectBarberToBook={(barberId) => handleOpenBooking(undefined, barberId)} />

        {/* Business Hours & 1512 Harrison St Location */}
        <HoursLocationSection onOpenBooking={() => handleOpenBooking()} />
      </main>

      {/* Quiet Footer with Hours & Address */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Mobile-Optimized Bottom Sticky Thumb Bar */}
      <MobileStickyBar onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Appointment Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={handleCloseBooking}
        preselectedServiceId={selectedServiceId}
        preselectedBarberId={selectedBarberId}
      />
    </div>
  );
}
