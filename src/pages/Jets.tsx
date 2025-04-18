import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { jetListings } from '../config/jetData';
import { defaultSeller } from '../config/types';

function JetListing() {
  const navigate = useNavigate();
  const visibleListings = jetListings.filter(listing => listing.visible !== false);

  return (
    <CategoryLayout
      title="Private Aviation"
      subtitle="Discover the world's most exclusive private jets and aircraft for sale"
      backgroundImage="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => navigate(`/jets/${listing.id}`)}
            className="cursor-pointer"
          >
            <ListingCard 
              title={listing.title}
              location={listing.location}
              year={listing.year}
              specs={listing.specs}
              images={listing.images}
            />
          </div>
        ))}
      </div>
    </CategoryLayout>
  );
}

function JetDetail() {
  const { id } = useParams();
  const jet = jetListings.find(j => j.id === id && j.visible !== false);

  if (!jet) {
    return <div>Aircraft not found</div>;
  }

  return (
    <ProductDetail
      title={jet.title}
      location={jet.location}
      year={jet.year}
      mainImage={jet.images[0]}
      galleryImages={jet.images.slice(1)}
      specifications={jet.specifications}
      description={jet.description}
      features={jet.features}
      sellerName={defaultSeller.name}
      sellerExperience={defaultSeller.experience}
      sellerDescription={defaultSeller.description}
      sellerAddress={defaultSeller.address}
    />
  );
}

function Jets() {
  return (
    <Routes>
      <Route index element={<JetListing />} />
      <Route path=":id" element={<JetDetail />} />
    </Routes>
  );
}

export default Jets;