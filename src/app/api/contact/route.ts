import { NextRequest, NextResponse } from "next/server";
import { ContactSubmission } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ContactSubmission = await req.json();

    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required contact fields (name, email, message)." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    const contactRecord = {
      id: `CNT-${Date.now().toString(36).toUpperCase()}`,
      ...body,
      receivedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.N8N_CONTACT_WEBHOOK_URL;
    let n8nDispatched = false;

    if (webhookUrl) {
      try {
        const n8nRes = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "EmberAndOak-NextAPI/1.0",
          },
          body: JSON.stringify(contactRecord),
        });

        if (n8nRes.ok) {
          n8nDispatched = true;
        } else {
          console.warn(`[n8n] Contact webhook responded with status ${n8nRes.status}`);
        }
      } catch (webhookErr) {
        console.error("[n8n] Failed to reach contact webhook:", webhookErr);
      }
    } else {
      console.info("[n8n] N8N_CONTACT_WEBHOOK_URL not configured. Inquiry logged locally.");
    }

    return NextResponse.json(
      {
        success: true,
        id: contactRecord.id,
        message: "Thank you for reaching out. The Ember & Oak team will reply within one business day.",
        n8nDispatched,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[API/Contact Error]", err);
    return NextResponse.json(
      { error: "Internal server error processing contact message." },
      { status: 500 }
    );
  }
}
