"use client";

import React, { useEffect, useRef, useState, useSyncExternalStore } from "react";

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  priority?: boolean;
  overlayOpacity?: number;
  objectFit?: "cover" | "contain";
  ariaLabel: string;
  onTimeUpdate?: (currentTime: number, duration: number) => void;
}

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

export default function VideoPlayer({
  src,
  poster = "/images/hero-poster.webp",
  className = "",
  autoPlay = true,
  loop = true,
  muted = true,
  priority = false,
  overlayOpacity = 0.35,
  objectFit = "cover",
  ariaLabel,
  onTimeUpdate,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getServerSnapshot
  );

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Handle time updates if requested
    const handleTime = () => {
      if (onTimeUpdate && video.duration) {
        onTimeUpdate(video.currentTime, video.duration);
      }
    };
    video.addEventListener("timeupdate", handleTime);

    // Single video playback observer: pause when off-screen to conserve GPU/battery
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!video) return;
          if (entry.isIntersecting && !reducedMotion && autoPlay) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise.catch(() => {
                // Autoplay blocked
              });
            }
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(video);

    return () => {
      video.removeEventListener("timeupdate", handleTime);
      observer.disconnect();
    };
  }, [autoPlay, reducedMotion, onTimeUpdate]);

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Video Element */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay && !reducedMotion}
        loop={loop}
        muted={muted}
        playsInline
        preload={priority ? "auto" : "metadata"}
        onLoadedData={() => setIsLoaded(true)}
        aria-label={ariaLabel}
        className={`w-full h-full transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        } ${objectFit === "cover" ? "object-cover" : "object-contain"}`}
      />

      {/* Reduced Motion or Preload Fallback Poster */}
      {(!isLoaded || reducedMotion) && (
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-700"
          style={{ backgroundImage: `url(${poster})` }}
          aria-hidden="true"
        />
      )}

      {/* Cinematic Tint Overlay */}
      {overlayOpacity > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundColor: `rgba(23, 18, 15, ${overlayOpacity})`,
          }}
          aria-hidden="true"
        />
      )}
    </div>
  );
}
