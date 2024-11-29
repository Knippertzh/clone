import { fileURLToPath } from 'url';
import path from 'path';
import knex from 'knex';
import knexfile from '../src/db/knexfile.js';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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