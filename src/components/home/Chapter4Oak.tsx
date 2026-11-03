"use client";

import React from "react";
import Image from "next/image";
import { CAFE_CONFIG } from "@/data/cafe-config";
import { Trees, Timer, Sparkles } from "lucide-react";

export default function Chapter4Oak() {
  return (
    <section className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#3B3A2D] text-[#F3EBDD] overflow-hidden">
      {/* Background Subtle Gradient & Grain */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#17120F]/40 via-transparent to-[#17120F]/40 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Chapter Index */}
        <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#F3EBDD]/70 font-sans pb-8 border-b border-[#F3EBDD]/15">
          <span>Chapter IV</span>
          <span className="w-8 h-[1px] bg-[#F3EBDD]/30" />
          <span>The Oak Cellar</span>
        </div>

        {/* Editorial Heading */}
        <div className="py-12 max-w-4xl space-y-4">
          <p className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono">
            Wood, Tannins &amp; Time
          </p>
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl leading-[1.08] text-[#F3EBDD]">
            Seventy-two hours of quiet maturation inside charred French casks.
          </h2>
        </div>

        {/* Grid: Cinematic Visual & Process Anatomy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center pt-6">
          {/* Cellar Showcase Frame */}
          <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-video bg-[#17120F] border border-[#F3EBDD]/20 overflow-hidden shadow-2xl group">
            <Image
              src="/images/hero-poster.webp"
              alt="Charred oak casks and maturation cellar barrels"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105 filter brightness-90"
              sizes="(max-width: 1024px) 100vw, 60vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#17120F]/90 via-[#17120F]/30 to-transparent" />
            <div className="absolute bottom-4 left-4 bg-[#17120F]/85 border border-[#F3EBDD]/15 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono text-[#F3EBDD]/80">
              Cellar Vault B • Cask Head Rest
            </div>
          </div>

          {/* Oak Maturation Narrative */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <h3 className="font-display text-2xl sm:text-3xl text-[#F3EBDD]">
                Why We Rest Coffee in Oak
              </h3>
              <p className="text-xs sm:text-sm text-[#F3EBDD]/80 leading-relaxed font-sans">
                Commercial roasters rush beans into foil bags seconds after
                cooling, trapping aggressive carbon dioxide and harsh citric
                peaks. At Ember &amp; Oak, select single origins rest for three
                full days inside charred French oak barrels.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-6 border-t border-[#F3EBDD]/15 pt-6">
              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-none border border-[#F3EBDD]/30 flex items-center justify-center flex-shrink-0 bg-[#231C16]/50">
                  <Timer className="w-4 h-4 text-[#B97845]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F3EBDD]">
                    72-Hour Carbon Discharge
                  </h4>
                  <p className="text-xs text-[#F3EBDD]/70 mt-1 leading-normal">
                    Wood pores breathe, allowing volatile organic gasses to
                    stabilize gradually without oxidizing natural lipids.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-none border border-[#F3EBDD]/30 flex items-center justify-center flex-shrink-0 bg-[#231C16]/50">
                  <Trees className="w-4 h-4 text-[#B97845]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F3EBDD]">
                    Charred Tannin Infusion
                  </h4>
                  <p className="text-xs text-[#F3EBDD]/70 mt-1 leading-normal">
                    Toasted oak heads release trace vanillin, rounding off
                    sharp acidity and contributing a bourbon-like caramel depth.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-8 h-8 rounded-none border border-[#F3EBDD]/30 flex items-center justify-center flex-shrink-0 bg-[#231C16]/50">
                  <Sparkles className="w-4 h-4 text-[#B97845]" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold tracking-wider uppercase text-[#F3EBDD]">
                    Strict 12kg Cellar Batches
                  </h4>
                  <p className="text-xs text-[#F3EBDD]/70 mt-1 leading-normal">
                    Every cask is numbered and catalogued by harvest, lot
                    elevation, and roasting degree.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-2 text-[10px] tracking-[0.25em] uppercase text-[#F3EBDD]/50 font-mono">
              {CAFE_CONFIG.brand.batchSize} • {CAFE_CONFIG.brand.caskRestDuration}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
