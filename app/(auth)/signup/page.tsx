"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/Button";
import { MountainSilhouette } from "@/components/ui/MountainSilhouette";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username: username.toLowerCase().replace(/\s+/g, "_"),
          full_name: fullName,
        },
      },
    });

    setLoading(false);

    if (authError) {
      setError("Something went sideways — try again.");
      return;
    }

    router.push("/feed");
    router.refresh();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center bg-night-950 px-4 py-12">
      <MountainSilhouette className="absolute bottom-0 left-0 right-0 w-full opacity-30" />

      <div className="relative z-10 w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="font-serif text-2xl text-stone-100">
            Trail<span className="text-sage-500">Mates</span>
          </Link>
          <p className="mt-2 text-stone-400">
            Join India&apos;s trekking community
          </p>
        </div>

        <div className="card-surface p-8">
          <form onSubmit={handleSignup} className="space-y-4">
            <div>
              <label className="label-caps mb-1 block text-stone-400">
                Full name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
                placeholder="Arjun Sharma"
                className="input-field"
              />
            </div>

            <div>
              <label className="label-caps mb-1 block text-stone-400">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="arjun_treks"
                pattern="[a-zA-Z0-9_]+"
                className="input-field"
              />
            </div>

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
                minLength={6}
                placeholder="Min. 6 characters"
                className="input-field"
              />
            </div>

            {error && (
              <p className="text-sm text-altitude-hard">{error}</p>
            )}

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-stone-400">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-sage-500 hover:text-sage-400"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
