import React from 'react';
import { Link } from 'react-router-dom';
import { X, Home, Building2, Car, Coins, Ship, Plane, Users, Phone } from 'lucide-react';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuDrawer: React.FC<MenuDrawerProps> = ({ isOpen, onClose }) => {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: 'Home', path: '/' },
    { icon: <Building2 className="w-5 h-5" />, label: 'Real Estate', path: '/real-estate' },
    { icon: <Car className="w-5 h-5" />, label: 'Cars', path: '/cars' },
    { icon: <Coins className="w-5 h-5" />, label: 'Metals', path: '/metals' },
    { icon: <Ship className="w-5 h-5" />, label: 'Yachts', path: '/yachts' },
    { icon: <Plane className="w-5 h-5" />, label: 'Jets', path: '/jets' },
    { icon: <Users className="w-5 h-5" />, label: 'About Us', path: '/about' },
    { icon: <Phone className="w-5 h-5" />, label: 'Contact Us', path: '/contact' },
  ];

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-80 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50 flex flex-col ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Fixed Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-serif text-emerald-900">Menu</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto">
          <nav className="p-6">
            <ul className="space-y-4">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className="flex items-center space-x-4 px-4 py-3 text-gray-700 hover:bg-emerald-50 rounded-lg transition-colors"
                    onClick={onClose}
                  >
                    <span className="text-emerald-800">{item.icon}</span>
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Additional Content */}
          <div className="p-6 border-t border-gray-100">
            <h3 className="text-lg font-serif text-emerald-900 mb-4">Contact Information</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <p>White Streams</p>
              <p>India</p>
              <p>Email: ceo.whitestreams@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuDrawer;