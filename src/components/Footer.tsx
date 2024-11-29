import React from 'react';
import { Info } from 'lucide-react';

export const Footer = () => (
  <div className="mt-6 text-center">
    <div className="flex items-center justify-center gap-2 text-green-500/70 mb-2">
      <Info className="w-4 h-4" />
      <span className="font-mono text-sm">SYSTEM NOTICE</span>
    </div>
    <div className="text-xs font-mono leading-relaxed text-green-500/70 max-w-md mx-auto">
      This database contains publicly available corporate information. Data is sourced
      from official registries, public filings, and verified business records.
      Updated daily for accuracy and compliance.
    </div>
  </div>
);