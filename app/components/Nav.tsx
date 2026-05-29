"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Dashboard" },
    { href: "/episodes", label: "Episodes" },
    { href: "/clips", label: "Clips" },
    { href: "/linkedin", label: "LinkedIn" },
    { href: "/calendar", label: "Calendar" },
    { href: "/about", label: "Resources" },
  ];

  return (
    <nav className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight hover:text-[var(--color-accent-light)] transition-colors"
        >
          RABM
          <span className="text-xs font-normal text-[var(--color-text-muted)] ml-2 hidden sm:inline">
            Production
          </span>
        </Link>
        <div className="flex gap-4 md:gap-6 overflow-x-auto">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide transition-colors whitespace-nowrap ${
                pathname === link.href ||
                (link.href !== "/" && pathname?.startsWith(link.href))
                  ? "text-[var(--color-accent-light)]"
                  : "text-[var(--color-text-muted)] hover:text-[var(--color-text)]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
