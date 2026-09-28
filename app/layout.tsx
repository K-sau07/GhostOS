import type { Metadata } from "next";
import { Archivo, Instrument_Serif, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});
const serif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["italic", "normal"],
});
const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const DESCRIPTION =
  "Ghost OS. Backend engineer in Boston building Java and Spring Boot services, " +
  "Kafka pipelines, and AWS infrastructure as code.";

export const metadata: Metadata = {
  // metadataBase resolves the relative og:image to an absolute URL, which every
  // link unfurler requires — LinkedIn, Slack, WhatsApp and iMessage all refuse a
  // relative path and fall back to a bare grey card.
  metadataBase: new URL("https://ghost-os-pied.vercel.app"),
  title: "Saurabh Kashyap — Backend Software Engineer",
  description: DESCRIPTION,
  openGraph: {
    title: "Saurabh Kashyap — Backend Software Engineer",
    description: DESCRIPTION,
    url: "https://ghost-os-pied.vercel.app",
    siteName: "Ghost OS",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Ghost OS desktop" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saurabh Kashyap — Backend Software Engineer",
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${serif.variable} ${mono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
