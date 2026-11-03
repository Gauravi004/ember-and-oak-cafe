"use client";

import React from "react";
import ReservationForm from "@/components/forms/ReservationForm";
import { CAFE_CONFIG } from "@/data/cafe-config";
import { MapPin, Clock, Phone, Mail, Navigation } from "lucide-react";

export default function Chapter8Reserve() {
  return (
    <section
      id="reserve"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#F3EBDD] text-[#17120F] border-t border-[#17120F]/15 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Chapter Index */}
        <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#B97845] font-sans pb-8 border-b border-[#17120F]/15">
          <span>Chapter VIII</span>
          <span className="w-8 h-[1px] bg-[#B97845]/40" />
          <span>Reserve &amp; Visit</span>
        </div>

        {/* Section Heading */}
        <div className="py-12 max-w-4xl space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono">
            Table &amp; Cupping Bookings
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-[#17120F]">
            Take a seat where the fire was lit.
          </h2>
          <p className="text-xs sm:text-sm text-[#17120F]/70 font-sans max-w-xl leading-relaxed">
            Walk-ins are always welcomed at our brew bar. For weekend origin
            cuppings, evening Oak Hour flights, and groups of four or more, we
            recommend reserving ahead.
          </p>
        </div>

        {/* Main Grid: Form & Location Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start pt-6">
          {/* Reservation Form Column */}
          <div className="lg:col-span-7 bg-[#EFE5D3] p-6 sm:p-8 border border-[#17120F]/15 shadow-sm">
            <div className="border-b border-[#17120F]/15 pb-4 mb-6">
              <h3 className="font-display text-2xl text-[#17120F]">
                Reserve Your Experience
              </h3>
              <p className="text-xs text-[#17120F]/60 mt-1">
                Select your desired date, session time, and seating preference.
              </p>
            </div>
            <ReservationForm darkTheme={false} />
          </div>

          {/* Visit & Map Information Column */}
          <div className="lg:col-span-5 space-y-8">
            {/* Location Card */}
            <div className="p-6 sm:p-8 bg-[#17120F] text-[#F3EBDD] space-y-6 shadow-xl border border-[#B97845]/30">
              <div className="space-y-1">
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#B97845] font-mono">
                  Roastery Headquarters
                </span>
                <h4 className="font-display text-2xl sm:text-3xl text-[#F3EBDD]">
                  The Foundry Quarter
                </h4>
              </div>

              <div className="space-y-4 text-xs font-sans text-[#F3EBDD]/80 border-t border-[#F3EBDD]/10 pt-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#F3EBDD]">
                      {CAFE_CONFIG.contact.address.street}
                    </p>
                    <p>
                      {CAFE_CONFIG.contact.address.city},{" "}
                      {CAFE_CONFIG.contact.address.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Navigation className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[#B97845] font-medium">Transit Access</p>
                    <p className="text-[11px] text-[#F3EBDD]/60">
                      {CAFE_CONFIG.contact.address.transit}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-medium text-[#F3EBDD]">Daily Hours</p>
                    <p className="text-[11px] text-[#F3EBDD]/60">
                      Mon — Fri: 07:00 — 17:30
                    </p>
                    <p className="text-[11px] text-[#F3EBDD]/60">
                      Sat — Sun: 08:00 — 18:30
                    </p>
                    <p className="text-[11px] text-[#B97845]">
                      Thu &amp; Fri: Oak Hour 18:00 — 22:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#F3EBDD]">Telephone</p>
                    <p className="text-[11px] text-[#F3EBDD]/60 font-mono">
                      {CAFE_CONFIG.contact.phone}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-[#F3EBDD]">Direct Inquiries</p>
                    <p className="text-[11px] text-[#F3EBDD]/60 font-mono">
                      {CAFE_CONFIG.contact.email}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quiet Hospitality Note */}
            <div className="p-6 bg-[#EFE5D3] border border-[#17120F]/15 space-y-2">
              <h5 className="font-display text-lg text-[#17120F]">
                Quiet Roastery Etiquette
              </h5>
              <p className="text-xs text-[#17120F]/70 font-sans leading-relaxed">
                We craft our spaces for sensory focus. We do not pipe commercial
                radio, and we kindly ask visitors to take voice calls outside our
                tasting room.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
