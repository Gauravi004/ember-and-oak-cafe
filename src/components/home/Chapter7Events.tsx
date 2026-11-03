"use client";

import React from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, Users, Disc, CupSoda } from "lucide-react";
import { EVENTS_DATA } from "@/data/events-data";

export default function Chapter7Events() {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#0E0B09] text-[#F3EBDD] border-t border-[#F3EBDD]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Chapter Index */}
        <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#B97845] font-sans pb-8 border-b border-[#F3EBDD]/10">
          <span>Chapter VII</span>
          <span className="w-8 h-[1px] bg-[#B97845]/40" />
          <span>Evenings &amp; Gatherings</span>
        </div>

        {/* Editorial Heading & Subtitle */}
        <div className="py-12 max-w-4xl space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono">
            Sensory Programming
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-[#F3EBDD]">
            When the roast rests, the listening room awakens.
          </h2>
          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-xl leading-relaxed">
            From Saturday origin cuppings around the cooling tray to our
            candlelit Thursday &amp; Friday Oak Hours. Fictional demonstration
            schedule for intimate private bookings and public sensory sessions.
          </p>
        </div>

        {/* Editorial Event Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
          {EVENTS_DATA.map((event) => (
            <div
              key={event.id}
              className="p-8 bg-[#17120F] border border-[#F3EBDD]/10 hover:border-[#B97845]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-[11px] font-mono text-[#B97845] uppercase tracking-widest border-b border-[#F3EBDD]/10 pb-3">
                  <div className="flex items-center space-x-2">
                    {event.tag === "cupping" && <CupSoda className="w-3.5 h-3.5" />}
                    {event.tag === "social" && <Disc className="w-3.5 h-3.5" />}
                    {event.tag === "tasting" && <Calendar className="w-3.5 h-3.5" />}
                    {event.tag === "masterclass" && <Users className="w-3.5 h-3.5" />}
                    <span>{event.tag}</span>
                  </div>
                  <span>{event.price}</span>
                </div>

                <h3 className="font-display text-2xl sm:text-3xl text-[#F3EBDD] group-hover:text-[#B97845] transition-colors leading-snug">
                  {event.title}
                </h3>

                <p className="text-xs text-[#B97845] font-medium tracking-wide">
                  {event.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed">
                  {event.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#F3EBDD]/10 flex flex-col sm:flex-row sm:items-center justify-between text-xs text-[#F3EBDD]/60 gap-3">
                <div className="space-y-0.5">
                  <span className="block font-medium text-[#F3EBDD]">
                    {event.date}
                  </span>
                  <span className="text-[11px] text-[#F3EBDD]/45 font-mono">
                    {event.time} • Host: {event.host}
                  </span>
                </div>

                <Link
                  href="/events"
                  className="inline-flex items-center space-x-1.5 text-[11px] uppercase tracking-[0.2em] font-mono text-[#B97845] hover:text-[#d48b52] font-semibold"
                >
                  <span>Enquire / Reserve</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Private Event Hire Banner */}
        <div className="mt-12 p-8 border border-[#B97845]/30 bg-[#231C16]/50 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2">
            <h4 className="font-display text-2xl text-[#F3EBDD]">
              Private Roastery Hire &amp; Group Immersions
            </h4>
            <p className="text-xs text-[#F3EBDD]/70 font-sans max-w-xl">
              Host private coffee cuppings, editorial video shoots, or evening
              receptions for up to 60 guests surrounded by oak barrels and cast
              iron.
            </p>
          </div>
          <Link
            href="/events"
            className="px-6 py-3 border border-[#B97845] text-[#F3EBDD] hover:bg-[#B97845] hover:text-[#17120F] text-xs uppercase tracking-[0.2em] font-sans font-medium whitespace-nowrap transition-colors"
          >
            Private Event Enquiry
          </Link>
        </div>
      </div>
    </section>
  );
}
