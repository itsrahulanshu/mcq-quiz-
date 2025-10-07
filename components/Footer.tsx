"use client";

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 mt-12 border-t border-gray-700">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center gap-4">
          {/* Links */}
          <div className="flex items-center gap-4 text-sm">
            <Link href="/about" className="text-gray-400 hover:text-white transition-colors duration-200">
              About
            </Link>
            <span className="text-gray-600">•</span>
            <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors duration-200">
              Privacy Policy
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-400 text-xs mb-2">
              © {new Date().getFullYear()} ChatGPTMCQ. All rights reserved.
            </p>
            <p className="text-xs text-gray-500 flex items-center justify-center gap-1.5">
              <span>Made with</span>
              <span className="text-red-500">❤️</span>
              <span className="text-gray-400">by</span>
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

