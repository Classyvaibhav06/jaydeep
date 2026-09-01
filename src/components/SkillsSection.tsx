"use client";

import React, { useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";

interface SkillItem {
  name: string;
  level: string;
  category: "frontend" | "backend" | "ai" | "devops";
  icon: string;
  desc: string;
  tags: string[];
}

const SKILLS: SkillItem[] = [
  // Frontend
  {
    name: "Next.js / React 19",
    level: "95%",
    category: "frontend",
    icon: "▲",
    desc: "Server components, streaming SSR, App Router & Turbopack architecture.",
    tags: ["App Router", "SSR", "Server Actions"],
  },
  {
    name: "TypeScript",
    level: "92%",
    category: "frontend",
    icon: "TS",
    desc: "Strict type safety, generic design patterns, and enterprise codebases.",
    tags: ["Generics", "Type Utilities", "AST"],
  },
  {
    name: "Tailwind CSS & Motion",
    level: "96%",
    category: "frontend",
    icon: "◈",
    desc: "Responsive design systems, micro-interactions & hardware-accelerated animations.",
    tags: ["Tailwind v4", "Framer Motion", "GSAP"],
  },
  {
    name: "Three.js / WebGL",
    level: "82%",
    category: "frontend",
    icon: "⬡",
    desc: "Interactive 3D scene graphs, shaders, particle systems and camera controls.",
    tags: ["R3F", "GLSL Shaders", "Meshes"],
  },

  // Backend
  {
    name: "Node.js & Express",
    level: "90%",
    category: "backend",
    icon: "⬢",
    desc: "High-throughput asynchronous REST & WebSocket microservices.",
    tags: ["REST", "WebSockets", "Streams"],
  },
  {
    name: "PostgreSQL & Prisma",
    level: "88%",
    category: "backend",
    icon: "◬",
    desc: "Relational database modeling, query optimization, indexing, and ORM pipelines.",
    tags: ["Prisma", "SQL", "Indexing"],
  },
  {
    name: "Redis & Caching",
    level: "85%",
    category: "backend",
    icon: "⚡",
    desc: "In-memory caching layers, pub/sub queues, and rate-limiting protocols.",
    tags: ["Pub/Sub", "Sessions", "Rate Limiting"],
  },

  // AI & Systems
  {
    name: "AI & LLM Integration",
    level: "92%",
    category: "ai",
    icon: "✦",
    desc: "Custom agentic workflows, RAG pipelines, function calling & prompt tuning.",
    tags: ["LangChain", "OpenAI / Claude", "Embeddings"],
  },
  {
    name: "Vector Databases",
    level: "86%",
    category: "ai",
    icon: "◎",
    desc: "Semantic search, high-dimensional cosine similarity indexing and retrieval.",
    tags: ["Pinecone", "pgvector", "Chroma"],
  },
  {
    name: "Python Automation",
    level: "84%",
    category: "ai",
    icon: "Py",
    desc: "Data processing scripts, scrapers, API hooks and automation tooling.",
    tags: ["FastAPI", "Pandas", "Scikit"],
  },

  // DevOps & Cloud
  {
    name: "Docker & Containerization",
    level: "85%",
    category: "devops",
    icon: "⎈",
    desc: "Multi-stage builds, container isolation, and orchestration readiness.",
    tags: ["Dockerfile", "Compose", "Registry"],
  },
  {
    name: "CI/CD & Cloud Deploy",
    level: "89%",
    category: "devops",
    icon: "☁",
    desc: "Automated GitHub Actions pipelines, Vercel edge runtime, and AWS compute.",
    tags: ["GitHub Actions", "Vercel", "AWS S3/EC2"],
  },
];

export default function SkillsSection() {
  const [activeTab, setActiveTab] = useState<"all" | "frontend" | "backend" | "ai" | "devops">("all");

  const filteredSkills =
    activeTab === "all"
      ? SKILLS
      : SKILLS.filter((skill) => skill.category === activeTab);

  return (
    <section
      id="skills"
      style={{
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "#06090E",
        color: "#ffffff",
        position: "relative",
        overflow: "hidden",
        padding: "100px 56px 120px 56px",
        userSelect: "none",
      }}
    >
      {/* ── Background Cyber Grid & Glow ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
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
          background: "radial-gradient(circle, rgba(59, 130, 246, 0.07) 0%, transparent 70%)",
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
            d="M 0,10 L 80,10 L 120,40 L 720,40 L 1440,40"
            fill="none"
            stroke="#ffffff"
            strokeWidth="1.2"
            opacity="0.2"
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
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginBottom: "50px",
          }}
        >
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
                color: "#9CA3AF",
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
                  color: "#ffffff",
                  margin: 0,
                }}
              >
                <span style={{ display: "block" }}>CORE TECH &</span>
                <span style={{ display: "block", color: "rgba(255, 255, 255, 0.75)" }}>
                  CAPABILITIES
                </span>
              </h2>
            </div>

            <p
              style={{
                color: "#9CA3AF",
                fontSize: "0.95rem",
                lineHeight: 1.6,
                maxWidth: "380px",
                margin: 0,
              }}
            >
              engineered with cutting-edge toolchains, resilient architectures,
              and performance-first paradigms.
            </p>
          </div>

          {/* ── Category Filters (Calibrated 45-Degree Buttons) ── */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              marginTop: "40px",
              flexWrap: "wrap",
            }}
          >
            {[
              { id: "all", label: "ALL TECH" },
              { id: "frontend", label: "FRONTEND & UI" },
              { id: "backend", label: "BACKEND & DATA" },
              { id: "ai", label: "AI & INTELLIGENCE" },
              { id: "devops", label: "DEVOPS & CLOUD" },
            ].map((tab) => {
              const active = activeTab === tab.id;
              return (
                <WaspButton
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  variant={active ? "light" : "dark"}
                  paddingX={24}
                  paddingY={10}
                  fontSize={12}
                  cutTopLeft={10}
                  cutBottomRight={10}
                >
                  {tab.label}
                </WaspButton>
              );
            })}
          </div>
        </div>

        {/* ── Skills Grid (Chamfered Sci-Fi Cards) ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {filteredSkills.map((skill) => (
            <div
              key={skill.name}
              style={{
                position: "relative",
                backgroundColor: "rgba(15, 20, 30, 0.75)",
                backdropFilter: "blur(12px)",
                border: "1px solid rgba(255, 255, 255, 0.12)",
                padding: "26px",
                clipPath:
                  "polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "220px",
                boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)",
                transition: "border-color 0.25s ease, transform 0.25s ease, background-color 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.4)";
                e.currentTarget.style.transform = "translateY(-4px)";
                e.currentTarget.style.backgroundColor = "rgba(20, 27, 40, 0.92)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255, 255, 255, 0.12)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.backgroundColor = "rgba(15, 20, 30, 0.75)";
              }}
            >
              {/* Corner Bracket Accents */}
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  left: "14px",
                  width: "8px",
                  height: "8px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.4)",
                  borderLeft: "1px solid rgba(255, 255, 255, 0.4)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "8px",
                  right: "8px",
                  width: "8px",
                  height: "8px",
                  borderTop: "1px solid rgba(255, 255, 255, 0.4)",
                  borderRight: "1px solid rgba(255, 255, 255, 0.4)",
                  pointerEvents: "none",
                }}
              />

              {/* Top Header inside Card */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <span
                      style={{
                        width: "32px",
                        height: "32px",
                        backgroundColor: "rgba(255, 255, 255, 0.08)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                        borderRadius: "4px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "#ffffff",
                      }}
                    >
                      {skill.icon}
                    </span>
                    <span
                      className="font-chakra"
                      style={{
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#ffffff",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {skill.name}
                    </span>
                  </div>

                  <span
                    className="font-chakra"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "rgba(255, 255, 255, 0.9)",
                    }}
                  >
                    {skill.level}
                  </span>
                </div>

                <p
                  style={{
                    fontSize: "0.85rem",
                    color: "rgba(255, 255, 255, 0.65)",
                    lineHeight: 1.5,
                    margin: "0 0 18px 0",
                  }}
                >
                  {skill.desc}
                </p>
              </div>

              {/* Bottom: Progress Bar & Tag Pills */}
              <div>
                {/* Tech Progress Bar */}
                <div
                  style={{
                    width: "100%",
                    height: "3px",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    marginBottom: "14px",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: skill.level,
                      height: "100%",
                      backgroundColor: "#ffffff",
                      boxShadow: "0 0 8px rgba(255, 255, 255, 0.8)",
                    }}
                  />
                </div>

                {/* Sub Tags */}
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
                        color: "rgba(255, 255, 255, 0.7)",
                        backgroundColor: "rgba(255, 255, 255, 0.05)",
                        padding: "3px 8px",
                        borderRadius: "2px",
                        border: "1px solid rgba(255, 255, 255, 0.08)",
                        letterSpacing: "0.03em",
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

        {/* ── Bottom Section Stats Summary Bar ── */}
        <div
          style={{
            marginTop: "60px",
            paddingTop: "32px",
            borderTop: "1px solid rgba(255, 255, 255, 0.15)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "24px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "40px", flexWrap: "wrap" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="font-chakra" style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>
                12+
              </span>
              <span style={{ fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Core Frameworks & Tools
              </span>
            </div>
            <div style={{ width: "1px", height: "30px", backgroundColor: "rgba(255,255,255,0.15)" }} />
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span className="font-chakra" style={{ fontSize: "1.8rem", fontWeight: 700, color: "#fff" }}>
                99.9%
              </span>
              <span style={{ fontSize: "11px", color: "#9CA3AF", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                Performance & Reliability
              </span>
            </div>
          </div>

          <WaspButton
            href="#contact"
            variant="light"
            paddingX={32}
            paddingY={13}
            fontSize={12}
            cutTopLeft={12}
            cutBottomRight={12}
          >
            DISCUSS A PROJECT →
          </WaspButton>
        </div>
      </div>
    </section>
  );
}
