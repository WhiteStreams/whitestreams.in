import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ArrowLeft, Image, ChevronDown } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { sendEmail } from '../config/emailConfig';

interface ProductDetailProps {
  title: string;
  location: string;
  year?: string;
  mainImage: string;
  galleryImages: string[];
  specifications: { label: string; value: string; }[];
  description: string;
  features?: string[];
  sellerName: string;
  sellerExperience: string;
  sellerDescription?: string;
  sellerAddress?: string;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  title,
  location,
  year,
  mainImage,
  galleryImages,
  specifications,
  description,
  features,
  sellerName,
  sellerExperience,
  sellerDescription,
  sellerAddress,
}) => {
  const [currentImage, setCurrentImage] = useState(0);
  const [showAllImages, setShowAllImages] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `I would like more information about ${title}`
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [imageLoaded, setImageLoaded] = useState<boolean[]>([]);
  
  const allImages = [mainImage, ...galleryImages];
  const visibleImages = showAllImages ? allImages : allImages.slice(0, 4);
  const location_path = useLocation();
  const contactFormRef = useRef<HTMLDivElement>(null);

  const handleImageLoad = (index: number) => {
    setImageLoaded(prev => {
      const newState = [...prev];
      newState[index] = true;
      return newState;
    });
  };

  const scrollToContact = () => {
    contactFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const getInterestFromPath = (path: string): string => {
    if (path.includes('/real-estate')) return 'Real Estate';
    if (path.includes('/cars')) return 'Cars';
    if (path.includes('/metals')) return 'Metals';
    if (path.includes('/yachts')) return 'Yachts';
    if (path.includes('/jets')) return 'Jets';
    return 'General';
  };

  const getDetailsTitle = () => {
    if (location_path.pathname.includes('/real-estate')) return 'Property Details';
    if (location_path.pathname.includes('/cars')) return 'Vehicle Details';
    if (location_path.pathname.includes('/metals')) return 'Investment Details';
    if (location_path.pathname.includes('/yachts')) return 'Yacht Details';
    if (location_path.pathname.includes('/jets')) return 'Aircraft Details';
    return 'Details';
  };

  const getBasePath = () => {
    const segments = location_path.pathname.split('/');
    return `/${segments[1]}`;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      await sendEmail({
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone || 'Not provided',
        interest: getInterestFromPath(location_path.pathname),
        message: formData.message,
      });

      setSubmitStatus('success');
      setFormData(prev => ({
        ...prev,
        name: '',
        email: '',
        phone: '',
        message: `I would like more information about ${title}`
      }));
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % visibleImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + visibleImages.length) % visibleImages.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex items-center space-x-4 mb-6">
          <Link to={getBasePath()} className="flex items-center text-gray-600 hover:text-emerald-800">
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to Listings
          </Link>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Main Image and Gallery */}
          <div className="lg:col-span-2">
            {/* Mobile Image Gallery */}
            <div className="block lg:hidden">
              {/* Show first image */}
              <div className="relative w-full aspect-[16/9] bg-gray-100 mb-4">
                {!imageLoaded[0] && (
                  <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                )}
                <img
                  src={allImages[0]}
                  alt={`${title} - Main View`}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${
                    imageLoaded[0] ? 'opacity-100' : 'opacity-0'
                  }`}
                  onLoad={() => handleImageLoad(0)}
                  loading="eager"
                  decoding="async"
                  sizes="100vw"
                />
              </div>

              {/* View All Images Button */}
              {allImages.length > 1 && (
                <button
                  onClick={() => setShowAllImages(!showAllImages)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 mb-6"
                >
                  <Image className="w-5 h-5" />
                  <span>View All {allImages.length} Photos</span>
                  <ChevronDown className={`w-5 h-5 transition-transform ${showAllImages ? 'rotate-180' : ''}`} />
                </button>
              )}

              {/* Additional Images */}
              {showAllImages && (
                <div className="space-y-3">
                  {allImages.slice(1).map((img, idx) => (
                    <div key={idx + 1} className="relative w-full aspect-[16/9] bg-gray-100">
                      {!imageLoaded[idx + 1] && (
                        <div className="absolute inset-0 bg-gray-100 animate-pulse" />
                      )}
                      <img
                        src={img}
                        alt={`${title} - View ${idx + 2}`}
                        className={`w-full h-full object-cover transition-opacity duration-300 ${
                          imageLoaded[idx + 1] ? 'opacity-100' : 'opacity-0'
                        }`}
                        onLoad={() => handleImageLoad(idx + 1)}
                        loading="lazy"
                        decoding="async"
                        sizes="100vw"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Image Gallery */}
            <div className="hidden lg:block">
              <div className="relative aspect-[16/9] mb-4">
                <img
                  src={visibleImages[currentImage]}
                  alt={title}
                  className="w-full h-full object-cover rounded-lg"
                />
                <div className="absolute inset-0 flex items-center justify-between px-4">
                  <button
                    onClick={prevImage}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="h-6 w-6 text-white" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-4 gap-4">
                {visibleImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImage(idx)}
                    className={`relative aspect-[16/9] rounded-lg overflow-hidden ${
                      currentImage === idx ? 'ring-2 ring-emerald-500' : ''
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img 
                      src={img} 
                      alt="" 
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
                {!showAllImages && allImages.length > 4 && (
                  <button
                    onClick={() => setShowAllImages(true)}
                    className="relative aspect-[16/9] rounded-lg overflow-hidden bg-gray-100 hover:bg-gray-200 transition-colors flex items-center justify-center"
                    aria-label={`Show ${allImages.length - 4} more images`}
                  >
                    <div className="text-center">
                      <Image className="w-6 h-6 mx-auto mb-1 text-gray-600" />
                      <span className="text-sm text-gray-600">+{allImages.length - 4} more</span>
                    </div>
                  </button>
                )}
              </div>
            </div>

            {/* Details */}
            <div className="mt-8">
              <h1 className="text-3xl font-serif mb-4">{title}</h1>
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center text-gray-600">
                  <span>{location}</span>
                  {year && (
                    <>
                      <span className="mx-2">•</span>
                      <span>{year}</span>
                    </>
                  )}
                </div>
                <button 
                  onClick={scrollToContact}
                  className="text-2xl font-semibold text-emerald-800 hover:text-emerald-700 transition-colors cursor-pointer"
                >
                  Price On Request
                </button>
              </div>

              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-xl font-serif mb-4">About</h2>
                <p className="text-gray-600 whitespace-pre-line">{description}</p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-xl font-serif mb-4">{getDetailsTitle()}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {specifications.map((spec) => (
                    <div key={spec.label} className="border-b border-gray-200 pb-2">
                      <dt className="text-gray-600 text-sm">{spec.label}</dt>
                      <dd className="text-gray-900">{spec.value}</dd>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features */}
              {features && (
                <div className="mb-8">
                  <h2 className="text-xl font-serif mb-4">Key Features</h2>
                  <ul className="list-disc list-inside space-y-2 text-gray-600">
                    {features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="lg:col-span-1">
            <div ref={contactFormRef} className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
              <div className="mb-6">
                <h3 className="font-medium text-gray-900 mb-1">{sellerName}</h3>
                <p className="text-sm text-gray-600">{sellerExperience}</p>
                {sellerDescription && (
                  <p className="text-sm text-gray-600 mt-2">{sellerDescription}</p>
                )}
                {sellerAddress && (
                  <p className="text-sm text-gray-600 mt-2">{sellerAddress}</p>
                )}
              </div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    Phone (optional)
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                {submitStatus === 'success' && (
                  <div className="text-green-600 text-sm">
                    Your message has been sent successfully. We'll get back to you soon.
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="text-red-600 text-sm">
                    There was an error sending your message. Please try again later.
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Contact Agent'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;