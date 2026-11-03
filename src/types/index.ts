export type CoffeeCategory =
  | 'espresso'
  | 'filter'
  | 'signature'
  | 'cold'
  | 'tea'
  | 'bites';

export interface MenuItem {
  id: string;
  name: string;
  category: CoffeeCategory;
  price: string;
  description: string;
  origin?: string;
  elevation?: string;
  process?: string;
  variety?: string;
  tastingNotes?: string[];
  roastProfile?: 'light' | 'medium-light' | 'oak-aged' | 'charred-medium';
  isSignature?: boolean;
  isFictionalDemo?: boolean;
}

export interface EventItem {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  time: string;
  price: string;
  capacity: number;
  description: string;
  host: string;
  tag: 'cupping' | 'tasting' | 'social' | 'masterclass';
  isFictionalDemo?: boolean;
}

export interface ReservationSubmission {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  seatingPreference?: 'bar' | 'main-hall' | 'cellar-table';
  specialRequests?: string;
}

export interface ContactSubmission {
  name: string;
  email: string;
  phone?: string;
  subject: 'general' | 'wholesale' | 'press' | 'events';
  message: string;
}

export interface EventEnquirySubmission {
  name: string;
  email: string;
  phone: string;
  eventType: 'private-cupping' | 'corporate' | 'oak-hour' | 'custom';
  estimatedGuests: number;
  preferredDate: string;
  message: string;
}

export interface FaqQuestion {
  question: string;
  answer: string;
  category: 'coffee' | 'hours' | 'reservations' | 'philosophy' | 'events';
}
