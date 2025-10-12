"use client";

import { useEffect } from 'react';

export default function ServiceWorkerRegistration() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          // Service Worker registered successfully
        })
        .catch((error) => {
          // Service Worker registration failed
        });
    }
  }, []);

  return null; // This component doesn't render anything
}