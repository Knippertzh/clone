import { db } from '../index';
import { AIAnalysis, Company } from '../models';
import natural from 'natural';

export class AIService {
  static async analyzeSentiment(text: string): Promise<{
    score: number;
    label: 'positive' | 'neutral' | 'negative';
  }> {
    const analyzer = new natural.SentimentAnalyzer();
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text);
    const score = analyzer.getSentiment(tokens);

    return {
      score,
      label: score > 0.2 ? 'positive' : score < -0.2 ? 'negative' : 'neutral'
    };
  }

  static async analyzeCompany(
    companyId: string,
    userId: string
  ): Promise<AIAnalysis> {
    const company = await db<Company>('companies')
      .where({ id: companyId })
      .first();

    if (!company) {
      throw new Error('Company not found');
    }

    // Perform various analyses
    const sentimentAnalysis = await this.analyzeSentiment(company.description || '');
    const keywordExtraction = await this.extractKeywords(company.description || '');
    const industryAnalysis = await this.analyzeIndustry(company.industry || '');

    // Create AI analysis record
    const analysis: Partial<AIAnalysis> = {
      company_id: companyId,
      analysis_type: 'COMPREHENSIVE',
      results: {
        sentiment: sentimentAnalysis,
        keywords: keywordExtraction,
        industry: industryAnalysis
      },
      confidence_score: 0.85,
      metadata: {
        analyzed_fields: ['description', 'industry'],
        timestamp: new Date().toISOString()
      },
      created_by: userId
    };

    const [id] = await db<AIAnalysis>('ai_analysis').insert(analysis);
    return db<AIAnalysis>('ai_analysis').where({ id }).first();
  }

  private static async extractKeywords(text: string): Promise<string[]> {
    const tokenizer = new natural.WordTokenizer();
    const tokens = tokenizer.tokenize(text.toLowerCase());
    
    // Remove common words and sort by frequency
    const stopwords = new Set(['the', 'is', 'at', 'which', 'on']);
    const wordFreq = tokens
      .filter(word => !stopwords.has(word))
      .reduce((acc, word) => {
        acc[word] = (acc[word] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

    return Object.entries(wordFreq)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 10)
      .map(([word]) => word);
  }

  private static async analyzeIndustry(industry: string): Promise<Record<string, any>> {
    // Simplified industry analysis
    return {
      category: industry,
      confidence: 0.9,
      related_industries: [
        'Technology',
        'Software',
        'Internet'
      ],
      market_trend: 'growing'
    };
  }
}