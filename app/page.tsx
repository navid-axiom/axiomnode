"use client";

import { useState } from "react";
import Link from "next/link";

function AxiomLogo({ className = "h-14 md:h-16" }: { className?: string }) {
  const [usePng, setUsePng] = useState(false);

  return (
    <Link href="/" className={`flex items-center gap-3 select-none ${className}`}>
      {usePng ? (
        <img
          src="/axiom-logo.png"
          alt="Axiom Vision Logo"
          className="h-14 md:h-16 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,194,224,0.3)]"
          onError={() => setUsePng(false)}
        />
      ) : (
        /* Native True-Transparent Vector SVG matching official brand geometry */
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <svg
            viewBox="0 0 120 120"
            className="h-12 md:h-14 w-auto aspect-square overflow-visible drop-shadow-[0_0_16px_rgba(0,194,224,0.35)]"
          >
            {/* White Geometric 'A' Frame */}
            <path
              d="M 60,10 L 15,102 L 38,102 L 60,54 L 82,102 L 105,102 Z"
              fill="#FFFFFF"
            />
            {/* Center Precision Pinpoint Circle */}
            <circle
              cx="60"
              cy="74"
              r="9.5"
              fill="#00C2E0"
              className="animate-pulse"
            />
          </svg>
          <div className="flex flex-col leading-none justify-center">
            <span className="font-['Montserrat',sans-serif] font-extrabold tracking-[0.14em] text-white text-2xl md:text-3xl">
              AXIOM
            </span>
            <span className="font-['Poppins',sans-serif] font-medium tracking-[0.45em] text-white text-[10px] md:text-[12px] uppercase mt-1 opacity-90">
              VISION
            </span>
          </div>
        </div>
      )}
    </Link>
  );
}

