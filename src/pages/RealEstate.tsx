import React, { useState, useMemo } from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { realEstateListings } from '../config/realEstateData';
import { defaultSeller } from '../config/types';

function RealEstateListing() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    bedrooms: '',
    propertyType: '',
    year: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  const locations = [...new Set(realEstateListings.map(listing => {
    const country = listing.location.split(',').pop()?.trim() || '';
    return country;
  }))];

  const filteredListings = useMemo(() => {
    let filtered = realEstateListings.filter(listing => listing.visible !== false);

    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      filtered = filtered.filter(listing => 
        listing.title.toLowerCase().includes(searchLower) ||
        listing.location.toLowerCase().includes(searchLower) ||
        listing.specs.some(spec => spec.toLowerCase().includes(searchLower))
      );
    }

    if (filters.location) {
      filtered = filtered.filter(listing =>
        listing.location.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    if (filters.bedrooms) {
      filtered = filtered.filter(listing => {
        const bedroomSpec = listing.specifications.find(spec => spec.label === "Bedrooms");
        if (!bedroomSpec) return true;
        const bedrooms = parseInt(bedroomSpec.value);
        return bedrooms === parseInt(filters.bedrooms);
      });
    }

    if (filters.propertyType) {
      filtered = filtered.filter(listing => {
        const typeSpec = listing.specifications.find(spec => spec.label === "Property Type");
        if (!typeSpec) return true;
        return typeSpec.value.toLowerCase() === filters.propertyType.toLowerCase();
      });
    }

    if (filters.year) {
      filtered = filtered.filter(listing => {
        const yearBuilt = listing.specifications.find(spec => spec.label === "Year Built");
        if (!yearBuilt) return true;
        
        const year = parseInt(yearBuilt.value);
        if (isNaN(year)) return true;

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

    if (sortBy === 'newest') {
      filtered.sort((a, b) => {
        const yearA = parseInt(a.specifications.find(spec => spec.label === "Year Built")?.value || "0");
        const yearB = parseInt(b.specifications.find(spec => spec.label === "Year Built")?.value || "0");
        return yearB - yearA;
      });
    }

    return filtered;
  }, [searchTerm, filters, sortBy]);

  const filterConfig = {
    locations: locations,
    bedrooms: ['1', '2', '3', '4', '5', '6', '7', '8+'],
    propertyTypes: ['Villa', 'House', 'Apartment', 'Penthouse']
  };

  return (
    <CategoryLayout
      title="Luxury Real Estate"
      subtitle="Explore exclusive properties and premium real estate listings worldwide"
      backgroundImage="https://image931.wordpress.com/wp-content/uploads/2025/04/img_2078.jpg"
      onSearch={setSearchTerm}
      onFilter={setFilters}
      onSort={setSortBy}
      filterConfig={filterConfig}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
        {filteredListings.map((listing) => (
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