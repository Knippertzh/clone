import React from 'react';
import { Building2 } from 'lucide-react';

export const Header = () => (
  <div className="text-center mb-8">
    <div className="text-xs tracking-[0.3em] mb-2 animate-pulse">GLOBAL ENTERPRISE DATABASE</div>
    <div className="text-xl font-mono tracking-wider flex items-center justify-center gap-2">
      <img src="/plugilo-logo.svg" alt="Logo" className="h-6 w-auto" />
      DATABASE SYSTEM
    </div>
    <div className="text-sm font-mono mt-2 text-green-500/70">CORPORATE INTELLIGENCE NETWORK</div>
  </div>
);