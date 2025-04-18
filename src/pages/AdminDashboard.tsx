import React, { useState } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Image, Users, Settings, LogOut, Bell, FileText } from 'lucide-react';
import MediaManager from './MediaManager';
import ContentManager from './ContentManager';

const AdminDashboard: React.FC = () => {
  const [notifications] = useState(3);
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const menuItems = [
    { icon: <LayoutDashboard className="w-5 h-5" />, label: 'Dashboard', path: '/edit' },
    { icon: <Image className="w-5 h-5" />, label: 'Media', path: '/edit/media' },
    { icon: <FileText className="w-5 h-5" />, label: 'Content', path: '/edit/content' },
    { icon: <Users className="w-5 h-5" />, label: 'Users', path: '/edit/users' },
    { icon: <Settings className="w-5 h-5" />, label: 'Settings', path: '/edit/settings' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/" className="text-2xl font-serif text-emerald-900">
                White Streams Admin
              </Link>
            </div>

            <div className="flex items-center gap-4">
              <button className="relative p-2 hover:bg-gray-100 rounded-full">
                <Bell className="w-5 h-5 text-gray-600" />
                {notifications > 0 && (
                  <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {notifications}
                  </span>
                )}
              </button>
              <button className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-64 fixed h-full bg-white shadow-sm">
          <nav className="p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.path}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive(item.path)
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 ml-64 p-8">
          <Routes>
            <Route path="/media" element={<MediaManager />} />
            <Route path="/content" element={<ContentManager />} />
            {/* Add other admin routes here */}
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;