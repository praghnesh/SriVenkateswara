import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import Testimonials from '../components/Testimonials';
import WhyUs from '../components/WhyUs';
import CtaBanner from '../components/CtaBanner';

export default function ReviewsPage({ onOpenBookingModal }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeaderBanner
        badge="2500+ Happy Travelers"
        title="Verified Customer"
        highlightText="Testimonials"
        subtitle="Read real stories and feedback from families, pilgrims, wedding parties, and business travelers who choose Sri Venkateswara Travels."
      />
      <Testimonials />
      <WhyUs />
      <CtaBanner onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
}

