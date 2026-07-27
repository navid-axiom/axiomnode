"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { UserButton, useUser } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase Client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ttannkgwihjjutfkasxu.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

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

export default function DashboardPage() {
  const { user, isLoaded: userLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<"dashboard" | "security">("dashboard");
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Pop-out Video Lightbox Modal State
  const [selectedVideoModal, setSelectedVideoModal] = useState<{
    url: string;
    nodeName?: string;
    timestamp?: string;
    message?: string;
  } | null>(null);

  // Custom Media Links
  const [architectureImgUrl] = useState<string>("/0-trust-architecture.png");

  const fetchAlerts = async () => {
    try {
      // Build base query
      let query = supabase
        .from('alerts')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50);

      // Data Isolation Filter:
      const assignedNode = user?.publicMetadata?.nodeName as string;
      if (assignedNode) {
        query = query.eq('node_name', assignedNode);
      } else if (user?.emailAddresses?.[0]?.emailAddress !== 'navid@axiomvision.io') {
        query = query.neq('status', 'TEST_DATA');
      }

      const { data } = await query;
        
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
    if (userLoaded) {
      fetchAlerts();
      const interval = setInterval(fetchAlerts, 4000);
      return () => clearInterval(interval);
    }
  }, [userLoaded, user]);

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

  // Instant Full Screen Video Handler
  const handleVideoPlay = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const videoEl = e.currentTarget as any;
    if (videoEl) {
      if (videoEl.requestFullscreen) {
        videoEl.requestFullscreen().catch(() => {});
      } else if (videoEl.webkitEnterFullscreen) {
        // iOS Safari Fullscreen method
        videoEl.webkitEnterFullscreen();
      } else if (videoEl.msRequestFullscreen) {
        videoEl.msRequestFullscreen();
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#0B172E] text-[#F0F4F9] flex flex-col font-['Inter',sans-serif] selection:bg-[#00C2E0] selection:text-[#0B172E]">
      
      {/* Header */}
      <header className="border-b border-[#162036] bg-[#0F1420]/90 backdrop-blur-md sticky top-0 z-50 px-4 md:px-8 py-3.5 flex items-center justify-between shadow-xl">
        <AxiomLogo />

        {/* View Switcher Tabs (2-Tab Dashboard) */}
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

                      {/* Incident Media Grid: Full-Screen Trigger Video Player + Law Enforcement Card */}
                      {(alert.video_url || alert.screenshot || alert.suspect_description) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-[#0B172E] rounded-xl border border-[#162036]">
                          
                          {/* HD Video Pop-Out Trigger Card */}
                          {alert.video_url ? (
                            <div className="flex flex-col gap-2">
                              <p className="text-xs uppercase font-mono tracking-wider text-[#00C2E0] flex items-center justify-between">
                                <span className="flex items-center gap-1.5">
                                  <span className="h-2 w-2 rounded-full bg-[#00C2E0] animate-ping" />
                                  10-Second HD Transcoded Clip
                                </span>
                                <span className="text-[10px] text-[#A7E8F3] font-bold font-mono">
                                  🔍 Click to Pop Out
                                </span>
                              </p>
                              <div
                                onClick={() =>
                                  setSelectedVideoModal({
                                    url: alert.video_url,
                                    nodeName: alert.node_name,
                                    timestamp: `${dateString} ${timeString}`,
                                    message: alert.message
                                  })
                                }
                                className="relative group cursor-pointer rounded-lg overflow-hidden border border-[#162036] hover:border-[#00C2E0] transition bg-black aspect-video flex items-center justify-center shadow-lg"
                              >
                                <video
                                  src={alert.video_url}
                                  poster={alert.screenshot ? `data:image/jpeg;base64,${alert.screenshot}` : undefined}
                                  preload="metadata"
                                  className="w-full h-full object-contain pointer-events-none opacity-80 group-hover:opacity-100 transition"
                                />
                                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex flex-col items-center justify-center gap-2">
                                  <div className="h-12 w-12 rounded-full bg-[#00C2E0] text-[#070D1D] flex items-center justify-center font-bold text-xl shadow-[0_0_20px_rgba(0,194,224,0.6)] group-hover:scale-110 transition">
                                    ▶
                                  </div>
                                  <span className="text-xs font-mono font-bold text-white bg-[#070D1D]/90 px-3 py-1 rounded-full border border-[#00C2E0]/40">
                                    ▶ Pop Out Video Player
                                  </span>
                                </div>
                              </div>
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

      {/* POP-OUT VIDEO LIGHTBOX MODAL */}
      {selectedVideoModal && (
        <div className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 md:p-8 animate-fadeIn">
          <div className="relative w-full max-w-4xl bg-[#0F1420] border-2 border-[#00C2E0]/60 rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,194,224,0.3)] flex flex-col">
            
            {/* Modal Header */}
            <div className="p-4 md:px-6 bg-[#162036] border-b border-[#00C2E0]/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full bg-[#00C2E0] animate-ping" />
                <div>
                  <h3 className="text-sm md:text-base font-bold text-white font-['Montserrat',sans-serif]">
                    Incident Video Pop-Out — {selectedVideoModal.nodeName || 'Camera Feed'}
                  </h3>
                  {selectedVideoModal.timestamp && (
                    <p className="text-[11px] font-mono text-slate-300">
                      Captured: {selectedVideoModal.timestamp}
                    </p>
                  )}
                </div>
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedVideoModal(null)}
                className="px-3 py-1.5 rounded-xl bg-[#0B172E] hover:bg-red-900/80 text-white font-mono text-xs border border-slate-700 transition"
              >
                ✕ Close (ESC)
              </button>
            </div>

            {/* Video Container - Preserves Uncropped HD Dimensions */}
            <div className="bg-black w-full flex items-center justify-center p-2 relative">
              <video
                src={selectedVideoModal.url}
                controls
                autoPlay
                playsInline
                className="w-full max-h-[70vh] object-contain rounded-lg"
              />
            </div>

            {/* Modal Footer Description */}
            {selectedVideoModal.message && (
              <div className="p-4 bg-[#0B172E] border-t border-[#162036] text-xs font-mono text-slate-200">
                <strong className="text-[#00C2E0]">AI Summary:</strong> {selectedVideoModal.message}
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Trust Cybersecurity & Network Isolation */}
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

          {/* Trust Architecture Image Diagram Container */}
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

      {/* Compliance Footer */}
      <footer className="border-t border-[#162036] bg-[#0F1420] px-6 py-8 text-center text-xs font-mono text-slate-400 mt-12 space-y-3">
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
        </div>
        <p className="text-[11px] text-slate-500">
          © 2026 Axiom Vision LLC. All rights reserved. CoreSight AI & Axiom Node are registered technologies.
        </p>
      </footer>
    </div>
  );
}
