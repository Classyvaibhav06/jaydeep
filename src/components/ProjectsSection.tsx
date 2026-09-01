"use client";

import React, { useState } from "react";
import { WaspButton } from "@/components/ui/wasp-button";

interface ProjectItem {
  id: string;
  title: string;
  codename: string;
  category: "llm" | "vision" | "distributed" | "fullstack";
  tagline: string;
  description: string;
  architecture: string[];
  metrics: { label: string; value: string }[];
  tags: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
}

const PROJECTS: ProjectItem[] = [
  {
    id: "omni-agent",
    title: "OmniAgent — Multi-Modal Autonomous Orchestration Engine",
    codename: "SYS-01 // AGENTIC CORE",
    category: "llm",
    featured: true,
    tagline: "Autonomous hierarchical agent swarm with dynamic tool reflection and memory graph.",
    description:
      "Engineered an enterprise-grade agentic orchestration system supporting distributed tool calling, semantic state reflection, and persistent vector memory. Implemented sub-second function dispatching and token streaming.",
    architecture: [
      "Dynamic DAG workflow generation",
      "Persistent hybrid memory (pgvector + Redis)",
      "Quantized LLM tool-calling fallback pipeline",
    ],
    metrics: [
      { label: "Token Throughput", value: "320 tok/s" },
      { label: "Tool Accuracy", value: "98.4%" },
      { label: "Memory Retrieval", value: "< 14ms" },
    ],
    tags: ["Python", "LangChain", "vLLM", "Redis", "pgvector", "FastAPI"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
  },
  {
    id: "neuro-vision",
    title: "NeuroVision — Real-Time Spatial Edge Detection & Tracking",
    codename: "SYS-02 // NEURAL SIGHT",
    category: "vision",
    featured: true,
    tagline: "Hardware-accelerated zero-shot object segmentation and 3D bounding inference.",
    description:
      "Developed a low-latency computer vision pipeline optimized with TensorRT and ONNX Runtime for edge IoT deployment. Achieved 140+ FPS on embedded NVIDIA Jetson platforms with multi-stream camera inputs.",
    architecture: [
      "Custom YOLOv10 + SAM zero-shot backbone",
      "TensorRT FP16 quantization engine",
      "Multi-threaded GStreamer RTSP ingestion pipeline",
    ],
    metrics: [
      { label: "Inference Speed", value: "140+ FPS" },
      { label: "mAP@0.50:0.95", value: "92.8%" },
      { label: "GPU VRAM Footprint", value: "1.4 GB" },
    ],
    tags: ["PyTorch", "TensorRT", "CUDA", "OpenCV", "ONNX", "C++"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
  },
  {
    id: "tensor-flow-mesh",
    title: "HyperScale — Distributed Model Sharding & Inference Mesh",
    codename: "SYS-03 // DISTRIBUTED ML",
    category: "distributed",
    featured: false,
    tagline: "High-throughput model parallelism and load-balanced tensor serving cluster.",
    description:
      "Architected a cloud-native distributed inference router with continuous batching, PagedAttention optimizations, and automatic replica scaling across multi-node GPU clusters.",
    architecture: [
      "Continuous dynamic batching layer",
      "PagedAttention vLLM cluster router",
      "gRPC telemetry and health monitoring daemon",
    ],
    metrics: [
      { label: "P99 Latency", value: "< 28ms" },
      { label: "Throughput Boost", value: "4.2x" },
      { label: "Cluster Uptime", value: "99.99%" },
    ],
    tags: ["Kubernetes", "Triton", "Ray", "vLLM", "gRPC", "Docker"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
  },
  {
    id: "synth-craft",
    title: "SynthCraft — Generative UI & Context-Aware Studio",
    codename: "SYS-04 // FULL-STACK AI",
    category: "fullstack",
    featured: true,
    tagline: "Next-generation generative workspace compiling conversational intent into live React code.",
    description:
      "A full-stack AI development platform combining streaming AST parsing, live WebContainer sandboxing, and real-time LLM diff patching for zero-latency UI scaffolding.",
    architecture: [
      "Streaming AST code generation pipeline",
      "In-browser WebContainer sandbox execution",
      "Next.js 16 App Router & Server Components",
    ],
    metrics: [
      { label: "First Render Latency", value: "< 850ms" },
      { label: "Code Compilation", value: "100% Client-Side" },
      { label: "Active Developers", value: "12,000+" },
    ],
    tags: ["Next.js 16", "React 19", "Tailwind CSS", "WebContainer", "TypeScript"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
  },
  {
    id: "rag-vault",
    title: "VectorVault — Enterprise RAG & Hybrid Knowledge Graph",
    codename: "SYS-05 // SEMANTIC RAG",
    category: "llm",
    featured: false,
    tagline: "Multi-tenant dense-sparse retrieval system with cross-encoder re-ranking.",
    description:
      "Engineered an enterprise semantic search engine combining BM25 keyword matching with dense embedding retrieval and reciprocal rank fusion for hallucination-free document QA.",
    architecture: [
      "Dense vector + Sparse BM25 hybrid indexing",
      "ColBERT re-ranking cross-encoder stage",
      "Automated document chunking & OCR pipeline",
    ],
    metrics: [
      { label: "Precision@5", value: "96.7%" },
      { label: "Index Capacity", value: "25M+ Docs" },
      { label: "Query Time", value: "< 42ms" },
    ],
    tags: ["Qdrant", "FastAPI", "Python", "HuggingFace", "Redis"],
    githubUrl: "https://github.com",
  },
  {
    id: "deep-audio",
    title: "Vocalis — Low-Latency Voice AI & Speech Synthesis Stream",
    codename: "SYS-06 // NEURAL AUDIO",
    category: "vision",
    featured: false,
    tagline: "Duplex streaming speech-to-speech engine with sub-200ms turnaround.",
    description:
      "Built a full-duplex conversational voice agent with WebRTC streaming, Whisper speech recognition, and neural vocoder audio synthesis for real-time human interaction.",
    architecture: [
      "WebRTC bi-directional audio streaming",
      "Streaming Whisper STT with VAD silence gating",
      "StyleTTS2 low-latency audio generation",
    ],
    metrics: [
      { label: "Total Audio Latency", value: "185ms" },
      { label: "WER (Error Rate)", value: "3.4%" },
      { label: "Concurrent Calls", value: "500+" },
    ],
    tags: ["WebRTC", "PyTorch", "FastAPI", "Docker", "Whisper"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
  },
];

export default function ProjectsSection() {
  const [activeFilter, setActiveFilter] = useState<
    "all" | "llm" | "vision" | "distributed" | "fullstack"
  >("all");

  const filteredProjects =
    activeFilter === "all"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeFilter);

  return (
    <section
      id="projects"
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
      {/* ── Background Cyber Matrix Grid ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(var(--grid-line) 1px, transparent 1px), linear-gradient(90deg, var(--grid-line) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* ── Ambient Radial Glow ── */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          right: "5%",
          width: "600px",
          height: "400px",
          background:
            "radial-gradient(circle, rgba(14, 165, 233, 0.06) 0%, transparent 70%)",
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
            d="M 0,20 L 140,20 L 180,48 L 860,48 L 1440,48"
            fill="none"
            stroke="var(--hud-line)"
            strokeWidth="1.2"
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
                backgroundColor: "#0284C7",
                boxShadow: "0 0 8px #0284C7",
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
              // 03. PRODUCTION DEPLOYMENTS
            </span>
          </div>

          {/* Title & Subtitle */}
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
                <span style={{ display: "block" }}>FEATURED ML &amp;</span>
                <span style={{ display: "block", color: "var(--text-secondary)" }}>
                  AI ARCHITECTURES
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
              Proven production systems spanning multi-agent autonomous swarms,
              real-time computer vision, and distributed high-throughput model
              serving.
            </p>
          </div>

          {/* ── Category Filters ── */}
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
              { id: "all", label: "ALL SYSTEMS" },
              { id: "llm", label: "LLM & AGENTS" },
              { id: "vision", label: "COMPUTER VISION" },
              { id: "distributed", label: "DISTRIBUTED ML" },
              { id: "fullstack", label: "FULL-STACK AI" },
            ].map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <WaspButton
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id as any)}
                  variant={active ? "light" : "dark"}
                  paddingX={22}
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

        {/* ── Projects Cards Grid ── */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(420px, 1fr))",
            gap: "28px",
          }}
        >
          {filteredProjects.map((proj) => (
            <div
              key={proj.id}
              style={{
                position: "relative",
                backgroundColor: "var(--bg-card)",
                backdropFilter: "blur(14px)",
                border: "1px solid var(--border-subtle)",
                padding: "32px",
                clipPath:
                  "polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "360px",
                boxShadow: "0 12px 35px -10px rgba(0,0,0,0.5)",
                transition: "all 0.25s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "var(--border-active)";
                e.currentTarget.style.transform = "translateY(-4px)";
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

              {/* Card Top: Codename & Badge */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "12px",
                  }}
                >
                  <span
                    className="font-pixel"
                    style={{
                      fontSize: "11px",
                      color: "var(--text-muted)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    {proj.codename}
                  </span>

                  {proj.featured && (
                    <span
                      style={{
                        fontSize: "10px",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: "#0284C7",
                        backgroundColor: "rgba(2, 132, 199, 0.12)",
                        border: "1px solid rgba(2, 132, 199, 0.3)",
                        padding: "2px 8px",
                        borderRadius: "2px",
                      }}
                    >
                      ★ FEATURED
                    </span>
                  )}
                </div>

                {/* Project Title */}
                <h3
                  className="font-chakra"
                  style={{
                    fontSize: "1.45rem",
                    fontWeight: 700,
                    color: "var(--text-primary)",
                    letterSpacing: "-0.01em",
                    lineHeight: 1.2,
                    margin: "0 0 12px 0",
                  }}
                >
                  {proj.title}
                </h3>

                {/* Tagline */}
                <p
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--text-secondary)",
                    lineHeight: 1.5,
                    marginBottom: "16px",
                    fontWeight: 400,
                  }}
                >
                  {proj.tagline}
                </p>

                {/* Key Architecture Highlights */}
                <div
                  style={{
                    marginBottom: "20px",
                    padding: "12px 14px",
                    backgroundColor: "rgba(128, 128, 128, 0.05)",
                    border: "1px solid var(--border-subtle)",
                    borderRadius: "4px",
                  }}
                >
                  <div
                    style={{
                      fontSize: "10px",
                      fontWeight: 700,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      marginBottom: "6px",
                    }}
                  >
                    Architecture Highlights
                  </div>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "4px",
                    }}
                  >
                    {proj.architecture.map((arch, idx) => (
                      <li
                        key={idx}
                        style={{
                          fontSize: "0.8rem",
                          color: "var(--text-secondary)",
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                        }}
                      >
                        <span style={{ color: "#38BDF8", fontSize: "10px" }}>
                          ▸
                        </span>
                        {arch}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Card Bottom: Metrics + Tech Tags + Action Buttons */}
              <div>
                {/* Benchmark Metrics Strip */}
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(3, 1fr)",
                    gap: "8px",
                    marginBottom: "18px",
                    paddingTop: "14px",
                    borderTop: "1px solid var(--border-subtle)",
                  }}
                >
                  {proj.metrics.map((m, i) => (
                    <div key={i} style={{ textAlign: "center" }}>
                      <div
                        className="font-chakra"
                        style={{
                          fontSize: "1.15rem",
                          fontWeight: 700,
                          color: "var(--text-primary)",
                          lineHeight: 1,
                        }}
                      >
                        {m.value}
                      </div>
                      <div
                        style={{
                          fontSize: "9px",
                          color: "var(--text-muted)",
                          marginTop: "3px",
                          textTransform: "uppercase",
                          letterSpacing: "0.04em",
                        }}
                      >
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Pills */}
                <div
                  style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    marginBottom: "20px",
                  }}
                >
                  {proj.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontSize: "10px",
                        fontWeight: 500,
                        color: "var(--text-muted)",
                        backgroundColor: "rgba(128, 128, 128, 0.08)",
                        padding: "3px 8px",
                        borderRadius: "2px",
                        border: "1px solid var(--border-subtle)",
                        letterSpacing: "0.02em",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                >
                  {proj.liveUrl && (
                    <WaspButton
                      href={proj.liveUrl}
                      target="_blank"
                      variant="light"
                      paddingX={18}
                      paddingY={8}
                      fontSize={11}
                      cutTopLeft={8}
                      cutBottomRight={8}
                    >
                      LIVE DEMO ↗
                    </WaspButton>
                  )}

                  {proj.githubUrl && (
                    <WaspButton
                      href={proj.githubUrl}
                      target="_blank"
                      variant="outline"
                      paddingX={18}
                      paddingY={8}
                      fontSize={11}
                      cutTopLeft={8}
                      cutBottomRight={8}
                    >
                      CODE REPO
                    </WaspButton>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
