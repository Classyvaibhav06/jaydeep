"use client";

import React, { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        backgroundColor: "#E5E7EB",
        color: "#111827",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── TOP HUD ANGLED BORDER LINE (Exact WASP style) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "90px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <svg
          style={{ width: "100%", height: "100%" }}
          preserveAspectRatio="none"
          viewBox="0 0 1440 90"
        >
          <path
            d="M 0,34 L 44,34 L 76,68 L 720,68 L 1440,68"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.2"
            opacity="0.5"
          />
          <path
            d="M 720,68 L 720,90"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="1.2"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* ── TOP NAVIGATION ── */}
      <header
        style={{
          position: "relative",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 64px 8px 64px",
          flexShrink: 0,
        }}
      >
        {/* Pixel Art Logo */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <a
            href="#"
            className="font-pixel"
            style={{
              fontSize: "1.45rem",
              letterSpacing: "0.14em",
              color: "#000000",
              textDecoration: "none",
            }}
          >
            JAYDEEP
          </a>
        </div>

        {/* Center Nav Links */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: "52px",
            fontSize: "0.875rem",
            fontWeight: 500,
            color: "#374151",
          }}
          className="hidden md:flex"
        >
          {["About", "Products", "Plans", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{ color: "#374151", textDecoration: "none" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#000")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Top Right CONNECT Button */}
        <div>
          <a
            href="#contact"
            id="nav-connect-btn"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 700,
              fontSize: "0.82rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "10px 26px",
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              border: "1px solid #E5E7EB",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#000000";
              e.currentTarget.style.color = "#ffffff";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#ffffff";
              e.currentTarget.style.color = "#000000";
            }}
          >
            CONNECT
          </a>
        </div>
      </header>

      {/* ── MAIN HERO BODY ── */}
      <main
        style={{
          position: "relative",
          zIndex: 20,
          flex: 1,
          display: "flex",
          alignItems: "center",
          padding: "0 64px",
          maxWidth: "1480px",
          width: "100%",
          margin: "0 auto",
          minHeight: 0,
        }}
      >
        <div
          style={{
            width: "100%",
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            alignItems: "center",
            gap: "32px",
          }}
        >
          {/* LEFT COLUMN: Typography & Action Button & Stats */}
          <div
            style={{
              gridColumn: "span 6",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              paddingRight: "24px",
              zIndex: 20,
            }}
          >
            {/* Main Headline */}
            <h1
              className="font-chakra"
              style={{
                fontWeight: 700,
                color: "#111827",
                fontSize: "clamp(3rem, 5.2vw, 4.4rem)",
                letterSpacing: "-0.02em",
                lineHeight: 0.94,
                textTransform: "uppercase",
                margin: "0 0 20px 0",
              }}
            >
              <span style={{ display: "block" }}>AI DRIVEN</span>
              <span style={{ display: "block" }}>SOLUTIONS</span>
            </h1>

            {/* Subtitle */}
            <p
              style={{
                color: "#4B5563",
                fontSize: "0.92rem",
                lineHeight: 1.6,
                maxWidth: "340px",
                margin: "0 0 32px 0",
                fontWeight: 400,
              }}
            >
              transforms your challenges into opportunities with cutting-edge
              innovation.
            </p>

            {/* Chamfered START NOW Button */}
            <div style={{ marginBottom: "38px" }}>
              <a
                href="#projects"
                id="hero-start-now-btn"
                className="font-chakra"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#0B0E14",
                  color: "#ffffff",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "12px 30px",
                  clipPath:
                    "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                  textDecoration: "none",
                  cursor: "pointer",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#1E2533")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#0B0E14")
                }
              >
                START NOW
              </a>
            </div>

            {/* Stats Section with Divider */}
            <div
              style={{
                paddingTop: "22px",
                borderTop: "1px solid rgba(156, 163, 175, 0.7)",
                display: "flex",
                alignItems: "center",
                gap: "40px",
                maxWidth: "400px",
              }}
            >
              {/* Stat 1: Active Users */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6B7280",
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
                      fontSize: "1.5rem",
                      color: "#000000",
                      lineHeight: 1,
                    }}
                  >
                    30M
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6B7280",
                      marginTop: "3px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    active users
                  </div>
                </div>
              </div>

              {/* Vertical Divider */}
              <div
                style={{
                  height: "32px",
                  width: "1px",
                  backgroundColor: "rgba(156, 163, 175, 0.7)",
                }}
              />

              {/* Stat 2: Country Served */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <div
                  style={{
                    width: "32px",
                    height: "32px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#6B7280",
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
                      fontSize: "1.5rem",
                      color: "#000000",
                      lineHeight: 1,
                    }}
                  >
                    56
                  </div>
                  <div
                    style={{
                      fontSize: "11px",
                      color: "#6B7280",
                      marginTop: "3px",
                      textTransform: "uppercase",
                      letterSpacing: "0.04em",
                    }}
                  >
                    country served
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Video Framed by Tech HUD Outline */}
          <div
            style={{
              gridColumn: "span 6",
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
              maxHeight: "480px",
              width: "100%",
            }}
          >
            {/* Tech HUD Outer Bracket Line */}
            <div
              style={{
                position: "absolute",
                inset: "-16px",
                pointerEvents: "none",
              }}
              className="hidden lg:block"
            >
              <svg
                style={{ width: "100%", height: "100%" }}
                viewBox="0 0 620 520"
                fill="none"
                preserveAspectRatio="none"
              >
                <path
                  d="M 20,0 L 20,380 L -15,415 L -15,455 L 25,495 L 420,495 L 455,520 L 620,520"
                  stroke="#9CA3AF"
                  strokeWidth="1.2"
                  opacity="0.5"
                />
              </svg>
            </div>

            {/* Video Container */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "440px",
                maxWidth: "470px",
                borderRadius: "6px",
                overflow: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 20px 40px -10px rgba(0,0,0,0.25)",
                border: "1px solid rgba(156, 163, 175, 0.4)",
                backgroundColor: "rgba(0,0,0,0.05)",
              }}
            >
              <video
                ref={videoRef}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
                src="/bcck.mp4"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
              />

              {/* Subtle Overlay Gradient */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(to top right, rgba(0,0,0,0.2), transparent 60%, rgba(255,255,255,0.1))",
                  pointerEvents: "none",
                }}
              />

              {/* Sci-Fi HUD Corner Marks */}
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  left: "12px",
                  width: "14px",
                  height: "14px",
                  borderTop: "2px solid rgba(255,255,255,0.85)",
                  borderLeft: "2px solid rgba(255,255,255,0.85)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "12px",
                  right: "12px",
                  width: "14px",
                  height: "14px",
                  borderTop: "2px solid rgba(255,255,255,0.85)",
                  borderRight: "2px solid rgba(255,255,255,0.85)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  left: "12px",
                  width: "14px",
                  height: "14px",
                  borderBottom: "2px solid rgba(255,255,255,0.85)",
                  borderLeft: "2px solid rgba(255,255,255,0.85)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "14px",
                  height: "14px",
                  borderBottom: "2px solid rgba(255,255,255,0.85)",
                  borderRight: "2px solid rgba(255,255,255,0.85)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM GRADIENT VIGNETTE (Matches reference dark bottom bar) ── */}
      <div
        style={{
          position: "relative",
          zIndex: 20,
          width: "100%",
          height: "64px",
          background:
            "linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.15) 60%, transparent)",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />
    </div>
  );
}
