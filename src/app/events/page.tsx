import React from "react";
import Link from "next/link";
import EventEnquiryForm from "@/components/forms/EventEnquiryForm";
import { EVENTS_DATA } from "@/data/events-data";

export default function EventsPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumbs */}
        <div className="border-b border-[#F3EBDD]/15 pb-8">
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#B97845] font-mono mb-4">
            <Link href="/" className="hover:underline">
              Roastery
            </Link>
            <span>/</span>
            <span>Events &amp; Private Bookings</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3EBDD] leading-[1.05]">
            Cuppings, Analog Vinyl &amp; Private Hire
          </h1>
          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-2xl mt-4 leading-relaxed">
            Gather around the cooling tray on Saturday mornings, experience
            rare fermented micro-lots during evening Oak Hours, or book our
            entire roastery mezzanine for private immersions.
          </p>
        </div>

        {/* Public Sessions Schedule */}
        <div className="py-12 space-y-8">
          <div className="space-y-2">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B97845]">
              Demonstration Program
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F3EBDD]">
              Scheduled Public Tastings
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {EVENTS_DATA.map((evt) => (
              <div
                key={evt.id}
                className="p-8 bg-[#231C16] border border-[#F3EBDD]/10 hover:border-[#B97845]/50 transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-[#B97845] uppercase tracking-widest border-b border-[#F3EBDD]/10 pb-3">
                    <span className="px-2 py-0.5 bg-[#B97845]/15 border border-[#B97845]/30">
                      {evt.tag}
                    </span>
                    <span>{evt.price}</span>
                  </div>

                  <h3 className="font-display text-2xl sm:text-3xl text-[#F3EBDD]">
                    {evt.title}
                  </h3>

                  <p className="text-xs text-[#B97845] font-medium tracking-wide">
                    {evt.subtitle}
                  </p>

                  <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed">
                    {evt.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#F3EBDD]/10 text-xs font-mono text-[#F3EBDD]/60 space-y-1">
                  <p className="text-[#F3EBDD] font-sans font-medium">
                    {evt.date} • {evt.time}
                  </p>
                  <p>
                    Capacity: {evt.capacity} seats • Led by {evt.host}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Private Event Hire & Form */}
        <div className="mt-12 pt-12 border-t border-[#F3EBDD]/15 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B97845]">
              Space Hire
            </span>
            <h2 className="font-display text-3xl sm:text-5xl text-[#F3EBDD] leading-tight">
              Hire the Roastery &amp; Oak Vault
            </h2>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/75 font-sans leading-relaxed">
              Our 19th-century foundry roastery offers 2,800 square feet of
              warm timber beams, poured concrete, and cast-iron machinery. We
              welcome:
            </p>

            <ul className="space-y-3 text-xs font-sans text-[#F3EBDD]/80">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#B97845]" />
                <span>Private origin cupping flights for executive teams (up to 20 guests)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#B97845]" />
                <span>Evening cocktail &amp; smoked coffee receptions (up to 60 guests)</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#B97845]" />
                <span>Editorial fashion, architecture &amp; culinary video productions</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 bg-[#B97845]" />
                <span>Bespoke catering by our artisan hearth bakery partners</span>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7 bg-[#231C16] p-6 sm:p-8 border border-[#F3EBDD]/15 shadow-2xl">
            <div className="border-b border-[#F3EBDD]/10 pb-4 mb-6">
              <h3 className="font-display text-2xl text-[#F3EBDD]">
                Private Hire Inquiry
              </h3>
              <p className="text-xs text-[#F3EBDD]/60 mt-1">
                Tell us about your event format and preferred dates.
              </p>
            </div>
            <EventEnquiryForm />
          </div>
        </div>
      </div>
    </div>
  );
}
