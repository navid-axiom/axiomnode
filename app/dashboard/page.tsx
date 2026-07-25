"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://ttannkgwihjjutfkasxu.supabase.co';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchAlerts = async () => {
    const { data } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (data) {
      setAlerts(data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyLink = (alertId: string) => {
    const directUrl = `${window.location.origin}/dashboard#alert-${alertId}`;
    navigator.clipboard.writeText(directUrl);
    setCopiedId(alertId);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col font-sans">
      {/* Top Navbar */}
      <nav className="border-b border-slate-800 bg-[#0d1527] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
          <span className="text-xl font-bold tracking-wider text-white">AXIOM SYSTEM</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs px-2.5 py-1 bg-cyan-950/80 text-cyan-400 border border-cyan-800 rounded font-mono uppercase tracking-wide">
            SECURE LINK ACTIVE
          </span>
          <UserButton />
        </div>
      </nav>

      {/* Main Container */}
      <main className="p-6 max-w-5xl mx-auto w-full flex-1 flex flex-col gap-6">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-slate-800 bg-[#0d1527] rounded-xl shadow-lg">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Alerts Logged</p>
            <p className="text-3xl font-bold text-white mt-2">{alerts.length}</p>
          </div>
          <div className="p-5 border border-slate-800 bg-[#0d1527] rounded-xl shadow-lg">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Instant Dispatch Router</p>
            <p className="text-lg font-semibold text-cyan-400 mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping"></span> Telegram Bot Active
            </p>
          </div>
          <div className="p-5 border border-slate-800 bg-[#0d1527] rounded-xl shadow-lg">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Database Sync</p>
            <p className="text-lg font-semibold text-emerald-400 mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Supabase Active
            </p>
          </div>
        </div>

        {/* Real-time Activity Feed */}
        <div className="border border-slate-800 bg-[#0d1527] rounded-xl shadow-2xl flex flex-col flex-1 overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-[#0f192e] flex justify-between items-center">
            <h2 className="font-semibold text-slate-200 text-lg">Live Activity Log & Incident Media</h2>
            {loading && <span className="text-xs text-slate-400 animate-pulse font-mono">Syncing database...</span>}
          </div>
          
          <div className="p-2 flex-1 overflow-y-auto bg-[#0a0f1c]">
            {alerts.length === 0 && !loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20">
                <p>System armed. Waiting for incoming detection events...</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/50">
                {alerts.map((alert) => {
                  const date = new Date(alert.created_at);
                  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const dateString = date.toLocaleDateString();
                  const alertAnchorId = `alert-${alert.id}`;
                  const incidentUrl = typeof window !== 'undefined' ? `${window.location.origin}/dashboard#${alertAnchorId}` : '#';
                  
                  const telegramPayloadText = `🚨 [AXIOM THREAT] ${alert.status === 'Critical' ? 'THREAT DETECTED' : 'WARNING'}: ${alert.message} | Camera: ${alert.node_name}. View Video & Details: ${incidentUrl}`;

                  return (
                    <div 
                      key={alert.id} 
                      id={alertAnchorId} 
                      className="p-6 hover:bg-[#0f192e]/60 transition-colors duration-150 scroll-mt-6"
                    >
                      {/* Event Header */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[11px] uppercase px-2.5 py-1 rounded font-bold tracking-wider ${
                            alert.status === 'Critical' ? 'bg-red-950/80 text-red-400 border border-red-900/80 shadow-[0_0_8px_rgba(239,68,68,0.2)]' :
                            'bg-cyan-950/80 text-cyan-400 border border-cyan-900/80'
                          }`}>
                            {alert.status || 'Alert'}
                          </span>
                          <span className="text-slate-300 font-mono text-sm bg-slate-800/60 px-2.5 py-0.5 rounded border border-slate-700/60">
                            {alert.node_name || 'cam-01'}
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono text-xs">
                          {dateString} <span className="text-slate-400 ml-1">{timeString}</span>
                        </span>
                      </div>
                      
                      {/* Main Message */}
                      <p className="text-slate-100 font-medium text-lg my-2">{alert.message}</p>

                      {/* Telegram Notification Payload Card */}
                      <div className="mt-4 p-3.5 bg-[#070c18] border border-cyan-950 rounded-lg flex flex-col gap-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] uppercase font-mono tracking-wider text-cyan-400 flex items-center gap-1.5">
                            Dispatched Telegram Alert Payload
                          </span>

                          <button
                            onClick={() => handleCopyLink(alert.id)}
                            className="text-xs px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition flex items-center gap-1.5 font-mono"
                          >
                            {copiedId === alert.id ? (
                              <span className="text-emerald-400 flex items-center gap-1">
                                ✓ Link Copied
                              </span>
                            ) : (
                              <span className="flex items-center gap-1">
                                🔗 Copy Incident Link
                              </span>
                            )}
                          </button>
                        </div>

                        <div className="bg-[#050812] p-2.5 rounded border border-slate-850 font-mono text-xs text-slate-300 select-all leading-relaxed break-all">
                          {telegramPayloadText}
                        </div>
                      </div>

                      {/* Incident Media Container: Video Player & Snapshot Keyframe */}
                      {(alert.video_url || alert.screenshot) && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 p-4 bg-[#0d1527] rounded-xl border border-slate-800/80">
                          
                          {alert.video_url ? (
                            <div>
                              <p className="text-xs uppercase font-mono tracking-wider text-cyan-400 mb-2 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-ping"></span>
                                10-Second HD Threat Video Clip
                              </p>
                              <video 
                                src={alert.video_url} 
                                poster={alert.screenshot ? `data:image/jpeg;base64,${alert.screenshot}` : undefined}
                                controls 
                                preload="metadata"
                                className="rounded-lg border border-slate-800 max-h-64 w-full bg-black shadow-md object-contain"
                              />
                            </div>
                          ) : alert.screenshot ? (
                            <div>
                              <p className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-red-500"></span>
                                Threat Keyframe Snapshot
                              </p>
                              <img 
                                src={`data:image/jpeg;base64,${alert.screenshot}`} 
                                alt="Security incident keyframe" 
                                className="rounded-lg border border-slate-800 max-h-64 object-cover w-full shadow-md"
                              />
                            </div>
                          ) : null}

                          {/* Law Enforcement Structured Details */}
                          {alert.suspect_description && (
                            <div className="flex flex-col gap-2.5">
                              <p className="text-xs uppercase font-mono tracking-wider text-slate-400 mb-0.5">Law Enforcement Log Details</p>
                              
                              <div className="grid grid-cols-2 gap-2 text-sm bg-[#080d1a] p-2.5 rounded-lg border border-slate-900">
                                <div>
                                  <span className="block text-[10px] text-slate-400 font-mono uppercase">Est. Height / Build</span>
                                  <span className="font-semibold text-white">{alert.suspect_description.estimated_height || 'Unknown'}</span>
                                </div>
                                <div>
                                  <span className="block text-[10px] text-slate-400 font-mono uppercase">Threat Items Held</span>
                                  <span className="font-semibold text-red-400">{alert.suspect_description.held_objects_detail || 'None'}</span>
                                </div>
                              </div>

                              <div className="text-sm bg-[#080d1a] p-2.5 rounded-lg border border-slate-900">
                                <span className="block text-[10px] text-slate-400 font-mono uppercase">Clothing Details</span>
                                <span className="text-slate-200">{alert.suspect_description.clothing_details || 'No specific details recorded'}</span>
                              </div>

                              <div className="text-sm bg-[#080d1a] p-2.5 rounded-lg border border-slate-900">
                                <span className="block text-[10px] text-slate-400 font-mono uppercase">Distinguishing Features</span>
                                <span className="text-slate-200">{alert.suspect_description.physical_distinguishing_features || 'None observed'}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

      </main>
    </div>
  );
}
