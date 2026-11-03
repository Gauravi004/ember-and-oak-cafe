"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { ContactSubmission } from "@/types";

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactSubmission>({
    name: "",
    email: "",
    phone: "",
    subject: "general",
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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to dispatch message.");
      }

      setStatus("success");
      setConfirmationData({
        id: data.id || "CNT-RECEIVED",
        message: data.message,
      });
    } catch (err: unknown) {
      setStatus("error");
      const msg = err instanceof Error ? err.message : "An error occurred sending message.";
      setErrorMessage(msg);
    }
  };

  if (status === "success") {
    return (
      <div className="p-8 bg-[#17120F] border border-[#B97845] text-[#F3EBDD] text-center space-y-4">
        <div className="w-12 h-12 mx-auto rounded-full bg-[#B97845]/20 flex items-center justify-center text-[#B97845]">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="font-display text-3xl">Message Transmitted</h3>
        <p className="text-xs sm:text-sm font-sans text-[#F3EBDD]/80 max-w-md mx-auto leading-relaxed">
          {confirmationData?.message || "Thank you. Our team will review your message and reply promptly."}
        </p>
        <div className="text-xs font-mono text-[#F3EBDD]/50 pt-2 border-t border-[#F3EBDD]/10">
          Tracking ID: {confirmationData?.id || "CNT-CONFIRMED"}
        </div>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setFormData({
              name: "",
              email: "",
              phone: "",
              subject: "general",
              message: "",
            });
          }}
          className="mt-4 px-6 py-2.5 text-xs uppercase tracking-widest font-mono bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] transition-colors"
        >
          Send Another Message
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
          <label htmlFor="cnt-name" className={labelClasses}>
            Full Name *
          </label>
          <input
            id="cnt-name"
            type="text"
            required
            placeholder="Julian Vance"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="cnt-email" className={labelClasses}>
            Email Address *
          </label>
          <input
            id="cnt-email"
            type="email"
            required
            placeholder="julian@example.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className={inputClasses}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="cnt-phone" className={labelClasses}>
            Phone (Optional)
          </label>
          <input
            id="cnt-phone"
            type="tel"
            placeholder="+44 7946 000000"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className={inputClasses}
          />
        </div>

        <div>
          <label htmlFor="cnt-subject" className={labelClasses}>
            Inquiry Department *
          </label>
          <select
            id="cnt-subject"
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value as ContactSubmission["subject"] })}
            className={inputClasses}
          >
            <option value="general">General Roastery Inquiries</option>
            <option value="wholesale">Wholesale &amp; Specialty Partners</option>
            <option value="press">Press, Editorial &amp; Media</option>
            <option value="events">Private Hire &amp; Cuppings</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cnt-msg" className={labelClasses}>
          Your Message *
        </label>
        <textarea
          id="cnt-msg"
          rows={4}
          required
          placeholder="How may our roasters assist you?"
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
            <span>Transmitting to Roastery Team...</span>
          </>
        ) : (
          <span>Dispatch Inquiries</span>
        )}
      </button>
    </form>
  );
}
