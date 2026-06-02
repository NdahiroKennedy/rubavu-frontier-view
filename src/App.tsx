import { useState } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'motion/react';
import { StoreProvider } from './data/StoreContext';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import ReserveModal from './components/ReserveModal';
import { ReservationType } from './types';

import HomePage from './pages/HomePage';
import LodgePage from './pages/LodgePage';
import RoomsPage from './pages/RoomsPage';
import ExperiencesPage from './pages/ExperiencesPage';
import RestaurantPage from './pages/RestaurantPage';
import GalleryPage from './pages/GalleryPage';
import AdminPage from './pages/AdminPage';

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
    >
      {children}
    </motion.div>
  );
}

function AppRoutes() {
  const [isReserveOpen, setIsReserveOpen] = useState(false);
  const [reserveType, setReserveType] = useState<ReservationType>("lodge");
  const [reserveTargetId, setReserveTargetId] = useState("");
  const location = useLocation();

  const triggerReserve = (type: ReservationType = "lodge", targetId = "") => {
    setReserveType(type);
    setReserveTargetId(targetId);
    setIsReserveOpen(true);
  };

  const isAdmin = location.pathname === "/admin";

  return (
    <div className="min-h-screen bg-[#F5F1EB] text-[#2C2C2C] selection:bg-[#4A5240] selection:text-[#F5F1EB]">
      {!isAdmin && <Navigation onReserveClick={() => triggerReserve()} />}

      <main className={!isAdmin ? "pt-0" : ""}>
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><HomePage onReserveClick={() => triggerReserve()} /></PageTransition>} />
            <Route path="/lodge" element={<PageTransition><LodgePage onReserveClick={() => triggerReserve()} /></PageTransition>} />
            <Route path="/rooms" element={<PageTransition><RoomsPage onReserveClick={(t, id) => triggerReserve(t, id)} onReserveGeneralClick={() => triggerReserve("room")} /></PageTransition>} />
            <Route path="/experiences" element={<PageTransition><ExperiencesPage onReserveClick={(t, id) => triggerReserve(t, id)} onReserveGeneralClick={() => triggerReserve("experience")} /></PageTransition>} />
            <Route path="/restaurant" element={<PageTransition><RestaurantPage onReserveClick={() => triggerReserve("restaurant", "table")} /></PageTransition>} />
            <Route path="/gallery" element={<PageTransition><GalleryPage /></PageTransition>} />
            <Route path="/admin" element={<AdminPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {!isAdmin && <Footer onReserveClick={() => triggerReserve()} />}

      <ReserveModal
        isOpen={isReserveOpen}
        onClose={() => setIsReserveOpen(false)}
        initialType={reserveType}
        initialTargetId={reserveTargetId}
      />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppRoutes />
      </StoreProvider>
    </BrowserRouter>
  );
}
