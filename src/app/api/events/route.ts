import { NextRequest, NextResponse } from "next/server";
import { EventEnquirySubmission } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: EventEnquirySubmission = await req.json();

    if (!body.name || !body.email || !body.eventType || !body.message) {
      return NextResponse.json(
        { error: "Missing required event enquiry fields." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email format." },
        { status: 400 }
      );
    }

    const eventRecord = {
      id: `EVT-${Date.now().toString(36).toUpperCase()}`,
      ...body,
      receivedAt: new Date().toISOString(),
    };

    const webhookUrl = process.env.N8N_EVENT_WEBHOOK_URL;
    let n8nDispatched = false;

    if (webhookUrl) {
      try {
        const n8nRes = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "EmberAndOak-NextAPI/1.0",
          },
          body: JSON.stringify(eventRecord),
        });

        if (n8nRes.ok) {
          n8nDispatched = true;
        } else {
          console.warn(`[n8n] Event webhook returned ${n8nRes.status}`);
        }
      } catch (webhookErr) {
        console.error("[n8n] Failed to reach event webhook:", webhookErr);
      }
    } else {
      console.info("[n8n] N8N_EVENT_WEBHOOK_URL not configured. Event enquiry logged locally.");
    }

    return NextResponse.json(
      {
        success: true,
        id: eventRecord.id,
        message:
          "Your event inquiry has been received. Our hospitality director will contact you with availability and catering specs.",
        n8nDispatched,
      },
      { status: 200 }
    );
  } catch (err: unknown) {
    console.error("[API/Events Error]", err);
    return NextResponse.json(
      { error: "Internal server error processing event inquiry." },
      { status: 500 }
    );
  }
}
