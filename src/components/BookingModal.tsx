import React, { useState, useEffect } from 'react';
import { X, Calendar, Clock, User, Scissors, Check, ArrowRight, ArrowLeft, ShieldCheck, Phone, MapPin, CheckCircle2 } from 'lucide-react';
import { BARBERS, SERVICES, SHOP_INFO } from '../data/barbershopData';
import { Barber, ConfirmedBooking, ServiceItem } from '../types/barbershop';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string | null;
  preselectedBarberId?: string | null;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedBarberId,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form states
  const [selectedServiceId, setSelectedServiceId] = useState<string>(preselectedServiceId || SERVICES[0].id);
  const [selectedBarberId, setSelectedBarberId] = useState<string>(preselectedBarberId || 'any');
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('02:00 PM');
  const [fullName, setFullName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<ConfirmedBooking | null>(null);

  // Available dates (Next 6 days)
  const availableDates = React.useMemo(() => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      const isToday = i === 0;
      const isTomorrow = i === 1;
      const label = isToday
        ? 'Today'
        : isTomorrow
        ? 'Tomorrow'
        : d.toLocaleDateString('en-US', { weekday: 'short' });
      const fullDateStr = d.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric',
      });
      dates.push({
        label,
        dayNum: d.getDate(),
        fullDateStr,
        isoDate: d.toISOString().split('T')[0],
      });
    }
    return dates;
  }, []);

  useEffect(() => {
    if (availableDates.length > 0 && !selectedDate) {
      setSelectedDate(availableDates[0].fullDateStr);
    }
  }, [availableDates, selectedDate]);

  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedBarberId) {
      setSelectedBarberId(preselectedBarberId);
    }
  }, [preselectedBarberId]);

  // Reset or close
  if (!isOpen) return null;

  const selectedService = SERVICES.find((s) => s.id === selectedServiceId) || SERVICES[0];
  const selectedBarber = BARBERS.find((b) => b.id === selectedBarberId) || {
    id: 'any',
    name: 'First Available Master Barber',
    title: 'Ace of Fades Certified',
    experienceYears: 10,
    specialty: 'All Services',
    image: SHOP_INFO.heroImage,
    bio: '',
    status: 'available' as const,
    nextAvailable: 'Earliest Chair',
  };

  const timeSlots = [
    '09:30 AM',
    '10:15 AM',
    '11:00 AM',
    '11:45 AM',
    '01:00 PM',
    '01:45 PM',
    '02:30 PM',
    '03:15 PM',
    '04:00 PM',
    '04:45 PM',
    '05:30 PM',
    '06:15 PM',
  ];

  const handleCompleteBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim()) return;

    const newBooking: ConfirmedBooking = {
      bookingId: `AOF-${Math.floor(100000 + Math.random() * 900000)}`,
      service: selectedService,
      barber: selectedBarber as Barber,
      date: selectedDate,
      timeSlot: selectedTime,
      fullName: fullName.trim(),
      phone: phone.trim(),
      totalPrice: selectedService.price,
      createdAt: new Date().toLocaleTimeString(),
    };

    setConfirmedBooking(newBooking);
    setStep(4);
  };

  const handleDownloadCalendar = () => {
    const title = `${selectedService.name} @ Ace of Fades`;
    const details = `Appointment with ${selectedBarber.name} at Ace of Fades Barbershop, 1512 Harrison St, Wichita Falls, TX 76309. Phone: (940) 767-3233`;
    const location = '1512 Harrison St, Wichita Falls, TX 76309';
    
    // Create simple .ics format
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'BEGIN:VEVENT',
      `SUMMARY:${title}`,
      `DESCRIPTION:${details}`,
      `LOCATION:${location}`,
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Ace_of_Fades_Appointment.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden flex flex-col my-auto max-h-[92vh]">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-neutral-950 flex items-center justify-center font-bold font-display">
              A
            </div>
            <div>
              <div className="text-sm font-bold text-white uppercase font-display">
                Ace of Fades Barbershop
              </div>
              <div className="text-[11px] text-neutral-400">
                1512 Harrison St, Wichita Falls, TX
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Multi-step progress indicator */}
        {step < 4 && (
          <div className="px-5 py-3 bg-neutral-950/60 border-b border-neutral-800/80 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 font-medium">
              <span className={`px-2 py-0.5 rounded text-[11px] ${step === 1 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'}`}>
                1. Service
              </span>
              <span className="text-neutral-600">›</span>
              <span className={`px-2 py-0.5 rounded text-[11px] ${step === 2 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'}`}>
                2. Barber & Time
              </span>
              <span className="text-neutral-600">›</span>
              <span className={`px-2 py-0.5 rounded text-[11px] ${step === 3 ? 'bg-amber-400 text-neutral-950 font-bold' : 'text-neutral-400'}`}>
                3. Details
              </span>
            </div>
            <span className="text-amber-400 font-bold tabular-nums">
              ${selectedService.price}
            </span>
          </div>
        )}

        {/* Modal Body */}
        <div className="p-5 overflow-y-auto space-y-5 flex-1">
          
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase font-display">
                  Select Your Service
                </h3>
                <p className="text-xs text-neutral-400">
                  All cuts include straight-razor detailing & styling.
                </p>
              </div>

              <div className="space-y-2.5">
                {SERVICES.map((srv) => {
                  const isSelected = srv.id === selectedServiceId;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'bg-amber-400/10 border-amber-400 text-white'
                          : 'bg-neutral-950/60 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold font-display uppercase truncate">
                            {srv.name}
                          </span>
                        </div>
                        <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">
                          {srv.description}
                        </p>
                        <div className="flex items-center gap-2 mt-1.5 text-xs text-neutral-400">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3 text-amber-400" />
                            <span className="tabular-nums">{srv.durationMinutes} min</span>
                          </span>
                        </div>
                      </div>

                      <div className="text-right shrink-0">
                        <div className="text-base font-bold text-amber-400 tabular-nums font-display">
                          ${srv.price}
                        </div>
                        <div className="mt-1">
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center ml-auto ${
                              isSelected
                                ? 'bg-amber-400 border-amber-400 text-neutral-950'
                                : 'border-neutral-700'
                            }`}
                          >
                            {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-2">
                <button
                  onClick={() => setStep(2)}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue: Select Barber & Time</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Barber, Date & Time */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <h3 className="text-base font-bold text-white uppercase font-display">
                  Choose Barber & Preferred Slot
                </h3>
                <p className="text-xs text-neutral-400">
                  Select your barber or pick the earliest open chair.
                </p>
              </div>

              {/* Barber Selector */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Select Barber
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <div
                    onClick={() => setSelectedBarberId('any')}
                    className={`p-2.5 rounded-xl border cursor-pointer transition-colors text-xs ${
                      selectedBarberId === 'any'
                        ? 'bg-amber-400/10 border-amber-400 text-white font-semibold'
                        : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                    }`}
                  >
                    <div className="font-bold">Any Available</div>
                    <div className="text-[11px] text-amber-400">Fastest appointment</div>
                  </div>

                  {BARBERS.map((barber) => (
                    <div
                      key={barber.id}
                      onClick={() => setSelectedBarberId(barber.id)}
                      className={`p-2.5 rounded-xl border cursor-pointer transition-colors text-xs ${
                        selectedBarberId === barber.id
                          ? 'bg-amber-400/10 border-amber-400 text-white font-semibold'
                          : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                      }`}
                    >
                      <div className="font-bold truncate">{barber.name.split(' ')[0]}</div>
                      <div className="text-[11px] text-neutral-400 truncate">{barber.title}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Date Selector Carousel */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Select Date
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                  {availableDates.map((item) => {
                    const isSelected = selectedDate === item.fullDateStr;
                    return (
                      <button
                        type="button"
                        key={item.isoDate}
                        onClick={() => setSelectedDate(item.fullDateStr)}
                        className={`p-2 rounded-xl border text-center transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 border-amber-400 text-neutral-950 font-bold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        <div className="text-[10px] uppercase font-semibold">{item.label}</div>
                        <div className="text-base font-bold tabular-nums font-display mt-0.5">{item.dayNum}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Time Slots Grid */}
              <div>
                <label className="block text-xs font-semibold text-neutral-300 uppercase tracking-wider mb-2">
                  Available Chair Times ({selectedDate})
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {timeSlots.map((time) => {
                    const isSelected = selectedTime === time;
                    return (
                      <button
                        type="button"
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`py-2 px-2.5 text-xs rounded-lg border font-medium tabular-nums transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-amber-400 border-amber-400 text-neutral-950 font-bold'
                            : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-700'
                        }`}
                      >
                        {time}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step Navigation */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Continue: Customer Details</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Customer Information */}
          {step === 3 && (
            <form onSubmit={handleCompleteBooking} className="space-y-4">
              <div>
                <h3 className="text-base font-bold text-white uppercase font-display">
                  Confirm Booking Information
                </h3>
                <p className="text-xs text-neutral-400">
                  We'll send an instant SMS reminder to your phone.
                </p>
              </div>

              {/* Booking Summary Card */}
              <div className="p-3.5 bg-neutral-950 rounded-xl border border-neutral-800 text-xs space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Service:</span>
                  <span className="font-semibold text-white">{selectedService.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Barber:</span>
                  <span className="font-semibold text-white">{selectedBarber.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">When:</span>
                  <span className="font-semibold text-amber-400">{selectedDate} at {selectedTime}</span>
                </div>
                <div className="flex justify-between pt-1 border-t border-neutral-800/80">
                  <span className="text-neutral-400">Total at Shop:</span>
                  <span className="font-bold text-amber-400 text-sm tabular-nums">${selectedService.price}</span>
                </div>
              </div>

              {/* Form Inputs */}
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Travis Vance"
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Mobile Phone Number (for text reminder) *
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. (940) 555-0199"
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Email Address (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="travis@example.com"
                  className="w-full px-3.5 py-2.5 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Special Notes or Style Requests (optional)
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Mid taper fade, keep length on top, sensitive skin"
                  className="w-full px-3.5 py-2 text-sm bg-neutral-950 border border-neutral-800 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs font-semibold rounded-xl transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-sm rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-500/15"
                >
                  <Check className="w-4 h-4 stroke-[3]" />
                  <span>Confirm Appointment</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 4: Booking Confirmation Screen */}
          {step === 4 && confirmedBooking && (
            <div className="py-2 text-center space-y-5">
              <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-white font-display uppercase tracking-tight">
                  Appointment Confirmed!
                </h3>
                <p className="text-xs text-neutral-300 mt-1">
                  We have locked your chair with {confirmedBooking.barber.name}.
                </p>
                <div className="inline-block mt-2 px-3 py-1 rounded bg-neutral-950 border border-neutral-800 text-xs font-mono text-amber-400">
                  Ref #{confirmedBooking.bookingId}
                </div>
              </div>

              {/* Receipt Details */}
              <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-4 text-left text-xs space-y-2">
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Client:</span>
                  <span className="font-semibold text-white">{confirmedBooking.fullName}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Service:</span>
                  <span className="font-semibold text-white">{confirmedBooking.service.name}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Date & Time:</span>
                  <span className="font-semibold text-amber-400">{confirmedBooking.date} @ {confirmedBooking.timeSlot}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-neutral-800">
                  <span className="text-neutral-400">Location:</span>
                  <span className="font-semibold text-white">1512 Harrison St, Wichita Falls</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-neutral-400">Payment Due:</span>
                  <span className="font-bold text-amber-400 text-sm tabular-nums">${confirmedBooking.totalPrice} (Cash/Card at shop)</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={handleDownloadCalendar}
                  className="w-full py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 cursor-pointer transition-colors"
                >
                  <Calendar className="w-4 h-4 text-amber-400" />
                  <span>Add to Apple / Google Calendar</span>
                </button>

                <a
                  href={SHOP_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 rounded-xl text-xs font-medium flex items-center justify-center gap-2 transition-colors"
                >
                  <MapPin className="w-4 h-4 text-neutral-400" />
                  <span>Get Directions to 1512 Harrison St</span>
                </a>

                <button
                  onClick={onClose}
                  className="w-full py-3 bg-amber-400 hover:bg-amber-300 text-neutral-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
