import { JetListing } from './types';

export const jetListings: JetListing[] = [
  {
    id: 'gulfstream-g700',
    title: "Gulfstream G700",
    location: "Geneva, Switzerland",
    year: "2024",
    specs: ["Range: 7,500nm", "Mach 0.925", "19 Passengers"],
    images: [
      "https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1583727796345-0e0525624921?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "The Gulfstream G700 represents the pinnacle of business aviation. With the industry's most spacious cabin and longest range at the fastest speeds, it sets new standards in the ultra-long-range segment.",
    specifications: [
      { label: "Year", value: "2024" },
      { label: "Range", value: "7,500 nautical miles" },
      { label: "Maximum Speed", value: "Mach 0.925" },
      { label: "Passengers", value: "19" },
      { label: "Cabin Length", value: "56'11\"" },
      { label: "Cabin Height", value: "6'3\"" }
    ],
    features: [
      "Circadian lighting system",
      "20 panoramic windows",
      "Ultra-galley",
      "Master suite with shower",
      "Supersonic connectivity",
      "Advanced air purification"
    ],
    visible: true
  },
  {
    id: 'bombardier-global-8000',
    title: "Bombardier Global 8000",
    location: "Dubai, UAE",
    year: "2024",
    specs: ["Range: 8,000nm", "Mach 0.94", "4 Living Areas"],
    images: [
      "https://images.unsplash.com/photo-1625001595531-d0e6511b0b45?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1625001595531-d0e6511b0b45?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "The Global 8000 is the world's fastest and longest-range purpose-built business jet. It features an innovative four-zone cabin designed for maximum comfort during ultra-long-range flights.",
    specifications: [
      { label: "Year", value: "2024" },
      { label: "Range", value: "8,000 nautical miles" },
      { label: "Maximum Speed", value: "Mach 0.94" },
      { label: "Passengers", value: "17" },
      { label: "Living Areas", value: "4" }
    ],
    features: [
      "Soleil lighting system",
      "4K entertainment system",
      "Principal suite",
      "Conference suite",
      "Zero-gravity position seats",
      "Nuage seating"
    ],
    visible: true
  }
];