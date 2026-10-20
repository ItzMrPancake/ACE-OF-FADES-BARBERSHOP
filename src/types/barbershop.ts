export interface ServiceItem {
  id: string;
  name: string;
  category: 'fades' | 'beard' | 'shave' | 'combo' | 'specialty';
  price: number;
  durationMinutes: number;
  description: string;
  features: string[];
  image: string;
  popular?: boolean;
}

export interface Barber {
  id: string;
  name: string;
  title: string;
  experienceYears: number;
  specialty: string;
  image: string;
  bio: string;
  status: 'available' | 'in-chair' | 'booked';
  nextAvailable: string;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  serviceReceived: string;
  reviewText: string;
  verified: boolean;
  barberName: string;
}

export interface BusinessDayHours {
  day: string;
  shortDay: string;
  open: string;
  close: string;
  isClosed?: boolean;
}

export interface BookingFormState {
  serviceId: string;
  barberId: string;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  email: string;
  notes: string;
}

export interface ConfirmedBooking {
  bookingId: string;
  service: ServiceItem;
  barber: Barber;
  date: string;
  timeSlot: string;
  fullName: string;
  phone: string;
  totalPrice: number;
  createdAt: string;
}
