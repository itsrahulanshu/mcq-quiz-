import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { TimerProvider } from "@/context/TimerContext";
import Footer from "@/components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ChatGPTMCQ - AI-Powered Quiz Generator",
  description: "Generate custom MCQ quizzes instantly with ChatGPT. Interactive quiz platform with timer, instant results, and AI integration.",
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
        </TimerProvider>
      </body>
    </html>
  );
}
