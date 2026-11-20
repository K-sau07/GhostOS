import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Analytics } from "@vercel/analytics/next";
import { profile } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "Saurabh Kashyap · Software Engineer";
const DESCRIPTION =
  "Software engineer in Boston. I build backends, and the tools that help people " +
  "understand them, like repo-sensei, a search engine for your whole codebase.";

export const metadata: Metadata = {
  // Unfurlers (LinkedIn, Slack, iMessage) need absolute image URLs.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: profile.name,
    type: "profile",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Saurabh Kashyap, software engineer in Boston" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: ["/og.png"],
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d1117" },
  ],
};

const person = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  url: SITE_URL,
  jobTitle: "Software Engineer",
  email: `mailto:${profile.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Boston", addressRegion: "MA", addressCountry: "US" },
  alumniOf: { "@type": "CollegeOrUniversity", name: "Northeastern University" },
  sameAs: [profile.linkedin, profile.github, "https://reposensei.com"],
};

/* Runs before first paint. `js` lets CSS hold animations until they're on
   screen; `data-booted` skips the boot screen after the first visit. */
const early =
  "document.documentElement.classList.add('js');" +
  "try{if(sessionStorage.getItem('booted'))document.documentElement.dataset.booted='1';" +
  "else sessionStorage.setItem('booted','1')}catch(e){}";

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: early }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(person) }}
        />
      </head>
      <body>
        <ThemeProvider attribute="data-theme" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
        {/* unique visitors, in the Vercel dashboard under Analytics; no cookies */}
        <Analytics />
      </body>
    </html>
  );
}
