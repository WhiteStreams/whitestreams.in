import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import CategoryLayout from '../components/CategoryLayout';
import ListingCard from '../components/ListingCard';
import ProductDetail from '../components/ProductDetail';
import { carListings } from '../config/carData';
import { defaultSeller } from '../config/types';

function CarListing() {
  const navigate = useNavigate();
  const visibleListings = carListings.filter(listing => listing.visible !== false);

  return (
    <CategoryLayout
      title="Luxury Automobiles"
      subtitle="Discover the finest collection of luxury and exotic cars from around the world"
      backgroundImage="https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2000"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleListings.map((listing) => (
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