import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { goldListings } from '../config/goldData';
import { defaultSeller } from '../config/types';

function GoldListing() {
  const navigate = useNavigate();
  const visibleListings = goldListings.filter(listing => listing.visible !== false);

  return (
    <CategoryLayout
      title="Gold & Precious Metals"
      subtitle="Invest in premium gold and precious metals with guaranteed authenticity"
      backgroundImage="https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => navigate(`/gold/${listing.id}`)}
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

function GoldDetail() {
  const { id } = useParams();
  const gold = goldListings.find(g => g.id === id && g.visible !== false);

  if (!gold) {
    return <div>Investment not found</div>;
  }

  return (
    <ProductDetail
      title={gold.title}
      location={gold.location}
      mainImage={gold.images[0]}
      galleryImages={gold.images.slice(1)}
      specifications={gold.specifications}
      description={gold.description}
      features={gold.features}
      sellerName={defaultSeller.name}
      sellerExperience={defaultSeller.experience}
      sellerDescription={defaultSeller.description}
      sellerAddress={defaultSeller.address}
    />
  );
}

function Gold() {
  return (
    <Routes>
      <Route index element={<GoldListing />} />
      <Route path=":id" element={<GoldDetail />} />
    </Routes>
  );
}

export default Gold;