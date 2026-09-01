import { neon } from "@neondatabase/serverless";

export function getDb() {
  const databaseUrl =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_6fmQKyBeTY7r@ep-bold-mouse-aeox7um2-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require";
  return neon(databaseUrl);
}

export async function initDb() {
  const sql = getDb();

  // Create tables if they don't exist
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_config (
      id VARCHAR(50) PRIMARY KEY,
      headline VARCHAR(255) NOT NULL,
      subheadline TEXT NOT NULL,
      cta_text VARCHAR(100) NOT NULL,
      cta_link VARCHAR(255) NOT NULL,
      stat1_value VARCHAR(50) NOT NULL,
      stat1_label VARCHAR(100) NOT NULL,
      stat2_value VARCHAR(50) NOT NULL,
      stat2_label VARCHAR(100) NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      level INT NOT NULL,
      category VARCHAR(50) NOT NULL,
      code VARCHAR(50) NOT NULL,
      tagline TEXT NOT NULL,
      tags JSONB NOT NULL,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      codename VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      architecture JSONB NOT NULL,
      metrics JSONB NOT NULL,
      tags JSONB NOT NULL,
      github_url TEXT,
      live_url TEXT,
      featured BOOLEAN DEFAULT false,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS experiences (
      id VARCHAR(100) PRIMARY KEY,
      role VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      period VARCHAR(100) NOT NULL,
      badge VARCHAR(100) NOT NULL,
      overview TEXT NOT NULL,
      achievements JSONB NOT NULL,
      technologies JSONB NOT NULL,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // Seed default portfolio config if empty
  const existingConfig = await sql`SELECT id FROM portfolio_config WHERE id = 'main'`;
  if (existingConfig.length === 0) {
    await sql`
      INSERT INTO portfolio_config (
        id, headline, subheadline, cta_text, cta_link,
        stat1_value, stat1_label, stat2_value, stat2_label
      ) VALUES (
        'main',
        'MACHINE LEARNING & AI SYSTEMS',
        'Architecting high-throughput neural models, autonomous LLM pipelines, and ultra-low-latency distributed inference engines.',
        'EXPLORE MODELS',
        '#skills',
        '25M+',
        'Daily Inferences',
        '< 38ms',
        'P99 Inference Latency'
      )
    `;
  }
}
