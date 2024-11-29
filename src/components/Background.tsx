import React from 'react';

export const Background = () => (
  <div className="fixed inset-0 overflow-hidden">
    {/* Base background */}
    <div className="absolute inset-0 bg-black" />
    
    {/* Digital Earth sphere */}
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] animate-spin-slow">
      <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(0,255,0,0.1)_0%,rgba(0,50,0,0.2)_50%,transparent_70%)]" />
      
      {/* Grid lines */}
      <div className="absolute inset-0 rounded-full [background:repeating-linear-gradient(0deg,rgba(0,255,0,0.1)_0px,rgba(0,255,0,0.1)_1px,transparent_1px,transparent_40px)] animate-pulse" />
      <div className="absolute inset-0 rounded-full [background:repeating-linear-gradient(90deg,rgba(0,255,0,0.1)_0px,rgba(0,255,0,0.1)_1px,transparent_1px,transparent_40px)] animate-pulse" />
      
      {/* Continents approximation */}
      <div className="absolute inset-0 rounded-full">
        {[...Array(18)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[150px] h-[90px] rounded-full bg-green-500/20 blur-sm animate-flicker"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${20 + Math.random() * 60}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animationDelay: `${Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
    
    {/* Overlay gradient */}
    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
    <div className="absolute inset-0 bg-black/50" />
  </div>
);