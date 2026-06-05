import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Player",
  description:
    "Apple Music–style player with micro-interactions, icon transitions and a context menu.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
