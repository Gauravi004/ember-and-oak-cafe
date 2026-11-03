"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { EventEnquirySubmission } from "@/types";

export default function EventEnquiryForm() {
  const [formData, setFormData] = useState<EventEnquirySubmission>({
    name: "",
    email: "",
    phone: "",
    eventType: "private-cupping",
    estimatedGuests: 12,
    preferredDate: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationData, setConfirmationData] = useState<{ id?: string; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit event enquiry.");
      }

      setStatus("success");
      setConfirmationData({
        id: data.id || "EVT-RECEIVED",
        message: data.message,
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "An error occurred submitting inquiry.";
      setErrorMessage(msg);
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 bg-[#17120F] border border-[#B97845] text-[#F3EBDD] text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#B97845]/20 flex items-center justify-center text-[#B97845]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display text-3xl">Event Enquiry Dispatched</h3>
        <p className="text-xs sm:text-sm font-sans text-[#F3EBDD]/80 max-w-md mx-auto leading-relaxed">
          {confirmationData?.message || "Thank you. Our hospitality director will review your event request and contact you within 24 hours."}
        </p>
        <div className="text-xs font-mono text-[#F3EBDD]/50 pt-2 border-t border-[#F3EBDD]/10">
          Enquiry ID: {confirmationData?.id || "EVT-CONFIRMED"}
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              phone: "",
              eventType: "private-cupping",
              estimatedGuests: 12,
              preferredDate: "",
              message: "",
            });
          }}
          className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest font-mono bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] transition-colors"
        >
          Send Another Inquiry
        </button>
      </div>
    );
  }

  const inputClasses =
    "w-full bg-[#17120F] border border-[#F3EBDD]/15 p-3 text-xs text-[#F3EBDD] focus:outline-none focus:border-[#B97845]";
  const labelClasses =
    "block text-[11px] uppercase tracking-widest text-[#F3EBDD]/70 font-mono mb-1.5";

  return (
    <form onSubmit={handleSubmit} className="space-y-4 font-sans">
      {status === "error" && (
        <div className="p-3 bg-red-950/40 border border-red-500/50 text-red-300 text-xs flex items-center space-x-2">
          <AlertCircle className="w-4 h-4 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="evt-name" className={labelClasses}>
            Your Name *
          </label>
          <input
            id="evt-name"
            type="text"
            required
            placeholder="Clara Sterling"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="evt-email" className={labelClasses}>
            Email Address *
          </label>
          <input
            id="evt-email"
            type="email"
            required
            placeholder="clara@agency.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="evt-phone" className={labelClasses}>
            Phone *
          </label>
          <input
            id="evt-phone"
            type="tel"
            required
            placeholder="+44 7946 000000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="evt-type" className={labelClasses}>
            Event Type *
          </label>
          <select
            id="evt-type"
            value={formData.eventType}
            onChange={(e) => setFormData({ ...formData, eventType: e.target.value as EventEnquirySubmission["eventType"] })}
            className={inputClasses}
          >
            <option value="private-cupping">Private Origin Cupping</option>
            <option value="corporate">Corporate Coffee Immersion</option>
            <option value="oak-hour">Private Oak Hour / Reception</option>
            <option value="custom">Editorial Shoot / Filming</option>
          </select>
        </div>

        <div>
          <label htmlFor="evt-guests" className={labelClasses}>
            Estimated Guests *
          </label>
          <input
            id="evt-guests"
            type="number"
            min={4}
            max={65}
            required
            value={formData.estimatedGuests}
            onChange={(e) => setFormData({ ...formData, estimatedGuests: parseInt(e.target.value, 10) || 1 })}
            className={inputClasses}
          />
        </div>
      </div>

      <div>
        <label htmlFor="evt-date" className={labelClasses}>
          Preferred Date or Timeframe
        </label>
        <input
          id="evt-date"
          type="text"
          placeholder="e.g. Mid-November, Thursday evening, or specific date"
          value={formData.preferredDate}
          onChange={(e) => setFormData({ ...formData, preferredDate: e.target.value })}
          className={inputClasses}
        />
      </div>

      <div>
        <label htmlFor="evt-msg" className={labelClasses}>
          Event Overview &amp; Special Requests *
        </label>
        <textarea
          id="evt-msg"
          rows={3}
          required
          placeholder="Describe your event format, catering desires, coffee flight requirements..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] font-semibold text-xs uppercase tracking-[0.22em] transition-colors flex items-center justify-center space-x-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting Enquiry...</span>
          </>
        ) : (
          <span>Submit Event Booking Request</span>
        )}
      </button>
    </form>
  );
}
