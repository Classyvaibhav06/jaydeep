import type { Metadata } from "next";
import { Chakra_Petch, Silkscreen, Inter } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const chakraPetch = Chakra_Petch({
  variable: "--font-chakra",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const silkscreen = Silkscreen({
  variable: "--font-pixel",
  subsets: ["latin"],
  weight: ["400", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "JAYDEEP — Machine Learning & AI Systems Engineer",
  description: "Architecting high-throughput neural models, autonomous LLM pipelines, and low-latency inference systems.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${chakraPetch.variable} ${silkscreen.variable} ${inter.variable} h-full`}
    >
      <body className="min-h-full antialiased selection:bg-cyan-500 selection:text-black">
        <ThemeProvider>
          {children}
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
