import React, { useRef, useState } from 'react';
import { Mail, Clock, Send, Loader2 } from 'lucide-react';
import { sendEmail } from '../config/emailConfig';

function Contact() {
  const form = useRef<HTMLFormElement | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData): boolean => {
    const errors: Record<string, string> = {};
    const email = formData.get('email') as string;
    const phone = formData.get('phone') as string;

    // Email validation
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailRegex.test(email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Phone validation (optional but must be valid if provided)
    if (phone) {
      const phoneRegex = /^\+?[\d\s-]{10,}$/;
      if (!phoneRegex.test(phone)) {
        errors.phone = 'Please enter a valid phone number';
      }
    }

    // Required fields
    if (!formData.get('name')) errors.name = 'Name is required';
    if (!formData.get('email')) errors.email = 'Email is required';
    if (!formData.get('interest')) errors.interest = 'Please select an area of interest';
    if (!formData.get('message')) errors.message = 'Message is required';

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const formData = new FormData(form.current!);
      
      if (!validateForm(formData)) {
        setStatus('error');
        return;
      }

      await sendEmail({
        from_name: formData.get('name') as string,
        from_email: formData.get('email') as string,
        phone: formData.get('phone') as string || 'Not provided',
        interest: formData.get('interest') as string,
        message: formData.get('message') as string
      });

      setStatus('success');
      form.current?.reset();
    } catch (error) {
      console.error('Error sending message:', error);
      setStatus('error');
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "ceo.whitestreams@gmail.com",
      description: "Send us an email anytime"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Working Hours",
      content: "24/7 Support",
      description: "Always here to help"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-emerald-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000"
            alt="Contact Us"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Contact Us</h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl">
            Connect with White Streams for exceptional luxury experiences
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-sm p-8">
            <h2 className="text-2xl font-serif text-gray-900 mb-6">Send Us a Message</h2>
            <form ref={form} onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${
                    formErrors.name ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.name && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${
                    formErrors.email ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.email && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number (optional)
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${
                    formErrors.phone ? 'border-red-500' : ''
                  }`}
                />
                {formErrors.phone && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.phone}</p>
                )}
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-medium text-gray-700 mb-1">
                  Area of Interest
                </label>
                <select
                  name="interest"
                  id="interest"
                  required
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${
                    formErrors.interest ? 'border-red-500' : ''
                  }`}
                >
                  <option value="">Select an option</option>
                  <option value="Real Estate">Real Estate</option>
                  <option value="Cars">Cars</option>
                  <option value="Metals">Metals</option>
                  <option value="Yachts">Yachts</option>
                  <option value="Jets">Private Jets</option>
                </select>
                {formErrors.interest && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.interest}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  className={`w-full rounded-lg border-gray-300 shadow-sm focus:border-emerald-500 focus:ring-emerald-500 ${
                    formErrors.message ? 'border-red-500' : ''
                  }`}
                ></textarea>
                {formErrors.message && (
                  <p className="mt-1 text-sm text-red-600">{formErrors.message}</p>
                )}
              </div>

              {status === 'success' && (
                <div className="text-green-600 text-center">
                  Your message has been sent successfully. We'll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="text-red-600 text-center">
                  There was an error sending your message. Please check the form and try again.
                </div>
              )}

              <button
                type="submit"
                disabled={status === 'sending'}
                className="w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-3 px-6 rounded-lg hover:bg-emerald-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === 'sending' ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-serif text-gray-900 mb-2">Get in Touch</h2>
              <p className="text-gray-600">
                We're here to help you find the perfect luxury.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((info, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="inline-flex items-center justify-center p-3 bg-emerald-50 rounded-lg mb-4">
                    {React.cloneElement(info.icon, { className: "w-6 h-6 text-emerald-600" })}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-1">{info.title}</h3>
                  <p className="text-emerald-600 font-medium mb-1">{info.content}</p>
                  <p className="text-gray-500 text-sm">{info.description}</p>
                </div>
              ))}
            </div>

            {/* Crypto Acceptance */}
            <div className="bg-white p-8 rounded-xl shadow-sm mt-8">
              <h3 className="text-xl font-serif text-gray-900 mb-4">We Accept Cryptocurrency</h3>
              <div className="flex items-center gap-8">
                <img 
                  src="https://www.svgrepo.com/show/51194/bitcoin-digital-currency-symbol.svg" 
                  alt="Bitcoin" 
                  className="h-8 w-8 object-contain grayscale hover:grayscale-0 transition-all"
                />
                <img 
                  src="https://miro.medium.com/v2/resize:fit:486/1*L8ODr3uJlh44i1SgjlMv7w.png" 
                  alt="Ethereum" 
                  className="h-8 w-8 object-contain grayscale hover:grayscale-0 transition-all"
                />
                <img 
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GLtqTP2TG8zWlg_VR9i58w3gZgXM0dK8nQ&s" 
                  alt="XRP" 
                  className="h-8 w-8 object-contain grayscale hover:grayscale-0 transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;