import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { yachtListings } from '../config/yachtData';
import { defaultSeller } from '../config/yachtTypes';

function YachtListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    year: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  // Extract unique locations (countries)
  const locations = [...new Set(yachtListings.map(listing => {
    const country = listing.location.split(',').pop()?.trim() || '';
    return country;
  }))];

  const filteredListings = useMemo(() => {
    let filtered = yachtListings.filter(listing => listing.visible !== false);

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
        const year = parseInt(listing.year || "0");
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
      filtered.sort((a, b) => parseInt(b.year || "0") - parseInt(a.year || "0"));
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  const filterConfig = {
    locations: locations
  };

  return (
    <CategoryLayout
      title="Luxury Yachts"
      subtitle="Explore exclusive yachts, superyachts, and exotic vessels for sale worldwide"
      backgroundImage="https://image931.wordpress.com/wp-content/uploads/2025/04/img25-1.jpg?w=1024"
      onSearch={setSearchTerm}
      onFilter={setFilters}
      onSort={setSortBy}
      filterConfig={filterConfig}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
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