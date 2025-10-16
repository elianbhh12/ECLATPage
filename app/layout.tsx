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
  title: "Éclat Fashion Illustration",
  description: "Ilustraciones de moda: servicios, portafolio y contacto. Transformamos ideas en arte visual.",
  icons: {
    icon: '/img/logo.png',
    shortcut: '/img/logo.png',
  },
  openGraph: {
    title: 'Éclat Fashion Illustration',
    description: 'Ilustraciones de moda: servicios, portafolio y contacto. Transformamos ideas en arte visual.',
    images: '/img/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/img/logo.png" />
        <link rel="apple-touch-icon" href="/img/logo.png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
