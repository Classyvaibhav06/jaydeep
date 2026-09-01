"use client";

import { useEffect, useRef } from "react";

export default function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => {
        // autoplay blocked — still shows poster
      });
    }
  }, []);

  return (
    <section
      id="hero"
      className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col"
    >
      {/* ── Background video ── */}
      <div className="absolute inset-0 z-0">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          src="/bcck.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        {/* Gradient overlay */}
        <div className="hero-video-overlay absolute inset-0 z-10" />
      </div>

      {/* ── Navbar ── */}
      <nav className="relative z-20 flex items-center justify-between px-8 md:px-14 pt-8">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <span className="text-white font-bold text-xl tracking-widest uppercase font-mono">
            JAY
          </span>
          <div className="w-1.5 h-1.5 rounded-full bg-white/80" />
          <span className="text-white/60 font-light text-xs tracking-widest uppercase">
            DEV
          </span>
        </div>

        {/* Nav links */}
        <ul className="hidden md:flex items-center gap-10">
          {["About", "Projects", "Skills", "Contact"].map((item) => (
            <li key={item}>
              <a
                href={`#${item.toLowerCase()}`}
                className="hover-underline text-white/70 hover:text-white text-sm tracking-wide transition-colors duration-200"
              >
                {item}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <a
          href="#contact"
          id="hero-hire-btn"
          className="btn-shimmer relative overflow-hidden bg-white text-black text-sm font-semibold tracking-widest uppercase px-6 py-2.5 clip-chevron transition-all duration-300 hover:bg-white/90"
        >
          HIRE ME
        </a>
      </nav>

      {/* ── Hero content ── */}
      <div className="relative z-20 flex-1 flex flex-col justify-end px-8 md:px-14 pb-16">
        {/* Available badge */}
        <div className="opacity-0-start animate-fade-up delay-100 mb-6 inline-flex items-center gap-2 w-fit">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
          </span>
          <span className="text-white/60 text-xs tracking-widest uppercase">
            Available for work
          </span>
        </div>

        {/* Main headline */}
        <h1 className="text-glow opacity-0-start animate-fade-up delay-200 font-bold leading-none tracking-tight mb-4">
          <span className="block text-[clamp(3rem,8vw,7rem)] text-white uppercase">
            FULL STACK
          </span>
          <span className="block text-[clamp(3rem,8vw,7rem)] text-white/80 uppercase">
            DEVELOPER.
          </span>
        </h1>

        {/* Sub-text + button row */}
        <div className="opacity-0-start animate-fade-up delay-300 flex flex-col sm:flex-row sm:items-end gap-6 mb-12">
          <p className="text-white/50 text-sm leading-relaxed max-w-xs">
            Crafting scalable, pixel-perfect digital products with modern
            technologies and a passion for clean architecture.
          </p>
          <a
            href="#projects"
            id="hero-projects-btn"
            className="btn-shimmer relative overflow-hidden bg-white/10 border border-white/20 backdrop-blur-sm text-white text-sm font-semibold tracking-widest uppercase px-8 py-3 clip-chevron transition-all duration-300 hover:bg-white/20 hover:border-white/40 whitespace-nowrap"
          >
            VIEW WORK →
          </a>
        </div>

        {/* Stats bar */}
        <div className="opacity-0-start animate-fade-up delay-400">
          {/* Thin rule */}
          <div className="w-full h-px bg-white/10 mb-6" />

          <div className="flex items-center gap-8 sm:gap-12 flex-wrap">
            <Stat icon="⬡" value="3+" label="years experience" />
            <div className="stat-divider hidden sm:block" />
            <Stat icon="◈" value="20+" label="projects shipped" />
            <div className="stat-divider hidden sm:block" />
            <Stat icon="◎" value="8+" label="happy clients" />
          </div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="opacity-0-start animate-fade-in delay-700 absolute bottom-6 right-10 z-20 flex flex-col items-center gap-2">
        <span className="text-white/30 text-[10px] tracking-widest uppercase rotate-90 origin-center translate-x-4">
          scroll
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-white/30 to-transparent" />
      </div>
    </section>
  );
}

/* ── Stat sub-component ── */
function Stat({
  icon,
  value,
  label,
}: {
  icon: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-white/40 text-lg leading-none">{icon}</span>
      <div>
        <p className="text-white font-bold text-xl leading-none">{value}</p>
        <p className="text-white/40 text-xs tracking-wide mt-0.5">{label}</p>
      </div>
    </div>
  );
}
