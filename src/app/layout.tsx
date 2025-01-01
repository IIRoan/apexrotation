import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "Apex Rotation",
  description: "Apex Legends Map Rotation Timer",
  openGraph: {
    title: "Apex Rotation",
    description: "Apex Legends Map Rotation Timer",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/e7519009-5d19-4426-936b-e87539c42a72.png?token=aGuWr4_mlnjf8P667XyW1q4Y4v7fyI99fUxBYshfDDY&height=617&width=1200&expires=33271757661",
        width: 1200,
        height: 630,
        alt: "Apex Rotation Preview",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Apex Rotation",
    description: "Apex Legends Map Rotation Timer",
    images: ["https://opengraph.b-cdn.net/production/images/e7519009-5d19-4426-936b-e87539c42a72.png?token=aGuWr4_mlnjf8P667XyW1q4Y4v7fyI99fUxBYshfDDY&height=617&width=1200&expires=33271757661"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
