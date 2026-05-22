import { LoginForm } from "./LoginForm";

export const metadata = {
  title: "Login — Rebuilding a Broken Man",
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-bg)] px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <div className="text-5xl font-bold text-[var(--color-accent)] mb-4">
            R
          </div>
          <h1 className="text-2xl font-bold mb-2">Rebuilding a Broken Man</h1>
          <p className="text-sm text-[var(--color-text-muted)]">
            This site is private. Enter the password to continue.
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
