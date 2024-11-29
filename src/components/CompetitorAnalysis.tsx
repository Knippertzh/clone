import React, { useState, useEffect } from 'react';
import { X, TrendingUp, Building2, Globe, ArrowRight } from 'lucide-react';
import { Record } from '../types';
import { useSound } from '../hooks/useSound';
import { getAllRecords } from '../utils/recordManager';

interface CompetitorAnalysisProps {
  company: Record;
  onClose: () => void;
}

export const CompetitorAnalysis: React.FC<CompetitorAnalysisProps> = ({ company, onClose }) => {
  const [showContent, setShowContent] = useState(false);
  const { playSound } = useSound();
  const allRecords = getAllRecords();

  useEffect(() => {
    const loadContent = async () => {
      playSound('diskRead');
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowContent(true);
    };
    loadContent();
  }, [playSound]);

  const getCompetitorRecord = (name: string): Record | undefined => {
    return allRecords.find(record => record.name === name);
  };

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />
      <div className="relative h-full flex items-start justify-center p-8 overflow-y-auto">
        {!showContent ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-green-500 text-2xl font-mono animate-pulse">
              ANALYZING MARKET COMPETITION...
            </div>
          </div>
        ) : (
          <div className="w-full max-w-4xl bg-black/80 border border-green-500/30 rounded-lg p-8">
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-red-500/70 hover:text-red-500 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Rest of the component content remains the same */}
            {/* ... */}
          </div>
        )}
      </div>
    </div>
  );
};