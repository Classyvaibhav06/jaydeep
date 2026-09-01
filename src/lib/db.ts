import { neon } from "@neondatabase/serverless";

export function getDb() {
  const databaseUrl =
    process.env.DATABASE_URL ||
    "postgresql://neondb_owner:npg_6fmQKyBeTY7r@ep-bold-mouse-aeox7um2-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require";
  return neon(databaseUrl);
}

export async function initDb() {
  const sql = getDb();

  // Create tables if they don't exist
  await sql`
    CREATE TABLE IF NOT EXISTS portfolio_config (
      id VARCHAR(50) PRIMARY KEY,
      headline VARCHAR(255) NOT NULL,
      subheadline TEXT NOT NULL,
      cta_text VARCHAR(100) NOT NULL,
      cta_link VARCHAR(255) NOT NULL,
      stat1_value VARCHAR(50) NOT NULL,
      stat1_label VARCHAR(100) NOT NULL,
      stat2_value VARCHAR(50) NOT NULL,
      stat2_label VARCHAR(100) NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS skills (
      id VARCHAR(100) PRIMARY KEY,
      name VARCHAR(150) NOT NULL,
      level INT NOT NULL,
      category VARCHAR(50) NOT NULL,
      code VARCHAR(50) NOT NULL,
      tagline TEXT NOT NULL,
      tags JSONB NOT NULL,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS projects (
      id VARCHAR(100) PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      codename VARCHAR(100) NOT NULL,
      category VARCHAR(50) NOT NULL,
      tagline TEXT NOT NULL,
      description TEXT NOT NULL,
      architecture JSONB NOT NULL,
      metrics JSONB NOT NULL,
      tags JSONB NOT NULL,
      github_url TEXT,
      live_url TEXT,
      featured BOOLEAN DEFAULT false,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS experiences (
      id VARCHAR(100) PRIMARY KEY,
      role VARCHAR(255) NOT NULL,
      company VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      period VARCHAR(100) NOT NULL,
      badge VARCHAR(100) NOT NULL,
      overview TEXT NOT NULL,
      achievements JSONB NOT NULL,
      technologies JSONB NOT NULL,
      sort_order INT DEFAULT 0,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS inquiries (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      subject VARCHAR(255) NOT NULL,
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `;

  // ── Seed portfolio_config if empty ──
  const existingConfig = await sql`SELECT id FROM portfolio_config WHERE id = 'main'`;
  if (existingConfig.length === 0) {
    await sql`
      INSERT INTO portfolio_config (
        id, headline, subheadline, cta_text, cta_link,
        stat1_value, stat1_label, stat2_value, stat2_label
      ) VALUES (
        'main',
        'MACHINE LEARNING & AI SYSTEMS',
        'Architecting high-throughput neural models, autonomous LLM pipelines, and ultra-low-latency distributed inference engines.',
        'EXPLORE MODELS',
        '#skills',
        '25M+',
        'Daily Inferences',
        '< 38ms',
        'P99 Inference Latency'
      )
    `;
  }

  // ── Seed skills if empty ──
  const existingSkills = await sql`SELECT id FROM skills LIMIT 1`;
  if (existingSkills.length === 0) {
    const defaultSkills = [
      {
        id: "nextjs",
        name: "Next.js 16 / React 19",
        level: 95,
        category: "frontend",
        code: "UI-01 // CORE",
        tagline: "Server Components, streaming SSR, App Router architecture.",
        tags: ["React 19", "Server Actions", "Turbopack", "Hydration"],
        sort_order: 1,
      },
      {
        id: "typescript",
        name: "TypeScript (Strict)",
        level: 92,
        category: "frontend",
        code: "TS-02 // TYPE",
        tagline: "Generic inference, AST transforms, strict null safety.",
        tags: ["Generics", "Type Guards", "Utility Types", "AST"],
        sort_order: 2,
      },
      {
        id: "tailwind",
        name: "Tailwind CSS v4 & Styling",
        level: 96,
        category: "frontend",
        code: "CSS-03 // STYLE",
        tagline: "Dynamic token systems, high-performance CSS animations.",
        tags: ["Tailwind v4", "CSS Variables", "Responsive", "Tokens"],
        sort_order: 3,
      },
      {
        id: "framer",
        name: "Framer Motion & Micro-UI",
        level: 88,
        category: "frontend",
        code: "ANIM-04 // FX",
        tagline: "Layout orchestration, springs, gesture-driven HUD components.",
        tags: ["Layout Animations", "Gestures", "Springs", "SVG Paths"],
        sort_order: 4,
      },
      {
        id: "pytorch",
        name: "PyTorch & Deep Learning",
        level: 94,
        category: "ai",
        code: "AI-01 // TENSOR",
        tagline: "Transformer backbones, custom CUDA ops, distributed training.",
        tags: ["TorchDynamo", "CUDA", "Multi-GPU", "FlashAttention"],
        sort_order: 5,
      },
      {
        id: "vllm",
        name: "vLLM & Inference Serving",
        level: 92,
        category: "ai",
        code: "AI-02 // SERVE",
        tagline: "PagedAttention, continuous batching, AWQ/GGUF quantization.",
        tags: ["Continuous Batching", "PagedAttention", "AWQ", "Triton"],
        sort_order: 6,
      },
      {
        id: "langchain",
        name: "LangChain & Multi-Agents",
        level: 90,
        category: "ai",
        code: "AI-03 // AGENT",
        tagline: "Hierarchical agent DAGs, semantic routing, tool reflection.",
        tags: ["Agent Swarms", "Tool Calling", "Reflection", "DAGs"],
        sort_order: 7,
      },
      {
        id: "tensorrt",
        name: "TensorRT & Computer Vision",
        level: 86,
        category: "ai",
        code: "AI-04 // VISION",
        tagline: "Zero-shot YOLO segmentation, ONNX runtime, Jetson deployment.",
        tags: ["YOLOv10", "SAM", "ONNX", "Edge AI"],
        sort_order: 8,
      },
      {
        id: "fastapi",
        name: "FastAPI & Python Async",
        level: 92,
        category: "backend",
        code: "API-01 // ASYNC",
        tagline: "High-throughput asynchronous microservices, gRPC streaming.",
        tags: ["AsyncIO", "Pydantic v2", "gRPC", "WebSockets"],
        sort_order: 9,
      },
      {
        id: "pgvector",
        name: "pgvector & Qdrant (RAG)",
        level: 90,
        category: "backend",
        code: "DATA-02 // VEC",
        tagline: "Hybrid dense-sparse indexing, cross-encoder re-ranking.",
        tags: ["HNSW", "Cosine Indexing", "ColBERT", "Hybrid RAG"],
        sort_order: 10,
      },
      {
        id: "redis",
        name: "Redis Semantic Cache",
        level: 88,
        category: "backend",
        code: "DATA-03 // CACHE",
        tagline: "High-speed token buffer, Pub/Sub message broker.",
        tags: ["Semantic Caching", "Pub/Sub", "In-Memory", "Low Latency"],
        sort_order: 11,
      },
      {
        id: "docker-k8s",
        name: "Docker & Kubernetes",
        level: 89,
        category: "devops",
        code: "OPS-01 // CLOUD",
        tagline: "Multi-node GPU orchestration, auto-scaling, Helm charts.",
        tags: ["K8s", "GPU Operators", "Helm", "Multi-Cloud"],
        sort_order: 12,
      },
    ];

    for (const s of defaultSkills) {
      await sql`
        INSERT INTO skills (id, name, level, category, code, tagline, tags, sort_order)
        VALUES (${s.id}, ${s.name}, ${s.level}, ${s.category}, ${s.code}, ${s.tagline}, ${JSON.stringify(s.tags)}, ${s.sort_order})
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  // ── Seed projects if empty ──
  const existingProjects = await sql`SELECT id FROM projects LIMIT 1`;
  if (existingProjects.length === 0) {
    const defaultProjects = [
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
        github_url: "https://github.com",
        live_url: "https://demo.example.com",
        sort_order: 1,
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
        github_url: "https://github.com",
        live_url: "https://demo.example.com",
        sort_order: 2,
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
        github_url: "https://github.com",
        live_url: "https://demo.example.com",
        sort_order: 3,
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
        github_url: "https://github.com",
        live_url: "https://demo.example.com",
        sort_order: 4,
      },
    ];

    for (const p of defaultProjects) {
      await sql`
        INSERT INTO projects (
          id, title, codename, category, tagline, description,
          architecture, metrics, tags, github_url, live_url, featured, sort_order
        ) VALUES (
          ${p.id}, ${p.title}, ${p.codename}, ${p.category}, ${p.tagline}, ${p.description},
          ${JSON.stringify(p.architecture)}, ${JSON.stringify(p.metrics)}, ${JSON.stringify(p.tags)},
          ${p.github_url}, ${p.live_url}, ${p.featured}, ${p.sort_order}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }

  // ── Seed experiences if empty ──
  const existingExp = await sql`SELECT id FROM experiences LIMIT 1`;
  if (existingExp.length === 0) {
    const defaultExp = [
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
        ],
        technologies: ["PyTorch", "vLLM", "LangChain", "TensorRT", "Kubernetes", "Ray", "Python", "Docker"],
        sort_order: 1,
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
        ],
        technologies: ["Next.js 15", "FastAPI", "OpenCV", "CUDA", "Redis", "TypeScript", "Tailwind CSS"],
        sort_order: 2,
      },
    ];

    for (const e of defaultExp) {
      await sql`
        INSERT INTO experiences (
          id, role, company, location, period, badge, overview,
          achievements, technologies, sort_order
        ) VALUES (
          ${e.id}, ${e.role}, ${e.company}, ${e.location}, ${e.period}, ${e.badge}, ${e.overview},
          ${JSON.stringify(e.achievements)}, ${JSON.stringify(e.technologies)}, ${e.sort_order}
        )
        ON CONFLICT (id) DO NOTHING;
      `;
    }
  }
}
