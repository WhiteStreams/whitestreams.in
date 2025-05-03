import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { jetListings } from '../config/jetData';
import { defaultSeller } from '../config/types';

function JetListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    year: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  // Extract unique locations (countries)
  const locations = [...new Set(jetListings.map(listing => {
    const country = listing.location.split(',').pop()?.trim() || '';
    return country;
  }))];

  const filteredListings = useMemo(() => {
    let filtered = jetListings.filter(listing => listing.visible !== false);

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

    // Apply year filter
    if (filters.year) {
      filtered = filtered.filter(listing => {
        const year = parseInt(listing.year);
        switch (filters.year) {
          case '2024+':
            return year >= 2024;
          case '2020-2023':
            return year >= 2020 && year <= 2023;
          case '2015-2019':
            return year >= 2015 && year <= 2019;
          case '-2015':
            return year < 2015;
          default:
            return true;
        }
      });
    }

    // Apply sorting
    if (sortBy === 'newest') {
      filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  const filterConfig = {
    locations: locations
  };

  return (
    <CategoryLayout
      title="Luxury Jets"
      subtitle="Discover the world's most exclusive private jets and aircraft for digital currency"
      backgroundImage="https://image931.wordpress.com/wp-content/uploads/2025/04/img_1213.jpg"
      onSearch={setSearchTerm}
      onFilter={setFilters}
      onSort={setSortBy}
      filterConfig={filterConfig}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
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