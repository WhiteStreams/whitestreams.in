import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { goldListings } from '../config/goldData';
import { defaultSeller } from '../config/types';

function MetalsListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: ''
  });

  // Extract unique locations
  const locations = [...new Set(goldListings.map(listing => {
    const location = listing.location.split(',')[0].trim();
    return location;
  }))];

  const filteredListings = useMemo(() => {
    let filtered = goldListings.filter(listing => listing.visible !== false);

    // Apply search
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower) ||
        listing.specs.some(spec => spec.toLowerCase().includes(searchLower))
      );
    }

    // Apply location filter
    if (filters.location) {
      filtered = filtered.filter(listing =>
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    return filtered;
  }, [searchTerm, filters]);

  const filterConfig = {
    locations: locations
  };

  return (
    <CategoryLayout
      title="Precious Metals"
      subtitle="Invest in premium precious metals including gold, silver, platinum, copper, and rare metal commodities with guaranteed authenticity and secure storage"
      backgroundImage="https://image931.wordpress.com/wp-content/uploads/2025/04/img_2230-1.jpg"
      onSearch={setSearchTerm}
      onFilter={setFilters}
      filterConfig={filterConfig}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
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