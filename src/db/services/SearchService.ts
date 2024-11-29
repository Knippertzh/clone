import { db } from '../index';
import natural from 'natural';
import { SearchIndex } from '../models';

const tokenizer = new natural.WordTokenizer();
const tfidf = new natural.TfIdf();

export class SearchService {
  static async indexEntity(
    entityType: string,
    entityId: string,
    content: string,
    keywords?: string[]
  ): Promise<void> {
    // Prepare searchable text
    const tokens = tokenizer.tokenize(content.toLowerCase());
    tfidf.addDocument(tokens);
    
    // Calculate relevance score based on keyword matches
    let relevanceScore = 1.0;
    if (keywords?.length) {
      const keywordMatches = keywords.filter(keyword => 
        tokens.includes(keyword.toLowerCase())
      ).length;
      relevanceScore = keywordMatches / keywords.length;
    }

    // Create or update search index
    await db<SearchIndex>('search_index')
      .insert({
        entity_type: entityType,
        entity_id: entityId,
        searchable_text: content,
        keywords: keywords,
        relevance_score: relevanceScore,
        created_at: new Date(),
        updated_at: new Date()
      })
      .onConflict(['entity_type', 'entity_id'])
      .merge();
  }

  static async search(query: string): Promise<SearchIndex[]> {
    const searchTerms = tokenizer.tokenize(query.toLowerCase());
    
    return db<SearchIndex>('search_index')
      .whereRaw(
        searchTerms.map(() => 'searchable_text LIKE ?').join(' OR '),
        searchTerms.map(term => `%${term}%`)
      )
      .orderBy('relevance_score', 'desc');
  }

  static async searchWithAI(
    query: string,
    options: {
      entityType?: string;
      minConfidence?: number;
    } = {}
  ): Promise<SearchIndex[]> {
    // Enhance search with AI processing
    const enhancedQuery = await this.processQueryWithAI(query);
    
    let baseQuery = db<SearchIndex>('search_index')
      .whereRaw(
        'searchable_text @@ to_tsquery(?)',
        [enhancedQuery]
      );

    if (options.entityType) {
      baseQuery = baseQuery.where('entity_type', options.entityType);
    }

    if (options.minConfidence) {
      baseQuery = baseQuery.where('relevance_score', '>=', options.minConfidence);
    }

    return baseQuery.orderBy('relevance_score', 'desc');
  }

  private static async processQueryWithAI(query: string): Promise<string> {
    // Here you would integrate with your AI service
    // For now, we'll just do basic processing
    const tokens = tokenizer.tokenize(query.toLowerCase());
    return tokens.join(' & ');
  }
};