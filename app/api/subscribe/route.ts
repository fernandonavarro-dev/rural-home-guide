import { NextRequest, NextResponse } from "next/server";
import https from "node:https";
import http from "node:http";

// Listmonk self-hosted email capture integration
// Env vars required (set in Vercel project settings):
//   LISTMONK_URL        — e.g. https://listmonk.yoursite.com  (no trailing slash)
//   LISTMONK_LIST_UUID  — UUID of the list to subscribe to
//   LISTMONK_USERNAME   — Listmonk admin username
//   LISTMONK_PASSWORD   — Listmonk admin password

// Uses node:https directly to avoid Next.js's patched fetch and reliably capture
// Set-Cookie headers from the Listmonk session login endpoint.

function httpsPost(url: string, body: string, headers: Record<string, string>): Promise<{
  status: number;
  headers: Record<string, string | string[]>;
  body: string;
}> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === "https:" ? https : http;
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: "POST",
      headers: {
        ...headers,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = mod.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => {
        resolve({
          status: res.statusCode ?? 0,
          headers: res.headers as Record<string, string | string[]>,
          body: data,
        });
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

function httpsGet(url: string, headers: Record<string, string>): Promise<{
  status: number;
  body: string;
}> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === "https:" ? https : http;
    const options = {
      hostname: parsed.hostname,
      port: parsed.port || (parsed.protocol === "https:" ? 443 : 80),
      path: parsed.pathname + parsed.search,
      method: "GET",
      headers,
    };

    const req = mod.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () => resolve({ status: res.statusCode ?? 0, body: data }));
    });

    req.on("error", reject);
    req.end();
  });
}

async function getListmonkSession(baseUrl: string, username: string, password: string): Promise<string | null> {
  const body = new URLSearchParams({ username, password }).toString();
  const res = await httpsPost(`${baseUrl}/admin/login`, body, {
    "Content-Type": "application/x-www-form-urlencoded",
  });

  // A successful login returns 302 with Set-Cookie
  const setCookieHeader = res.headers["set-cookie"];
  const cookies = Array.isArray(setCookieHeader) ? setCookieHeader : (setCookieHeader ? [setCookieHeader] : []);
  for (const cookie of cookies) {
    const match = cookie.match(/session=([^;]+)/);
    if (match) return match[1];
  }
  console.error(`[subscribe] Login returned ${res.status}, no session cookie found`);
  return null;
}

async function getListId(baseUrl: string, sessionToken: string, listUuid: string): Promise<number | null> {
  const res = await httpsGet(`${baseUrl}/api/lists`, {
    Cookie: `session=${sessionToken}`,
  });

  if (res.status !== 200) {
    console.error(`[subscribe] /api/lists returned ${res.status}`);
    return null;
  }

  try {
    const data = JSON.parse(res.body);
    const list = data?.data?.results?.find((l: { uuid: string; id: number }) => l.uuid === listUuid);
    return list?.id ?? null;
  } catch {
    console.error("[subscribe] Failed to parse /api/lists response");
    return null;
  }
}

async function addSubscriber(
  baseUrl: string,
  sessionToken: string,
  email: string,
  listId: number
): Promise<{ status: number; body: string }> {
  const payload = JSON.stringify({
    email,
    name: email.split("@")[0],
    status: "enabled",
    lists: [listId],
    preconfirm_subscriptions: true,
  });

  return httpsPost(`${baseUrl}/api/subscribers`, payload, {
    "Content-Type": "application/json",
    Cookie: `session=${sessionToken}`,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.trim().toLowerCase();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    const listmonkUrl = process.env.LISTMONK_URL?.replace(/\/$/, "");
    const listUuid = process.env.LISTMONK_LIST_UUID;
    const username = process.env.LISTMONK_USERNAME;
    const password = process.env.LISTMONK_PASSWORD;

    if (!listmonkUrl || !listUuid || !username || !password) {
      console.error("[subscribe] Missing LISTMONK_* env vars");
      return NextResponse.json({ error: "Email service not configured." }, { status: 500 });
    }

    const sessionToken = await getListmonkSession(listmonkUrl, username, password);
    if (!sessionToken) {
      console.error("[subscribe] Failed to authenticate with Listmonk");
      return NextResponse.json({ error: "Email service authentication failed." }, { status: 500 });
    }

    const listId = await getListId(listmonkUrl, sessionToken, listUuid);
    if (!listId) {
      console.error("[subscribe] Could not resolve list UUID:", listUuid);
      return NextResponse.json({ error: "Email service configuration error." }, { status: 500 });
    }

    const subRes = await addSubscriber(listmonkUrl, sessionToken, email, listId);

    // 409 = already subscribed — treat as success
    if (subRes.status === 409 || subRes.status === 200) {
      console.log(`[subscribe] Signup: ${email}`);
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.error(`[subscribe] Listmonk error ${subRes.status}: ${subRes.body.slice(0, 200)}`);
    return NextResponse.json({ error: "Failed to subscribe. Please try again." }, { status: 500 });
  } catch (err) {
    console.error("[subscribe] Unexpected error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
