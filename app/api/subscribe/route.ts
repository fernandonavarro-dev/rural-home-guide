import { NextRequest, NextResponse } from "next/server";

// Listmonk self-hosted email capture integration
// Env vars required (set in Vercel project settings):
//   LISTMONK_URL        — e.g. https://listmonk.yoursite.com  (no trailing slash)
//   LISTMONK_LIST_UUID  — UUID of the list to subscribe to (from Listmonk admin → Lists)
//   LISTMONK_USERNAME   — Listmonk admin username
//   LISTMONK_PASSWORD   — Listmonk admin password
//
// Uses HTTP Basic Auth — simpler and more reliable than session-based auth for serverless.

function basicAuthHeader(username: string, password: string): string {
  return "Basic " + Buffer.from(`${username}:${password}`).toString("base64");
}

async function getListId(
  baseUrl: string,
  authHeader: string,
  listUuid: string
): Promise<number | null> {
  try {
    const res = await fetch(`${baseUrl}/api/lists`, {
      headers: { Authorization: authHeader },
    });
    if (!res.ok) {
      console.error(`[subscribe] /api/lists returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    const list = data?.data?.results?.find(
      (l: { uuid: string; id: number }) => l.uuid === listUuid
    );
    if (!list) {
      console.error(
        `[subscribe] List UUID "${listUuid}" not found in Listmonk. Found:`,
        data?.data?.results?.map((l: { uuid: string; name: string }) => ({ uuid: l.uuid, name: l.name }))
      );
    }
    return list?.id ?? null;
  } catch (err) {
    console.error("[subscribe] Error fetching list ID:", err);
    return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const listmonkUrl = process.env.LISTMONK_URL?.replace(/\/$/, ""); // strip trailing slash
    const listUuid = process.env.LISTMONK_LIST_UUID;
    const username = process.env.LISTMONK_USERNAME;
    const password = process.env.LISTMONK_PASSWORD;

    if (!listmonkUrl || !listUuid || !username || !password) {
      console.error("[subscribe] Missing LISTMONK_* env vars. Present:", {
        url: !!listmonkUrl,
        uuid: !!listUuid,
        user: !!username,
        pass: !!password,
      });
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const authHeader = basicAuthHeader(username, password);

    // Resolve the list UUID to the integer ID required by the subscriber API
    const listId = await getListId(listmonkUrl, authHeader, listUuid);
    if (!listId) {
      return NextResponse.json({ error: "Email service configuration error." }, { status: 500 });
    }

    const listmonkRes = await fetch(`${listmonkUrl}/api/subscribers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: authHeader,
      },
      body: JSON.stringify({
        email,
        name: email.split("@")[0],
        status: "enabled",
        lists: [listId],
        preconfirm_subscriptions: true,
      }),
    });

    if (!listmonkRes.ok) {
      const errBody = await listmonkRes.text();

      // 409 = subscriber already exists — treat as success
      if (listmonkRes.status === 409) {
        return NextResponse.json({ success: true }, { status: 200 });
      }

      console.error(`[subscribe] Listmonk /api/subscribers error ${listmonkRes.status}: ${errBody}`);
      return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
    }

    console.log(`[subscribe] New signup: ${email}`);
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
