"use client";

import { useTimer } from "@/context/TimerContext";
import { useEffect } from "react";

interface QuizHeaderProps {
  isQuizActive: boolean;
  onTimerEnd?: () => void;
}

export default function QuizHeader({ isQuizActive, onTimerEnd }: QuizHeaderProps) {
  const { timeLeft, isRunning, isPaused, pauseTimer, resumeTimer } = useTimer();

  useEffect(() => {
    if (isRunning && timeLeft === 0 && onTimerEnd) {
      onTimerEnd();
    }
  }, [timeLeft, isRunning, onTimerEnd]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  const getTimeColor = () => {
    if (!isRunning) return "text-gray-400";
    if (isPaused) return "text-orange-500";
    if (timeLeft <= 60) return "text-red-600";
    if (timeLeft <= 180) return "text-orange-500";
    return "text-purple-600";
  };

  const getProgressPercentage = () => {
    const initialSeconds = useTimer().initialMinutes * 60;
    if (initialSeconds === 0) return 0;
    return (timeLeft / initialSeconds) * 100;
  };

  if (!isQuizActive) return null;

  return (
    <header className="sticky top-0 z-50 bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo/Title - Compact */}
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-2 rounded-lg">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h1 className="text-lg font-bold text-gray-800 hidden sm:block">MCQ Quiz</h1>
          </div>

          {/* Timer Section - Improved */}
          <div className="flex-1 max-w-2xl">
            <div className="relative">
              {/* Progress Bar with embedded text */}
              <div className="relative h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl overflow-hidden border-2 border-purple-200">
                {/* Animated Progress Fill */}
                <div
                  className={`absolute inset-0 transition-all duration-1000 ${
                    isPaused
                      ? "bg-gradient-to-r from-orange-400 to-yellow-500"
                      : timeLeft <= 60
                      ? "bg-gradient-to-r from-red-500 to-red-600"
                      : timeLeft <= 180
                      ? "bg-gradient-to-r from-orange-500 to-orange-600"
                      : "bg-gradient-to-r from-purple-500 to-pink-500"
                  }`}
                  style={{ width: `${getProgressPercentage()}%` }}
                />
                
                {/* Timer Text Overlay */}
                <div className="relative h-full flex items-center justify-between px-4">
                  <div className="flex items-center gap-2">
                    <svg className={`w-5 h-5 text-white ${isPaused ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-sm font-semibold text-white drop-shadow-lg">
                      {isPaused ? "⏸ Paused" : "Time Remaining"}
                    </span>
                  </div>
                  <span className="text-2xl font-bold text-white drop-shadow-lg tabular-nums">
                    {formatTime(timeLeft)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Pause/Resume Button - Compact */}
          <button
            onClick={isPaused ? resumeTimer : pauseTimer}
            className={`px-4 py-2.5 rounded-xl font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2 text-sm ${
              isPaused
                ? "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700"
                : "bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600"
            }`}
          >
            {isPaused ? (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Resume</span>
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span className="hidden sm:inline">Pause</span>
              </>
            )}
          </button>
        </div>
        
        {/* Warning Messages */}
        {isPaused && (
          <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-white py-2 text-center">
            <p className="text-sm font-bold">
              🔒 QUIZ PAUSED - All interactions disabled. Click Resume to continue.
            </p>
          </div>
        )}
        {!isPaused && timeLeft <= 60 && timeLeft > 0 && (
          <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-2 text-center animate-pulse">
            <p className="text-sm font-bold">
              ⚠️ Less than 1 minute remaining! Hurry up!
            </p>
          </div>
        )}
      </div>
    </header>
  );
}
