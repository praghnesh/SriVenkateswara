/**
 * SRI VENKATESWARA CAR TRAVELS - INTERACTIVE ENGINE
 * Handcrafted, fast, accessible, zero bloat.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Primary Business Phone / WhatsApp Number
  const WHATSAPP_PHONE = '919848022338'; // Primary 24/7 Helpline

  // Set default travel date to today or tomorrow
  const dateInput = document.getElementById('pickupDate');
  if (dateInput) {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    dateInput.min = `${yyyy}-${mm}-${dd}`;
    dateInput.value = `${yyyy}-${mm}-${dd}`;
  }

  // 1. Navigation Sticky Scroll & Mobile Drawer
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  const mobileBtn = document.getElementById('mobileMenuBtn');
  const mobileDrawer = document.getElementById('mobileNavDrawer');
  if (mobileBtn && mobileDrawer) {
    mobileBtn.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
    });

    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
      });
    });
  }

  // 2. Booking Engine Tabs (One Way / Round Trip / Local / Airport)
  const bookingTabs = document.querySelectorAll('.booking-tab');
  const dropGroup = document.getElementById('dropLocationGroup');
  const dropInput = document.getElementById('dropLocation');
  let currentTripType = 'One Way';

  bookingTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      bookingTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentTripType = tab.getAttribute('data-trip') || tab.innerText.trim();

      if (currentTripType === 'Local Rental') {
        if (dropInput) {
          dropInput.placeholder = 'e.g. 8 Hrs / 80 Kms or Full Day Local';
        }
      } else if (currentTripType === 'Airport Transfer') {
        if (dropInput) {
          dropInput.placeholder = 'Vijayawada (VGA) / Hyderabad (RGIA)';
        }
      } else {
        if (dropInput) {
          dropInput.placeholder = 'Enter Destination City / Place';
        }
      }
    });
  });

  // 3. Hero WhatsApp Booking Form Submission
  const bookingForm = document.getElementById('heroBookingForm');
  if (bookingForm) {
    bookingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('custName')?.value.trim() || 'Valued Guest';
      const phone = document.getElementById('custPhone')?.value.trim() || 'Not Provided';
      const pickup = document.getElementById('pickupLocation')?.value.trim();
      const drop = document.getElementById('dropLocation')?.value.trim();
      const date = document.getElementById('pickupDate')?.value;
      const time = document.getElementById('pickupTime')?.value;
      const vehicle = document.getElementById('vehicleSelect')?.value;

      if (!pickup || !drop) {
        alert('Please enter both pickup and destination locations to continue.');
        return;
      }

      const message = 
`*NEW CAB BOOKING ENQUIRY* 🚖
*Sri Venkateswara Car Travels*

• *Trip Type:* ${currentTripType}
• *Customer Name:* ${name}
• *Mobile Number:* ${phone}
• *Pickup From:* ${pickup}
• *Drop Location:* ${drop}
• *Date & Time:* ${date || 'Immediate'} at ${time || 'Flexible'}
• *Selected Vehicle:* ${vehicle || 'Sedan / Any suitable car'}

Please confirm cab availability and send the best quote. Thank you!`;

      const encodedMsg = encodeURIComponent(message);
      const waUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMsg}`;
      window.open(waUrl, '_blank');
    });
  }

  // 4. Quick Route WhatsApp Action (Tirupati, Hyderabad, Vizag, etc.)
  window.bookRoute = function(destinationName, travelTime, approxFare) {
    const pickupLoc = 'Guntur / Vijayawada';
    const message = 
`*TOUR PACKAGE ENQUIRY* 🌟
*Sri Venkateswara Car Travels*

• *Destination:* ${destinationName}
• *Pickup From:* ${pickupLoc}
• *Duration:* Approx ${travelTime}
• *Package Starting Fare:* ${approxFare}

Hello Sri Venkateswara Travels, please share itinerary, vehicle options (Dzire, Ertiga, Innova Crysta), and complete quote for this trip.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
  };

  // 5. Quick Vehicle WhatsApp Action
  window.bookVehicle = function(vehicleName, rateText) {
    const message = 
`*VEHICLE RENTAL ENQUIRY* 🚗
*Sri Venkateswara Car Travels*

• *Vehicle:* ${vehicleName}
• *Tariff Rate:* ${rateText}

Namaste, I want to book the *${vehicleName}* for an upcoming trip. Please let me know cab availability, driver batta, and booking procedure.`;

    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encoded}`, '_blank');
  };

  // 6. Fleet Filtering (Tabs: All, Sedan, MUV/SUV, Tempo)
  const filterBtns = document.querySelectorAll('.fleet-filter-btn');
  const vehicleCards = document.querySelectorAll('.vehicle-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      vehicleCards.forEach(card => {
        if (filterVal === 'all') {
          card.style.display = 'flex';
        } else {
          const category = card.getAttribute('data-category');
          if (category === filterVal) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        }
      });
    });
  });

  // 7. Interactive Live Fare Estimator
  const calcVehicle = document.getElementById('calcVehicle');
  const calcDistance = document.getElementById('calcDistance');
  const calcDistanceVal = document.getElementById('calcDistanceVal');
  const calcTotalFare = document.getElementById('calcTotalFare');
  const calcRunningFare = document.getElementById('calcRunningFare');
  const calcBatta = document.getElementById('calcBatta');
  const calcPerKmLabel = document.getElementById('calcPerKmLabel');

  function updateFareEstimate() {
    if (!calcVehicle || !calcDistance) return;

    const selectedOption = calcVehicle.options[calcVehicle.selectedIndex];
    const ratePerKm = parseFloat(selectedOption.getAttribute('data-rate')) || 12;
    const distanceKm = parseInt(calcDistance.value, 10) || 200;

    if (calcDistanceVal) {
      calcDistanceVal.innerText = `${distanceKm} Kms`;
    }

    const runningCost = distanceKm * ratePerKm;
    const driverBatta = 400; // Standard day batta
    const totalEst = runningCost + driverBatta;

    if (calcRunningFare) {
      calcRunningFare.innerText = `₹${runningCost.toLocaleString('en-IN')}`;
    }
    if (calcBatta) {
      calcBatta.innerText = `₹${driverBatta}`;
    }
    if (calcPerKmLabel) {
      calcPerKmLabel.innerText = `₹${ratePerKm}/km`;
    }
    if (calcTotalFare) {
      calcTotalFare.innerText = `₹${totalEst.toLocaleString('en-IN')}`;
    }
  }

  if (calcVehicle && calcDistance) {
    calcVehicle.addEventListener('change', updateFareEstimate);
    calcDistance.addEventListener('input', updateFareEstimate);
    updateFareEstimate();
  }

  // 8. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // 9. Quick Booking Modal
  const modalBackdrop = document.getElementById('quickBookingModal');
  const modalClose = document.getElementById('modalCloseBtn');
  const modalVehicleName = document.getElementById('modalVehicleName');

  window.openBookingModal = function(carName) {
    if (modalBackdrop) {
      if (modalVehicleName && carName) {
        modalVehicleName.innerText = `Booking: ${carName}`;
        const modalSelect = document.getElementById('modalCarSelect');
        if (modalSelect) modalSelect.value = carName;
      }
      modalBackdrop.classList.add('active');
    }
  };

  if (modalClose && modalBackdrop) {
    modalClose.addEventListener('click', () => {
      modalBackdrop.classList.remove('active');
    });

    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) {
        modalBackdrop.classList.remove('active');
      }
    });
  }

  // Modal Form Submit
  const modalForm = document.getElementById('modalBookingForm');
  if (modalForm) {
    modalForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('modalCustName')?.value || 'Guest';
      const phone = document.getElementById('modalCustPhone')?.value || 'Not provided';
      const pickup = document.getElementById('modalPickup')?.value || 'Guntur';
      const drop = document.getElementById('modalDrop')?.value || 'Outstation';
      const car = document.getElementById('modalCarSelect')?.value || 'Car';
      const date = document.getElementById('modalDate')?.value || 'Immediate';

      const msg = 
`*DIRECT CAB RESERVATION REQUEST* 🚗
*Sri Venkateswara Car Travels*

• *Customer:* ${name}
• *Contact:* ${phone}
• *Vehicle Required:* ${car}
• *Pickup Location:* ${pickup}
• *Drop Destination:* ${drop}
• *Travel Date:* ${date}

Kindly confirm cab booking and share driver & vehicle details.`;

      modalBackdrop.classList.remove('active');
      window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
});
