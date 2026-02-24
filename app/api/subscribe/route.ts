import { NextRequest, NextResponse } from "next/server";

// TODO: Connect to email service (Mailchimp, ConvertKit, etc.)
// Current behavior: logs the email and returns success.
// Replace the handler body with your provider's API call.

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const email = body?.email?.trim();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }

    // --- Plug in your email provider here ---
    // Example (Mailchimp):
    // await fetch(`https://us1.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
    //   method: "POST",
    //   headers: {
    //     Authorization: `apikey ${process.env.MAILCHIMP_API_KEY}`,
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email_address: email, status: "subscribed" }),
    // });
    // ----------------------------------------

    console.log(`[subscribe] New signup: ${email}`);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("[subscribe] Error:", err);
    return NextResponse.json({ error: "Server error." }, { status: 500 });
  }
}
