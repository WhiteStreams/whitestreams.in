import { GoldListing } from './types';

export const goldListings: GoldListing[] = [
  {
    id: 'gold-investment-portfolio',
    title: "Premium Gold Investment Portfolio",
    location: "Zurich, Switzerland",
    specs: ["999.9 Purity", "100kg Minimum", "Secured Storage"],
    images: [
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "A curated gold investment portfolio featuring London Good Delivery bars stored in high-security vaults in Switzerland. Complete with real-time monitoring and insurance coverage.",
    specifications: [
      { label: "Product Type", value: "Physical Gold Bars" },
      { label: "Purity", value: "999.9 fine gold" },
      { label: "Bar Size", value: "400 oz (12.4 kg)" },
      { label: "Certification", value: "LBMA Certified" },
      { label: "Storage", value: "Zurich Free Port" }
    ],
    features: [
      "LBMA Chain of Custody",
      "24/7 monitoring",
      "Full insurance coverage",
      "Quarterly audits",
      "Physical delivery option",
      "Digital ownership certificates"
    ],
    visible: true
  },
  {
    id: 'numismatic-collection',
    title: "Rare Gold Coin Collection",
    location: "Geneva, Switzerland",
    specs: ["Museum Grade", "Historical", "Certified"],
    images: [
      "https://images.unsplash.com/photo-1624365169364-0640dd10e180?auto=format&fit=crop&q=80&w=2000",
      "https://images.unsplash.com/photo-1624365169364-0640dd10e180?auto=format&fit=crop&q=80&w=2000"
    ],
    description: "An exceptional collection of historical gold coins, including rare specimens from ancient civilizations to modern commemorative pieces. Each coin is professionally graded and certified.",
    specifications: [
      { label: "Collection Size", value: "50 pieces" },
      { label: "Time Period", value: "1700-1933" },
      { label: "Certification", value: "NGC/PCGS" },
      { label: "Condition", value: "MS-65 to MS-70" }
    ],
    features: [
      "Museum-grade specimens",
      "Historical documentation",
      "Professional certification",
      "Secure display cases",
      "Insurance included",
      "Private viewing available"
    ],
    visible: true
  }
];