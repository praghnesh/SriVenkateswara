export const CONTACT_INFO = {
  primaryPhone: '+91 63094 26620',
  primaryPhoneRaw: '916309426620',
  altPhone: '+91 63094 26620',
  altPhoneRaw: '916309426620',
  email: 'bookings@srivenkateswaracartravels.com',
  address: '18/2 18/2, near Siva theater, beside chandana hospital, Arundelpet, Guntur, Andhra Pradesh 522002.',
  operatingHours: 'Available 24 Hours / 7 Days a Week',
  experienceYears: '12+',
  happyPassengers: '2500+',
  fleetSize: '35+',
  rating: '4.9'
};

export const SERVICE_HUBS = [
  'Guntur',
  'Mangalagiri',
  'Vijayawada',
  'Amaravati Capital'
];

export const ALL_REGIONS = [
  'Guntur',
  'Vijayawada',
  'Mangalagiri',
  'Tenali',
  'Amaravati',
  'Hyderabad',
  'Tirupati'
];

export const FLEET_VEHICLES = [
  {
    id: 'swift-dzire',
    name: 'Maruti Swift Dzire',
    category: 'sedan',
    categoryLabel: 'Compact Sedan',
    submodels: 'Swift Dzire / Dual Airbags / Smooth Cruiser',
    ratePerKm: 12,
    rateText: '₹12 / Km',
    image: '/assets/images/dzire-sedan.jpg?v=front2026',
    seats: '4+1 Seats',
    acType: 'Chilled AC',
    luggage: '2 Bags',
    features: [
      'Ideal for airport drops, city commutes & couples',
      'Best fuel economy & quiet highway cruising'
    ]
  },
  {
    id: 'toyota-etios',
    name: 'Toyota Etios',
    category: 'sedan',
    categoryLabel: 'Reliable Sedan',
    submodels: 'Massive Boot Space • Smooth Highway Ride',
    ratePerKm: 12,
    rateText: '₹12 / Km',
    image: '/assets/images/etios.jpg',
    seats: '4+1 Seats',
    acType: 'Full AC',
    luggage: '3 Large Bags',
    features: [
      'Class-leading 592L boot space for heavy travel luggage',
      'Reliable Toyota suspension for comfortable city & highway trips'
    ]
  },
  {
    id: 'maruti-ciaz',
    name: 'Maruti Suzuki Ciaz',
    category: 'sedan',
    categoryLabel: 'Executive Sedan',
    submodels: 'Executive Legroom • Premium Plush Interiors',
    ratePerKm: 14,
    rateText: '₹14 / Km',
    image: '/assets/images/ciaz.jpg',
    seats: '4+1 Seats',
    acType: 'Climate AC',
    luggage: '3 Bags',
    features: [
      'Executive comfort with extra rear legroom & plush upholstery',
      'Preferred for business meetings, corporate delegates & weddings'
    ]
  },
  {
    id: 'maruti-ertiga',
    name: 'Maruti Suzuki Ertiga',
    category: 'mpv',
    categoryLabel: 'Family MPV',
    submodels: '6+1 Family Seating • Roof AC Vents',
    ratePerKm: 15,
    rateText: '₹15 / Km',
    image: '/assets/images/ertiga.jpg?v=front2026',
    seats: '6+1 Seats',
    acType: 'Dual AC',
    luggage: '3-4 Bags',
    features: [
      'Most popular choice for family pilgrimages & functions',
      'Foldable 3rd row for extra luggage carrier capacity'
    ]
  },
  {
    id: 'kia-carens',
    name: 'Kia Carens',
    category: 'mpv',
    categoryLabel: 'Modern MPV',
    submodels: '6+1 Seating • Modern Plush Interiors',
    ratePerKm: 16,
    rateText: '₹16 / Km',
    image: '/assets/images/kia-carens.jpg?v=front2026',
    seats: '6+1 Seats',
    acType: 'Climate AC',
    luggage: '3 Bags',
    features: [
      'Premium cabin sound insulation with smooth ride quality',
      'Type-C charging ports for all seat rows'
    ]
  },
  {
    id: 'innova-classic',
    name: 'Toyota Innova Classic',
    category: 'mpv',
    categoryLabel: 'Highway MUV',
    submodels: '7+1 Seating • Rugged Highway Performance',
    ratePerKm: 18,
    rateText: '₹18 / Km',
    image: '/assets/images/innova-crysta.jpg?v=front2026',
    seats: '7+1 Seats',
    acType: 'Full AC',
    luggage: '4 Bags',
    features: [
      'The most trusted highway workhorse across India',
      'Great suspension for comfortable long-distance travel'
    ]
  },
  {
    id: 'innova-crysta',
    name: 'Toyota Innova Crysta',
    category: 'luxury',
    categoryLabel: 'Premium Luxury SUV',
    categoryTagStyle: { background: '#92400e' },
    submodels: 'Captain Recliner Seats • VIP & Long Haul Travel',
    ratePerKm: 21,
    rateText: '₹21 / Km',
    image: '/assets/images/innova-crysta.jpg?v=front2026',
    seats: '7+1 Luxury',
    acType: 'Triple Zone AC',
    luggage: '5 Large Bags',
    features: [
      'Supreme comfort on highway & ghat routes to Tirumala',
      'Preferred choice for corporate delegates & weddings'
    ]
  },
  {
    id: 'tempo-traveller',
    name: 'Force Tempo Traveller',
    category: 'group',
    categoryLabel: 'Minibus / Tour Coach',
    categoryTagStyle: { background: '#1e3a8a' },
    submodels: '12 / 17 / 26 Seater Configuration',
    ratePerKm: 26,
    rateText: '₹26 / Km',
    image: '/assets/images/tempo-traveller.jpg?v=front2026',
    seats: '12-26 Seats',
    acType: 'AC / Non-AC',
    luggage: 'Roof Carrier',
    features: [
      'Reclining pushback seats, surround audio & LED TV',
      'Perfect for large joint families, temple tours & marriages'
    ]
  },
  {
    id: 'force-urbania',
    name: 'Force Urbania Luxury Van',
    category: 'group',
    categoryLabel: 'VIP Luxury Coach',
    categoryTagStyle: { background: '#0f766e' },
    submodels: '10 / 13 / 17 VIP Recliner Luxury Seating',
    ratePerKm: 32,
    rateText: '₹32 / Km',
    image: '/assets/images/urbania.jpg',
    seats: '10-17 VIP',
    acType: 'Individual AC',
    luggage: 'Roof Carrier',
    features: [
      'World-class European styling with individual AC vents & USB ports',
      'Panoramic windows, mood lighting & supreme highway comfort for VIPs'
    ]
  }
];

