import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FaqConcierge from "@/components/ui/FaqConcierge";
import { CAFE_CONFIG } from "@/data/cafe-config";

export const viewport: Viewport = {
  themeColor: "#17120F",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://emberandoak.com"),
  title: `${CAFE_CONFIG.brand.name} — ${CAFE_CONFIG.brand.tagline}`,
  description: `${CAFE_CONFIG.brand.concept} Independent specialty coffee roastery in the Old Foundry Quarter. 12kg micro-batches aged 72 hours in charred French Oak casks.`,
  keywords: [
    "Specialty Coffee",
    "Micro-roastery",
    "Oak Aged Coffee",
    "London Coffee",
    "Single Origin Espresso",
    "Coffee Cupping",
    "Analog Vinyl Cafe",
  ],
  authors: [{ name: "Ember & Oak Roasters" }],
  openGraph: {
    title: `${CAFE_CONFIG.brand.name} — ${CAFE_CONFIG.brand.tagline}`,
    description: `${CAFE_CONFIG.brand.concept}`,
    url: "https://emberandoak.com",
    siteName: CAFE_CONFIG.brand.name,
    images: [
      {
        url: "/images/hero-poster.webp",
        width: 1200,
        height: 630,
        alt: "Ember and Oak Roasting Tray with Glowing Coffee Beans",
      },
    ],
    locale: "en_GB",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full bg-[#17120F] text-[#F3EBDD]">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-full flex flex-col font-sans bg-[#17120F] text-[#F3EBDD] selection:bg-[#B97845] selection:text-[#17120F]">
        <Navbar />
        <main className="flex-1 w-full">{children}</main>
        <Footer />
        <FaqConcierge />
      </body>
    </html>
  );
}
