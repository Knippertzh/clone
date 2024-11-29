import { db } from '../index';
import { v4 as uuidv4 } from 'uuid';

export interface BaseModel {
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface User extends BaseModel {
  username: string;
  email: string;
  full_name: string;
  role: string;
  permissions: string[];
  last_login: Date | null;
  is_active: boolean;
}

export interface Company extends BaseModel {
  name: string;
  domain: string;
  description?: string;
  logo_url?: string;
  website?: string;
  country?: string;
  city?: string;
  address?: string;
  postal_code?: string;
  industry?: string;
  social_media?: Record<string, string>;
  metrics?: Record<string, any>;
  tags?: string[];
  created_by: string;
  updated_by: string;
}

export interface Person extends BaseModel {
  company_id: string;
  full_name: string;
  position?: string;
  department?: string;
  email?: string;
  phone?: string;
  linkedin_url?: string;
  bio?: string;
  work_history?: Record<string, any>[];
  created_by: string;
  updated_by: string;
}

export interface Media extends BaseModel {
  company_id?: string;
  person_id?: string;
  type: 'IMAGE' | 'VIDEO' | 'DOCUMENT';
  url: string;
  title?: string;
  description?: string;
  metadata?: Record<string, any>;
  created_by: string;
  updated_by: string;
}

export interface Product extends BaseModel {
  company_id: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
  features?: string[];
  specifications?: Record<string, any>;
  created_by: string;
  updated_by: string;
}

export interface AIAnalysis extends BaseModel {
  company_id: string;
  analysis_type: string;
  results: Record<string, any>;
  confidence_score?: number;
  metadata?: Record<string, any>;
  created_by: string;
}

export interface AuditLog extends BaseModel {
  user_id: string;
  action: string;
  entity_type: string;
  entity_id: string;
  changes?: Record<string, any>;
}

export interface SearchIndex extends BaseModel {
  entity_type: string;
  entity_id: string;
  searchable_text: string;
  keywords?: string[];
  relevance_score?: number;
}

const createBaseModel = () => ({
  id: uuidv4(),
  created_at: new Date(),
  updated_at: new Date()
});

export const UserModel = {
  async create(data: Partial<User>): Promise<User> {
    const user = { ...createBaseModel(), ...data };
    const [id] = await db('users').insert(user);
    return this.getById(id);
  },

  async getById(id: string): Promise<User | null> {
    return db('users').where({ id }).first();
  },

  async getByUsername(username: string): Promise<User | null> {
    return db('users').where({ username }).first();
  },

  async update(id: string, data: Partial<User>): Promise<User | null> {
    await db('users').where({ id }).update({ ...data, updated_at: new Date() });
    return this.getById(id);
  }
};

export const CompanyModel = {
  async create(data: Partial<Company>): Promise<Company> {
    const company = { ...createBaseModel(), ...data };
    const [id] = await db('companies').insert(company);
    return this.getById(id);
  },

  async getById(id: string): Promise<Company | null> {
    return db('companies').where({ id }).first();
  },

  async search(query: string): Promise<Company[]> {
    const searchResults = await db('search_index')
      .where('entity_type', 'company')
      .whereRaw('searchable_text LIKE ?', [`%${query}%`])
      .orderBy('relevance_score', 'desc');

    return Promise.all(
      searchResults.map(result => this.getById(result.entity_id))
    );
  }
};

export const PersonModel = {
  async create(data: Partial<Person>): Promise<Person> {
    const person = { ...createBaseModel(), ...data };
    const [id] = await db('people').insert(person);
    return this.getById(id);
  },

  async getById(id: string): Promise<Person | null> {
    return db('people').where({ id }).first();
  },

  async getByCompany(companyId: string): Promise<Person[]> {
    return db('people').where({ company_id: companyId });
  }
};

export const MediaModel = {
  async create(data: Partial<Media>): Promise<Media> {
    const media = { ...createBaseModel(), ...data };
    const [id] = await db('media').insert(media);
    return this.getById(id);
  },

  async getById(id: string): Promise<Media | null> {
    return db('media').where({ id }).first();
  },

  async getByEntity(entityType: 'company' | 'person', entityId: string): Promise<Media[]> {
    const key = `${entityType}_id`;
    return db('media').where({ [key]: entityId });
  }
};

export const AIAnalysisModel = {
  async create(data: Partial<AIAnalysis>): Promise<AIAnalysis> {
    const analysis = { ...createBaseModel(), ...data };
    const [id] = await db('ai_analysis').insert(analysis);
    return this.getById(id);
  },

  async getById(id: string): Promise<AIAnalysis | null> {
    return db('ai_analysis').where({ id }).first();
  },

  async getByCompany(companyId: string): Promise<AIAnalysis[]> {
    return db('ai_analysis').where({ company_id: companyId });
  }
};

export const AuditLogModel = {
  async log(data: Omit<AuditLog, keyof BaseModel>): Promise<void> {
    await db('audit_logs').insert({
      ...createBaseModel(),
      ...data
    });
  }
};