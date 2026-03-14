import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { LayoutGrid, MonitorSmartphone, Server, Database, Wrench } from "lucide-react";

// ─── SVG Logos (inline, no external deps) ─────────────────────────────────────

const logos = {
  // Frontend Languages & UI
  HTML: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M5 3l2.1 23.5L16 29l8.9-2.5L27 3H5z" fill="#E34F26"/>
      <path d="M16 27.1l7.2-2 1.8-20H16v22.1z" fill="#EF652A"/>
      <path d="M16 13.3h-4.1l-.3-3.3H16V6.8H8.2l.1 1.2.9 10.5H16v-5.2zM16 21.6l-.1.1-3.4-.9-.2-2.5H9l.4 4.7 6.5 1.8h.1v-3.2z" fill="#fff"/>
      <path d="M16 13.3v5.2h3.8l-.4 4.1-3.4.9V27l6.5-1.8.5-5.3.4-4.7-.5.1H16zM16 6.8v3.2h7.3l-.3-3.2H16z" fill="#EBEBEB"/>
    </svg>
  ),
  CSS: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M5 3l2.1 23.5L16 29l8.9-2.5L27 3H5z" fill="#1572B6"/>
      <path d="M16 27.1l7.2-2 1.8-20H16v22z" fill="#33A9DC"/>
      <path d="M16 13.5H11.7l-.3-3.3H16V6.9H8l.1 1.2.9 10.6H16v-5.2zM16 22l-.1.1-3.5-.9-.2-2.5H9l.4 4.7 6.5 1.8.1.1V22z" fill="#fff"/>
      <path d="M16 13.5v5.2h3.9l-.4 4.1-3.5.9v3.4l6.5-1.8.5-5.3.4-4.7-.4.1H16zM16 6.9v3.3h7.2l-.2-3.3H16z" fill="#EBEBEB"/>
    </svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <path d="M9.7 24.8l2.1-1.3c.4.7.8 1.3 1.7 1.3.9 0 1.4-.4 1.4-1.8V15h2.6v8.1c0 3-1.8 4.4-4.3 4.4-2.3 0-3.6-1.2-4.3-2.7zM18.8 24.5l2.1-1.2c.6 1 1.3 1.7 2.6 1.7 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-2-1.8l-.7-.3c-2-.8-3.3-1.9-3.3-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2 1.3c-.5-.8-1-1.1-1.8-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.7 1.6l.7.3c2.3 1 3.7 2 3.7 4.2 0 2.4-1.9 3.7-4.5 3.7-2.5 0-4.1-1.2-4.9-2.8z" fill="#000"/>
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <rect width="32" height="32" rx="4" fill="#3178C6"/>
      <path d="M17.5 18.3v2.2c.4.2.8.3 1.3.4.5.1 1 .1 1.5.1.5 0 1-.1 1.4-.2.5-.1.9-.3 1.2-.5.3-.2.6-.6.8-1 .2-.4.3-.9.3-1.5 0-.4-.1-.8-.2-1.1-.1-.3-.3-.6-.5-.8-.2-.2-.5-.4-.9-.6-.3-.2-.7-.3-1.2-.5-.3-.1-.6-.2-.9-.3-.2-.1-.4-.2-.6-.3-.1-.1-.2-.2-.3-.4-.1-.1-.1-.3-.1-.5 0-.2 0-.3.1-.4.1-.1.1-.2.2-.3.1-.1.3-.1.4-.2.2 0 .4-.1.6-.1.2 0 .4 0 .6.1.2.1.4.1.5.2.2.1.3.2.5.3.1.1.3.2.4.4v-2.1c-.3-.1-.7-.2-1.1-.3-.4-.1-.9-.1-1.4-.1-.5 0-.9.1-1.4.2-.4.1-.8.3-1.1.6-.3.2-.6.5-.8 1-.2.4-.3.9-.3 1.4 0 .7.2 1.3.6 1.8.4.5 1 .9 1.8 1.2.3.1.6.2.9.3.3.1.5.2.7.3.2.1.3.2.4.4.1.1.1.3.1.5 0 .2 0 .3-.1.5-.1.1-.2.2-.3.3-.1.1-.3.2-.5.2-.2 0-.4.1-.6.1-.4 0-.9-.1-1.3-.3-.4-.3-.8-.5-1-.9zM12.5 13.4H16v-2H6.5v2h3.5v9.6h2.5v-9.6z" fill="#fff"/>
    </svg>
  ),
  Bootstrap: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <rect width="32" height="32" rx="6" fill="#7952B3"/>
      <path d="M9 8h8.3c1.1 0 2 .1 2.8.4.8.3 1.4.7 1.8 1.2.4.5.7 1.2.7 2 0 .7-.2 1.3-.5 1.8-.3.5-.8.9-1.5 1.2.9.3 1.6.7 2.1 1.3.5.6.7 1.4.7 2.3 0 .9-.2 1.7-.7 2.3-.4.6-1.1 1.1-2 1.5-.8.3-1.8.5-3 .5H9V8zm2.4 6.1h5.3c.9 0 1.6-.2 2.1-.6.5-.4.7-.9.7-1.6 0-.7-.2-1.2-.7-1.5-.5-.4-1.2-.6-2.1-.6h-5.3v4.3zm0 6.2h5.7c1 0 1.8-.2 2.4-.7.6-.4.8-1.1.8-1.9 0-.8-.3-1.4-.9-1.8-.6-.4-1.4-.6-2.5-.6h-5.5v5z" fill="#fff"/>
    </svg>
  ),
  "Tailwind CSS": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 7c-3.6 0-5.8 1.8-6.7 5.3.9-1.2 2.1-1.7 3.3-1.3.7.2 1.2.7 1.8 1.3.9.9 1.9 2 4.1 2 3.6 0 5.8-1.8 6.7-5.3-.9 1.2-2.1 1.7-3.3 1.3-.7-.2-1.2-.7-1.8-1.3-.9-.9-1.9-2-4.1-2zM9.3 16c-3.6 0-5.8 1.8-6.7 5.3.9-1.2 2.1-1.7 3.3-1.3.7.2 1.2.7 1.8 1.3.9.9 1.9 2 4.1 2 3.6 0 5.8-1.8 6.7-5.3-.9 1.2-2.1 1.7-3.3 1.3-.7-.2-1.2-.7-1.8-1.3-.9-.9-1.9-2-4.1-2z" fill="#06B6D4"/>
    </svg>
  ),
  "React.js": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="2.5" fill="#61DAFB"/>
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none"/>
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(60 16 16)"/>
      <ellipse cx="16" cy="16" rx="12" ry="4.5" stroke="#61DAFB" strokeWidth="1.5" fill="none" transform="rotate(120 16 16)"/>
    </svg>
  ),
  "Material UI": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M2 21.5V10.5l8.5-4.9 8.5 4.9v5.6l-8.5 4.9-4.3-2.5V13l4.3-2.5 4.2 2.5v2.5l-4.2 2.4-4.2-2.4" fill="none" stroke="#007FFF" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 16.1v2.5l8.5 4.9 8.5-4.9V13L21.5 8.1l-4.3 2.5" fill="none" stroke="#007FFF" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  Shadcn: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M21 4 L28 16 L21 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"/>
      <path d="M4 16 L16 16" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="text-foreground"/>
    </svg>
  ),
  "Framer Motion": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M6 4h20v12H16L6 4z" fill="#BB4FFF"/>
      <path d="M6 16h10l10 12H6V16z" fill="#9333EA"/>
      <path d="M16 16l10 12H16V16z" fill="#7C3AED"/>
    </svg>
  ),
  // Backend
  "Express.js": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M3 19.2c3.4.5 5.9-1 8.1-3.4 2.3-2.5 3.7-5.5 5.5-8.2.6-.9 1.2-1.8 2.2-2.3 1.5-.8 3.2-.2 4 1.2.5.8.5 1.8.2 2.7-.8 2.4-2.8 3.8-5.1 4.5-.4.1-.8.2-1.3.3 1.7 2.7 3.4 5.4 5.7 7.5 1.3 1.2 2.8 2 4.6 2.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none" className="text-foreground"/>
    </svg>
  ),
  "Node.js": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 3L4 9.5v13L16 29l12-6.5v-13L16 3z" fill="#339933"/>
      <path d="M16 8v16M10 11.5l6 3.5 6-3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  PHP: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <ellipse cx="16" cy="16" rx="14" ry="8" fill="#777BB4"/>
      <path d="M8 13h2.5c1.4 0 2.3.7 2.3 2 0 1.5-.9 2.3-2.5 2.3H9l-.4 2.2H7L8 13zm1.3 3.2h.9c.7 0 1.1-.3 1.1-1 0-.6-.4-.9-1-.9h-.7l-.3 1.9zM14 13h2.5c1.4 0 2.2.6 2.2 1.8 0 1.7-1 2.5-2.6 2.5h-1.2l-.4 2.2h-1.5L14 13zm1.3 3.1h.8c.7 0 1.1-.3 1.1-1 0-.5-.3-.8-1-.8h-.6l-.3 1.8zM19.4 13H21l-.3 2.2h2l.3-2.2h1.5L23.4 19.5h-1.5l.4-2.5h-2l-.4 2.5h-1.5l1-6.5z" fill="white"/>
    </svg>
  ),
  Laravel: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M29 8.4c0-.1 0-.1 0 0l-.1-.2-.1-.1H28.7l-8.5-2.6h-.3l-.1.1-5.3 4.3-5.3-1.6h-.3l-.1.1-5.7 4.8-.1.2v.1l.1.2 2.6.8v8.5l.1.2.1.1 8.5 2.6h.3l.1-.1 5.7-4.8.1-.2v-.1l-.1-.2-2.6-.8v-2.9l2.8.9h.3l.1-.1 8.5-7.1.1-.2c.1 0 .1-.1 0 0zM14.8 23l-7.5-2.3v-7.8l7.5 2.3V23zm.9-8.6l-7.3-2.2 4.8-4.1 7.3 2.2-4.8 4.1zm5.6 3.5l-2.9-.9v-2.9l-.1-.2-.1-.1-4.5-1.4 4.1-3.4 7.5 2.3-4 3.4-3.5-1.1.1.1.1.2v2.8l3.3 1v-.1l-3.3 3.6-.1-.1-7.5-2.3v.1l7.5 2.3-4.5 3.8-7.5-2.3-.1-.2V9.5l4.9 1.5-.1.1-4.8 4.1.1.1 4.8-4.1.1-.1-4.9-1.5 4.8-4 5 1.5-4.8 4.1 7.3 2.2 4.8-4.1-7.3-2.2-5-1.5-5 1.5.1.1 5-1.5 5.3 1.6v.1l-5.3-1.6-5 1.6v.1l5-1.6z" fill="#FF2D20"/>
    </svg>
  ),
  Flask: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M13 4v10L6 24c-1 1.8.2 4 2.3 4h15.4c2.1 0 3.3-2.2 2.3-4l-7-10V4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"/>
      <path d="M11 4h10M9 20h14" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" className="text-foreground"/>
      <circle cx="12" cy="23" r="1" fill="#3B82F6"/>
      <circle cx="17" cy="25" r="1.2" fill="#3B82F6"/>
      <circle cx="21" cy="22" r="0.8" fill="#3B82F6"/>
    </svg>
  ),
  // Databases
  MySQL: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 5C9.4 5 4 8.1 4 12s5.4 7 12 7 12-3.1 12-7-5.4-7-12-7z" fill="#00758F"/>
      <path d="M4 12v4c0 3.9 5.4 7 12 7s12-3.1 12-7v-4c0 3.9-5.4 7-12 7S4 15.9 4 12z" fill="#F29111"/>
      <path d="M4 16v4c0 3.9 5.4 7 12 7s12-3.1 12-7v-4c0 3.9-5.4 7-12 7S4 19.9 4 16z" fill="#00758F"/>
      <ellipse cx="16" cy="12" rx="12" ry="7" fill="none" stroke="#fff" strokeWidth="0.8" opacity="0.3"/>
    </svg>
  ),
  PostgreSQL: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M21.5 5C19 3.5 16 3 13 4c-2 .7-3.7 2-5 3.7-1.2 1.7-1.8 3.7-1.8 5.7 0 2.5.8 4.8 2.3 6.6l.8 7h2l.5-3.5c1 .3 2 .5 3 .5 1.1 0 2.2-.2 3.2-.5l.5 3.5h2l.8-7c1.5-1.8 2.3-4.1 2.3-6.6 0-3.3-1.5-6.3-4.1-7.9z" fill="#336791"/>
      <path d="M16 7c-3.3 0-6 2.7-6 6s2.7 6 6 6 6-2.7 6-6-2.7-6-6-6z" fill="#fff" opacity="0.15"/>
      <circle cx="13.5" cy="12" r="1.5" fill="white"/>
      <circle cx="18.5" cy="12" r="1.5" fill="white"/>
    </svg>
  ),
  MongoDB: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 3c-1.5 6-6 9-6 14.5C10 22.5 12.7 26 16 26s6-3.5 6-8.5C22 12 17.5 9 16 3z" fill="#47A248"/>
      <path d="M16 3v23" stroke="#fff" strokeWidth="1" opacity="0.5"/>
      <path d="M16 26v3" stroke="#47A248" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  // Tools
  "Git/Github": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 3C8.8 3 3 8.8 3 16c0 5.8 3.8 10.8 9 12.5.7.1.9-.3.9-.6v-2.2c-3.7.8-4.5-1.8-4.5-1.8-.6-1.6-1.5-2-1.5-2-1.2-.8.1-.8.1-.8 1.4.1 2.1 1.4 2.1 1.4 1.2 2.1 3.2 1.5 4 1.1.1-.9.5-1.5.9-1.8-3-.3-6.1-1.5-6.1-6.6 0-1.5.5-2.7 1.3-3.6-.1-.3-.6-1.7.1-3.5 0 0 1.1-.4 3.7 1.4 1.1-.3 2.2-.4 3.3-.4s2.2.1 3.3.4c2.6-1.8 3.7-1.4 3.7-1.4.7 1.8.3 3.2.1 3.5.8.9 1.3 2.1 1.3 3.6 0 5.1-3.1 6.3-6.1 6.6.5.4.9 1.2.9 2.4v3.6c0 .3.2.7.9.6C25.2 26.8 29 21.8 29 16 29 8.8 23.2 3 16 3z" fill="currentColor" className="text-foreground"/>
    </svg>
  ),
  "Apache JMeter": (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <rect width="32" height="32" rx="6" fill="#D22128"/>
      <path d="M8 16c0-4.4 3.6-8 8-8s8 3.6 8 8" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <path d="M11 20l2-8 3 6 2-4 2 6" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
    </svg>
  ),
  Jest: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M15 3H7C5.3 3 4 4.3 4 6v4.7c0 7.6 4.7 14.4 11.8 17.1l.2.1.2-.1C23.3 25.1 28 18.3 28 10.7V6c0-1.7-1.3-3-3-3h-8l-1-1H15z" fill="#99425B"/>
      <path d="M12.5 18.5l-2-2 1.4-1.4 2 2 4.2-4.2 1.4 1.4-5.6 5.6-.1.1-.1-.1-.1-.1-.1.1v.1z" fill="white"/>
    </svg>
  ),
  Postman: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="13" fill="#FF6C37"/>
      <path d="M21.5 14.5L13 10l1.5 5-1.5 5 8.5-4.5-2-1 2-1z" fill="white"/>
      <path d="M10.5 16c0-3 2.5-5.5 5.5-5.5" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  LLMs: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <circle cx="16" cy="16" r="4" fill="#8B5CF6"/>
      <circle cx="7" cy="10" r="2.5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="25" cy="10" r="2.5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="7" cy="22" r="2.5" fill="#8B5CF6" opacity="0.7"/>
      <circle cx="25" cy="22" r="2.5" fill="#8B5CF6" opacity="0.7"/>
      <path d="M16 12L7 10M16 12L25 10M16 20L7 22M16 20L25 22" stroke="#8B5CF6" strokeWidth="1.5" opacity="0.6"/>
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M17.5 13h2.5v2.5h-2.5zM14.5 13H17v2.5h-2.5zM11.5 13H14v2.5h-2.5zM14.5 10H17v2.5h-2.5zM17.5 10H20v2.5h-2.5z" fill="#2496ED"/>
      <path d="M28.5 14.5c-.5-.4-1.7-.5-2.6-.3-.1-1-.7-1.9-1.6-2.5l-.5-.3-.3.5c-.4.6-.5 1.7-.2 2.5-.3.2-.9.4-1.7.4H3.5c-.2 1.2.1 2.8 1 4 .8 1.2 2.1 1.8 3.7 1.8 3.5 0 6.1-1.6 7.7-4.5.9 0 2.8 0 3.8-1.9.1 0 .5-.3.7-.4l-.4-.3z" fill="#2496ED"/>
    </svg>
  ),
  Kubernetes: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <path d="M16 3l-12 6.5v13L16 29l12-6.5v-13L16 3z" fill="#326CE5"/>
      <path d="M16 8v16M10 11l12 10M22 11L10 21" stroke="white" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="16" cy="16" r="2" fill="white"/>
    </svg>
  ),
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "all",      label: "All",                     icon: LayoutGrid },
  { id: "frontend", label: "Frontend",                icon: MonitorSmartphone },
  { id: "backend",  label: "Backend",                 icon: Server },
  { id: "database", label: "Databases",               icon: Database },
  { id: "tools",    label: "Tools & Platforms",       icon: Wrench },
];

