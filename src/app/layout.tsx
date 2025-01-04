import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/**
 * Default metadata configuration for the application
 * Following Next.js 14 metadata API best practices
 */

export const metadata: Metadata = {
  metadataBase: new URL('https://apex.roan.dev'),
  title: {
    default: "Apex Rotation",
    template: "%s | Apex Rotation"
  },
  description: "Real-time Apex Legends Map Rotation Timer. Track current and upcoming maps for Battle Royale, Ranked, and LTM modes.",
  keywords: ["Apex Legends", "map rotation", "timer", "battle royale", "ranked", "gaming"],
  authors: [{ name: "IIRoan" }],
  creator: "IIRoan",
  publisher: "IIRoan",
  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
  manifest: "/site.webmanifest",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico" }
    ],
    apple: [
      { url: "/apple-touch-icon.png" }
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/apex.svg",
        color: "#ffffff"
      }
    ]
  },
  openGraph: {
    type: "website",
    siteName: "Apex Rotation",
    title: "Apex Rotation",
    description: "Real-time Apex Legends Map Rotation Timer. Track current and upcoming maps for Battle Royale, Ranked, and LTM modes.",
    images: [
      {
        url: "https://apex.roan.dev/screenshot.png",
        width: 1200,
        height: 630,
        alt: "Apex Rotation Preview",
        type: "image/png",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Rotation",
    description: "Real-time Apex Legends Map Rotation Timer. Track current and upcoming maps for Battle Royale, Ranked, and LTM modes.",
    images: ["https://apex.roan.dev/screenshot.png"],
  },
  alternates: {
    canonical: "https://apex.roan.dev",
  },
  verification: {
    google: "your-google-site-verification",
    yandex: "your-yandex-verification",
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

interface RootLayoutProps {
  children: React.ReactNode;
}


export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en" dir="ltr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}