export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white py-6 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center gap-2">
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
          <p className="text-gray-400 text-xs sm:text-sm">
            © {new Date().getFullYear()} MCQ Quiz Generator. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
