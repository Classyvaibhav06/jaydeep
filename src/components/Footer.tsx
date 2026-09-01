"use client";

import React from "react";
import ThemeToggle from "@/components/ThemeToggle";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        width: "100%",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        borderTop: "1px solid var(--border-subtle)",
        position: "relative",
        zIndex: 20,
        padding: "40px 56px 48px 56px",
        userSelect: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          display: "flex",
          flexDirection: "column",
          gap: "28px",
        }}
      >
        {/* Top Row: System Status Indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
            paddingBottom: "24px",
            borderBottom: "1px solid var(--border-subtle)",
          }}
        >
          {/* Status Indicators */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "50%",
                  backgroundColor: "#10B981",
                  boxShadow: "0 0 8px #10B981",
                  display: "inline-block",
                }}
              />
              <span
                className="font-pixel"
                style={{
                  fontSize: "11px",
                  color: "var(--text-primary)",
                  letterSpacing: "0.06em",
                }}
              >
                SYSTEM STATUS: 100% OPERATIONAL
              </span>
            </div>

            <div
              className="font-pixel"
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              PING: 18ms · TLS 1.3
            </div>

            <div
              className="font-pixel"
              style={{
                fontSize: "11px",
                color: "var(--text-muted)",
                letterSpacing: "0.06em",
              }}
            >
              HOST: EDGE GLOBAL NODE
            </div>
          </div>

          {/* Action Group: Theme Toggle + Scroll to Top */}
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <ThemeToggle />

            <button
              type="button"
              onClick={scrollToTop}
              className="font-pixel"
              style={{
                backgroundColor: "rgba(128, 128, 128, 0.08)",
                border: "1px solid var(--border-subtle)",
                color: "var(--text-primary)",
                padding: "8px 14px",
                borderRadius: "2px",
                fontSize: "11px",
                letterSpacing: "0.08em",
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-active)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
              }}
            >
              ▲ TOP
            </button>
          </div>
        </div>

        {/* Bottom Row: Logo, Nav Anchor Links, Copyright */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span
              className="font-pixel"
              style={{
                fontSize: "18px",
                letterSpacing: "0.12em",
                color: "var(--text-primary)",
              }}
            >
              JAYDEEP
            </span>
            <span
              style={{
                fontSize: "12px",
                color: "var(--text-muted)",
              }}
            >
              © {new Date().getFullYear()} Machine Learning &amp; AI Systems. All rights reserved.
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
            }}
          >
            {["Skills", "Projects", "Playground", "Experience", "Contact"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                style={{
                  fontSize: "12px",
                  color: "var(--text-muted)",
                  textDecoration: "none",
                  transition: "color 0.15s ease",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text-primary)")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--text-muted)")
                }
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
