import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import Services from '../components/Services';
import ServiceAreasStrip from '../components/ServiceAreasStrip';
import CtaBanner from '../components/CtaBanner';
import WhyUs from '../components/WhyUs';

export default function ServicesPage({ onOpenBookingModal }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeaderBanner
        badge="24/7 Doorstep Services"
        title="Our Travel"
        highlightText="Services"
        subtitle="Experience stress-free travel with well-maintained AC cabs, verified chauffeurs, transparent per-km billing, and prompt doorstep pickups across Andhra Pradesh & Telangana."
      />
      <Services onOpenBookingModal={onOpenBookingModal} />
      <ServiceAreasStrip />
      <WhyUs />
      <CtaBanner onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
}

