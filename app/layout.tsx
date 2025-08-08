import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Keiner Alvarado Quintero - Full Stack Developer Portfolio",
    template: "%s | Keiner Alvarado Quintero",
  },
  description:
    "Portfolio of Keiner Alvarado Quintero - Experienced Full Stack Developer specializing in modern web technologies. Check out my projects and skills.",
  keywords: [
    "Keiner Alvarado",
    "Software Developer",
    "Full Stack Developer",
    "Web Developer",
    "Portfolio",
    "React Developer",
    "Next.js Developer",
    "JavaScript Expert",
  ],
  authors: [{ name: "Keiner Alvarado Quintero" }],
  creator: "Keiner Alvarado Quintero",
  publisher: "Keiner Alvarado Quintero",
  metadataBase: new URL("https://keiner-alvarado-quintero.top"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Keiner Alvarado Quintero - Full Stack Developer",
    description:
      "Professional portfolio showcasing my projects and skills as a Full Stack Developer",
    url: "https://keiner-alvarado-quintero.top",
    siteName: "Keiner Alvarado Portfolio",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Keiner Alvarado Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Keiner Alvarado Quintero - Full Stack Developer",
    description:
      "Professional portfolio showcasing my projects and skills as a Full Stack Developer",
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
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          rel="icon"
          href="/icon?<generated>"
          type="image/png"
          sizes="32x32"
        />
        <link
          rel="apple-touch-icon"
          href="/apple-icon?<generated>"
          type="image/png"
          sizes="180x180"
        />
      </head>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
