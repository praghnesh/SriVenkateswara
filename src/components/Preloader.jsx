import React, { useState, useEffect } from 'react';

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [isUnmounted, setIsUnmounted] = useState(false);

  useEffect(() => {
    // Smooth, realistic loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = prev < 50 ? 12 : prev < 85 ? 8 : 5;
        return Math.min(100, prev + step);
      });
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 250);

      const unmountTimer = setTimeout(() => {
        setIsUnmounted(true);
      }, 850);

      return () => {
        clearTimeout(timer);
        clearTimeout(unmountTimer);
      };
    }
  }, [progress]);

  if (isUnmounted) return null;

  // SVG circle calculations for r=54 (Circumference ~339.3px)
  const circumference = 339.3;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div
      id="site-preloader"
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#070b14] transition-all duration-700 ease-in-out ${
        isDone ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
      style={{
        backgroundImage: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.08) 0%, rgba(7, 11, 20, 0.98) 70%)'
      }}
    >
      {/* Subtle warm ambient glow behind emblem */}
      <div className="absolute w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none"></div>

      {/* Central Circular Preloader with SVG Progress Ring */}
      <div className="relative w-36 h-36 sm:w-40 sm:h-40 flex items-center justify-center mb-5">
        {/* SVG Ring tracing smoothly around the logo */}
        <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 120 120">
          <defs>
            <linearGradient id="goldRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
          </defs>
          
          {/* Subtle background track */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="#1e293b"
            strokeWidth="3"
            fill="none"
            opacity="0.6"
          />
          
          {/* Active Golden Progress Stroke */}
          <circle
            cx="60"
            cy="60"
            r="54"
            stroke="url(#goldRingGrad)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
            style={{
              strokeDasharray: circumference,
              strokeDashoffset: strokeDashoffset,
              transition: 'stroke-dashoffset 90ms ease-out'
            }}
          />
        </svg>

        {/* Central Official Logo Emblem */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full p-1 bg-gradient-to-tr from-amber-500/30 via-yellow-400/20 to-transparent shadow-[0_0_25px_rgba(245,158,11,0.2)] flex items-center justify-center">
          <div className="w-full h-full rounded-full overflow-hidden bg-[#090d16] flex items-center justify-center border border-amber-500/30">
            <img
              src="/assets/images/sv-logo.jpg"
              alt="Sri Venkateswara Car Travels"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Brand Title & Slogan */}
      <div className="text-center space-y-1.5 px-4 relative z-10">
        <h2 className="text-xl sm:text-2xl font-black tracking-wider uppercase font-heading bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-300 bg-clip-text text-transparent">
          Sri Venkateswara
        </h2>
        <p className="text-[11px] sm:text-xs font-bold tracking-[0.25em] text-slate-300 uppercase">
          Car Travels &amp; Cabs
        </p>
        <div className="flex items-center justify-center gap-2 pt-1 text-[10px] tracking-widest text-amber-400/80 font-semibold uppercase">
          <span>Comfort</span>
          <span className="w-1 h-1 rounded-full bg-amber-400/50" />
          <span>Safety</span>
          <span className="w-1 h-1 rounded-full bg-amber-400/50" />
          <span>Reliability</span>
        </div>

        {/* Operating Hub Cities: Guntur, Mangalagiri, Vijayawada, Hyderabad */}
        <div className="flex items-center justify-center flex-wrap gap-2 pt-2 text-[10.5px] font-bold tracking-wider text-slate-200 uppercase">
          <span className="text-amber-300">Guntur</span>
          <span className="text-amber-500/60">•</span>
          <span className="text-amber-300">Mangalagiri</span>
          <span className="text-amber-500/60">•</span>
          <span className="text-amber-300">Vijayawada</span>
          <span className="text-amber-500/60">•</span>
          <span className="text-amber-300">Hyderabad</span>
        </div>
      </div>

      {/* Minimal Elegant Gold Pulse Dots */}
      <div className="flex items-center gap-1.5 mt-5 relative z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse [animation-delay:200ms]" />
        <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80 animate-pulse [animation-delay:400ms]" />
      </div>
    </div>
  );
}
