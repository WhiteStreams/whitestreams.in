import React, { useState } from 'react';
import { Mail, MapPin, Send } from 'lucide-react';
import { sendEmail } from '../config/emailConfig';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  interest: string;
  message: string;
}

const initialFormData: FormData = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  interest: '',
  message: ''
};

function Contact() {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        from_name: `${formData.firstName} ${formData.lastName}`,
        from_email: formData.email,
        phone: formData.phone,
        interest: formData.interest,
        message: formData.message
      });

      setSubmitStatus('success');
      setFormData(initialFormData);
    } catch (error) {
      console.error('Failed to send email:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[50vh] bg-emerald-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Office"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-6xl font-serif text-white mb-6">Contact Us</h1>
          <p className="text-xl text-white/90 max-w-2xl leading-relaxed font-light">
            Connect with our luxury specialists to explore exceptional opportunities in real estate, automobiles, precious metals, yachts, and private aviation.
          </p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="max-w-7xl mx-auto px-4 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-serif text-emerald-900 mb-8">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                    className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                />
              </div>
              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-2">
                  Area of Interest
                </label>
                <select
                  id="interest"
                  name="interest"
                  value={formData.interest}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                >
                  <option value="">Select an option</option>
                  <option value="real-estate">Real Estate</option>
                  <option value="cars">Cars</option>
                  <option value="metals">Metals & Precious Metals</option>
                  <option value="yachts">Yachts</option>
                  <option value="jets">Private Jets</option>
                </select>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full rounded-lg border-gray-300 focus:border-emerald-500 focus:ring-emerald-500"
                ></textarea>
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
                className="w-full bg-emerald-900 text-white py-4 rounded-lg hover:bg-emerald-800 transition-colors flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-5 w-5" />
                <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-serif text-emerald-900 mb-8">Get in Touch</h2>
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-50 p-3 rounded-full">
                  <Mail className="h-6 w-6 text-emerald-800" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                  <p className="text-gray-600">ceo.whitestreams@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="bg-emerald-50 p-3 rounded-full">
                  <MapPin className="h-6 w-6 text-emerald-800" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600">India</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;