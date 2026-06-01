export interface Room {
  id: string;
  name: string;
  description: string;
  longDescription: string;
  features: string[];
  capacity: string;
}

export interface Experience {
  id: string;
  title: string;
  tagline?: string;
  description: string;
}

export type ReservationType = 'lodge' | 'room' | 'restaurant' | 'experience';

export interface ReservationEnquiry {
  fullName: string;
  email: string;
  phone: string;
  type: ReservationType;
  targetId?: string; // e.g. room room-id or table
  checkIn?: string;
  checkOut?: string;
  guestsCount: number;
  specialNotes?: string;
}
