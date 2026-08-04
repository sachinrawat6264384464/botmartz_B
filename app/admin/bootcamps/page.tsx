"use client";

import { useState } from "react";
import { Users, FileText, Download, TrendingUp, Settings, Mail, Award, CreditCard } from "lucide-react";
import Link from "next/link";

const TABS = [
  { id: "dashboard", label: "Dashboard", icon: TrendingUp },
  { id: "registrations", label: "Registrations", icon: Users },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "certificates", label: "Certificates", icon: Award },
  { id: "emails", label: "Email Logs", icon: Mail },
];

export default function BootcampsAdmin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-[#0B1C2C]">Bootcamp Administration</h1>
          <p className="text-[#64748B] mt-1">Manage AI Frontier 2026 Bootcamps and registrations.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-white border border-[#E2E8F0] px-4 py-2 rounded-lg text-sm font-semibold text-[#334155] hover:bg-[#F8FAFC]">
            <Download className="w-4 h-4" /> Export CSV
          </button>
          <button className="flex items-center gap-2 bg-[#0066FF] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#0052CC]">
            <Settings className="w-4 h-4" /> Manage Coupons
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 border-b border-[#E2E8F0] mb-8">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold border-b-2 transition-colors ${
                isActive ? "border-[#0066FF] text-[#0066FF]" : "border-transparent text-[#64748B] hover:text-[#0B1C2C]"
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "dashboard" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[
              { label: "Total Registrations", value: "342", trend: "+12% this week" },
              { label: "Revenue", value: "₹68,058", trend: "+8% this week" },
              { label: "AI Eng Passes", value: "128", trend: "37% of total" },
              { label: "Certificates Issued", value: "45", trend: "Bootcamp 1 only" },
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-xl border border-[#E2E8F0] shadow-sm">
                <p className="text-[#64748B] text-sm font-medium mb-2">{stat.label}</p>
                <h3 className="text-3xl font-bold text-[#0B1C2C] mb-2">{stat.value}</h3>
                <p className="text-xs text-[#10B981] font-semibold">{stat.trend}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm overflow-hidden">
            <div className="p-6 border-b border-[#E2E8F0]">
              <h3 className="text-lg font-bold text-[#0B1C2C]">Recent Registrations</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0] text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                    <th className="p-4">Attendee</th>
                    <th className="p-4">Plan</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E2E8F0]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <tr key={i} className="hover:bg-[#F8FAFC]">
                      <td className="p-4">
                        <div className="font-semibold text-[#0B1C2C]">Rahul Developer {i}</div>
                        <div className="text-sm text-[#64748B]">rahul{i}@example.com</div>
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {i % 2 === 0 ? "AI Pass" : "Bootcamp 01"}
                        </span>
                      </td>
                      <td className="p-4 font-medium text-[#0B1C2C]">
                        {i % 2 === 0 ? "₹399" : "₹199"}
                      </td>
                      <td className="p-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          Paid
                        </span>
                      </td>
                      <td className="p-4 text-sm text-[#64748B]">Aug 4, 2026</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "dashboard" && (
        <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-sm p-12 text-center">
          <FileText className="w-12 h-12 text-[#CBD5E1] mx-auto mb-4" />
          <h3 className="text-lg font-bold text-[#0B1C2C] mb-2">{TABS.find(t => t.id === activeTab)?.label} Module</h3>
          <p className="text-[#64748B] max-w-md mx-auto">
            This module is connected to your Firebase backend. Detailed views for registrations, payments, and certificates will appear here.
          </p>
        </div>
      )}
    </div>
  );
}
