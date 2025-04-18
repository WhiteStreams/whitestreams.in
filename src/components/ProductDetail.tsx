import React from 'react';
import { Heart, Share, ChevronLeft, ChevronRight, ArrowLeft } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { sendEmail } from '../config/emailConfig';

interface Specification {
  label: string;
  value: string;
}

interface ProductDetailProps {
  title: string;
  location: string;
  year?: string;
  mainImage: string;
  galleryImages: string[];
  specifications: Specification[];
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
  const [currentImage, setCurrentImage] = React.useState(0);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    message: `I would like more information about ${title}`
  });
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitStatus, setSubmitStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  
  const allImages = [mainImage, ...galleryImages];
  const location_path = useLocation();

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
        phone: formData.phone,
        message: formData.message,
        listing_title: title
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
    setCurrentImage((prev) => (prev + 1) % allImages.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + allImages.length) % allImages.length);
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
            <div className="relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-4">
              <img
                src={allImages[currentImage]}
                alt={title}
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-between px-4">
                <button
                  onClick={prevImage}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
                <button
                  onClick={nextImage}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              </div>
              <div className="absolute top-4 right-4 flex space-x-2">
                <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Heart className="h-5 w-5 text-gray-700" />
                </button>
                <button className="p-2 rounded-full bg-white/80 hover:bg-white transition-colors">
                  <Share className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              {allImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImage(idx)}
                  className={`relative aspect-w-16 aspect-h-9 rounded-lg overflow-hidden ${
                    currentImage === idx ? 'ring-2 ring-emerald-500' : ''
                  }`}
                >
                  <img src={img} alt="" className="w-full h-24 object-cover" />
                </button>
              ))}
            </div>

            {/* Details */}
            <div className="mt-8">
              <h1 className="text-3xl font-serif mb-4">{title}</h1>
              <div className="flex items-center text-gray-600 mb-6">
                <span>{location}</span>
                {year && (
                  <>
                    <span className="mx-2">•</span>
                    <span>{year}</span>
                  </>
                )}
              </div>

              {/* About Section */}
              <div className="mb-8">
                <h2 className="text-xl font-serif mb-4">About</h2>
                <p className="text-gray-600 whitespace-pre-line">{description}</p>
              </div>

              {/* Specifications */}
              <div className="mb-8">
                <h2 className="text-xl font-serif mb-4">{getDetailsTitle()}</h2>
                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
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
            <div className="bg-white p-6 rounded-xl shadow-sm sticky top-24">
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