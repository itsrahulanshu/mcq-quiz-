"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-4">
          {/* Brand Name */}
          <Link 
            href="/" 
            className="group cursor-pointer"
          >
            <h2 className="text-xl sm:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 group-hover:from-yellow-300 group-hover:via-pink-300 group-hover:to-blue-300 transition-all duration-300">
              ChatGPTMCQ
            </h2>
          </Link>

          {/* Made with love */}
          <p className="text-center text-sm sm:text-base font-medium flex items-center gap-2 flex-wrap justify-center">
            <span>Made with</span>
            <span className="inline-flex items-center gap-1 animate-pulse">
              <span className="text-xl">✨</span>
              <span className="text-red-500 text-xl">❤️</span>
            </span>
            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
              Rahulanshu
            </span>
          </p>
          
          {/* Copyright */}
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} ChatGPTMCQ. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

