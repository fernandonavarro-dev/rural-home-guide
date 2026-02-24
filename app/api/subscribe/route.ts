import { NextRequest, NextResponse } from "next/server";

// Listmonk self-hosted email capture integration
// Env vars required (set in .env.local or Vercel project settings):
//   LISTMONK_URL        — e.g. http://YOUR_LISTMONK_SERVER_IP:9000
//   LISTMONK_LIST_UUID  — UUID of the list to subscribe to (from Listmonk admin)
//   LISTMONK_USERNAME   — Listmonk admin username (for API auth)
//   LISTMONK_PASSWORD   — Listmonk admin password (for API auth)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const listmonkUrl = process.env.LISTMONK_URL;
    const listUuid = process.env.LISTMONK_LIST_UUID;
    const username = process.env.LISTMONK_USERNAME;
    const password = process.env.LISTMONK_PASSWORD;

    if (!listmonkUrl || !listUuid) {
      console.error("[subscribe] Missing LISTMONK_URL or LISTMONK_LIST_UUID env vars");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const credentials = Buffer.from(`${username}:${password}`).toString("base64");

    const listmonkRes = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${credentials}`,
      },
      body: JSON.stringify({
        email,
        name: email.split("@")[0], // Use email prefix as name fallback
        status: "enabled",
        lists: [listUuid],
        preconfirm_subscriptions: true,
      }),
    });

    if (!listmonkRes.ok) {
      const errBody = await listmonkRes.text();

      // Listmonk returns 409 if the subscriber already exists — treat as success
      if (listmonkRes.status === 409) {
        return NextResponse.json({ success: true }, { status: 200 });
      }

      console.error(`[subscribe] Listmonk error ${listmonkRes.status}: ${errBody}`);
      return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
    }

    console.log(`[subscribe] New signup added to Listmonk: ${email}`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
