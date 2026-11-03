"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Search } from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu-data";

export default function MenuPage() {
  const [selectedCat, setSelectedCat] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = MENU_ITEMS.filter((item) => {
    const matchesCat = selectedCat === "all" || item.category === selectedCat;
    const query = searchQuery.toLowerCase();
    const matchesSearch =
      !searchQuery ||
      item.name.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      (item.origin && item.origin.toLowerCase().includes(query)) ||
      (item.tastingNotes && item.tastingNotes.some((n) => n.toLowerCase().includes(query)));

    return matchesCat && matchesSearch;
  });

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumb & Header */}
        <div className="border-b border-[#F3EBDD]/15 pb-8">
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#B97845] font-mono mb-4">
            <Link href="/" className="hover:underline">
              Roastery
            </Link>
            <span>/</span>
            <span>Menu &amp; Harvests</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3EBDD] leading-[1.05]">
            Specialty Menu &amp; Micro-Lots
          </h1>
          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-2xl mt-4 leading-relaxed">
            Every extraction is dialed in daily by refractometer and extracted
            at 9.2 bars on our Synesso MVP. Whole-bean 250g retail bags roasted in
            12kg batches are packaged fresh in nitrogen-flushed valves.
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-[#F3EBDD]/10">
          {/* Category Tabs */}
          <div className="flex overflow-x-auto gap-2 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedCat("all")}
              className={`text-[11px] uppercase tracking-[0.2em] font-mono px-4 py-2 border transition-colors whitespace-nowrap ${
                selectedCat === "all"
                  ? "bg-[#B97845] text-[#17120F] border-[#B97845] font-bold"
                  : "border-[#F3EBDD]/15 text-[#F3EBDD]/70 hover:border-[#F3EBDD]/40 hover:text-[#F3EBDD]"
              }`}
            >
              All Offerings ({MENU_ITEMS.length})
            </button>
            {MENU_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCat(cat.id)}
                className={`text-[11px] uppercase tracking-[0.2em] font-mono px-4 py-2 border transition-colors whitespace-nowrap ${
                  selectedCat === cat.id
                    ? "bg-[#B97845] text-[#17120F] border-[#B97845] font-bold"
                    : "border-[#F3EBDD]/15 text-[#F3EBDD]/70 hover:border-[#F3EBDD]/40 hover:text-[#F3EBDD]"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-[#F3EBDD]/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search origin, notes, brew..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#231C16] border border-[#F3EBDD]/15 pl-9 pr-3 py-2 text-xs text-[#F3EBDD] placeholder:text-[#F3EBDD]/40 focus:outline-none focus:border-[#B97845]"
            />
          </div>
        </div>

        {/* Menu Items Grid */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-6 sm:p-8 bg-[#17120F] border border-[#F3EBDD]/10 hover:border-[#B97845]/50 transition-all duration-300 flex flex-col justify-between space-y-6 group"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] tracking-widest uppercase font-mono text-[#B97845]">
                        {item.category}
                      </span>
                      {item.isSignature && (
                        <span className="px-2 py-0.5 text-[9px] uppercase tracking-widest font-mono bg-[#B97845]/15 text-[#B97845] border border-[#B97845]/30">
                          Signature
                        </span>
                      )}
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl text-[#F3EBDD] group-hover:text-[#B97845] transition-colors mt-1">
                      {item.name}
                    </h2>
                  </div>
                  <span className="font-display text-2xl text-[#F3EBDD]">
                    {item.price}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed">
                  {item.description}
                </p>

                {/* Sourcing & Terroir Specs */}
                {(item.origin || item.elevation || item.process) && (
                  <div className="pt-3 border-t border-[#F3EBDD]/10 grid grid-cols-2 gap-2 text-[11px] font-mono text-[#F3EBDD]/55">
                    {item.origin && (
                      <div>
                        <span className="text-[#B97845]">Origin: </span>
                        <span>{item.origin}</span>
                      </div>
                    )}
                    {item.elevation && (
                      <div>
                        <span className="text-[#B97845]">Elevation: </span>
                        <span>{item.elevation}</span>
                      </div>
                    )}
                    {item.process && (
                      <div>
                        <span className="text-[#B97845]">Process: </span>
                        <span>{item.process}</span>
                      </div>
                    )}
                    {item.variety && (
                      <div>
                        <span className="text-[#B97845]">Variety: </span>
                        <span>{item.variety}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Tasting Notes Chips */}
              {item.tastingNotes && item.tastingNotes.length > 0 && (
                <div className="pt-4 border-t border-[#F3EBDD]/10 flex flex-wrap gap-1.5">
                  {item.tastingNotes.map((note, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] uppercase font-mono px-2 py-1 bg-[#231C16] border border-[#F3EBDD]/10 text-[#F3EBDD]/80"
                    >
                      {note}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-20 text-center space-y-4">
            <p className="font-display text-3xl text-[#F3EBDD]/60">
              No matching harvests found.
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCat("all");
                setSearchQuery("");
              }}
              className="text-xs uppercase font-mono tracking-widest text-[#B97845] underline"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Retail Whole-Bean Coffee Feature */}
        <div className="mt-16 p-8 sm:p-12 bg-[#231C16] border border-[#B97845]/40 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3">
            <span className="text-xs uppercase font-mono tracking-[0.25em] text-[#B97845]">
              Home Extraction
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#F3EBDD]">
              Take The Roast Home in 250g Valves
            </h3>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-xl">
              All micro-batches are available whole-bean or precision-ground on
              our Mahlkönig EK43S for your brew method. Roasted within 7 days.
            </p>
          </div>

          <Link
            href="/contact?subject=wholesale"
            className="px-8 py-4 bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] font-semibold text-xs uppercase tracking-[0.2em] font-sans whitespace-nowrap transition-colors"
          >
            Inquire About Retail &amp; Subscriptions
          </Link>
        </div>
      </div>
    </div>
  );
}
