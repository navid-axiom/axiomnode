import { UserButton } from "@clerk/nextjs";

export default function DashboardPage() {
  // Mock data for the alerts feed - we will wire this to your database/Twilio later
  const mockAlerts = [
    { id: 1, time: "11:24 AM", status: "Critical", message: "Motion detected on Camera Node 01" },
    { id: 2, time: "10:15 AM", status: "Info", message: "Camera Node 01 successfully connected to edge" },
    { id: 3, time: "09:00 AM", status: "System", message: "Axiom Monitoring Service initialized" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0f1c] text-white">
      {/* Top Navigation Bar */}
      <nav className="border-b border-slate-800 bg-[#0d1527] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="h-3 w-3 rounded-full bg-cyan-500 animate-pulse" />
          <span className="text-xl font-bold tracking-wider text-white">AXIOM NODE</span>
        </div>
        <div className="flex items-center space-x-4">
          <span className="text-xs px-2 py-1 bg-cyan-950 text-cyan-400 border border-cyan-800 rounded font-mono">
            V1 LIVE
          </span>
          <UserButton />
        </div>
      </nav>

      {/* Main Content Dashboard */}
      <main className="p-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Camera & Controls */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Camera Feed Container */}
          <div className="border border-slate-800 bg-[#0d1527] rounded-xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-[#0f192e]">
              <h2 className="font-semibold text-slate-200">Live Camera Stream</h2>
              <span className="text-xs bg-red-950 text-red-400 border border-red-800 px-2 py-0.5 rounded flex items-center gap-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-ping" />
                LIVE NODE_01
              </span>
            </div>
            
            {/* Camera Video Placeholder */}
            <div className="aspect-video bg-slate-950 flex flex-col items-center justify-center relative group p-4 text-center">
              <div className="p-4 rounded-full bg-slate-900 border border-slate-800 mb-3 text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.774 48.774 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
                </svg>
              </div>
              <p className="text-slate-400 font-medium">Camera Feed Connection Pending</p>
              <p className="text-xs text-slate-500 max-w-sm mt-1">Ready to link edge camera stream via secure API pipeline.</p>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 border border-slate-800 bg-[#0d1527] rounded-xl">
              <p className="text-xs text-slate-400 font-medium">SMS Alert Routing</p>
              <p className="text-lg font-semibold text-cyan-400 mt-1">Twilio Sandbox Active</p>
            </div>
            <div className="p-4 border border-slate-800 bg-[#0d1527] rounded-xl">
              <p className="text-xs text-slate-400 font-medium">Node Security Status</p>
              <p className="text-lg font-semibold text-emerald-400 mt-1">Monitoring Armed</p>
            </div>
          </div>
        </div>

        {/* Right 1 Column: Real-time Alerts Feed */}
        <div className="border border-slate-800 bg-[#0d1527] rounded-xl overflow-hidden shadow-2xl flex flex-col h-full">
          <div className="p-4 border-b border-slate-800 bg-[#0f192e]">
            <h2 className="font-semibold text-slate-200">Activity Log</h2>
          </div>
          
          <div className="p-4 divide-y divide-slate-800 flex-1 overflow-y-auto space-y-4">
            {mockAlerts.map((alert) => (
              <div key={alert.id} className="pt-3 first:pt-0 flex flex-col space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className={`font-mono px-1.5 py-0.5 rounded font-bold ${
                    alert.status === 'Critical' ? 'bg-red-950 text-red-400 border border-red-900' :
                    alert.status === 'System' ? 'bg-cyan-950 text-cyan-400 border border-cyan-900' :
                    'bg-slate-800 text-slate-400'
                  }`}>
                    {alert.status}
                  </span>
                  <span className="text-slate-500 font-mono">{alert.time}</span>
                </div>
                <p className="text-sm text-slate-300 font-medium">{alert.message}</p>
              </div>
            ))}
          </div>
        </div>

      </main>
    </div>
  );
}
