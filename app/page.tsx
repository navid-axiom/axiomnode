import { SignIn } from "@clerk/nextjs";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-[#0a0f1c] p-24">
      <div className="flex flex-col items-center space-y-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">Axiom Vision</h1>
          <p className="text-slate-400">Edge AI security. Sign in to your dashboard.</p>
        </div>
        
        <SignIn 
          fallbackRedirectUrl="/dashboard"
          appearance={{
            elements: {
              formButtonPrimary: 
                "bg-cyan-500 hover:bg-cyan-400 text-black font-bold",
              card: "bg-slate-900 border border-slate-800 shadow-2xl",
              headerTitle: "text-white",
              headerSubtitle: "text-slate-400",
              socialButtonsBlockButton: "text-white border-slate-700 hover:bg-slate-800",
              socialButtonsBlockButtonText: "text-white font-semibold",
              dividerLine: "bg-slate-700",
              dividerText: "text-slate-400",
              formFieldLabel: "text-slate-300",
              formFieldInput: "bg-slate-800 border-slate-700 text-white",
              footerActionText: "text-slate-400",
              footerActionLink: "text-cyan-500 hover:text-cyan-400"
            }
          }}
        />
      </div>
    </main>
  );
}
