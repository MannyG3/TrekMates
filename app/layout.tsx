import type { Metadata } from "next";
import {
  Cormorant_Garamond,
  Inter,
  JetBrains_Mono,
} from "next/font/google";
import { SessionProvider } from "@/components/providers/SessionProvider";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TrailMates — India's Trekking Community",
  description:
    "Connect with fellow trekkers, discover trails across India, find hiking buddies, and share your mountain adventures.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} ${jetbrains.variable}`}
    >
      <body className="font-sans">
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