export default function LandingPage() {
  const [orderCameraCount, setOrderCameraCount] = useState<number>(4);
  const [vslDriveUrl] = useState<string>("https://drive.google.com/file/d/1-_Q8TElPQ9mPWcGmNUei8fq4S0MtNGfC/preview");

  const getNodeTier = (cams: number) => {
    if (cams <= 8) return { name: "Axiom Node Standard", price: 500, chip: "Intel N100 Edge Unit" };
    if (cams <= 16) return { name: "Axiom Node Pro", price: 1000, chip: "Core i5 + Edge GPU" };
    return { name: "Axiom Node Enterprise", price: 1500, chip: "Cluster Acceleration Node" };
  };

  const currentTier = getNodeTier(orderCameraCount);
  const monthlyTotal = 99 + (orderCameraCount * 35);
  const isPilotEligible = orderCameraCount <= 8;

  return (
    <div className="min-h-screen bg-[#0B172E] text-[#F0F4F9] flex flex-col font-['Inter',sans-serif] selection:bg-[#00C2E0] selection:text-[#0B172E]">
      
      {/* Header */}
      <header className="border-b border-[#162036] bg-[#0F1420]/90 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between shadow-xl">
        <AxiomLogo />

        <div className="flex items-center gap-4">
          <a
            href="tel:2132489788"
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-[#00C2E0] hover:text-white transition"
          >
            📞 (213) 248-9788
          </a>
          <Link
            href="/dashboard"
            className="px-4 py-2 rounded-xl bg-[#00C2E0] text-[#0B172E] font-bold text-xs uppercase tracking-wider hover:bg-[#A7E8F3] transition shadow-[0_0_12px_rgba(0,194,224,0.4)]"
          >
            Client Portal Login
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col gap-10">
        
        {/* Pilot Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mt-6">
          <span className="px-3 py-1 bg-[#00C2E0]/10 text-[#00C2E0] border border-[#00C2E0]/30 rounded-full font-mono text-xs uppercase tracking-widest">
            Zero-Friction Camera Intelligence Overlay
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-['Montserrat',sans-serif] leading-tight">
            Stop Paying For False Alarms. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2E0] to-[#A7E8F3]">
              Turn Passive Cameras Into Active Guards.
            </span>
          </h1>
          <p className="text-slate-300 text-base md:text-lg leading-relaxed">
            Your existing cameras show you how you got robbed yesterday. Axiom Node plugs into your existing router in 10 minutes, ignores the wind and animals for $0, and texts your phone the second a human threat jumps the fence.
          </p>
        </div>

        {/* Video Player Integration */}
        <div className="relative aspect-video max-w-4xl mx-auto w-full bg-[#0F1420] border-2 border-[#00C2E0]/40 rounded-3xl overflow-hidden shadow-[0_0_30px_rgba(0,194,224,0.15)] group">
          {vslDriveUrl.includes("drive.google.com") ? (
            <iframe
              src={vslDriveUrl}
              className="w-full h-full border-0"
              allow="autoplay"
              title="Axiom Vision Overview Demo"
            />
          ) : (
            <video
              src={vslDriveUrl}
              controls
              className="w-full h-full object-cover"
            />
          )}
        </div>

        {/* Direct Contact Callout */}
        <div className="p-6 bg-gradient-to-r from-[#0F1420] via-[#162036] to-[#0F1420] border border-[#00C2E0]/40 rounded-3xl text-center space-y-4 max-w-3xl mx-auto shadow-2xl">
          <h3 className="text-xl font-bold font-['Montserrat',sans-serif] text-white">
            Ready to Evaluate Axiom Vision on Your Lot?
          </h3>
          <p className="text-slate-300 text-sm">
            Contact us directly to request your pre-configured 30-day trial unit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-mono pt-2">
            <a 
              href="tel:2132489788" 
              className="px-6 py-3 rounded-xl bg-[#00C2E0] text-[#0B172E] font-bold hover:bg-[#A7E8F3] transition flex items-center gap-2 shadow-lg"
            >
              📞 Call Direct: (213) 248-9788
            </a>
            <a 
              href="mailto:navid@axiomvision.io" 
              className="px-6 py-3 rounded-xl bg-[#0B172E] border border-[#00C2E0]/50 text-white font-bold hover:border-[#00C2E0] transition flex items-center gap-2"
            >
              ✉️ Email: navid@axiomvision.io
            </a>
          </div>
        </div>

        {/* Informational Capacity & Rate Calculator */}
        <div className="p-8 bg-[#0F1420] border border-[#162036] rounded-3xl shadow-2xl space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-bold font-['Montserrat',sans-serif] text-white">
              30-Day "Blindspot" Pilot Capacity & Pricing Calculator
            </h2>
            <p className="text-slate-400 text-sm max-w-xl mx-auto">
              Evaluate your primary camera feeds. The 30-day free trial covers up to 8 high-priority blindspot cameras on 1 Standard Node.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Camera Slider */}
            <div className="space-y-6 bg-[#0B172E] p-6 rounded-2xl border border-[#162036]">
              <div className="flex justify-between items-center">
                <label className="text-sm font-mono uppercase text-slate-300">Total Lot Cameras:</label>
                <span className="text-2xl font-bold font-mono text-[#00C2E0]">{orderCameraCount} Feeds</span>
              </div>

              <input 
                type="range" 
                min="1" 
                max="30" 
                value={orderCameraCount} 
                onChange={(e) => setOrderCameraCount(parseInt(e.target.value))}
                className="w-full accent-[#00C2E0] bg-[#162036] h-2 rounded-lg cursor-pointer"
              />

              {/* Conditional Notice based on 8-camera threshold */}
              {!isPilotEligible ? (
                <div className="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs font-mono text-amber-200">
                  ⚠️ <strong>Pilot Capacity Limit:</strong> Free 30-day trials are capped at <strong>8 primary blindspot cameras</strong> ($500 Standard Node value). Sites with {orderCameraCount} feeds expand to post-trial commercial rates.
                </div>
              ) : (
                <div className="p-3 bg-[#00C2E0]/10 border border-[#00C2E0]/30 rounded-xl text-xs font-mono text-[#A7E8F3]">
                  ⚡ <strong>Pilot Note:</strong> You are evaluating <strong>{orderCameraCount} camera feeds</strong>. Your lot qualifies for the 100% free 30-day evaluation trial.
                </div>
              )}

              <div className="space-y-2 text-xs font-mono text-slate-400 pt-2 border-t border-[#162036]">
                <div className="flex justify-between">
                  <span>Assigned Hardware:</span>
                  <span className="text-white font-bold">{currentTier.name}</span>
                </div>
                <div className="flex justify-between">
                  <span>Included AI Audits:</span>
                  <span className="text-[#A7E8F3]">1,000 / camera / mo</span>
                </div>
              </div>
            </div>

            {/* Rate Output Card (Dynamic Dollar Amount Display) */}
            <div className="bg-gradient-to-br from-[#162036] to-[#0F1420] p-6 rounded-2xl border border-[#00C2E0]/40 space-y-4">
              <div className="space-y-1">
                <span className="text-xs font-mono uppercase text-[#00C2E0]">
                  {isPilotEligible ? "30-Day Pilot Evaluation Rate:" : "Standard Commercial Investment Rate:"}
                </span>
                
                {isPilotEligible ? (
                  <div>
                    <div className="text-4xl font-extrabold font-['Montserrat',sans-serif] text-white">
                      $0.00 <span className="text-xs font-normal text-slate-400">for 30 days</span>
                    </div>
                    <p className="text-[11px] text-emerald-400 font-mono mt-1">
                      ✓ 100% Free 30-Day Pilot (Up to 8 cameras)
                    </p>
                  </div>
                ) : (
                  <div>
                    <div className="text-3xl font-extrabold font-['Montserrat',sans-serif] text-amber-300">
                      ${monthlyTotal} <span className="text-xs font-normal text-slate-400">/ month</span>
                    </div>
                    <p className="text-[11px] text-amber-200/80 font-mono mt-1">
                      + ${currentTier.price} one-time hardware fee ({orderCameraCount} feeds exceeds 8-camera free trial cap)
                    </p>
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-slate-700/60 space-y-1 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span>Hardware Unit Cost:</span>
                  <span>${currentTier.price} one-time</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Post-Trial Subscription:</span>
                  <span className="text-[#00C2E0] font-bold">${monthlyTotal} / month</span>
                </div>
              </div>

              <div className="p-3 bg-[#0B172E] border border-[#162036] rounded-xl text-center">
                <p className="text-xs font-mono text-[#A7E8F3]">
                  ℹ️ <strong className="text-white">Pilot Request Info:</strong> Call <a href="tel:2132489788" className="underline text-white">213-248-9788</a> or email <a href="mailto:navid@axiomvision.io" className="underline text-white">navid@axiomvision.io</a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#162036] bg-[#0F1420] px-8 py-6 text-center text-xs font-mono text-slate-500">
        <p>© 2026 Axiom Vision LLC. All rights reserved. Direct Inquiries: navid@axiomvision.io | (213) 248-9788</p>
      </footer>
    </div>
  );
}
