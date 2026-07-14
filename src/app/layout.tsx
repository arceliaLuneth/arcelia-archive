import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Arcelia Archive",
  description: "Collection of works, experiments, and ideas.",
  verification: {
    google: "kpZGBjQaNerFzLK0e2c50l8MQSWua3QOubl-417q6s4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}