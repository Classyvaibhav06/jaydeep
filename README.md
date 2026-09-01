# 🌌 JAYDEEP — Machine Learning & AI Systems Portfolio

An ultra-modern, high-performance developer portfolio and live AI systems control hub engineered with Next.js 16, React 19, TypeScript, Tailwind CSS, and Neon Serverless PostgreSQL.

![Preview](public/desktop.mp4)

---

## ⚡ Key Highlights & Architecture

- **🎮 Sci-Fi / Cyberpunk HUD Interface**: Chamfered glass cards, vector HUD cutouts, telemetry metrics, and animated pixel art branding.
- **🌓 Smooth Ripple Theme Toggle**: Circular clip-path View Transition engine seamlessly toggling between dark cyberpunk mode and architectural light mode.
- **🗄️ Neon Serverless PostgreSQL Backend**: Cloud-native database powering live content management, skills matrix, projects, and message dispatches.
- **🎛️ Dynamic Admin Control Hub (`/admin`)**: Password-protected dashboard enabling real-time editing of hero headlines, telemetry stats, video opacity, skills, and projects.
- **🔬 Interactive Live Inference Simulator**: Real-time topology benchmark simulator testing token throughput (TPS), time-to-first-token (TTFT), and 5-stage inference node inspectors.
- **📟 Interactive CLI Terminal**: Interactive cyber command prompt supporting `$help`, `$skills`, `$projects`, `$contact`, and encrypted message dispatching.

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- npm / yarn / pnpm

### 2. Environment Variables
Create a `.env.local` file in the root directory:

```env
DATABASE_URL="postgresql://neondb_owner:npg_6fmQKyBeTY7r@ep-bold-mouse-aeox7um2-pooler.c-2.us-east-2.aws.neon.tech/neondb?sslmode=require"
ADMIN_PASSWORD="your-admin-password"
```

### 3. Install Dependencies & Run Locally
```bash
npm install
npm run dev
```

Visit [`http://localhost:3000`](http://localhost:3000) for the portfolio and [`http://localhost:3000/admin`](http://localhost:3000/admin) for the control hub.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router & Server Components)
- **UI & Runtime**: React 19, TypeScript
- **Styling**: Tailwind CSS v4, Custom CSS Tokens, Glassmorphism
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Deployment**: Vercel Edge Network

---

## 📄 License
MIT © [Classyvaibhav06](https://github.com/Classyvaibhav06)
