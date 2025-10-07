"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';

interface TimerContextType {
  timeLeft: number;
  isRunning: boolean;
  isPaused: boolean;
  initialMinutes: number;
  startTimer: (minutes: number) => void;
  pauseTimer: () => void;
  resumeTimer: () => void;
  resetTimer: () => void;
  stopTimer: () => void;
}

const TimerContext = createContext<TimerContextType | undefined>(undefined);

export function TimerProvider({ children }: { children: ReactNode }) {
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(0);

  useEffect(() => {
    if (!isRunning || isPaused || timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const startTimer = useCallback((minutes: number) => {
    const seconds = minutes * 60;
    setTimeLeft(seconds);
    setInitialMinutes(minutes);
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  const pauseTimer = useCallback(() => {
    setIsPaused(true);
  }, []);

  const resumeTimer = useCallback(() => {
    setIsPaused(false);
  }, []);

  const resetTimer = useCallback(() => {
    setTimeLeft(initialMinutes * 60);
    setIsPaused(false);
  }, [initialMinutes]);

  const stopTimer = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    setTimeLeft(0);
  }, []);

  return (
    <TimerContext.Provider
      value={{
        timeLeft,
        isRunning,
        isPaused,
        initialMinutes,
        startTimer,
        pauseTimer,
        resumeTimer,
        resetTimer,
        stopTimer,
      }}
    >
      {children}
    </TimerContext.Provider>
  );
}

export function useTimer() {
  const context = useContext(TimerContext);
  if (context === undefined) {
    throw new Error('useTimer must be used within a TimerProvider');
  }
  return context;
}
