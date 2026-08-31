import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Kanjo Elkamira Ndi | Software Engineer & Fullstack Developer",
  description:
    "Portfolio of Kanjo Elkamira Ndi — Software Engineer, Full-Stack Developer, and aspiring DevSecOps Engineer building scalable systems and intelligent applications.",
  authors: [{ name: "Kanjo Elkamira Ndi" }],
  openGraph: {
    title: "Kanjo Elkamira Ndi | Software Engineer",
    description:
      "Building scalable systems and intelligent applications. Full-Stack Developer, QA Practitioner, aspiring DevSecOps Engineer.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} dark`}>
      <body className="antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
