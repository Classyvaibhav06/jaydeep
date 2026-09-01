"use client";

import React, { useEffect, useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [activeTab, setActiveTab] = useState<
    "config" | "skills" | "projects" | "experiences" | "inquiries"
  >("config");

  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Form states
  const [config, setConfig] = useState({
    headline: "MACHINE LEARNING & AI SYSTEMS",
    subheadline:
      "Architecting high-throughput neural models, autonomous LLM pipelines, and ultra-low-latency distributed inference engines.",
    cta_text: "EXPLORE MODELS",
    cta_link: "#skills",
    stat1_value: "25M+",
    stat1_label: "Daily Inferences",
    stat2_value: "< 38ms",
    stat2_label: "P99 Inference Latency",
  });

  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Check auth status on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/admin/auth");
      const data = await res.json();
      setIsAuthenticated(data.authenticated);
      if (data.authenticated) {
        fetchData();
      }
    } catch {
      setIsAuthenticated(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (data.success) {
        setIsAuthenticated(true);
        fetchData();
      } else {
        setAuthError(data.error || "Incorrect password");
      }
    } catch (err: any) {
      setAuthError(err.message || "Failed to log in");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setIsAuthenticated(false);
  };

  const fetchData = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/data");
      const data = await res.json();
      if (data.config) {
        setConfig(data.config);
      }
      setSkills(data.skills || []);
      setProjects(data.projects || []);
      setExperiences(data.experiences || []);
      setInquiries(data.inquiries || []);
    } catch (err) {
      console.error("Failed to load portfolio data", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaveStatus("Saving config to Neon DB...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "update_config",
          data: config,
        }),
      });
      if (res.ok) {
        setSaveStatus("Config saved successfully!");
        setTimeout(() => setSaveStatus(null), 3000);
      }
    } catch {
      setSaveStatus("Failed to save config");
    }
  };

  // ── Login Screen ──
  if (isAuthenticated === false || isAuthenticated === null) {
    return (
      <div
        style={{
          minHeight: "100vh",
          backgroundColor: "#03070C",
          color: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          fontFamily: "var(--font-inter), sans-serif",
          userSelect: "none",
        }}
      >
        <div
          style={{
            maxWidth: "420px",
            width: "100%",
            backgroundColor: "rgba(10, 16, 26, 0.9)",
            border: "1px solid rgba(255, 255, 255, 0.15)",
            padding: "36px",
            clipPath:
              "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
            boxShadow: "0 15px 40px rgba(0,0,0,0.8)",
          }}
        >
          <div
            className="font-pixel"
            style={{
              fontSize: "12px",
              color: "#38BDF8",
              letterSpacing: "0.15em",
              marginBottom: "8px",
            }}
          >
            // SYSTEM ADMIN ACCESS
          </div>
          <h1
            className="font-chakra"
            style={{
              fontSize: "1.8rem",
              fontWeight: 700,
              margin: "0 0 8px 0",
              color: "#ffffff",
            }}
          >
            JAYDEEP CONTROL HUB
          </h1>
          <p
            style={{
              fontSize: "0.85rem",
              color: "#9CA3AF",
              marginBottom: "24px",
              lineHeight: 1.5,
            }}
          >
            Enter your root password to dynamically configure models, skills, and
            telemetry.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div>
              <label
                style={{
                  display: "block",
                  fontSize: "10px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  color: "#9CA3AF",
                  marginBottom: "6px",
                  letterSpacing: "0.08em",
                }}
              >
                Root Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password..."
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.05)",
                  border: "1px solid rgba(255, 255, 255, 0.2)",
                  padding: "10px 14px",
                  color: "#ffffff",
                  fontSize: "14px",
                  borderRadius: "4px",
                  outline: "none",
                }}
              />
            </div>

            {authError && (
              <div
                style={{
                  color: "#EF4444",
                  fontSize: "12px",
                  backgroundColor: "rgba(239, 68, 68, 0.1)",
                  padding: "8px 12px",
                  borderRadius: "4px",
                  border: "1px solid rgba(239, 68, 68, 0.25)",
                }}
              >
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="font-pixel"
              style={{
                backgroundColor: "#ffffff",
                color: "#000000",
                fontWeight: 700,
                fontSize: "12px",
                letterSpacing: "0.1em",
                padding: "12px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
                marginTop: "8px",
                transition: "all 0.2s ease",
              }}
            >
              AUTHENTICATE →
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ── Dashboard View ──
  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#02050A",
        color: "#ffffff",
        padding: "32px 48px",
        fontFamily: "var(--font-inter), sans-serif",
      }}
    >
      {/* Top Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: "20px",
          borderBottom: "1px solid rgba(255, 255, 255, 0.12)",
          marginBottom: "32px",
          flexWrap: "wrap",
          gap: "16px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <span
            className="font-pixel"
            style={{ fontSize: "22px", color: "#ffffff", letterSpacing: "0.12em" }}
          >
            JAYDEEP // ADMIN HUB
          </span>
          <span
            style={{
              fontSize: "10px",
              backgroundColor: "rgba(16, 185, 129, 0.15)",
              color: "#10B981",
              border: "1px solid #10B981",
              padding: "2px 8px",
              borderRadius: "2px",
              fontWeight: 700,
            }}
          >
            ● NEON DB SYNCED
          </span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <a
            href="/"
            target="_blank"
            style={{
              fontSize: "12px",
              color: "#9CA3AF",
              textDecoration: "none",
              padding: "8px 14px",
              backgroundColor: "rgba(255, 255, 255, 0.05)",
              border: "1px solid rgba(255, 255, 255, 0.15)",
              borderRadius: "4px",
            }}
          >
            VIEW LIVE SITE ↗
          </a>
          <button
            onClick={handleLogout}
            style={{
              fontSize: "12px",
              color: "#EF4444",
              backgroundColor: "rgba(239, 68, 68, 0.1)",
              border: "1px solid rgba(239, 68, 68, 0.3)",
              padding: "8px 14px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            LOGOUT
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <div
        style={{
          display: "flex",
          gap: "8px",
          marginBottom: "32px",
          flexWrap: "wrap",
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          paddingBottom: "14px",
        }}
      >
        {[
          { id: "config", label: "⚡ HERO & TELEMETRY" },
          { id: "skills", label: "🛠️ SKILLS MATRIX" },
          { id: "projects", label: "🚀 PROJECTS" },
          { id: "experiences", label: "📈 CAREER TRACK" },
          { id: "inquiries", label: `📬 INBOX (${inquiries.length})` },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className="font-pixel"
            style={{
              backgroundColor:
                activeTab === tab.id
                  ? "rgba(56, 189, 248, 0.15)"
                  : "rgba(255, 255, 255, 0.03)",
              color: activeTab === tab.id ? "#38BDF8" : "#9CA3AF",
              border:
                activeTab === tab.id
                  ? "1px solid #38BDF8"
                  : "1px solid rgba(255, 255, 255, 0.1)",
              padding: "8px 16px",
              fontSize: "11px",
              cursor: "pointer",
              borderRadius: "4px",
              letterSpacing: "0.06em",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content: Hero & General Config */}
      {activeTab === "config" && (
        <div
          style={{
            backgroundColor: "rgba(10, 16, 26, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            padding: "32px",
            maxWidth: "800px",
          }}
        >
          <h2 className="font-chakra" style={{ fontSize: "1.4rem", marginBottom: "20px" }}>
            HERO SECTION &amp; LIVE TELEMETRY
          </h2>

          <form onSubmit={handleSaveConfig} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                MAIN HEADLINE
              </label>
              <input
                type="text"
                value={config.headline}
                onChange={(e) => setConfig({ ...config, headline: e.target.value })}
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "10px 14px",
                  color: "#ffffff",
                  borderRadius: "4px",
                }}
              />
            </div>

            <div>
              <label style={{ display: "block", fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                SUBTITLE / DESCRIPTION
              </label>
              <textarea
                rows={3}
                value={config.subheadline}
                onChange={(e) => setConfig({ ...config, subheadline: e.target.value })}
                style={{
                  width: "100%",
                  backgroundColor: "rgba(255, 255, 255, 0.04)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  padding: "10px 14px",
                  color: "#ffffff",
                  borderRadius: "4px",
                  resize: "vertical",
                }}
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                  STAT 1 VALUE
                </label>
                <input
                  type="text"
                  value={config.stat1_value}
                  onChange={(e) => setConfig({ ...config, stat1_value: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    padding: "10px 14px",
                    color: "#ffffff",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                  STAT 1 LABEL
                </label>
                <input
                  type="text"
                  value={config.stat1_label}
                  onChange={(e) => setConfig({ ...config, stat1_label: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    padding: "10px 14px",
                    color: "#ffffff",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                  STAT 2 VALUE
                </label>
                <input
                  type="text"
                  value={config.stat2_value}
                  onChange={(e) => setConfig({ ...config, stat2_value: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    padding: "10px 14px",
                    color: "#ffffff",
                    borderRadius: "4px",
                  }}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                  STAT 2 LABEL
                </label>
                <input
                  type="text"
                  value={config.stat2_label}
                  onChange={(e) => setConfig({ ...config, stat2_label: e.target.value })}
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                    padding: "10px 14px",
                    color: "#ffffff",
                    borderRadius: "4px",
                  }}
                />
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
              <button
                type="submit"
                className="font-pixel"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                SAVE CHANGES TO NEON DB →
              </button>

              {saveStatus && (
                <span style={{ fontSize: "12px", color: "#10B981" }}>{saveStatus}</span>
              )}
            </div>
          </form>
        </div>
      )}

      {/* Tab Content: Inbox / Transmission Logs */}
      {activeTab === "inquiries" && (
        <div
          style={{
            backgroundColor: "rgba(10, 16, 26, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            padding: "32px",
          }}
        >
          <h2 className="font-chakra" style={{ fontSize: "1.4rem", marginBottom: "20px" }}>
            TRANSMISSION INBOX
          </h2>

          {inquiries.length === 0 ? (
            <div style={{ color: "#9CA3AF", fontSize: "13px" }}>
              No inquiries received yet. Any messages dispatched from the website contact form will appear here.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {inquiries.map((inq) => (
                <div
                  key={inq.id}
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.03)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                    borderRadius: "4px",
                    padding: "18px 20px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span style={{ fontWeight: 700, color: "#38BDF8", fontSize: "14px" }}>
                      {inq.name} ({inq.email})
                    </span>
                    <span style={{ fontSize: "11px", color: "#9CA3AF" }}>
                      {new Date(inq.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#ffffff", fontWeight: 600, marginBottom: "4px" }}>
                    Subject: {inq.subject}
                  </div>
                  <div style={{ fontSize: "13px", color: "#D1D5DB", lineHeight: 1.5 }}>
                    {inq.message}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab Content: Skills Matrix */}
      {activeTab === "skills" && (
        <div
          style={{
            backgroundColor: "rgba(10, 16, 26, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            padding: "32px",
          }}
        >
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <h2 className="font-chakra" style={{ fontSize: "1.4rem", margin: 0 }}>
              TECHNICAL ARSENAL MANAGEMENT
            </h2>
          </div>
          <p style={{ color: "#9CA3AF", fontSize: "13px", marginBottom: "20px" }}>
            Manage skills, proficiency percentages, and category groupings stored in Neon Database.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px" }}>
            {skills.map((s) => (
              <div
                key={s.id}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  padding: "16px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                  <span style={{ fontWeight: 700, color: "#ffffff" }}>{s.name}</span>
                  <span style={{ color: "#38BDF8", fontWeight: 700 }}>{s.level}%</span>
                </div>
                <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "8px" }}>
                  {s.category} · {s.code}
                </div>
                <div style={{ fontSize: "12px", color: "#D1D5DB" }}>{s.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Projects */}
      {activeTab === "projects" && (
        <div
          style={{
            backgroundColor: "rgba(10, 16, 26, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            padding: "32px",
          }}
        >
          <h2 className="font-chakra" style={{ fontSize: "1.4rem", marginBottom: "16px" }}>
            FLAGSHIP PROJECTS &amp; MODELS
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px" }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  padding: "18px",
                }}
              >
                <div style={{ fontWeight: 700, color: "#ffffff", fontSize: "1.1rem", marginBottom: "4px" }}>
                  {p.title}
                </div>
                <div style={{ fontSize: "11px", color: "#38BDF8", marginBottom: "8px" }}>
                  {p.codename} · {p.category}
                </div>
                <div style={{ fontSize: "12px", color: "#D1D5DB" }}>{p.tagline}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab Content: Experiences */}
      {activeTab === "experiences" && (
        <div
          style={{
            backgroundColor: "rgba(10, 16, 26, 0.8)",
            border: "1px solid rgba(255, 255, 255, 0.12)",
            borderRadius: "6px",
            padding: "32px",
          }}
        >
          <h2 className="font-chakra" style={{ fontSize: "1.4rem", marginBottom: "16px" }}>
            CAREER &amp; RESEARCH MILESTONES
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: "rgba(255, 255, 255, 0.03)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "4px",
                  padding: "18px 20px",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1.1rem" }}>
                    {exp.role}
                  </span>
                  <span style={{ fontSize: "11px", color: "#C4B5FD" }}>{exp.period}</span>
                </div>
                <div style={{ fontSize: "12px", color: "#9CA3AF", margin: "4px 0 8px 0" }}>
                  {exp.company} · {exp.location}
                </div>
                <div style={{ fontSize: "13px", color: "#D1D5DB" }}>{exp.overview}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
