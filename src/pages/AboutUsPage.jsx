import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import AboutUs from '../components/AboutUs';
import StatsSection from '../components/StatsSection';
import SocialMediaSection from '../components/SocialMediaSection';
import CtaBanner from '../components/CtaBanner';

export default function AboutUsPage({ onOpenBookingModal }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeaderBanner
        badge="12+ Years of Excellence"
        title="About Sri Venkateswara"
        highlightText="Car Travels"
        subtitle="Discover our journey since 2012 — providing verified chauffeurs, sanitized vehicles, transparent pricing, and 24/7 doorstep cab services across Andhra Pradesh and Telangana."
      />
      
      {/* Detailed Story & Values */}
      <AboutUs onOpenBookingModal={onOpenBookingModal} />

      {/* Trust Stats Bar */}
      <StatsSection />

      {/* Social Media Community Showcase */}
      <SocialMediaSection />

      {/* CTA Strip */}
      <CtaBanner onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
}

