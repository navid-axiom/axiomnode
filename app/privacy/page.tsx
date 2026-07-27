"use client";

import Link from "next/link";
import { useState } from "react";

function AxiomLogo({ className = "h-10 md:h-12" }: { className?: string }) {
  const [usePng, setUsePng] = useState(false);

  return (
    <Link href="/" className={`flex items-center gap-3 select-none ${className}`}>
      {usePng ? (
        <img
          src="/axiom-logo.png"
          alt="Axiom Vision Logo"
          className="h-10 md:h-12 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,194,224,0.3)]"
          onError={() => setUsePng(false)}
        />
      ) : (
        <div className="flex items-center gap-3 group cursor-pointer">
          <svg
            viewBox="0 0 120 120"
            className="h-9 md:h-10 w-auto aspect-square overflow-visible drop-shadow-[0_0_16px_rgba(0,194,224,0.35)]"
          >
            <path
              d="M 60,10 L 110,110 L 84,110 L 60,54 L 36,110 L 10,110 Z"
              fill="#FFFFFF"
            />
            <circle
              cx="60"
              cy="78"
              r="9.5"
              fill="#00C2E0"
              className="animate-pulse"
            />
          </svg>
          <div className="flex flex-col leading-none justify-center">
            <span className="font-['Montserrat',sans-serif] font-extrabold tracking-[0.14em] text-white text-xl md:text-2xl">
              AXIOM
            </span>
            <span className="font-['Poppins',sans-serif] font-medium tracking-[0.45em] text-white text-[9px] md:text-[11px] uppercase mt-0.5 opacity-90">
              VISION
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#070D1D] text-[#F0F4F9] flex flex-col font-['Inter',sans-serif] selection:bg-[#00C2E0] selection:text-[#070D1D]">
      
      {/* Navigation Header */}
      <header className="border-b border-[#162544] bg-[#0A1328]/95 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between shadow-2xl">
        <AxiomLogo />

        <div className="flex items-center gap-4">
          <Link
            href="/"
            className="text-xs font-mono text-slate-300 hover:text-[#00C2E0] transition"
          >
            ← Back to Home
          </Link>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-[#00C2E0] text-[#070D1D] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A7E8F3] transition shadow-[0_0_12px_rgba(0,194,224,0.4)]"
          >
            Client Portal
          </Link>
        </div>
      </header>

      {/* Main Privacy Policy Legal Body */}
      <main className="p-6 md:p-12 max-w-4xl mx-auto w-full flex-1 space-y-8">
        
        {/* Document Header */}
        <div className="border-b border-[#162544] pb-6 space-y-2">
          <span className="px-3 py-1 bg-[#00C2E0]/15 text-[#00C2E0] border border-[#00C2E0]/40 rounded-full font-mono text-[11px] uppercase tracking-widest font-bold">
            Legal & Data Privacy Specification
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white font-['Montserrat',sans-serif]">
            Privacy Policy
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Effective Date: July 2026 | Axiom Vision LLC
          </p>
        </div>

        {/* Policy Sections */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              1. Executive Overview & Scope
            </h2>
            <p>
              Axiom Vision LLC (&quot;Axiom Vision,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) operates an artificial intelligence security overlay system consisting of on-premise hardware units (&quot;Axiom Node&quot;) and associated cloud notification routing services. This Privacy Policy outlines our strict protocols regarding the collection, processing, local memory storage, and protection of data when clients (&quot;Client&quot;) deploy Axiom Vision hardware on commercial properties.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              2. Edge Video Processing & Transient Memory Guarantee
            </h2>
            <div className="p-4 bg-[#0A1328] border border-[#00C2E0]/40 rounded-xl text-xs font-mono text-[#A7E8F3] leading-relaxed">
              ⚡ <strong>Local RAM-Only Processing Architecture:</strong> 99.9% of raw video streams processed by the Axiom Node stay inside local physical random-access memory (RAM) and are permanently overwritten every 10 seconds.
            </div>
            <p>
              Unlike legacy cloud surveillance architectures that continuously upload raw 24/7 video feeds over public networks, Axiom Vision executes local edge processing:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Local Object Filtering (YOLOv8):</strong> Video streams are analyzed locally on the edge hardware. Unflagged video (wind, stray animals, vehicles) is immediately purged from RAM without ever touching cloud servers or hard drives.
              </li>
              <li>
                <strong>Selective Cloud Verification:</strong> Only when local vision algorithms confirm a human presence does the Axiom Node extract a magnified single frame crop and a short 10-second event clip for encrypted cloud threat inspection.
              </li>
              <li>
                <strong>Read-Only NVR Isolation:</strong> The Axiom Node connects to existing local camera setups via read-only RTSP protocols. It cannot modify, delete, or rewrite client NVR hard drives or corporate databases.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              3. Information We Collect
            </h2>
            <p>We limit data collection to operational metadata necessary for emergency dispatching:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Account & Administrative Data:</strong> Client contact name, business entity name, phone number, email address, physical site location, and designated alert recipients (Telegram chat IDs or SMS targets).
              </li>
              <li>
                <strong>Incident Records & Keyframes:</strong> Timestamped threat logs, magnified suspect keyframe crops, and 10-second HD video incident clips uploaded during verified alert events.
              </li>
              <li>
                <strong>Hardware Telemetry:</strong> Device online/offline heartbeat statuses, CPU/GPU temperature, uptime, and Tailscale encrypted tunnel connections for remote system maintenance.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              4. SMS & Emergency Telecommunications Disclosure (A2P 10DLC)
            </h2>
            <p>
              When Clients opt into SMS or messaging notifications, Axiom Vision transmits automated security alerts:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <strong>Emergency Purpose:</strong> Text and messaging alerts are dispatched strictly for real-time threat notifications (e.g., human intruder detected on fence line).
              </li>
              <li>
                <strong>No Marketing Spam:</strong> Phone numbers collected for alert dispatches are never sold, rented, or shared with third parties for marketing or promotional purposes.
              </li>
              <li>
                <strong>Opt-Out & Standard Rates:</strong> Message and data rates may apply depending on your mobile carrier. Clients can modify alert routing or opt out of SMS dispatches at any time by contacting our support team or replying <code>STOP</code>.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              5. Authorized Enterprise Subprocessors
            </h2>
            <p>We utilize trusted enterprise-grade infrastructure providers to fulfill service delivery:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Google AI Studio (Gemini Flash):</strong> Multi-modal threat keyframe analysis via encrypted API endpoints.</li>
              <li><strong>Supabase Cloud:</strong> Encrypted event logging and secure, time-limited video storage.</li>
              <li><strong>Vercel Inc.:</strong> Application hosting and secure webhook routing.</li>
              <li><strong>Telegram / Twilio:</strong> Encrypted instant alert delivery to client mobile devices.</li>
              <li><strong>Tailscale Inc.:</strong> AES-256 encrypted peer-to-peer tunnels for remote node updates.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              6. Media License & Anonymized Demonstration Usage
            </h2>
            <p>
              In accordance with our Pilot Agreements, Clients grant Axiom Vision a non-exclusive license to use anonymized 10-second threat detection clips and event logs captured during pilot evaluations for internal AI model training and promotional case studies. Axiom Vision agrees to blur faces, license plates, and identifying property signage upon written client request.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              7. Data Retention & Deletion
            </h2>
            <p>
              Incident logs and clip media stored in cloud storage buckets are automatically purged after 30 days unless explicitly saved by the Client or required for official law enforcement investigations. Clients may request total deletion of their account records at any time.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              8. Contact Information
            </h2>
            <p>For data privacy requests or technical network isolation questions, contact:</p>
            <div className="p-4 bg-[#0A1328] border border-[#162544] rounded-xl font-mono text-xs space-y-1">
              <p className="text-white font-bold">Axiom Vision LLC — Privacy & Security Desk</p>
              <p>Email: <a href="mailto:navid@axiomvision.io" className="text-[#00C2E0] underline hover:text-white">navid@axiomvision.io</a></p>
              <p>Phone: <a href="tel:2132489788" className="text-[#00C2E0] underline hover:text-white">(213) 248-9788</a></p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#162544] bg-[#0A1328] px-8 py-6 text-center text-xs font-mono text-slate-400">
        <p>© 2026 Axiom Vision LLC. All rights reserved. | <Link href="/terms" className="underline hover:text-white">Terms of Use</Link></p>
      </footer>
    </div>
  );
}
