import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { goldListings } from '../config/goldData';
import { defaultSeller } from '../config/types';

function MetalsListing() {
  const navigate = useNavigate();
  const visibleListings = goldListings.filter(listing => listing.visible !== false);

  return (
    <CategoryLayout
      title="Precious Metals"
      subtitle="Invest in premium precious metals including gold, silver, platinum, copper, and rare metal commodities with guaranteed authenticity and secure storage"
      backgroundImage="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => navigate(`/metals/${listing.id}`)}
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

function MetalsDetail() {
  const { id } = useParams();
  const metal = goldListings.find(g => g.id === id && g.visible !== false);

  if (!metal) {
    return <div>Investment not found</div>;
  }

  return (
    <ProductDetail
      title={metal.title}
      location={metal.location}
      mainImage={metal.images[0]}
      galleryImages={metal.images.slice(1)}
      specifications={metal.specifications}
      description={metal.description}
      features={metal.features}
      sellerName={defaultSeller.name}
      sellerExperience={defaultSeller.experience}
      sellerDescription={defaultSeller.description}
      sellerAddress={defaultSeller.address}
    />
  );
}

function Metals() {
  return (
    <Routes>
      <Route index element={<MetalsListing />} />
      <Route path=":id" element={<MetalsDetail />} />
    </Routes>
  );
}

export default Metals;