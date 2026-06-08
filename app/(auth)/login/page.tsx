"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { demoLogin } from "@/lib/demo-auth";
import { Button } from "@/components/ui/Button";
import { MountainSilhouette } from "@/components/ui/MountainSilhouette";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = demoLogin(email, password);

    setLoading(false);

    if (authError) {
      setError(authError);
      return;
    }

    router.push("/feed");
    router.refresh();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-night-950 px-4">
      <MountainSilhouette className="absolute bottom-0 left-0 right-0 w-full opacity-30" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-serif text-2xl text-stone-100">
            Trail<span className="text-sage-500">Mates</span>
          </Link>
          <p className="mt-2 text-stone-400">Welcome back, trekker</p>
        </div>

        <div className="card-surface p-8">
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="label-caps mb-1 block text-stone-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
                className="input-field"
              />
            </div>

            <div>
              <label className="label-caps mb-1 block text-stone-400">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="input-field"
              />
            </div>

            {error && (
              <p className="text-sm text-altitude-hard">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-400">
            New to TrailMates?{" "}
            <Link
              href="/signup"
              className="font-medium text-sage-500 hover:text-sage-400"
            >
              Create an account
            </Link>
          </p>

          <div className="mt-6 border-t border-stone-700 pt-4">
            <p className="mb-2 text-center text-xs text-stone-500">
              Demo credentials:
            </p>
            <p className="text-center text-xs text-stone-600">
              Email: <span className="font-mono text-stone-500">demo@trekmates.com</span>
            </p>
            <p className="text-center text-xs text-stone-600">
              Password: <span className="font-mono text-stone-500">demo123</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
