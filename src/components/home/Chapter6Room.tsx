"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Coffee, Armchair, BookOpen, Warehouse } from "lucide-react";

const ROOM_ZONES = [
  {
    id: "bar",
    title: "The Zinc Brew Bar",
    tagline: "Precision Extraction in Morning Light",
    icon: Coffee,
    description:
      "A 9-meter continuous poured-concrete counter lined with aged zinc and copper accents. Watch the baristas dial in the daily brew on our customized Synesso MVP and ceramic Kalita Wave drippers.",
    details: "14 bar stools • Single-origin espresso flights • Morning papers",
  },
  {
    id: "mezzanine",
    title: "The Roastery Mezzanine",
    tagline: "Direct View of the San Franciscan Drum",
    icon: Warehouse,
    description:
      "Elevated above the main hall, this gallery overlooks the cast-iron roasting drum and cooling tray. Roasted beans are weighed, rested, and hand-packed directly before your eyes.",
    details: "Overlooking 12kg roaster • Cupping table • Green bean jute sacks",
  },
  {
    id: "nook",
    title: "The Fireplace Reading Library",
    tagline: "Low Light, Warm Timber & Analog Silence",
    icon: BookOpen,
    description:
      "Nestled against original 19th-century brickwork, surrounded by curated monographs on architecture, origin agriculture, and Japanese design. Heated by an open hearth.",
    details: "Restored leather lounge chairs • Quiet reading policy • No phone calls",
  },
  {
    id: "vault",
    title: "The Oak Cellar & Listening Room",
    tagline: "Where the Coffee Rests and Vinyl Plays",
    icon: Armchair,
    description:
      "Down a short flight of slate stairs lies our oak barrel aging vault. During evening Oak Hours, this subterranean space transforms into a warm listening lounge.",
    details: "Charred oak cask heads • Analog McIntosh sound • Smoked cold brew",
  },
];

export default function Chapter6Room() {
  const [activeZone, setActiveZone] = useState(0);

  const currentZone = ROOM_ZONES[activeZone];

  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] border-t border-[#F3EBDD]/10 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Chapter Index */}
        <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#B97845] font-sans pb-8 border-b border-[#F3EBDD]/10">
          <span>Chapter VI</span>
          <span className="w-8 h-[1px] bg-[#B97845]/40" />
          <span>The Room &amp; Architecture</span>
        </div>

        {/* Editorial Heading */}
        <div className="py-12 max-w-4xl space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono">
            Spatial Architecture
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-[#F3EBDD]">
            Built with charred timber, cold zinc, and morning quiet.
          </h2>
        </div>

        {/* Room Showcase: Interactive Space Selector & Immersive Visual Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Main Visual Frame with Smooth Inset Reveal */}
          <div className="lg:col-span-7 relative aspect-[16/10] bg-[#0E0B09] border border-[#F3EBDD]/20 overflow-hidden shadow-2xl group">
            <Image
              src="/images/hero-poster.webp"
              alt="Ember and Oak interior architecture with timber beams and roastery atmosphere"
              fill
              className="object-cover transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            {/* Ambient Lighting Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#17120F] via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
              <div>
                <span className="text-[10px] tracking-[0.25em] uppercase text-[#B97845] font-mono block">
                  Current View
                </span>
                <span className="font-display text-2xl text-[#F3EBDD] block">
                  {currentZone.title}
                </span>
              </div>
              <span className="text-[10px] font-mono text-[#F3EBDD]/60 uppercase tracking-widest hidden sm:inline">
                18 Ironworks Lane
              </span>
            </div>
          </div>

          {/* Zone Selector and Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-2">
              {ROOM_ZONES.map((zone, idx) => {
                const ZoneIcon = zone.icon;
                const isActive = activeZone === idx;
                return (
                  <button
                    key={zone.id}
                    type="button"
                    onClick={() => setActiveZone(idx)}
                    className={`w-full text-left p-4 transition-all duration-300 border ${
                      isActive
                        ? "bg-[#231C16] border-[#B97845] text-[#F3EBDD]"
                        : "bg-transparent border-[#F3EBDD]/10 text-[#F3EBDD]/60 hover:border-[#F3EBDD]/30 hover:text-[#F3EBDD]"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <ZoneIcon
                          className={`w-4 h-4 ${
                            isActive ? "text-[#B97845]" : "text-[#F3EBDD]/40"
                          }`}
                        />
                        <span className="font-display text-lg tracking-wide">
                          {zone.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-[#B97845]">
                        0{idx + 1}
                      </span>
                    </div>

                    {isActive && (
                      <div className="mt-3 pt-3 border-t border-[#F3EBDD]/10 space-y-2 text-xs font-sans text-[#F3EBDD]/80 animate-in fade-in duration-300">
                        <p className="font-medium text-[#B97845]">
                          {zone.tagline}
                        </p>
                        <p className="leading-relaxed">{zone.description}</p>
                        <p className="text-[11px] text-[#F3EBDD]/50 font-mono pt-1">
                          {zone.details}
                        </p>
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-2 text-xs text-[#F3EBDD]/50 font-sans tracking-wide">
              Designed for silence, conversation, and the unhurried cup. Free
              from commercial music and loud machinery.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
