import { CarListing } from './types';

export const carListings: CarListing[] = [
  {
    id: 'bugatti-mistral',
    title: "Bugatti Mistral Roadster",
    location: "Dubai, UAE",
    year: "2024",
    specs: ["W16 Engine", "1,600 HP", "Limited Edition"],
    images: [
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "The Bugatti Mistral represents the last of the W16 engine era. This roadster combines ultimate performance with unmatched exclusivity, limited to only 99 units worldwide. The Mistral's design pays homage to Bugatti's rich heritage while embracing modern engineering excellence.",
    specifications: [
      { label: "Engine", value: "8.0L W16 Quad-Turbo" },
      { label: "Power", value: "1,600 HP" },
      { label: "Transmission", value: "7-speed DSG" },
      { label: "0-100 km/h", value: "2.4 seconds" },
      { label: "Top Speed", value: "420+ km/h" },
      { label: "Production", value: "Limited to 99 units" }
    ],
    features: [
      "Carbon fiber monocoque",
      "Removable roof panels",
      "Horseshoe grille in black",
      "X-shaped LED tail lights",
      "Hand-crafted interior",
      "Exclusive paint options"
    ],
    visible: true
  },
  {
    id: 'rolls-royce-spectre',
    title: "Rolls-Royce Spectre",
    location: "London, United Kingdom",
    year: "2024",
    specs: ["Electric", "577 HP", "Bespoke Interior"],
    images: [
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1631295868223-63265b40d9e4?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "The first all-electric Rolls-Royce, the Spectre represents a new era of luxury. This ultra-luxury electric super coupé combines zero-emission performance with the marque's signature comfort and presence.",
    specifications: [
      { label: "Powertrain", value: "Dual Motor Electric" },
      { label: "Power", value: "577 HP" },
      { label: "Torque", value: "900 Nm" },
      { label: "Range", value: "520 km (WLTP)" },
      { label: "0-100 km/h", value: "4.5 seconds" }
    ],
    features: [
      "Starlight Doors",
      "Illuminated Pantheon Grille",
      "Planar Suspension",
      "Spirit of Ecstasy in aerodynamic form",
      "Bespoke interior options",
      "Advanced digital architecture"
    ],
    visible: true
  }
];