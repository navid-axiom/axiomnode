"use client";

import Link from "next/link";
import { Shield, Bell, User } from "lucide-react";

export function DashboardHeader() {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-800 bg-[#05070a]/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-cyan-400/30 bg-cyan-400/10">
            <Shield className="h-4 w-4 text-cyan-400" />
          </div>
          <span className="text-sm font-semibold tracking-tight text-white sm:text-base">
            Axiom Vision
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-400/40 hover:text-cyan-400"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_1px_rgba(34,211,238,0.8)]" />
          </button>
          <button className="flex items-center gap-2 rounded-lg border border-slate-800 bg-slate-900/60 px-2 py-1.5 text-sm text-slate-200 hover:border-cyan-400/40">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-800">
              <User className="h-3.5 w-3.5 text-slate-300" />
            </div>
            <span className="hidden sm:inline">Riverbend Ops</span>
          </button>
        </div>
      </div>
    </header>
  );
}
