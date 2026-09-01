"use client";

import React, { useEffect, useRef, useState } from "react";

// Default configuration for the navbar and HUD line
const DEFAULT_NAV_CONFIG = {
  // Container
  navPaddingTop: 28,
  navPaddingX: 56,
  navHeight: 70,

  // Logo
  logoText: "JAYDEEP",
  logoFontSize: 24,
  logoOffsetY: 0,
  logoOffsetX: 0,

  // HUD Line
  lineY: 68,
  chamferStartX: 44,
  chamferWidth: 36,
  chamferDropY: 34,
  lineOpacity: 0.35,
  lineWidth: 1.2,
  showDropLine: true,
  dropLineX: 720,
  dropLineHeight: 24,

  // Nav Links
  linksOffsetY: 0,
  linksGap: 52,
  linksFontSize: 14,
  linksOpacity: 0.8,

  // Connect Button
  btnText: "CONNECT",
  btnPaddingX: 28,
  btnPaddingY: 10,
  btnFontSize: 13,
  btnOffsetY: 0,
  btnOffsetX: 0,
  btnChamfer: 0, // 0 = sharp, >0 = chamfered
};

export default function HeroSection() {
  const desktopVideoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);

  // Nav Controls State
  const [config, setConfig] = useState(DEFAULT_NAV_CONFIG);
  const [showControls, setShowControls] = useState(false);
  const [activeTab, setActiveTab] = useState<"layout" | "logo" | "hud" | "links" | "button">("hud");
  const [copied, setCopied] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem("jaydeep_nav_config");
      if (saved) {
        setConfig((prev) => ({ ...prev, ...JSON.parse(saved) }));
      }
    } catch {}
  }, []);

  // Save to localStorage
  const updateConfig = (key: keyof typeof DEFAULT_NAV_CONFIG, val: any) => {
    setConfig((prev) => {
      const next = { ...prev, [key]: val };
      try {
        localStorage.setItem("jaydeep_nav_config", JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const resetConfig = () => {
    setConfig(DEFAULT_NAV_CONFIG);
    try {
      localStorage.removeItem("jaydeep_nav_config");
    } catch {}
  };

  const copyConfig = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    if (desktopVideoRef.current) {
      desktopVideoRef.current.play().catch(() => {});
    }
    if (mobileVideoRef.current) {
      mobileVideoRef.current.play().catch(() => {});
    }
  }, []);

  // Dynamic SVG HUD path calculation
  const startX = Number(config.chamferStartX);
  const width = Number(config.chamferWidth);
  const lineY = Number(config.lineY);
  const dropY = Number(config.chamferDropY);
  const topY = lineY - dropY;
  const endAngleX = startX + width;

  const hudPathD = `M 0,${topY} L ${startX},${topY} L ${endAngleX},${lineY} L ${config.dropLineX},${lineY} L 2400,${lineY}`;
  const dropPathD = `M ${config.dropLineX},${lineY} L ${config.dropLineX},${lineY + Number(config.dropLineHeight)}`;

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

        {/* Contrast Overlays */}
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

      {/* ── TOP HUD ANGLED BORDER LINE (Controlled live) ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: `${Math.max(lineY + Number(config.dropLineHeight) + 20, 120)}px`,
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <svg
          style={{ width: "100%", height: "100%" }}
          preserveAspectRatio="none"
          viewBox={`0 0 1440 ${Math.max(lineY + Number(config.dropLineHeight) + 20, 120)}`}
        >
          <path
            d={hudPathD}
            fill="none"
            stroke="#ffffff"
            strokeWidth={config.lineWidth}
            opacity={config.lineOpacity}
          />
          {config.showDropLine && (
            <path
              d={dropPathD}
              fill="none"
              stroke="#ffffff"
              strokeWidth={config.lineWidth}
              opacity={config.lineOpacity}
            />
          )}
        </svg>
      </div>

      {/* ── TOP NAVIGATION (Controlled live) ── */}
      <header
        style={{
          position: "relative",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: `${config.navPaddingTop}px ${config.navPaddingX}px 8px ${config.navPaddingX}px`,
          flexShrink: 0,
        }}
      >
        {/* Pixel Art Logo */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            transform: `translate(${config.logoOffsetX}px, ${config.logoOffsetY}px)`,
            transition: "transform 0.1s ease",
          }}
        >
          <a
            href="#"
            className="font-pixel"
            style={{
              fontSize: `${config.logoFontSize}px`,
              letterSpacing: "0.14em",
              color: "#ffffff",
              textDecoration: "none",
            }}
          >
            {config.logoText}
          </a>
        </div>

        {/* Center Nav Links */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: `${config.linksGap}px`,
            fontSize: `${config.linksFontSize}px`,
            fontWeight: 500,
            color: `rgba(255, 255, 255, ${config.linksOpacity})`,
            transform: `translateY(${config.linksOffsetY}px)`,
            transition: "transform 0.1s ease",
          }}
        >
          {["About", "Products", "Plans", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: `rgba(255, 255, 255, ${config.linksOpacity})`,
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffffff")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = `rgba(255, 255, 255, ${config.linksOpacity})`)
              }
            >
              {item}
            </a>
          ))}
        </nav>

        {/* CONNECT Button */}
        <div
          style={{
            transform: `translate(${config.btnOffsetX}px, ${config.btnOffsetY}px)`,
            transition: "transform 0.1s ease",
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
              fontSize: `${config.btnFontSize}px`,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: `${config.btnPaddingY}px ${config.btnPaddingX}px`,
              boxShadow: "0 4px 14px rgba(0,0,0,0.3)",
              border: "1px solid #ffffff",
              textDecoration: "none",
              clipPath:
                config.btnChamfer > 0
                  ? `polygon(0 0, 100% 0, 100% calc(100% - ${config.btnChamfer}px), calc(100% - ${config.btnChamfer}px) 100%, 0 100%)`
                  : undefined,
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
            {config.btnText}
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
          padding: `0 ${config.navPaddingX}px`,
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

      {/* ═══════════════════════════════════════════════
          🎛️ LIVE NAVBAR CONTROLS DRAWER / PANEL
      ═══════════════════════════════════════════════ */}
      <div
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          zIndex: 9999,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        {/* Toggle Controls Button */}
        <button
          onClick={() => setShowControls(!showControls)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#ffffff",
            color: "#000000",
            padding: "10px 18px",
            borderRadius: "30px",
            fontWeight: 700,
            fontSize: "13px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
            border: "2px solid #000000",
            cursor: "pointer",
            transition: "all 0.2s ease",
          }}
        >
          <span>⚙️</span>
          <span>{showControls ? "Close Controls" : "Adjust Navbar"}</span>
        </button>

        {/* Expanded Controls Modal / Drawer */}
        {showControls && (
          <div
            style={{
              marginTop: "12px",
              width: "360px",
              maxHeight: "80vh",
              backgroundColor: "rgba(18, 22, 30, 0.95)",
              backdropFilter: "blur(16px)",
              borderRadius: "16px",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              boxShadow: "0 20px 50px rgba(0,0,0,0.6)",
              padding: "18px",
              display: "flex",
              flexDirection: "column",
              color: "#ffffff",
              fontSize: "12px",
              overflowY: "auto",
            }}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: "12px",
                borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
                marginBottom: "12px",
              }}
            >
              <span style={{ fontWeight: 700, fontSize: "14px", letterSpacing: "0.05em" }}>
                Navbar Customizer
              </span>
              <div style={{ display: "flex", gap: "6px" }}>
                <button
                  onClick={resetConfig}
                  style={{
                    background: "rgba(255,255,255,0.1)",
                    border: "none",
                    color: "#ccc",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "10px",
                  }}
                >
                  Reset
                </button>
                <button
                  onClick={copyConfig}
                  style={{
                    background: copied ? "#10B981" : "#3B82F6",
                    border: "none",
                    color: "#fff",
                    padding: "4px 8px",
                    borderRadius: "6px",
                    cursor: "pointer",
                    fontSize: "10px",
                    fontWeight: 600,
                  }}
                >
                  {copied ? "Copied!" : "Copy Config"}
                </button>
              </div>
            </div>

            {/* Navigation Tabs */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "4px",
                marginBottom: "16px",
                backgroundColor: "rgba(0,0,0,0.3)",
                padding: "3px",
                borderRadius: "8px",
              }}
            >
              {[
                { id: "hud", label: "HUD Line" },
                { id: "logo", label: "Logo" },
                { id: "links", label: "Links" },
                { id: "button", label: "Button" },
                { id: "layout", label: "Padding" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  style={{
                    padding: "6px 2px",
                    fontSize: "10px",
                    fontWeight: activeTab === tab.id ? 700 : 400,
                    background: activeTab === tab.id ? "#ffffff" : "transparent",
                    color: activeTab === tab.id ? "#000000" : "#9CA3AF",
                    border: "none",
                    borderRadius: "6px",
                    cursor: "pointer",
                    transition: "all 0.15s ease",
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* TAB: HUD Line Controls */}
            {activeTab === "hud" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <SliderControl
                  label="HUD Line Y Position"
                  value={config.lineY}
                  min={20}
                  max={120}
                  unit="px"
                  onChange={(v) => updateConfig("lineY", v)}
                />
                <SliderControl
                  label="Angle Start X Position"
                  value={config.chamferStartX}
                  min={0}
                  max={200}
                  unit="px"
                  onChange={(v) => updateConfig("chamferStartX", v)}
                />
                <SliderControl
                  label="Angle Chamfer Width"
                  value={config.chamferWidth}
                  min={10}
                  max={100}
                  unit="px"
                  onChange={(v) => updateConfig("chamferWidth", v)}
                />
                <SliderControl
                  label="Chamfer Height / Angle Depth"
                  value={config.chamferDropY}
                  min={0}
                  max={60}
                  unit="px"
                  onChange={(v) => updateConfig("chamferDropY", v)}
                />
                <SliderControl
                  label="Line Opacity"
                  value={Math.round(config.lineOpacity * 100)}
                  min={5}
                  max={100}
                  unit="%"
                  onChange={(v) => updateConfig("lineOpacity", v / 100)}
                />
                <SliderControl
                  label="Line Stroke Width"
                  value={config.lineWidth}
                  min={0.5}
                  max={4}
                  step={0.1}
                  unit="px"
                  onChange={(v) => updateConfig("lineWidth", v)}
                />
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                  <span>Show Vertical Drop Line</span>
                  <input
                    type="checkbox"
                    checked={config.showDropLine}
                    onChange={(e) => updateConfig("showDropLine", e.target.checked)}
                  />
                </div>
                {config.showDropLine && (
                  <>
                    <SliderControl
                      label="Drop Line X Position"
                      value={config.dropLineX}
                      min={200}
                      max={1200}
                      unit="px"
                      onChange={(v) => updateConfig("dropLineX", v)}
                    />
                    <SliderControl
                      label="Drop Line Height"
                      value={config.dropLineHeight}
                      min={10}
                      max={80}
                      unit="px"
                      onChange={(v) => updateConfig("dropLineHeight", v)}
                    />
                  </>
                )}
              </div>
            )}

            {/* TAB: Logo Controls */}
            {activeTab === "logo" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", color: "#9CA3AF" }}>
                    Logo Text
                  </label>
                  <input
                    type="text"
                    value={config.logoText}
                    onChange={(e) => updateConfig("logoText", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </div>
                <SliderControl
                  label="Logo Font Size"
                  value={config.logoFontSize}
                  min={14}
                  max={40}
                  unit="px"
                  onChange={(v) => updateConfig("logoFontSize", v)}
                />
                <SliderControl
                  label="Logo Vertical Y-Offset"
                  value={config.logoOffsetY}
                  min={-40}
                  max={40}
                  unit="px"
                  onChange={(v) => updateConfig("logoOffsetY", v)}
                />
                <SliderControl
                  label="Logo Horizontal X-Offset"
                  value={config.logoOffsetX}
                  min={-50}
                  max={100}
                  unit="px"
                  onChange={(v) => updateConfig("logoOffsetX", v)}
                />
              </div>
            )}

            {/* TAB: Links Controls */}
            {activeTab === "links" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <SliderControl
                  label="Links Spacing / Gap"
                  value={config.linksGap}
                  min={16}
                  max={100}
                  unit="px"
                  onChange={(v) => updateConfig("linksGap", v)}
                />
                <SliderControl
                  label="Links Font Size"
                  value={config.linksFontSize}
                  min={10}
                  max={20}
                  unit="px"
                  onChange={(v) => updateConfig("linksFontSize", v)}
                />
                <SliderControl
                  label="Links Vertical Y-Offset"
                  value={config.linksOffsetY}
                  min={-40}
                  max={40}
                  unit="px"
                  onChange={(v) => updateConfig("linksOffsetY", v)}
                />
                <SliderControl
                  label="Links Opacity"
                  value={Math.round(config.linksOpacity * 100)}
                  min={20}
                  max={100}
                  unit="%"
                  onChange={(v) => updateConfig("linksOpacity", v / 100)}
                />
              </div>
            )}

            {/* TAB: Connect Button Controls */}
            {activeTab === "button" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "4px", color: "#9CA3AF" }}>
                    Button Text
                  </label>
                  <input
                    type="text"
                    value={config.btnText}
                    onChange={(e) => updateConfig("btnText", e.target.value)}
                    style={{
                      width: "100%",
                      padding: "6px 10px",
                      borderRadius: "6px",
                      background: "rgba(0,0,0,0.4)",
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "#fff",
                      fontSize: "12px",
                    }}
                  />
                </div>
                <SliderControl
                  label="Padding X (Width)"
                  value={config.btnPaddingX}
                  min={12}
                  max={50}
                  unit="px"
                  onChange={(v) => updateConfig("btnPaddingX", v)}
                />
                <SliderControl
                  label="Padding Y (Height)"
                  value={config.btnPaddingY}
                  min={4}
                  max={24}
                  unit="px"
                  onChange={(v) => updateConfig("btnPaddingY", v)}
                />
                <SliderControl
                  label="Font Size"
                  value={config.btnFontSize}
                  min={10}
                  max={18}
                  unit="px"
                  onChange={(v) => updateConfig("btnFontSize", v)}
                />
                <SliderControl
                  label="Button Cut / Chamfer Corner"
                  value={config.btnChamfer}
                  min={0}
                  max={16}
                  unit="px"
                  onChange={(v) => updateConfig("btnChamfer", v)}
                />
                <SliderControl
                  label="Vertical Y-Offset"
                  value={config.btnOffsetY}
                  min={-30}
                  max={30}
                  unit="px"
                  onChange={(v) => updateConfig("btnOffsetY", v)}
                />
                <SliderControl
                  label="Horizontal X-Offset"
                  value={config.btnOffsetX}
                  min={-50}
                  max={50}
                  unit="px"
                  onChange={(v) => updateConfig("btnOffsetX", v)}
                />
              </div>
            )}

            {/* TAB: Layout Padding Controls */}
            {activeTab === "layout" && (
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <SliderControl
                  label="Navbar Top Padding"
                  value={config.navPaddingTop}
                  min={8}
                  max={60}
                  unit="px"
                  onChange={(v) => updateConfig("navPaddingTop", v)}
                />
                <SliderControl
                  label="Navbar Left/Right Padding"
                  value={config.navPaddingX}
                  min={16}
                  max={120}
                  unit="px"
                  onChange={(v) => updateConfig("navPaddingX", v)}
                />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

/* ── Helper Slider Component ── */
function SliderControl({
  label,
  value,
  min,
  max,
  step = 1,
  unit = "",
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  unit?: string;
  onChange: (val: number) => void;
}) {
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          color: "#9CA3AF",
          fontSize: "11px",
          marginBottom: "4px",
        }}
      >
        <span>{label}</span>
        <span style={{ color: "#ffffff", fontWeight: 600 }}>
          {value}
          {unit}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{
          width: "100%",
          cursor: "pointer",
          accentColor: "#3B82F6",
        }}
      />
    </div>
  );
}
