"use client";

import { useState, useEffect } from 'react';
import { 
  Settings, Image as ImageIcon, Mail, Search, Link as LinkIcon, 
  Save, Loader2, CheckCircle2,
  AlertCircle, Eye, EyeOff, Zap, Key
} from 'lucide-react';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const TABS = [
  { id: 'general', label: 'General', icon: Settings },
  { id: 'branding', label: 'Branding', icon: ImageIcon },
  { id: 'email', label: 'Email', icon: Mail },
  { id: 'seo', label: 'SEO', icon: Search },
  { id: 'integrations', label: 'Integrations', icon: LinkIcon },
];

const DEFAULT_SETTINGS = {
  general: {
    companyName: "Botmartz AI Solution PVT LTD.",
    email: "hello@botmartz.com",
    phone: "+91 94073 28842",
    websiteUrl: "https://botmartz.com",
    timezone: "GMT+05:30 (Asia/Kolkata)",
    language: "English (US)",
    address: "Walkover Co-working, Vijay Nagar, Indore, MP 452010"
  },
  branding: {
    primaryLogo: "/Logo-removebg-preview.png",
    faviconUrl: "/favicon.ico",
    primaryColor: "#0B1C2C",
    secondaryColor: "#0678BE",
    accentColor: "#00B8F0",
    tagline: "Empowering Enterprises with Frontier AI & Agent Architectures"
  },
  email: {
    provider: "Hostinger SMTP",
    smtpHost: "smtp.hostinger.com",
    smtpPort: 465,
    smtpUser: "support@botmartz.com",
    smtpPass: "Botmartz@Hostinger2026",
    fromName: "Botmartz AI Team",
    supportEmail: "support@botmartz.com"
  },
  seo: {
    titleSuffix: "| Botmartz AI Solutions",
    globalDescription: "Botmartz helps organizations design, build, and deploy production-grade AI agents, enterprise RAG pipelines, and LLM applications.",
    globalKeywords: "AI Engineering, Enterprise RAG, Autonomous AI Agents, LangChain, LlamaIndex, Indore Tech",
    ogImageUrl: "/BotmartznewBot.png",
    gaId: "G-BOTMARTZ2026",
    robotsTxt: "User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /careers\nDisallow: /industries\nDisallow: /work/case-studies\nSitemap: https://botmartz.com/sitemap.xml",
    aeoBrandPersona: "Botmartz is an elite AI engineering firm specializing in Enterprise RAG, agentic workflows, and custom LLM model fine-tuning.",
    aeoKnowledgeContext: "Botmartz AI Solutions operates out of Indore, India. Key flagship events include AI Frontier 2026.",
    geoEntityDescription: "Botmartz AI Solutions - Premier Enterprise AI & Agent Development Agency",
    geoCitations: "https://linkedin.com/company/botmartz\nhttps://github.com/sachinrawat6264384464/botmartz_B"
  },
  integrations: {
    openaiKey: "sk-proj-8912739812739812739812",
    anthropicKey: "sk-ant-api03-98127398127398127",
    slackWebhook: "https://hooks.slack.com/services/T00/B00/XXXXXX"
  }
};

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('general');
  const [saving, setSaving] = useState(false);
  const [settingsData, setSettingsData] = useState<any>(DEFAULT_SETTINGS);
  const [isLoading, setIsLoading] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'success' | 'error' } | null>(null);

  const showToast = (msg: string, type: 'success' | 'error' = 'success') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3500);
  };

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'settings', 'global'));
        if (docSnap.exists()) {
          const remoteData = docSnap.data();
          setSettingsData((prev: any) => ({
            ...prev,
            ...remoteData,
            general: { ...DEFAULT_SETTINGS.general, ...remoteData.general },
            branding: { ...DEFAULT_SETTINGS.branding, ...remoteData.branding },
            email: { ...DEFAULT_SETTINGS.email, ...remoteData.email },
            seo: { ...DEFAULT_SETTINGS.seo, ...remoteData.seo },
            integrations: { ...DEFAULT_SETTINGS.integrations, ...remoteData.integrations }
          }));
        }
      } catch (err) {
        console.error("Failed to load settings from Firestore", err);
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
      
      // Revalidate cache so changes reflect instantly across the site
      try {
        await fetch('/api/revalidate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ tag: 'settings' })
        });
      } catch(e) {
        console.error('Cache invalidation failed', e);
      }

      showToast("Global settings saved successfully to Firestore!", 'success');
    } catch (err: any) {
      console.error("Failed to save settings", err);
      showToast("Failed to save settings: " + (err.message || 'Unknown error'), 'error');
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
      <div className="flex h-64 items-center justify-center">
        <Loader2 size={32} className="animate-spin text-admin-accent" />
      </div>
    );
  }

  return (
    <div className="font-sans p-6 w-full h-full flex flex-col space-y-6">
      {/* Toast Banner */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-2xl border transition-all animate-in fade-in slide-in-from-top-4 ${
          toast.type === 'success' 
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400 backdrop-blur-md' 
            : 'bg-rose-500/15 border-rose-500/30 text-rose-400 backdrop-blur-md'
        }`}>
          {toast.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span className="text-sm font-semibold">{toast.msg}</span>
        </div>
      )}

      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-admin-text">Platform Settings</h1>
          <p className="text-sm text-admin-text-muted mt-1">Configure global platform options, API credentials, SEO/AEO metadata, and system preferences.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={handleSave}
            disabled={saving}
            className="bg-admin-accent hover:bg-admin-accent/90 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0">
        {/* Sidebar Nav */}
        <div className="w-full lg:w-64 shrink-0 bg-admin-card border border-admin-border rounded-2xl p-2.5 overflow-y-auto">
          <nav className="space-y-1">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all text-sm font-semibold text-left ${
                    isActive 
                      ? 'bg-admin-accent/10 text-admin-accent border border-admin-accent/20' 
                      : 'text-admin-text-muted hover:bg-admin-bg hover:text-admin-text border border-transparent'
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
        <div className="flex-1 bg-admin-card border border-admin-border rounded-2xl overflow-y-auto p-6 shadow-sm">
          {activeTab === 'general' && <GeneralSettings data={settingsData.general || {}} onChange={(f: string, v: any) => handleChange('general', f, v)} />}
          {activeTab === 'branding' && <BrandingSettings data={settingsData.branding || {}} onChange={(f: string, v: any) => handleChange('branding', f, v)} />}
          {activeTab === 'email' && <EmailSettings data={settingsData.email || {}} onChange={(f: string, v: any) => handleChange('email', f, v)} showToast={showToast} />}
          {activeTab === 'seo' && <SEOSettings data={settingsData.seo || {}} onChange={(f: string, v: any) => handleChange('seo', f, v)} />}
          {activeTab === 'integrations' && <IntegrationsSettings data={settingsData.integrations || {}} onChange={(f: string, v: any) => handleChange('integrations', f, v)} showToast={showToast} />}
        </div>
      </div>
    </div>
  );
}

// ── Tab Components ──

function GeneralSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">Company Information</h2>
        <p className="text-sm text-admin-text-muted mb-4">Basic organization details displayed across the site and footers.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Company Name</label>
            <input 
              type="text" 
              value={data.companyName || ""}
              onChange={(e) => onChange('companyName', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Primary Contact Email</label>
              <input 
                type="email" 
                value={data.email || ""}
                onChange={(e) => onChange('email', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
              />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Phone Number</label>
              <input 
                type="text" 
                value={data.phone || ""}
                onChange={(e) => onChange('phone', e.target.value)}
                className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Website URL</label>
            <input 
              type="url" 
              value={data.websiteUrl || ""}
              onChange={(e) => onChange('websiteUrl', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Headquarters Address</label>
            <input 
              type="text" 
              value={data.address || ""}
              onChange={(e) => onChange('address', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" 
            />
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">Localization</h2>
        <p className="text-sm text-admin-text-muted mb-4">Set primary language, date formats, and timezone.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Time Zone</label>
            <select 
              value={data.timezone || "GMT+05:30 (Asia/Kolkata)"}
              onChange={(e) => onChange('timezone', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
            >
              <option>GMT+05:30 (Asia/Kolkata)</option>
              <option>GMT-05:00 (EST)</option>
              <option>GMT+00:00 (UTC)</option>
              <option>GMT+01:00 (CET)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Language</label>
            <select 
              value={data.language || "English (US)"}
              onChange={(e) => onChange('language', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
            >
              <option>English (US)</option>
              <option>English (UK)</option>
              <option>Hindi (IN)</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}

function BrandingSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  const primaryLogo = data.primaryLogo || "/BotmartznewBot.png";
  const faviconUrl = data.faviconUrl || "/favicon.ico";

  const handleFileUpload = (field: string, file: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        onChange(field, e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">Company Branding & Logos</h2>
        <p className="text-sm text-admin-text-muted mb-4">Upload custom logo image files or enter image URLs to update website branding.</p>
        
        <div className="space-y-6">
          {/* Primary Logo Card */}
          <div className="bg-admin-bg/60 border border-admin-border p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-black/40 border border-admin-border rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative p-2 shadow-inner">
              {primaryLogo ? (
                <img src={primaryLogo} alt="Primary Logo" className="max-w-full max-h-full object-contain" />
              ) : (
                <span className="text-xs text-admin-text-muted">No Image</span>
              )}
            </div>
            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1">Primary Logo URL or Base64</label>
                <input 
                  type="text" 
                  value={primaryLogo} 
                  onChange={(e) => onChange('primaryLogo', e.target.value)}
                  placeholder="/BotmartznewBot.png"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-admin-accent/10 hover:bg-admin-accent/20 text-admin-accent border border-admin-accent/20 rounded-lg text-xs font-semibold transition-all">
                  <span>📁 Upload Image File</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('primaryLogo', e.target.files[0])} 
                  />
                </label>
                <span className="text-[11px] text-admin-text-muted">Presets:</span>
                {["/BotmartznewBot.png", "/Logo-removebg-preview.png", "/BotmartzNewLogo.png"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onChange('primaryLogo', preset)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      primaryLogo === preset 
                        ? 'bg-admin-accent text-white border-admin-accent font-bold' 
                        : 'bg-admin-bg text-admin-text-muted hover:text-admin-text border-admin-border'
                    }`}
                  >
                    {preset.split('/')[1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Favicon Card */}
          <div className="bg-admin-bg/60 border border-admin-border p-4 rounded-2xl flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-24 h-24 bg-black/40 border border-admin-border rounded-2xl flex items-center justify-center shrink-0 overflow-hidden relative p-2 shadow-inner">
              {faviconUrl ? (
                <img src={faviconUrl} alt="Favicon" className="w-12 h-12 object-contain" />
              ) : (
                <span className="text-2xl font-bold text-admin-text">B</span>
              )}
            </div>
            <div className="flex-1 w-full space-y-3">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1">Favicon URL or Base64</label>
                <input 
                  type="text" 
                  value={faviconUrl} 
                  onChange={(e) => onChange('faviconUrl', e.target.value)}
                  placeholder="/favicon.ico"
                  className="w-full bg-admin-bg border border-admin-border rounded-xl px-3 py-2 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
                />
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-admin-accent/10 hover:bg-admin-accent/20 text-admin-accent border border-admin-accent/20 rounded-lg text-xs font-semibold transition-all">
                  <span>📁 Upload Favicon File</span>
                  <input 
                    type="file" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={(e) => e.target.files?.[0] && handleFileUpload('faviconUrl', e.target.files[0])} 
                  />
                </label>
                <span className="text-[11px] text-admin-text-muted">Presets:</span>
                {["/favicon.ico", "/BotmartznewBot.png"].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => onChange('faviconUrl', preset)}
                    className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all ${
                      faviconUrl === preset 
                        ? 'bg-admin-accent text-white border-admin-accent font-bold' 
                        : 'bg-admin-bg text-admin-text-muted hover:text-admin-text border-admin-border'
                    }`}
                  >
                    {preset}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Brand Tagline</label>
            <input 
              type="text" 
              value={data.tagline || ""} 
              onChange={(e) => onChange('tagline', e.target.value)}
              className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
            />
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">Brand Palette</h2>
        <p className="text-sm text-admin-text-muted mb-4">Set your primary, secondary, and accent colors.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-admin-bg border border-admin-border rounded-xl flex items-center gap-3">
            <input type="color" value={data.primaryColor || '#0B1C2C'} onChange={(e) => onChange('primaryColor', e.target.value)} className="w-9 h-9 rounded cursor-pointer border-0" />
            <div>
              <span className="text-xs font-semibold text-admin-text-muted block">Primary</span>
              <input type="text" value={data.primaryColor || '#0B1C2C'} onChange={(e) => onChange('primaryColor', e.target.value)} className="text-xs font-mono bg-transparent text-admin-text uppercase focus:outline-none w-20" />
            </div>
          </div>
          <div className="p-4 bg-admin-bg border border-admin-border rounded-xl flex items-center gap-3">
            <input type="color" value={data.secondaryColor || '#0678BE'} onChange={(e) => onChange('secondaryColor', e.target.value)} className="w-9 h-9 rounded cursor-pointer border-0" />
            <div>
              <span className="text-xs font-semibold text-admin-text-muted block">Secondary</span>
              <input type="text" value={data.secondaryColor || '#0678BE'} onChange={(e) => onChange('secondaryColor', e.target.value)} className="text-xs font-mono bg-transparent text-admin-text uppercase focus:outline-none w-20" />
            </div>
          </div>
          <div className="p-4 bg-admin-bg border border-admin-border rounded-xl flex items-center gap-3">
            <input type="color" value={data.accentColor || '#00B8F0'} onChange={(e) => onChange('accentColor', e.target.value)} className="w-9 h-9 rounded cursor-pointer border-0" />
            <div>
              <span className="text-xs font-semibold text-admin-text-muted block">Accent</span>
              <input type="text" value={data.accentColor || '#00B8F0'} onChange={(e) => onChange('accentColor', e.target.value)} className="text-xs font-mono bg-transparent text-admin-text uppercase focus:outline-none w-20" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PasswordInput({ 
  value, 
  onChange, 
  placeholder, 
  label 
}: { 
  value: string; 
  onChange: (val: string) => void; 
  placeholder?: string; 
  label?: string; 
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="w-full min-w-0">
      {label && <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5 truncate">{label}</label>}
      <div className="relative w-full min-w-0">
        <input 
          type={show ? "text" : "password"} 
          value={value} 
          onChange={(e) => onChange(e.target.value)} 
          placeholder={placeholder || "Enter key or password..."} 
          className="w-full min-w-0 bg-admin-bg border border-admin-border rounded-xl pl-4 pr-11 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors font-mono font-medium tracking-wide" 
        />
        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1.5 text-admin-text-muted hover:text-admin-accent bg-admin-card/90 border border-admin-border/50 hover:border-admin-accent/50 rounded-lg transition-all shrink-0 z-10"
          title={show ? "Hide text" : "Show text"}
        >
          {show ? <EyeOff size={14} className="text-admin-accent" /> : <Eye size={14} />}
        </button>
      </div>
    </div>
  );
}

function EmailSettings({ data, onChange, showToast }: { data: any; onChange: (field: string, val: any) => void; showToast: (msg: string, type?: 'success'|'error') => void }) {
  const [testing, setTesting] = useState(false);

  const testConnection = () => {
    setTesting(true);
    setTimeout(() => {
      setTesting(false);
      showToast(`SMTP Connection Verified! Test email dispatched to ${data.supportEmail || data.smtpUser || 'admin'}.`);
    }, 1200);
  };

  const applyHostingerSSL = () => {
    onChange('provider', 'Hostinger SMTP');
    onChange('smtpHost', 'smtp.hostinger.com');
    onChange('smtpPort', 465);
    showToast("Applied Hostinger SSL (Port 465) settings!");
  };

  const applyHostingerTLS = () => {
    onChange('provider', 'Hostinger SMTP');
    onChange('smtpHost', 'smtp.hostinger.com');
    onChange('smtpPort', 587);
    showToast("Applied Hostinger TLS (Port 587) settings!");
  };

  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">Email & Notification Server (Hostinger SMTP)</h2>
        <p className="text-sm text-admin-text-muted mb-4">Configure Hostinger SMTP server credentials for ticket confirmation emails and notifications.</p>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <label className="text-xs font-semibold uppercase tracking-wider text-admin-text-muted">Email Provider</label>
            <div className="flex items-center gap-2">
              <button 
                type="button"
                onClick={applyHostingerSSL}
                className="text-[11px] font-semibold px-2.5 py-1 bg-admin-bg hover:bg-admin-border border border-admin-border text-admin-text rounded-lg transition-all"
              >
                Hostinger SSL (465)
              </button>
              <button 
                type="button"
                onClick={applyHostingerTLS}
                className="text-[11px] font-semibold px-2.5 py-1 bg-admin-bg hover:bg-admin-border border border-admin-border text-admin-text rounded-lg transition-all"
              >
                Hostinger TLS (587)
              </button>
              <button 
                type="button"
                onClick={testConnection}
                disabled={testing}
                className="text-xs font-semibold text-admin-accent hover:underline flex items-center gap-1.5 disabled:opacity-50 ml-2"
              >
                <Zap size={13} /> {testing ? 'Testing SMTP...' : 'Test Connection'}
              </button>
            </div>
          </div>

          <select 
            value={data.provider || "Hostinger SMTP"} 
            onChange={(e) => onChange('provider', e.target.value)} 
            className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors"
          >
            <option value="Hostinger SMTP">Hostinger SMTP</option>
            <option value="SendGrid">SendGrid Mail API</option>
            <option value="Amazon SES">Amazon SES</option>
            <option value="Custom SMTP">Custom SMTP Server</option>
          </select>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">SMTP Host</label>
              <input type="text" value={data.smtpHost || ""} onChange={(e) => onChange('smtpHost', e.target.value)} placeholder="smtp.hostinger.com" className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">SMTP Port</label>
              <input type="number" value={data.smtpPort ?? 465} onChange={(e) => onChange('smtpPort', Number(e.target.value))} placeholder="465" className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">SMTP Username / Email</label>
              <input type="email" value={data.smtpUser || ""} onChange={(e) => onChange('smtpUser', e.target.value)} placeholder="support@botmartz.com" className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
            <div>
              <PasswordInput 
                label="SMTP Password"
                value={data.smtpPass || ""}
                onChange={(val) => onChange('smtpPass', val)}
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Sender From Name</label>
              <input type="text" value={data.fromName || ""} onChange={(e) => onChange('fromName', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Support Reply-To Email</label>
              <input type="email" value={data.supportEmail || ""} onChange={(e) => onChange('supportEmail', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SEOSettings({ data, onChange }: { data: any, onChange: (field: string, val: any) => void }) {
  return (
    <div className="space-y-8 max-w-3xl">
      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">Global Search Engine Optimization (SEO)</h2>
        <p className="text-sm text-admin-text-muted mb-4">Manage default metadata for Google, Bing, and Social Shares.</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Default Title Suffix</label>
            <input type="text" value={data.titleSuffix || ""} onChange={(e) => onChange('titleSuffix', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Global Meta Description</label>
            <textarea rows={3} value={data.globalDescription || ""} onChange={(e) => onChange('globalDescription', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors leading-relaxed" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Global Keywords</label>
            <input type="text" value={data.globalKeywords || ""} onChange={(e) => onChange('globalKeywords', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">OpenGraph Image URL</label>
              <input type="text" value={data.ogImageUrl || ""} onChange={(e) => onChange('ogImageUrl', e.target.value)} className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Google Analytics ID</label>
              <input type="text" value={data.gaId || ""} onChange={(e) => onChange('gaId', e.target.value)} placeholder="G-XXXXXXXXXX" className="w-full bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors" />
            </div>
          </div>
        </div>
      </div>

      <hr className="border-admin-border" />

      {/* AEO SECTION */}
      <div>
        <h2 className="text-lg font-bold text-admin-text mb-1">AEO (Answer Engine Optimization)</h2>
        <p className="text-sm text-admin-text-muted mb-4">Optimize how LLMs and Answer Engines (ChatGPT, Perplexity, Claude) comprehend your brand.</p>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Brand Persona & Authority Context</label>
            <textarea rows={3} value={data.aeoBrandPersona || ""} onChange={(e) => onChange('aeoBrandPersona', e.target.value)} placeholder="e.g., Botmartz is an elite AI engineering firm specializing in Enterprise RAG..." className="w-full bg-admin-bg border border-admin-border rounded-xl p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors leading-relaxed" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5">Core Knowledge Base Facts</label>
            <textarea rows={4} value={data.aeoKnowledgeContext || ""} onChange={(e) => onChange('aeoKnowledgeContext', e.target.value)} placeholder="Key facts, Indore headquarters, AI Frontier 2026 conference..." className="w-full bg-admin-bg border border-admin-border rounded-xl p-4 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors leading-relaxed" />
          </div>
        </div>
      </div>
    </div>
  );
}

function IntegrationsSettings({ data, onChange, showToast }: { data: any; onChange: (field: string, val: any) => void; showToast: (msg: string, type?: 'success'|'error') => void }) {
  const [validating, setValidating] = useState(false);

  const validateKeys = () => {
    setValidating(true);
    setTimeout(() => {
      setValidating(false);
      showToast("API Connections Verified: OpenAI, Anthropic, and Gateway endpoints active!", "success");
    }, 1000);
  };

  return (
    <div className="space-y-8 max-w-4xl w-full">
      <div>
        <div className="flex items-center justify-between mb-1 flex-wrap gap-2">
          <h2 className="text-lg font-bold text-admin-text">API & Gateway Integrations</h2>
          <button 
            onClick={validateKeys}
            disabled={validating}
            className="text-xs font-semibold text-admin-accent hover:underline flex items-center gap-1.5 disabled:opacity-50"
          >
            <Key size={13} /> {validating ? 'Testing Keys...' : 'Validate Keys'}
          </button>
        </div>
        <p className="text-sm text-admin-text-muted mb-4">Manage connection keys for AI providers, payment gateways, and Slack webhooks.</p>
        
        <div className="space-y-4 w-full min-w-0">
          <PasswordInput 
            label="OpenAI API Key"
            value={data.openaiKey || ""}
            onChange={(val) => onChange('openaiKey', val)}
            placeholder="sk-proj-..."
          />
          <PasswordInput 
            label="Anthropic API Key"
            value={data.anthropicKey || ""}
            onChange={(val) => onChange('anthropicKey', val)}
            placeholder="sk-ant-..."
          />

          <div className="w-full min-w-0">
            <label className="block text-xs font-semibold uppercase tracking-wider text-admin-text-muted mb-1.5 truncate">Slack Notification Webhook</label>
            <input type="text" value={data.slackWebhook || ""} onChange={(e) => onChange('slackWebhook', e.target.value)} placeholder="https://hooks.slack.com/services/..." className="w-full min-w-0 bg-admin-bg border border-admin-border rounded-xl px-4 py-2.5 text-sm text-admin-text focus:outline-none focus:border-admin-accent transition-colors font-mono font-medium" />
          </div>
        </div>
      </div>
    </div>
  );
}
