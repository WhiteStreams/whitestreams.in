import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import RealEstate from './pages/RealEstate';
import Cars from './pages/Cars';
import Metals from './pages/Metals';
import Yachts from './pages/Yachts';
import Jets from './pages/Jets';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import MediaManager from './pages/MediaManager';
import ContentManager from './pages/ContentManager';
import AdminDashboard from './pages/AdminDashboard';
import ScrollToTop from './components/ScrollToTop';
import MenuDrawer from './components/MenuDrawer';

// Simple admin check - in production, use proper authentication
const isAdmin = () => {
  return localStorage.getItem('isAdmin') === 'true';
};

// Protected Route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  if (!isAdmin()) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <nav className="fixed w-full z-50 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center">
                <button
                  onClick={() => setIsMenuOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Menu className="h-6 w-6 text-emerald-900" />
                </button>
                <Link to="/" className="flex items-center gap-2">
                  <img 
                    src="https://image931.wordpress.com/wp-content/uploads/2025/05/s-4-1.png" 
                    alt="White Streams Logo" 
                    className="h-8 w-auto"
                  />
                  <span className="text-2xl font-serif text-emerald-900">White Streams</span>
                </Link>
              </div>
              
              <div className="hidden md:flex space-x-8">
                <Link to="/real-estate" className="text-gray-600 hover:text-emerald-800">Real Estate</Link>
                <Link to="/cars" className="text-gray-600 hover:text-emerald-800">Cars</Link>
                <Link to="/metals" className="text-gray-600 hover:text-emerald-800">Metals</Link>
                <Link to="/yachts" className="text-gray-600 hover:text-emerald-800">Yachts</Link>
                <Link to="/jets" className="text-gray-600 hover:text-emerald-800">Jets</Link>
              </div>
            </div>
          </div>
        </nav>

        {/* Menu Drawer */}
        <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

        {/* Routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/real-estate/*" element={<RealEstate />} />
          <Route path="/cars/*" element={<Cars />} />
          <Route path="/metals/*" element={<Metals />} />
          <Route path="/yachts/*" element={<Yachts />} />
          <Route path="/jets/*" element={<Jets />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route 
            path="/edit/*" 
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;