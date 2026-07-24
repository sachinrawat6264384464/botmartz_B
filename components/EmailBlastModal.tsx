"use client";

import { useState } from "react";
import { Mail, Loader2, X, Send } from "lucide-react";

interface EmailBlastModalProps {
  isOpen: boolean;
  onClose: () => void;
  email: string; // Admin email
  password: string; // Admin password
}

export default function EmailBlastModal({ isOpen, onClose, email, password }: EmailBlastModalProps) {
  const [subject, setSubject] = useState("");
  const [htmlBody, setHtmlBody] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject || !htmlBody) {
      setStatus("error");
      setMessage("Please fill in both subject and body.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to send this email to all paid attendees? This cannot be undone.");
    if (!confirm) return;

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/scanner/email-blast", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, subject, htmlBody })
      });
      
      const data = await res.json();
      
      if (res.ok && data.success) {
        setStatus("success");
        setMessage(`Successfully sent to ${data.sentCount} attendees.`);
        setSubject("");
        setHtmlBody("");
      } else {
        setStatus("error");
        setMessage(data.error || "Failed to send emails.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Network error occurred.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-[#0A1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white font-sans flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Mail className="text-[#00B8F0]" size={20} />
            <h3 className="font-bold text-lg">Send Email Blast</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/50 hover:text-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <p className="text-[#8A9EB0] text-sm mb-6">
            This will send an email to all attendees who have successfully paid and are registered in the system. Use this for announcements, reminders, or feedback links.
          </p>

          <form onSubmit={handleSend} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Subject Line</label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Important update regarding the event..."
                className="w-full bg-[#050C18] border border-white/10 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-[#00B8F0] transition-colors"
                disabled={status === "loading"}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Email Body (HTML supported)</label>
              <textarea
                value={htmlBody}
                onChange={(e) => setHtmlBody(e.target.value)}
                placeholder="<p>Hi there,</p><br/><p>We are excited to see you!</p>"
                rows={8}
                className="w-full bg-[#050C18] border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#00B8F0] transition-colors font-mono text-sm"
                disabled={status === "loading"}
              />
            </div>

            {status === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            {status === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-3 rounded-lg text-sm">
                {message}
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-[#00B8F0] hover:bg-[#0096C7] disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Sending Broadcast...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    Send to All Attendees
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
