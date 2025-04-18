import React, { useEffect } from 'react';
import { ChevronLeft, ChevronRight, Globe2, Shield, Award, TrendingUp, Building, Users } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const categories = [
  { 
    name: 'Real Estate',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000',
    path: '/real-estate'
  },
  { 
    name: 'Cars',
    image: 'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2000',
    path: '/cars'
  },
  { 
    name: 'Metals & Precious Metals',
    image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000',
    path: '/metals'
  },
  { 
    name: 'Yachts',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2000',
    path: '/yachts'
  },
  { 
    name: 'Jets',
    image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&q=80&w=2000',
    path: '/jets'
  },
];

const features = [
  {
    icon: <Globe2 className="h-8 w-8 text-emerald-800" />,
    title: "Global Reach",
    description: "Connect with distinguished sellers and buyers from over 120 countries worldwide."
  },
  {
    icon: <Shield className="h-8 w-8 text-emerald-800" />,
    title: "Verified Listings",
    description: "Every listing undergoes thorough verification to ensure authenticity and quality."
  },
  {
    icon: <Award className="h-8 w-8 text-emerald-800" />,
    title: "Premium Service",
    description: "Dedicated concierge service for a seamless luxury experience."
  }
];

const trendingListings = [
  {
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000",
    title: "Luxury Villa with Private Beach",
    location: "Dubai, UAE",
    category: "Real Estate",
    path: "/real-estate/luxury-villa"
  },
  {
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?auto=format&fit=crop&q=80&w=2000",
    title: "Bugatti Mistral",
    location: "Monaco",
    category: "Cars",
    path: "/cars/bugatti-mistral"
  },
  {
    image: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?auto=format&fit=crop&q=80&w=2000",
    title: "Benetti Oasis 40M",
    location: "Miami, USA",
    category: "Yachts",
    path: "/yachts/benetti-oasis"
  }
];

const partners = [
  {
    name: "Bentley Motors",
    logo: "https://images.unsplash.com/photo-1674507825416-56a96d450ad3?auto=format&fit=crop&q=80&w=200",
    description: "Luxury automotive partner"
  },
  {
    name: "Rolls-Royce",
    logo: "https://images.unsplash.com/photo-1674507825416-56a96d450ad3?auto=format&fit=crop&q=80&w=200",
    description: "Premium automotive collaborator"
  },
  {
    name: "Emirates Palace",
    logo: "https://images.unsplash.com/photo-1674507825416-56a96d450ad3?auto=format&fit=crop&q=80&w=200",
    description: "Luxury real estate partner"
  },
  {
    name: "Benetti Yachts",
    logo: "https://images.unsplash.com/photo-1674507825416-56a96d450ad3?auto=format&fit=crop&q=80&w=200",
    description: "Exclusive yacht manufacturer"
  }
];

