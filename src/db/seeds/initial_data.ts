import { Knex } from 'knex';
import { v4 as uuidv4 } from 'uuid';

export async function seed(knex: Knex): Promise<void> {
  // Clear existing entries
  await knex('search_index').del();
  await knex('audit_logs').del();
  await knex('ai_analysis').del();
  await knex('products').del();
  await knex('media').del();
  await knex('people').del();
  await knex('companies').del();
  await knex('users').del();

  // Insert initial admin user
  const adminId = uuidv4();
  await knex('users').insert({
    id: adminId,
    username: 'admin',
    password_hash: 'admin123', // In production, use proper password hashing
    email: 'admin@example.com',
    full_name: 'System Administrator',
    role: 'ADMIN',
    permissions: JSON.stringify(['ADMIN']),
    created_at: new Date(),
    updated_at: new Date()
  });

  // Insert sample company
  const companyId = uuidv4();
  await knex('companies').insert({
    id: companyId,
    name: 'Example Corp',
    domain: 'example.com',
    description: 'A sample company for testing',
    industry: 'Technology',
    created_by: adminId,
    updated_by: adminId,
    created_at: new Date(),
    updated_at: new Date()
  });

  // Index the company in search
  await knex('search_index').insert({
    id: uuidv4(),
    entity_type: 'company',
    entity_id: companyId,
    searchable_text: 'Example Corp Technology sample company testing',
    relevance_score: 1.0,
    created_at: new Date(),
    updated_at: new Date()
  });
}