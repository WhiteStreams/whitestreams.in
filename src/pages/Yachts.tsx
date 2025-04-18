import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { yachtListings } from '../config/yachtData';
import { defaultSeller } from '../config/yachtTypes';

function YachtListing() {
  const navigate = useNavigate();
  const visibleListings = yachtListings.filter(listing => listing.visible !== false);

  return (
    <CategoryLayout
      title="Luxury Yachts"
      subtitle="Explore exclusive yachts, superyachts, and exotic vessels for sale worldwide"
      backgroundImage="https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => navigate(`/yachts/${listing.id}`)}
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

function YachtDetail() {
  const { id } = useParams();
  const yacht = yachtListings.find(y => y.id === id && y.visible !== false);

  if (!yacht) {
    return <div>Yacht not found</div>;
  }

  return (
    <ProductDetail
      title={yacht.title}
      location={yacht.location}
      year={yacht.year}
      mainImage={yacht.images[0]}
      galleryImages={yacht.images.slice(1)}
      specifications={yacht.specifications}
      description={yacht.description}
      features={yacht.features}
      sellerName={defaultSeller.name}
      sellerExperience={defaultSeller.experience}
      sellerDescription={defaultSeller.description}
      sellerAddress={defaultSeller.address}
    />
  );
}

function Yachts() {
  return (
    <Routes>
      <Route index element={<YachtListing />} />
      <Route path=":id" element={<YachtDetail />} />
    </Routes>
  );
}

export default Yachts;