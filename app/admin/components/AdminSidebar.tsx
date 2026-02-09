"use client";
import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Mail, Menu, X, LogOut } from 'lucide-react';
import Image from 'next/image';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: Home },
  { href: '/admin/contacts', label: 'Messages', icon: Mail, badge: true },
];

export default function AdminSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-black rounded-lg border border-gray-800"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`${interTight.className} fixed lg:static inset-y-0 left-0 z-40 w-72 bg-black border-r border-gray-900 transform transition-transform duration-300 lg:transform-none ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo Section */}
          <div className="p-8 border-b border-gray-900">
            <div className="flex items-center gap-3">
              <div className="relative w-25 h-25 flex-shrink-0">
                <Image
                  src="/Botmartz_silver.png"
                  alt="BOTMARTZ "
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">BOTMARTZ</h1>
                <p className="text-[10px] text-white tracking-widest uppercase">Admin Panel</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-black font-semibold shadow-lg'
                      : 'text-gray-400 hover:text-white hover:bg-gray-900'
                  }`}
                >
                  <Icon size={20} />
                  <span className="text-sm">{item.label}</span>
                  {item.badge && !isActive && (
                    <span className="ml-auto w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-900">
            <div className="bg-gray-900 rounded-lg p-4 mb-3">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-800 rounded-full flex items-center justify-center">
                  <span className="text-sm font-semibold">AD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">Admin User</p>
                  <p className="text-xs text-gray-500 truncate">admin@botmartz.com</p>
                </div>
              </div>
            </div>
            
            <button className="w-full flex items-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-900 rounded-lg transition-all">
              <LogOut size={16} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}