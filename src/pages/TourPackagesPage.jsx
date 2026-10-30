import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Clock, 
  MapPin, 
  Phone, 
  MessageSquare, 
  ArrowRight, 
  CheckCircle2, 
  XCircle, 
  Car,
  Navigation,
  Compass
} from 'lucide-react';
import { CONTACT_INFO, FLEET_VEHICLES } from '../data/travelData';
import { openWhatsApp } from '../utils/whatsapp';

export default function TourPackagesPage({ onOpenBookingModal }) {
  const location = useLocation();
  const [activeTour, setActiveTour] = useState(() => {
    return location.state?.selectedTour || 'tirupati';
  });
  const [selectedVehicle, setSelectedVehicle] = useState('swift-dzire');

  useEffect(() => {
    if (location.state?.selectedTour) {
      setActiveTour(location.state.selectedTour);
      const timer = setTimeout(() => {
        const el = document.getElementById('tour-showcase');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [location.state]);

  const tourPackages = [
    {
      id: 'tirupati',
      title: 'Tirupati & Tirumala Balaji Darshan',
      badge: 'Most Popular Pilgrimage',
      image: '/assets/images/tirupati.jpg',
      mapQuery: 'Tirumala+Tirupati+Temple,+Andhra+Pradesh',
      duration: '2 Days / 1 Night',
      distance: '380 Kms (One-Way)',
      rates: {
        'swift-dzire': 6499,
        'maruti-ertiga': 8499,
        'innova-crysta': 11499,
        'tempo-traveller': 15999,
        'kia-carens': 8999
      },
      tagline: 'Ghat-Road Certified Chauffeurs • 2 Days Standby • Darshan Timing Assistance',
      desc: 'Complete sacred pilgrimage package from Guntur / Vijayawada to Tirumala Balaji. Includes experienced ghat-road driver, 2 days local standby, and darshan schedule alignment.',
      visitingSpots: [
        { 
          name: '1. Tirumala Venkateswara Temple', 
          desc: 'Main sanctum darshan of Lord Venkateswara atop the holy Seshachalam hills.',
          image: '/assets/images/tirupati.jpg'
        },
        { 
          name: '2. Tiruchanur Padmavathi Ammavari Temple', 
          desc: 'Sacred darshan of Goddess Padmavathi on the banks of Padma Sarovaram.',
          image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '3. Sri Govindaraja Swamy Temple', 
          desc: 'Ancient 12th century Vaishnavite temple consecrated by Saint Ramanujacharya.',
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '4. Kapila Theertham & Waterfall', 
          desc: 'Sacred Shiva temple at the foothills of Tirumala with scenic mountain cascades.',
          image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '5. Srikalahasti Temple (Optional)', 
          desc: 'Ancient Vayu Linga Rahu-Ketu Kshetra located 36 km on return route.',
          image: 'https://images.unsplash.com/photo-1621847468516-1ed5d0df56fe?w=600&auto=format&fit=crop&q=80'
        }
      ],
      itinerary: [
        { 
          day: 'Day 1: Departure & Tirupati Local Temples', 
          detail: 'Early morning 5:00 AM pickup from your doorstep in Guntur/Vijayawada. Scenic highway drive via Ongole and Nellore. Check-in at Tirupati hotel by 1:00 PM. Evening temple darshans and local shopping.',
          places: [
            'Sri Padmavathi Ammavari Temple (Tiruchanur)',
            'Sri Govindaraja Swamy Temple',
            'Kapila Theertham & Waterfall'
          ]
        },
        { 
          day: 'Day 2: Tirumala Hill Ascent & Balaji Darshan', 
          detail: 'Early morning ascent up Tirumala 1st ghat road. Driver assists with parking and baggage safety. Special entry / Seeghra darshan of Lord Venkateswara. Return via Srikalahasti and safe doorstep drop by 10:00 PM.',
          places: [
            'Tirumala Lord Venkateswara Swamy Main Sanctum',
            'Srikalahasti Temple (Rahu-Ketu Kshetra)',
            'Doorstep Drop in Guntur / Vijayawada'
          ]
        }
      ],
      includes: [
        'Round-trip AC cab with private chauffeur',
        'Driver bhatta & night halt charges included',
        'Tirumala ghat road toll clearances',
        'Doorstep pickup and return drop'
      ],
      excludes: [
        'Special entry darshan tickets (TTD)',
        'Hotel room stay in Tirupati',
        'Personal food, pooja and tonsuring charges'
      ]
    },
    {
      id: 'srisailam',
      title: 'Srisailam Jyotirlinga Mallikarjuna Swamy',
      badge: 'Sacred Jyotirlinga',
      image: '/assets/images/srisailam.jpg',
      mapQuery: 'Srisailam+Mallikarjuna+Temple,+Andhra+Pradesh',
      duration: '2 Days / 1 Night (or 1 Day Express)',
      distance: '220 Kms (One-Way)',
      rates: {
        'swift-dzire': 4499,
        'maruti-ertiga': 5999,
        'innova-crysta': 7999,
        'tempo-traveller': 11999,
        'kia-carens': 6499
      },
      tagline: 'Dense Nallamala Forest Drive • Pathalaganga Holy River • Ghat Chauffeurs',
      desc: 'Journey through the dense Nallamala forest reserve to the sacred Jyotirlinga and Bhramaramba Shakti Peetham with certified hill chauffeurs.',
      visitingSpots: [
        { 
          name: '1. Mallikarjuna Swamy Temple', 
          desc: '2nd of 12 sacred Jyotirlingas of Lord Shiva in India.',
          image: '/assets/images/srisailam.jpg'
        },
        { 
          name: '2. Bhramaramba Devi Shakti Peetham', 
          desc: 'One of the revered 18 Maha Shakti Peethams within the temple complex.',
          image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '3. Pathalaganga Krishna River', 
          desc: 'Holy river bath point reachable via stone steps or scenic ropeway.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '4. Srisailam Hydro Dam Viewpoint', 
          desc: 'Massive Krishna River hydroelectric dam framed by mountain gorges.',
          image: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '5. Sakshi Ganapathi & Shikhareswaram', 
          desc: 'Highest peak of Srisailam hills with panoramic forest and valley views.',
          image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=600&auto=format&fit=crop&q=80'
        }
      ],
      itinerary: [
        { 
          day: 'Day 1: Forest Drive & Jyotirlinga Darshan', 
          detail: 'Morning pickup at 6:00 AM. Cross Dornala forest checkpost and drive past scenic Nallamala ghat curves. Reach Srisailam by 11:30 AM. Check-in, holy river bath at Pathalaganga, and evening Mallikarjuna Swamy Darshan.',
          places: [
            'Mallikarjuna Swamy Jyotirlinga Temple',
            'Bhramaramba Devi Shakti Peetham',
            'Pathalaganga Krishna River & Ropeway'
          ]
        },
        { 
          day: 'Day 2: Local Sightseeing & Return Journey', 
          detail: 'Morning visit to Sakshi Ganapathi, Shikhareswaram viewpoint, Paladhara Panchadhara, and Srisailam Dam. Depart by 2:00 PM for safe doorstep arrival by 7:30 PM.',
          places: [
            'Sakshi Ganapathi Temple',
            'Shikhareswaram Panoramic Hilltop Peak',
            'Srisailam Hydro Dam Viewpoint',
            'Paladhara Panchadhara Waterfalls'
          ]
        }
      ],
      includes: [
        'AC car with ghat-road certified chauffeur',
        'Forest checkpost & toll clearances',
        'Driver food and night allowance',
        'Local sightseeing coverage'
      ],
      excludes: [
        'Abhishekam / Sparsha darshan tickets',
        'Hotel accommodation',
        'Boating & ropeway charges'
      ]
    },
    {
      id: 'hyderabad',
      title: 'Hyderabad City, RGIA Airport & Ramoji Film City',
      badge: 'Heritage & Business Corridor',
      image: '/assets/images/hyderabad.jpg',
      mapQuery: 'Charminar,+Hyderabad,+Telangana',
      duration: 'Flexible 1-3 Days',
      distance: '280 Kms (One-Way)',
      rates: {
        'swift-dzire': 4199,
        'maruti-ertiga': 5799,
        'innova-crysta': 7699,
        'tempo-traveller': 11499,
        'kia-carens': 6299
      },
      tagline: 'ORR Expressway Cruising • Airport Drop • Ramoji Day Tours',
      desc: 'High-speed expressway transfer and city tour from Vijayawada / Guntur to Hyderabad, Rajiv Gandhi International Airport (Shamshabad), and Ramoji Film City.',
      visitingSpots: [
        { 
          name: '1. Charminar & Laad Bazaar', 
          desc: 'Iconic 16th-century four-minaret monument and heritage pearl markets.',
          image: '/assets/images/hyderabad.jpg'
        },
        { 
          name: '2. Golconda Fort & Sound Show', 
          desc: 'Acoustic marvel fortress of the medieval Qutb Shahi dynasty.',
          image: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '3. Ramoji Film City', 
          desc: 'Guinness world record largest film studio theme park.',
          image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '4. Birla Mandir & Hussain Sagar', 
          desc: 'White marble hilltop temple overlooking Buddha statue lake.',
          image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '5. Rajiv Gandhi Int. Airport (RGIA)', 
          desc: 'Direct departures & arrivals at Shamshabad airport terminals.',
          image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80'
        }
      ],
      itinerary: [
        { 
          day: 'Day 1: Direct Transfer & City Heritage Monuments', 
          detail: 'Pickup from Guntur / Vijayawada. Smooth cruising on NH 65 expressway via Suryapet. Arrive at Hyderabad or Shamshabad Airport in 4.5 hours with refreshment halt. Afternoon heritage sightseeing.',
          places: [
            'Charminar & Laad Bazaar',
            'Birla Mandir & Hussain Sagar',
            'Rajiv Gandhi Int. Airport (RGIA Shamshabad)'
          ]
        },
        { 
          day: 'Day 2: Historic Forts & Entertainment Studios', 
          detail: 'Full-day standby chauffeur for Charminar, Salar Jung Museum, Golconda Fort, and evening shopping in Banjara Hills / Hitec City.',
          places: [
            'Golconda Fort & Acoustic Sound Show',
            'Ramoji Film City Studio Theme Park'
          ]
        }
      ],
      includes: [
        'High-speed expressway toll charges included',
        'Fuel and commercial permit clearances',
        'Courteous multilingual driver'
      ],
      excludes: [
        'Monument and studio entry tickets',
        'Parking charges in commercial malls'
      ]
    },
    {
      id: 'visakhapatnam',
      title: 'Visakhapatnam (Vizag) & Araku Valley',
      badge: 'Coastal & Hill Station Tour',
      image: '/assets/images/vizag.jpg',
      mapQuery: 'RK+Beach,+Visakhapatnam,+Andhra+Pradesh',
      duration: '3 Days / 2 Nights',
      distance: '370 Kms (One-Way)',
      rates: {
        'swift-dzire': 5899,
        'maruti-ertiga': 7899,
        'innova-crysta': 10999,
        'tempo-traveller': 14999,
        'kia-carens': 8499
      },
      tagline: 'RK Beach Drive • Borra Caves • Coffee Plantations • Ghat Chauffeurs',
      desc: 'The ultimate coastal and hill station holiday. Explore the pristine beaches of Vizag and ascend the breathtaking Ananthagiri ghats to Araku Valley.',
      visitingSpots: [
        { 
          name: '1. Ramakrishna (RK) Beach & Submarine', 
          desc: 'Scenic seaside drive and historic INS Kursura submarine museum.',
          image: '/assets/images/vizag.jpg'
        },
        { 
          name: '2. Kailasagiri Hilltop Park', 
          desc: 'Panoramic viewpoint overlooking the Bay of Bengal coastline.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '3. Rushikonda Beach & Sea Drive', 
          desc: 'Golden sand beach known for safe water sports and coastline views.',
          image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '4. Borra Caves (Araku)', 
          desc: 'Spectacular limestone stalactite and stalagmite geological caves.',
          image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '5. Araku Coffee Plantations', 
          desc: 'Aromatic hillside coffee estates and tribal museum exhibits.',
          image: 'https://images.unsplash.com/photo-1524350876685-274059332603?w=600&auto=format&fit=crop&q=80'
        }
      ],
      itinerary: [
        { 
          day: 'Day 1: Coast Highway to Vizag & Beachside Drive', 
          detail: 'Early morning departure from Guntur/Vijayawada via NH 16. Reach Vizag by 1:30 PM. Evening sea walk at RK Beach, Submarine museum, and Kailasagiri ropeway.',
          places: [
            'Ramakrishna (RK) Beach & INS Kursura Submarine',
            'Kailasagiri Hilltop Park & Ropeway',
            'Rushikonda Beach & Sea Drive'
          ]
        },
        { 
          day: 'Day 2: Araku Ghat Ascent & Borra Caves', 
          detail: 'Ascend the picturesque Ananthagiri ghats. Explore Borra Caves, Katiki waterfalls, and Araku Valley tribal museum. Overnight stay in Araku resort.',
          places: [
            'Borra Caves (Limestone Stalactites)',
            'Katiki Waterfalls & Ananthagiri Ghats',
            'Araku Valley Tribal Museum'
          ]
        },
        { 
          day: 'Day 3: Coffee Gardens & Safe Return Journey', 
          detail: 'Morning visit to Chaparai water cascades and organic coffee plantations. Return highway cruising to Guntur / Vijayawada.',
          places: [
            'Araku Organic Coffee Plantations',
            'Chaparai Water Cascades',
            'Doorstep Drop in Guntur / Vijayawada'
          ]
        }
      ],
      includes: [
        'Dedicated AC car with hill-certified chauffeur',
        'All NH16 tolls and ghat road taxes',
        'Driver night halt & bhatta charges'
      ],
      excludes: [
        'Resort stay & Araku train tickets',
        'Cave entry tickets and camera fees'
      ]
    },
    {
      id: 'vijayawada-kanakadurgamma',
      title: 'Vijayawada Kanaka Durga Temple & Amaravati',
      badge: 'Day Pilgrimage & Heritage',
      image: '/assets/images/vijayawada.jpg',
      mapQuery: 'Kanaka+Durga+Temple,+Vijayawada,+Andhra+Pradesh',
      duration: 'Same Day Express (8–10 Hrs)',
      distance: '45 Kms (Local / Outstation)',
      rates: {
        'swift-dzire': 999,
        'maruti-ertiga': 1499,
        'innova-crysta': 2199,
        'tempo-traveller': 3499,
        'kia-carens': 1799
      },
      tagline: 'Indrakeeladri Hill Temple • Undavalli Caves • Prakasham Barrage',
      desc: 'Convenient same-day pilgrimage and local heritage tour covering the world-famous Kanaka Durga temple atop Indrakeeladri hill, historic Buddhist rock-cut caves, and the Amaravati capital region.',
      visitingSpots: [
        { 
          name: '1. Sri Durga Malleswara Temple', 
          desc: 'Sacred shrine atop Indrakeeladri hill overlooking Krishna river.',
          image: '/assets/images/vijayawada.jpg'
        },
        { 
          name: '2. Undavalli Rock-Cut Caves', 
          desc: 'Ancient 7th-century monolithic sandstone cave sculptures.',
          image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '3. Prakasham Barrage & Riverfront', 
          desc: 'Iconic barrage connecting Krishna and Guntur districts.',
          image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '4. Amaravati Mahachaitya & Dhyana Buddha', 
          desc: 'Ancient 2000-year-old Buddhist stupa and 125ft Buddha statue.',
          image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?w=600&auto=format&fit=crop&q=80'
        },
        { 
          name: '5. Bhavani Island Park', 
          desc: 'River island leisure park with boating and green nature walks.',
          image: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?w=600&auto=format&fit=crop&q=80'
        }
      ],
      itinerary: [
        { 
          day: 'Day 1: Same Day Pilgrimage & Capital Heritage Tour', 
          detail: 'Morning 7:30 AM pickup from your doorstep in Guntur or Vijayawada. Special darshan assistance at Indrakeeladri Durga temple. Afternoon visit to Undavalli Caves and Amaravati heritage monuments. Drop back at your doorstep by 6:00 PM.',
          places: [
            'Sri Durga Malleswara Temple (Indrakeeladri)',
            'Undavalli Monolithic Rock-Cut Caves',
            'Prakasham Barrage & Krishna Riverfront',
            'Amaravati Mahachaitya & 125ft Dhyana Buddha',
            'Bhavani Island River Leisure Park'
          ]
        }
      ],
      includes: [
        'Doorstep pickup and return drop',
        'Driver allowance and city parking',
        'Chilled AC car at your service all day'
      ],
      excludes: [
        'Special darshan tickets',
        'Bhavani Island boat ride tickets'
      ]
    },
    {
      id: 'bengaluru-chennai',
      title: 'Bengaluru & Chennai Interstate Drop / Round',
      badge: 'Interstate Permit',
      image: '/assets/images/bangalore_chennai.jpg',
      mapQuery: 'Bengaluru,+Karnataka',
      duration: 'Overnight / Multi-Day',
      distance: '580 Kms / 390 Kms',
      rates: {
        'swift-dzire': 6999,
        'maruti-ertiga': 8999,
        'innova-crysta': 12499,
        'tempo-traveller': 18999,
        'kia-carens': 9499
      },
      tagline: 'All-India Tourist Permit • Doorstep Drop • Smooth Highway Cruisers',
      desc: 'Safe, interstate family and business car travel from Andhra Pradesh to Bengaluru and Chennai with licensed interstate drivers.',
      visitingSpots: [
        { 
          name: '1. Doorstep Pickup in AP', 
          desc: 'Pickup anywhere across Guntur, Vijayawada, or Amaravati region.',
          image: '/assets/images/hero-bg.jpg'
        },
        { 
          name: '2. National Highway 16 & 44', 
          desc: 'Smooth high-speed expressway corridors with clean food plaza stops.',
          image: '/assets/images/bangalore_chennai.jpg'
        },
        { 
          name: '3. Direct Destination Drop', 
          desc: 'Direct doorstep drop in Bengaluru (Electronic City, Whitefield) or Chennai.',
          image: 'https://images.unsplash.com/photo-1596176530529-78163a4f7af2?w=600&auto=format&fit=crop&q=80'
        }
      ],
      itinerary: [
        { 
          day: 'Day 1: Direct Inter-State Highway Cruise', 
          detail: 'Flexible pickup time. Chauffeur handles all state border taxes, fastag tolls, and provides smooth highway cruising with required refreshment halts directly to your destination.',
          places: [
            'Doorstep Pickup across Guntur / Vijayawada / Amaravati',
            'National Highway 16 & NH 44 High-Speed Expressway',
            'Direct Doorstep Drop in Bengaluru (Whitefield, E-City) or Chennai'
          ]
        }
      ],
      includes: [
        'Inter-State Tourist Permit clearances',
        'Dedicated commercial yellow-plate vehicle',
        'Experienced national highway chauffeur'
      ],
      excludes: [
        'Border entry road taxes (payable at actual state checkposts)',
        'Personal meals and refreshments'
      ]
    }
  ];

  const currentTour = tourPackages.find((t) => t.id === activeTour) || tourPackages[0];
  const activeCar = FLEET_VEHICLES.find((v) => v.id === selectedVehicle) || FLEET_VEHICLES[0];
  const currentFare = currentTour.rates[selectedVehicle] || currentTour.rates['swift-dzire'];

  const handleOpenBooking = (vehicleOverride = null) => {
    const carToBook = vehicleOverride || activeCar;
    const fareToBook = currentTour.rates[carToBook.id] || currentTour.rates['swift-dzire'];

    if (onOpenBookingModal) {
      onOpenBookingModal({
        tourPackage: currentTour.title,
        destination: currentTour.title,
        serviceType: 'Tour Package',
        vehicle: carToBook.name,
        fare: fareToBook,
        pickup: 'Guntur / Vijayawada'
      });
    } else {
      const msg = `*TOUR PACKAGE BOOKING REQUEST* 🧳\n*Sri Venkateswara Car Travels*\n\n• *Tour Package:* ${currentTour.title}\n• *Selected Vehicle:* ${carToBook.name}\n• *Package Price:* ₹${fareToBook.toLocaleString()} (All-Inclusive Base)\n• *Pickup Location:* Guntur / Vijayawada\n\nPlease confirm car availability and driver dispatch details.`;
      openWhatsApp(msg);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Hero Banner */}
      <section className="bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white pt-28 pb-10 px-4 md:px-8 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="container mx-auto max-w-6xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-blue-400 text-xs font-bold shadow-sm mb-3">
            <span>PILGRIMAGE &amp; HOLIDAY TOUR PACKAGES</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white font-heading">
            Andhra &amp; South India <span className="text-amber-400">Tour Packages</span>
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto mt-2.5 font-medium leading-relaxed">
            Select your destination below to explore scenic spot photos, day-wise itineraries, live route map, and transparent car booking options.
          </p>

          {/* Destination Selector: GRID with Landmark Photos and small letters */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5 sm:gap-3 mt-6 max-w-5xl mx-auto">
            {tourPackages.map((pkg) => {
              const isSelected = activeTour === pkg.id;
              return (
                <div
                  key={pkg.id}
                  onClick={() => {
                    setActiveTour(pkg.id);
                    const el = document.getElementById('tour-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className={`group relative rounded-2xl overflow-hidden p-2 sm:p-2.5 transition-all duration-300 cursor-pointer flex flex-col items-center text-center border ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 border-amber-300 shadow-lg shadow-amber-500/25 scale-[1.04] ring-2 ring-amber-400'
                      : 'bg-slate-900/90 text-slate-200 hover:bg-slate-800 border-slate-700/80 hover:border-amber-400/50'
                  }`}
                >
                  {/* Photo thumbnail */}
                  <div className="w-full h-18 sm:h-20 rounded-xl overflow-hidden relative mb-2 shadow-xs">
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <span className="absolute bottom-1 right-1 text-[9px] font-black px-1.5 py-0.5 rounded bg-black/70 text-amber-300">
                      ₹{pkg.rates['swift-dzire']?.toLocaleString()}
                    </span>
                  </div>

                  {/* Destination Name in small bold letters */}
                  <div className={`text-[11px] sm:text-xs font-black tracking-tight leading-tight line-clamp-1 ${
                    isSelected ? 'text-slate-950' : 'text-white'
                  }`}>
                    {pkg.title.split('&')[0].trim()}
                  </div>

                  {/* Subtext info */}
                  <div className={`text-[9.5px] font-semibold mt-0.5 line-clamp-1 ${
                    isSelected ? 'text-slate-800' : 'text-slate-400'
                  }`}>
                    {pkg.badge}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Tour Details Content */}
      <section id="tour-showcase" className="container mx-auto px-4 md:px-8 py-8 sm:py-10 max-w-6xl">
        
        {/* Active Tour Header Card with Landmark Photo */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-xl mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            
            {/* Landmark Image Hero */}
            <div className="lg:col-span-5 relative min-h-[240px] sm:min-h-[300px] overflow-hidden">
              <img
                src={currentTour.image}
                alt={currentTour.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent"></div>
              
              <div className="absolute top-4 left-4">
                <span className="bg-amber-500 text-slate-950 font-black text-xs uppercase px-3.5 py-1 rounded-full shadow-md">
                  {currentTour.badge}
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="text-[11px] text-amber-300 font-bold uppercase tracking-wider">Selected Destination</div>
                <div className="text-xl sm:text-2xl font-black drop-shadow-md leading-tight">{currentTour.title}</div>
              </div>
            </div>

            {/* Tour Quick Specs & Overview */}
            <div className="lg:col-span-7 p-6 sm:p-7 flex flex-col justify-between">
              <div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">{currentTour.tagline}</div>
                <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-heading mt-1 leading-tight">
                  {currentTour.title}
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 font-medium leading-relaxed">
                  {currentTour.desc}
                </p>

                {/* Key Metrics Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
                  <div className="p-3 rounded-2xl bg-amber-50 border border-amber-200/80">
                    <div className="text-[10px] text-amber-800 uppercase font-black">DURATION</div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{currentTour.duration}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-blue-50 border border-blue-200/80">
                    <div className="text-[10px] text-blue-800 uppercase font-black">DISTANCE</div>
                    <div className="text-xs sm:text-sm font-black text-slate-900 mt-0.5">{currentTour.distance}</div>
                  </div>
                  <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200/80 col-span-2 sm:col-span-1">
                    <div className="text-[10px] text-emerald-800 uppercase font-black">DRIVER BHATTA</div>
                    <div className="text-xs sm:text-sm font-black text-emerald-900 mt-0.5">INCLUDED</div>
                  </div>
                </div>
              </div>

              {/* Bottom Quick Action */}
              <div className="pt-5 mt-5 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="text-xs text-slate-500 font-medium">
                  Starting from <strong className="text-lg font-black text-blue-600">₹{currentTour.rates['swift-dzire']?.toLocaleString()}</strong> all-inclusive
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenBooking()}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 cursor-pointer"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Book This Tour</span>
                  </button>
                  <a
                    href="#book-cars"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md shadow-blue-500/20"
                  >
                    <Car className="w-4 h-4" />
                    <span>View Cars Below</span>
                  </a>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Day-Wise Itinerary with Places Visited & Route Details (Integrated into Day 1, Day 2, Day 3) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mb-8">
          
          {/* Left Column: Day-Wise Journey Itinerary with Places Visited */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <span>Day-by-Day Journey &amp; Places Covered</span>
              </h3>
              <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                Doorstep Pickup Included
              </span>
            </div>

            <div className="space-y-3.5">
              {currentTour.itinerary.map((item, idx) => (
                <div key={idx} className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200/80 space-y-2.5 hover:border-blue-300 transition-colors">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-black text-xs sm:text-sm text-blue-600 uppercase tracking-wide">
                      {item.day}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                      Day #{idx + 1}
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed font-medium">
                    {item.detail}
                  </p>

                  {/* Places Covered for this Day */}
                  {item.places && item.places.length > 0 && (
                    <div className="pt-2.5 border-t border-slate-200/70">
                      <div className="text-[10px] font-black uppercase text-blue-800 tracking-wider mb-1.5 flex items-center gap-1">
                        <MapPin className="w-3.5 h-3.5 text-blue-600" />
                        <span>Places Covered on {item.day.split(':')[0]}:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {item.places.map((place, pIdx) => (
                          <span
                            key={pIdx}
                            className="text-xs font-bold bg-white text-slate-800 border border-slate-200/90 px-2.5 py-1 rounded-xl shadow-2xs flex items-center gap-1.5 hover:border-amber-400 transition-colors"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                            <span>{place}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Route Information & Driver Promise (Clean card without map) */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-sm space-y-4">
            <h3 className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Navigation className="w-5 h-5 text-emerald-600" />
              <span>Travel Route &amp; Chauffeur Promise</span>
            </h3>

            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <span className="text-base">📍</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Doorstep Pickup:</strong>
                  Anywhere across Guntur, Vijayawada, Mangalagiri, or Amaravati region.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <span className="text-base">🛣️</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Highway &amp; Ghat Cruising:</strong>
                  Experienced drivers certified for steep ghats (Tirumala / Srisailam) and expressways.
                </div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-start gap-2.5">
                <span className="text-base">🕒</span>
                <div>
                  <strong className="text-slate-900 block font-bold">Flexible Timings:</strong>
                  We align with your temple darshan tickets, family comfort, and food halts.
                </div>
              </div>

              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200/70 text-emerald-900 font-semibold flex items-center justify-between">
                <span>Driver Bhatta &amp; Night Stay:</span>
                <span className="font-black text-emerald-700">INCLUDED ✓</span>
              </div>
            </div>
          </div>

        </div>

        {/* Inclusions & Exclusions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-white rounded-3xl p-5 border border-emerald-200/80 bg-emerald-50/20 space-y-3">
            <h4 className="text-xs font-black text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>WHAT IS INCLUDED:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              {currentTour.includes.map((inc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-emerald-600 font-bold">✓</span>
                  <span>{inc}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl p-5 border border-rose-200/80 bg-rose-50/20 space-y-3">
            <h4 className="text-xs font-black text-rose-900 uppercase tracking-wider flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-500" />
              <span>WHAT IS EXCLUDED:</span>
            </h4>
            <ul className="space-y-2 text-xs text-slate-700 font-medium">
              {currentTour.excludes.map((exc, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-rose-500 font-bold">✕</span>
                  <span>{exc}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ========================================================================
             BOTTOM VEHICLE SELECTION CARDS (Kinda Cars Book Cheshukovataniki)
             ======================================================================== */}
        <div id="book-cars" className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md scroll-mt-24">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 border-b border-slate-100 pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-black uppercase mb-1">
                <Car className="w-3.5 h-3.5" />
                <span>Select Your Travel Vehicle</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-heading">
                Cars Available for {currentTour.title.split('&')[0]} Package
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                All vehicles come sanitized with experienced highway/ghat chauffeurs and luggage capacity.
              </p>
            </div>

            <div className="text-xs font-bold text-slate-500">
              Package includes: <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md font-black">Driver Bhatta Included</span>
            </div>
          </div>

          {/* Cars Grid with Front-Angle Car Images */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FLEET_VEHICLES.map((vehicle) => {
              const carPrice = currentTour.rates[vehicle.id] || currentTour.rates['swift-dzire'] || 5000;
              const isSelected = selectedVehicle === vehicle.id;

              return (
                <div
                  key={vehicle.id}
                  onClick={() => setSelectedVehicle(vehicle.id)}
                  className={`rounded-2xl border p-3.5 sm:p-4 transition-all duration-300 flex flex-col justify-between cursor-pointer group relative overflow-hidden ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/20 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-blue-300 bg-white hover:shadow-sm'
                  }`}
                >
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                      {vehicle.categoryLabel}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                      {vehicle.seats}
                    </span>
                  </div>

                  {/* Car Image */}
                  <div className="h-28 sm:h-32 my-1 flex items-center justify-center relative overflow-hidden rounded-xl bg-slate-50 border border-slate-100 p-2">
                    <img
                      src={vehicle.image}
                      alt={vehicle.name}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      loading="lazy"
                    />
                  </div>

                  {/* Specs & Info */}
                  <div className="space-y-1.5 mt-1.5">
                    <h4 className="text-xs sm:text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors leading-tight">
                      {vehicle.name}
                    </h4>

                    <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] text-slate-500 font-medium">
                      <span>❄ {vehicle.acType}</span>
                      <span>•</span>
                      <span>🧳 {vehicle.luggage}</span>
                    </div>

                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
                      <div>
                        <span className="text-[8.5px] font-black uppercase text-slate-400 block leading-none">ALL-INCLUSIVE</span>
                        <span className="text-sm sm:text-base font-black text-blue-600">₹{carPrice.toLocaleString()}</span>
                      </div>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedVehicle(vehicle.id);
                          handleOpenBooking(vehicle);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-sm cursor-pointer"
                      >
                        Book Car
                      </button>
                    </div>

                    {/* Mobile Expand Downwards on click (User requested) */}
                    {isSelected && (
                      <div className="pt-2 mt-2 border-t border-blue-100 space-y-1.5 block sm:hidden animate-fade-in">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenBooking(vehicle);
                          }}
                          className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-2 rounded-xl text-xs font-black flex items-center justify-center gap-1 shadow-sm"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Book on WhatsApp</span>
                        </button>
                        <a
                          href={`tel:${CONTACT_INFO.primaryPhoneRaw}`}
                          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-800 py-1.5 rounded-xl text-[11px] font-bold flex items-center justify-center gap-1"
                        >
                          <Phone className="w-3 h-3 text-blue-600" />
                          <span>Call Helpline</span>
                        </a>
                      </div>
                    )}

                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </section>

    </div>
  );
}