const SKILLS = [
  // Frontend
  { name: "HTML",           category: "frontend", color: "from-orange-500 to-red-400" },
  { name: "CSS",            category: "frontend", color: "from-blue-500 to-cyan-400" },
  { name: "JavaScript",     category: "frontend", color: "from-yellow-400 to-amber-300" },
  { name: "TypeScript",     category: "frontend", color: "from-blue-600 to-blue-400" },
  { name: "Bootstrap",      category: "frontend", color: "from-purple-600 to-violet-400" },
  { name: "Tailwind CSS",   category: "frontend", color: "from-cyan-500 to-teal-400" },
  { name: "React.js",       category: "frontend", color: "from-sky-400 to-cyan-300" },
  { name: "Material UI",    category: "frontend", color: "from-blue-500 to-indigo-400" },
  { name: "Shadcn",         category: "frontend", color: "from-zinc-500 to-zinc-400" },
  { name: "Framer Motion",  category: "frontend", color: "from-purple-600 to-fuchsia-400" },
  // Backend
  { name: "Express.js",     category: "backend",  color: "from-zinc-500 to-zinc-400" },
  { name: "Node.js",        category: "backend",  color: "from-green-600 to-green-400" },
  { name: "PHP",            category: "backend",  color: "from-indigo-500 to-purple-400" },
  { name: "Laravel",        category: "backend",  color: "from-red-500 to-rose-400" },
  { name: "Flask",          category: "backend",  color: "from-slate-500 to-slate-400" },
  // Databases
  { name: "MySQL",          category: "database", color: "from-sky-600 to-cyan-500" },
  { name: "PostgreSQL",     category: "database", color: "from-blue-700 to-blue-500" },
  { name: "MongoDB",        category: "database", color: "from-green-600 to-emerald-400" },
  // Tools
  { name: "Git/Github",     category: "tools",    color: "from-zinc-600 to-zinc-400" },
  { name: "Apache JMeter",  category: "tools",    color: "from-red-600 to-red-400" },
  { name: "Jest",           category: "tools",    color: "from-rose-700 to-pink-500" },
  { name: "Postman",        category: "tools",    color: "from-orange-500 to-amber-400" },
  { name: "LLMs",           category: "tools",    color: "from-violet-600 to-purple-400" },
  { name: "Docker",         category: "tools",    color: "from-blue-500 to-sky-400" },
  { name: "Kubernetes",     category: "tools",    color: "from-blue-700 to-indigo-500" },
];

