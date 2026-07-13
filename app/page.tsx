import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(34,211,238,0.15), transparent 40%), radial-gradient(circle at 80% 80%, rgba(59,130,246,0.15), transparent 40%)",
        }}
      />
      <LoginForm />
    </main>
  );
}
