"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ReservationSubmission } from "@/types";

export default function ReservationForm({ darkTheme = false }: { darkTheme?: boolean }) {
  const [formData, setFormData] = useState<ReservationSubmission>({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "10:00",
    guests: 2,
    seatingPreference: "main-hall",
    specialRequests: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [confirmationData, setConfirmationData] = useState<{ id?: string; message?: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    // Basic client validation
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      setStatus("error");
      setErrorMessage("Please complete all required fields (Name, Email, Date, Time).");
      return;
    }

    try {
      const response = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Unable to submit reservation request.");
      }

      setStatus("success");
      setConfirmationData({
        id: data.id || "RES-CONFIRMED",
        message: data.message,
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "An unexpected network error occurred.";
      setErrorMessage(msg);
    }
  };

  if (status === "success") {
    return (
      <div className={`p-8 border ${darkTheme ? "bg-[#17120F] border-[#B97845] text-[#F3EBDD]" : "bg-white border-[#B97845] text-[#17120F]"} shadow-xl text-center space-y-4`}>
        <div className="w-12 h-12 mx-auto rounded-full bg-[#B97845]/15 flex items-center justify-center text-[#B97845]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display text-3xl">Reservation Request Received</h3>
        <p className="text-xs sm:text-sm font-sans opacity-80 max-w-md mx-auto leading-relaxed">
          {confirmationData?.message || "Thank you. Your reservation request has been registered and forwarded to the roastery floor."}
        </p>
        <div className="text-xs font-mono opacity-60 pt-2 border-t border-current/10">
          Booking Reference: {confirmationData?.id || "RES-REGISTERED"} • {formData.date} at {formData.time} ({formData.guests} Guests)
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              phone: "",
              date: "",
              time: "10:00",
              guests: 2,
              seatingPreference: "main-hall",
              specialRequests: "",
            });
          }}
          className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest font-mono bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] transition-colors"
        >
          Book Another Table
        </button>
      </div>
    );
  }

  const inputClasses = darkTheme
    ? "w-full bg-[#231C16] border border-[#F3EBDD]/15 p-3 text-xs text-[#F3EBDD] focus:outline-none focus:border-[#B97845]"
    : "w-full bg-[#F3EBDD]/50 border border-[#17120F]/20 p-3 text-xs text-[#17120F] focus:outline-none focus:border-[#B97845]";

  const labelClasses = darkTheme
    ? "block text-[11px] uppercase tracking-widest text-[#F3EBDD]/70 font-mono mb-1.5"
    : "block text-[11px] uppercase tracking-widest text-[#17120F]/70 font-mono mb-1.5";

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
          <label htmlFor="res-name" className={labelClasses}>
            Full Name *
          </label>
          <input
            id="res-name"
            type="text"
            required
            placeholder="Julian Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="res-email" className={labelClasses}>
            Email Address *
          </label>
          <input
            id="res-email"
            type="email"
            required
            placeholder="julian@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label htmlFor="res-phone" className={labelClasses}>
            Phone *
          </label>
          <input
            id="res-phone"
            type="tel"
            required
            placeholder="+44 7946 000000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="res-date" className={labelClasses}>
            Date *
          </label>
          <input
            id="res-date"
            type="date"
            required
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="res-time" className={labelClasses}>
            Time *
          </label>
          <select
            id="res-time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            className={inputClasses}
          >
            <option value="08:30">08:30 AM (Morning Pour)</option>
            <option value="10:00">10:00 AM (Roastery Cupping)</option>
            <option value="12:00">12:00 PM (Midday Brew)</option>
            <option value="14:30">02:30 PM (Filter Extraction)</option>
            <option value="16:00">04:00 PM (Late Roast Flight)</option>
            <option value="18:30">06:30 PM (Oak Hour Vinyl)</option>
            <option value="20:00">08:00 PM (Oak Hour Vinyl)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="res-guests" className={labelClasses}>
            Guests *
          </label>
          <select
            id="res-guests"
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value, 10) })}
            className={inputClasses}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "Guest" : "Guests"}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="res-seating" className={labelClasses}>
            Seating Preference
          </label>
          <select
            id="res-seating"
            value={formData.seatingPreference}
            onChange={(e) => setFormData({ ...formData, seatingPreference: e.target.value as ReservationSubmission["seatingPreference"] })}
            className={inputClasses}
          >
            <option value="main-hall">Main Timber Hall</option>
            <option value="bar">Zinc Roastery Brew Bar</option>
            <option value="cellar-table">Oak Barrel Vault</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="res-notes" className={labelClasses}>
          Special Requests or Dietary Notes (Optional)
        </label>
        <textarea
          id="res-notes"
          rows={2}
          placeholder="Origin preference, dairy allergies, celebration details..."
          value={formData.specialRequests}
          onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
          className={inputClasses}
        />
      </div>

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full py-4 bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] font-semibold text-xs uppercase tracking-[0.22em] transition-colors duration-300 flex items-center justify-center space-x-2"
      >
        {status === "submitting" ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Transmitting to Roastery API...</span>
          </>
        ) : (
          <span>Confirm Table Reservation Request</span>
        )}
      </button>

      <p className={`text-[10px] text-center font-mono opacity-60 ${darkTheme ? "text-[#F3EBDD]" : "text-[#17120F]"}`}>
        Submissions route securely to Next.js backend &amp; n8n workflow. Realtime confirmation delivered upon review.
      </p>
    </form>
  );
}
