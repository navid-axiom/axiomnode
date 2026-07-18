"use client";

import { useEffect, useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export default function DashboardPage() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Function to pull the latest logs
  const fetchAlerts = async () => {
    const { data, error } = await supabase
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);
      
    if (data) {
      setAlerts(data);
    }
    setLoading(false);
  };

  // Run immediately, then poll every 5 seconds
  useEffect(() => {
    fetchAlerts();
    const interval = setInterval(fetchAlerts, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white flex flex-col">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800 bg-[#0d1527] px-6 py-4 flex items-center justify-between shadow-md">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.7)]" />
          <span className="text-xl font-bold tracking-wider text-white">AXIOM SYSTEM</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs px-2 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded font-mono">
            SECURE LINK ACTIVE
          </span>
          <UserButton />
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="p-6 max-w-5xl mx-auto w-full flex-1 flex flex-col gap-6">
        
        {/* System Health Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 border border-slate-800 bg-[#0d1527] rounded-xl shadow-lg">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Total Alerts Logged</p>
            <p className="text-3xl font-bold text-white mt-2">{alerts.length}</p>
          </div>
          <div className="p-5 border border-slate-800 bg-[#0d1527] rounded-xl shadow-lg">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">SMS Routing</p>
            <p className="text-lg font-semibold text-cyan-400 mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-cyan-400"></span> Twilio Connected
            </p>
          </div>
          <div className="p-5 border border-slate-800 bg-[#0d1527] rounded-xl shadow-lg">
            <p className="text-xs text-slate-400 font-medium uppercase tracking-wider">Database Status</p>
            <p className="text-lg font-semibold text-emerald-400 mt-2 flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span> Supabase Synced
            </p>
          </div>
        </div>

        {/* Real-time Alerts Feed */}
        <div className="border border-slate-800 bg-[#0d1527] rounded-xl shadow-2xl flex flex-col flex-1 overflow-hidden">
          <div className="p-5 border-b border-slate-800 bg-[#0f192e] flex justify-between items-center">
            <h2 className="font-semibold text-slate-200 text-lg">Live Activity Log</h2>
            {loading && <span className="text-xs text-slate-500 animate-pulse">Syncing...</span>}
          </div>
          
          <div className="p-2 flex-1 overflow-y-auto bg-[#0a0f1c]">
            {alerts.length === 0 && !loading ? (
              <div className="h-full flex flex-col items-center justify-center text-slate-500 py-20">
                <p>System armed. Waiting for incoming events...</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/50">
                {alerts.map((alert) => {
                  const date = new Date(alert.created_at);
                  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
                  const dateString = date.toLocaleDateString();
                  
                  return (
                    <div key={alert.id} className="p-4 hover:bg-[#0f192e] transition-colors duration-150">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-[10px] uppercase px-2 py-1 rounded font-bold ${
                            alert.status === 'Critical' ? 'bg-red-950/50 text-red-400 border border-red-900' :
                            'bg-cyan-950/50 text-cyan-400 border border-cyan-900'
                          }`}>
                            {alert.status}
                          </span>
                          <span className="text-slate-300 font-mono text-sm bg-slate-800/50 px-2 py-0.5 rounded border border-slate-700/50">
                            {alert.node_name}
                          </span>
                        </div>
                        <span className="text-slate-500 font-mono text-xs">
                          {dateString} <span className="text-slate-400 ml-1">{timeString}</span>
                        </span>
                      </div>
                      <p className="text-slate-200 font-medium mt-1">{alert.message}</p>
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
