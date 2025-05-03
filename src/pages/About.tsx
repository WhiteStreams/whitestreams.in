import React from 'react';
import { Target, Gem, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Hero Section */}
      <div className="relative h-auto min-h-[80vh] bg-emerald-900">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
            alt="Luxury Interior"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="relative max-w-7xl mx-auto px-6 md:px-8 py-20 md:py-32">
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-8">About White Streams</h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl leading-relaxed font-light">
            White Streams is a refined gateway to the world's most exclusive luxuries — from breathtaking real estate and private jets to elegant yachts and beyond. We are devoted to curating timeless experiences that blend sophistication, serenity, and style.
          </p>
          <p className="text-lg md:text-xl text-white/80 max-w-3xl leading-relaxed mt-6 font-light">
            Guided by a passion for excellence and authenticity, we connect those who seek more than just luxury — we offer a lifestyle that transcends the ordinary. digital currency is accepted.
          </p>
          <div className="flex items-center gap-8 mt-8">
            <img 
              src="https://www.svgrepo.com/show/51194/bitcoin-digital-currency-symbol.svg" 
              alt="Bitcoin" 
              className="h-8 w-8 md:h-12 md:w-12 object-contain invert brightness-0"
            />
            <img 
              src="https://miro.medium.com/v2/resize:fit:486/1*L8ODr3uJlh44i1SgjlMv7w.png" 
              alt="Ethereum" 
              className="h-8 w-8 md:h-12 md:w-12 object-contain invert brightness-0"
            />
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8GLtqTP2TG8zWlg_VR9i58w3gZgXM0dK8nQ&s" 
              alt="XRP" 
              className="h-8 w-8 md:h-12 md:w-12 object-contain brightness-200"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20 md:py-32 bg-gradient-to-b from-emerald-50/50 to-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-serif text-center text-emerald-900 mb-16 md:mb-20">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
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
      <div className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
            <div>
              <h2 className="text-4xl font-serif mb-8 text-emerald-900">Our Mission</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                To curate and deliver unparalleled luxury experiences by connecting discerning clients with the world's most exceptional properties, vehicles, and investments. We strive to maintain the highest standards of service while fostering lasting relationships built on trust, discretion, and expertise.
              </p>
            </div>
            <div className="relative h-[400px] md:h-[600px]">
              <img
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=2000"
                alt="Luxury Property"
                className="w-full h-full object-cover rounded-2xl shadow-xl"
              />
            </div>
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
                    alt="Chief Executive Officer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-serif text-emerald-900">Moeri Iwata</h3>
                  <p className="text-gray-600 mb-4">Chief Executive Officer</p>
                  <p className="text-gray-600 text-sm max-w-xl">
                    A Japanese marketing professional educated at the University of Shizuoka, with a global perspective shaped by extensive international experience. Through exploring diverse cultures and markets, She've developed a keen ability to make insightful, principle-driven decisions. Her vision is providing seamless digital currency service and make opportunity that anyone can be anything.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA */}
      <div className="py-20 md:py-32 bg-gradient-to-b from-white to-emerald-50/50">
        <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
          <h2 className="text-4xl font-serif text-emerald-900 mb-6">Experience Luxury with White Streams</h2>
          <p className="text-gray-600 mb-12 max-w-2xl mx-auto text-lg">
            Connect us to discover how we can help you find your perfect luxury.
          </p>
          <button 
            onClick={() => navigate('/contact')}
            className="bg-emerald-900 text-white px-12 py-4 rounded-lg hover:bg-emerald-800 transition-colors text-lg"
          >
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}

export default About;