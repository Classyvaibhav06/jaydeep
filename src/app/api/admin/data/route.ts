import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { getDb, initDb } from "@/lib/db";

async function verifyAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session");
  return session && session.value === "authenticated";
}

export async function GET() {
  try {
    const isAuthed = await verifyAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await initDb();
    const sql = getDb();

    const config = await sql`SELECT * FROM portfolio_config WHERE id = 'main'`;
    const skills = await sql`SELECT * FROM skills ORDER BY sort_order ASC, created_at DESC`;
    const projects = await sql`SELECT * FROM projects ORDER BY sort_order ASC, created_at DESC`;
    const experiences = await sql`SELECT * FROM experiences ORDER BY sort_order ASC, created_at DESC`;
    const inquiries = await sql`SELECT * FROM inquiries ORDER BY created_at DESC LIMIT 50`;

    return NextResponse.json({
      config: config[0] || null,
      skills,
      projects,
      experiences,
      inquiries,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const isAuthed = await verifyAuth();
    if (!isAuthed) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await initDb();
    const sql = getDb();
    const body = await req.json();
    const { action, table, data, id } = body;

    if (action === "update_config") {
      await sql`
        INSERT INTO portfolio_config (
          id, headline, subheadline, cta_text, cta_link,
          stat1_value, stat1_label, stat2_value, stat2_label, updated_at
        ) VALUES (
          'main',
          ${data.headline},
          ${data.subheadline},
          ${data.cta_text},
          ${data.cta_link},
          ${data.stat1_value},
          ${data.stat1_label},
          ${data.stat2_value},
          ${data.stat2_label},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          headline = EXCLUDED.headline,
          subheadline = EXCLUDED.subheadline,
          cta_text = EXCLUDED.cta_text,
          cta_link = EXCLUDED.cta_link,
          stat1_value = EXCLUDED.stat1_value,
          stat1_label = EXCLUDED.stat1_label,
          stat2_value = EXCLUDED.stat2_value,
          stat2_label = EXCLUDED.stat2_label,
          updated_at = NOW();
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "upsert_skill") {
      await sql`
        INSERT INTO skills (
          id, name, level, category, code, tagline, tags, sort_order, updated_at
        ) VALUES (
          ${data.id},
          ${data.name},
          ${data.level},
          ${data.category},
          ${data.code},
          ${data.tagline},
          ${JSON.stringify(data.tags)},
          ${data.sort_order || 0},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          name = EXCLUDED.name,
          level = EXCLUDED.level,
          category = EXCLUDED.category,
          code = EXCLUDED.code,
          tagline = EXCLUDED.tagline,
          tags = EXCLUDED.tags,
          sort_order = EXCLUDED.sort_order,
          updated_at = NOW();
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "delete_skill") {
      await sql`DELETE FROM skills WHERE id = ${id}`;
      return NextResponse.json({ success: true });
    }

    if (action === "upsert_project") {
      await sql`
        INSERT INTO projects (
          id, title, codename, category, tagline, description,
          architecture, metrics, tags, github_url, live_url, featured, sort_order, updated_at
        ) VALUES (
          ${data.id},
          ${data.title},
          ${data.codename},
          ${data.category},
          ${data.tagline},
          ${data.description},
          ${JSON.stringify(data.architecture)},
          ${JSON.stringify(data.metrics)},
          ${JSON.stringify(data.tags)},
          ${data.github_url || null},
          ${data.live_url || null},
          ${data.featured || false},
          ${data.sort_order || 0},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          title = EXCLUDED.title,
          codename = EXCLUDED.codename,
          category = EXCLUDED.category,
          tagline = EXCLUDED.tagline,
          description = EXCLUDED.description,
          architecture = EXCLUDED.architecture,
          metrics = EXCLUDED.metrics,
          tags = EXCLUDED.tags,
          github_url = EXCLUDED.github_url,
          live_url = EXCLUDED.live_url,
          featured = EXCLUDED.featured,
          sort_order = EXCLUDED.sort_order,
          updated_at = NOW();
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "delete_project") {
      await sql`DELETE FROM projects WHERE id = ${id}`;
      return NextResponse.json({ success: true });
    }

    if (action === "upsert_experience") {
      await sql`
        INSERT INTO experiences (
          id, role, company, location, period, badge, overview,
          achievements, technologies, sort_order, updated_at
        ) VALUES (
          ${data.id},
          ${data.role},
          ${data.company},
          ${data.location},
          ${data.period},
          ${data.badge},
          ${data.overview},
          ${JSON.stringify(data.achievements)},
          ${JSON.stringify(data.technologies)},
          ${data.sort_order || 0},
          NOW()
        )
        ON CONFLICT (id) DO UPDATE SET
          role = EXCLUDED.role,
          company = EXCLUDED.company,
          location = EXCLUDED.location,
          period = EXCLUDED.period,
          badge = EXCLUDED.badge,
          overview = EXCLUDED.overview,
          achievements = EXCLUDED.achievements,
          technologies = EXCLUDED.technologies,
          sort_order = EXCLUDED.sort_order,
          updated_at = NOW();
      `;
      return NextResponse.json({ success: true });
    }

    if (action === "delete_experience") {
      await sql`DELETE FROM experiences WHERE id = ${id}`;
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "Unknown action" }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
