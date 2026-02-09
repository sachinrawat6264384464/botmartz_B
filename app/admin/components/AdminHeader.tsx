"use client";
import { Bell, Search, Settings } from 'lucide-react';
import { Inter_Tight } from 'next/font/google';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600'] });

export default function AdminHeader() {
  return (
    <header className={`${interTight.className} bg-white border-b border-gray-200 px-8 py-4`}>
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-2xl">
          <div className="relative">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search messages, contacts..."
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3 ml-6">
          {/* Settings */}
          <button className="p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Settings size={20} className="text-gray-600" />
          </button>

          {/* Notifications */}
          <button className="relative p-2.5 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} className="text-gray-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full border-2 border-white" />
          </button>

          {/* Divider */}
          <div className="w-px h-8 bg-gray-200" />

          {/* Profile */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-gray-700 to-gray-900 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">AD</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-semibold text-gray-900">Admin User</p>
              <p className="text-xs text-gray-500">Super Admin</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}