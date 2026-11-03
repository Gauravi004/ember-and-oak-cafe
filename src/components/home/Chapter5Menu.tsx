"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu-data";

export default function Chapter5Menu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("espresso");

  const filteredItems = MENU_ITEMS.filter(
    (item) => item.category === selectedCategory
  );

  const activeCategoryMeta = MENU_CATEGORIES.find(
    (c) => c.id === selectedCategory
  );

  return (
    <section
      id="menu"
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#F3EBDD] text-[#17120F] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-8 border-b border-[#17120F]/15 gap-4">
          <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#B97845] font-sans">
            <span>Chapter V</span>
            <span className="w-8 h-[1px] bg-[#B97845]/40" />
            <span>The Daily Menu</span>
          </div>

          <div className="text-xs text-[#17120F]/60 font-mono tracking-widest uppercase">
            Service: 07:00 — 17:30 Daily
          </div>
        </div>

        {/* Section Title & Visual Feature */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end py-12">
          <div className="lg:col-span-8 space-y-4">
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.05] text-[#17120F]">
              Poured with purpose. Balanced for the quiet palate.
            </h2>
            <p className="text-xs sm:text-sm text-[#17120F]/70 font-sans max-w-xl leading-relaxed">
              Every extraction is dialed in by weight and TDS refractometry.
              We roast exclusively in micro-batches and serve milk at a sweet,
              unscalded 62°C.
            </p>
          </div>

          {/* Milk Pour Video Featurette */}
          <div className="lg:col-span-4 relative aspect-[16/10] bg-[#17120F] overflow-hidden border border-[#17120F]/20 shadow-xl">
            <VideoPlayer
              src="/videos/milk-pour.mp4"
              poster="/images/hero-poster.webp"
              overlayOpacity={0.15}
              ariaLabel="Steamed Guernsey milk being poured slowly into a rich double espresso extraction creating precise latte art"
              className="w-full h-full"
            />
            <div className="absolute bottom-2.5 left-2.5 bg-[#17120F]/80 text-[#F3EBDD] text-[9px] font-mono tracking-widest uppercase px-2 py-1">
              Guernsey Milk 62°C • Microfoam
            </div>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="border-b border-[#17120F]/15 flex overflow-x-auto gap-4 sm:gap-8 pb-4 no-scrollbar">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`whitespace-nowrap pb-2 text-xs uppercase tracking-[0.2em] font-sans transition-all relative ${
                selectedCategory === cat.id
                  ? "text-[#17120F] font-bold"
                  : "text-[#17120F]/50 hover:text-[#17120F]"
              }`}
            >
              {cat.label}
              {selectedCategory === cat.id && (
                <span className="absolute bottom-[-17px] left-0 right-0 h-[2px] bg-[#B97845]" />
              )}
            </button>
          ))}
        </div>

        {/* Active Category Description */}
        {activeCategoryMeta && (
          <div className="py-6 text-xs text-[#17120F]/65 font-sans italic border-b border-[#17120F]/10">
            {activeCategoryMeta.description}
          </div>
        )}

        {/* Editorial Menu List (No Generic Cards) */}
        <div className="py-8 divide-y divide-[#17120F]/10">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="py-6 group transition-colors duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div className="flex items-center space-x-3">
                  <h3 className="font-display text-2xl sm:text-3xl text-[#17120F] group-hover:text-[#B97845] transition-colors">
                    {item.name}
                  </h3>
                  {item.isSignature && (
                    <span className="text-[10px] tracking-widest uppercase px-2 py-0.5 bg-[#B97845]/15 text-[#B97845] font-mono border border-[#B97845]/30">
                      Signature
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4">
                  <span className="font-display text-xl sm:text-2xl text-[#17120F]">
                    {item.price}
                  </span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#17120F]/70 font-sans mt-2 max-w-2xl leading-relaxed">
                {item.description}
              </p>

              {/* Tasting Notes & Origin Metadata */}
              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#17120F]/55 font-mono">
                {item.origin && <span>Origin: {item.origin}</span>}
                {item.process && <span>• Process: {item.process}</span>}
                {item.tastingNotes && item.tastingNotes.length > 0 && (
                  <span>
                    • Notes: {item.tastingNotes.join(", ")}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Menu Footer CTA */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between border-t border-[#17120F]/15 gap-4">
          <p className="text-xs text-[#17120F]/60 font-sans">
            Demonstration menu items and seasonal pricing. All coffee available whole-bean or freshly ground.
          </p>
          <Link
            href="/menu"
            className="inline-flex items-center space-x-2 text-xs tracking-[0.2em] uppercase font-sans font-semibold text-[#17120F] hover:text-[#B97845] transition-colors"
          >
            <span>View Full Tasting Menu &amp; Beans</span>
            <ArrowUpRight className="w-4 h-4 text-[#B97845]" />
          </Link>
        </div>
      </div>
    </section>
  );
}
