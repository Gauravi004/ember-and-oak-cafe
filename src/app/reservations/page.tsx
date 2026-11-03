import React from "react";
import Link from "next/link";
import ReservationForm from "@/components/forms/ReservationForm";
import { CAFE_CONFIG } from "@/data/cafe-config";
import { Users, Clock, Coffee } from "lucide-react";

export default function ReservationsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb Header */}
        <div className="border-b border-[#F3EBDD]/15 pb-8">
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#B97845] font-mono mb-4">
            <Link href="/" className="hover:underline">
              Roastery
            </Link>
            <span>/</span>
            <span>Table Reservations</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3EBDD] leading-[1.05]">
            Reserve Your Tasting Table
          </h1>
          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-2xl mt-4 leading-relaxed">
            We hold dedicated tables in our timber main hall, at the zinc brew
            bar, and in the subterranean oak cask vault. Walk-ins are always
            welcomed during daytime hours.
          </p>
        </div>

        {/* Form and Policies Grid */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Reservation Form Column */}
          <div className="lg:col-span-7 bg-[#231C16] p-6 sm:p-10 border border-[#F3EBDD]/15 shadow-2xl">
            <div className="border-b border-[#F3EBDD]/10 pb-4 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#B97845]">
                Direct Roastery Dispatch
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#F3EBDD] mt-1">
                Booking Information
              </h2>
            </div>
            <ReservationForm darkTheme={true} />
          </div>

          {/* Booking Policies & Guidelines */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 bg-[#0E0B09] border border-[#F3EBDD]/15 space-y-6">
              <h3 className="font-display text-2xl text-[#F3EBDD]">
                Reservation Guidelines
              </h3>

              <div className="space-y-4 text-xs font-sans text-[#F3EBDD]/75 leading-relaxed">
                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">
                      15-Minute Grace Period
                    </strong>
                    Tables are held for 15 minutes past your reserved time before
                    being released to waiting walk-in patrons.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Users className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">
                      Large Parties &amp; Groups
                    </strong>
                    For parties larger than 8 guests, please reach out via our
                    Events portal so we can allocate dedicated private seating.
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Coffee className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">
                      Tasting Flights &amp; Cuppings
                    </strong>
                    Saturday 10:00 AM public cuppings require pre-booking due to
                    strict 12-person capacity at the cupping table.
                  </div>
                </div>
              </div>
            </div>

            {/* Visit Details */}
            <div className="p-6 bg-[#231C16] border border-[#B97845]/30 space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B97845]">
                Location &amp; Inquiries
              </span>
              <p className="text-xs text-[#F3EBDD]/80">
                {CAFE_CONFIG.contact.address.street}, {CAFE_CONFIG.contact.address.city} {CAFE_CONFIG.contact.address.postcode}
              </p>
              <p className="text-xs font-mono text-[#F3EBDD]/60">
                Questions: {CAFE_CONFIG.contact.reservationsEmail}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
