import React, { useState } from 'react';
import { Brain, TrendingUp, Users, Newspaper } from 'lucide-react';
import { Record } from '../types';

interface AIAnalysisProps {
  record: Record;
}

export const AIAnalysis: React.FC<AIAnalysisProps> = ({ record }) => {
  const [activeTab, setActiveTab] = useState<'sentiment' | 'trends' | 'competition' | 'news'>('sentiment');

  const renderAnalysis = () => {
    switch (activeTab) {
      case 'sentiment':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-500">Company Sentiment Analysis</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="border border-green-500/30 rounded-lg p-4">
                <div className="text-sm text-green-500/70">Market Sentiment</div>
                <div className="text-xl text-green-500">Positive</div>
              </div>
              <div className="border border-green-500/30 rounded-lg p-4">
                <div className="text-sm text-green-500/70">Social Media</div>
                <div className="text-xl text-green-500">Neutral</div>
              </div>
              <div className="border border-green-500/30 rounded-lg p-4">
                <div className="text-sm text-green-500/70">News Coverage</div>
                <div className="text-xl text-green-500">Positive</div>
              </div>
            </div>
          </div>
        );
      case 'trends':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-500">Market Trend Predictions</h3>
            <div className="border border-green-500/30 rounded-lg p-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Market Growth</span>
                  <span className="text-green-500">+12.5%</span>
                </div>
                <div className="flex justify-between">
                  <span>Industry Position</span>
                  <span className="text-green-500">Strong</span>
                </div>
                <div className="flex justify-between">
                  <span>Innovation Score</span>
                  <span className="text-green-500">8.5/10</span>
                </div>
              </div>
            </div>
          </div>
        );
      case 'competition':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-500">Competitive Analysis</h3>
            <div className="border border-green-500/30 rounded-lg p-4">
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-green-500/70 mb-2">Main Competitors</div>
                  <div className="space-y-2">
                    {/* Add competitor list */}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-green-500/70 mb-2">Market Position</div>
                  <div className="text-green-500">Market Leader in Enterprise Software</div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'news':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-green-500">News & Social Media Monitoring</h3>
            <div className="border border-green-500/30 rounded-lg p-4">
              <div className="space-y-4">
                {/* Add news feed */}
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <button
          onClick={() => setActiveTab('sentiment')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'sentiment'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <Brain className="w-4 h-4" />
          Sentiment
        </button>
        <button
          onClick={() => setActiveTab('trends')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'trends'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <TrendingUp className="w-4 h-4" />
          Trends
        </button>
        <button
          onClick={() => setActiveTab('competition')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'competition'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <Users className="w-4 h-4" />
          Competition
        </button>
        <button
          onClick={() => setActiveTab('news')}
          className={`flex items-center gap-2 px-4 py-2 rounded ${
            activeTab === 'news'
              ? 'bg-green-500/20 text-green-500'
              : 'text-green-500/70 hover:text-green-500'
          }`}
        >
          <Newspaper className="w-4 h-4" />
          News
        </button>
      </div>

      {renderAnalysis()}
    </div>
  );
};