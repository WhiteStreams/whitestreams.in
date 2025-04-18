import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { realEstateListings } from '../config/realEstateData';
import { defaultSeller } from '../config/types';

function RealEstateListing() {
  const navigate = useNavigate();
  const visibleListings = realEstateListings.filter(listing => listing.visible !== false);

  return (
    <CategoryLayout
      title="Luxury Real Estate"
      subtitle="Explore exclusive properties and premium real estate listings worldwide"
      backgroundImage="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => navigate(`/real-estate/${listing.id}`)}
            className="cursor-pointer"
          >
            <ListingCard 
              title={listing.title}
              location={listing.location}
              specs={listing.specs}
              images={listing.images}
            />
          </div>
        ))}
      </div>
    </CategoryLayout>
  );
}

function RealEstateDetail() {
  const { id } = useParams();
  const property = realEstateListings.find(p => p.id === id && p.visible !== false);

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <ProductDetail
      title={property.title}
      location={property.location}
      mainImage={property.images[0]}
      galleryImages={property.images.slice(1)}
      specifications={property.specifications}
      description={property.description}
      features={property.features}
      sellerName={defaultSeller.name}
      sellerExperience={defaultSeller.experience}
      sellerDescription={defaultSeller.description}
      sellerAddress={defaultSeller.address}
    />
  );
}

function RealEstate() {
  return (
    <Routes>
      <Route index element={<RealEstateListing />} />
      <Route path=":id" element={<RealEstateDetail />} />
    </Routes>
  );
}

export default RealEstate;