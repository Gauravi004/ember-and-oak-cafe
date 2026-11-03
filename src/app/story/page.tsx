import React from "react";
import Link from "next/link";
import { ArrowUpRight, Flame, Compass, Trees, Scale } from "lucide-react";
import { CAFE_CONFIG } from "@/data/cafe-config";

export default function StoryPage() {
  const steps = [
    {
      num: "01",
      title: "Direct Origin Trade",
      subtitle: "High-Altitude Volcanic Soil",
      icon: Compass,
      description:
        "We do not buy from commodity spot markets or brokers. Every green coffee lot is purchased through direct farmgate relationships across Colombia, Ethiopia, Guatemala, and Panama. We guarantee prices that sit comfortably 200% above the Fair Trade minimum to support multi-generational farming families.",
    },
    {
      num: "02",
      title: "Cast Iron Fire",
      subtitle: "12kg Micro-Batches at Dawn",
      icon: Flame,
      description:
        "Our roasting drum is a vintage-restored San Franciscan SF-25 cast-iron machine. Iron distributes heat uniformly through conduction and radiant convection, preventing the scorched bean faces common in high-volume industrial steel drums.",
    },
    {
      num: "03",
      title: "The Oak Cellar",
      subtitle: "72-Hour Cask Conditioning",
      icon: Trees,
      description:
        "Coffee is naturally porous and hygroscopic. Rather than packing it immediately into commercial foil, we rest our signature lots for 72 hours inside charred French Oak barrel heads. The wood mellows sharp citric acids, allowing sweet caramel and bourbon notes to emerge in the cup.",
    },
    {
      num: "04",
      title: "Measured Extraction",
      subtitle: "TDS, Flow Agitation & Mineralized Water",
      icon: Scale,
      description:
        "Water makes up 98.6% of your cup. Our water is remineralized through reverse osmosis to 130 ppm with optimal calcium and magnesium balances. We brew each origin at a precise 93.5°C with customized ceramic geometry to preserve floral aromatics.",
    },
  ];

  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumb */}
        <div className="border-b border-[#F3EBDD]/15 pb-8">
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#B97845] font-mono mb-4">
            <Link href="/" className="hover:underline">
              Roastery
            </Link>
            <span>/</span>
            <span>Our Story</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3EBDD] leading-[1.05]">
            The Journey From Fire to Table
          </h1>
          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-2xl mt-4 leading-relaxed">
            {CAFE_CONFIG.brand.concept} Founded in the Old Foundry Quarter to
            reject the rush of commercial coffee chains and return dignity to
            the roast.
          </p>
        </div>

        {/* Big Editorial Manifesto */}
        <div className="py-16 sm:py-24 max-w-4xl border-b border-[#F3EBDD]/10">
          <blockquote className="font-display text-3xl sm:text-5xl md:text-6xl text-[#F3EBDD] leading-[1.15]">
            &ldquo;In a world addicted to instantaneous extraction, we chose the
            patience of cast-iron heat and resting timber.&rdquo;
          </blockquote>
          <p className="text-xs tracking-[0.25em] text-[#B97845] uppercase font-mono mt-6">
            Julian Vance &amp; Elena Rostova — Founders &amp; Roasters
          </p>
        </div>

        {/* The 4 Milestones */}
        <div className="py-16 space-y-16">
          <div className="max-w-xl space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-mono">
              The Protocol
            </span>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F3EBDD]">
              Four Pillars of The Slow Roast
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
            {steps.map((s) => {
              const StepIcon = s.icon;
              return (
                <div
                  key={s.num}
                  className="p-8 bg-[#231C16]/50 border border-[#F3EBDD]/10 space-y-4 hover:border-[#B97845]/50 transition-colors"
                >
                  <div className="flex items-center justify-between border-b border-[#F3EBDD]/10 pb-4">
                    <span className="text-xs font-mono text-[#B97845] tracking-widest">
                      PHASE {s.num}
                    </span>
                    <StepIcon className="w-5 h-5 text-[#B97845]" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl text-[#F3EBDD]">
                      {s.title}
                    </h3>
                    <p className="text-xs font-mono text-[#B97845] mt-0.5">
                      {s.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-[#F3EBDD]/75 font-sans leading-relaxed">
                    {s.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ethical Commitment Banner */}
        <div className="mt-8 p-8 sm:p-12 bg-[#0E0B09] border border-[#F3EBDD]/15 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#B97845]">
              Origin Transparency
            </span>
            <h3 className="font-display text-3xl text-[#F3EBDD]">
              Our Open Book Pricing
            </h3>
            <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans leading-relaxed max-w-2xl">
              Specialty coffee is only sustainable when the farmer thrives. We
              publish our green coffee purchasing contracts every season,
              detailing FOB prices, milling costs, sea freight, and roastery
              margins.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <Link
              href="/reservations"
              className="px-8 py-4 bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] font-semibold text-xs uppercase tracking-[0.2em] font-sans flex items-center space-x-2 transition-colors"
            >
              <span>Taste at Our Bar</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