export const FEATURED_ROUTES = [
  {
    id: 'tirupati',
    title: 'Tirupati & Tirumala Balaji Darshan',
    badge: 'Most Popular Pilgrimage',
    image: '/assets/images/tirupati.jpg',
    duration: '6–7 Hrs Journey (380 Kms)',
    type: 'Round Trip & 2-Day Darshan Stay',
    fareLabel: 'Sedan Package from',
    farePrice: '₹6,499 Flat',
    enquiryName: 'Tirupati Tirumala Balaji Darshan',
    approxDuration: '6-7 Hrs',
    approxFare: '₹6,499',
    isLarge: true
  },
  {
    id: 'hyderabad',
    title: 'Hyderabad & Shamshabad Airport',
    badge: 'Express Highway',
    image: '/assets/images/hyderabad.jpg',
    duration: '4–5 Hrs Journey (280 Kms)',
    fareLabel: 'One-Way from',
    farePrice: '₹4,199',
    enquiryName: 'Hyderabad City / RGI Airport',
    approxDuration: '4-5 Hrs',
    approxFare: '₹4,199',
    isLarge: false
  },
  {
    id: 'vizag',
    title: 'Visakhapatnam (Vizag) Coastal',
    badge: 'Scenic East Coast',
    image: '/assets/images/vizag.jpg',
    duration: '5–6 Hrs Journey (370 Kms)',
    fareLabel: 'Starting from',
    farePrice: '₹5,899',
    enquiryName: 'Visakhapatnam RK Beach Tour',
    approxDuration: '5-6 Hrs',
    approxFare: '₹5,899',
    isLarge: false
  }
];

