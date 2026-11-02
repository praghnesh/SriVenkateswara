import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import TariffEstimator from '../components/TariffEstimator';
import CustomFareCalculator from '../components/CustomFareCalculator';
import FAQ from '../components/FAQ';
import CtaBanner from '../components/CtaBanner';

export default function TariffPage({ onOpenBookingModal }) {
  return (
    <div className="bg-slate-50 min-h-screen">
      <PageHeaderBanner
        badge="100% Transparent Billing"
        title="Tariff &"
        highlightText="Pricing Plans"
        subtitle="No surge pricing, no hidden nighttime penalties. Calculate your exact trip estimate instantly with complete peace of mind."
      />
      
      {/* Live Custom Calculator for Any Hours & Any KMs */}
      <section className="pt-12 pb-6 px-4 max-w-6xl mx-auto">
        <CustomFareCalculator />
      </section>

      <TariffEstimator />
      <FAQ />
      <CtaBanner onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
}

