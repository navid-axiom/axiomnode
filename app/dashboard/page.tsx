"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ttannkgwihjjutfkasxu.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

function AxiomLogo({ className = "h-8" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Concept B Logo Mark: Outer 'A' Apex with Electric Cyan Centered Pinpoint */}
      <svg viewBox="0 0 100 100" className="h-full w-auto aspect-square overflow-visible drop-shadow-[0_0_8px_rgba(0,194,224,0.4)]">
        {/* 'A' Geometric Frame */}
        <polygon 
          points="50,10 12,90 32,90 50,48 68,90 88,90" 
          fill="#F0F4F9" 
        />
        {/* Horizontal Crossbar split */}
        <polygon 
          points="32,70 68,70 65,78 35,78" 
          fill="#0B172E" 
        />
        {/* The Precision Pinpoint (CoreSight AI Threat Focus) */}
        <circle 
          cx="50" 
          cy="42" 
          r="7.5" 
          fill="#00C2E0" 
          className="animate-pulse"
        />
      </svg>
      {/* Wordmark: Montserrat Bold AXIOM + Wide-Tracked VISION */}
      <div className="flex flex-col leading-none">
        <span className="font-['Montserrat',sans-serif] font-extrabold tracking-[0.12em] text-white text-xl">
          AXIOM
        </span>
        <span className="font-['Poppins',sans-serif] font-light tracking-[0.35em] text-[#00C2E0] text-[10px] uppercase mt-0.5">
          VISION
        </span>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"dashboard" | "pilot" | "security">("dashboard");
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [orderCameraCount, setOrderCameraCount] = useState<number>(4);

  // Custom Media Links
  const [vslDriveUrl] = useState<string>("https://drive.google.com/file/d/1-_Q8TElPQ9mPWcGmNUei8fq4S0MtNGfC/preview");
  const [architectureImgUrl] = useState<string>("/0-trust-architecture.png");

  const fetchAlerts = async () => {
    try {
      const { data } = await supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);
        
      if (data) {
        setAlerts(data);
      }
    } catch (err) {
      console.warn("Database sync notice:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 4000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = (alertId: string) => {
    const directUrl = `${window.location.origin}/dashboard#alert-${alertId}`;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(directUrl);
    } else {
      document.execCommand('copy');
    }
    setCopiedId(alertId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getNodeTier = (cams: number) => {
    if (cams <= 8) return { name: "Axiom Node Standard", price: 500, chip: "Intel N100 Edge Unit", pilotEligible: true };
    if (cams <= 16) return { name: "Axiom Node Pro", price: 1000, chip: "Core i5 + Edge GPU", pilotEligible: false };
    return { name: "Axiom Node Enterprise", price: 1500, chip: "Cluster Acceleration Node", pilotEligible: false };
  };

  const currentTier = getNodeTier(orderCameraCount);
  const monthlyTotal = 99 + (orderCameraCount * 35);
  const isPilotEligible = orderCameraCount <= 8;

  return (
    <div className="min-h-screen bg-[#0B172E] text-[#F0F4F9] flex flex-col font-['Inter',sans-serif] selection:bg-[#00C2E0] selection:text-[#0B172E]">
      
      {/* Header */}
      <header className="border-b border-[#162036] bg-[#0F1420]/90 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <AxiomLogo />

        {/* View Switcher Tabs */}
        <div className="hidden sm:flex items-center p-1 bg-[#0B172E] border border-[#162036] rounded-xl text-xs font-medium">
          <button
            onClick={() => setActiveTab("dashboard")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "dashboard"
                ? "bg-[#00C2E0] text-[#0B172E] font-bold shadow-[0_0_12px_rgba(0,194,224,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Live AI Console
          </button>
          <button
            onClick={() => setActiveTab("pilot")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "pilot"
                ? "bg-[#00C2E0] text-[#0B172E] font-bold shadow-[0_0_12px_rgba(0,194,224,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Pilot Info
          </button>
          <button
            onClick={() => setActiveTab("security")}
            className={`px-4 py-2 rounded-lg transition-all duration-200 ${
              activeTab === "security"
                ? "bg-[#00C2E0] text-[#0B172E] font-bold shadow-[0_0_12px_rgba(0,194,224,0.4)]"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Trust Architecture
          </button>
        </div>

        {/* System Status & Auth */}
        <div className="flex items-center gap-3">
          <span className="hidden md:inline-flex items-center gap-2 text-[11px] px-3 py-1.5 bg-[#00C2E0]/10 text-[#00C2E0] border border-[#00C2E0]/30 rounded-full font-['JetBrains_Mono',monospace] tracking-wider uppercase">
            <span className="h-2 w-2 rounded-full bg-[#00C2E0] animate-ping" />
            Node Online
          </span>
          <UserButton />
        </div>
      </header>

      {/* Mobile Tab Switcher */}
      <div className="sm:hidden flex border-b border-[#162036] bg-[#0F1420] p-1.5 text-xs font-medium justify-around">
        <button
          onClick={() => setActiveTab("dashboard")}
          className={`px-3 py-1.5 rounded-lg ${activeTab === "dashboard" ? "bg-[#00C2E0] text-[#0B172E] font-bold" : "text-slate-400"}`}
        >
          Console
        </button>
        <button
          onClick={() => setActiveTab("pilot")}
          className={`px-3 py-1.5 rounded-lg ${activeTab === "pilot" ? "bg-[#00C2E0] text-[#0B172E] font-bold" : "text-slate-400"}`}
        >
          Pilot Info
        </button>
        <button
          onClick={() => setActiveTab("security")}
          className={`px-3 py-1.5 rounded-lg ${activeTab === "security" ? "bg-[#00C2E0] text-[#0B172E] font-bold" : "text-slate-400"}`}
        >
          Trust Arch
        </button>
      </div>

      {/* TAB 1: Live AI Console */}
      {activeTab === "dashboard" && (
        <main className="p-4 md:p-8 max-w-7xl mx-auto w-full flex-1 flex flex-col gap-6 animate-fadeIn">
          
          {/* Executive Metric Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 border border-[#162036] bg-[#0F1420] rounded-2xl shadow-lg relative overflow-hidden group hover:border-[#00C2E0]/40 transition">
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#00C2E0]/5 rounded-full blur-2xl group-hover:bg-[#00C2E0]/10 transition" />
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Total Threats Intercepted</p>
              <p className="text-3xl font-extrabold text-white mt-2 font-['Montserrat',sans-serif]">
                {alerts.length}
              </p>
              <span className="text-[10px] text-[#A7E8F3] mt-1 block font-mono">100% Verified by Gemini 3.5</span>
            </div>

            <div className="p-5 border border-[#162036] bg-[#0F1420] rounded-2xl shadow-lg relative overflow-hidden">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Active Edge Engine</p>
              <p className="text-lg font-bold text-[#00C2E0] mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00C2E0] animate-pulse"></span> CoreSight AI (v1.2)
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">Local YOLOv8 Filter Active ($0.00)</span>
            </div>

            <div className="p-5 border border-[#162036] bg-[#0F1420] rounded-2xl shadow-lg">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Dispatch Gateway</p>
              <p className="text-lg font-bold text-emerald-400 mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400"></span> Telegram Bot Active
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">Instant Emergency Pushes</span>
            </div>

            <div className="p-5 border border-[#162036] bg-[#0F1420] rounded-2xl shadow-lg">
              <p className="text-xs text-slate-400 font-mono uppercase tracking-wider">Encrypted Remote Tunnel</p>
              <p className="text-lg font-bold text-[#A7E8F3] mt-2 flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#A7E8F3]"></span> WireGuard / Tailscale
              </p>
              <span className="text-[10px] text-slate-400 mt-1 block font-mono">Zero Inbound Open Ports</span>
            </div>
          </div>

          {/* Activity Log Feed */}
          <div className="border border-[#162036] bg-[#0F1420] rounded-2xl shadow-2xl flex flex-col flex-1 overflow-hidden">
            <div className="p-5 border-b border-[#162036] bg-[#162036]/50 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-[#00C2E0] animate-ping" />
                <h2 className="font-semibold text-white text-lg tracking-wide">Live Threat Stream & Incident Clips</h2>
              </div>
              {loading && <span className="text-xs text-[#00C2E0] animate-pulse font-mono">Syncing database...</span>}
            </div>

            <div className="p-3 flex-1 overflow-y-auto max-h-[700px] bg-[#0B172E]/60 space-y-4">
              {alerts.length === 0 && !loading ? (
                <div className="h-64 flex flex-col items-center justify-center text-slate-500 py-20 font-mono text-sm">
                  <AxiomLogo className="h-10 opacity-30 mb-3" />
                  <p>System armed. Monitoring local camera RTSP feeds...</p>
                </div>
              ) : (
                alerts.map((alert) => {
                  const date = new Date(alert.created_at);
                  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const dateString = date.toLocaleDateString();
                  const alertAnchorId = `alert-${alert.id}`;

                  return (
                    <div 
                      key={alert.id} 
                      id={alertAnchorId} 
                      className="p-6 bg-[#0F1420] border border-[#162036] hover:border-[#00C2E0]/50 rounded-xl transition-all duration-200 shadow-md"
                    >
                      {/* Header Badge & Metadata */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[11px] uppercase px-3 py-1 rounded-md font-bold tracking-wider ${
                            alert.status === 'Critical' 
                              ? 'bg-red-950/80 text-red-400 border border-red-800/80 shadow-[0_0_10px_rgba(239,68,68,0.3)]' 
                              : 'bg-[#00C2E0]/20 text-[#00C2E0] border border-[#00C2E0]/40'
                          }`}>
                            {alert.status || 'VERIFIED THREAT'}
                          </span>
                          <span className="text-slate-300 font-mono text-xs bg-[#162036] px-3 py-1 rounded-md border border-slate-700/50">
                            CAM ID: {alert.node_name || 'cam-01'}
                          </span>
                        </div>
                        <span className="text-slate-400 font-mono text-xs">
                          {dateString} <span className="text-[#00C2E0] ml-1">{timeString}</span>
                        </span>
                      </div>

                      {/* Gemini Core Analysis Text */}
                      <p className="text-slate-100 font-medium text-base my-2 leading-relaxed">
                        {alert.message}
                      </p>

                      {/* Telegram Notification Dispatch Preview */}
                      <div className="mt-3 p-3 bg-[#0B172E] border border-[#162036] rounded-xl flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-mono tracking-wider text-[#00C2E0] flex items-center gap-1.5">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#00C2E0]"></span>
                            Telegram Emergency Payload Delivered
                          </span>

                          <button
                            onClick={() => handleCopyLink(alert.id)}
                            className="text-xs px-2.5 py-1 rounded bg-[#162036] hover:bg-[#00C2E0] hover:text-[#0B172E] text-slate-300 transition font-mono"
                          >
                            {copiedId === alert.id ? "✓ Link Copied" : "🔗 Copy Incident Link"}
                          </button>
                        </div>
                      </div>

                      {/* Incident Media Grid: Video Player + Law Enforcement Card */}
                      {(alert.video_url || alert.screenshot || alert.suspect_description) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-[#0B172E] rounded-xl border border-[#162036]">
                          
                          {/* HD Video Player */}
                          {alert.video_url ? (
                            <div className="flex flex-col gap-2">
                              <p className="text-xs uppercase font-mono tracking-wider text-[#00C2E0] flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-[#00C2E0] animate-ping" />
                                10-Second HD Transcoded Clip
                              </p>
                              <video 
                                src={alert.video_url} 
                                poster={alert.screenshot ? `data:image/jpeg;base64,${alert.screenshot}` : undefined}
                                controls 
                                preload="metadata"
                                className="rounded-lg border border-[#162036] max-h-60 w-full bg-black shadow-lg object-contain"
                              />
                            </div>
                          ) : alert.screenshot ? (
                            <div className="flex flex-col gap-2">
                              <p className="text-xs uppercase font-mono tracking-wider text-slate-400">
                                Keyframe Crop Target
                              </p>
                              <img 
                                src={`data:image/jpeg;base64,${alert.screenshot}`} 
                                alt="Security incident keyframe" 
                                className="rounded-lg border border-[#162036] max-h-60 object-cover w-full shadow-lg"
                              />
                            </div>
                          ) : null}

                          {/* Law Enforcement Log Details */}
                          {alert.suspect_description && (
                            <div className="flex flex-col gap-2 text-xs font-mono">
                              <p className="text-xs uppercase font-mono tracking-wider text-[#A7E8F3] mb-1">
                                Law Enforcement Suspect Profile
                              </p>
                              
                              <div className="bg-[#0F1420] p-3 rounded-lg border border-[#162036] flex justify-between">
                                <span className="text-slate-400">THREAT ITEM:</span>
                                <span className="font-bold text-red-400">{alert.suspect_description.held_objects_detail || 'Observed in hand'}</span>
                              </div>

                              <div className="bg-[#0F1420] p-3 rounded-lg border border-[#162036] flex justify-between">
                                <span className="text-slate-400">EST. HEIGHT / BUILD:</span>
                                <span className="text-white">{alert.suspect_description.estimated_height || 'Standard adult'}</span>
                              </div>

                              <div className="bg-[#0F1420] p-3 rounded-lg border border-[#162036] flex flex-col gap-1">
                                <span className="text-slate-400">CLOTHING:</span>
                                <span className="text-slate-200">{alert.suspect_description.clothing_details || 'Recorded on keyframe'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </main>
      )}

      {/* TAB 2: Pilot Information */}
      {activeTab === "pilot" && (
        <main className="p-4 md:p-8 max-w-6xl mx-auto w-full flex-1 flex flex-col gap-10 animate-fadeIn">
          
          {/* Pilot Hero Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto mt-4">
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

                {/* Read-Only Information Banner (No Order Button) */}
                <div className="p-3 bg-[#0B172E] border border-[#162036] rounded-xl text-center">
                  <p className="text-xs font-mono text-slate-400">
                    ℹ️ <strong className="text-white">Pilot Program Information Sheet:</strong> To request a 30-day pilot node for your lot, contact Axiom Vision directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* TAB 3: Trust Cybersecurity & Network Isolation */}
      {activeTab === "security" && (
        <main className="p-4 md:p-8 max-w-5xl mx-auto w-full flex-1 flex flex-col gap-8 animate-fadeIn">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold font-['Montserrat',sans-serif] text-white">
              Trust Cybersecurity & Network Isolation
            </h1>
            <p className="text-slate-400 text-sm max-w-2xl mx-auto">
              Axiom Vision is engineered to eliminate local router risk. Hand or email this technical specification sheet to your IT or network administrator.
            </p>
          </div>

          {/* Trust Architecture Image Diagram Container with Clickable & Downloadable Controls */}
          <div className="p-6 bg-[#0F1420] border border-[#162036] rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4">
            <div className="w-full flex items-center justify-between text-xs font-mono text-slate-400 px-2">
              <span className="flex items-center gap-1.5 text-[#00C2E0]">
                <span className="h-2 w-2 rounded-full bg-[#00C2E0]" />
                Official Network Architecture Diagram
              </span>
              <a 
                href={architectureImgUrl} 
                download="Axiom-Trust-Architecture.png"
                className="px-3 py-1.5 rounded-lg bg-[#162036] hover:bg-[#00C2E0] hover:text-[#0B172E] text-slate-200 font-bold transition flex items-center gap-2"
              >
                📥 Download Diagram for IT Technician
              </a>
            </div>

            <a 
              href={architectureImgUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full max-w-3xl block group relative rounded-xl overflow-hidden border border-[#162036] hover:border-[#00C2E0]/50 transition shadow-lg"
              title="Click to view full-resolution image"
            >
              <img 
                src={architectureImgUrl} 
                alt="Axiom Trust Network Architecture Diagram" 
                className="w-full h-auto object-contain transition duration-200 group-hover:opacity-90"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                  const parent = (e.target as HTMLElement).parentElement;
                  if (parent && !parent.querySelector('.img-fallback')) {
                    const fallbackDiv = document.createElement('div');
                    fallbackDiv.className = 'img-fallback p-8 text-center text-slate-400 font-mono text-xs space-y-2';
                    fallbackDiv.innerHTML = `
                      <p className="text-[#00C2E0] font-bold">🖼️ Trust Architecture Image Slot</p>
                      <p>Place your NotebookLM diagram image inside <code>public/0-trust-architecture.png</code></p>
                    `;
                    parent.appendChild(fallbackDiv);
                  }
                }}
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center text-xs font-mono text-white gap-2 backdrop-blur-[2px]">
                🔍 Click to Open High-Resolution Spec Diagram
              </div>
            </a>
          </div>

          {/* Security Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0F1420] border border-[#162036] rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#00C2E0]/10 border border-[#00C2E0]/30 text-[#00C2E0] flex items-center justify-center font-bold">
                01
              </div>
              <h3 className="font-bold text-white text-base font-['Montserrat',sans-serif]">Zero Open Inbound Ports</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Never opens firewall ports. Uses outbound-only, AES-256 encrypted WireGuard tunnels so your local router stays 100% locked down.
              </p>
            </div>

            <div className="p-6 bg-[#0F1420] border border-[#162036] rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#00C2E0]/10 border border-[#00C2E0]/30 text-[#00C2E0] flex items-center justify-center font-bold">
                02
              </div>
              <h3 className="font-bold text-white text-base font-['Montserrat',sans-serif]">Read-Only RTSP Stream</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                Operates as a passive viewer over standard RTSP. Cannot rewrite NVR hard drives, change camera settings, or interfere with 24/7 recording.
              </p>
            </div>

            <div className="p-6 bg-[#0F1420] border border-[#162036] rounded-2xl space-y-3">
              <div className="h-10 w-10 rounded-xl bg-[#00C2E0]/10 border border-[#00C2E0]/30 text-[#00C2E0] flex items-center justify-center font-bold">
                03
              </div>
              <h3 className="font-bold text-white text-base font-['Montserrat',sans-serif]">RAM-Only Video Buffering</h3>
              <p className="text-slate-400 text-xs leading-relaxed">
                99.9% of video stays local inside the node's physical memory and overwrites every 10 seconds. Only confirmed human threat keyframes ping the cloud.
              </p>
            </div>
          </div>
        </main>
      )}

      {/* Footer */}
      <footer className="border-t border-[#162036] bg-[#0F1420] px-8 py-6 text-center text-xs font-mono text-slate-500">
        <p>© 2026 Axiom Vision LLC. All rights reserved. CoreSight AI & Axiom Node are registered technologies.</p>
      </footer>
    </div>
  );
}
