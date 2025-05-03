import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { carListings } from '../config/carData';
import { defaultSeller } from '../config/types';

function CarListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    year: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  // Extract unique locations (countries)
  const locations = [...new Set(carListings.map(listing => {
    const country = listing.location.split(',').pop()?.trim() || '';
    return country;
  }))];

  const filteredListings = useMemo(() => {
    let filtered = carListings.filter(listing => listing.visible !== false);

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
      title="Luxury Cars"
      subtitle="Discover the finest collection of luxury and exotic cars from around the world"
      backgroundImage="https://image931.wordpress.com/wp-content/uploads/2025/04/img_2505.jpg"
      onSearch={setSearchTerm}
      onFilter={setFilters}
      onSort={setSortBy}
      filterConfig={filterConfig}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredListings.map((listing) => (
          <div 
            key={listing.id} 
            onClick={() => navigate(`/cars/${listing.id}`)}
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

function CarDetail() {
  const { id } = useParams();
  const car = carListings.find(c => c.id === id && c.visible !== false);

  if (!car) {
    return <div>Car not found</div>;
  }

  return (
    <ProductDetail
      title={car.title}
      location={car.location}
      year={car.year}
      mainImage={car.images[0]}
      galleryImages={car.images.slice(1)}
      specifications={car.specifications}
      description={car.description}
      features={car.features}
      sellerName={defaultSeller.name}
      sellerExperience={defaultSeller.experience}
      sellerDescription={defaultSeller.description}
      sellerAddress={defaultSeller.address}
    />
  );
}

function Cars() {
  return (
    <Routes>
      <Route index element={<CarListing />} />
      <Route path=":id" element={<CarDetail />} />
    </Routes>
  );
}

export default Cars;