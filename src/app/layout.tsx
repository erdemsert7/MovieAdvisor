"use client";

import { Inter } from "next/font/google";

import "../styles/globals.css";
import { ThemeProvider } from "@/components/themeProvider";
import { LanguageProvider } from "@/context/languageContext";

const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Movie Advisor",
//   description: "Your personal movie recommendation app",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <LanguageProvider>
            <main className="min-h-screen">{children}</main>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
