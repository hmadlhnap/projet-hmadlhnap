import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

import Footer from "@/components/Layout/Footer";
import Header from "@/components/Layout/Header";

const SITE_URL = "https://marrakechpackage.com";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});



export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Marrakech Package | Private Morocco Tours & Desert Trips",
    template: "%s",
  },
  description:
    "Private Marrakech tours, Sahara desert trips, shared group tours, and tailor-made Morocco itineraries with trusted local experts. Plan your perfect trip today.",
  keywords: [
    "Marrakech tours",
    "Morocco desert trips",
    "Sahara tours",
    "private Morocco tours",
    "Marrakech day trips",
    "Morocco travel agency",
    "Merzouga desert tour",
  ],
  authors: [{ name: "Marrakech Package" }],
  creator: "Marrakech Package",
  publisher: "Marrakech Package",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: "Marrakech Package",
    title: "Marrakech Package | Private Morocco Tours & Desert Trips",
    description:
      "Private tours, Sahara desert trips, and tailor-made Morocco itineraries with trusted local experts.",
    locale: "en_US",
    images: [
      {
        url: "/images/hero.jpeg",
        width: 1200,
        height: 630,
        alt: "Marrakech skyline with the Koutoubia Mosque at sunset",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Marrakech Package | Private Morocco Tours & Desert Trips",
    description:
      "Private tours, Sahara desert trips, and tailor-made Morocco itineraries with trusted local experts.",
    images: ["/images/hero.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  category: "travel",
};




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="w-full flex-1 bg-background">{children}</main>
        <Footer />
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}
