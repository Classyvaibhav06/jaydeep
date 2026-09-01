import { NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";

export async function GET() {
  try {
    await initDb();
    const sql = getDb();

    const config = await sql`SELECT * FROM portfolio_config WHERE id = 'main'`;
    const skills = await sql`SELECT * FROM skills ORDER BY sort_order ASC, updated_at DESC`;
    const projects = await sql`SELECT * FROM projects ORDER BY sort_order ASC, updated_at DESC`;
    const experiences = await sql`SELECT * FROM experiences ORDER BY sort_order ASC, updated_at DESC`;

    return NextResponse.json({
      config: config[0] || null,
      skills,
      projects,
      experiences,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
