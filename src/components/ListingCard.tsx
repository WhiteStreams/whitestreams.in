import React, { useState } from 'react';

interface ListingCardProps {
  title: string;
  price?: string;
  location: string;
  year?: string;
  specs?: string[];
  images: string[];
}

const ListingCard: React.FC<ListingCardProps> = ({ title, price, location, year, specs, images }) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const visibleImages = showAllImages ? images : images.slice(0, 3);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <div className="w-[384px] h-[512px] bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      {/* Image Container - Fixed height */}
      <div className="relative h-[288px] w-full">
        {/* Loading placeholder */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gray-100 animate-pulse" />
        )}
        
        <img
          src={visibleImages[currentImage]}
          alt={title}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            imageLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleImageLoad}
          loading="lazy"
          decoding="async"
        />

        {/* Image navigation dots */}
        <div className="absolute bottom-4 left-4 flex space-x-2">
          {visibleImages.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(index);
              }}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentImage === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`View image ${index + 1}`}
            />
          ))}
        </div>

        {/* More images button */}
        {!showAllImages && images.length > 3 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowAllImages(true);
            }}
            className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-sm px-3 py-1 rounded-full transition-colors"
            aria-label={`Show ${images.length - 3} more images`}
          >
            +{images.length - 3} more
          </button>
        )}
      </div>

      {/* Content Container - Fixed height with overflow */}
      <div className="h-[224px] p-6 flex flex-col">
        <div className="space-y-3">
          {/* Title - Fixed height with ellipsis */}
          <h3 className="text-xl font-serif text-gray-900 line-clamp-2 h-[56px]">{title}</h3>
          
          {/* Price */}
          <span className="text-lg font-semibold text-emerald-800 block h-[28px]">
            Price On Request
          </span>

          {/* Location and Year */}
          <div className="flex items-center text-gray-600 text-sm h-[24px]">
            <span className="line-clamp-1">{location}</span>
            {year && <span className="mx-2">•</span>}
            {year && <span>{year}</span>}
          </div>

          {/* Specs - Fixed height container */}
          {specs && specs.length > 0 && (
            <div className="flex flex-wrap gap-2 h-[40px] overflow-hidden">
              {specs.slice(0, 3).map((spec, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full whitespace-nowrap"
                >
                  {spec}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ListingCard;