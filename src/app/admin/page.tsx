"use client";

import React, { useEffect, useState } from "react";

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
    video_opacity_dark: 1.0,
    video_opacity_light: 0.9,
  });

  const [skills, setSkills] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);

  // Editing modals / state
  const [editingSkill, setEditingSkill] = useState<any | null>(null);
  const [editingProject, setEditingProject] = useState<any | null>(null);
  const [editingExp, setEditingExp] = useState<any | null>(null);

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

  const showNotification = (msg: string) => {
    setSaveStatus(msg);
    setTimeout(() => setSaveStatus(null), 3500);
  };

  // ── Save Hero Config ──
  const handleSaveConfig = async (e: React.FormEvent) => {
    e.preventDefault();
    showNotification("Saving config to Neon DB...");
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
        showNotification("✓ Hero config saved to Neon DB!");
      }
    } catch {
      showNotification("Failed to save config");
    }
  };

  // ── Skill Actions ──
  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;
    showNotification("Saving skill to Neon DB...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert_skill",
          data: editingSkill,
        }),
      });
      if (res.ok) {
        showNotification("✓ Skill updated successfully!");
        setEditingSkill(null);
        fetchData();
      }
    } catch {
      showNotification("Failed to save skill");
    }
  };

  const handleDeleteSkill = async (id: string) => {
    if (!confirm("Are you sure you want to delete this skill?")) return;
    showNotification("Deleting skill...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_skill", id }),
      });
      if (res.ok) {
        showNotification("✓ Skill deleted");
        fetchData();
      }
    } catch {
      showNotification("Failed to delete skill");
    }
  };

  // ── Project Actions ──
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;
    showNotification("Saving project to Neon DB...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert_project",
          data: editingProject,
        }),
      });
      if (res.ok) {
        showNotification("✓ Project saved to Neon DB!");
        setEditingProject(null);
        fetchData();
      }
    } catch {
      showNotification("Failed to save project");
    }
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    showNotification("Deleting project...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_project", id }),
      });
      if (res.ok) {
        showNotification("✓ Project deleted");
        fetchData();
      }
    } catch {
      showNotification("Failed to delete project");
    }
  };

  // ── Experience Actions ──
  const handleSaveExperience = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    showNotification("Saving experience to Neon DB...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "upsert_experience",
          data: editingExp,
        }),
      });
      if (res.ok) {
        showNotification("✓ Experience milestone saved!");
        setEditingExp(null);
        fetchData();
      }
    } catch {
      showNotification("Failed to save experience");
    }
  };

  const handleDeleteExperience = async (id: string) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    showNotification("Deleting experience...");
    try {
      const res = await fetch("/api/admin/data", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete_experience", id }),
      });
      if (res.ok) {
        showNotification("✓ Experience deleted");
        fetchData();
      }
    } catch {
      showNotification("Failed to delete experience");
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
            backgroundColor: "rgba(10, 16, 26, 0.95)",
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

          {saveStatus && (
            <span style={{ fontSize: "12px", color: "#38BDF8", fontWeight: 600 }}>
              {saveStatus}
            </span>
          )}
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
          { id: "skills", label: `🛠️ SKILLS MATRIX (${skills.length})` },
          { id: "projects", label: `🚀 PROJECTS (${projects.length})` },
          { id: "experiences", label: `📈 CAREER TRACK (${experiences.length})` },
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

      {/* ── TAB 1: HERO & GENERAL CONFIG ── */}
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

            {/* ── Background Video Opacity Controls ── */}
            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.03)",
                border: "1px solid rgba(56, 189, 248, 0.2)",
                borderRadius: "6px",
                padding: "20px",
                display: "flex",
                flexDirection: "column",
                gap: "18px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span className="font-chakra" style={{ fontSize: "1rem", color: "#38BDF8", fontWeight: 700 }}>
                  🎥 HERO BACKGROUND VIDEO OPACITY
                </span>
                <span style={{ fontSize: "10px", color: "#9CA3AF" }}>
                  REAL-TIME CONTROLS
                </span>
              </div>

              {/* Dark Mode Video Opacity */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#E2E8F0", fontWeight: 600 }}>
                    🌙 Dark Mode Video Opacity
                  </label>
                  <span style={{ fontSize: "12px", color: "#38BDF8", fontWeight: 700 }}>
                    {Math.round((Number(config.video_opacity_dark) ?? 1) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={config.video_opacity_dark ?? 1.0}
                  onChange={(e) =>
                    setConfig({ ...config, video_opacity_dark: parseFloat(e.target.value) })
                  }
                  style={{ width: "100%", accentColor: "#38BDF8", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#64748B", marginTop: "2px" }}>
                  <span>5% (Subtle / Dark)</span>
                  <span>50%</span>
                  <span>100% (Full Brightness)</span>
                </div>
              </div>

              {/* Light Mode Video Opacity */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
                  <label style={{ fontSize: "11px", color: "#E2E8F0", fontWeight: 600 }}>
                    ☀️ Light Mode Video Opacity
                  </label>
                  <span style={{ fontSize: "12px", color: "#38BDF8", fontWeight: 700 }}>
                    {Math.round((Number(config.video_opacity_light) ?? 0.9) * 100)}%
                  </span>
                </div>
                <input
                  type="range"
                  min="0.05"
                  max="1.0"
                  step="0.05"
                  value={config.video_opacity_light ?? 0.9}
                  onChange={(e) =>
                    setConfig({ ...config, video_opacity_light: parseFloat(e.target.value) })
                  }
                  style={{ width: "100%", accentColor: "#38BDF8", cursor: "pointer" }}
                />
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "9px", color: "#64748B", marginTop: "2px" }}>
                  <span>5% (Light Tint)</span>
                  <span>50%</span>
                  <span>100% (Crisp Clear)</span>
                </div>
              </div>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginTop: "12px" }}>
              <button
                type="submit"
                className="font-pixel"
                style={{
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  padding: "10px 24px",
                  borderRadius: "4px",
                  fontSize: "11px",
                  fontWeight: 700,
                  cursor: "pointer",
                  border: "none",
                }}
              >
                SAVE TO NEON DB →
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ── TAB 2: SKILLS MATRIX ── */}
      {activeTab === "skills" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 className="font-chakra" style={{ fontSize: "1.4rem", margin: "0 0 4px 0" }}>
                TECHNICAL ARSENAL MANAGEMENT
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "13px", margin: 0 }}>
                Manage skills, proficiency percentages, and category groupings.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingSkill({
                  id: "",
                  name: "",
                  level: 90,
                  category: "ai",
                  code: "AI-NEW // TECH",
                  tagline: "",
                  tags: "PyTorch, CUDA",
                  sort_order: skills.length + 1,
                })
              }
              className="font-pixel"
              style={{
                backgroundColor: "#38BDF8",
                color: "#000000",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
              }}
            >
              + ADD NEW SKILL
            </button>
          </div>

          {/* Skill Edit / Create Modal Form */}
          {editingSkill && (
            <div
              style={{
                backgroundColor: "rgba(14, 22, 36, 0.95)",
                border: "1px solid #38BDF8",
                borderRadius: "6px",
                padding: "24px",
                marginBottom: "28px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
              }}
            >
              <h3 className="font-chakra" style={{ fontSize: "1.2rem", marginBottom: "16px", color: "#38BDF8" }}>
                {editingSkill.id ? "EDIT SKILL" : "CREATE NEW SKILL"}
              </h3>
              <form onSubmit={handleSaveSkill} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Skill Name
                  </label>
                  <input
                    type="text"
                    required
                    value={editingSkill.name}
                    onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Proficiency ({editingSkill.level}%)
                  </label>
                  <input
                    type="range"
                    min={1}
                    max={100}
                    value={editingSkill.level}
                    onChange={(e) => setEditingSkill({ ...editingSkill, level: Number(e.target.value) })}
                    style={{ width: "100%", accentColor: "#38BDF8" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={editingSkill.category}
                    onChange={(e) => setEditingSkill({ ...editingSkill, category: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#0E1624", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  >
                    <option value="frontend">Frontend & UI</option>
                    <option value="ai">AI & Intelligence</option>
                    <option value="backend">Backend & Data</option>
                    <option value="devops">DevOps & Cloud</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    HUD Code (e.g. AI-01 // CORE)
                  </label>
                  <input
                    type="text"
                    value={editingSkill.code}
                    onChange={(e) => setEditingSkill({ ...editingSkill, code: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Tagline / Description
                  </label>
                  <input
                    type="text"
                    value={editingSkill.tagline}
                    onChange={(e) => setEditingSkill({ ...editingSkill, tagline: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Tags (Comma Separated)
                  </label>
                  <input
                    type="text"
                    value={Array.isArray(editingSkill.tags) ? editingSkill.tags.join(", ") : editingSkill.tags}
                    onChange={(e) => setEditingSkill({ ...editingSkill, tags: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2", display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="submit"
                    className="font-pixel"
                    style={{ backgroundColor: "#38BDF8", color: "#000", padding: "8px 18px", border: "none", borderRadius: "4px", fontWeight: 700, cursor: "pointer", fontSize: "11px" }}
                  >
                    SAVE SKILL →
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingSkill(null)}
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 18px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Skills Grid List */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {skills.map((s) => (
              <div
                key={s.id}
                style={{
                  backgroundColor: "rgba(10, 16, 26, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  padding: "18px 20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "160px",
                }}
              >
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontWeight: 700, color: "#ffffff", fontSize: "1.1rem" }}>{s.name}</span>
                    <span style={{ color: "#38BDF8", fontWeight: 700 }}>{s.level}%</span>
                  </div>
                  <div style={{ fontSize: "11px", color: "#9CA3AF", marginBottom: "6px" }}>
                    {s.category.toUpperCase()} · {s.code}
                  </div>
                  <div style={{ fontSize: "12px", color: "#D1D5DB", lineHeight: 1.4 }}>{s.tagline}</div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", marginTop: "14px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <button
                    onClick={() => setEditingSkill(s)}
                    style={{ backgroundColor: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", border: "1px solid #38BDF8", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", cursor: "pointer" }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteSkill(s.id)}
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", cursor: "pointer" }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 3: PROJECTS ── */}
      {activeTab === "projects" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 className="font-chakra" style={{ fontSize: "1.4rem", margin: "0 0 4px 0" }}>
                FLAGSHIP PROJECTS &amp; MODELS
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "13px", margin: 0 }}>
                Add and manage production systems, metrics, and architecture specs.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingProject({
                  id: "",
                  title: "",
                  codename: "SYS // CORE",
                  category: "llm",
                  tagline: "",
                  description: "",
                  architecture: "DAG pipeline\nVector memory\nContinuous batching",
                  metrics: [
                    { label: "Throughput", value: "300 tok/s" },
                    { label: "Accuracy", value: "98%" },
                    { label: "Latency", value: "< 20ms" },
                  ],
                  tags: "PyTorch, vLLM, FastAPI",
                  github_url: "",
                  live_url: "",
                  featured: true,
                })
              }
              className="font-pixel"
              style={{
                backgroundColor: "#38BDF8",
                color: "#000000",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
              }}
            >
              + ADD NEW PROJECT
            </button>
          </div>

          {/* Project Edit / Create Modal Form */}
          {editingProject && (
            <div
              style={{
                backgroundColor: "rgba(14, 22, 36, 0.95)",
                border: "1px solid #38BDF8",
                borderRadius: "6px",
                padding: "24px",
                marginBottom: "28px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
              }}
            >
              <h3 className="font-chakra" style={{ fontSize: "1.2rem", marginBottom: "16px", color: "#38BDF8" }}>
                {editingProject.id ? "EDIT PROJECT" : "CREATE NEW PROJECT"}
              </h3>
              <form onSubmit={handleSaveProject} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Codename (e.g. SYS-01 // AGENTIC CORE)
                  </label>
                  <input
                    type="text"
                    value={editingProject.codename}
                    onChange={(e) => setEditingProject({ ...editingProject, codename: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Category
                  </label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "#0E1624", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  >
                    <option value="llm">LLM & Agents</option>
                    <option value="vision">Computer Vision</option>
                    <option value="distributed">Distributed ML</option>
                    <option value="fullstack">Full-Stack AI</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Live URL / GitHub URL
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Live Demo URL"
                      value={editingProject.live_url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, live_url: e.target.value })}
                      style={{ flex: 1, padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                    />
                    <input
                      type="text"
                      placeholder="GitHub URL"
                      value={editingProject.github_url || ""}
                      onChange={(e) => setEditingProject({ ...editingProject, github_url: e.target.value })}
                      style={{ flex: 1, padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                    />
                  </div>
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Tagline
                  </label>
                  <input
                    type="text"
                    value={editingProject.tagline}
                    onChange={(e) => setEditingProject({ ...editingProject, tagline: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Architecture Highlights (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingProject.architecture) ? editingProject.architecture.join("\n") : editingProject.architecture}
                    onChange={(e) => setEditingProject({ ...editingProject, architecture: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2", display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="submit"
                    className="font-pixel"
                    style={{ backgroundColor: "#38BDF8", color: "#000", padding: "8px 18px", border: "none", borderRadius: "4px", fontWeight: 700, cursor: "pointer", fontSize: "11px" }}
                  >
                    SAVE PROJECT →
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingProject(null)}
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 18px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Projects Grid List */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "20px" }}>
            {projects.map((p) => (
              <div
                key={p.id}
                style={{
                  backgroundColor: "rgba(10, 16, 26, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  minHeight: "220px",
                }}
              >
                <div>
                  <div style={{ fontSize: "11px", color: "#38BDF8", marginBottom: "4px" }}>
                    {p.codename} · {p.category?.toUpperCase()}
                  </div>
                  <h3 className="font-chakra" style={{ fontSize: "1.2rem", fontWeight: 700, margin: "0 0 8px 0" }}>
                    {p.title}
                  </h3>
                  <p style={{ fontSize: "12px", color: "#9CA3AF", lineHeight: 1.4, margin: "0 0 12px 0" }}>
                    {p.tagline}
                  </p>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", paddingTop: "10px", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <button
                    onClick={() => setEditingProject(p)}
                    style={{ backgroundColor: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", border: "1px solid #38BDF8", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", cursor: "pointer" }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteProject(p.id)}
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", cursor: "pointer" }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 4: EXPERIENCES ── */}
      {activeTab === "experiences" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 className="font-chakra" style={{ fontSize: "1.4rem", margin: "0 0 4px 0" }}>
                CAREER &amp; RESEARCH MILESTONES
              </h2>
              <p style={{ color: "#9CA3AF", fontSize: "13px", margin: 0 }}>
                Manage work history, engineering breakthroughs, and toolchains.
              </p>
            </div>
            <button
              onClick={() =>
                setEditingExp({
                  id: "",
                  role: "Staff / Lead ML Engineer",
                  company: "Autonomous AI Labs",
                  location: "Vancouver, BC / Remote",
                  period: "2024 — PRESENT",
                  badge: "ACTIVE DEPLOYMENT",
                  overview: "Spearheading multi-modal agentic systems and inference optimization.",
                  achievements: "Engineered autonomous agent swarm\nQuantized Llama 3 models\nReduced cloud compute by 60%",
                  technologies: "PyTorch, vLLM, LangChain, Docker",
                })
              }
              className="font-pixel"
              style={{
                backgroundColor: "#38BDF8",
                color: "#000000",
                padding: "8px 16px",
                borderRadius: "4px",
                fontSize: "11px",
                fontWeight: 700,
                cursor: "pointer",
                border: "none",
              }}
            >
              + ADD NEW ROLE
            </button>
          </div>

          {/* Experience Edit / Create Modal Form */}
          {editingExp && (
            <div
              style={{
                backgroundColor: "rgba(14, 22, 36, 0.95)",
                border: "1px solid #38BDF8",
                borderRadius: "6px",
                padding: "24px",
                marginBottom: "28px",
                boxShadow: "0 10px 30px rgba(0,0,0,0.7)",
              }}
            >
              <h3 className="font-chakra" style={{ fontSize: "1.2rem", marginBottom: "16px", color: "#38BDF8" }}>
                {editingExp.id ? "EDIT ROLE" : "CREATE NEW ROLE"}
              </h3>
              <form onSubmit={handleSaveExperience} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Role Title
                  </label>
                  <input
                    type="text"
                    required
                    value={editingExp.role}
                    onChange={(e) => setEditingExp({ ...editingExp, role: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Company &amp; Location
                  </label>
                  <div style={{ display: "flex", gap: "8px" }}>
                    <input
                      type="text"
                      placeholder="Company"
                      value={editingExp.company}
                      onChange={(e) => setEditingExp({ ...editingExp, company: e.target.value })}
                      style={{ flex: 1, padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                    />
                    <input
                      type="text"
                      placeholder="Location"
                      value={editingExp.location}
                      onChange={(e) => setEditingExp({ ...editingExp, location: e.target.value })}
                      style={{ flex: 1, padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Period (e.g. 2024 — PRESENT)
                  </label>
                  <input
                    type="text"
                    value={editingExp.period}
                    onChange={(e) => setEditingExp({ ...editingExp, period: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Badge (e.g. ACTIVE DEPLOYMENT)
                  </label>
                  <input
                    type="text"
                    value={editingExp.badge}
                    onChange={(e) => setEditingExp({ ...editingExp, badge: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Role Overview
                  </label>
                  <textarea
                    rows={2}
                    value={editingExp.overview}
                    onChange={(e) => setEditingExp({ ...editingExp, overview: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2" }}>
                  <label style={{ fontSize: "11px", color: "#9CA3AF", display: "block", marginBottom: "4px" }}>
                    Breakthrough Achievements (One per line)
                  </label>
                  <textarea
                    rows={3}
                    value={Array.isArray(editingExp.achievements) ? editingExp.achievements.join("\n") : editingExp.achievements}
                    onChange={(e) => setEditingExp({ ...editingExp, achievements: e.target.value })}
                    style={{ width: "100%", padding: "8px 12px", backgroundColor: "rgba(0,0,0,0.5)", border: "1px solid rgba(255,255,255,0.15)", color: "#fff", borderRadius: "4px" }}
                  />
                </div>

                <div style={{ gridColumn: "span 2", display: "flex", gap: "10px", marginTop: "10px" }}>
                  <button
                    type="submit"
                    className="font-pixel"
                    style={{ backgroundColor: "#38BDF8", color: "#000", padding: "8px 18px", border: "none", borderRadius: "4px", fontWeight: 700, cursor: "pointer", fontSize: "11px" }}
                  >
                    SAVE ROLE →
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingExp(null)}
                    style={{ backgroundColor: "rgba(255,255,255,0.1)", color: "#fff", padding: "8px 18px", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "11px" }}
                  >
                    CANCEL
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Experiences List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {experiences.map((exp) => (
              <div
                key={exp.id}
                style={{
                  backgroundColor: "rgba(10, 16, 26, 0.8)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                  borderRadius: "6px",
                  padding: "20px 24px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
                    <h3 className="font-chakra" style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>
                      {exp.role}
                    </h3>
                    <span style={{ fontSize: "10px", color: "#38BDF8", backgroundColor: "rgba(56, 189, 248, 0.1)", padding: "2px 6px", borderRadius: "2px" }}>
                      {exp.badge}
                    </span>
                  </div>
                  <div style={{ fontSize: "12px", color: "#9CA3AF", marginBottom: "6px" }}>
                    {exp.company} · {exp.location} · {exp.period}
                  </div>
                  <div style={{ fontSize: "13px", color: "#D1D5DB" }}>{exp.overview}</div>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    onClick={() => setEditingExp(exp)}
                    style={{ backgroundColor: "rgba(56, 189, 248, 0.15)", color: "#38BDF8", border: "1px solid #38BDF8", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", cursor: "pointer" }}
                  >
                    EDIT
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(exp.id)}
                    style={{ backgroundColor: "rgba(239, 68, 68, 0.15)", color: "#EF4444", border: "1px solid #EF4444", padding: "4px 10px", borderRadius: "3px", fontSize: "11px", cursor: "pointer" }}
                  >
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TAB 5: INBOX ── */}
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
    </div>
  );
}
