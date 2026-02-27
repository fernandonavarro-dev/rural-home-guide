import { NextRequest, NextResponse } from "next/server";
// Use 'https' (without node: prefix) for broader bundler compatibility
import https from "https";
import http from "http";

// Listmonk email capture — node:https based to bypass Next.js fetch patching
// Env vars: LISTMONK_URL, LISTMONK_LIST_UUID, LISTMONK_USERNAME, LISTMONK_PASSWORD

function makeRequest(
  url: string,
  method: "GET" | "POST",
  body: string | null,
  headers: Record<string, string | number>
): Promise<{ status: number; headers: Record<string, string | string[]>; body: string }> {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const mod = parsed.protocol === "https:" ? https : http;
    const opts = {
      hostname: parsed.hostname,
      port: parsed.port ? parseInt(parsed.port) : parsed.protocol === "https:" ? 443 : 80,
      path: parsed.pathname + parsed.search,
      method,
      headers: body
        ? { ...headers, "Content-Length": Buffer.byteLength(body) }
        : headers,
    };

    const req = mod.request(opts, (res) => {
      let data = "";
      res.on("data", (chunk) => { data += chunk; });
      res.on("end", () =>
        resolve({
          status: res.statusCode ?? 0,
          headers: res.headers as Record<string, string | string[]>,
          body: data,
        })
      );
    });

    req.on("error", reject);
    req.setTimeout(8000, () => {
      req.destroy(new Error("Request timeout"));
    });

    if (body) req.write(body);
    req.end();
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
    const listIdEnv = process.env.LISTMONK_LIST_ID; // optional shortcut — skips UUID lookup
    const username = process.env.LISTMONK_USERNAME;
    const password = process.env.LISTMONK_PASSWORD;

    if (!listmonkUrl || !username || !password || (!listUuid && !listIdEnv)) {
      console.error("[subscribe] Missing env vars:", { url: !!listmonkUrl, uuid: !!listUuid, listId: !!listIdEnv, user: !!username, pass: !!password });
      return NextResponse.json({ error: "E1: service not configured." }, { status: 500 });
    }

    // Step 1: Session login
    let sessionToken: string | null = null;
    try {
      const formBody = new URLSearchParams({ username, password }).toString();
      const loginRes = await makeRequest(
        `${listmonkUrl}/admin/login`,
        "POST",
        formBody,
        { "Content-Type": "application/x-www-form-urlencoded" }
      );
      const setCookieHeader = loginRes.headers["set-cookie"];
      const cookies = Array.isArray(setCookieHeader)
        ? setCookieHeader
        : setCookieHeader
        ? [setCookieHeader]
        : [];
      for (const cookie of cookies) {
        const match = cookie.match(/session=([^;]+)/);
        if (match) { sessionToken = match[1]; break; }
      }
      if (!sessionToken) {
        console.error("[subscribe] E2: login status", loginRes.status, "no session cookie");
      }
    } catch (err) {
      console.error("[subscribe] E2: login threw:", err);
    }

    if (!sessionToken) {
      return NextResponse.json({ error: "E2: auth failed." }, { status: 500 });
    }

    // Step 2: Resolve list ID (use env shortcut if set, otherwise look up by UUID)
    let listId: number | null = listIdEnv ? parseInt(listIdEnv, 10) : null;

    if (!listId && listUuid) {
      try {
        const listRes = await makeRequest(
          `${listmonkUrl}/api/lists`,
          "GET",
          null,
          { Cookie: `session=${sessionToken}` }
        );
        if (listRes.status !== 200) {
          console.error("[subscribe] E3: /api/lists returned", listRes.status, listRes.body.slice(0, 100));
        } else {
          const data = JSON.parse(listRes.body);
          const list = data?.data?.results?.find(
            (l: { uuid: string; id: number }) => l.uuid === listUuid
          );
          if (list) {
            listId = list.id;
          } else {
            console.error("[subscribe] E4: UUID not found. Available:", data?.data?.results?.map((l: { uuid: string }) => l.uuid));
          }
        }
      } catch (err) {
        console.error("[subscribe] E3: lists threw:", err);
      }
    }

    if (!listId) {
      return NextResponse.json({ error: "E3: list lookup failed." }, { status: 500 });
    }

    // Step 3: Create subscriber
    try {
      const payload = JSON.stringify({
        email,
        name: email.split("@")[0],
        status: "enabled",
        lists: [listId],
        preconfirm_subscriptions: true,
      });

      const subRes = await makeRequest(
        `${listmonkUrl}/api/subscribers`,
        "POST",
        payload,
        { "Content-Type": "application/json", Cookie: `session=${sessionToken}` }
      );

      if (subRes.status === 200 || subRes.status === 201 || subRes.status === 409) {
        console.log("[subscribe] OK:", email, "status:", subRes.status);
        return NextResponse.json({ success: true }, { status: 200 });
      }

      console.error("[subscribe] E5: subscriber API returned", subRes.status, subRes.body.slice(0, 200));
      return NextResponse.json({ error: "E5: subscription failed." }, { status: 500 });
    } catch (err) {
      console.error("[subscribe] E5: subscriber threw:", err);
      return NextResponse.json({ error: "E5: subscription error." }, { status: 500 });
    }
  } catch (err) {
    console.error("[subscribe] Unexpected:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
