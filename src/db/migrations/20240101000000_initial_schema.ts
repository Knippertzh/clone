import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Companies table
  await knex.schema.createTable('companies', (table) => {
    table.increments('id').primary();
    table.string('name').notNullable();
    table.string('domain').notNullable().unique();
    table.string('description').nullable();
    table.string('logo_url').nullable();
    table.string('country').nullable();
    table.string('city').nullable();
    table.string('industry').nullable();
    table.timestamps(true, true);
  });

  // Contacts table
  await knex.schema.createTable('contacts', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('email').nullable();
    table.string('phone').nullable();
    table.string('position').nullable();
    table.timestamps(true, true);
  });

  // Products table
  await knex.schema.createTable('products', (table) => {
    table.increments('id').primary();
    table.integer('company_id').references('id').inTable('companies').onDelete('CASCADE');
    table.string('name').notNullable();
    table.string('description').nullable();
    table.decimal('price', 10, 2).nullable();
    table.timestamps(true, true);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('products');
  await knex.schema.dropTableIfExists('contacts');
  await knex.schema.dropTableIfExists('companies');
}