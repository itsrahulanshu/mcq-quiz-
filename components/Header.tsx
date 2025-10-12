"use client";

import Link from "next/link";

interface HeaderProps {
  onHowToUseClick?: () => void;
}

export default function Header({ onHowToUseClick }: HeaderProps) {
  return (
    <header className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 group cursor-pointer min-w-0 flex-shrink"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform duration-200 flex-shrink-0">
                <span className="text-lg sm:text-2xl">🎯</span>
              </div>
              <div className="min-w-0">
                <h1 className="text-lg sm:text-2xl lg:text-3xl font-bold text-white group-hover:text-yellow-300 transition-colors duration-200 truncate">
                  ChatGPTMCQ
                </h1>
                <p className="text-xs sm:text-sm text-blue-100 hidden sm:block truncate">
                  AI-Powered Quiz Generator
                </p>
              </div>
            </div>
          </Link>

          {onHowToUseClick && (
            <button
              onClick={onHowToUseClick}
              className="flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2 bg-white text-blue-600 rounded-lg hover:bg-yellow-300 hover:text-blue-800 transition-all duration-200 font-semibold shadow-md hover:shadow-lg text-xs sm:text-sm flex-shrink-0"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="hidden xs:inline sm:inline">How to Use</span>
              <span className="xs:hidden sm:hidden">Guide</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
