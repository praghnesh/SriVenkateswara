import React from 'react';
import PageHeaderBanner from '../components/PageHeaderBanner';
import TariffEstimator from '../components/TariffEstimator';
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

      <TariffEstimator />
      <FAQ />
      <CtaBanner onOpenBookingModal={onOpenBookingModal} />
    </div>
  );
}

