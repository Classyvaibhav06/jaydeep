import { NextResponse } from "next/server";
import { getDb, initDb } from "@/lib/db";

export async function POST(req: Request) {
  try {
    await initDb();
    const sql = getDb();
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Name, email and message are required" },
        { status: 400 }
      );
    }

    await sql`
      INSERT INTO inquiries (name, email, subject, message, created_at)
      VALUES (${name}, ${email}, ${subject || "General Inquiry"}, ${message}, NOW())
    `;

    return NextResponse.json({ success: true, message: "Transmission received" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
