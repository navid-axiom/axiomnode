"use client";

import { useState } from "react";
import Link from "next/link";

function AxiomLogo({ className = "h-12 md:h-14" }: { className?: string }) {
  const [usePng, setUsePng] = useState(false);

  return (
    <Link href="/" className={`flex items-center gap-3 select-none ${className}`}>
      {usePng ? (
        <img
          src="/axiom-logo.png"
          alt="Axiom Vision Logo"
          className="h-12 md:h-14 w-auto object-contain drop-shadow-[0_0_15px_rgba(0,194,224,0.3)]"
          onError={() => setUsePng(false)}
        />
      ) : (
        /* Native True-Transparent Vector SVG matching official brand geometry */
        <div className="flex items-center gap-3.5 group cursor-pointer">
          <svg
            viewBox="0 0 120 120"
            className="h-10 md:h-12 w-auto aspect-square overflow-visible drop-shadow-[0_0_16px_rgba(0,194,224,0.35)]"
          >
            {/* White Geometric 'A' Apex Frame matching official geometry */}
            <path
              d="M 60,10 L 110,110 L 84,110 L 60,54 L 36,110 L 10,110 Z"
              fill="#FFFFFF"
            />
            {/* Center Precision Pinpoint Circle */}
            <circle
              cx="60"
              cy="78"
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
  const [vslDriveUrl] = useState<string>(
    "https://drive.google.com/file/d/1tMn3APA6GkphOBsGpVnVyxSYSKfbqVqr/preview"
  );
  const [vslDirectUrl] = useState<string>(
    "https://drive.google.com/file/d/1tMn3APA6GkphOBsGpVnVyxSYSKfbqVqr/view?usp=sharing"
  );
  const [imgError, setImgError] = useState<Record<string, boolean>>({});
  const [isVideoModalOpen, setIsVideoModalOpen] = useState<boolean>(false);

  const getNodeTier = (cams: number) => {
    if (cams <= 8) {
      return {
        id: "standard",
        name: "Axiom Node Standard",
        price: 500,
        chip: "Intel N100 Quad-Core Edge AI",
        formFactor: "Ultra-Compact Desktop Chassis",
        dimensions: '4.5" × 4.5" × 1.5"',
        maxFeeds: "8 RTSP Feeds",
        img: "/Axiom Node Standard.png"
      };
    }
    if (cams <= 16) {
      return {
        id: "pro",
        name: "Axiom Node Pro",
        price: 1000,
        chip: "Core i5 + Dedicated Neural GPU",
        formFactor: "High-Airflow Performance Node",
        dimensions: '8.0" × 8.0" × 3.2"',
        maxFeeds: "16 RTSP Feeds",
        img: "/Axiom Node Pro.png"
      };
    }
    return {
      id: "enterprise",
      name: "Axiom Node Enterprise",
      price: 1500,
      chip: "Dual-GPU Acceleration Cluster",
      formFactor: "2U Server-Rack / Heavy Industrial Unit",
      dimensions: '19.0" × 18.0" × 3.5" (2U Rack)',
      maxFeeds: "30 RTSP Feeds",
      img: "/Axiom Node Enterprise.png"
    };
  };

  const currentTier = getNodeTier(orderCameraCount);
  const monthlyTotal = 99 + orderCameraCount * 35;
  const isPilotEligible = orderCameraCount <= 8;

  const handleImageError = (tierId: string) => {
    setImgError((prev) => ({ ...prev, [tierId]: true }));
  };

  return (
    <div className="min-h-screen bg-[#070D1D] text-[#F0F4F9] flex flex-col font-['Inter',sans-serif] selection:bg-[#00C2E0] selection:text-[#070D1D]">
      
      {/* Navigation Header */}
      <header className="border-b border-[#162544] bg-[#0A1328]/95 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-4 flex items-center justify-between shadow-2xl">
        <AxiomLogo />

        <div className="flex items-center gap-4">
          <a
            href="tel:2132489788"
            className="hidden md:inline-flex items-center gap-2 text-xs font-mono text-[#00C2E0] hover:text-white transition bg-[#101F3C] px-3 py-1.5 rounded-lg border border-[#1B325C]"
          >
            📞 (213) 248-9788
          </a>
          <Link
            href="/dashboard"
            className="px-5 py-2.5 rounded-xl bg-[#00C2E0] text-[#070D1D] font-extrabold text-xs uppercase tracking-wider hover:bg-[#A7E8F3] transition shadow-[0_0_15px_rgba(0,194,224,0.4)]"
          >
            Client Portal Login
          </Link>
        </div>
      </header>

      {/* Main Container */}
      <main className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col gap-12">
        
        {/* Hero Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto mt-4">
          <span className="px-4 py-1.5 bg-[#00C2E0]/15 text-[#00C2E0] border border-[#00C2E0]/40 rounded-full font-mono text-xs uppercase tracking-widest font-bold">
            Zero-Friction Camera Intelligence Overlay
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-white font-['Montserrat',sans-serif] leading-tight">
            Stop Paying For False Alarms. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00C2E0] via-[#A7E8F3] to-[#00C2E0]">
              Turn Passive Cameras Into Active Guards.
            </span>
          </h1>
          <p className="text-slate-200 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Your existing cameras show you how you got robbed yesterday. Axiom Node plugs into your router in 10 minutes, ignores the wind and stray dogs, and texts your phone the second a human threat enters your lot.
          </p>
        </div>

        {/* Video Player Card (With Realistic Security Thumbnail Overlay & Lightbox Trigger) */}
        <div 
          onClick={() => setIsVideoModalOpen(true)}
          className="relative aspect-video max-w-4xl mx-auto w-full bg-[#0A1328] border-2 border-[#00C2E0]/60 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,194,224,0.3)] group cursor-pointer"
        >
          {/* High-Tech Tactical Surveillance Camera Graphic / Poster */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B36] via-[#081226] to-[#050B1A] flex flex-col justify-between p-4 md:p-8">
            
            {/* Camera Overlay Top Bar */}
            <div className="flex items-center justify-between font-mono text-[11px] md:text-xs text-slate-300 z-10">
              <div className="flex items-center gap-2 bg-[#070D1D]/80 px-3 py-1.5 rounded-lg border border-[#162B4D]">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="text-red-400 font-bold uppercase tracking-wider">REC 🔴 LIVE DEMO</span>
              </div>
              <div className="hidden sm:block text-[#00C2E0] bg-[#070D1D]/80 px-3 py-1.5 rounded-lg border border-[#162B4D]">
                CAM_01 • NORTH PERIMETER FENCE
              </div>
            </div>

            {/* AI Bounding Box & Target Graphic */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-40 group-hover:opacity-70 transition duration-300">
              <div className="w-64 h-64 border-2 border-dashed border-[#00C2E0] rounded-2xl relative flex items-center justify-center">
                <div className="absolute top-2 left-2 text-[10px] font-mono text-[#00C2E0] bg-[#070D1D] px-1.5 py-0.5 rounded">
                  HUMAN THREAT CONFIRMED (98.4%)
                </div>
                <div className="w-4 h-4 border-t-2 border-l-2 border-[#00C2E0] absolute -top-1 -left-1" />
                <div className="w-4 h-4 border-t-2 border-r-2 border-[#00C2E0] absolute -top-1 -right-1" />
                <div className="w-4 h-4 border-b-2 border-l-2 border-[#00C2E0] absolute -bottom-1 -left-1" />
                <div className="w-4 h-4 border-b-2 border-r-2 border-[#00C2E0] absolute -bottom-1 -right-1" />
              </div>
            </div>

            {/* Center Play Button Overlay */}
            <div className="z-10 flex flex-col items-center justify-center gap-3 my-auto">
              <div className="h-20 w-20 rounded-full bg-[#00C2E0] text-[#070D1D] flex items-center justify-center font-bold text-3xl shadow-[0_0_40px_rgba(0,194,224,0.9)] group-hover:scale-110 transition-transform duration-300">
                ▶
              </div>
              <span className="text-white font-['Montserrat',sans-serif] font-bold text-sm md:text-base tracking-wide bg-[#070D1D]/90 px-4 py-1.5 rounded-full border border-[#00C2E0]/50 shadow-lg">
                Click to Watch 45-Second Demo Video
              </span>
            </div>

            {/* Camera Overlay Bottom Bar */}
            <div className="flex items-center justify-between font-mono text-[10px] md:text-xs text-slate-400 z-10">
              <span>CORESIGHT AI ENGINE v1.2</span>
              <span className="text-[#A7E8F3]">VERIFIED EDGE DISPATCH</span>
            </div>

          </div>
        </div>

        {/* Direct Contact Banner */}
        <div className="p-6 md:p-8 bg-gradient-to-r from-[#0A1328] via-[#122347] to-[#0A1328] border border-[#00C2E0]/50 rounded-3xl text-center space-y-4 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#00C2E0]/10 rounded-full blur-3xl pointer-events-none" />
          <h3 className="text-2xl font-bold font-['Montserrat',sans-serif] text-white">
            Evaluate Axiom Vision on Your Lot
          </h3>
          <p className="text-slate-200 text-sm max-w-lg mx-auto">
            Contact us directly to request your pre-configured 14-day trial unit.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm font-mono pt-2">
            <a 
              href="tel:2132489788" 
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#00C2E0] text-[#070D1D] font-extrabold hover:bg-[#A7E8F3] transition flex items-center justify-center gap-2 shadow-lg"
            >
              📞 Call Direct: (213) 248-9788
            </a>
            <a 
              href="mailto:navid@axiomvision.io" 
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0A1328] border border-[#00C2E0]/60 text-white font-bold hover:border-[#00C2E0] transition flex items-center justify-center gap-2"
            >
              ✉️ Email: navid@axiomvision.io
            </a>
          </div>
        </div>

        {/* CAPACITY & HARDWARE CALCULATOR */}
        <section className="p-6 md:p-10 bg-[#091222] border-2 border-[#162B4D] rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] space-y-8 relative overflow-hidden">
          
          {/* Header */}
          <div className="text-center space-y-2 border-b border-[#162B4D] pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#00C2E0]/10 text-[#00C2E0] border border-[#00C2E0]/30 rounded-full text-xs font-mono font-semibold uppercase tracking-wider mb-1">
              <span>⚡</span> Interactive Capacity Planner
            </div>
            <h2 className="text-2xl md:text-4xl font-extrabold font-['Montserrat',sans-serif] text-white tracking-tight">
              14-Day "Blindspot" Pilot & Hardware Configurator
            </h2>
            <p className="text-slate-300 text-sm md:text-base max-w-2xl mx-auto">
              Select your lot's primary camera count. Free 14-day AI evaluation pilots cover up to <strong className="text-white underline decoration-[#00C2E0]">8 high-priority blindspot feeds</strong> on 1 Standard Node.
            </p>
          </div>

          {/* Quick Select Preset Buttons (Ending at 30 Cams) */}
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <span className="text-xs font-mono text-slate-400 uppercase mr-2 w-full text-center sm:w-auto">
              Quick Presets:
            </span>
            {[4, 8, 12, 16, 24, 30].map((count) => (
              <button
                key={count}
                onClick={() => setOrderCameraCount(count)}
                className={`px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all duration-200 border ${
                  orderCameraCount === count
                    ? "bg-[#00C2E0] text-[#070D1D] border-[#00C2E0] shadow-[0_0_15px_rgba(0,194,224,0.4)] scale-105"
                    : "bg-[#0E1A33] text-slate-200 border-[#1B325C] hover:border-[#00C2E0]/60 hover:text-white"
                }`}
              >
                {count} Cams {count === 8 ? "⭐ (Max Free Trial)" : ""}
              </button>
            ))}
          </div>

          {/* 3-Column Calculator & Hardware Spec Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
            
            {/* Column 1: Controls & Slider */}
            <div className="lg:col-span-5 bg-[#0D1830] p-6 rounded-2xl border border-[#1B325C] flex flex-col justify-between space-y-6">
              
              <div className="space-y-4">
                <div className="flex justify-between items-baseline border-b border-[#1B325C] pb-3">
                  <label className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                    Active Lot Feeds:
                  </label>
                  <span className="text-3xl font-extrabold font-mono text-[#00C2E0] drop-shadow-[0_0_10px_rgba(0,194,224,0.3)]">
                    {orderCameraCount} <span className="text-sm font-normal text-slate-300">Cameras</span>
                  </span>
                </div>

                {/* Range Slider */}
                <div className="space-y-2 pt-2">
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={orderCameraCount}
                    onChange={(e) => setOrderCameraCount(parseInt(e.target.value))}
                    className="w-full accent-[#00C2E0] bg-[#162B4D] h-3 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-mono text-slate-400">
                    <span>1 Feed</span>
                    <span className="text-[#00C2E0] font-bold">8 (14-Day Free Cap)</span>
                    <span>30 Feeds</span>
                  </div>
                </div>

                {/* Positive Eligibility / Setup Banner (Light Blue / Cyan) */}
                {isPilotEligible ? (
                  <div className="p-4 bg-[#00C2E0]/15 border border-[#00C2E0]/40 rounded-xl text-xs font-mono text-[#A7E8F3] leading-relaxed">
                    ⚡ <strong>100% Free Software Trial Eligible:</strong> Evaluating <strong>{orderCameraCount} camera feeds</strong>. Fits completely inside your 14-day $0.00 software trial (+${currentTier.price} fully-refundable node deposit).
                  </div>
                ) : (
                  <div className="p-4 bg-[#00C2E0]/15 border border-[#00C2E0]/40 rounded-xl text-xs font-mono text-[#A7E8F3] leading-relaxed">
                    ✨ <strong>Expanded Commercial Setup:</strong> Evaluating <strong>{orderCameraCount} camera feeds</strong>. Larger lot deployments utilize the <strong>{currentTier.name}</strong> for specialized neural acceleration.
                  </div>
                )}
              </div>

              {/* Spec Line Items */}
              <div className="space-y-2.5 text-xs font-mono text-slate-300 pt-4 border-t border-[#1B325C]">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Site Gateway Base:</span>
                  <span className="text-white font-bold">$99 / mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Camera Feed Licenses:</span>
                  <span className="text-white font-bold">{orderCameraCount} × $35 / mo</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">AI Vision Audits:</span>
                  <span className="text-[#00C2E0] font-bold">1,000 / camera / mo</span>
                </div>
              </div>

            </div>

            {/* Column 2: Visual Hardware Model Showcase */}
            <div className="lg:col-span-4 bg-[#0D1830] p-6 rounded-2xl border border-[#1B325C] flex flex-col items-center justify-between text-center relative overflow-hidden group">
              <div className="w-full flex items-center justify-between text-[11px] font-mono text-slate-400 mb-2">
                <span className="text-[#00C2E0] font-bold uppercase tracking-wider">
                  Hardware Model
                </span>
                <span className="px-2 py-0.5 bg-[#162B4D] text-white rounded font-mono">
                  {currentTier.maxFeeds}
                </span>
              </div>

              {/* Seamless Display Container */}
              <div className="my-auto py-4 w-full flex flex-col items-center justify-center">
                {!imgError[currentTier.id] ? (
                  <div className="w-full flex items-center justify-center min-h-[190px]">
                    <img
                      src={currentTier.img}
                      alt={currentTier.name}
                      onError={() => handleImageError(currentTier.id)}
                      className="max-h-48 w-auto object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)] transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-44 w-full bg-[#070D1D] rounded-xl border border-[#1B325C] flex flex-col items-center justify-center p-4 space-y-2">
                    <div className="text-4xl">🖥️</div>
                    <span className="text-xs font-mono font-bold text-white">
                      {currentTier.name}
                    </span>
                    <span className="text-[10px] font-mono text-slate-400">
                      {currentTier.formFactor}
                    </span>
                  </div>
                )}

                <div className="mt-4 space-y-1">
                  <p className="text-base font-bold font-['Montserrat',sans-serif] text-white">
                    {currentTier.name}
                  </p>
                  <p className="text-xs font-mono text-[#00C2E0]">
                    {currentTier.chip}
                  </p>
                  <p className="text-[11px] font-mono text-slate-400">
                    Dimensions: {currentTier.dimensions}
                  </p>
                </div>
              </div>

              {/* Illustration Disclaimer */}
              <p className="text-[10px] font-mono text-slate-400 italic pt-2 border-t border-[#1B325C]/60 w-full">
                * Note: Hardware renders shown above for size & scale comparison.
              </p>
            </div>

            {/* Column 3: Rate Output & Call to Action */}
            <div className="lg:col-span-3 bg-gradient-to-b from-[#122347] to-[#0D1830] p-6 rounded-2xl border-2 border-[#00C2E0]/60 flex flex-col justify-between space-y-6 shadow-xl">
              
              <div className="space-y-3">
                <span className="text-[11px] font-mono font-extrabold uppercase tracking-widest text-[#00C2E0] block">
                  {isPilotEligible ? "Evaluation Investment Rate:" : "Standard Commercial Rate:"}
                </span>

                {isPilotEligible ? (
                  <div className="space-y-1">
                    <div className="text-4xl md:text-5xl font-extrabold font-['Montserrat',sans-serif] text-white">
                      $0.00
                    </div>
                    <p className="text-xs font-mono text-[#A7E8F3] font-semibold">
                      For 14 days up to 8 cameras
                    </p>
                    <p className="text-[11px] font-mono text-slate-300 pt-0.5">
                      + ${currentTier.price} refundable node deposit
                    </p>
                    <div className="inline-block mt-2 px-2.5 py-1 bg-[#00C2E0]/20 text-[#A7E8F3] border border-[#00C2E0]/50 rounded text-[11px] font-mono font-bold">
                      ✓ 100% Free Software Trial
                    </div>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <div className="text-3xl md:text-4xl font-extrabold font-['Montserrat',sans-serif] text-[#00C2E0]">
                      ${monthlyTotal}
                      <span className="text-xs font-normal text-slate-300"> / month</span>
                    </div>
                    <p className="text-[11px] font-mono text-[#A7E8F3] pt-1">
                      + ${currentTier.price} refundable node deposit
                    </p>
                  </div>
                )}
              </div>

              {/* Cost Line Item Breakdown */}
              <div className="space-y-2 text-xs font-mono text-slate-300 border-t border-slate-700/60 pt-4">
                <div className="flex justify-between">
                  <span className="text-slate-400">Refundable Deposit:</span>
                  <span className="text-white font-bold">${currentTier.price}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Post-Trial Sub:</span>
                  <span className="text-[#00C2E0] font-bold">${monthlyTotal} / mo</span>
                </div>
              </div>

              {/* Direct Action Request */}
              <div className="p-3.5 bg-[#070D1D] border border-[#1B325C] rounded-xl text-center space-y-2">
                <p className="text-xs font-mono text-white font-bold">
                  Request Pre-Configured Node:
                </p>
                <div className="text-[11px] font-mono text-[#A7E8F3] space-y-1">
                  <div>📞 <a href="tel:2132489788" className="underline hover:text-white">(213) 248-9788</a></div>
                  <div>✉️ <a href="mailto:navid@axiomvision.io" className="underline hover:text-white">navid@axiomvision.io</a></div>
                </div>
              </div>

            </div>

          </div>

          {/* Refundable Deposit & Evaluation Pitch Guarantee Box */}
          <div className="p-5 bg-[#0D1830] border border-[#00C2E0]/40 rounded-2xl text-xs font-mono text-slate-200 leading-relaxed space-y-2">
            <p className="text-[#00C2E0] font-bold text-sm">
              🛡️ How the 14-Day Free Trial & Hardware Deposit Works:
            </p>
            <p>
              The <strong>14-day AI software evaluation is 100% free</strong>. We collect a standard hardware deposit (<strong className="text-white">${currentTier.price}</strong> for {currentTier.name}) to cover the physical edge node device sent to your site. 
            </p>
            <p className="text-[#A7E8F3]">
              • If you convert to an annual subscription, <strong>100% of your deposit is credited directly toward your first year's contract</strong>.<br />
              • If you choose to return the hardware at the end of the 14 days, <strong>your deposit is 100% refunded</strong>.
            </p>
          </div>

        </section>

      </main>

      {/* POP-OUT VIDEO LIGHTBOX MODAL (Optimized for Mobile & Desktop) */}
      {isVideoModalOpen && (
        <div 
          onClick={() => setIsVideoModalOpen(false)}
          className="fixed inset-0 z-[9999] bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl bg-[#0A1328] border-2 border-[#00C2E0] rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,194,224,0.4)] flex flex-col max-h-[92vh]"
          >
            {/* Modal Header */}
            <div className="p-4 sm:px-6 bg-[#101F3C] border-b border-[#00C2E0]/40 flex items-center justify-between">
              <span className="font-bold text-white text-sm md:text-base font-['Montserrat',sans-serif]">
                Axiom Vision Overview Demo
              </span>
              <button
                onClick={() => setIsVideoModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-[#070D1D] hover:bg-red-950 text-white font-mono text-xs border border-slate-700 transition"
              >
                ✕ Close
              </button>
            </div>

            {/* Pure Uncropped Video Container */}
            <div className="bg-black w-full flex-1 flex flex-col items-center justify-center min-h-[300px] overflow-hidden relative">
              <iframe
                src={vslDriveUrl}
                className="w-full aspect-video border-0 max-h-[70vh]"
                allow="autoplay; fullscreen"
                allowFullScreen
                title="Axiom Vision Overview Demo"
              />

              {/* Direct Mobile Stream Link Fallback for Mobile Browsers */}
              <div className="p-3 bg-[#070D1D] w-full border-t border-[#1B325C] flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-slate-300">
                <span>📱 Having trouble playing inside your mobile browser?</span>
                <a
                  href={vslDirectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 bg-[#00C2E0] text-[#070D1D] font-extrabold rounded-lg hover:bg-[#A7E8F3] transition flex items-center gap-1 shadow-md"
                >
                  ▶ Open Video Directly ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compliance Footer */}
      <footer className="border-t border-[#162544] bg-[#0A1328] px-6 py-8 text-center text-xs font-mono text-slate-400 mt-12 space-y-3">
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-semibold">
          <Link href="/terms" className="hover:text-[#00C2E0] transition underline decoration-[#00C2E0]">
            Terms of Use
          </Link>
          <span>•</span>
          <Link href="/privacy" className="hover:text-[#00C2E0] transition underline decoration-[#00C2E0]">
            Privacy Policy
          </Link>
          <span>•</span>
          <a href="mailto:navid@axiomvision.io" className="hover:text-[#00C2E0] transition">
            navid@axiomvision.io
          </a>
          <span>•</span>
          <a href="tel:2132489788" className="hover:text-[#00C2E0] transition">
            (213) 248-9788
          </a>
        </div>
        <p className="text-[11px] text-slate-400 max-w-2xl mx-auto leading-relaxed">
          📱 <strong>A2P 10DLC Telecommunications Disclosure:</strong> By enrolling in threat notifications, users consent to receive automated emergency SMS alert pings from Axiom Vision LLC. Message and data rates may apply. Message frequency varies based on threat triggers. Reply STOP to opt-out.
        </p>
        <p className="text-[11px] text-slate-400 pt-1">
          © 2026 Axiom Vision LLC. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
