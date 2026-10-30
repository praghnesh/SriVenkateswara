import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home, Sparkles } from 'lucide-react';

export default function PageHeaderBanner({ badge, title, subtitle, highlightText = '' }) {
  return (
    <div className="relative pt-32 pb-20 lg:pt-36 lg:pb-24 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden border-b border-slate-800">
      
      {/* Background Subtle Gradient Blobs */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-10 left-10 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-400 mb-6">
          <Link to="/" className="flex items-center hover:text-white transition-colors">
            <Home className="w-3.5 h-3.5 mr-1 text-blue-400" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-gray-600" />
          <span className="text-blue-400 font-bold">{title}</span>
        </nav>

        {/* Optional Badge */}
        {badge && (
          <div className="inline-flex items-center bg-blue-500/20 backdrop-blur-md border border-blue-400/30 px-4 py-1.5 rounded-full text-blue-300 font-bold text-xs uppercase tracking-wider mb-4 shadow-sm">
            <Sparkles className="w-3.5 h-3.5 mr-2 text-blue-400" />
            {badge}
          </div>
        )}

        {/* Main Heading */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
          {title} {highlightText && <span className="text-blue-500">{highlightText}</span>}
        </h1>

        {/* Subtitle */}
        {subtitle && (
          <p className="text-gray-300 text-sm sm:text-base lg:text-lg max-w-2xl mt-4 leading-relaxed">
            {subtitle}
          </p>
        )}

      </div>
    </div>
  );
}
