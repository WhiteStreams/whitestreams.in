import React from 'react';
import { Heart } from 'lucide-react';

interface ListingCardProps {
  title: string;
  price?: string;
  location: string;
  year?: string;
  specs?: string[];
  images: string[];
}

const ListingCard: React.FC<ListingCardProps> = ({ title, price, location, year, specs, images }) => {
  const [currentImage, setCurrentImage] = React.useState(0);

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative">
        <div className="aspect-w-16 aspect-h-9">
          <img
            src={images[currentImage]}
            alt={title}
            className="w-full h-[240px] object-cover"
          />
        </div>
        <button className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
          <Heart className="h-5 w-5 text-gray-700" />
        </button>
        <div className="absolute bottom-4 left-4 flex space-x-1">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentImage(index);
              }}
              className={`w-2 h-2 rounded-full ${
                currentImage === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-serif text-gray-900">{title}</h3>
          {price && <span className="text-lg font-semibold text-emerald-800">{price}</span>}
        </div>
        <div className="flex items-center text-gray-600 text-sm mb-2">
          <span>{location}</span>
          {year && <span className="mx-2">•</span>}
          {year && <span>{year}</span>}
        </div>
        {specs && (
          <div className="flex flex-wrap gap-2 mt-3">
            {specs.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded"
              >
                {spec}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ListingCard;