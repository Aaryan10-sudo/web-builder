import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "../globals.css";
import Navbar from "@/components/Navbar/NavbeforeSignIn";
import Footer from "@/components/Footer/FooterWithoutSignUp";

// Fonts
const satoshi = localFont({
  src: [
    {
      path: "../../../public/fonts/Satoshi-Light.woff2",
      weight: "300",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-LightItalic.woff2",
      weight: "300",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Satoshi-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-Italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Satoshi-Medium.woff2",
      weight: "500",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-MediumItalic.woff2",
      weight: "500",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Satoshi-Bold.woff2",
      weight: "700",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-BoldItalic.woff2",
      weight: "700",
      style: "italic",
    },
    {
      path: "../../../public/fonts/Satoshi-Black.woff2",
      weight: "900",
      style: "normal",
    },
    {
      path: "../../../public/fonts/Satoshi-BlackItalic.woff2",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Stuzip",
  description: "The Netflix for Books",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${satoshi.variable} `}>
      <body className="antialiased bg-[#141414]  ">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
