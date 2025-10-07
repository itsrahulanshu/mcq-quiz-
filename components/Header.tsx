"use client";

import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 group cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200">
                ChatGPTMCQ
              </h1>
              <p className="text-xs sm:text-sm text-blue-100 hidden sm:block">
                AI-Powered Quiz Generator
              </p>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
