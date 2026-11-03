import React from "react";
import Chapter1Hero from "@/components/home/Chapter1Hero";
import Chapter2Philosophy from "@/components/home/Chapter2Philosophy";
import Chapter3Roast from "@/components/home/Chapter3Roast";
import Chapter4Oak from "@/components/home/Chapter4Oak";
import Chapter5Menu from "@/components/home/Chapter5Menu";
import Chapter6Room from "@/components/home/Chapter6Room";
import Chapter7Events from "@/components/home/Chapter7Events";
import Chapter8Reserve from "@/components/home/Chapter8Reserve";

export default function Home() {
  return (
    <div className="flex flex-col w-full bg-[#17120F] text-[#F3EBDD]">
      {/* Chapter 1: The Ember (Hero) */}
      <Chapter1Hero />

      {/* Chapter 2: The Slow Statement */}
      <Chapter2Philosophy />

      {/* Chapter 3: The Roast (GSAP Pinned Scroll Animation) */}
      <Chapter3Roast />

      {/* Chapter 4: The Oak (Deep Olive Background) */}
      <Chapter4Oak />

      {/* Chapter 5: The Menu (Warm Cream Section) */}
      <Chapter5Menu />

      {/* Chapter 6: The Room (Spatial Architecture) */}
      <Chapter6Room />

      {/* Chapter 7: Evenings & Gatherings */}
      <Chapter7Events />

      {/* Chapter 8: Reserve & Visit (Warm Cream Section) */}
      <Chapter8Reserve />
    </div>
  );
}
