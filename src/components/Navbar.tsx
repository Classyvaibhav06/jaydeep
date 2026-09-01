"use client";

import React, { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        userSelect: "none",
      }}
    >
      {/* ── Optional Glass Backdrop on Scroll ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: isScrolled
            ? isDark
              ? "rgba(3, 7, 12, 0.88)"
              : "rgba(248, 250, 252, 0.88)"
            : "transparent",
          backdropFilter: isScrolled ? "blur(16px)" : "none",
          borderBottom: isScrolled
            ? isDark
              ? "1px solid rgba(255, 255, 255, 0.08)"
              : "1px solid rgba(0, 0, 0, 0.08)"
            : "none",
          transition: "all 0.3s ease",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      {/* ── TOP HUD ANGLED BORDER LINE (Calibrated Vector Cutout) ── */}
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
          {/* Main Angled HUD Shelf Line */}
          <path
            d="M 0,38 L 44,38 L 80,72 L 720,72 L 2400,72"
            fill="none"
            stroke={isDark ? "#ffffff" : "#0F172A"}
            strokeWidth={1.2}
            opacity={isDark ? 0.35 : 0.25}
          />
          {/* Mid Vertical Notch */}
          <path
            d="M 720,72 L 720,96"
            fill="none"
            stroke={isDark ? "#ffffff" : "#0F172A"}
            strokeWidth={1.2}
            opacity={isDark ? 0.35 : 0.25}
          />
        </svg>
      </div>

      {/* ── HEADER CONTENT (Calibrated with SVG HUD Line) ── */}
      <header
        style={{
          position: "relative",
          zIndex: 30,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "24px 56px 8px 56px",
          maxWidth: "1480px",
          margin: "0 auto",
        }}
      >
        {/* Pixel Art Logo (Nestled directly above the HUD step cutout) */}
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
              color: isDark ? "#ffffff" : "#0F172A",
              textDecoration: "none",
              transition: "opacity 0.2s ease",
            }}
          >
            JAYDEEP
          </a>
        </div>

        {/* Center Nav Links (Aligned with horizontal HUD bar) */}
        <nav
          className="hidden md:flex"
          style={{
            alignItems: "center",
            gap: "54px",
            fontSize: "14px",
            fontWeight: 600,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            transform: "translateY(-12px)",
          }}
        >
          {["Skills", "Projects", "Playground", "Experience", "Contact"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                color: isDark ? "rgba(255, 255, 255, 0.85)" : "#334155",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = isDark ? "#ffffff" : "#0F172A")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = isDark
                  ? "rgba(255, 255, 255, 0.85)"
                  : "#334155")
              }
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Right Action Group: Theme Toggle + CONNECT */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            transform: "translate(0px, -9px)",
          }}
        >
          <ThemeToggle />

          <a
            href="#contact"
            id="nav-connect-btn"
            style={{
              display: "inline-block",
              backgroundColor: isDark ? "#ffffff" : "#0F172A",
              color: isDark ? "#000000" : "#ffffff",
              fontWeight: 700,
              fontSize: "13px",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              padding: "9px 30px",
              boxShadow: "0 4px 14px rgba(0,0,0,0.25)",
              border: isDark ? "1px solid #ffffff" : "1px solid #0F172A",
              textDecoration: "none",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "#000000" : "#ffffff";
              e.currentTarget.style.color = isDark ? "#ffffff" : "#000000";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = isDark ? "#ffffff" : "#0F172A";
              e.currentTarget.style.color = isDark ? "#000000" : "#ffffff";
            }}
          >
            CONNECT
          </a>
        </div>
      </header>
    </div>
  );
}
