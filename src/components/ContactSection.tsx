"use client";

import React, { useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";

export default function ContactSection() {
  const [terminalInput, setTerminalInput] = useState("");
  const [terminalHistory, setTerminalHistory] = useState<
    { command: string; output: string | React.ReactNode }[]
  >([
    {
      command: "sys --status",
      output:
        "[SYS_OK] Machine Learning & AI Systems Node online. Latency: 22ms. Available for engineering leadership & technical advisory.",
    },
    {
      command: "sys --help",
      output:
        "Available commands: 'skills', 'projects', 'experience', 'email', 'hire', 'clear'",
    },
  ]);

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "ML / AI Collaboration",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = terminalInput.trim().toLowerCase();
    if (!cmd) return;

    let output: string | React.ReactNode = "";

    switch (cmd) {
      case "help":
      case "sys --help":
        output =
          "Commands: 'skills' (view tech stack), 'projects' (view deployments), 'experience' (view career track), 'email' (get direct email), 'hire' (request contract), 'clear' (clean console)";
        break;
      case "skills":
        output =
          "[TECH MATRIX] Next.js 16, React 19, PyTorch, vLLM, LangChain, TensorRT, FastAPI, pgvector, Docker, Kubernetes.";
        break;
      case "projects":
        output =
          "[FLAGSHIP SYSTEMS] OmniAgent (Agent Swarm), NeuroVision (Edge SAM), HyperScale (Distributed vLLM), SynthCraft (GenUI Studio).";
        break;
      case "experience":
        output =
          "[RECORD] Lead ML Engineer (2024-Pres) · Sr. AI Engineer (2022-2024) · Deep Learning Engineer (2020-2022).";
        break;
      case "email":
        output = "Direct Encrypted Channel: contact@jaydeep.ai (or use form below)";
        break;
      case "hire":
      case "contact":
        output =
          "Initiating contract channel... Scroll to the encrypted dispatch form or reach out directly at contact@jaydeep.ai.";
        break;
      case "clear":
        setTerminalHistory([]);
        setTerminalInput("");
        return;
      default:
        output = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
        break;
    }

    setTerminalHistory((prev) => [...prev, { command: terminalInput, output }]);
    setTerminalInput("");
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-primary)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
        padding: "110px 56px 130px 56px",
        userSelect: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── Cyber Background Matrix Grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Top HUD Header Angle Line ── */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "60px",
          pointerEvents: "none",
          zIndex: 10,
        }}
      >
        <svg
          style={{ width: "100%", height: "100%" }}
          preserveAspectRatio="none"
          viewBox="0 0 1440 60"
        >
          <path
            d="M 0,30 L 260,30 L 300,55 L 1100,55 L 1440,55"
            fill="none"
            stroke="var(--hud-line)"
            strokeWidth={1.2}
          />
        </svg>
      </div>

      <div
        style={{
          maxWidth: "1440px",
          margin: "0 auto",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* ── Section Header ── */}
        <div style={{ marginBottom: "50px" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginBottom: "14px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: "#10B981",
                boxShadow: "0 0 8px #10B981",
                display: "inline-block",
              }}
            />
            <span
              className="font-pixel"
              style={{
                fontSize: "12px",
                letterSpacing: "0.15em",
                color: "var(--text-muted)",
                textTransform: "uppercase",
              }}
            >
              // 05. TRANSMISSION &amp; INQUIRY
            </span>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <h2
                className="font-chakra"
                style={{
                  fontSize: "clamp(2.4rem, 5vw, 4rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  lineHeight: 0.95,
                  textTransform: "uppercase",
                  color: "var(--text-primary)",
                  margin: 0,
                }}
              >
                <span style={{ display: "block" }}>INITIATE CONTACT &amp;</span>
                <span style={{ display: "block", color: "var(--text-secondary)" }}>
                  COLLABORATION
                </span>
              </h2>
            </div>

            <p
              style={{
                color: "var(--text-muted)",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                maxWidth: "420px",
                margin: 0,
              }}
            >
              Available for full-time Staff/Lead ML engineering roles,
              high-throughput AI system architecture consulting, and research
              advisory.
            </p>
          </div>
        </div>

        {/* ── Two Column Terminal + Dispatch Console ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
            gap: "32px",
            alignItems: "stretch",
          }}
        >
          {/* Left: Interactive CLI Terminal */}
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--bg-card)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border-subtle)",
              padding: "28px",
              clipPath:
                "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5)",
              minHeight: "420px",
            }}
          >
            {/* Corner Bracket Accents */}
            <div
              style={{
                position: "absolute",
                top: "8px",
                left: "16px",
                width: "10px",
                height: "10px",
                borderTop: "1.5px solid var(--border-active)",
                borderLeft: "1.5px solid var(--border-active)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "8px",
                right: "8px",
                width: "10px",
                height: "10px",
                borderTop: "1.5px solid var(--border-active)",
                borderRight: "1.5px solid var(--border-active)",
                pointerEvents: "none",
              }}
            />

            <div>
              {/* Terminal Title Bar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "14px",
                  borderBottom: "1px solid var(--border-subtle)",
                  marginBottom: "18px",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#EF4444",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#F59E0B",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      width: "10px",
                      height: "10px",
                      borderRadius: "50%",
                      backgroundColor: "#10B981",
                      display: "inline-block",
                    }}
                  />
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      marginLeft: "10px",
                      letterSpacing: "0.08em",
                    }}
                  >
                    JAYDEEP_ML_SHELL // v4.2
                  </span>
                </div>

                <span
                  style={{
                    fontSize: "10px",
                    color: "#10B981",
                    fontWeight: 600,
                  }}
                >
                  ● ONLINE
                </span>
              </div>

              {/* Terminal Output Log */}
              <div
                style={{
                  fontFamily: "monospace",
                  fontSize: "13px",
                  lineHeight: 1.6,
                  color: "var(--text-primary)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                  maxHeight: "260px",
                  overflowY: "auto",
                  paddingRight: "6px",
                }}
              >
                {terminalHistory.map((item, idx) => (
                  <div key={idx}>
                    <div style={{ color: "#0284C7" }}>
                      guest@jaydeep.ai:~$ {item.command}
                    </div>
                    <div
                      style={{
                        color: "var(--text-secondary)",
                        marginTop: "2px",
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {item.output}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Command Chips & Interactive Input Form */}
            <div style={{ marginTop: "20px" }}>
              {/* Quick Preset Buttons */}
              <div
                style={{
                  display: "flex",
                  gap: "6px",
                  marginBottom: "12px",
                  flexWrap: "wrap",
                }}
              >
                {["help", "skills", "projects", "email", "clear"].map((cmd) => (
                  <button
                    key={cmd}
                    type="button"
                    onClick={() => {
                      setTerminalInput(cmd);
                    }}
                    style={{
                      fontSize: "10px",
                      fontFamily: "monospace",
                      backgroundColor: "rgba(128, 128, 128, 0.08)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-muted)",
                      padding: "2px 8px",
                      borderRadius: "2px",
                      cursor: "pointer",
                      transition: "all 0.15s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--text-primary)";
                      e.currentTarget.style.borderColor = "#0284C7";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--text-muted)";
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }}
                  >
                    ${cmd}
                  </button>
                ))}
              </div>

              {/* Command Input */}
              <form
                onSubmit={handleCommandSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  backgroundColor: "rgba(128, 128, 128, 0.06)",
                  border: "1px solid var(--border-subtle)",
                  borderRadius: "4px",
                  padding: "8px 12px",
                }}
              >
                <span
                  style={{
                    color: "#0284C7",
                    fontFamily: "monospace",
                    fontSize: "13px",
                    marginRight: "8px",
                  }}
                >
                  $&gt;
                </span>
                <input
                  type="text"
                  value={terminalInput}
                  onChange={(e) => setTerminalInput(e.target.value)}
                  placeholder="Type a command (e.g. 'help', 'email', 'skills')..."
                  style={{
                    flex: 1,
                    backgroundColor: "transparent",
                    border: "none",
                    outline: "none",
                    color: "var(--text-primary)",
                    fontFamily: "monospace",
                    fontSize: "13px",
                  }}
                />
              </form>
            </div>
          </div>

          {/* Right: Dispatch Message Form & Direct Transmission Channels */}
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--bg-card)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border-subtle)",
              padding: "32px",
              clipPath:
                "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            {isSubmitted ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                  height: "100%",
                  padding: "40px 20px",
                }}
              >
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "rgba(16, 185, 129, 0.15)",
                    border: "1px solid #10B981",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#10B981",
                    fontSize: "20px",
                    marginBottom: "16px",
                  }}
                >
                  ✓
                </div>
                <h3
                  className="font-chakra"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    margin: "0 0 8px 0",
                    color: "var(--text-primary)",
                  }}
                >
                  TRANSMISSION DISPATCHED
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    fontSize: "0.9rem",
                    lineHeight: 1.6,
                    maxWidth: "340px",
                    marginBottom: "24px",
                  }}
                >
                  Your message has been encrypted and routed directly to my
                  inbox. Expected response latency: &lt; 12 hours.
                </p>
                <WaspButton
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormState({
                      name: "",
                      email: "",
                      subject: "ML / AI Collaboration",
                      message: "",
                    });
                  }}
                  variant="outline"
                  paddingX={22}
                  paddingY={9}
                  fontSize={11}
                  cutTopLeft={8}
                  cutBottomRight={8}
                >
                  SEND ANOTHER TRANSMISSION
                </WaspButton>
              </div>
            ) : (
              <form
                onSubmit={handleFormSubmit}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "16px",
                }}
              >
                <div
                  className="font-pixel"
                  style={{
                    fontSize: "11px",
                    color: "var(--text-muted)",
                    letterSpacing: "0.1em",
                    marginBottom: "4px",
                  }}
                >
                  // DIRECT INQUIRY DISPATCH
                </div>

                {/* Name & Email Inputs */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "12px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Your Name
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Jane Doe"
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(128, 128, 128, 0.06)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "4px",
                        padding: "10px 14px",
                        color: "var(--text-primary)",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    />
                  </div>

                  <div>
                    <label
                      style={{
                        display: "block",
                        fontSize: "10px",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        color: "var(--text-secondary)",
                        marginBottom: "6px",
                        letterSpacing: "0.05em",
                      }}
                    >
                      Email Address
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="jane@company.com"
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      style={{
                        width: "100%",
                        backgroundColor: "rgba(128, 128, 128, 0.06)",
                        border: "1px solid var(--border-subtle)",
                        borderRadius: "4px",
                        padding: "10px 14px",
                        color: "var(--text-primary)",
                        fontSize: "13px",
                        outline: "none",
                      }}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(128, 128, 128, 0.06)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "4px",
                      padding: "10px 14px",
                      color: "var(--text-primary)",
                      fontSize: "13px",
                      outline: "none",
                    }}
                  />
                </div>

                {/* Message */}
                <div>
                  <label
                    style={{
                      display: "block",
                      fontSize: "10px",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      color: "var(--text-secondary)",
                      marginBottom: "6px",
                      letterSpacing: "0.05em",
                    }}
                  >
                    Project Details / Inquiry
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell me about your model requirements, throughput targets, or project scope..."
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    style={{
                      width: "100%",
                      backgroundColor: "rgba(128, 128, 128, 0.06)",
                      border: "1px solid var(--border-subtle)",
                      borderRadius: "4px",
                      padding: "10px 14px",
                      color: "var(--text-primary)",
                      fontSize: "13px",
                      outline: "none",
                      resize: "none",
                    }}
                  />
                </div>

                <div style={{ marginTop: "8px" }}>
                  <WaspButton
                    type="submit"
                    variant="light"
                    paddingX={28}
                    paddingY={12}
                    fontSize={12}
                    cutTopLeft={10}
                    cutBottomRight={10}
                  >
                    TRANSMIT INQUIRY →
                  </WaspButton>
                </div>
              </form>
            )}

            {/* Encrypted Social Links Bar */}
            <div
              style={{
                marginTop: "24px",
                paddingTop: "18px",
                borderTop: "1px solid var(--border-subtle)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "12px",
              }}
            >
              {[
                { name: "GITHUB", url: "https://github.com" },
                { name: "HUGGING FACE", url: "https://huggingface.co" },
                { name: "LINKEDIN", url: "https://linkedin.com" },
                { name: "X (TWITTER)", url: "https://x.com" },
              ].map((link) => (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    fontSize: "11px",
                    fontWeight: 600,
                    color: "var(--text-muted)",
                    textDecoration: "none",
                    letterSpacing: "0.05em",
                    transition: "color 0.15s ease",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "var(--text-primary)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "var(--text-muted)")
                  }
                >
                  {link.name} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
