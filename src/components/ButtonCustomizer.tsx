"use client";

import React, { useState, useEffect, useRef } from "react";

export interface ButtonConfig {
  text: string;
  cutTopLeft: number;
  cutBottomRight: number;
  cutTopRight: number;
  cutBottomLeft: number;
  paddingX: number;
  paddingY: number;
  fontSize: number;
  letterSpacing: number;
  bgColor: string;
  bgOpacity: number;
  borderWidth: number;
  borderColor: string;
  borderOpacity: number;
  textColor: string;
  shadowBlur: number;
  shadowOpacity: number;
}

export const DEFAULT_BTN_CONFIG: ButtonConfig = {
  text: "START NOW",
  cutTopLeft: 14,
  cutBottomRight: 14,
  cutTopRight: 0,
  cutBottomLeft: 0,
  paddingX: 34,
  paddingY: 14,
  fontSize: 13,
  letterSpacing: 0.14,
  bgColor: "#0B0E14",
  bgOpacity: 0.95,
  borderWidth: 1.2,
  borderColor: "#ffffff",
  borderOpacity: 0.3,
  textColor: "#ffffff",
  shadowBlur: 20,
  shadowOpacity: 0.4,
};

export function ButtonCustomizer({
  config,
  onChange,
}: {
  config: ButtonConfig;
  onChange: (cfg: ButtonConfig) => void;
}) {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const update = (key: keyof ButtonConfig, val: any) => {
    onChange({ ...config, [key]: val });
  };

  const copyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(config, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        zIndex: 9999,
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "absolute",
          bottom: isOpen ? "calc(100% + 10px)" : "0",
          right: "0",
          backgroundColor: "#3B82F6",
          color: "#fff",
          fontWeight: 600,
          fontSize: "12px",
          padding: "8px 16px",
          borderRadius: "8px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 4px 14px rgba(0,0,0,0.5)",
          display: "flex",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <span>⚙</span>
        <span>{isOpen ? "Hide Button Controls" : "Adjust Button Controls"}</span>
      </button>

      {isOpen && (
        <div
          style={{
            width: "360px",
            maxHeight: "80vh",
            overflowY: "auto",
            backgroundColor: "rgba(15, 23, 42, 0.96)",
            backdropFilter: "blur(16px)",
            border: "1px solid rgba(255, 255, 255, 0.18)",
            borderRadius: "12px",
            padding: "20px",
            color: "#e2e8f0",
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
            fontSize: "13px",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
              paddingBottom: "10px",
              borderBottom: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <span style={{ fontWeight: 700, fontSize: "14px", color: "#60A5FA" }}>
              45° Button Customizer
            </span>
            <button
              onClick={copyJSON}
              style={{
                backgroundColor: copied ? "#10B981" : "#2563EB",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                padding: "4px 10px",
                fontSize: "11px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {copied ? "✓ Copied!" : "Copy JSON"}
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
            {/* Button Text */}
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#94a3b8", marginBottom: "4px" }}>
                Button Text
              </label>
              <input
                type="text"
                value={config.text}
                onChange={(e) => update("text", e.target.value)}
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  borderRadius: "6px",
                  padding: "6px 10px",
                  color: "#fff",
                  fontSize: "12px",
                }}
              />
            </div>

            {/* Exact 45° Chamfer Cut Sliders */}
            <div style={{ padding: "10px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase" }}>
                  45° Chamfer Cuts (Exact Pixels)
                </span>
                <span style={{ fontSize: "10px", color: "#10B981", fontWeight: 600 }}>45° Locked</span>
              </div>

              <div style={{ marginTop: "8px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Top-Left:</span>
                    <span>{config.cutTopLeft}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.cutTopLeft}
                    onChange={(e) => update("cutTopLeft", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Top-Right:</span>
                    <span>{config.cutTopRight}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.cutTopRight}
                    onChange={(e) => update("cutTopRight", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Bottom-Left:</span>
                    <span>{config.cutBottomLeft}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.cutBottomLeft}
                    onChange={(e) => update("cutBottomLeft", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Bottom-Right:</span>
                    <span>{config.cutBottomRight}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={config.cutBottomRight}
                    onChange={(e) => update("cutBottomRight", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Outline / Border Controls */}
            <div style={{ padding: "10px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase" }}>
                Border / Outline
              </span>

              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Border Width:</span>
                    <span>{config.borderWidth}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.2"
                    value={config.borderWidth}
                    onChange={(e) => update("borderWidth", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Border Opacity:</span>
                    <span>{Math.round(config.borderOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.02"
                    value={config.borderOpacity}
                    onChange={(e) => update("borderOpacity", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>Border Color:</span>
                  <input
                    type="color"
                    value={config.borderColor}
                    onChange={(e) => update("borderColor", e.target.value)}
                    style={{ cursor: "pointer", background: "none", border: "none", width: "32px", height: "24px" }}
                  />
                </div>
              </div>
            </div>

            {/* Background & Shadow Controls */}
            <div style={{ padding: "10px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase" }}>
                Background & Glow
              </span>

              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "11px", color: "#94a3b8" }}>BG Color:</span>
                  <input
                    type="color"
                    value={config.bgColor}
                    onChange={(e) => update("bgColor", e.target.value)}
                    style={{ cursor: "pointer", background: "none", border: "none", width: "32px", height: "24px" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>BG Opacity:</span>
                    <span>{Math.round(config.bgOpacity * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.05"
                    value={config.bgOpacity}
                    onChange={(e) => update("bgOpacity", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Shadow Blur:</span>
                    <span>{config.shadowBlur}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={config.shadowBlur}
                    onChange={(e) => update("shadowBlur", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Padding & Typography */}
            <div style={{ padding: "10px", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "8px" }}>
              <span style={{ fontSize: "11px", fontWeight: 700, color: "#93c5fd", textTransform: "uppercase" }}>
                Padding & Typography
              </span>

              <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "8px" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Padding X (Horizontal):</span>
                    <span>{config.paddingX}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="60"
                    value={config.paddingX}
                    onChange={(e) => update("paddingX", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Padding Y (Vertical):</span>
                    <span>{config.paddingY}px</span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="30"
                    value={config.paddingY}
                    onChange={(e) => update("paddingY", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Font Size:</span>
                    <span>{config.fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min="9"
                    max="22"
                    value={config.fontSize}
                    onChange={(e) => update("fontSize", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "11px", color: "#94a3b8" }}>
                    <span>Letter Spacing:</span>
                    <span>{config.letterSpacing}em</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="0.35"
                    step="0.01"
                    value={config.letterSpacing}
                    onChange={(e) => update("letterSpacing", Number(e.target.value))}
                    style={{ width: "100%" }}
                  />
                </div>
              </div>
            </div>

            {/* Reset Defaults */}
            <button
              onClick={() => onChange(DEFAULT_BTN_CONFIG)}
              style={{
                backgroundColor: "rgba(255,255,255,0.08)",
                color: "#94a3b8",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px",
                padding: "6px 12px",
                fontSize: "11px",
                cursor: "pointer",
              }}
            >
              Reset to Defaults
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Precision Dynamic Button with EXACT 45-Degree Pixel Geometry (dx == dy)
 */
export function DynamicAdjustableButton({
  config,
  href = "#skills",
  className = "",
}: {
  config: ButtonConfig;
  href?: string;
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 160, h: 48 });

  const {
    text,
    cutTopLeft,
    cutBottomRight,
    cutTopRight,
    cutBottomLeft,
    paddingX,
    paddingY,
    fontSize,
    letterSpacing,
    bgColor,
    bgOpacity,
    borderWidth,
    borderColor,
    borderOpacity,
    textColor,
    shadowBlur,
    shadowOpacity,
  } = config;

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        setDims({ w: rect.width, h: rect.height });
      }
    }
  }, [paddingX, paddingY, fontSize, letterSpacing, text]);

  // Convert hex + opacity to rgba
  const hexToRgba = (hex: string, alpha: number) => {
    let c = hex.replace("#", "");
    if (c.length === 3) c = c.split("").map((x) => x + x).join("");
    const num = parseInt(c, 16);
    const r = (num >> 16) & 255;
    const g = (num >> 8) & 255;
    const b = num & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  const currentBg = hexToRgba(bgColor, isHovered ? Math.min(1, bgOpacity + 0.15) : bgOpacity);
  const currentBorder = hexToRgba(
    borderColor,
    isHovered ? Math.min(1, borderOpacity + 0.3) : borderOpacity
  );

  const { w, h } = dims;

  // Exact 45-degree pixel path coordinates
  // Top-Left cut: (cutTopLeft, 0) to (0, cutTopLeft) -> exactly 45 deg!
  // Top-Right cut: (w - cutTopRight, 0) to (w, cutTopRight) -> exactly 45 deg!
  // Bottom-Right cut: (w, h - cutBottomRight) to (w - cutBottomRight, h) -> exactly 45 deg!
  // Bottom-Left cut: (cutBottomLeft, h) to (0, h - cutBottomLeft) -> exactly 45 deg!
  const pathData = `
    M ${cutTopLeft},0 
    L ${w - cutTopRight},0 
    L ${w},${cutTopRight} 
    L ${w},${h - cutBottomRight} 
    L ${w - cutBottomRight},${h} 
    L ${cutBottomLeft},${h} 
    L 0,${h - cutBottomLeft} 
    L 0,${cutTopLeft} 
    Z
  `;

  return (
    <a
      ref={containerRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`font-chakra select-none ${className}`}
      style={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: `${paddingY}px ${paddingX}px`,
        textDecoration: "none",
        cursor: "pointer",
        transition: "transform 0.15s ease, filter 0.2s ease",
        transform: isHovered ? "translateY(-1px)" : "translateY(0)",
        filter: isHovered ? "brightness(1.15)" : "none",
        boxShadow: `0 4px ${shadowBlur}px rgba(0,0,0,${shadowOpacity})`,
      }}
    >
      {/* ── True 45° Pixel SVG Polygon Vector Background ── */}
      <svg
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          overflow: "visible",
          pointerEvents: "none",
        }}
      >
        <path
          d={pathData}
          fill={currentBg}
          stroke={currentBorder}
          strokeWidth={borderWidth}
          strokeLinejoin="miter"
        />
      </svg>

      {/* ── Button Label ── */}
      <span
        style={{
          position: "relative",
          zIndex: 2,
          color: textColor,
          fontWeight: 700,
          fontSize: `${fontSize}px`,
          letterSpacing: `${letterSpacing}em`,
          textTransform: "uppercase",
          lineHeight: 1,
          pointerEvents: "none",
        }}
      >
        {text}
      </span>
    </a>
  );
}
