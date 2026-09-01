"use client";

import React, { useEffect, useRef, useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";
import { useTheme } from "@/context/ThemeContext";

export default function HeroSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [videoSrcError, setVideoSrcError] = useState(false);

  useEffect(() => {
    setVideoSrcError(false);
    if (desktopVideoRef.current) {
      desktopVideoRef.current.load();
      desktopVideoRef.current.play().catch(() => {});
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.load();
      mobileVideoRef.current.play().catch(() => {});
    }
  }, [theme]);

  // Video sources (uses /light.mp4 in light mode, /desktop.mp4 / /bcck.mp4 in dark mode)
  const desktopSrc =
    !isDark && !videoSrcError ? "/light.mp4" : "/desktop.mp4";
  const mobileSrc =
    !isDark && !videoSrcError ? "/light.mp4" : "/bcck.mp4";

  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── FULL-SCREEN BACKGROUND VIDEO LAYER ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Desktop Video (>= 768px) */}
        <video
          key={`desktop-${theme}-${desktopSrc}`}
          ref={desktopVideoRef}
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isDark ? "none" : "brightness(1.05) contrast(0.95)",
            transition: "filter 0.4s ease",
          }}
          src={desktopSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => {
            // Graceful fallback to dark video if light video asset is not yet added
            if (!isDark) setVideoSrcError(true);
          }}
        />

        {/* Mobile Video (< 768px) */}
        <video
          key={`mobile-${theme}-${mobileSrc}`}
          ref={mobileVideoRef}
          className="block md:hidden"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            filter: isDark ? "none" : "brightness(1.05) contrast(0.95)",
            transition: "filter 0.4s ease",
          }}
          src={mobileSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={() => {
            if (!isDark) setVideoSrcError(true);
          }}
        />

        {/* Dynamic Dark / Light Contrast Film Overlays */}
        {isDark ? (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 45%, rgba(0,0,0,0.1) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 40%, rgba(0,0,0,0.4) 100%)",
                pointerEvents: "none",
              }}
            />
          </>
        ) : (
          <>
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to right, rgba(248, 250, 252, 0.92) 0%, rgba(248, 250, 252, 0.72) 48%, rgba(248, 250, 252, 0.25) 100%)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "linear-gradient(to top, rgba(248, 250, 252, 0.9) 0%, transparent 45%, rgba(248, 250, 252, 0.5) 100%)",
                pointerEvents: "none",
              }}
            />
          </>
        )}
      </div>

      {/* ── TOP HUD ANGLED BORDER LINE (Calibrated) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "110px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <svg
          style={{ width: "100%", height: "100%" }}
          preserveAspectRatio="none"
          viewBox="0 0 1440 110"
        >
          <path
            d="M 0,48 L 44,48 L 80,82 L 720,82 L 2400,82"
            fill="none"
            stroke="var(--hud-line)"
            strokeWidth={1.2}
          />
          <path
            d="M 720,82 L 720,106"
            fill="none"
            stroke="var(--hud-line)"
            strokeWidth={1.2}
          />
        </svg>
      </div>

      {/* Spacer for sticky Navbar */}
      <div style={{ height: "80px", flexShrink: 0 }} />

      {/* ── MAIN HERO BODY (Left-aligned Layout) ── */}
      <main
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 56px",
          maxWidth: "1480px",
          width: "100%",
          margin: "0 auto",
          minHeight: 0,
        }}
      >
        <div style={{ maxWidth: "620px", width: "100%" }}>
          {/* Main Headline */}
          <h1
            className="font-chakra"
            style={{
              fontWeight: 700,
              color: "var(--text-primary)",
              fontSize: "clamp(2.6rem, 5.2vw, 4.2rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.94,
              textTransform: "uppercase",
              margin: "0 0 18px 0",
              textShadow: isDark
                ? "0 2px 10px rgba(0,0,0,0.5)"
                : "0 2px 10px rgba(255,255,255,0.8)",
            }}
          >
            <span style={{ display: "block" }}>MACHINE LEARNING</span>
            <span style={{ display: "block" }}>&amp; AI SYSTEMS</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "var(--text-secondary)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: "420px",
              margin: "0 0 32px 0",
              fontWeight: 400,
            }}
          >
            Architecting high-throughput neural models, autonomous LLM pipelines,
            and ultra-low-latency distributed inference engines.
          </p>

          {/* Calibrated 45-Degree Cut Button */}
          <div style={{ marginBottom: "40px" }}>
            <WaspButton
              href="#skills"
              id="hero-start-now-btn"
              variant={isDark ? "dark" : "light"}
            >
              EXPLORE MODELS
            </WaspButton>
          </div>

          {/* Wireframe Stats Section */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              gap: "42px",
              maxWidth: "460px",
            }}
          >
            {/* Stat 1: Daily Inferences / Token Throughput */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  flexShrink: 0,
                }}
              >
                <svg
                  style={{ width: "26px", height: "26px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="7" r="2.5" />
                  <path d="M5 17L12 13L19 17L12 21L5 17Z" />
                  <path d="M5 12L12 16L19 12" />
                </svg>
              </div>
              <div>
                <div
                  className="font-chakra"
                  style={{
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    color: "var(--text-primary)",
                    lineHeight: 1,
                  }}
                >
                  25M+
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Daily Inferences
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div
              style={{
                height: "36px",
                width: "1px",
                backgroundColor: "var(--border-subtle)",
              }}
            />

            {/* Stat 2: Latency Benchmark */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--text-secondary)",
                  flexShrink: 0,
                }}
              >
                <svg
                  style={{ width: "26px", height: "26px" }}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2" />
                  <line x1="12" y1="2" x2="12" y2="22" />
                  <line x1="2" y1="8.5" x2="22" y2="8.5" />
                  <line x1="2" y1="15.5" x2="22" y2="15.5" />
                </svg>
              </div>
              <div>
                <div
                  className="font-chakra"
                  style={{
                    fontWeight: 700,
                    fontSize: "1.6rem",
                    color: "var(--text-primary)",
                    lineHeight: 1,
                  }}
                >
                  &lt; 38ms
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  P99 Inference Latency
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM GRADIENT VIGNETTE ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          height: "64px",
          background: isDark
            ? "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2) 60%, transparent)"
            : "linear-gradient(to top, rgba(248,250,252,0.9), rgba(248,250,252,0.3) 60%, transparent)",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />
    </section>
  );
}
