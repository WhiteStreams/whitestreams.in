export interface YachtSpecification {
  label: string;
  value: string;
}

export interface YachtListing {
  id: string;
  title: string;
  location: string;
  year?: string;
  specs: string[];
  images: string[];
  description: string;
  specifications: YachtSpecification[];
  features?: string[];
  visible?: boolean;
}

export interface Seller {
  name: string;
  experience: string;
  description: string;
  address: string;
}

export const defaultSeller: Seller = {
  name: "White Streams",
  experience: "Premier Luxury Marketplace",
  description: "White Streams is the world's leading luxury marketplace, connecting sophisticated buyers with extraordinary luxury across real estate, super cars, precious metals, yachts, and private jets.",
  address: "India"
};