"use client";

import React, { useEffect, useRef } from "react";

export default function HeroSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch(() => {});
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <section
      style={{
        width: "100%",
        height: "100vh",
        minHeight: "640px",
        backgroundColor: "#000000",
        color: "#ffffff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        userSelect: "none",
      }}
    >
      {/* ── FULL-SCREEN BACKGROUND VIDEO ── */}
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
          ref={desktopVideoRef}
          className="hidden md:block"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="/desktop.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Mobile Video (< 768px) */}
        <video
          ref={mobileVideoRef}
          className="block md:hidden"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
          src="/bcck.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />

        {/* Contrast Film Overlays */}
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
            d="M 0,38 L 44,38 L 80,72 L 720,72 L 2400,72"
            fill="none"
            stroke="#ffffff"
            strokeWidth={1.2}
            opacity={0.35}
          />
          <path
            d="M 720,72 L 720,96"
            fill="none"
            stroke="#ffffff"
            strokeWidth={1.2}
            opacity={0.35}
          />
        </svg>
      </div>

      {/* ── TOP NAVIGATION (Calibrated) ── */}
      <header
        style={{
          position: "relative",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 56px 8px 56px",
          flexShrink: 0,
        }}
      >
        {/* Pixel Art Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: "translate(36px, -11px)",
          }}
        >
          <a
            href="#"
            className="font-pixel"
            style={{
              fontSize: "28px",
              letterSpacing: "0.14em",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            JAYDEEP
          </a>
        </div>

        {/* Center Nav Links */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "96px",
            fontSize: "15px",
            fontWeight: 500,
            color: "rgba(255, 255, 255, 0.98)",
            transform: "translateY(-12px)",
          }}
        >
          {["About", "Products", "Plans", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: "rgba(255, 255, 255, 0.98)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "rgba(255, 255, 255, 0.98)")
              }
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CONNECT Button */}
        <div
          style={{
            transform: "translate(0px, -9px)",
          }}
        >
          <a
            href="#contact"
            id="nav-connect-btn"
            style={{
              display: "inline-block",
              backgroundColor: "#ffffff",
              color: "#000000",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "11px 35px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              border: "1px solid #ffffff",
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
        <div style={{ maxWidth: "600px", width: "100%" }}>
          {/* Main Headline */}
          <h1
            className="font-chakra"
            style={{
              fontWeight: 700,
              color: "#ffffff",
              fontSize: "clamp(2.8rem, 5.5vw, 4.4rem)",
              letterSpacing: "-0.02em",
              lineHeight: 0.94,
              textTransform: "uppercase",
              margin: "0 0 18px 0",
              textShadow: "0 2px 10px rgba(0,0,0,0.5)",
            }}
          >
            <span style={{ display: "block" }}>AI DRIVEN</span>
            <span style={{ display: "block" }}>SOLUTIONS</span>
          </h1>

          {/* Subtitle */}
          <p
            style={{
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: "0.95rem",
              lineHeight: 1.6,
              maxWidth: "360px",
              margin: "0 0 32px 0",
              fontWeight: 400,
              textShadow: "0 1px 6px rgba(0,0,0,0.6)",
            }}
          >
            transforms your challenges into opportunities with cutting-edge
            innovation.
          </p>

          {/* Chamfered START NOW Button */}
          <div style={{ marginBottom: "40px" }}>
            <a
              href="#projects"
              id="hero-start-now-btn"
              className="font-chakra"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "rgba(10, 14, 20, 0.92)",
                color: "#ffffff",
                fontWeight: 700,
                fontSize: "0.82rem",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "13px 32px",
                clipPath:
                  "polygon(0 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%)",
                border: "1px solid rgba(255, 255, 255, 0.25)",
                textDecoration: "none",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(0,0,0,0.4)",
                backdropFilter: "blur(8px)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = "#ffffff";
                e.currentTarget.style.color = "#000000";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor =
                  "rgba(10, 14, 20, 0.92)";
                e.currentTarget.style.color = "#ffffff";
              }}
            >
              START NOW
            </a>
          </div>

          {/* Stats Section with Divider */}
          <div
            style={{
              paddingTop: "24px",
              borderTop: "1px solid rgba(255, 255, 255, 0.22)",
              display: "flex",
              alignItems: "center",
              gap: "42px",
              maxWidth: "440px",
            }}
          >
            {/* Stat 1: Active Users */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.75)",
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
                    color: "#ffffff",
                    lineHeight: 1,
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  30M
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  active users
                </div>
              </div>
            </div>

            {/* Vertical Divider */}
            <div
              style={{
                height: "36px",
                width: "1px",
                backgroundColor: "rgba(255, 255, 255, 0.25)",
              }}
            />

            {/* Stat 2: Country Served */}
            <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
              <div
                style={{
                  width: "32px",
                  height: "32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "rgba(255, 255, 255, 0.75)",
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
                    color: "#ffffff",
                    lineHeight: 1,
                    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
                  }}
                >
                  56
                </div>
                <div
                  style={{
                    fontSize: "11px",
                    color: "rgba(255, 255, 255, 0.7)",
                    marginTop: "4px",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  country served
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
          background:
            "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0.2) 60%, transparent)",
          pointerEvents: "none",
          flexShrink: 0,
        }}
      />
    </section>
  );
}
