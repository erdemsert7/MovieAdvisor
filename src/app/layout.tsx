import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "Movie Advisor",
  description: "Your personal movie recommendation app",
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
