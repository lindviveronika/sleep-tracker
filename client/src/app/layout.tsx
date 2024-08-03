import type { Metadata } from "next";
import { Shantell_Sans } from "next/font/google";
import "./globals.css";

const font = Shantell_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sleepy",
  description: "Daily sleep tracker web app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={font.className}>{children}</body>
    </html>
  );
}
