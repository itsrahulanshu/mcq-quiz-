import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/context/TimerContext";
import Footer from "@/components/Footer";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#3b82f6",
};

export const metadata: Metadata = {
  title: "ChatGPTMCQ - AI-Powered Quiz Generator",
  description: "Generate custom MCQ quizzes instantly with ChatGPT. Interactive quiz platform with timer, instant results, and AI integration.",
  keywords: "quiz, MCQ, ChatGPT, AI, education, learning, test, questions",
  authors: [{ name: "Rahulanshu" }],
  robots: "index, follow",
  manifest: "/manifest.json",
  openGraph: {
    title: "ChatGPTMCQ - AI-Powered Quiz Generator",
    description: "Generate custom MCQ quizzes instantly with ChatGPT",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased flex flex-col min-h-screen`}
      >
        <TimerProvider>
          <div className="flex-grow">
            {children}
          </div>
          <Footer />
          <ServiceWorkerRegistration />
        </TimerProvider>
      </body>
    </html>
  );
}