export const MINI_ROUTES = [
  {
    id: 'srisailam',
    title: 'Srisailam Jyotirlinga',
    tag: 'Pilgrimage',
    image: '/assets/images/srisailam.jpg',
    meta: 'Via Nallamala Forest & Ghat Road • 4.5 Hrs (220 Kms)',
    priceLabel: 'Starts at',
    priceVal: '₹4,499',
    enquiryName: 'Srisailam Mallikarjuna Swamy Temple',
    approxDuration: '4.5 Hrs',
    approxFare: '₹4,499'
  },
  {
    id: 'vijayawada',
    title: 'Vijayawada Kanaka Durga',
    tag: 'Airport & Temple',
    image: '/assets/images/vijayawada.jpg',
    meta: 'Gannavaram Airport (VGA) & City Drop • 45 Mins (35 Kms)',
    priceLabel: 'Fixed Fare',
    priceVal: '₹999',
    enquiryName: 'Vijayawada Temple & Airport Drop',
    approxDuration: '45 Mins',
    approxFare: '₹999'
  },
  {
    id: 'bengaluru-chennai',
    title: 'Bengaluru & Chennai',
    tag: 'Interstate Permit',
    image: '/assets/images/bangalore_chennai.jpg',
    meta: 'Direct Doorstep Drop with All-India Tourist Permit',
    priceLabel: 'Per Km from',
    priceVal: '₹12/km',
    enquiryName: 'Interstate Bengaluru / Chennai',
    approxDuration: 'Overnight',
    approxFare: 'Per Km Basis'
  }
];

export const SERVICES_LIST = [
  {
    id: 'outstation-round',
    title: 'Outstation Round Trips',
    route: '/outstation-cabs',
    desc: 'Enjoy weekend getaways, holiday vacations, and family visits across Andhra, Telangana, Karnataka, and Tamil Nadu with courteous drivers.',
    points: [
      'Transparent per-km billing',
      '300 km / day minimum average',
      'No rush, car stays with you'
    ],
    ctaText: 'Enquire Outstation Cabs →',
    waText: 'Enquiry for Outstation Round Trip'
  },
  {
    id: 'oneway-drops',
    title: 'One-Way Drops (Save 40%)',
    route: '/outstation-cabs',
    desc: 'Moving to another city or heading home? Pay only for the one-way distance traveled without paying for return empty fuel.',
    points: [
      'Zero return toll or driver fuel surcharge',
      'Direct doorstep-to-doorstep service',
      'Available 24/7 on prior notice'
    ],
    ctaText: 'Check One-Way Routes →',
    waText: 'Enquiry for One Way Drop'
  },
  {
    id: 'airport-transfers',
    title: 'Airport Pickup & Drop',
    route: '/airport-cabs',
    desc: 'Guaranteed on-time transfers to Vijayawada Airport (Gannavaram) and Hyderabad Rajiv Gandhi International Airport (Shamshabad).',
    points: [
      'Flight delay monitoring & flexible wait',
      'Luggage assistance at arrival lounge',
      'Fixed upfront all-inclusive tariffs'
    ],
    ctaText: 'Book Airport Cab →',
    waText: 'Enquiry for Airport Transfer'
  },
  {
    id: 'hourly-rentals',
    title: 'Local Hourly Rentals',
    route: '/hourly-rentals',
    desc: 'Book a dedicated car and chauffeur by the hour for business meetings, wedding shopping, medical visits, or guest pickups.',
    points: [
      '4 Hrs / 40 Kms package',
      '8 Hrs / 80 Kms full day package',
      'Multi-stop city travel convenience'
    ],
    ctaText: 'Explore Hourly Rates →',
    waText: 'Enquiry for Local Hourly Rental'
  },
  {
    id: 'pilgrimage-tours',
    title: 'Pilgrimage Darshan Special',
    route: '/tour-packages',
    desc: 'Customized religious tour packages to Tirumala Venkateswara, Srisailam, Kanaka Durga, Bhadrachalam, Mantralayam & Shirdi.',
    points: [
      'Drivers familiar with temple darshan timings',
      'Ghat road certified careful driving',
      'Dedicated luggage safety during darshan'
    ],
    ctaText: 'Plan Pilgrimage Trip →',
    waText: 'Enquiry for Pilgrimage Darshan Package'
  },
  {
    id: 'corporate-weddings',
    title: 'Weddings & Corporate Fleet',
    route: '/contact',
    desc: 'Bulk fleet coordination for marriage processions, guest pickup logistics, VIP delegates, and corporate monthly rental agreements.',
    points: [
      'Premium decorated wedding cars available',
      'GST invoicing for company accounts',
      'Dedicated transport manager on-site'
    ],
    ctaText: 'Request Fleet Quote →',
    waText: 'Enquiry for Corporate or Wedding Fleet'
  }
];

