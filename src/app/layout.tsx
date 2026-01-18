import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider, { HeroUI } from "./providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://tokobuku.vercel.app"),
  icons: {
    // icon: "DATA.favicon"
  },
  title: {
    default: "Tokobuku",
    template: `%s | "Tokobuku"`,
  },
  openGraph: {
    title: "Tokobuku",
    url: "https://tokobuku.vercel.app",
    siteName: `Tokobuku`,
    locale: "in_IND",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "",
    yandex: "",
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ReactQueryProvider>
          <HeroUI>
            {children}
          </HeroUI>
        </ReactQueryProvider>
      </body>
    </html>
  );
}