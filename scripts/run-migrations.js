#!/usr/bin/env node

/**
 * Script to run database migrations using direct PostgreSQL connection
 * Usage: node scripts/run-migrations.js [migration-file.sql]
 * 
 * Requires: pg package (npm install pg)
 */

const fs = require('fs');
const path = require('path');
const { Client } = require('pg');

// Database connection string
const DB_CONNECTION_STRING = 'postgresql://postgres:K1551d0ug0u@db.uvdrwbmhmtgacwzujfzc.supabase.co:5432/postgres';

// Migration directory
const MIGRATIONS_DIR = path.join(__dirname, '..', 'supabase', 'migrations');

async function runMigration(migrationFile) {
  const client = new Client({
    connectionString: DB_CONNECTION_STRING,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully');

    // Read migration file
    const migrationPath = path.isAbsolute(migrationFile) 
      ? migrationFile 
      : path.join(MIGRATIONS_DIR, migrationFile);

    if (!fs.existsSync(migrationPath)) {
      throw new Error(`Migration file not found: ${migrationPath}`);
    }

    console.log(`📄 Reading migration: ${migrationPath}`);
    const sql = fs.readFileSync(migrationPath, 'utf8');

    // Execute migration
    console.log('🚀 Running migration...');
    await client.query(sql);
    console.log('✅ Migration completed successfully');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

async function runAllMigrations() {
  const client = new Client({
    connectionString: DB_CONNECTION_STRING,
  });

  try {
    console.log('🔌 Connecting to database...');
    await client.connect();
    console.log('✅ Connected successfully');

    // Create migrations tracking table if it doesn't exist
    await client.query(`
      CREATE TABLE IF NOT EXISTS schema_migrations (
        version VARCHAR(255) PRIMARY KEY,
        applied_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);

    // Get all migration files
    const migrationFiles = fs.readdirSync(MIGRATIONS_DIR)
      .filter(file => file.endsWith('.sql'))
      .sort();

    console.log(`📋 Found ${migrationFiles.length} migration files`);

    for (const file of migrationFiles) {
      // Check if migration already applied
      const version = file.replace('.sql', '');
      const result = await client.query(
        'SELECT version FROM schema_migrations WHERE version = $1',
        [version]
      );

      if (result.rows.length > 0) {
        console.log(`⏭️  Skipping ${file} (already applied)`);
        continue;
      }

      // Run migration
      console.log(`🚀 Running migration: ${file}`);
      const migrationPath = path.join(MIGRATIONS_DIR, file);
      const sql = fs.readFileSync(migrationPath, 'utf8');

      try {
        await client.query('BEGIN');
        await client.query(sql);
        await client.query(
          'INSERT INTO schema_migrations (version) VALUES ($1)',
          [version]
        );
        await client.query('COMMIT');
        console.log(`✅ Migration ${file} completed successfully`);
      } catch (error) {
        await client.query('ROLLBACK');
        throw error;
      }
    }

    console.log('✅ All migrations completed successfully');

  } catch (error) {
    console.error('❌ Migration failed:', error.message);
    console.error(error);
    process.exit(1);
  } finally {
    await client.end();
    console.log('🔌 Database connection closed');
  }
}

// Main execution
const args = process.argv.slice(2);

if (args.length === 0) {
  console.log('📋 Running all pending migrations...\n');
  runAllMigrations().catch(console.error);
} else if (args[0] === '--all' || args[0] === '-a') {
  console.log('📋 Running all migrations (including already applied)...\n');
  runAllMigrations().catch(console.error);
} else {
  const migrationFile = args[0];
  console.log(`📋 Running single migration: ${migrationFile}\n`);
  runMigration(migrationFile).catch(console.error);
}

