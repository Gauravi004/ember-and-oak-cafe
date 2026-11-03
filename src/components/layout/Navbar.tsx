"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { CAFE_CONFIG } from "@/data/cafe-config";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/menu", label: "Menu" },
  { href: "/story", label: "Our Story" },
  { href: "/reservations", label: "Reservations" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? "bg-[#231C16]/95 backdrop-blur-md py-3.5 border-b border-[#F3EBDD]/10 shadow-2xl"
            : "bg-gradient-to-b from-[#17120F]/90 via-[#17120F]/40 to-transparent py-5 sm:py-6"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo & Tagline */}
            <Link
              href="/"
              className="group flex flex-col focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B97845]"
            >
              <span className="font-display text-2xl sm:text-3xl tracking-[0.18em] text-[#F3EBDD] group-hover:text-[#B97845] transition-colors duration-300">
                {CAFE_CONFIG.brand.name}
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[#F3EBDD]/60 uppercase font-sans -mt-0.5">
                {CAFE_CONFIG.brand.tagline}
              </span>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center space-x-7 lg:space-x-8 text-xs tracking-[0.2em] uppercase font-sans">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`relative py-1 transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B97845] ${
                      isActive
                        ? "text-[#B97845] font-semibold"
                        : "text-[#F3EBDD]/80 hover:text-[#F3EBDD]"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#B97845]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Action Button & Mobile Toggle */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <Link
                href="/reservations"
                className="hidden sm:inline-flex items-center justify-center px-4 py-2 border border-[#B97845] text-[#F3EBDD] hover:bg-[#B97845] hover:text-[#17120F] transition-all duration-300 text-xs tracking-[0.2em] uppercase font-sans font-medium"
              >
                <span>Reserve</span>
                <ArrowUpRight className="w-3.5 h-3.5 ml-1 opacity-70" />
              </Link>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                aria-expanded={isMobileMenuOpen}
                className="md:hidden p-2 text-[#F3EBDD] hover:text-[#B97845] transition-colors focus:outline-none focus-visible:ring-1 focus-visible:ring-[#B97845]"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <div
        className={`fixed inset-0 z-40 bg-[#17120F]/98 backdrop-blur-xl transition-all duration-500 md:hidden flex flex-col justify-between p-6 pt-24 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex flex-col space-y-6 pt-6">
          <p className="text-[11px] tracking-[0.3em] uppercase text-[#B97845] font-mono">
            Navigation Index
          </p>
          <div className="flex flex-col space-y-4">
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobileMenu}
                  className={`font-display text-3xl transition-colors ${
                    isActive ? "text-[#B97845]" : "text-[#F3EBDD]/80 hover:text-[#F3EBDD]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        </div>

        <div className="border-t border-[#F3EBDD]/15 pt-6 space-y-4">
          <Link
            href="/reservations"
            onClick={closeMobileMenu}
            className="w-full flex items-center justify-center py-3.5 border border-[#B97845] bg-[#B97845] text-[#17120F] font-sans text-xs tracking-[0.2em] uppercase font-semibold"
          >
            Reserve a Table
          </Link>
          <div className="text-xs text-[#F3EBDD]/50 font-sans tracking-wider space-y-1">
            <p>{CAFE_CONFIG.contact.address.street}</p>
            <p>{CAFE_CONFIG.contact.phone}</p>
          </div>
        </div>
      </div>
    </>
  );
}
