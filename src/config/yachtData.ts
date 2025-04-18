import { YachtListing } from './yachtTypes';

export const yachtListings: YachtListing[] = [
  {
    id: 'benetti-oasis-40m',
    title: "Benetti Oasis 40M",
    location: "Fort Lauderdale, United States",
    year: "2024",
    specs: ["Length: 40.8m", "Guests: 10", "Cabins: 5"],
    images: [
      "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "The Oasis 40M represents a new vision of the relationship between owner and sea. The revolutionary beach area close to the water creates an infinity pool effect while maintaining all the amenities of a superyacht. The main deck offers an unparalleled indoor-outdoor experience with floor-to-ceiling windows and sliding glass doors.",
    specifications: [
      { label: "Length", value: "40.8m (133'10\")" },
      { label: "Beam", value: "8.5m (27'11\")" },
      { label: "Draft", value: "2.14m (7')" },
      { label: "Year", value: "2024" },
      { label: "Builder", value: "Benetti" },
      { label: "Guests", value: "10" },
      { label: "Cabins", value: "5" },
      { label: "Crew", value: "7" }
    ],
    features: [
      "Infinity pool with beach club",
      "Zero speed stabilizers",
      "Touch-and-go helipad",
      "Master suite with private terrace",
      "Gym with sea view",
      "Latest entertainment systems"
    ],
    visible: true
  },
  {
    id: 'sanlorenzo-62steel',
    title: "Sanlorenzo 62Steel",
    location: "Monaco",
    year: "2023",
    specs: ["Length: 61.5m", "Guests: 12", "Cabins: 6"],
    images: [
      "https://images.unsplash.com/photo-1599687267812-35c05ff70ee9?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "The 62Steel offers exceptional volumes combined with elegant lines. The owner's apartment is a private oasis covering 210 square meters, with 180° views forward. The beach club and wellness area span over 100 square meters with direct sea access.",
    specifications: [
      { label: "Length", value: "61.5m (201'9\")" },
      { label: "Beam", value: "11.9m (39')" },
      { label: "Draft", value: "3.2m (10'6\")" },
      { label: "Year", value: "2023" },
      { label: "Builder", value: "Sanlorenzo" },
      { label: "Guests", value: "12" },
      { label: "Cabins", value: "6" },
      { label: "Crew", value: "14" }
    ],
    features: [
      "Owner's private deck",
      "Glass-bottom pool",
      "Beach club with gym",
      "Cinema room",
      "Elevator to all decks",
      "Touch-and-go helipad"
    ],
    visible: true
  }
];