// ─── Skill Card ───────────────────────────────────────────────────────────────

const SkillCard = ({ skill, index, inView }) => {
  const Logo = logos[skill.name];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5, scale: 1.04 }}
      className="group flex flex-col items-center gap-3 p-5 rounded-2xl bg-card border border-border hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 cursor-default"
    >
      {/* Logo bubble */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-br ${skill.color} p-0.5 shadow-md`}>
        <div className="w-full h-full rounded-[14px] bg-card flex items-center justify-center p-2.5 overflow-hidden">
          {Logo ? (
            <div className="w-full h-full">{Logo}</div>
          ) : (
            <span className="text-lg font-bold text-foreground">{skill.name[0]}</span>
          )}
        </div>
        {/* Glow on hover */}
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300 pointer-events-none`} />
      </div>

      {/* Name */}
      <span className="text-xs font-semibold text-center text-foreground leading-tight group-hover:text-primary transition-colors duration-200">
        {skill.name}
      </span>
    </motion.div>
  );
};

// ─── Main Section ─────────────────────────────────────────────────────────────

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? SKILLS
      : SKILLS.filter((s) => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding gradient-subtle-bg" ref={ref}>
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <span className="text-sm font-semibold text-primary uppercase tracking-widest">Skills</span>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold text-foreground">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground max-w-md mx-auto">
            Technologies and tools I use to design, build, and ship quality software.
          </p>
        </motion.div>

        {/* Category filter tabs */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.15 }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {CATEGORIES.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveCategory(id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 ${
                activeCategory === id
                  ? "bg-primary text-primary-foreground border-primary shadow-md shadow-primary/20"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
              }`}
            >
              <Icon size={13} />
              {label}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"
          >
            {filtered.map((skill, i) => (
              <SkillCard key={skill.name} skill={skill} index={i} inView={isInView} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
};

export default SkillsSection;