"use client";

import React, { useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";

interface SkillItem {
  id: string;
  name: string;
  level: number; // 0-100
  category: "all" | "frontend" | "backend" | "ai" | "devops";
  code: string;
  tagline: string;
  tags: string[];
}

const SKILLS_DATA: SkillItem[] = [
  // ── Frontend & UI ──
  {
    id: "nextjs",
    name: "Next.js 16 / React 19",
    level: 95,
    category: "frontend",
    code: "UI-01 // CORE",
    tagline: "Server Components, streaming SSR, App Router architecture.",
    tags: ["React 19", "Server Actions", "Turbopack", "Hydration"],
  },
  {
    id: "typescript",
    name: "TypeScript (Strict)",
    level: 92,
    category: "frontend",
    code: "TS-02 // TYPE",
    tagline: "Generic inference, AST transforms, strict null safety.",
    tags: ["Generics", "Type Guards", "Utility Types", "AST"],
  },
  {
    id: "tailwind",
    name: "Tailwind CSS v4 & Styling",
    level: 96,
    category: "frontend",
    code: "CSS-03 // STYLE",
    tagline: "Dynamic token systems, high-performance CSS animations.",
    tags: ["Tailwind v4", "CSS Variables", "Responsive", "Tokens"],
  },
  {
    id: "framer",
    name: "Framer Motion & Micro-UI",
    level: 88,
    category: "frontend",
    code: "ANIM-04 // FX",
    tagline: "Layout orchestration, springs, gesture-driven HUD components.",
    tags: ["Layout Animations", "Gestures", "Springs", "SVG Paths"],
  },

  // ── AI & Intelligence ──
  {
    id: "pytorch",
    name: "PyTorch & Deep Learning",
    level: 94,
    category: "ai",
    code: "AI-01 // TENSOR",
    tagline: "Transformer backbones, custom CUDA ops, distributed training.",
    tags: ["TorchDynamo", "CUDA", "Multi-GPU", "FlashAttention"],
  },
  {
    id: "vllm",
    name: "vLLM & Inference Serving",
    level: 92,
    category: "ai",
    code: "AI-02 // SERVE",
    tagline: "PagedAttention, continuous batching, AWQ/GGUF quantization.",
    tags: ["Continuous Batching", "PagedAttention", "AWQ", "Triton"],
  },
  {
    id: "langchain",
    name: "LangChain & Multi-Agents",
    level: 90,
    category: "ai",
    code: "AI-03 // AGENT",
    tagline: "Hierarchical agent DAGs, semantic routing, tool reflection.",
    tags: ["Agent Swarms", "Tool Calling", "Reflection", "DAGs"],
  },
  {
    id: "tensorrt",
    name: "TensorRT & Computer Vision",
    level: 86,
    category: "ai",
    code: "AI-04 // VISION",
    tagline: "Zero-shot YOLO segmentation, ONNX runtime, Jetson deployment.",
    tags: ["YOLOv10", "SAM", "ONNX", "Edge AI"],
  },

  // ── Backend & Data ──
  {
    id: "fastapi",
    name: "FastAPI & Python Async",
    level: 92,
    category: "backend",
    code: "API-01 // ASYNC",
    tagline: "High-throughput asynchronous microservices, gRPC streaming.",
    tags: ["AsyncIO", "Pydantic v2", "gRPC", "WebSockets"],
  },
  {
    id: "pgvector",
    name: "pgvector & Qdrant (RAG)",
    level: 90,
    category: "backend",
    code: "DATA-02 // VEC",
    tagline: "Hybrid dense-sparse indexing, cross-encoder re-ranking.",
    tags: ["HNSW", "Cosine Indexing", "ColBERT", "Hybrid RAG"],
  },
  {
    id: "redis",
    name: "Redis Semantic Cache",
    level: 88,
    category: "backend",
    code: "DATA-03 // CACHE",
    tagline: "High-speed token buffer, Pub/Sub message broker.",
    tags: ["Semantic Caching", "Pub/Sub", "In-Memory", "Low Latency"],
  },

  // ── DevOps & Cloud ──
  {
    id: "docker-k8s",
    name: "Docker & Kubernetes",
    level: 89,
    category: "devops",
    code: "OPS-01 // CLOUD",
    tagline: "Multi-node GPU orchestration, auto-scaling, Helm charts.",
    tags: ["K8s", "GPU Operators", "Helm", "Multi-Cloud"],
  },
];

const CATEGORIES = [
  { id: "all", label: "ALL TECH" },
  { id: "ai", label: "AI & INTELLIGENCE" },
  { id: "frontend", label: "FRONTEND & UI" },
  { id: "backend", label: "BACKEND & DATA" },
  { id: "devops", label: "DEVOPS & CLOUD" },
] as const;

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<
    "all" | "frontend" | "backend" | "ai" | "devops"
  >("all");

  const filteredSkills =
    activeCategory === "all"
      ? SKILLS_DATA
      : SKILLS_DATA.filter((s) => s.category === activeCategory);

  return (
    <section
      id="skills"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--bg-secondary)",
        color: "var(--text-primary)",
        position: "relative",
        overflow: "hidden",
        padding: "100px 56px 120px 56px",
        userSelect: "none",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ── Background Cyber Grid & Glow ── */}
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
      <div
        style={{
          position: "absolute",
          top: "10%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "700px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(59, 130, 246, 0.07) 0%, transparent 70%)",
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
            d="M 0,20 L 160,20 L 200,48 L 840,48 L 1440,48"
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
        <div style={{ marginBottom: "48px" }}>
          {/* Status Tag */}
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
              // 02. TECHNICAL ARSENAL
            </span>
          </div>

          {/* Section Title & Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
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
                <span style={{ display: "block" }}>ENGINEERING &amp;</span>
                <span style={{ display: "block", color: "var(--text-secondary)" }}>
                  AI ARSENAL
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
              Battle-tested toolchain spanning distributed deep learning,
              multi-modal inference optimization, and modern reactive interfaces.
            </p>
          </div>

          {/* ── Filter Tabs (Wasp Sci-Fi Buttons) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "36px",
              flexWrap: "wrap",
            }}
          >
            {CATEGORIES.map((cat) => {
              const active = activeCategory === cat.id;
              return (
                <WaspButton
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  variant={active ? "light" : "dark"}
                  paddingX={22}
                  paddingY={10}
                  fontSize={12}
                  cutTopLeft={10}
                  cutBottomRight={10}
                >
                  {cat.label}
                </WaspButton>
              );
            })}
          </div>
        </div>

        {/* ── Skills Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "20px",
          }}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.id}
              style={{
                position: "relative",
                backgroundColor: "var(--bg-card)",
                backdropFilter: "blur(12px)",
                border: "1px solid var(--border-subtle)",
                padding: "24px 28px",
                clipPath:
                  "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "190px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                transition: "all 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-active)";
                e.currentTarget.style.transform = "translateY(-3px)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "var(--border-subtle)";
                e.currentTarget.style.transform = "translateY(0)";
              }}
            >
              {/* Corner Bracket Accents */}
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  left: "14px",
                  width: "8px",
                  height: "8px",
                  borderTop: "1.5px solid var(--border-active)",
                  borderLeft: "1.5px solid var(--border-active)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "6px",
                  right: "6px",
                  width: "8px",
                  height: "8px",
                  borderTop: "1.5px solid var(--border-active)",
                  borderRight: "1.5px solid var(--border-active)",
                  pointerEvents: "none",
                }}
              />

              {/* Card Header: Code & Mastery Level */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "8px",
                  }}
                >
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: "10px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {skill.code}
                  </span>
                  <span
                    className="font-chakra"
                    style={{
                      fontSize: "13px",
                      fontWeight: 700,
                      color: "#38BDF8",
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>

                {/* Skill Name */}
                <h3
                  className="font-chakra"
                  style={{
                    fontSize: "1.25rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    margin: "0 0 6px 0",
                  }}
                >
                  {skill.name}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.4,
                    margin: "0 0 16px 0",
                  }}
                >
                  {skill.tagline}
                </p>
              </div>

              {/* Card Footer: Progress Bar + Tags */}
              <div>
                {/* Visual Level Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "3px",
                    backgroundColor: "rgba(128, 128, 128, 0.2)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: "100%",
                      backgroundColor: "#38BDF8",
                      boxShadow: "0 0 8px #38BDF8",
                      borderRadius: "2px",
                    }}
                  />
                </div>

                {/* Tags Pill Row */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                  }}
                >
                  {skill.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "var(--text-muted)",
                        backgroundColor: "rgba(128, 128, 128, 0.08)",
                        padding: "2px 6px",
                        borderRadius: "2px",
                        border: "1px solid var(--border-subtle)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
