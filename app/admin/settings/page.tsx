"use client";

import { useState } from 'react';
import { Inter_Tight } from 'next/font/google';
import { 
  Settings, Image as ImageIcon, Mail, Search, Link as LinkIcon, 
  ShieldCheck, CreditCard, Cpu, Sliders, Save, Loader2
} from 'lucide-react';

const interTight = Inter_Tight({ subsets: ['latin'], weight: ['400', '500', '600', '700'] });

const TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'branding', label: 'Branding', icon: ImageIcon },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'integrations', label: 'Integrations', icon: LinkIcon },
  { id: 'security', label: 'Security', icon: ShieldCheck },
  { id: 'billing', label: 'Billing', icon: CreditCard },
  { id: 'ai-models', label: 'AI Models', icon: Cpu },
  { id: 'advanced', label: 'Advanced', icon: Sliders },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);

  const handleSave = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1000);
  };

  return (
    <div className={`${interTight.className} p-6 max-w-[1200px] mx-auto h-full flex flex-col`}>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Settings</h1>
          <p className="text-sm text-admin-text-muted mt-1">Manage your platform's global configurations.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={saving}
          className="bg-admin-accent hover:bg-admin-accent/90 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0 bg-admin-card border border-admin-border rounded-xl p-2 overflow-y-auto max-h-full">
          <nav className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors text-sm font-medium text-left ${
                    isActive 
                      ? 'bg-admin-accent-muted text-admin-accent' 
                      : 'text-admin-text-muted hover:bg-admin-bg hover:text-admin-text'
                  }`}
                >
                  <Icon size={16} className={isActive ? 'text-admin-accent' : 'text-admin-text-muted'} />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Area */}
        <div className="flex-1 bg-admin-card border border-admin-border rounded-xl overflow-y-auto p-6 shadow-sm">
          {activeTab === 'general' && <GeneralSettings />}
          {activeTab === 'branding' && <BrandingSettings />}
          {/* Add other tabs as needed */}
          {activeTab !== 'general' && activeTab !== 'branding' && (
            <div className="flex flex-col items-center justify-center h-full text-admin-text-muted">
              <IconForTab tabId={activeTab} size={48} className="mb-4 opacity-20" />
              <p>Settings for <strong>{TABS.find(t => t.id === activeTab)?.label}</strong> coming soon.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Company Information</h2>
        <p className="text-sm text-admin-text-muted mb-4">Basic details about your organization.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Company Name</label>
            <input 
              type="text" 
              defaultValue="Botmartz AI Solutions"
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Email</label>
            <input 
              type="email" 
              defaultValue="hello@botmartz.com"
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Phone</label>
            <input 
              type="text" 
              defaultValue="+1 (555) 123-4567"
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Website URL</label>
            <input 
              type="url" 
              defaultValue="https://botmartz.com"
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Localization</h2>
        <p className="text-sm text-admin-text-muted mb-4">Set your primary language and timezone.</p>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Time Zone</label>
            <select className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors">
              <option>GMT+05:30 (Asia/Kolkata)</option>
              <option>GMT-05:00 (EST)</option>
              <option>GMT+00:00 (UTC)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Language</label>
            <select className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors">
              <option>English (US)</option>
              <option>English (UK)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandingSettings() {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Logos</h2>
        <p className="text-sm text-admin-text-muted mb-4">Update your company logos across the platform.</p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-admin-bg border-2 border-dashed border-admin-border rounded-xl flex items-center justify-center shrink-0">
              <img src="/BotmartzNewLogo.png" alt="Logo" className="w-16 h-16 object-contain" />
            </div>
            <div>
              <p className="text-sm font-medium text-admin-text mb-2">Primary Logo</p>
              <div className="flex gap-2">
                <button className="text-xs bg-admin-bg border border-admin-border hover:bg-admin-border text-admin-text px-3 py-1.5 rounded transition-colors">Change</button>
                <button className="text-xs text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded transition-colors">Remove</button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-admin-bg border-2 border-dashed border-admin-border rounded-xl flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-admin-text">B</span>
            </div>
            <div>
              <p className="text-sm font-medium text-admin-text mb-2">Favicon</p>
              <div className="flex gap-2">
                <button className="text-xs bg-admin-bg border border-admin-border hover:bg-admin-border text-admin-text px-3 py-1.5 rounded transition-colors">Change</button>
                <button className="text-xs text-rose-500 hover:bg-rose-500/10 px-3 py-1.5 rounded transition-colors">Remove</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Colors</h2>
        <p className="text-sm text-admin-text-muted mb-4">Manage your brand's color palette.</p>
        <div className="space-y-3">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded shadow-sm shrink-0 border border-admin-border" style={{ backgroundColor: '#0B1C2C' }}></div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-admin-text-muted mb-1">Primary Color</label>
              <input type="text" defaultValue="#0B1C2C" className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded shadow-sm shrink-0 border border-admin-border" style={{ backgroundColor: '#0678BE' }}></div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-admin-text-muted mb-1">Secondary Color</label>
              <input type="text" defaultValue="#0678BE" className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded shadow-sm shrink-0 border border-admin-border" style={{ backgroundColor: '#00B8F0' }}></div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-admin-text-muted mb-1">Accent Color</label>
              <input type="text" defaultValue="#00B8F0" className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function IconForTab({ tabId, ...props }: any) {
  const Icon = TABS.find(t => t.id === tabId)?.icon || Settings;
  return <Icon {...props} />;
}
