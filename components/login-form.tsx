"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Shield, Loader2, AlertCircle } from "lucide-react";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setError(null);

      if (!email || !password) {
        setError("Enter your email and password to continue.");
        return;
      }

      setLoading(true);
      // Mocked auth for V1 — will be wired to Supabase/Firebase in Phase 2.
      await new Promise((resolve) => setTimeout(resolve, 700));
      setLoading(false);
      router.push("/dashboard");
    },
    [email, password, router]
  );

  return (
    <div className="w-full max-w-sm">
      <div className="mb-8 flex flex-col items-center text-center">
        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/30 bg-cyan-400/10 shadow-[0_0_30px_-6px_rgba(34,211,238,0.6)]">
          <Shield className="h-7 w-7 text-cyan-400" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight text-white">
          Axiom Vision
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Edge AI security. Sign in to your dashboard.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/50 p-6 shadow-2xl backdrop-blur"
      >
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-400">
            <AlertCircle className="h-4 w-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="email" className="text-slate-300">
            Email
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border-slate-700 bg-slate-950/60 text-white placeholder:text-slate-600 focus-visible:ring-cyan-400"
            autoComplete="email"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-slate-300">
            Password
          </Label>
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border-slate-700 bg-slate-950/60 text-white placeholder:text-slate-600 focus-visible:ring-cyan-400"
            autoComplete="current-password"
          />
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400 shadow-[0_0_20px_-4px_rgba(34,211,238,0.8)]"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign in"
          )}
        </Button>

        <p className="text-center text-xs text-slate-500">
          Protected by enterprise-grade encryption. V1 preview build.
        </p>
      </form>
    </div>
  );
}
