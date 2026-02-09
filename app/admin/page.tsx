"use client";

import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { app } from "@/lib/firebase";
import {
  Users,
  FileText,
  Mail,
  Activity,
  TrendingUp,
  Clock,
} from "lucide-react";

export default function AdminDashboard() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const auth = getAuth(app);
    setUser(auth.currentUser);
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: "0",
      icon: Users,
      change: "+0%",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Projects",
      value: "0",
      icon: FileText,
      change: "+0%",
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Messages",
      value: "0",
      icon: Mail,
      change: "+0%",
      color: "from-[#D4AF37] to-yellow-600",
    },
    {
      title: "Active Sessions",
      value: "1",
      icon: Activity,
      change: "Live",
      color: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-[#D4AF37]/10 to-transparent border border-[#D4AF37]/20 rounded-2xl p-8">
        <h2 className="text-3xl font-bold text-white mb-2">
          Welcome back, Admin
        </h2>
        <p className="text-gray-400">
          Here's what's happening with your platform today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative group bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:border-white/20 transition-all"
          >
            {/* Gradient Background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity`}
            />

            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <span className="text-xs font-mono text-green-400">
                  {stat.change}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-400">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Activity Feed */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <Clock className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-semibold text-white">
              Recent Activity
            </h3>
          </div>
          <div className="space-y-4">
            <p className="text-gray-400 text-sm">No recent activity</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
          <div className="flex items-center gap-3 mb-6">
            <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="text-lg font-semibold text-white">Quick Stats</h3>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Login Time</span>
              <span className="text-white text-sm font-mono">
                {new Date().toLocaleTimeString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">Admin Email</span>
              <span className="text-white text-sm">{user?.email}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}