function Home() {
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = React.useState(true);
  const autoPlayRef = React.useRef<NodeJS.Timeout>();
  const navigate = useNavigate();

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=80&w=2000',
      title: 'Luxury Villa in Bali',
      location: 'Bali, Indonesia',
      path: '/real-estate/luxury-villa-bali'
    },
    {
      image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&q=80&w=2000',
      title: 'Ferrari F8 Tributo',
      location: 'Dubai, UAE',
      path: '/cars/ferrari-f8'
    },
    {
      image: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&q=80&w=2000',
      title: 'Precious Metals Investment',
      location: 'Dubai, UAE',
      path: '/metals/precious-metals-investment'
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      autoPlayRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      }, 4000);
    }

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, heroSlides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    setIsAutoPlaying(false);
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <div className="relative h-screen">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 cursor-pointer ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => navigate(slide.path)}
          >
            <img
              src={slide.image}
              className="w-full h-full object-cover"
              alt="Luxury showcase"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}

        <div className="absolute inset-0 flex items-center justify-between px-8">
          <button
            onClick={prevSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronLeft className="h-8 w-8 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
          >
            <ChevronRight className="h-8 w-8 text-white" />
          </button>
        </div>

        <div className="absolute bottom-0 inset-x-0 p-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-6xl font-serif text-white mb-4">
              {heroSlides[currentSlide].title}
            </h1>
            <div className="flex items-center text-white">
              <span className="text-xl opacity-75">{heroSlides[currentSlide].location}</span>
            </div>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentSlide ? 'bg-white' : 'bg-white/50'
              }`}
              onClick={() => {
                setCurrentSlide(index);
                setIsAutoPlaying(false);
                if (autoPlayRef.current) {
                  clearInterval(autoPlayRef.current);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Categories */}
      <div className="luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <h2 className="text-3xl font-serif mb-12 text-emerald-900">Categories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <Link 
                key={category.name} 
                to={category.path}
                className="group relative overflow-hidden rounded-xl"
              >
                <img 
                  src={category.image} 
                  alt={category.name}
                  className="w-full h-80 object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-2xl font-serif text-white">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Trending Section */}
      <div className="luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-serif text-emerald-900">Trending Now</h2>
            <div className="flex items-center text-emerald-800">
              <TrendingUp className="w-5 h-5 mr-2" />
              <span>Most viewed this week</span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {trendingListings.map((item) => (
              <Link 
                key={item.title}
                to={item.path}
                className="group relative overflow-hidden rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="aspect-w-16 aspect-h-9">
                  <img 
                    src={item.image}
                    alt={item.title}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <div className="text-sm text-emerald-600 mb-2">{item.category}</div>
                  <h3 className="text-xl font-serif text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.location}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="luxury-gradient">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-6 text-emerald-900">About White Streams</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              White Streams is the premier destination for exceptional luxury, connecting sophisticated buyers with the world's most prestigious sellers. Our curated marketplace showcases extraordinary real estate, automobiles, precious metals, yachts, and private jets.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {features.map((feature) => (
              <div key={feature.title} className="text-center bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex items-center justify-center p-4 bg-emerald-50 rounded-full mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4 text-emerald-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 py-24">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif mb-6 text-emerald-900">Our Partners</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Collaborating with the world's most prestigious brands to deliver unparalleled luxury experiences.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {partners.map((partner) => (
              <div key={partner.name} className="text-center">
                <div className="bg-gray-50 rounded-xl p-8 mb-4">
                  <img
                    src={partner.logo}
                    alt={partner.name}
                    className="w-24 h-24 mx-auto object-contain"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">{partner.name}</h3>
                <p className="text-sm text-gray-600">{partner.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="bg-emerald-50">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <h2 className="text-4xl font-serif mb-12 text-center text-emerald-900">Our Leadership</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Founder */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[280px] aspect-[3/4] mb-6 overflow-hidden rounded-2xl">
                  <img
                    src="https://image931.wordpress.com/wp-content/uploads/2025/04/ae0c4b7f-cc4a-4ddb-9186-29a09a80ae1d-1.jpg"
                    alt="Founder"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-emerald-900">Pranes Suriya Kumar</h3>
                  <p className="text-gray-600 mb-4">Founder</p>
                  <p className="text-gray-600 text-sm max-w-xl">
                    An Enterprise Cybersecurity Architect. He specialized in enterprise systems, cryptocurrency, decentalized finance (DeFi) and founder of WHITE STREAMS. With a background from PSG College of Technology, he brings a strong blend of technical expertise and innovation in cybersecurity and blockchain technology.
                  </p>
                </div>
              </div>
            </div>

            {/* CEO */}
            <div className="bg-white rounded-xl p-8 shadow-sm">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[280px] aspect-[3/4] mb-6 overflow-hidden rounded-2xl">
                  <img
                    src="https://image931.wordpress.com/wp-content/uploads/2025/04/dsc07153_original.jpg?w=1024"
                    alt="CEO"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-emerald-900">Moeri Iwata</h3>
                  <p className="text-gray-600 mb-4">CEO</p>
                  <p className="text-gray-600 text-sm max-w-xl">
                    A Japanese marketing professional educated at the University of Shizuoka, with a global perspective shaped by extensive international experience. Through exploring diverse cultures and markets, She've developed a keen ability to make insightful, principle-driven decisions. Her vision is providing seamless digital currency service and make opportunity that anyone can be anything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;