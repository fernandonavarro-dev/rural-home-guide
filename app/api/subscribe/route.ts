import { NextRequest, NextResponse } from "next/server";

// Listmonk self-hosted email capture integration
// Env vars required (set in .env.local or Vercel project settings):
//   LISTMONK_URL        — e.g. https://listmonk.yoursite.com
//   LISTMONK_LIST_UUID  — UUID of the list to subscribe to (from Listmonk admin)
//   LISTMONK_USERNAME   — Listmonk admin username (for API auth)
//   LISTMONK_PASSWORD   — Listmonk admin password (for API auth)
//
// NOTE: This Listmonk instance uses session-based auth (not HTTP Basic Auth).
// We log in via the admin form to obtain a session cookie, then use it for the API call.

async function getListId(baseUrl: string, sessionToken: string, listUuid: string): Promise<number | null> {
  const res = await fetch(`${baseUrl}/api/lists`, {
    headers: { Cookie: `session=${sessionToken}` },
  });
  if (!res.ok) return null;
  const data = await res.json();
  const list = data?.data?.results?.find((l: { uuid: string; id: number }) => l.uuid === listUuid);
  return list?.id ?? null;
}

async function getListmonkSession(baseUrl: string, username: string, password: string): Promise<string | null> {
  const formData = new URLSearchParams();
  formData.append("username", username);
  formData.append("password", password);

  const loginRes = await fetch(`${baseUrl}/admin/login`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: formData.toString(),
    redirect: "manual", // don't follow redirect — we just want the Set-Cookie header
  });

  // A successful login issues a 302 redirect with a Set-Cookie session header
  const setCookie = loginRes.headers.get("set-cookie");
  if (!setCookie) return null;

  // Extract the session token: "session=<token>; ..."
  const match = setCookie.match(/session=([^;]+)/);
  return match ? match[1] : null;
}

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

    if (!listmonkUrl || !listUuid || !username || !password) {
      console.error("[subscribe] Missing required LISTMONK_* env vars");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    // Obtain a session cookie by logging in
    const sessionToken = await getListmonkSession(listmonkUrl, username, password);
    if (!sessionToken) {
      console.error("[subscribe] Failed to obtain Listmonk session — check credentials");
      return NextResponse.json({ error: "Email service authentication failed." }, { status: 500 });
    }

    // Resolve the list UUID to the integer ID required by the API
    const listId = await getListId(listmonkUrl, sessionToken, listUuid);
    if (!listId) {
      console.error("[subscribe] Could not resolve list UUID to ID — check LISTMONK_LIST_UUID");
      return NextResponse.json({ error: "Email service configuration error." }, { status: 500 });
    }

    const listmonkRes = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Cookie: `session=${sessionToken}`,
      },
      body: JSON.stringify({
        email,
        name: email.split("@")[0], // Use email prefix as name fallback
        status: "enabled",
        lists: [listId],
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
