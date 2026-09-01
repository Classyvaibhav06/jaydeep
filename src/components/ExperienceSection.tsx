"use client";

import React, { useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  period: string;
  badge: string;
  overview: string;
  achievements: string[];
  technologies: string[];
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: "lead-ai-eng",
    role: "Staff / Lead Machine Learning Engineer",
    company: "Autonomous Systems & AI Labs",
    location: "Vancouver, BC / Remote",
    period: "2024 — PRESENT",
    badge: "ACTIVE DEPLOYMENT",
    overview:
      "Spearheading the engineering of multi-modal agentic systems, model distillation pipelines, and real-time distributed inference infrastructure.",
    achievements: [
      "Engineered an autonomous multi-agent task execution system processing over 25M daily inferences with <38ms P99 latency.",
      "Fine-tuned and quantized Llama 3 & Mistral open-weights models down to 4-bit AWQ/GGUF, reducing cloud inference costs by 62%.",
      "Designed a fault-tolerant vector retrieval pipeline (pgvector + Qdrant) scaling across 15M+ enterprise technical documents.",
      "Mentored a team of 6 engineers across model evaluation, continuous batching, and ML telemetry observability.",
    ],
    technologies: ["PyTorch", "vLLM", "LangChain", "TensorRT", "Kubernetes", "Ray", "Python", "Docker"],
  },
  {
    id: "sr-ml-dev",
    role: "Senior AI / Full-Stack Engineer",
    company: "Cognitive Nexus Technologies",
    location: "San Francisco, CA / Remote",
    period: "2022 — 2024",
    badge: "PRODUCTION IMPACT",
    overview:
      "Architected end-to-end full-stack AI applications, streaming LLM interfaces, and computer vision edge processing workflows.",
    achievements: [
      "Built real-time streaming conversational studio supporting WebRTC audio duplex and streaming code diff generation.",
      "Optimized zero-shot computer vision inference on NVIDIA Jetson embedded hardware, achieving 120 FPS on RTSP video feeds.",
      "Integrated CI/CD evaluation testbeds evaluating model hallucination rates, BLEU scores, and semantic faithfulness.",
      "Authored high-throughput async FastAPI microservices handling 5,000+ RPS sustained traffic with zero downtime.",
    ],
    technologies: ["Next.js 15", "FastAPI", "OpenCV", "CUDA", "Redis", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "applied-ml-eng",
    role: "Applied Deep Learning Engineer",
    company: "Visionary Dynamics Lab",
    location: "Toronto, ON",
    period: "2020 — 2022",
    badge: "RESEARCH & DEV",
    overview:
      "Developed custom convolutional and transformer-based architectures for feature extraction, anomaly detection, and automated tabular forecasting.",
    achievements: [
      "Trained custom vision transformers (ViT) achieving 94.6% top-1 accuracy on complex industrial defect classification.",
      "Constructed automated feature engineering pipelines in PySpark and Polars handling multi-terabyte dataset preprocessing.",
      "Published technical benchmarks and collaborated with research teams on state-of-the-art self-supervised representations.",
    ],
    technologies: ["PyTorch", "TensorFlow", "Scikit-Learn", "Polars", "PySpark", "MLflow", "AWS SageMaker"],
  },
  {
    id: "oss-ai",
    role: "Open Source AI & Core Contributor",
    company: "Hugging Face & ML Community",
    location: "Global / Open Source",
    period: "2021 — PRESENT",
    badge: "COMMUNITY IMPACT",
    overview:
      "Active contributor to open-source machine learning tooling, quantization kernels, and agentic framework integrations.",
    achievements: [
      "Contributed performance patches and memory optimizations to open-source inference frameworks and tokenizers.",
      "Created popular starter templates and benchmarking utilities for local LLM orchestration with 3,500+ GitHub stars.",
      "Conducted community workshops on fine-tuning strategies, LoRA adapters, and enterprise RAG architecture patterns.",
    ],
    technologies: ["Hugging Face", "Transformers", "LoRA", "GGUF", "Git", "Markdown"],
  },
];

