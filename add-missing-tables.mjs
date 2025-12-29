import mysql from 'mysql2/promise';

const DATABASE_URL = process.env.DATABASE_URL;

// Tables that should exist according to schema
const schemaTables = [
  'access_control', 'ai_match_recommendations', 'athlete_commitments', 'athlete_views',
  'audit_logs', 'bot_categories', 'bot_creators', 'bot_favorites', 'bot_purchases',
  'bot_reviews', 'bot_tag_mappings', 'bot_tags', 'bot_usage_sessions', 'bots',
  'college_database', 'consent_records', 'creator_payouts', 'credit_transactions',
  'credit_usage', 'early_access_signups', 'employee_access_logs', 'fca_blog_posts',
  'fca_comments', 'fca_daily_verses', 'fca_devotionals', 'fca_podcasts',
  'fca_prayer_requests', 'fca_testimonies', 'medical_records', 'ncaa_compliance',
  'nil_contracts', 'school_subscriptions', 'security_incidents', 'signing_day_events',
  'signing_day_streams', 'sports', 'stream_chat', 'transfer_portal_alerts',
  'transfer_portal_analytics', 'transfer_portal_athletes', 'users', 'verification_codes',
  'vip_members'
];

async function main() {
  const connection = await mysql.createConnection(DATABASE_URL);
  
  // Get existing tables
  const [rows] = await connection.execute("SHOW TABLES");
  const existingTables = rows.map(r => Object.values(r)[0]);
  
  console.log('Existing tables in DB:', existingTables.length);
  console.log('Tables defined in schema:', schemaTables.length);
  
  // Find missing tables
  const missingTables = schemaTables.filter(t => !existingTables.includes(t));
  console.log('\nMissing tables that need to be created:', missingTables.length);
  missingTables.forEach(t => console.log('  -', t));
  
  // Find orphan tables (in DB but not in schema)
  const orphanTables = existingTables.filter(t => !schemaTables.includes(t) && t !== '__drizzle_migrations');
  console.log('\nOrphan tables (keeping them):', orphanTables.length);
  orphanTables.forEach(t => console.log('  -', t));
  
  await connection.end();
}

main().catch(console.error);
