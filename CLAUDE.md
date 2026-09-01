# 🌌 JAYDEEP Portfolio Architecture & Dev Guide

## Overview
This repository contains the production source for the **Jaydeep** Machine Learning & AI Systems developer portfolio and live administration dashboard.

## Key Stack
- **Framework**: Next.js 16 (App Router)
- **UI Engine**: React 19, Tailwind CSS v4, Custom CSS Tokens
- **Database**: Neon Serverless PostgreSQL (`@neondatabase/serverless`)
- **Admin Hub**: `/admin` (Dynamic CRUD management with password authentication)
- **Theme System**: Circular Ripple View Transitions API (Dark / Light)

## Useful Commands
- `npm run dev` — Start the Next.js local development server (port 3000)
- `npm run build` — Build production bundle for Vercel deployment
- `npx tsc --noEmit` — Run TypeScript type checking