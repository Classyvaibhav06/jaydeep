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
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: isScrolled ? "14px 48px" : "20px 48px",
        backgroundColor: isScrolled
          ? isDark
            ? "rgba(3, 7, 12, 0.85)"
            : "rgba(248, 250, 252, 0.85)"
          : isDark
          ? "rgba(0, 0, 0, 0.4)"
          : "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(16px)",
        borderBottom: isScrolled
          ? isDark
            ? "1px solid rgba(255, 255, 255, 0.12)"
            : "1px solid rgba(0, 0, 0, 0.1)"
          : "1px solid transparent",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        userSelect: "none",
      }}
    >
      {/* ── Brand Logo ── */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <a
          href="#"
          className="font-pixel"
          style={{
            fontSize: "24px",
            letterSpacing: "0.14em",
            color: "var(--text-primary)",
            textDecoration: "none",
            transition: "opacity 0.2s ease",
          }}
        >
          JAYDEEP
        </a>
      </div>

      {/* ── Center Nav Links ── */}
      <nav
        className="hidden md:flex"
        style={{
          alignItems: "center",
          gap: "48px",
          fontSize: "13px",
          fontWeight: 600,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
        }}
      >
        {["Skills", "Projects", "Playground", "Experience", "Contact"].map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            style={{
              color: "var(--text-secondary)",
              textDecoration: "none",
              transition: "color 0.2s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-secondary)")
            }
          >
            {item}
          </a>
        ))}
      </nav>

      {/* ── Right Action Group: Theme Toggle + CONNECT ── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
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
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            padding: "8px 24px",
            boxShadow: "0 4px 14px rgba(0,0,0,0.2)",
            border: isDark ? "1px solid #ffffff" : "1px solid #0F172A",
            clipPath:
              "polygon(8px 0, 100% 0, 100% calc(100% - 8px), calc(100% - 8px) 100%, 0 100%, 0 8px)",
            textDecoration: "none",
            transition: "all 0.2s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "rgba(255,255,255,0.85)"
              : "#1E293B";
            e.currentTarget.style.transform = "translateY(-1px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = isDark
              ? "#ffffff"
              : "#0F172A";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          CONNECT
        </a>
      </div>
    </header>
  );
}