export default function ExperienceSection() {
  const [selectedExpId, setSelectedExpId] = useState<string>(EXPERIENCES[0].id);

  const selectedExp =
    EXPERIENCES.find((exp) => exp.id === selectedExpId) || EXPERIENCES[0];

  return (
    <section
      id="experience"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
        padding: "110px 56px 130px 56px",
        userSelect: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── Background Grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "44px 44px",
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
            d="M 0,25 L 200,25 L 240,50 L 1000,50 L 1440,50"
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
                backgroundColor: "#8B5CF6",
                boxShadow: "0 0 8px #8B5CF6",
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
              // 04. TRACK RECORD &amp; EXPERIENCE
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
                <span style={{ display: "block" }}>CAREER &amp; RESEARCH</span>
                <span style={{ display: "block", color: "var(--text-secondary)" }}>
                  MILESTONES
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
              Proven engineering leadership taking machine learning research
              from prototype experimentation to mission-critical enterprise scale.
            </p>
          </div>
        </div>

        {/* ── Interactive Two-Column Experience Console ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {/* Left Column: Timeline Navigation List */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "14px",
            }}
          >
            {EXPERIENCES.map((exp) => {
              const isSelected = exp.id === selectedExpId;
              return (
                <div
                  key={exp.id}
                  onClick={() => setSelectedExpId(exp.id)}
                  style={{
                    position: "relative",
                    backgroundColor: isSelected
                      ? "rgba(139, 92, 246, 0.12)"
                      : "var(--bg-card)",
                    backdropFilter: "blur(12px)",
                    border: isSelected
                      ? "1px solid rgba(139, 92, 246, 0.6)"
                      : "1px solid var(--border-subtle)",
                    padding: "22px 26px",
                    clipPath:
                      "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                    cursor: "pointer",
                    transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
                    boxShadow: isSelected
                      ? "0 10px 30px -8px rgba(139, 92, 246, 0.25)"
                      : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "var(--border-active)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isSelected) {
                      e.currentTarget.style.borderColor = "var(--border-subtle)";
                    }
                  }}
                >
                  {/* Left indicator glow line if selected */}
                  {isSelected && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        bottom: 0,
                        width: "3px",
                        backgroundColor: "#8B5CF6",
                        boxShadow: "0 0 12px #8B5CF6",
                      }}
                    />
                  )}

                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: "6px",
                    }}
                  >
                    <span
                      className="font-pixel"
                      style={{
                        fontSize: "11px",
                        color: isSelected ? "#8B5CF6" : "var(--text-muted)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {exp.period}
                    </span>

                    <span
                      style={{
                        fontSize: "9px",
                        fontWeight: 700,
                        letterSpacing: "0.06em",
                        color: isSelected ? "#8B5CF6" : "var(--text-muted)",
                        backgroundColor: "rgba(139, 92, 246, 0.12)",
                        padding: "2px 6px",
                        borderRadius: "2px",
                        border: isSelected
                          ? "1px solid rgba(139, 92, 246, 0.3)"
                          : "1px solid var(--border-subtle)",
                      }}
                    >
                      {exp.badge}
                    </span>
                  </div>

                  <h3
                    className="font-chakra"
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "var(--text-primary)",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {exp.role}
                  </h3>

                  <div
                    style={{
                      fontSize: "0.85rem",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {exp.company} · {exp.location}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Detailed Telemetry Dossier */}
          <div
            style={{
              position: "relative",
              backgroundColor: "var(--bg-card)",
              backdropFilter: "blur(16px)",
              border: "1px solid var(--border-subtle)",
              padding: "36px",
              clipPath:
                "polygon(18px 0, 100% 0, 100% calc(100% - 18px), calc(100% - 18px) 100%, 0 100%, 0 18px)",
              boxShadow: "0 15px 40px -10px rgba(0,0,0,0.5)",
            }}
          >
            {/* Top Corner HUD Brackets */}
            <div
              style={{
                position: "absolute",
                top: "10px",
                left: "18px",
                width: "12px",
                height: "12px",
                borderTop: "1.5px solid rgba(139, 92, 246, 0.6)",
                borderLeft: "1.5px solid rgba(139, 92, 246, 0.6)",
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "absolute",
                top: "10px",
                right: "10px",
                width: "12px",
                height: "12px",
                borderTop: "1.5px solid rgba(139, 92, 246, 0.6)",
                borderRight: "1.5px solid rgba(139, 92, 246, 0.6)",
                pointerEvents: "none",
              }}
            />

            {/* Header Area */}
            <div style={{ marginBottom: "24px" }}>
              <div
                className="font-pixel"
                style={{
                  fontSize: "11px",
                  color: "#8B5CF6",
                  letterSpacing: "0.12em",
                  marginBottom: "8px",
                }}
              >
                // SYSTEM DOSSIER: {selectedExp.id.toUpperCase()}
              </div>

              <h3
                className="font-chakra"
                style={{
                  fontSize: "1.7rem",
                  fontWeight: 700,
                  color: "var(--text-primary)",
                  lineHeight: 1.1,
                  margin: "0 0 6px 0",
                }}
              >
                {selectedExp.role}
              </h3>

              <div
                style={{
                  fontSize: "0.95rem",
                  color: "var(--text-muted)",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  flexWrap: "wrap",
                }}
              >
                <span style={{ color: "var(--text-primary)", fontWeight: 600 }}>
                  {selectedExp.company}
                </span>
                <span>·</span>
                <span>{selectedExp.location}</span>
                <span>·</span>
                <span style={{ color: "#8B5CF6" }}>{selectedExp.period}</span>
              </div>
            </div>

            {/* Role Overview */}
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--text-secondary)",
                lineHeight: 1.6,
                marginBottom: "28px",
                padding: "14px 16px",
                backgroundColor: "rgba(128, 128, 128, 0.05)",
                borderLeft: "2px solid #8B5CF6",
              }}
            >
              {selectedExp.overview}
            </p>

            {/* Impact & Key Achievements */}
            <div style={{ marginBottom: "28px" }}>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "14px",
                }}
              >
                Key Engineering Breakthroughs
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                {selectedExp.achievements.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "10px",
                      fontSize: "0.9rem",
                      lineHeight: 1.5,
                      color: "var(--text-secondary)",
                    }}
                  >
                    <span
                      style={{
                        color: "#8B5CF6",
                        fontSize: "12px",
                        marginTop: "2px",
                      }}
                    >
                      ◆
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Technologies Used */}
            <div>
              <div
                style={{
                  fontSize: "11px",
                  fontWeight: 700,
                  color: "var(--text-muted)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginBottom: "12px",
                }}
              >
                Core Toolchain &amp; Technologies
              </div>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {selectedExp.technologies.map((tech) => (
                  <span
                    key={tech}
                    style={{
                      fontSize: "11px",
                      fontWeight: 600,
                      color: "var(--text-primary)",
                      backgroundColor: "rgba(128, 128, 128, 0.08)",
                      padding: "4px 10px",
                      borderRadius: "2px",
                      border: "1px solid var(--border-subtle)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