export const HOURLY_RENTAL_TARIFFS = [
  {
    vehicle: 'Swift / Etios Liva',
    type: 'Hatchback (4+1)',
    fourHrsFortyKm: 1300,
    eightHrsHundredKm: 2000,
    extraKm: 13,
    extraHr: 150,
    driverBatta: 'Included'
  },
  {
    vehicle: 'Etios / Swift Dzire / Honda Amaze',
    type: 'Prime Sedan (4+1)',
    fourHrsFortyKm: 1400,
    eightHrsHundredKm: 2000,
    extraKm: 13,
    extraHr: 150,
    driverBatta: 'Included'
  },
  {
    vehicle: 'Honda City / Volkswagen Vento',
    type: 'Executive Sedan (4+1)',
    fourHrsFortyKm: 1300,
    eightHrsHundredKm: 2000,
    extraKm: 13,
    extraHr: 150,
    driverBatta: 'Included'
  },
  {
    vehicle: 'Toyota Innova (7+1)',
    type: 'Family MUV (7+1)',
    fourHrsFortyKm: 2000,
    eightHrsHundredKm: 3000,
    extraKm: 16,
    extraHr: 300,
    driverBatta: 'Included'
  },
  {
    vehicle: 'Toyota Innova Crysta (7+1)',
    type: 'Luxury Captain (7+1)',
    fourHrsFortyKm: 2000,
    eightHrsHundredKm: 3000,
    extraKm: 16,
    extraHr: 300,
    driverBatta: 'Included'
  },
  {
    vehicle: 'Chevrolet Tavera (9+1)',
    type: 'Group MUV (9+1)',
    fourHrsFortyKm: 1800,
    eightHrsHundredKm: 2800,
    extraKm: 15,
    extraHr: 250,
    driverBatta: 'Included'
  },
  {
    vehicle: 'Tempo Traveller (12+1)',
    type: 'Minibus / Coach (12+1)',
    fourHrsFortyKm: 2800,
    eightHrsHundredKm: 4000,
    extraKm: 19,
    extraHr: 300,
    driverBatta: 'Included'
  }
];

export const TARIFF_TABLE_DATA = [
  {
    model: 'Maruti Swift Dzire / Etios',
    seating: '4 + 1 Passengers',
    outstationRate: '₹12 / Km',
    localPackage: '₹2,000 (8h/100km)',
    extraKm: '₹13 / km',
    batta: 'Included'
  },
  {
    model: 'Maruti Ertiga / Tavera MPV',
    seating: '6+1 to 9+1',
    outstationRate: '₹15 / Km',
    localPackage: '₹2,800 (8h/100km)',
    extraKm: '₹15 / km',
    batta: 'Included'
  },
  {
    model: 'Kia Carens Luxury',
    seating: '6 + 1 Passengers',
    outstationRate: '₹16 / Km',
    localPackage: '₹2,800 (8h/100km)',
    extraKm: '₹15 / km',
    batta: 'Included'
  },
  {
    model: 'Toyota Innova (7+1)',
    seating: '7 + 1 Passengers',
    outstationRate: '₹18 / Km',
    localPackage: '₹3,000 (8h/100km)',
    extraKm: '₹16 / km',
    batta: 'Included'
  },
  {
    model: 'Toyota Innova Crysta (7+1)',
    seating: '7 + 1 Luxury',
    outstationRate: '₹21 / Km',
    localPackage: '₹3,000 (8h/100km)',
    extraKm: '₹16 / km',
    batta: 'Included'
  },
  {
    model: 'Force Tempo Traveller (12+1)',
    seating: '12 to 26 Seater',
    outstationRate: '₹26 / Km',
    localPackage: '₹4,000 (8h/100km)',
    extraKm: '₹19 / km',
    batta: 'Included'
  }
];

