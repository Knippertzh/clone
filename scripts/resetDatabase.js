import { fileURLToPath } from 'url';
import path from 'path';
import knex from 'knex';
import knexfile from '../src/db/knexfile.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Resets the database by removing the existing database file,
 * running migrations, and seeding the database with initial data.
 *
 * This function performs the following steps:
 * 1. Closes the current database connection.
 * 2. Checks for the existence of the database file and removes it if found.
 * 3. Reinitializes the database connection.
 * 4. Executes the latest migrations.
 * 5. Runs the seed scripts to populate the database with initial data.
 *
 * @async
 * @throws {Error} Throws an error if any step in the process fails,
 *                 which is logged to the console.
 *
 * @example
 * // To reset the database, simply call the function
 * await resetDatabase();
 */
async function resetDatabase() {
  console.log('Resetting database...');
  
  try {
    const db = knex(knexfile);
    const dbPath = path.resolve(__dirname, '../src/db/database.sqlite');

    // Close database connection
    await db.destroy();

    // Remove existing database file if it exists
    if (fs.existsSync(dbPath)) {
      fs.unlinkSync(dbPath);
      console.log('Removed existing database file');
    }

    // Reinitialize database
    const newDb = knex(knexfile);

    console.log('Running migrations...');
    await newDb.migrate.latest();

    console.log('Running seeds...');
    await newDb.seed.run();

    console.log('Database reset completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
}

resetDatabase();