"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center space-y-6">
          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-8">
            <Link 
              href="/about" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-base sm:text-lg font-medium"
            >
              About
            </Link>
            <span className="text-gray-600 text-xl">•</span>
            <Link 
              href="/privacy" 
              className="text-gray-300 hover:text-white transition-colors duration-200 text-base sm:text-lg font-medium"
            >
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center space-y-3 pt-4 border-t border-gray-700/50 w-full max-w-2xl">
            <p className="text-gray-400 text-sm sm:text-base">
              © {new Date().getFullYear()} ChatGPTMCQ. All rights reserved.
            </p>
            <p className="text-sm sm:text-base text-gray-400 flex flex-wrap items-center justify-center gap-2">
              <span>Made with</span>
              <span className="text-red-500 text-xl">❤️</span>
              <span>by</span>
              <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
                Rahulanshu
              </span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
