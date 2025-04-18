export interface RealEstateListing {
  id: string;
  title: string;
  location: string;
  specs: string[];
  images: string[];
  description: string;
  specifications: Specification[];
  features?: string[];
  visible?: boolean;
}

export interface CarListing {
  id: string;
  title: string;
  location: string;
  year: string;
  specs: string[];
  images: string[];
  description: string;
  specifications: Specification[];
  features?: string[];
  visible?: boolean;
}

export interface GoldListing {
  id: string;
  title: string;
  location: string;
  specs: string[];
  images: string[];
  description: string;
  specifications: Specification[];
  features?: string[];
  visible?: boolean;
}

export interface JetListing {
  id: string;
  title: string;
  location: string;
  year: string;
  specs: string[];
  images: string[];
  description: string;
  specifications: Specification[];
  features?: string[];
  visible?: boolean;
}

export interface Specification {
  label: string;
  value: string;
}

export const defaultSeller: Seller = {
  name: "White Streams",
  experience: "Premier Luxury Marketplace",
  description: "White Streams is India's leading luxury marketplace, connecting sophisticated buyers with extraordinary luxury across real estate, automobiles, precious metals, yachts, and private jets.",
  address: "India"
};