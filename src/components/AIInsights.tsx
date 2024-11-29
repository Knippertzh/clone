import React, { useState, useEffect } from 'react';
import { Brain, TrendingUp, AlertTriangle, Users } from 'lucide-react';
import { Record } from '../types';
import { useAI } from '../hooks/useAI';

interface AIInsightsProps {
  company: Record;
  allCompanies: Record[];
}

export const AIInsights: React.FC<AIInsightsProps> = ({ company, allCompanies }) => {
  const {
    analyzeSentiment,
    findSimilarCompanies,
    analyzeMarketTrends,
    detectAnomalies,
    analyzeCompetitiveLandscape
  } = useAI();

  const [insights, setInsights] = useState({
    sentiment: { score: 0, label: 'neutral' as const },
    similarCompanies: [] as Record[],
    marketTrends: {
      dominantCategories: [] as [string, number][],
      totalCompanies: 0,
      categoryDistribution: {} as Record<string, number>
    },
    anomalies: [] as string[],
    competitiveAnalysis: {
      marketPosition: '',
      strengths: [] as string[],
      weaknesses: [] as string[],
      opportunities: [] as string[]
    }
  });

  useEffect(() => {
    const sentiment = analyzeSentiment(company.description);
    const similarCompanies = findSimilarCompanies(company, allCompanies);
    const marketTrends = analyzeMarketTrends(allCompanies);
    const anomalies = detectAnomalies(company);
    const competitiveAnalysis = analyzeCompetitiveLandscape(
      company,
      company.competitors || []
    );

    setInsights({
      sentiment,
      similarCompanies,
      marketTrends,
      anomalies,
      competitiveAnalysis
    });
  }, [company, allCompanies]);

  return (
    <div className="space-y-6">
      {/* Sentiment Analysis */}
      <div className="border border-green-500/30 rounded-lg p-4">
        <h3 className="text-green-500 flex items-center gap-2 mb-4">
          <Brain className="w-4 h-4" />
          AI Sentiment Analysis
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-green-500/70 mb-2">Company Sentiment</div>
            <div className={`text-xl ${
              insights.sentiment.label === 'positive' ? 'text-green-500' :
              insights.sentiment.label === 'negative' ? 'text-red-500' :
              'text-yellow-500'
            }`}>
              {insights.sentiment.label.toUpperCase()}
            </div>
          </div>
          <div>
            <div className="text-sm text-green-500/70 mb-2">Confidence Score</div>
            <div className="text-xl text-green-500">
              {Math.abs(insights.sentiment.score * 100).toFixed(1)}%
            </div>
          </div>
        </div>
      </div>

      {/* Market Trends */}
      <div className="border border-green-500/30 rounded-lg p-4">
        <h3 className="text-green-500 flex items-center gap-2 mb-4">
          <TrendingUp className="w-4 h-4" />
          Market Analysis
        </h3>
        <div className="space-y-4">
          <div>
            <div className="text-sm text-green-500/70 mb-2">Dominant Categories</div>
            {insights.marketTrends.dominantCategories.map(([category, count]) => (
              <div key={category} className="flex justify-between items-center">
                <span>{category}</span>
                <span className="text-green-500">{count} companies</span>
              </div>
            ))}
          </div>
          <div>
            <div className="text-sm text-green-500/70 mb-2">Market Position</div>
            <div className="text-green-500">
              {insights.competitiveAnalysis.marketPosition}
            </div>
          </div>
        </div>
      </div>

      {/* Anomalies */}
      {insights.anomalies.length > 0 && (
        <div className="border border-green-500/30 rounded-lg p-4">
          <h3 className="text-yellow-500 flex items-center gap-2 mb-4">
            <AlertTriangle className="w-4 h-4" />
            Data Quality Alerts
          </h3>
          <ul className="space-y-2">
            {insights.anomalies.map((anomaly, index) => (
              <li key={index} className="text-yellow-500/70">
                • {anomaly}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Similar Companies */}
      <div className="border border-green-500/30 rounded-lg p-4">
        <h3 className="text-green-500 flex items-center gap-2 mb-4">
          <Users className="w-4 h-4" />
          Similar Companies
        </h3>
        <div className="space-y-2">
          {insights.similarCompanies.map(similar => (
            <div key={similar.id} className="flex justify-between items-center">
              <span>{similar.name}</span>
              <span className="text-green-500/70">{similar.category[0]}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};