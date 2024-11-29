import React, { useState } from 'react';
import { BarChart, PieChart, Map, Network } from 'lucide-react';
import { Record } from '../types';

interface DataVisualizationProps {
  records: Record[];
}

export const DataVisualization: React.FC<DataVisualizationProps> = ({ records }) => {
  const [activeView, setActiveView] = useState<'market' | 'geo' | 'industry' | 'network'>('market');

  const renderVisualization = () => {
    switch (activeView) {
      case 'market':
        return (
          <div className="h-96 border border-green-500/30 rounded-lg p-4">
            <div className="text-center text-green-500/70">
              Market Share Visualization
            </div>
          </div>
        );
      case 'geo':
        return (
          <div className="h-96 border border-green-500/30 rounded-lg p-4">
            <div className="text-center text-green-500/70">
              Geographic Distribution
            </div>
          </div>
        );
      case 'industry':
        return (
          <div className="h-96 border border-green-500/30 rounded-lg p-4">
            <div className="text-center text-green-500/70">
              Industry Sector Breakdown
            </div>
          </div>
        );
      case 'network':
        return (
          <div className="h-96 border border-green-500/30 rounded-lg p-4">
            <div className="text-center text-green-500/70">
              Company Relationship Network
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveView('market')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeView === 'market'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <BarChart className="w-4 h-4" />
          Market Share
        </button>
        <button
          onClick={() => setActiveView('geo')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeView === 'geo'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <Map className="w-4 h-4" />
          Geographic
        </button>
        <button
          onClick={() => setActiveView('industry')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeView === 'industry'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <PieChart className="w-4 h-4" />
          Industry
        </button>
        <button
          onClick={() => setActiveView('network')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeView === 'network'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <Network className="w-4 h-4" />
          Network
        </button>
      </div>

      {renderVisualization()}
    </div>
  );
};