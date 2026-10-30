import React from 'react';
import Hero from '../components/Hero';
import TourPackages from '../components/TourPackages';
import Fleet from '../components/Fleet';
import SocialMediaSection from '../components/SocialMediaSection';

export default function Home({ onOpenBookingModal }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      {/* 1. Hero with Live Booking Form & Module Tabs (Hourly 4h-12h, One-Way, Round, Airport) */}
      <Hero onOpenBookingModal={onOpenBookingModal} />

      {/* 2. Tour Packages Bento Grid (One Big, Small ones, photos & pre-filled modal booking) */}
      <TourPackages onOpenBookingModal={onOpenBookingModal} />

      {/* 3. Car Booking Fleet Carousel & Vehicle Cards (Compact & sleek on mobile) */}
      <Fleet onOpenBookingModal={onOpenBookingModal} />

      {/* 4. Social Media Bento Grid Showcase */}
      <SocialMediaSection />
    </div>
  );
}