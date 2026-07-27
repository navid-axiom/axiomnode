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

export default function TermsOfUsePage() {
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

      {/* Main Legal Content Body */}
      <main className="p-6 md:p-12 max-w-4xl mx-auto w-full flex-1 space-y-8">
        
        {/* Document Header */}
        <div className="border-b border-[#162544] pb-6 space-y-2">
          <span className="px-3 py-1 bg-[#00C2E0]/15 text-[#00C2E0] border border-[#00C2E0]/40 rounded-full font-mono text-[11px] uppercase tracking-widest font-bold">
            Legal Terms & Service Agreement
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white font-['Montserrat',sans-serif]">
            Terms of Use
          </h1>
          <p className="text-xs font-mono text-slate-400">
            Effective Date: July 2026 | Axiom Vision LLC
          </p>
        </div>

        {/* Terms Sections */}
        <div className="space-y-8 text-sm text-slate-300 leading-relaxed font-normal">
          
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              1. Acceptance & Description of Service
            </h2>
            <p>
              By installing, connecting, or utilizing an Axiom Node hardware unit or accessing the Axiom Vision client portal, you (&quot;Client&quot;) agree to be bound by these Terms of Use. Axiom Vision provides a supplementary, edge-AI threat detection overlay that analyzes existing IP camera feeds over RTSP to dispatch instant notifications for verified human presence.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              2. 30-Day Evaluation Pilot & Hardware Bailment
            </h2>
            <p>
              For clients participating in our 30-day evaluation pilot program:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Pilot Scope:</strong> The 30-day trial covers up to <strong>eight (8) high-priority camera feeds</strong> on one (1) pre-configured Standard Axiom Node ($500 hardware value) at $0.00 base trial cost.
              </li>
              <li>
                <strong>Title to Hardware:</strong> All Axiom Node hardware provided during evaluation remains the exclusive personal property of Axiom Vision LLC. Client is granted a limited, revocable license to test the device on site.
              </li>
              <li>
                <strong>Trial Conclusion:</strong> At the expiration of 30 days, Client may convert to a commercial subscription or return the hardware unit in good condition within seven (7) business days.
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              3. Critical Limitation of Liability & Security Disclaimer
            </h2>
            <div className="p-4 bg-amber-950/40 border border-amber-500/50 rounded-xl text-xs font-mono text-amber-200 leading-relaxed space-y-2">
              <p>
                ⚠️ <strong>IMPORTANT LEGAL DISCLAIMER:</strong> AXIOM VISION LLC IS NOT AN INSURANCE COMPANY, DEDICATED GUARD SERVICE, OR LAW ENFORCEMENT ENTITY. THE AXIOM NODE IS PROVIDED AS A SUPPLEMENTARY NOTIFICATION TOOL.
              </p>
              <p>
                Axiom Vision shall NOT be held liable for any stolen property, vandalism, trespass, business interruption, lost profits, or property damage occurring on Client property during or after pilot deployment, regardless of system online status or notification delivery times. Client retains full responsibility for maintaining primary casualty and property insurance.
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              4. Anti-Tampering & Proprietary Protections
            </h2>
            <p>
              Client acknowledges that the Axiom Node software, computer vision scripts, Gemini AI prompts, and network configurations contain trade secrets of Axiom Vision LLC. Client agrees NOT to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Reverse-engineer, decompile, disassemble, or inspect the file system or Python scripts inside the Axiom Node.</li>
              <li>Remove hardware chassis tamper-evident seals or grant unapproved third parties administrative physical access.</li>
              <li>Probe, scan, or execute port tests against the device hardware over local area networks.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              5. Network Isolation & System Dependencies
            </h2>
            <p>
              Client is responsible for providing power and an internet-connected Ethernet port (recommended on an isolated Guest VLAN). Axiom Vision is not responsible for delayed alerts caused by local power outages, client Internet Service Provider (ISP) downtime, or cell network carrier failures.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              6. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of Arizona, without regard to its conflict of law principles. Any dispute arising under these Terms shall be resolved in the state or federal courts located in Maricopa County, Arizona.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg font-bold text-white font-['Montserrat',sans-serif]">
              7. Contact & Notice
            </h2>
            <p>Direct formal legal inquiries or notices to:</p>
            <div className="p-4 bg-[#0A1328] border border-[#162544] rounded-xl font-mono text-xs space-y-1">
              <p className="text-white font-bold">Axiom Vision LLC — Legal Department</p>
              <p>Email: <a href="mailto:navid@axiomvision.io" className="text-[#00C2E0] underline hover:text-white">navid@axiomvision.io</a></p>
              <p>Phone: <a href="tel:2132489788" className="text-[#00C2E0] underline hover:text-white">(213) 248-9788</a></p>
            </div>
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#162544] bg-[#0A1328] px-8 py-6 text-center text-xs font-mono text-slate-400">
        <p>© 2026 Axiom Vision LLC. All rights reserved. | <Link href="/privacy" className="underline hover:text-white">Privacy Policy</Link></p>
      </footer>
    </div>
  );
}
