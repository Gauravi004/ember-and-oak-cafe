"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { initGSAP } from "@/lib/gsap";
import { Play, Pause, Flame, Sparkles, Wind } from "lucide-react";

interface RoastPhase {
  id: string;
  stageNumber: string;
  title: string;
  subtitle: string;
  temp: string;
  duration: string;
  description: string;
  icon: typeof Flame;
}

const ROAST_PHASES: RoastPhase[] = [
  {
    id: "green",
    stageNumber: "01",
    title: "Green & Patient",
    subtitle: "Thermal Charge & Moisture Evaporation",
    temp: "165°C Charge",
    duration: "Minutes 0:00 — 4:30",
    description:
      "Green high-altitude seeds enter the preheated cast-iron drum. Dense cellular walls retain origin moisture as drying begins, turning straw-yellow and releasing raw vegetal steam.",
    icon: Wind,
  },
  {
    id: "gold",
    stageNumber: "02",
    title: "Gold & Sweet",
    subtitle: "The Maillard Reaction & First Crack",
    temp: "198°C First Crack",
    duration: "Minutes 4:30 — 8:45",
    description:
      "Amino acids and natural sucrose combust in the Maillard dance. Sugars caramelize, cell walls rupture with an audible snap, and the air fills with warm brioche and toasted hazelnut.",
    icon: Sparkles,
  },
  {
    id: "dark",
    stageNumber: "03",
    title: "Dark Enough to Sing",
    subtitle: "Development Peak & Cooling Discharge",
    temp: "212°C Drop",
    duration: "Minutes 8:45 — 10:15",
    description:
      "Aromatic oils rise to the bean surface. At the precise peak of development, before acidity turns bitter, the cast iron hatch opens and glowing embers spill into the cooling agitation tray.",
    icon: Flame,
  },
];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") return () => {};
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export default function Chapter3Roast() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinTargetRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isManualPlaying, setIsManualPlaying] = useState(false);

  const isReduced = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    if (isReduced) return;

    const { gsap, ScrollTrigger } = initGSAP();

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=2000",
        pin: pinTargetRef.current,
        scrub: 0.6,
        onUpdate: (self) => {
          const p = self.progress;
          setProgress(p);

          if (p < 0.33) {
            setActiveStage(0);
          } else if (p < 0.66) {
            setActiveStage(1);
          } else {
            setActiveStage(2);
          }

          const video = videoRef.current;
          if (video && video.duration && !isManualPlaying) {
            video.currentTime = p * video.duration;
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isManualPlaying, isReduced]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().then(() => setIsManualPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsManualPlaying(false);
    }
  };

  const currentPhase = ROAST_PHASES[activeStage];
  const IconComponent = currentPhase.icon;

  return (
    <div
      ref={containerRef}
      className={`relative bg-[#0E0B09] text-[#F3EBDD] ${
        isReduced ? "py-24" : "h-[320vh]"
      }`}
    >
      <div
        ref={pinTargetRef}
        className={`${
          isReduced
            ? "relative max-w-7xl mx-auto px-4"
            : "sticky top-0 h-screen w-full flex flex-col justify-between overflow-hidden p-4 sm:p-8"
        }`}
      >
        {/* Top Header / Progress Track */}
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-[#F3EBDD]/15 text-xs font-sans gap-2 z-10">
          <div className="flex items-center space-x-3 text-[11px] tracking-[0.3em] uppercase text-[#B97845]">
            <span>Chapter III</span>
            <span className="w-8 h-[1px] bg-[#B97845]/40" />
            <span>The Roast</span>
          </div>

          <div className="flex items-center space-x-6 text-[11px] text-[#F3EBDD]/60 tracking-wider">
            <span className="hidden sm:inline">
              Thermal Cycle: San Franciscan SF-25
            </span>
            <div className="flex items-center space-x-2">
              <span className="text-[#B97845] font-mono">
                {Math.round(progress * 100)}%
              </span>
              <div className="w-24 sm:w-36 h-1 bg-[#231C16] border border-[#F3EBDD]/10">
                <div
                  className="h-full bg-[#B97845] transition-all duration-150"
                  style={{ width: `${Math.max(5, progress * 100)}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center Stage: Video Frame & Synchronized Narrative */}
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 my-auto items-center z-10 py-4">
          {/* Video Container */}
          <div className="lg:col-span-7 relative aspect-video bg-[#17120F] border border-[#F3EBDD]/15 overflow-hidden shadow-2xl group">
            <video
              ref={videoRef}
              src="/videos/roast-process.mp4"
              poster="/images/hero-poster.webp"
              muted
              playsInline
              preload="auto"
              className="w-full h-full object-cover"
              aria-label="Slow-motion transition of coffee beans roasting from green to golden to rich dark copper"
            />

            {/* Video Overlay Stamp */}
            <div className="absolute top-4 left-4 bg-[#17120F]/90 border border-[#B97845]/40 px-3 py-1.5 text-[10px] tracking-[0.2em] uppercase font-mono text-[#F3EBDD] flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#B97845] animate-ping" />
              <span>{currentPhase.temp}</span>
            </div>

            {/* Interactive Manual Play/Scrub Controls */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              <button
                type="button"
                onClick={togglePlay}
                aria-label={isManualPlaying ? "Pause Video" : "Play Continuous Video"}
                className="px-3 py-1.5 bg-[#231C16]/90 hover:bg-[#B97845] text-[#F3EBDD] hover:text-[#17120F] border border-[#F3EBDD]/20 transition-colors text-[10px] uppercase tracking-widest font-mono flex items-center space-x-1"
              >
                {isManualPlaying ? (
                  <>
                    <Pause className="w-3 h-3" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3 h-3" />
                    <span>Play Realtime</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Synchronized Narrative Panel */}
          <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
            {/* Stage Selector Pills */}
            <div className="flex items-center space-x-2 border-b border-[#F3EBDD]/10 pb-4">
              {ROAST_PHASES.map((phase, idx) => (
                <button
                  key={phase.id}
                  type="button"
                  onClick={() => {
                    setActiveStage(idx);
                    const video = videoRef.current;
                    if (video && video.duration) {
                      video.currentTime = (idx / 3) * video.duration;
                    }
                  }}
                  className={`text-[10px] sm:text-xs tracking-[0.2em] uppercase px-3 py-1.5 transition-colors font-mono ${
                    activeStage === idx
                      ? "bg-[#B97845] text-[#17120F] font-semibold"
                      : "bg-[#231C16] text-[#F3EBDD]/60 hover:text-[#F3EBDD]"
                  }`}
                >
                  Phase {phase.stageNumber}
                </button>
              ))}
            </div>

            {/* Current Phase Content */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3 text-[#B97845]">
                <IconComponent className="w-5 h-5" />
                <span className="text-xs uppercase tracking-[0.25em] font-mono">
                  {currentPhase.duration}
                </span>
              </div>

              <h3 className="font-display text-4xl sm:text-5xl text-[#F3EBDD] leading-tight">
                {currentPhase.title}
              </h3>

              <p className="text-sm font-medium text-[#B97845] tracking-wide">
                {currentPhase.subtitle}
              </p>

              <p className="text-xs sm:text-sm text-[#F3EBDD]/75 font-sans leading-relaxed">
                {currentPhase.description}
              </p>
            </div>

            <div className="pt-4 border-t border-[#F3EBDD]/10 flex items-center justify-between text-xs text-[#F3EBDD]/50 font-sans">
              <span>Scroll to drive the roast progression</span>
              <span className="font-mono text-[#B97845]">
                Stage {activeStage + 1} of 3
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Status Ticker */}
        <div className="max-w-7xl mx-auto w-full pt-4 border-t border-[#F3EBDD]/10 flex items-center justify-between text-[10px] tracking-[0.25em] uppercase text-[#F3EBDD]/40 font-mono z-10">
          <span>Batch Weight: 12.00 KG Uniform</span>
          <span>Cooling Cycle: 180 Seconds Air Suction</span>
        </div>
      </div>
    </div>
  );
}
