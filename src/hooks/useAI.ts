import { useCallback } from 'react';
import { natural } from 'natural';
import { Record } from '../types';

interface AIAnalysis {
  sentiment: {
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  };
  keywords: string[];
  summary: string;
}

export const useAI = () => {
  // Sentiment Analysis
  const analyzeSentiment = useCallback((text: string) => {
    const analyzer = new natural.SentimentAnalyzer();
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text);
    const score = analyzer.getSentiment(tokens);
    
    return {
      score,
      label: score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : 'neutral'
    };
  }, []);

  // Company Similarity Analysis
  const findSimilarCompanies = useCallback((company: Record, allCompanies: Record[]): Record[] => {
    const companyTags = new Set([...company.category, ...company.tags]);
    
    return allCompanies
      .filter(c => c.id !== company.id)
      .map(c => {
        const otherTags = new Set([...c.category, ...c.tags]);
        const intersection = new Set([...companyTags].filter(x => otherTags.has(x)));
        const similarity = intersection.size / Math.max(companyTags.size, otherTags.size);
        return { company: c, similarity };
      })
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5)
      .map(({ company }) => company);
  }, []);

  // Market Trend Analysis
  const analyzeMarketTrends = useCallback((companies: Record[]) => {
    const categoryCounts = companies.reduce((acc, company) => {
      company.category.forEach(cat => {
        acc[cat] = (acc[cat] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>);

    const topCategories = Object.entries(categoryCounts)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5);

    return {
      dominantCategories: topCategories,
      totalCompanies: companies.length,
      categoryDistribution: Object.fromEntries(
        topCategories.map(([cat, count]) => [
          cat,
          (count / companies.length) * 100
        ])
      )
    };
  }, []);

  // Anomaly Detection
  const detectAnomalies = useCallback((company: Record) => {
    const anomalies = [];

    // Check for incomplete data
    if (!company.description || company.description.length < 50) {
      anomalies.push('Insufficient company description');
    }

    if (!company.ceo) {
      anomalies.push('Missing CEO information');
    }

    if (!company.socialMedia.linkedin && !company.socialMedia.twitter) {
      anomalies.push('No social media presence');
    }

    // Check for unusual patterns
    if (company.category.length > 10) {
      anomalies.push('Unusually high number of categories');
    }

    return anomalies;
  }, []);

  // Competitive Analysis
  const analyzeCompetitiveLandscape = useCallback((company: Record, competitors: Record[]) => {
    const analysis = {
      marketPosition: '',
      strengths: [] as string[],
      weaknesses: [] as string[],
      opportunities: [] as string[]
    };

    // Analyze market position
    const competitorCount = competitors.length;
    if (competitorCount > 10) {
      analysis.marketPosition = 'Highly Competitive Market';
    } else if (competitorCount > 5) {
      analysis.marketPosition = 'Moderately Competitive Market';
    } else {
      analysis.marketPosition = 'Niche Market';
    }

    // Analyze company strengths
    if (company.verificationStatus?.name?.verified) {
      analysis.strengths.push('Strong Brand Verification');
    }
    if (company.language.length > 2) {
      analysis.strengths.push('Global Market Presence');
    }

    // Identify opportunities
    const competitorCategories = new Set(
      competitors.flatMap(c => c.category)
    );
    const uniqueCategories = company.category.filter(
      cat => !competitorCategories.has(cat)
    );
    if (uniqueCategories.length > 0) {
      analysis.opportunities.push('Unique Market Categories');
    }

    return analysis;
  }, []);

  return {
    analyzeSentiment,
    findSimilarCompanies,
    analyzeMarketTrends,
    detectAnomalies,
    analyzeCompetitiveLandscape
  };
};