"use client";

import React, { useEffect, useRef } from "react";
import { initGSAP, isReducedMotion } from "@/lib/gsap";
import { CAFE_CONFIG } from "@/data/cafe-config";
import { Flame, Clock, Mountain } from "lucide-react";

export default function Chapter2Philosophy() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = initGSAP();
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        textRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: false,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="statement"
      ref={sectionRef}
      className="relative py-28 sm:py-36 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] border-t border-[#F3EBDD]/10 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Index Marker */}
        <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#B97845] font-sans pb-8 border-b border-[#F3EBDD]/10">
          <span>Chapter II</span>
          <span className="w-8 h-[1px] bg-[#B97845]/40" />
          <span>The Slow Statement</span>
        </div>

        {/* Big Editorial Quote */}
        <div ref={textRef} className="py-16 sm:py-24 max-w-5xl">
          <h2 className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[1.05] text-[#F3EBDD] font-normal">
            &ldquo;We do not rush what <span className="italic text-[#B97845]">fire</span> must teach, nor shorten what{" "}
            <span className="italic text-[#F3EBDD]/80">oak</span> must finish.&rdquo;
          </h2>
        </div>

        {/* 12-Column Editorial Grid: Philosophy Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pt-8 border-t border-[#F3EBDD]/10">
          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono block">
              01 / The Origin
            </span>
            <div className="flex items-center space-x-3 text-xl font-display text-[#F3EBDD]">
              <Mountain className="w-5 h-5 text-[#B97845]" />
              <h3>High-Elevation Sourcing</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed">
              We contract directly with smallholder producers above 1,800 meters
              in Huila, Antigua, and Yirgacheffe. Slower fruit maturation yields
              dense, sugar-saturated seeds built to withstand cast-iron heat.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono block">
              02 / The Flame
            </span>
            <div className="flex items-center space-x-3 text-xl font-display text-[#F3EBDD]">
              <Flame className="w-5 h-5 text-[#B97845]" />
              <h3>12kg Cast-Iron Batches</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed">
              Industrial roasters churn hundreds of kilos per cycle, scorching
              delicate acids. We roast strictly in 12kg charges on heavy iron
              drums, reading thermal inertia second by second to hit peak sweetness.
            </p>
          </div>

          <div className="md:col-span-4 space-y-4">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono block">
              03 / The Rest
            </span>
            <div className="flex items-center space-x-3 text-xl font-display text-[#F3EBDD]">
              <Clock className="w-5 h-5 text-[#B97845]" />
              <h3>72 Hours in Oak</h3>
            </div>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed">
              Freshly roasted coffee needs resting. We rest select micro-lots
              inside charred French Oak barrel heads, allowing wood vanillins and
              tannins to soften harsh carbon edges into silk.
            </p>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="mt-16 pt-12 border-t border-[#F3EBDD]/10 grid grid-cols-2 md:grid-cols-4 gap-6">
          {CAFE_CONFIG.stats.map((stat, i) => (
            <div key={i} className="space-y-1">
              <span className="font-display text-4xl sm:text-5xl text-[#B97845] block">
                {stat.value}
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#F3EBDD] block">
                {stat.label}
              </span>
              <span className="text-[11px] text-[#F3EBDD]/50 font-sans block">
                {stat.detail}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
