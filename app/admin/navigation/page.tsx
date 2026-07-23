"use client";

import { useState, useEffect } from "react";
import { db } from "@/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { Plus, Trash2, GripVertical, ChevronDown, ChevronRight, Save, Eye, AlertCircle, CheckCircle } from "lucide-react";

interface NavDropdownItem {
  name: string;
  path: string;
}

interface NavItem {
  name: string;
  path: string;
  dropdown?: NavDropdownItem[];
}

const DEFAULT_ITEMS: NavItem[] = [
  { name: "Home", path: "/" },
  { name: "Work", path: "/work", dropdown: [{ name: "Labs", path: "/work/labs" }, { name: "Open Source", path: "/work/open-source" }] },
  { name: "Engineering Insights", path: "/insights" },
  { name: "Community", path: "/community", dropdown: [{ name: "Events", path: "/community/events" }, { name: "Discord & Forum", path: "/community" }] },
];

export default function NavigationAdminPage() {
  const [items, setItems] = useState<NavItem[]>(DEFAULT_ITEMS);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const snap = await getDoc(doc(db, "site_config", "navbar"));
        if (snap.exists()) {
          const data = snap.data();
          if (Array.isArray(data?.items) && data.items.length > 0) {
            setItems(data.items);
          }
        }
      } catch (e) {
        console.error("Failed to load navbar config:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const updateItem = (index: number, field: keyof NavItem, value: string) => {
    setItems(prev => prev.map((it, i) => i === index ? { ...it, [field]: value } : it));
  };

  const addItem = () => {
    setItems(prev => [...prev, { name: "New Link", path: "/new-link" }]);
    setExpandedIndex(items.length);
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
    setExpandedIndex(null);
  };

  const addDropdownItem = (navIndex: number) => {
    setItems(prev => prev.map((it, i) => {
      if (i !== navIndex) return it;
      return { ...it, dropdown: [...(it.dropdown || []), { name: "Sub Link", path: "/sub-link" }] };
    }));
  };

  const updateDropdownItem = (navIndex: number, subIndex: number, field: keyof NavDropdownItem, value: string) => {
    setItems(prev => prev.map((it, i) => {
      if (i !== navIndex) return it;
      const newDropdown = (it.dropdown || []).map((d, di) => di === subIndex ? { ...d, [field]: value } : d);
      return { ...it, dropdown: newDropdown };
    }));
  };

  const removeDropdownItem = (navIndex: number, subIndex: number) => {
    setItems(prev => prev.map((it, i) => {
      if (i !== navIndex) return it;
      const newDropdown = (it.dropdown || []).filter((_, di) => di !== subIndex);
      return { ...it, dropdown: newDropdown.length > 0 ? newDropdown : undefined };
    }));
  };

  const moveItem = (index: number, direction: "up" | "down") => {
    const newItems = [...items];
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setItems(newItems);
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("idle");
    try {
      await setDoc(doc(db, "site_config", "navbar"), {
        items,
        updatedAt: serverTimestamp(),
      });
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
    } catch (e) {
      console.error("Failed to save navbar:", e);
      setStatus("error");
    } finally {
      setSaving(false);
    }
  };

  const resetToDefaults = () => {
    if (confirm("Are you sure you want to reset all navigation items to defaults? Your custom changes will be lost.")) {
      setItems(DEFAULT_ITEMS);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-admin-text">Navigation Manager</h1>
          <p className="text-sm text-admin-text-muted mt-0.5">Add, edit, or remove navbar links. Changes will reflect live across the website.</p>
        </div>
        <div className="flex items-center gap-2">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-admin-text-muted hover:text-admin-text border border-admin-border rounded-lg transition-colors"
          >
            <Eye size={13} /> Preview
          </a>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50"
          >
            <Save size={13} />
            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>

      {/* Status */}
      {status === "success" && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
          <CheckCircle size={15} /> Changes saved successfully! Refresh the website to see the updated navbar.
        </div>
      )}
      {status === "error" && (
        <div className="flex items-center gap-2 mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
          <AlertCircle size={15} /> Failed to save. Please check your admin permissions.
        </div>
      )}

      {/* Nav Items List */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div key={index} className="bg-admin-card border border-admin-border rounded-xl overflow-hidden">
            {/* Item Header Row */}
            <div className="flex items-center gap-2 p-3">
              <div className="flex flex-col gap-0.5 shrink-0">
                <button onClick={() => moveItem(index, "up")} disabled={index === 0} className="p-0.5 text-admin-text-muted hover:text-admin-text disabled:opacity-20 transition-colors">
                  <ChevronRight size={12} className="-rotate-90" />
                </button>
                <GripVertical size={14} className="text-admin-text-muted/40 mx-auto" />
                <button onClick={() => moveItem(index, "down")} disabled={index === items.length - 1} className="p-0.5 text-admin-text-muted hover:text-admin-text disabled:opacity-20 transition-colors">
                  <ChevronRight size={12} className="rotate-90" />
                </button>
              </div>

              <input
                value={item.name}
                onChange={e => updateItem(index, "name", e.target.value)}
                className="flex-1 bg-admin-bg border border-admin-border rounded-lg px-3 py-1.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 font-medium"
                placeholder="Link Name"
              />
              <input
                value={item.path}
                onChange={e => updateItem(index, "path", e.target.value)}
                className="flex-1 bg-admin-bg border border-admin-border rounded-lg px-3 py-1.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 font-mono"
                placeholder="/path"
              />

              <button
                onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}
                className="flex items-center gap-1 px-2 py-1.5 text-xs text-admin-text-muted hover:text-admin-text border border-admin-border rounded-lg transition-colors shrink-0"
              >
                <ChevronDown size={12} className={`transition-transform ${expandedIndex === index ? "rotate-180" : ""}`} />
                <span>{item.dropdown?.length || 0} sub</span>
              </button>

              <button onClick={() => removeItem(index)} className="p-1.5 text-admin-text-muted hover:text-red-400 transition-colors shrink-0">
                <Trash2 size={14} />
              </button>
            </div>

            {/* Dropdown Sub-items */}
            {expandedIndex === index && (
              <div className="border-t border-admin-border bg-admin-bg/50 p-3 space-y-2">
                <p className="text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider mb-2">Dropdown Items</p>
                {(item.dropdown || []).map((sub, si) => (
                  <div key={si} className="flex items-center gap-2">
                    <input
                      value={sub.name}
                      onChange={e => updateDropdownItem(index, si, "name", e.target.value)}
                      className="flex-1 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-sm text-admin-text focus:outline-none focus:border-blue-500"
                      placeholder="Sub Link Name"
                    />
                    <input
                      value={sub.path}
                      onChange={e => updateDropdownItem(index, si, "path", e.target.value)}
                      className="flex-1 bg-admin-card border border-admin-border rounded-lg px-3 py-1.5 text-sm text-admin-text focus:outline-none focus:border-blue-500 font-mono"
                      placeholder="/path"
                    />
                    <button onClick={() => removeDropdownItem(index, si)} className="p-1.5 text-admin-text-muted hover:text-red-400 transition-colors shrink-0">
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addDropdownItem(index)}
                  className="flex items-center gap-1.5 text-xs text-blue-400 hover:text-blue-300 transition-colors mt-1"
                >
                  <Plus size={12} /> Add Sub Link
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Add / Reset */}
      <div className="flex items-center justify-between mt-4">
        <button
          onClick={addItem}
          className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-blue-400 hover:text-blue-300 border border-blue-500/30 hover:border-blue-500/60 rounded-xl transition-all"
        >
          <Plus size={14} /> Add Nav Item
        </button>
        <button
          onClick={resetToDefaults}
          className="text-xs text-admin-text-muted hover:text-red-400 transition-colors"
        >
          Reset to Defaults
        </button>
      </div>

      {/* Preview box */}
      <div className="mt-8 p-4 bg-admin-bg border border-admin-border rounded-xl">
        <p className="text-[11px] font-semibold text-admin-text-muted uppercase tracking-wider mb-3">Live Preview</p>
        <div className="flex flex-wrap gap-2">
          {items.map((item, i) => (
            <div key={i} className="flex items-center gap-1 px-3 py-1.5 bg-admin-card border border-admin-border rounded-lg text-sm text-admin-text">
              {item.name}
              {item.dropdown && item.dropdown.length > 0 && (
                <ChevronDown size={12} className="text-admin-text-muted" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
