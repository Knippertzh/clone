import knex from 'knex';
import config from './knexfile';

// Initialize database connection
export const db = knex(config);

// Export database instance
export default db;