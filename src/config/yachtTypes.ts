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
  experience: "14 years with JamesEdition",
  description: "White Streams has long been a leader in the yachting industry with a rich family history dating back to 1948. Today, the company provides complete yachting services worldwide, including superyacht sales, yacht charter, crew placement, and new construction.",
  address: "India"
};