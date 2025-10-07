"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="flex flex-col items-center gap-6">
          {/* Brand Section */}
          <div className="text-center">
            <Link 
              href="/" 
              className="group cursor-pointer inline-block mb-3"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:from-yellow-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-300">
                ChatGPTMCQ
              </h2>
            </Link>
            <p className="text-gray-400 text-sm mb-4">
              Generate custom multiple-choice quizzes instantly with AI assistance.
            </p>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              About
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200 text-sm">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center border-t border-gray-700 pt-6 w-full">
            <p className="text-gray-400 text-xs sm:text-sm mb-2">
              © {new Date().getFullYear()} ChatGPTMCQ. All rights reserved.
            </p>
            <p className="text-sm text-gray-500 flex items-center justify-center gap-2">
              <span>Made with</span>
              <span className="inline-flex items-center gap-1">
                <span className="text-lg">✨</span>
                <span className="text-red-500 text-lg">❤️</span>
              </span>
              <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Rahulanshu
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

