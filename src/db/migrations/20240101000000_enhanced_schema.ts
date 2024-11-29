import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Users table
  await knex.schema.createTable('users', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.string('username').notNullable().unique();
    table.string('password_hash').notNullable();
    table.string('email').notNullable().unique();
    table.string('full_name').notNullable();
    table.string('role').notNullable().defaultTo('USER');
    table.jsonb('permissions').notNullable().defaultTo('[]');
    table.timestamp('last_login').nullable();
    table.boolean('is_active').notNullable().defaultTo(true);
    table.timestamps(true, true);
  });

  // Companies table
  await knex.schema.createTable('companies', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.string('name').notNullable();
    table.string('domain').notNullable().unique();
    table.text('description').nullable();
    table.string('logo_url').nullable();
    table.string('website').nullable();
    table.string('country').nullable();
    table.string('city').nullable();
    table.string('address').nullable();
    table.string('postal_code').nullable();
    table.string('industry').nullable();
    table.jsonb('social_media').nullable();
    table.jsonb('metrics').nullable();
    table.jsonb('tags').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });

  // People table (for employees, executives, etc.)
  await knex.schema.createTable('people', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('full_name').notNullable();
    table.string('position').nullable();
    table.string('department').nullable();
    table.string('email').nullable();
    table.string('phone').nullable();
    table.string('linkedin_url').nullable();
    table.text('bio').nullable();
    table.jsonb('work_history').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });

  // Media table (for images, videos, documents)
  await knex.schema.createTable('media', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.uuid('person_id').references('id').inTable('people').onDelete('CASCADE');
    table.string('type').notNullable(); // IMAGE, VIDEO, DOCUMENT
    table.string('url').notNullable();
    table.string('title').nullable();
    table.text('description').nullable();
    table.jsonb('metadata').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });

  // Products table
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('name').notNullable();
    table.text('description').nullable();
    table.decimal('price', 10, 2).nullable();
    table.string('currency').nullable();
    table.jsonb('features').nullable();
    table.jsonb('specifications').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.uuid('updated_by').references('id').inTable('users');
    table.timestamps(true, true);
  });

  // AI Analysis table
  await knex.schema.createTable('ai_analysis', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.uuid('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('analysis_type').notNullable();
    table.jsonb('results').notNullable();
    table.decimal('confidence_score', 4, 2).nullable();
    table.jsonb('metadata').nullable();
    table.uuid('created_by').references('id').inTable('users');
    table.timestamps(true, true);
  });

  // Audit Log table
  await knex.schema.createTable('audit_logs', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.uuid('user_id').references('id').inTable('users');
    table.string('action').notNullable();
    table.string('entity_type').notNullable();
    table.uuid('entity_id').notNullable();
    table.jsonb('changes').nullable();
    table.timestamp('created_at').notNullable().defaultTo(knex.fn.now());
  });

  // Search Index table
  await knex.schema.createTable('search_index', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('(lower(hex(randomblob(4))) || "-" || lower(hex(randomblob(2))) || "-4" || substr(lower(hex(randomblob(2))),2) || "-" || substr("89ab",abs(random()) % 4 + 1, 1) || substr(lower(hex(randomblob(2))),2) || "-" || lower(hex(randomblob(6))))'));
    table.string('entity_type').notNullable();
    table.uuid('entity_id').notNullable();
    table.text('searchable_text').notNullable();
    table.jsonb('keywords').nullable();
    table.decimal('relevance_score', 4, 2).nullable();
    table.timestamps(true, true);
    table.index(['entity_type', 'entity_id']);
    table.index('searchable_text');
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('search_index');
  await knex.schema.dropTableIfExists('audit_logs');
  await knex.schema.dropTableIfExists('ai_analysis');
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('media');
  await knex.schema.dropTableIfExists('people');
  await knex.schema.dropTableIfExists('companies');
  await knex.schema.dropTableIfExists('users');
}