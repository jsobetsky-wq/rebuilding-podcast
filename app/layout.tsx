import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "./components/Nav";
import { Footer } from "./components/Footer";

export const metadata: Metadata = {
  title: "Rebuilding a Broken Man",
  description:
    "A podcast about personal growth, rebuilding, and lessons learned. Hosted by John Sobetsky.",
  openGraph: {
    title: "Rebuilding a Broken Man",
    description:
      "Raw, honest conversations about what it takes to rebuild your life. Hosted by John Sobetsky.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Nav />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
