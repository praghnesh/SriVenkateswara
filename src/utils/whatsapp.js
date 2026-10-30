import { CONTACT_INFO } from '../data/travelData';

/**
 * Open WhatsApp with custom encoded message
 */
export const openWhatsApp = (message) => {
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${CONTACT_INFO.primaryPhoneRaw}?text=${encoded}`;
  window.open(url, '_blank', 'noopener,noreferrer');
};

/**
 * Format and send Hero Booking Form
 */
export const sendHeroBooking = ({
  tripType,
  name,
  phone,
  pickup,
  drop,
  date,
  returnDate,
  time,
  vehicle
}) => {
  const isRoundTrip = tripType === 'Round Trip';
  const message = `*NEW CAB BOOKING ENQUIRY* 🚖
*Sri Venkateswara Car Travels*

• *Trip Type:* ${tripType || 'One Way'}
• *Customer Name:* ${name || 'Valued Guest'}
• *Mobile Number:* ${phone || 'Not Provided'}
• *Pickup From:* ${pickup}
• *Drop Location:* ${drop}
• *Departure Date:* ${date || 'Immediate'} at ${time || 'Flexible'}
${isRoundTrip && returnDate ? `• *Return Date:* ${returnDate}\n` : ''}${vehicle ? `• *Vehicle Preference:* ${vehicle}\n` : ''}
Please confirm cab availability and send the best quote. Thank you!`;

  openWhatsApp(message);
};

/**
 * Format and send Tour Package Booking
 */
export const sendRouteBooking = (destinationName, travelTime, approxFare) => {
  const message = `*TOUR PACKAGE ENQUIRY* 🌟
*Sri Venkateswara Car Travels*

• *Destination:* ${destinationName}
• *Pickup From:* Guntur / Vijayawada
• *Duration:* Approx ${travelTime}
• *Package Starting Fare:* ${approxFare}

Hello Sri Venkateswara Travels, please share itinerary, vehicle options (Dzire, Ertiga, Innova Crysta), and complete quote for this trip.`;

  openWhatsApp(message);
};

/**
 * Format and send Vehicle Booking
 */
export const sendVehicleBooking = (vehicleName, rateText) => {
  const message = `*VEHICLE RENTAL ENQUIRY* 🚗
*Sri Venkateswara Car Travels*

• *Vehicle:* ${vehicleName}
• *Tariff Rate:* ${rateText}

Namaste, I want to book the *${vehicleName}* for an upcoming trip. Please let me know cab availability, driver batta, and booking procedure.`;

  openWhatsApp(message);
};

/**
 * Format and send Direct Modal Reservation
 */
export const sendModalReservation = ({ 
  name, 
  phone, 
  pickup, 
  drop, 
  car, 
  date, 
  serviceType, 
  tourPackage, 
  fare, 
  hoursPackage 
}) => {
  const isTour = Boolean(tourPackage);
  const isHourly = Boolean(hoursPackage);

  const header = isTour 
    ? `*TOUR PACKAGE RESERVATION* 🧳` 
    : isHourly 
      ? `*HOURLY / LOCAL RENTAL RESERVATION* ⏱️` 
      : `*CAB RESERVATION REQUEST* 🚗`;

  const details = [
    `*Sri Venkateswara Car Travels*`,
    ``,
    tourPackage ? `• *Tour Package:* ${tourPackage}` : null,
    serviceType ? `• *Service Type:* ${serviceType}` : null,
    hoursPackage ? `• *Rental Duration:* ${hoursPackage}` : null,
    car ? `• *Selected Vehicle:* ${car}` : null,
    fare ? `• *Estimated Fare:* ${fare}` : null,
    `• *Pickup Point:* ${pickup || 'Guntur / Vijayawada'}`,
    drop ? `• *Destination / Drop:* ${drop}` : null,
    `• *Journey Date:* ${date || 'Immediate'}`,
    `• *Customer Name:* ${name || 'Valued Customer'}`,
    `• *Mobile Number:* ${phone || 'Not Provided'}`,
    ``,
    `Hello Sri Venkateswara Travels, please confirm car availability and driver dispatch for this trip. Thank you!`
  ].filter(Boolean).join('\n');

  openWhatsApp(`${header}\n${details}`);
};

