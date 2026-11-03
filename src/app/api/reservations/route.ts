import { NextRequest, NextResponse } from "next/server";
import { ReservationSubmission } from "@/types";

export async function POST(req: NextRequest) {
  try {
    const body: ReservationSubmission = await req.json();

    // Input Validation
    if (!body.name || !body.email || !body.date || !body.time) {
      return NextResponse.json(
        { error: "Missing required fields (name, email, date, time)." },
        { status: 400 }
      );
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Invalid email address format." },
        { status: 400 }
      );
    }

    const reservationRecord = {
      id: `RES-${Date.now().toString(36).toUpperCase()}`,
      ...body,
      receivedAt: new Date().toISOString(),
      status: "pending_confirmation",
    };

    const webhookUrl = process.env.N8N_RESERVATION_WEBHOOK_URL;
    let n8nDispatched = false;

    if (webhookUrl) {
      try {
        const n8nRes = await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "User-Agent": "EmberAndOak-NextAPI/1.0",
          },
          body: JSON.stringify(reservationRecord),
        });

        if (n8nRes.ok) {
          n8nDispatched = true;
        } else {
          console.warn(`[n8n] Reservation webhook responded with status ${n8nRes.status}`);
        }
      } catch (webhookErr) {
        console.error("[n8n] Failed to reach reservation webhook:", webhookErr);
      }
    } else {
      console.info("[n8n] N8N_RESERVATION_WEBHOOK_URL not configured. Reservation logged locally.");
    }

    return NextResponse.json(
      {
        success: true,
        id: reservationRecord.id,
        message:
          "Your reservation request has been received. Our floor manager will review table allocations and dispatch your confirmation email shortly.",
        n8nDispatched,
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    console.error("[API/Reservations Error]", err);
    return NextResponse.json(
      { error: "Internal server error processing reservation." },
      { status: 500 }
    );
  }
}
