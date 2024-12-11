import { fileURLToPath } from 'url';
import path from 'path';
import knex from 'knex';
import knexfile from '../src/db/knexfile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Initializes the database by running migrations and seeds.
 * This function connects to the database using Knex, performs the latest migrations,
 * and runs the seed files to populate the database with initial data.
 *
 * @async
 * @function setupDatabase
 * @throws {Error} Throws an error if the database setup fails during migrations or seeding.
 *
 * @example
 * // To set up the database, simply call the function
 * setupDatabase()
 *   .then(() => console.log('Database setup complete'))
 *   .catch(err => console.error('Database setup failed:', err));
 */
async function setupDatabase() {
  console.log('Initializing database...');
  
  try {
    const db = knex(knexfile);

    console.log('Running migrations...');
    await db.migrate.latest();

    console.log('Running seeds...');
    await db.seed.run();

    console.log('Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up database:', error);
    process.exit(1);
  }
}

setupDatabase();