"use client";

import { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import { AlertCircle, CheckCircle, ScanFace, Loader2 } from "lucide-react";

export default function ScannerPage() {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [verifyStatus, setVerifyStatus] = useState<"idle" | "loading" | "success" | "error" | "already_scanned">("idle");
  const [message, setMessage] = useState<string>("");
  const [attendeeDetails, setAttendeeDetails] = useState<{name: string, type: string, qty: number} | null>(null);

  useEffect(() => {
    // Initialize Scanner
    const scanner = new Html5QrcodeScanner(
      "reader",
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

    return () => {
      scanner.clear().catch(console.error);
    };
  }, []);

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

    // Auto-reset after 3 seconds
    setTimeout(() => {
      setVerifyStatus("idle");
      setScanResult(null);
    }, 4000);
  };

  return (
    <div className="p-6 md:p-8 max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-3 border-b border-white/10 pb-4">
        <div className="w-10 h-10 rounded-xl bg-[#00B8F0]/10 flex items-center justify-center text-[#00B8F0]">
          <ScanFace size={20} />
        </div>
        <div>
          <h1 className="text-2xl font-bold font-space-grotesk tracking-tight text-white">Event Scanner</h1>
          <p className="text-sm text-[#8A9EB0]">Scan attendee tickets to verify entry.</p>
        </div>
      </div>

      {/* Scanner Container */}
      <div className="bg-[#0A1120] border border-white/10 rounded-2xl overflow-hidden p-4">
        <div id="reader" className="w-full text-white [&>div]:!border-none [&_button]:!bg-[#00B8F0] [&_button]:!text-white [&_button]:!rounded-lg [&_button]:!px-4 [&_button]:!py-2 [&_a]:hidden" />
      </div>

      {/* Result Container */}
      <div className="h-40">
        {verifyStatus === "loading" && (
          <div className="bg-[#050C18] border border-white/5 rounded-xl p-6 flex flex-col items-center justify-center gap-3 animate-pulse">
            <Loader2 className="w-8 h-8 text-[#00B8F0] animate-spin" />
            <p className="text-[#8A9EB0] text-sm">Verifying ticket...</p>
          </div>
        )}

        {verifyStatus === "success" && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 flex items-start gap-4 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
            <div className="mt-1">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div>
              <h3 className="text-green-400 font-bold text-lg">{message}</h3>
              <p className="text-white font-medium mt-1">Name: {attendeeDetails?.name}</p>
              <div className="flex gap-4 mt-2 text-sm text-green-300">
                <span>Type: <span className="uppercase font-mono">{attendeeDetails?.type}</span></span>
                <span>Qty: <span className="font-bold">{attendeeDetails?.qty}</span></span>
              </div>
            </div>
          </div>
        )}

        {verifyStatus === "already_scanned" && (
          <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-xl p-6 flex items-start gap-4">
            <div className="mt-1">
              <AlertCircle className="w-8 h-8 text-yellow-500" />
            </div>
            <div>
              <h3 className="text-yellow-500 font-bold text-lg">Already Scanned</h3>
              <p className="text-yellow-200/70 text-sm mt-1">{message}</p>
              <p className="text-white font-medium mt-2">Name: {attendeeDetails?.name}</p>
            </div>
          </div>
        )}

        {verifyStatus === "error" && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex items-start gap-4">
            <div className="mt-1">
              <AlertCircle className="w-8 h-8 text-red-500" />
            </div>
            <div>
              <h3 className="text-red-400 font-bold text-lg">Invalid Ticket</h3>
              <p className="text-red-300/70 text-sm mt-1">{message}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
