import React from 'react';
import { Target, Gem, Users } from 'lucide-react';

const values = [
  {
    icon: <Target className="h-8 w-8 text-emerald-800" />,
    title: "Vision",
    description: "To be the world's most trusted destination for exceptional luxury experiences."
  },
  {
    icon: <Gem className="h-8 w-8 text-emerald-800" />,
    title: "Excellence",
    description: "We maintain the highest standards in every aspect of our service and offerings."
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-800" />,
    title: "Relationships",
    description: "Building lasting connections with our clients through trust and dedication."
  }
];

function About() {
  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-[80vh] bg-emerald-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Interior"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative h-full max-w-7xl mx-auto px-4 flex flex-col justify-center">
          <h1 className="text-6xl font-serif text-white mb-8">About White Streams</h1>
          <p className="text-2xl text-white/90 max-w-3xl leading-relaxed font-light">
            White Streams is a refined gateway to the world's most exclusive luxuries — from breathtaking real estate and private jets to elegant yachts and beyond. We are devoted to curating timeless experiences that blend sophistication, serenity, and style.
          </p>
          <p className="text-xl text-white/80 max-w-3xl leading-relaxed mt-6 font-light">
            Guided by a passion for excellence and authenticity, we connect those who seek more than just luxury — we offer a lifestyle that transcends the ordinary.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-32 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-serif text-center text-emerald-900 mb-20">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {values.map((value) => (
              <div key={value.title} className="text-center">
                <div className="inline-flex items-center justify-center p-6 bg-emerald-50 rounded-full mb-8">
                  {value.icon}
                </div>
                <h3 className="text-2xl font-serif mb-4 text-emerald-900">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-8 text-emerald-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To curate and deliver unparalleled luxury experiences by connecting discerning clients with the world's most exceptional properties, vehicles, and investments. We strive to maintain the highest standards of service while fostering lasting relationships built on trust, discretion, and expertise.
              </p>
            </div>
            <div className="relative h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
                alt="Luxury Property"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-32 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-serif text-emerald-900 mb-6">Experience Luxury with White Streams</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Connect with our team to discover how we can help you find your perfect luxury investment.
          </p>
          <button className="bg-emerald-900 text-white px-12 py-4 rounded-lg hover:bg-emerald-800 transition-colors text-lg">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;