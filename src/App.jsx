import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Header from './components/Header';
import Footer from './components/Footer';
import FloatingActions from './components/FloatingActions';
import QuickBookingModal from './components/QuickBookingModal';

// Dedicated Separate Pages (matching vizagtaxi.com architecture)
import Home from './pages/Home';
import AirportCabsPage from './pages/AirportCabsPage';
import OutstationCabsPage from './pages/OutstationCabsPage';
import HourlyRentalsPage from './pages/HourlyRentalsPage';
import TourPackagesPage from './pages/TourPackagesPage';
import FleetPage from './pages/FleetPage';
import WhyUsPage from './pages/WhyUsPage';
import FaqPage from './pages/FaqPage';
import ContactPage from './pages/ContactPage';
import ServicesPage from './pages/ServicesPage';
import TariffPage from './pages/TariffPage';
import ReviewsPage from './pages/ReviewsPage';
import AboutUsPage from './pages/AboutUsPage';

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalBookingData, setModalBookingData] = useState(null);

  const handleOpenModal = (data = null) => {
    if (typeof data === 'string') {
      setModalBookingData({ vehicle: data });
    } else {
      setModalBookingData(data || {});
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalBookingData(null);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-root flex flex-col min-h-screen overflow-x-hidden w-full max-w-full">
        <Header onOpenBookingModal={handleOpenModal} />
        
        <main className="flex-1">
          <Routes>
            {/* Primary Routes */}
            <Route path="/" element={<Home onOpenBookingModal={handleOpenModal} />} />
            <Route path="/home" element={<Home onOpenBookingModal={handleOpenModal} />} />
            <Route path="/services" element={<ServicesPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/airport-cabs" element={<AirportCabsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/outstation-cabs" element={<OutstationCabsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/hourly-rentals" element={<HourlyRentalsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/tour-packages" element={<TourPackagesPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/fleet" element={<FleetPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/tariff" element={<TariffPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/why-us" element={<WhyUsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/about" element={<AboutUsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/about-us" element={<AboutUsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/reviews" element={<ReviewsPage onOpenBookingModal={handleOpenModal} />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            
            {/* Catch-all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        <Footer />
        <FloatingActions />
        
        <QuickBookingModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          bookingData={modalBookingData}
        />
      </div>
    </BrowserRouter>
  );
}
