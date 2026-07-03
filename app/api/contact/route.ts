import { NextResponse } from "next/server";
import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";

/**
 * Receives contact-form submissions, validates them, and saves each one as a
 * `contactMessage` document in Sanity so they show up in the Studio inbox.
 *
 * Needs a write-enabled token in `SANITY_API_WRITE_TOKEN` (Editor role). Without
 * it, the endpoint still responds OK but logs a warning — so the form never
 * hard-fails; the message just isn't stored until the token is set.
 */
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const company = String(body.company ?? "").trim();
  const projectType = String(body.projectType ?? "").trim();

  if (!name || !email || !isEmail(email) || !message) {
    return NextResponse.json({ error: "Please fill in the required fields." }, { status: 422 });
  }

  if (!writeToken) {
    console.warn(
      "[contact] SANITY_API_WRITE_TOKEN is not set — message received but not stored.",
    );
    return NextResponse.json({ ok: true, stored: false });
  }

  try {
    const client = createClient({ projectId, dataset, apiVersion, useCdn: false, token: writeToken });
    await client.create({
      _type: "contactMessage",
      name,
      email,
      company: company || undefined,
      projectType: projectType || undefined,
      message,
      submittedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, stored: true });
  } catch (err) {
    console.error("[contact] failed to store message:", err);
    return NextResponse.json({ error: "Could not save your message." }, { status: 500 });
  }
}
