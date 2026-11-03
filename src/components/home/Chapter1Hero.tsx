"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import VideoPlayer from "@/components/ui/VideoPlayer";
import { CAFE_CONFIG } from "@/data/cafe-config";
import { initGSAP, isReducedMotion } from "@/lib/gsap";

export default function Chapter1Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { gsap } = initGSAP();
    if (isReducedMotion()) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 1.4, delay: 0.3 }
      )
        .fromTo(
          taglineRef.current,
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.1 },
          "-=0.8"
        )
        .fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9 },
          "-=0.6"
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex flex-col justify-between pt-24 sm:pt-28 pb-10 sm:pb-14 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] overflow-hidden"
    >
      {/* Background Cinematic Video */}
      <div className="absolute inset-0 z-0">
        <VideoPlayer
          src="/videos/milk-pour.mp4"
          poster="/images/hero-poster.webp"
          priority
          autoPlay={true}
          loop={true}
          muted={true}
          overlayOpacity={0.45}
          ariaLabel="Steamed milk poured slowly into espresso in continuous cinematic loop"
          className="w-full h-full"
        />
        {/* Soft Radial Vignette */}
        <div className="absolute inset-0 bg-radial-gradient pointer-events-none from-transparent via-[#17120F]/40 to-[#17120F]/90" />
      </div>

      {/* Top Breadcrumb Marker */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-center justify-between text-[11px] tracking-[0.28em] uppercase text-[#F3EBDD]/60 font-sans border-b border-[#F3EBDD]/10 pb-4">
        <span>Chapter I — The Ember</span>
        <span className="hidden sm:inline-block text-[#B97845]">
          Micro-Batch No. 248 • In Season
        </span>
      </div>

      {/* Center Cinematic Typography */}
      <div className="relative z-10 max-w-7xl mx-auto w-full my-auto py-12 sm:py-16">
        <div className="max-w-4xl space-y-4 sm:space-y-6">
          <p className="text-xs sm:text-sm tracking-[0.3em] uppercase text-[#B97845] font-sans font-medium">
            {CAFE_CONFIG.brand.subtagline}
          </p>

          <h1
            ref={headlineRef}
            className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-[0.06em] text-[#F3EBDD] leading-[0.95] drop-shadow-md"
          >
            EMBER <span className="text-[#B97845] font-normal">&amp;</span> OAK
          </h1>

          <p
            ref={taglineRef}
            className="text-lg sm:text-2xl md:text-3xl font-display italic text-[#F3EBDD]/90 max-w-2xl leading-relaxed"
          >
            &ldquo;{CAFE_CONFIG.brand.tagline}&rdquo;
          </p>

          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 max-w-xl font-sans leading-relaxed tracking-wide pt-1">
            Cast-iron flame meets slow French oak maturation. We roast 12kg at
            a time in the Old Foundry Quarter to extract what fast roasters burn
            away.
          </p>

          {/* Action CTAs */}
          <div
            ref={ctaRef}
            className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4 text-xs tracking-[0.2em] uppercase font-sans font-medium"
          >
            <Link
              href="/reservations"
              className="px-7 py-4 bg-[#B97845] text-[#17120F] hover:bg-[#d48b52] transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <span>Reserve a Table</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>

            <Link
              href="/menu"
              className="px-7 py-4 border border-[#F3EBDD]/30 text-[#F3EBDD] hover:border-[#F3EBDD] hover:bg-[#F3EBDD]/10 transition-colors duration-300 flex items-center justify-center"
            >
              Explore the Menu
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar: Scroll Indicator & Origin Coordinates */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex items-end justify-between border-t border-[#F3EBDD]/10 pt-4 text-xs text-[#F3EBDD]/60 font-sans">
        <div className="flex items-center space-x-2">
          <span className="w-2 h-2 rounded-full bg-[#B97845] animate-pulse" />
          <span className="tracking-widest uppercase text-[10px]">
            Roasting Daily at 06:00 AM
          </span>
        </div>

        <a
          href="#statement"
          className="flex items-center space-x-2 text-[10px] tracking-[0.25em] uppercase hover:text-[#B97845] transition-colors"
        >
          <span>Scroll to Explore</span>
          <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
