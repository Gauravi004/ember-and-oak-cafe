import React from "react";
import Link from "next/link";
import ContactForm from "@/components/forms/ContactForm";
import { CAFE_CONFIG } from "@/data/cafe-config";
import { MapPin, Navigation, Phone, Mail, Clock } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-28 sm:pt-36 pb-24 px-4 sm:px-6 lg:px-8 bg-[#17120F] text-[#F3EBDD] min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header Breadcrumbs */}
        <div className="border-b border-[#F3EBDD]/15 pb-8">
          <div className="flex items-center space-x-2 text-[11px] tracking-[0.25em] uppercase text-[#B97845] font-mono mb-4">
            <Link href="/" className="hover:underline">
              Roastery
            </Link>
            <span>/</span>
            <span>Contact &amp; Location</span>
          </div>

          <h1 className="font-display text-4xl sm:text-6xl md:text-7xl text-[#F3EBDD] leading-[1.05]">
            Find the Roastery in the Foundry Quarter
          </h1>
          <p className="text-xs sm:text-sm text-[#F3EBDD]/70 font-sans max-w-2xl mt-4 leading-relaxed">
            Whether inquiring about our micro-batch wholesale program, booking
            an editorial film shoot, or seeking directions to our tasting room,
            we are here to assist.
          </p>
        </div>

        {/* Contact Form & Visit Details */}
        <div className="py-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Form */}
          <div className="lg:col-span-7 bg-[#231C16] p-6 sm:p-10 border border-[#F3EBDD]/15 shadow-2xl">
            <div className="border-b border-[#F3EBDD]/10 pb-4 mb-6">
              <span className="text-[10px] uppercase font-mono tracking-[0.25em] text-[#B97845]">
                Direct Inquiries
              </span>
              <h2 className="font-display text-2xl sm:text-3xl text-[#F3EBDD] mt-1">
                Dispatch a Message
              </h2>
            </div>
            <ContactForm />
          </div>

          {/* Location & Details */}
          <div className="lg:col-span-5 space-y-8">
            <div className="p-6 sm:p-8 bg-[#0E0B09] border border-[#F3EBDD]/15 space-y-6">
              <h3 className="font-display text-2xl text-[#F3EBDD]">
                Foundry Headquarters
              </h3>

              <div className="space-y-4 text-xs font-sans text-[#F3EBDD]/80">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">Address</strong>
                    <p>{CAFE_CONFIG.contact.address.street}</p>
                    <p>
                      {CAFE_CONFIG.contact.address.city},{" "}
                      {CAFE_CONFIG.contact.address.postcode}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Navigation className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">
                      Underground &amp; Transit
                    </strong>
                    <p className="text-[11px] text-[#F3EBDD]/65">
                      {CAFE_CONFIG.contact.address.transit}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">
                      Roastery Hours
                    </strong>
                    <p className="text-[11px] text-[#F3EBDD]/65">
                      Mon — Fri: 07:00 — 17:30
                    </p>
                    <p className="text-[11px] text-[#F3EBDD]/65">
                      Sat — Sun: 08:00 — 18:30
                    </p>
                    <p className="text-[11px] text-[#B97845]">
                      Oak Hour: Thu &amp; Fri 18:00 — 22:00
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Mail className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">Email</strong>
                    <p className="font-mono text-[11px] text-[#F3EBDD]/65">
                      General: {CAFE_CONFIG.contact.email}
                    </p>
                    <p className="font-mono text-[11px] text-[#B97845]">
                      Wholesale: {CAFE_CONFIG.contact.wholesaleEmail}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-4 h-4 text-[#B97845] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#F3EBDD] block">Telephone</strong>
                    <p className="font-mono text-[11px] text-[#F3EBDD]/65">
                      {CAFE_CONFIG.contact.phone}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Wholesale Callout */}
            <div className="p-6 bg-[#231C16] border border-[#B97845]/30 space-y-2">
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#B97845]">
                Specialty Wholesale Partners
              </span>
              <p className="text-xs text-[#F3EBDD]/75 font-sans leading-relaxed">
                We supply selected Michelin restaurants and independent espresso
                bars across the UK with roasted-to-order micro-lots, custom water
                formulations, and barista education.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
