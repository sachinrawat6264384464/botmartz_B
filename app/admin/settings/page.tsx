"use client";

import { useState, useEffect } from 'react';
import { 
  Settings, Image as ImageIcon, Mail, Search, Link as LinkIcon, 
  ShieldCheck, CreditCard, Cpu, Sliders, Save, Loader2
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

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
  const [settingsData, setSettingsData] = useState<any>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'global'));
        if (docSnap.exists()) {
          setSettingsData(docSnap.data());
        }
      } catch (err) {
        console.error("Failed to load settings", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await setDoc(doc(db, 'settings', 'global'), settingsData, { merge: true });
    } catch (err) {
      console.error("Failed to save settings", err);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (section: string, field: string, value: any) => {
    setSettingsData((prev: any) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [field]: value
      }
    }));
  };

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 size={32} className="animate-spin text-admin-accent" />
      </div>
    );
  }

  return (
    <div className={`font-sans p-6 max-w-[1200px] mx-auto h-full flex flex-col`}>
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
          {activeTab === 'general' && <GeneralSettings data={settingsData.general || {}} onChange={(f: string, v: any) => handleChange('general', f, v)} />}
          {activeTab === 'branding' && <BrandingSettings data={settingsData.branding || {}} onChange={(f: string, v: any) => handleChange('branding', f, v)} />}
          {activeTab === 'email' && <EmailSettings data={settingsData.email || {}} onChange={(f: string, v: any) => handleChange('email', f, v)} />}
          {activeTab === 'seo' && <SEOSettings data={settingsData.seo || {}} onChange={(f: string, v: any) => handleChange('seo', f, v)} />}
          {activeTab === 'integrations' && <IntegrationsSettings data={settingsData.integrations || {}} onChange={(f: string, v: any) => handleChange('integrations', f, v)} />}
          {activeTab === 'security' && <SecuritySettings data={settingsData.security || {}} onChange={(f: string, v: any) => handleChange('security', f, v)} />}
          {activeTab === 'billing' && <BillingSettings data={settingsData.billing || {}} onChange={(f: string, v: any) => handleChange('billing', f, v)} />}
          {activeTab === 'ai-models' && <AIModelsSettings data={settingsData.aiModels || {}} onChange={(f: string, v: any) => handleChange('aiModels', f, v)} />}
          {activeTab === 'advanced' && <AdvancedSettings data={settingsData.advanced || {}} onChange={(f: string, v: any) => handleChange('advanced', f, v)} />}
        </div>
      </div>
    </div>
  );
}

function GeneralSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
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
              value={data.companyName || "Botmartz AI Solutions"}
              onChange={(e) => onChange('companyName', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Email</label>
            <input 
              type="email" 
              value={data.email || "hello@botmartz.com"}
              onChange={(e) => onChange('email', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Phone</label>
            <input 
              type="text" 
              value={data.phone || "+1 (555) 123-4567"}
              onChange={(e) => onChange('phone', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Website URL</label>
            <input 
              type="url" 
              value={data.websiteUrl || "https://botmartz.com"}
              onChange={(e) => onChange('websiteUrl', e.target.value)}
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
            <select 
              value={data.timezone || "GMT+05:30 (Asia/Kolkata)"}
              onChange={(e) => onChange('timezone', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
            >
              <option>GMT+05:30 (Asia/Kolkata)</option>
              <option>GMT-05:00 (EST)</option>
              <option>GMT+00:00 (UTC)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Language</label>
            <select 
              value={data.language || "English (US)"}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
            >
              <option>English (US)</option>
              <option>English (UK)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandingSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  const primaryLogo = data.primaryLogo || "/BotmartznewBot.png";
  const faviconUrl = data.faviconUrl || "";

  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Logos</h2>
        <p className="text-sm text-admin-text-muted mb-4">Update your company logos across the platform.</p>
        
        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-admin-bg border-2 border-dashed border-admin-border rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
              {primaryLogo ? (
                <img src={primaryLogo} alt="Logo" className="w-20 h-20 object-contain" />
              ) : (
                <span className="text-xs text-admin-text-muted">No Image</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-admin-text mb-1">Primary Logo URL</p>
              <input 
                type="text" 
                value={primaryLogo} 
                onChange={(e) => onChange('primaryLogo', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors mb-2"
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="w-24 h-24 bg-admin-bg border-2 border-dashed border-admin-border rounded-xl flex items-center justify-center shrink-0 overflow-hidden relative">
              {faviconUrl ? (
                <img src={faviconUrl} alt="Favicon" className="w-16 h-16 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-admin-text">B</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-admin-text mb-1">Favicon URL</p>
              <input 
                type="text" 
                value={faviconUrl} 
                onChange={(e) => onChange('faviconUrl', e.target.value)}
                placeholder="/favicon.ico"
                className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors mb-2"
              />
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
            <div className="w-10 h-10 rounded shadow-sm shrink-0 border border-admin-border" style={{ backgroundColor: data.primaryColor || '#0B1C2C' }}></div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-admin-text-muted mb-1">Primary Color</label>
              <input type="text" value={data.primaryColor || '#0B1C2C'} onChange={(e) => onChange('primaryColor', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded shadow-sm shrink-0 border border-admin-border" style={{ backgroundColor: data.secondaryColor || '#0678BE' }}></div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-admin-text-muted mb-1">Secondary Color</label>
              <input type="text" value={data.secondaryColor || '#0678BE'} onChange={(e) => onChange('secondaryColor', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none" />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded shadow-sm shrink-0 border border-admin-border" style={{ backgroundColor: data.accentColor || '#00B8F0' }}></div>
            <div className="flex-1">
              <label className="block text-xs font-medium text-admin-text-muted mb-1">Accent Color</label>
              <input type="text" value={data.accentColor || '#00B8F0'} onChange={(e) => onChange('accentColor', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-3 py-2 text-sm text-admin-text focus:outline-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function EmailSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Email Configuration</h2>
        <p className="text-sm text-admin-text-muted mb-4">Set up SMTP or Email API providers.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Provider</label>
            <select value={data.provider || "SendGrid"} onChange={(e) => onChange('provider', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors">
              <option>SendGrid</option>
              <option>AWS SES</option>
              <option>Postmark</option>
              <option>Custom SMTP</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">API Key / Password</label>
            <input type="password" value={data.apiKey || ""} onChange={(e) => onChange('apiKey', e.target.value)} placeholder="••••••••••••" className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">From Email</label>
            <input type="email" value={data.fromEmail || "noreply@botmartz.com"} onChange={(e) => onChange('fromEmail', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">From Name</label>
            <input type="text" value={data.fromName || "Botmartz Team"} onChange={(e) => onChange('fromName', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SEOSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Global SEO Settings</h2>
        <p className="text-sm text-admin-text-muted mb-4">Manage default metadata for search engines.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Default Title Suffix</label>
            <input type="text" value={data.titleSuffix || "| Botmartz AI Solutions"} onChange={(e) => onChange('titleSuffix', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Google Analytics ID</label>
            <input type="text" value={data.gaId || ""} onChange={(e) => onChange('gaId', e.target.value)} placeholder="G-XXXXXXXXXX" className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Robots.txt Content</label>
            <textarea rows={4} value={data.robotsTxt || "User-agent: *\nAllow: /"} onChange={(e) => onChange('robotsTxt', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      {/* AEO SECTION */}
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">AEO (Answer Engine Optimization)</h2>
        <p className="text-sm text-admin-text-muted mb-4">Optimize how LLMs and Answer Engines (ChatGPT, Perplexity) comprehend your brand.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Brand Persona & Identity</label>
            <textarea rows={3} value={data.aeoBrandPersona || ""} onChange={(e) => onChange('aeoBrandPersona', e.target.value)} placeholder="e.g., Botmartz is an elite AI engineering firm specializing in Enterprise RAG..." className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            <p className="text-[11px] text-admin-text-muted mt-1">Provide clear guidelines on how an AI should summarize what Botmartz does.</p>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Core Knowledge Context</label>
            <textarea rows={6} value={data.aeoKnowledgeContext || ""} onChange={(e) => onChange('aeoKnowledgeContext', e.target.value)} placeholder="Paste key facts, history, unique selling points, and structured JSON context..." className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            <p className="text-[11px] text-admin-text-muted mt-1">Dense context blocks (or JSON structures) used on backend for injection into agent knowledge bases.</p>
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      {/* GEO SECTION */}
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">GEO (Generative Engine Optimization)</h2>
        <p className="text-sm text-admin-text-muted mb-4">Ensure Generative Engines correctly synthesize and cite your business.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Entity Description (Knowledge Graph)</label>
            <textarea rows={3} value={data.geoEntityDescription || ""} onChange={(e) => onChange('geoEntityDescription', e.target.value)} placeholder="Authoritative entity description for Google Knowledge Graph integration..." className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Primary Citations & Authority Links</label>
            <textarea rows={3} value={data.geoCitations || ""} onChange={(e) => onChange('geoCitations', e.target.value)} placeholder="https://linkedin.com/company/botmartz&#10;https://github.com/botmartz" className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            <p className="text-[11px] text-admin-text-muted mt-1">List one URL per line. These links establish domain authority for generative summaries.</p>
          </div>
        </div>
      </div>

    </div>
  );
}

function IntegrationsSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">API Integrations</h2>
        <p className="text-sm text-admin-text-muted mb-4">Manage connection keys for third-party services.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">OpenAI API Key</label>
            <input type="password" value={data.openaiKey || ""} onChange={(e) => onChange('openaiKey', e.target.value)} placeholder="sk-..." className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Anthropic API Key</label>
            <input type="password" value={data.anthropicKey || ""} onChange={(e) => onChange('anthropicKey', e.target.value)} placeholder="sk-ant-..." className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Stripe Secret Key</label>
            <input type="password" value={data.stripeKey || ""} onChange={(e) => onChange('stripeKey', e.target.value)} placeholder="sk_live_..." className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function SecuritySettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Security</h2>
        <p className="text-sm text-admin-text-muted mb-4">Configure authentication and access rules.</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-admin-bg border border-admin-border rounded-lg">
            <div>
              <p className="text-sm font-medium text-admin-text">Enforce 2FA for Admins</p>
              <p className="text-xs text-admin-text-muted">Require all admin users to use two-factor authentication.</p>
            </div>
            <input type="checkbox" checked={data.enforce2FA ?? true} onChange={(e) => onChange('enforce2FA', e.target.checked)} className="w-4 h-4" />
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Session Timeout (minutes)</label>
            <input type="number" value={data.sessionTimeout || 60} onChange={(e) => onChange('sessionTimeout', Number(e.target.value))} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BillingSettings({ data }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Billing & Plans</h2>
        <p className="text-sm text-admin-text-muted mb-4">Manage subscription plans and pricing.</p>
        <div className="p-4 bg-admin-bg border border-admin-border rounded-lg text-center text-admin-text-muted text-sm">
          Stripe integration is currently disabled. Connect Stripe in Integrations to manage billing.
        </div>
      </div>
    </div>
  );
}

function AIModelsSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">AI Configuration</h2>
        <p className="text-sm text-admin-text-muted mb-4">Set default models and parameters for generation.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Default Model</label>
            <select value={data.defaultModel || "gpt-4o"} onChange={(e) => onChange('defaultModel', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-lg px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors">
              <option>gpt-4o</option>
              <option>gpt-4-turbo</option>
              <option>claude-3-opus</option>
              <option>claude-3-sonnet</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-admin-text mb-1">Temperature</label>
            <input type="range" min="0" max="1" step="0.1" value={data.temperature || 0.7} onChange={(e) => onChange('temperature', parseFloat(e.target.value))} className="w-full" />
            <div className="text-xs text-admin-text-muted mt-1">Controls randomness: {data.temperature || 0.7}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AdvancedSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-2xl">
      <div>
        <h2 className="text-lg font-semibold text-admin-text mb-1">Advanced Options</h2>
        <p className="text-sm text-admin-text-muted mb-4">Developer settings and dangerous actions.</p>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-admin-bg border border-admin-border rounded-lg">
            <div>
              <p className="text-sm font-medium text-admin-text">Maintenance Mode</p>
              <p className="text-xs text-admin-text-muted">Disable public access to the frontend.</p>
            </div>
            <input type="checkbox" checked={data.maintenanceMode || false} onChange={(e) => onChange('maintenanceMode', e.target.checked)} className="w-4 h-4" />
          </div>
          <div>
            <button className="bg-rose-500/10 text-rose-500 border border-rose-500/20 px-4 py-2 rounded-lg text-sm font-medium hover:bg-rose-500/20 transition-colors">
              Clear System Cache
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
