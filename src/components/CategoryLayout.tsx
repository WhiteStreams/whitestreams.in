import React, { useState } from 'react';
import { Search, SlidersHorizontal, ChevronDown } from 'lucide-react';

interface FilterConfig {
  locations?: string[];
  bedrooms?: string[];
  propertyTypes?: string[];
}

interface CategoryLayoutProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  children: React.ReactNode;
  onSearch?: (term: string) => void;
  onFilter?: (filters: Record<string, string>) => void;
  onSort?: (sortBy: string) => void;
  filterConfig?: FilterConfig;
}

const CategoryLayout: React.FC<CategoryLayoutProps> = ({
  title,
  subtitle,
  backgroundImage,
  children,
  onSearch,
  onFilter,
  onSort,
  filterConfig
}) => {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [filters, setFilters] = useState({
    location: '',
    bedrooms: '',
    propertyType: '',
    year: ''
  });
  const [sortBy, setSortBy] = useState('featured');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const handleSort = (value: string) => {
    setSortBy(value);
    setIsSortOpen(false);
    if (onSort) {
      onSort(value);
    }
  };

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
          <p className="text-xl opacity-90 max-w-2xl px-4">{subtitle}</p>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="sticky top-20 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            {/* Search */}
            <div className="relative w-full md:max-w-lg">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-6 w-6 text-gray-400" />
              <input
                type="text"
                placeholder="Search listings..."
                onChange={handleSearch}
                className="w-full pl-12 pr-4 py-3 md:py-2 text-lg md:text-base border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Filters and Sort */}
            <div className="flex items-center gap-4 w-full md:w-auto">
              <div className="relative flex-1 md:flex-none">
                <button 
                  className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-3 md:py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span>Filters</span>
                </button>
                {isFilterOpen && (
                  <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-full md:w-64 bg-white rounded-lg shadow-lg border border-gray-200 p-4 z-50">
                    <div className="space-y-4">
                      {filterConfig?.locations && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                          <select 
                            className="w-full border-gray-200 rounded-lg py-2"
                            value={filters.location}
                            onChange={(e) => handleFilterChange('location', e.target.value)}
                          >
                            <option value="">All Locations</option>
                            {filterConfig.locations.map(location => (
                              <option key={location} value={location.toLowerCase()}>
                                {location}
                              </option>
                            ))}
                          </select>
                        </div>
                      )}

                      {filterConfig?.bedrooms && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                          <select 
                            className="w-full border-gray-200 rounded-lg py-2"
                            value={filters.bedrooms}
                            onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                          >
                            <option value="">Any</option>
                            {filterConfig.bedrooms.map(num => (
                              <option key={num} value={num}>{num} Bedrooms</option>
                            ))}
                          </select>
                        </div>
                      )}

                      {filterConfig?.propertyTypes && (
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                          <select 
                            className="w-full border-gray-200 rounded-lg py-2"
                            value={filters.propertyType}
                            onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                          >
                            <option value="">Any Type</option>
                            {filterConfig.propertyTypes.map(type => (
                              <option key={type} value={type}>{type}</option>
                            ))}
                          </select>
                        </div>
                      )}

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                        <select 
                          className="w-full border-gray-200 rounded-lg py-2"
                          value={filters.year}
                          onChange={(e) => handleFilterChange('year', e.target.value)}
                        >
                          <option value="">All Years</option>
                          <option value="2024+">2024+</option>
                          <option value="2020-2023">2020-2023</option>
                          <option value="2015-2019">2015-2019</option>
                          <option value="-2015">Before 2015</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="relative flex-1 md:flex-none">
                <button 
                  className="w-full md:w-auto flex items-center justify-center space-x-2 px-4 py-3 md:py-2 border border-gray-200 rounded-lg hover:bg-gray-50"
                  onClick={() => setIsSortOpen(!isSortOpen)}
                >
                  <span>Sort by: {sortBy}</span>
                  <ChevronDown className="h-5 w-5" />
                </button>
                {isSortOpen && (
                  <div className="absolute left-0 md:right-0 md:left-auto mt-2 w-full md:w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    <div className="py-1">
                      {['Featured', 'Newest'].map((option) => (
                        <button
                          key={option}
                          className="block w-full text-left px-4 py-3 md:py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => handleSort(option.toLowerCase())}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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