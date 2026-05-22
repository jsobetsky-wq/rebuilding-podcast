"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function LoginFormInner() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      window.location.href = redirect;
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg bg-[var(--color-bg-card)] border border-[var(--color-border)] text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-accent)] transition-colors"
          autoFocus
        />
      </div>
      {error && (
        <p className="text-sm text-red-500">Wrong password. Try again.</p>
      )}
      <button
        type="submit"
        disabled={loading || !password}
        className="w-full px-4 py-3 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-white font-medium transition-colors disabled:opacity-50"
      >
        {loading ? "..." : "Enter"}
      </button>
    </form>
  );
}

export function LoginForm() {
  return (
    <Suspense
      fallback={
        <div className="text-center text-[var(--color-text-muted)]">
          Loading...
        </div>
      }
    >
      <LoginFormInner />
    </Suspense>
  );
}
