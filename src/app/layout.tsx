import type { Metadata } from "next";
import { Inter, Playfair_Display, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-serif",
});

const mono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "In My Solitude | A Digital Library of Awakening Knowledge",
    template: "%s | In My Solitude"
  },
  description: "A sanctuary for forbidden history, suppressed consciousness, and the esoteric arts. Curated for the seeker of truth in an age of noise.",
  keywords: ["liberty", "awakening", "esoteric", "curated", "digital library", "suppressed knowledge", "manuscripts", "solitude", "truth seeker"],
  authors: [{ name: "The Curator" }],
  creator: "In My Solitude",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://inmysolitude.library",
    siteName: "In My Solitude",
    title: "In My Solitude | Archive of Restricted Knowledge",
    description: "Enter the stacks of the digital underground. For those who seek the light through forbidden ink.",
    images: [{
       url: "/og-image.jpg",
       width: 1200,
       height: 630,
       alt: "In My Solitude Archive"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "In My Solitude | Archive of Forbidden History",
    description: "A digital archive dedicated to the preservation of rare knowledge and suppressed manuscripts.",
    images: ["/og-image.jpg"]
  },
  robots: {
    index: true,
    follow: true,
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={cn(
        inter.variable,
        playfair.variable,
        mono.variable,
        "antialiased selection:bg-solitude-gold/30 selection:text-solitude-gold min-h-screen flex flex-col bg-solitude-bg text-solitude-text"
      )}>
        {children}
      </body>
    </html>
  );
}
