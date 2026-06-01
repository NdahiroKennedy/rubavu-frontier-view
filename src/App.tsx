/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import LodgeOverview from './components/LodgeOverview';
import TheSetting from './components/TheSetting';
import Rooms from './components/Rooms';
import Experiences from './components/Experiences';
import RestaurantBar from './components/RestaurantBar';
import Gallery from './components/Gallery';
import Sustainability from './components/Sustainability';
import GuestQuote from './components/GuestQuote';
import ReservationCTA from './components/ReservationCTA';
import Footer from './components/Footer';
import ReserveModal from './components/ReserveModal';
import { ReservationType } from './types';

export default function App() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [reserveType, setReserveType] = useState<ReservationType>('lodge');
  const [reserveTargetId, setReserveTargetId] = useState<string>('');

  const triggerReserve = (type: ReservationType, targetId: string = '') => {
    setReserveType(type);
    setReserveTargetId(targetId);
    setIsReserveOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#2C2C2C] selection:bg-[#4A5240] selection:text-[#F5F1EB] relative">
      {/* Sticky Blur Header Navigation */}
      <Navigation onReserveClick={() => triggerReserve('lodge')} />

      {/* Main Single-View Content Blocks */}
      <main>
        {/* Hero Banner Section */}
        <Hero onReserveClick={() => triggerReserve('lodge')} />

        {/* Section 1: Rwanda's Western Retreat (Overview) */}
        <LodgeOverview />

        {/* Section 2: The Setting (Lake Kivu Panoramas) */}
        <TheSetting />

        {/* Section 3: The Rooms (Ten Rooms, Private Worlds Grid) */}
        <Rooms onReserveRoomClick={(roomId) => triggerReserve('room', roomId)} />

        {/* Section 4: Experiences (The Beginning of Everything List) */}
        <Experiences onReserveExpClick={(expId) => triggerReserve('experience', expId)} />

        {/* Section 5: The Restaurant & Bar (Kitchen + Bar Sub-sections) */}
        <RestaurantBar onReserveTableClick={() => triggerReserve('restaurant', 'table')} />

        {/* Section 6: Narrative Gallery (A visual documentation of stillness) */}
        <Gallery />

        {/* Section 7: Sustainability & Community */}
        <Sustainability />

        {/* Section 8: Centered Guest Quote */}
        <GuestQuote />

        {/* Section 9: Reservation CTA Banner */}
        <ReservationCTA onReserveClick={() => triggerReserve('lodge')} />
      </main>

      {/* Minimal 3-Column Footer */}
      <Footer onReserveClick={() => triggerReserve('lodge')} />

      {/* Interactive Reservation Enquiry Modal Overlay */}
      <ReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        initialType={reserveType}
        initialTargetId={reserveTargetId}
      />
    </div>
  );
}

