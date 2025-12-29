import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './drizzle/schema.ts';

const DATABASE_URL = process.env.DATABASE_URL;

async function main() {
  const connection = await mysql.createConnection(DATABASE_URL);
  const db = drizzle(connection, { schema, mode: 'default' });
  
  // Get list of old tables that don't exist in schema
  const [tables] = await connection.execute("SHOW TABLES");
  console.log('Current tables:', tables.length);
  
  // Tables to keep (from schema)
  const schemaTableNames = Object.keys(schema).filter(k => !k.startsWith('Insert') && !k.endsWith('$inferSelect'));
  console.log('Schema tables:', schemaTableNames.length);
  
  await connection.end();
  console.log('Done');
}

main().catch(console.error);
