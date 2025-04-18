import React from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface CategoryLayoutProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  children: React.ReactNode;
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  title,
  subtitle,
  backgroundImage,
  children
}) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-[60vh]">
        <div className="absolute inset-0">
          <img
            src={backgroundImage}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-5xl font-serif mb-4">{title}</h1>
          <p className="text-xl opacity-90 max-w-2xl">{subtitle}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-20 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <SlidersHorizontal className="h-5 w-5" />
                <span>Filters</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50">
                <span>Sort by: Featured</span>
                <ChevronDown className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {children}
      </div>
    </div>
  );
};

export default CategoryLayout;