export const WHY_CHOOSE_US = [
  {
    title: 'Experienced & Police-Verified',
    desc: 'All chauffeurs undergo background verification, have 8+ years highway experience, and maintain non-smoking, courteous etiquette.'
  },
  {
    title: '100% Transparent Invoicing',
    desc: 'Zero surge pricing during peak festival seasons. Clear, itemized Fastag bills with GST invoices available on request.'
  },
  {
    title: 'Zero Delay Guarantee',
    desc: 'Your cab arrives at your doorstep 15 minutes before scheduled departure time. Never miss an early morning train or flight.'
  },
  {
    title: 'Sanitized & Fresh Interiors',
    desc: 'Every vehicle undergoes interior vacuuming, fragrance renewal, and seat cover sanitization prior to each booking pickup.'
  },
  {
    title: '24x7 Live Helpline Support',
    desc: 'Direct human support on WhatsApp & phone. Instant vehicle replacement backup available across major Andhra highways.'
  },
  {
    title: 'Ghat-Road Certified Drivers',
    desc: 'Skilled handling on hill terrain routes including Tirumala 1st/2nd ghats, Srisailam forest curves, and Araku valley hairpins.'
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    name: 'Rajesh Kumar V.',
    trip: 'Guntur to Tirupati (3-Day Family Tour)',
    avatar: 'RK',
    stars: '★★★★★',
    text: 'We booked an Innova Crysta for our family trip from Guntur to Tirupati. The car was spotless, AC was great, and the driver Srinivas was very polite and drove very safely on the Tirumala ghat road. Excellent travel service!'
  },
  {
    id: 2,
    name: 'Lakshmi Prasanna M.',
    trip: 'Vijayawada to Hyderabad Airport Drop',
    avatar: 'LP',
    stars: '★★★★★',
    text: 'Booked a one-way cab to Hyderabad RGIA airport at 3:00 AM. Driver arrived 20 minutes in advance, helped with our heavy baggage, and took the Vijayawada-Hyderabad expressway smoothly. Reached well ahead of boarding.'
  },
  {
    id: 3,
    name: 'Srinivasa Rao K.',
    trip: 'Wedding Group Travel (Tempo Traveller)',
    avatar: 'SN',
    stars: '★★★★★',
    text: 'Hired a 17-seater Tempo Traveller for a wedding party from Guntur to Vizag. Extremely comfortable pushback seats and music system. Rates were very reasonable compared to others. Highly recommend Sri Venkateswara Travels!'
  }
];

export const FAQS = [
  {
    question: 'Are toll gate charges and parking fees included in the fare?',
    answer: 'Toll plaza charges and parking fees are charged at actuals as per highway Fastag receipts. This ensures you only pay for the exact tolls incurred along your specific route with zero inflated markups.'
  },
  {
    question: 'Can I book a one-way drop without paying return empty fare?',
    answer: 'Yes! For major routes including Guntur/Vijayawada to Hyderabad, Tirupati, Vizag, and Chennai, we offer dedicated one-way tariffs where you only pay for your point-to-point drop without return vehicle charges.'
  },
  {
    question: 'How is driver allowance (Batta) calculated for multi-day trips?',
    answer: 'Driver allowance (Batta) is ₹400 per calendar day for Sedans/Ertiga and ₹500 for Innova Crysta. If driving continues past 10:00 PM, a modest night allowance of ₹200 applies for driver rest and refreshment.'
  },
  {
    question: 'How do I confirm my booking? Do I need to pay an advance?',
    answer: 'You can book instantly by messaging us on WhatsApp or calling our helpline. A nominal token advance confirms your slot, and the balance is paid directly to the driver at the end of the trip via UPI, Cash, or Bank Transfer.'
  },
  {
    question: 'What happens if my flight or train arrival is delayed?',
    answer: 'We track flight numbers and train arrival times live. If your flight or train is delayed, our driver automatically adjusts pickup timing without extra waiting penalties for reasonable delays.'
  }
];

