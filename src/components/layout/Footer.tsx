import React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CAFE_CONFIG } from "@/data/cafe-config";

export default function Footer() {
  return (
    <footer className="bg-[#0E0B09] text-[#F3EBDD] border-t border-[#F3EBDD]/10 pt-16 sm:pt-20 pb-12 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#F3EBDD]/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-6">
            <div>
              <span className="font-display text-3xl sm:text-4xl tracking-[0.16em] text-[#F3EBDD] block">
                {CAFE_CONFIG.brand.name}
              </span>
              <p className="text-xs tracking-[0.25em] text-[#B97845] uppercase mt-1">
                {CAFE_CONFIG.brand.tagline}
              </p>
            </div>
            <p className="text-sm text-[#F3EBDD]/65 leading-relaxed max-w-sm">
              An independent specialty coffee roastery born from the communion
              of cast-iron fire and charred oak casks. Roasted in micro-batches
              before the city wakes.
            </p>
            <div className="pt-2">
              <span className="inline-block text-[10px] tracking-[0.25em] uppercase text-[#F3EBDD]/40 border border-[#F3EBDD]/15 px-3 py-1">
                {CAFE_CONFIG.brand.batchSize} • {CAFE_CONFIG.brand.caskRestDuration}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-semibold">
              Explore
            </h4>
            <ul className="space-y-2.5 text-xs tracking-wider uppercase text-[#F3EBDD]/70">
              <li>
                <Link href="/" className="hover:text-[#B97845] transition-colors">
                  The Roastery
                </Link>
              </li>
              <li>
                <Link href="/menu" className="hover:text-[#B97845] transition-colors">
                  Specialty Menu
                </Link>
              </li>
              <li>
                <Link href="/story" className="hover:text-[#B97845] transition-colors">
                  Our Philosophy
                </Link>
              </li>
              <li>
                <Link href="/reservations" className="hover:text-[#B97845] transition-colors">
                  Reserve a Table
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-[#B97845] transition-colors">
                  Cuppings & Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#B97845] transition-colors">
                  Find & Visit
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours Column */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-semibold">
              Visiting Hours
            </h4>
            <div className="space-y-3 text-xs text-[#F3EBDD]/70">
              {CAFE_CONFIG.hours.map((h, i) => (
                <div key={i} className="border-b border-[#F3EBDD]/5 pb-2">
                  <span className="block text-[#F3EBDD] font-medium">{h.days}</span>
                  <div className="flex justify-between text-[11px] text-[#F3EBDD]/55 mt-0.5">
                    <span>{h.times}</span>
                    <span className="text-[#B97845]/90">{h.note}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Location & Social */}
          <div className="md:col-span-2 space-y-4">
            <h4 className="text-xs uppercase tracking-[0.25em] text-[#B97845] font-semibold">
              Foundry Quarter
            </h4>
            <div className="text-xs text-[#F3EBDD]/70 space-y-1">
              <p>{CAFE_CONFIG.contact.address.street}</p>
              <p>{CAFE_CONFIG.contact.address.city}, {CAFE_CONFIG.contact.address.postcode}</p>
              <p className="text-[11px] text-[#B97845] pt-1">
                {CAFE_CONFIG.contact.address.transit}
              </p>
            </div>

            <div className="pt-4 space-y-2">
              <h5 className="text-[10px] uppercase tracking-[0.2em] text-[#F3EBDD]/40">
                Dispatches
              </h5>
              <div className="flex space-x-3 text-xs text-[#F3EBDD]/70">
                {CAFE_CONFIG.socials.map((s, idx) => (
                  <a
                    key={idx}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#B97845] transition-colors flex items-center"
                  >
                    <span>{s.label}</span>
                    <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-60" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#F3EBDD]/40 gap-4">
          <p>© 2026 EMBER & OAK ROASTERY LTD. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="text-[#B97845]/80">
              {CAFE_CONFIG.legal.disclaimer}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
