"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { AlertCircle, CheckCircle, ScanFace, Loader2, X } from "lucide-react";

interface EventScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onScanSuccessHook?: () => void;
}

export default function EventScannerModal({ isOpen, onClose, onScanSuccessHook }: EventScannerModalProps) {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "success" | "error" | "already_scanned">("idle");
  const [message, setMessage] = useState<string>("");
  const [attendeeDetails, setAttendeeDetails] = useState<{name: string, type: string, qty: number} | null>(null);

  useEffect(() => {
    if (!isOpen) return;

    // Wait a tick for the DOM to render the modal before mounting scanner
    const timer = setTimeout(() => {
      const scanner = new Html5QrcodeScanner(
        "reader-modal",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(onScanSuccess, onScanFailure);

      function onScanSuccess(decodedText: string) {
        if (verifyStatus !== "loading") {
          setScanResult(decodedText);
          verifyTicket(decodedText);
        }
      }

      function onScanFailure(error: any) {
        // Ignore background noise errors
      }

      // Cleanup on unmount or close
      return () => {
        scanner.clear().catch(console.error);
      };
    }, 100);

    return () => clearTimeout(timer);
  }, [isOpen, verifyStatus]);

  const verifyTicket = async (code: string) => {
    setVerifyStatus("loading");
    setAttendeeDetails(null);
    setMessage("");

    try {
      const res = await fetch("/api/scanner/verify-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ checkInCode: code })
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setVerifyStatus("success");
        setMessage(data.message);
        setAttendeeDetails({
          name: data.attendeeName,
          type: data.attendeeType,
          qty: data.quantity
        });
        if (onScanSuccessHook) onScanSuccessHook();
      } else if (res.status === 400 && data.alreadyCheckedIn) {
        setVerifyStatus("already_scanned");
        setMessage(data.error);
        setAttendeeDetails({
          name: data.attendeeName,
          type: "N/A",
          qty: 0
        });
      } else {
        setVerifyStatus("error");
        setMessage(data.error || "Verification failed");
      }
    } catch (err) {
      console.error(err);
      setVerifyStatus("error");
      setMessage("Network error verifying ticket");
    }

    // Auto-reset after 4 seconds
    setTimeout(() => {
      setVerifyStatus("idle");
      setScanResult(null);
    }, 4000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
      <div className="relative w-full max-w-lg bg-[#0A1120] border border-white/10 rounded-2xl shadow-2xl overflow-hidden text-white font-sans flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-4 border-b border-white/10">
          <div className="flex items-center gap-2">
            <ScanFace className="text-[#00B8F0]" size={20} />
            <h3 className="font-bold text-lg">Ticket Scanner</h3>
          </div>
          <button onClick={onClose} className="p-1 text-white/50 hover:text-white rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-4 overflow-y-auto flex-1 space-y-4">
          {/* Scanner Container */}
          <div className="bg-black/50 rounded-xl overflow-hidden p-2 border border-white/5">
            <div id="reader-modal" className="w-full text-white [&>div]:!border-none [&_button]:!bg-[#00B8F0] [&_button]:!text-white [&_button]:!rounded-lg [&_button]:!px-4 [&_button]:!py-2 [&_a]:hidden" />
          </div>

          {/* Result Container */}
          <div className="min-h-[120px]">
            {verifyStatus === "loading" && (
              <div className="bg-[#050C18] border border-white/5 rounded-xl p-4 flex items-center gap-3 animate-pulse">
                <Loader2 className="w-6 h-6 text-[#00B8F0] animate-spin" />
                <p className="text-[#8A9EB0] text-sm">Verifying ticket...</p>
              </div>
            )}

            {verifyStatus === "success" && (
              <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 flex items-start gap-3 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                <CheckCircle className="w-6 h-6 text-green-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-green-400 font-bold">{message}</h3>
                  <p className="text-white text-sm mt-1">Name: {attendeeDetails?.name}</p>
                  <div className="flex gap-4 mt-1 text-xs text-green-300">
                    <span>Type: <span className="uppercase font-mono">{attendeeDetails?.type}</span></span>
                    <span>Qty: <span className="font-bold">{attendeeDetails?.qty}</span></span>
                  </div>
                </div>
              </div>
            )}

            {verifyStatus === "already_scanned" && (
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-yellow-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-yellow-500 font-bold">Already Scanned</h3>
                  <p className="text-yellow-200/70 text-xs mt-1">{message}</p>
                  <p className="text-white text-sm mt-1">Name: {attendeeDetails?.name}</p>
                </div>
              </div>
            )}

            {verifyStatus === "error" && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-red-400 font-bold">Invalid Ticket</h3>
                  <p className="text-red-300/70 text-xs mt-1">{message}</p>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
