import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { LayoutGrid, MonitorSmartphone, Server, Database, Wrench } from "lucide-react";

// ─── SVG Logos (inline, no external deps) ─────────────────────────────────────

const logos = {
  // Frontend Languages & UI
  HTML: (
<svg viewBox="0 0 28 28" xmlns="http://www.w3.org/2000/svg" fill="#E34F26" className="w-full h-full">
  <path d="M1.6 0l2.4 27.2 9.6 2.7 9.6-2.7L25.6 0H1.6zm19.2 8H9.4l.3 3.1h10.9l-.8 8.7-6.2 1.7-6-1.7-.3-2h3l.2 2.4 3.2.9 3.2-.9.4-3.9H6.1l-.8-9.1L21.1 5l-.3 3z" />
</svg>
  ),
  CSS: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="CSS3" role="img" className="w-full h-full">
  <path fill="#264DE4" d="M72 460L30 0h451l-41 460-184 52z"/>
  <path fill="#2965F1" d="M256 37v435l149-41 35-394H256z"/>
  <path fill="#EBEBEB" d="M114 94h142v56H119l-1 58h138v57H129l3 28h56l4 45 64 17v59l-117-32z"/>
  <path fill="#FFF" d="M256 208v57h69l-7 73-62 17v59l115-32 26-288H256v56h80l-5 58h-75z"/>
</svg>
  ),
  JavaScript: (
    <svg viewBox="0 0 32 32" fill="none" className="w-full h-full">
      <rect width="32" height="32" rx="4" fill="#F7DF1E"/>
      <path d="M9.7 24.8l2.1-1.3c.4.7.8 1.3 1.7 1.3.9 0 1.4-.4 1.4-1.8V15h2.6v8.1c0 3-1.8 4.4-4.3 4.4-2.3 0-3.6-1.2-4.3-2.7zM18.8 24.5l2.1-1.2c.6 1 1.3 1.7 2.6 1.7 1.1 0 1.8-.5 1.8-1.3 0-.9-.7-1.2-2-1.8l-.7-.3c-2-.8-3.3-1.9-3.3-4 0-2 1.5-3.5 3.9-3.5 1.7 0 2.9.6 3.8 2.1l-2 1.3c-.5-.8-1-1.1-1.8-1.1-.8 0-1.3.5-1.3 1.1 0 .8.5 1.1 1.7 1.6l.7.3c2.3 1 3.7 2 3.7 4.2 0 2.4-1.9 3.7-4.5 3.7-2.5 0-4.1-1.2-4.9-2.8z" fill="#000"/>
    </svg>
  ),
  TypeScript: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 130" aria-label="TypeScript" role="img" className="w-full h-full">
  <path fill="#3178C6" d="M63.8 11.3H37.3v82.3h-10.9V11.3H0V1.6h63.8v9.7zM113.9 27.9l-30.3 76.2c-5.3 13.6-13 20.4-22.7 20.4-2.8 0-5.1-.3-6.9-.8v-9.4c2.3.8 4.4 1.1 6.2 1.1 5.3 0 9.2-3.2 12-9.5l5.2-12.5-25.6-65.6h11.7l17.8 50.5c.2.6.7 2.3 1.3 5h.3c.2-1 .7-2.6 1.3-4.9l18.6-50.5h11zM131 84.1h-.3v39.6h-10.5V27.9h10.5v11.5h.3c5.2-8.8 12.8-13.2 22.7-13.2 8.4 0 15 2.9 19.7 8.7s7.2 13.8 7.2 23.7c0 11-2.8 19.7-8.1 26.4-5.3 6.6-12.6 9.9-21.9 9.9-8.2.3-14.8-3.4-19.6-10.8zm-.1-26.4v9.2c0 5.5 1.8 10 5.3 13.7 3.6 3.7 8 5.6 13.5 5.6 6.3 0 11.3-2.4 15.1-7.3 3.5-4.8 5.3-11.6 5.3-20.4 0-7.3-1.6-13.1-5-17.1-3.4-4.2-7.9-6.2-13.7-6.2-6.2 0-11 2.1-14.8 6.3-3.8 4.2-5.7 9.5-5.7 16.2zM245.1 63.3h-46.4c.2 7.3 2.1 13 5.8 17 3.7 4 8.9 6 15.6 6 7.5 0 14.3-2.4 20.4-7.3v9.9c-5.8 4.2-13.4 6.3-22.8 6.3-9.2 0-16.5-2.9-21.8-8.9-5.3-6-7.9-14.4-7.9-25.1 0-10.2 2.9-18.6 8.7-25 5.8-6.5 13-9.7 21.6-9.7 8.6 0 15.2 2.7 19.9 8.4 4.7 5.5 7.1 13.3 7.1 23.2l-.2 5.2zm-10.9-8.9c0-6.2-1.5-10.9-4.4-14.3-2.9-3.4-7-5-12-5s-9.2 1.8-12.6 5.3c-3.4 3.6-5.7 8.3-6.5 14h35.5zM250.2 90.4v-7.3c6.6 4.2 13.3 6.3 20.1 6.3 7.1 0 12.6-1.5 16.4-4.5 3.7-3.1 5.5-7.1 5.5-12.5 0-4.7-1.3-8.4-3.7-11.3-2.4-2.8-7.9-6.7-16.2-11.5-9.4-5.5-15.2-10-17.6-13.6-2.4-3.7-3.7-7.9-3.7-12.6 0-6.5 2.6-12 7.6-16.5 5-4.5 11.8-6.8 20.3-6.8 5.5 0 11 1 16.4 2.8v6.6c-5.3-2.4-11.2-3.7-17.3-3.7-6.3 0-11.2 1.6-14.9 4.7-3.7 3.2-5.5 7.1-5.5 12 0 4.7 1.3 8.4 3.7 11.2 2.4 2.8 7.9 6.7 16.2 11.5 8.6 4.9 14.3 9.3 17.2 13 2.9 3.7 4.2 8.1 4.2 13.1 0 7.1-2.4 12.8-7.3 17.3-4.9 4.5-11.8 6.6-20.7 6.6-3.2 0-6.8-.5-11-1.5-4.2-.9-7.3-1.7-9.4-3zm103.2.3c-4.9 2.9-10.7 4.5-17.5 4.5-8.9 0-16.2-3.1-21.7-9.2-5.5-6.2-8.3-14.1-8.3-24.1 0-10.4 3.1-19 9.2-25.6 6.2-6.6 14.1-10 23.8-10 5 0 9.9 1 14.6 3.1v6.7c-4.7-2.9-9.9-4.4-15.4-4.4-7.8 0-13.9 2.7-18.8 8.3-4.9 5.5-7.1 12.8-7.1 21.5 0 8.6 2.3 15.4 6.6 20.6 4.4 5.2 10.2 7.8 17.3 7.8 6.6 0 12.3-1.8 17.2-5.2l.1 6.1zM392.6 34c-1.9-1.5-4.2-2.1-6.9-2.1-5.2 0-9.6 2.8-13 8.1s-5.2 13-5.2 22.8v30.9h-5.8V27.9h5.8v14.6h.3c1.5-5 3.9-8.9 7.2-11.6 3.2-2.8 7-4.2 11.3-4.2 2.4 0 4.7.3 6.5 1.1v6.3l-.2-.1zM402 11.3c-1.3 0-2.4-.5-3.4-1.5-1-1-1.5-2.1-1.5-3.5 0-1.5.5-2.6 1.5-3.4 1-.8 2.1-1.3 3.4-1.3s2.4.5 3.6 1.3c1 .8 1.5 2 1.5 3.4 0 1.3-.5 2.6-1.5 3.6-1.1 1-2.2 1.4-3.5 1.4zm-2.9 82.3V27.9h5.8v65.7h-5.8zM425.2 82h-.3v41.9h-5.8V27.9h5.8v13.6h.3c2.4-4.9 5.7-8.6 10.1-11.2 4.4-2.6 9.2-3.9 14.4-3.9 8.4 0 14.9 2.9 19.6 8.7 4.7 5.8 7 13.6 7 23.5 0 11-2.8 19.9-8.1 26.7s-12.5 10.2-21.2 10.2c-9.7-.1-17-4.5-21.7-13.4zm-.3-24.5v8.3c0 6.6 2.1 12.3 6.1 17 4.2 4.7 9.6 7.1 16.4 7.1 6.6 0 12.1-2.9 16.3-8.6 4.2-5.8 6.3-13.3 6.3-22.7 0-8.3-1.9-14.8-5.8-19.6-3.9-4.9-8.9-7.3-15.4-7.3-7.6 0-13.6 2.6-17.8 7.8-4.2 5.1-6.1 11-6.1 18zM512 92.6c-3.1 1.5-6 2.1-8.6 2.1-9.7 0-14.6-5.8-14.6-17.5V33.4h-11.8V28h11.8V10.9l2.9-1 2.9-1v19.1H512v5.4h-17.3v43.4c0 4.5.6 7.8 2.1 9.9 1.5 2.1 3.9 3.1 7.3 3.1 2.4 0 5-.8 7.9-2.4v5.3z"/>
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 204" aria-label="Material UI" role="img" className="w-full h-full">
  <path fill="#00B0FF" d="M0 111V0l96 55v37L32 55v74z"/>
  <path fill="#0081CB" d="M96 55l96-55v111l-64 37-32-19 64-37V55L96 92z"/>
  <path fill="#00B0FF" d="M96 129v37l64 37v-37z"/>
  <path fill="#0081CB" d="M160 203l96-55V74l-32 18v37l-64 37zM224 55V18l32-18v37z"/>
</svg>
  ),
  Shadcn: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" fill="none" className="w-full h-full">
  <path d="M81.25 50L50 81.25" stroke="currentColor" stroke-width="6.25" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M75 15.63L15.63 75" stroke="currentColor" stroke-width="6.25" stroke-linecap="round" stroke-linejoin="round"/>
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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
  <path d="M11.5 12.5H2.5c0-3.5 2.5-5.5 5-5.5s4.5 2 4.5 4.5V12.5zm-4.5-4c-1.5 0-2.5 1-2.5 2.5h5c0-1.5-1-2.5-2.5-2.5zM11.6 15.1c-.5 1.5-2 2.9-4.1 2.9-3 0-5.1-2-5-5.5h1.5c0 2.5 1.5 4 3.5 4 1.5 0 2.5-1 3-2.5l1.1 1.1z"/>
  <path d="M14.5 17l3.5-4.7 3.5 4.7h2l-4.5-6 4-5h-2l-3 4-3-4h-2l4 5-4.5 6h2z"/>
</svg>
  ),
  "Node.js": (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-full h-full">
  <path fill="#8CC84B" d="M17.2 2.3c-.7-.4-1.6-.4-2.4 0L4.2 8.2c-.7.4-1.2 1.1-1.2 1.9v11.8c0 .8.5 1.5 1.2 1.9l3 1.7c1.2.6 2.7.7 3.9.1 1-.5 1.5-1.6 1.5-2.7V11.1c0-.2-.1-.3-.3-.3h-1.7c-.2 0-.3.1-.3.3v11.7c0 .5-.4 1-1 1.2-1.2.4-4.6-1.8-4.6-1.8-.1-.1-.2-.2-.2-.3V10.1c0-.2.1-.3.2-.4L15.8 3.9c.1-.1.3-.1.4 0l10.6 5.8c.1.1.2.2.2.4v11.8c0 .1-.1.3-.2.3l-10.5 6c-.2.1-.3.2-.5.1l-2.7-1.5c-.1-.1-.2-.1-.3 0-.4.2-.8.4-1.3.6-.7.3-.6.4 0 .7l3.2 1.8c.7.4 1.7.5 2.4.1l10.6-5.9c.7-.4 1.2-1.1 1.2-1.9V10.1c0-.8-.5-1.5-1.2-1.9L17.2 2.3z"/>
  
  <path fill="#8CC84B" d="M22.5 11.2c-1.4-.7-3.1-.8-4.6-.7-1.1.1-2.3.4-3.1 1.2-.8.8-1 2.1-.6 3.2.3.7 1 1.2 1.7 1.5 1 .3 2 .4 3 .5.9.1 1.8.2 2.7.5.4.1.8.3.9.7.1.5 0 1-.4 1.3-1.2 1-4.5.8-5.7.1-.5-.3-.7-.9-.8-1.4 0-.2-.1-.3-.3-.3h-1.4c-.2 0-.4.1-.4.3-.1 2.5 2.2 3.5 4.3 3.8 1.2.1 2.4.1 3.6-.2.9-.2 1.8-.6 2.4-1.3.8-.8.9-2 .6-3-.3-.8-1-1.3-1.8-1.5-1-.4-2.2-.5-3.2-.6-1.4-.1-3 0-3.4-.9-.2-.5 0-1.1.4-1.4 1.1-.8 3.4-.7 4.6-.1.5.3.8.9.9 1.5 0 .2.1.4.3.4h1.4c.2 0 .4-.1.4-.3 0-1.2-.6-2.4-1.7-3z"/>
</svg>
  ),
  PHP: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-full h-full">
  <path fill="#777bb3" d="M3.6 0h16.8A3.6 3.6 0 0 1 24 3.6v16.8a3.6 3.6 0 0 1-3.6 3.6H3.6A3.6 3.6 0 0 1 0 20.4V3.6A3.6 3.6 0 0 1 3.6 0z"/>
  <path fill="#ffffff" d="M7 9.5H4.2l-1.3 6.7c0 .1.1.1.1.1h1.4s.1-.1.1-.1l.3-1.7h1.3c2 0 3-.9 3.2-2.1.2-1.3-.3-2.9-2.3-2.9zM7 12c-.2.9-.8 1.3-1.6 1.3H4.6l.5-2.5h.8c1.3 0 1.2.5 1.1 1.2zm5.6 2.6c-.2 0-.1-.2-.1-.2l.6-2.9c0-.4.3-.8-.8-.7H11l-.7 3.7c0 .1 0 .1-.2.1h-1.4s0-.1 0-.1l1.3-6.6s0-.1.2-.1h1.4s.1.1.1.1l-.3 1.6h1.2c1.7 0 2.1.8 2 1.8l-.6 3.2c0 .1-.2.2-.4.2zm6.2-5.1h-2.8l-1.3 6.7c0 .1.1.1.1.1h1.4s.1-.1.1-.1l.3-1.7h1.3c2 0 3-.9 3.2-2.1.2-1.3-.3-2.9-2.3-2.9zM18.8 12c-.2.9-.8 1.3-1.6 1.3h-.8l.5-2.5h.8c1.3 0 1.2.5 1.1 1.2z"/>
</svg>
  ),
  Laravel: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 264" fill="none" className="w-full h-full">
  <path fill="#FF2D20" d="M256 60.7v56.6c0 1.5-.8 2.8-2.1 3.5l-47.5 27.4v54.2c0 1.5-.8 2.8-2.1 3.5l-99.1 57.1c-2.3 1.3-5.2 1.3-7.5 0L.7 205.9c-1.3-.7-2.1-2.1-2.1-3.6V32.7c0-.4.1-.7.2-1.1.1-.4.3-.7.5-1 1.1-1.3 2.5-2.2 4.1-3l49.5-28.5c1.3-.7 2.9-.7 4.2 0l49.5 28.5c1.6.8 3 1.7 4.1 3 .2.3.4.6.5 1 .1.4.2.7.2 1.1v106l41.3-23.8V60.7c0-.4.1-.7.2-1.1.1-.4.3-.7.5-1 1.1-1.3 2.5-2.2 4.1-3l49.5-28.5c1.3-.7 2.9-.7 4.2 0l49.5 28.5c1.6.8 3 1.7 4.1 3 .2.3.4.6.5 1 .1.4.2.7.2 1.1zM247.7 114.9V67.8l-17.3 10-24 13.8v47.1l41.3-23.8zm-49.5 85.1v-47.1l-23.6 13.5-67.3 38.4V252.3l90.9-52.3zM8.3 39.8v160.2l90.8 52.3V204.8l-47.5-26.9c-.8-.4-1.4-1.2-1.6-2.1V63.6l-24-13.8-17.7-10zm45.4-30.9L12.4 32.7l41.3 23.8L94.9 32.7 53.7 8.9zm21.4 148.3l24-13.8V39.8l-17.3 10-24 13.8V167.2l17.3-10zm127.2-120.3l-41.3 23.8 41.3 23.8 41.3-23.8-41.3-23.8zm-4.1 54.7l-24-13.8-17.3-10v47.1l24 13.8 17.3 10V91.6zm-95 106l60.5-34.6 30.3-17.3-41.3-23.8-47.5 27.3-43.3 24.9 41.3 23.5z"/>
</svg>
  ),
  Flask: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-full h-full">
  <path fill="#000000" d="M7.2 20.7c-.9-.7-1.9-1.4-2.6-2.4-1.4-1.7-2.5-3.7-3.2-5.8-.4-1.4-.6-2.9-1.2-4.2-.6-.9.1-2 1.2-2.3.5-.1 1.3-.5.3-.2-.9.6-1-.6-.1-.7.6-.1.8-.6.6-1-.7-.4 1.6-.9.5-1.5C1.5 1.4 4.3 1.1 3.6 2.6c-.2 1.1 2-.2 1.5 1.1.5.6 1.9.1 1.9 1 .7.1 1 .7 1.7.7.7.3 2 .6 2.3 1.4-.7.6-2.4-1.2-2.4.4.2 2.3.2 4.7 1 6.9.4 1.3 1.4 2.4 2.2 3.4.8 1 2 1.7 3.1 2.3 1 .5 2.1.8 3.2 1 .4-.3 1.2-1.6 1.9-1.1 0 .6-1.4 1.3-.1 1.2.8-.2 1.3.6 2-.2.6.7 2.4-.4 2 1-.6.4-1.4.1-2 .6-.9-.5-1.7.4-2.7.3-1.2.2-2.3.3-3.5.3-1.9-.2-3.9-.2-5.7-.9-1-.3-2-.9-2.9-1.5zm1.6.7c1 .4 2 .9 3.1 1 1.7.2 3.5.6 5.3.3-.8-.4-1.6.1-2.4-.3-.9.2-2 0-2.9-.2-1.1-.5-2.3-.8-3.3-1.5-1.3-.5.7.6 1 .7.8.5-.9-.2-1.1-.4-.7-.4-.8-.3-.1.1.2.1.3.2.4.3zm-1.9-1.3c1 .4 0-.7-.4-.6-.2-.3-.8-.6-.4-.7-.7.2-.7-.9-1.1-.8-.7-.2-.3-1.1-1.2-1.6-.1-.5-.9-1-1.1-1.8-.1-.4-.9-1.6-.4-.5.4 1.1 1.1 2 1.8 2.9.5.9 1 1.8 1.9 2.3.3.3.6.7 1 .8z"/>
</svg>
  ),
  // Databases
  MySQL: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 160 140" className="w-full h-full">
  <g fill="#5D87A1">
    <path d="M40.1 113.6h-5.2c-.2-8.7-.7-16.9-1.5-24.6h-.1l-7.9 24.6h-3.9l-7.8-24.6h-.1c-.6 7.4-.9 15.6-1.1 24.6H7.8c.3-11 1.1-21.3 2.3-30.9h6.4l7.5 22.7h.1l7.5-22.7h6.1c1.3 11.3 2.1 21.6 2.4 30.9zM62.5 90.8c-2.1 11.4-4.9 19.7-8.3 24.9-2.7 4-5.6 6-8.8 6-.9 0-1.9-.3-3.2-.8v-2.8c.6.1 1.3.1 2.2.1 1.5 0 2.7-.4 3.6-1.2 1.1-1 1.6-2.1 1.6-3.4 0-.9-.4-2.6-1.3-5.3l-5.7-17.6h5.1l4.1 13.2c.9 3 1.3 5.1 1.1 6.3 2.2-6 3.8-12.4 4.7-19.5h4.9v.1z"/>
    <path d="M131.4 113.6h-14.7V82.7h4.9v27.1h9.8v3.8z"/>
  </g>
  <g fill="#F8981D">
    <path d="M112.8 114.3l-5.7-2.8c.5-.4 1-.9 1.4-1.4 2.4-2.8 3.6-7 3.6-12.6 0-10.2-4-15.3-12-15.3-3.9 0-7 1.3-9.2 3.9-2.4 2.8-3.6 7-3.6 12.6 0 5.4 1.1 9.4 3.2 12 2 2.3 4.9 3.4 8.8 3.4 1.5 0 2.8-.2 4-.5l7.4 4.3 2-3.4zm-18.4-6.9c-1.3-2-1.9-5.2-1.9-9.7 0-7.8 2.4-11.7 7.1-11.7 2.5 0 4.3.9 5.4 2.8 1.3 2 1.9 5.2 1.9 9.6 0 7.8-2.4 11.8-7.1 11.8-2.5 0-4.3-.9-5.4-2.8zM85.2 105c0 2.6-1 4.8-2.9 6.5-1.9 1.7-4.5 2.5-7.7 2.5-3 0-6-1-8.8-2.9l1.3-2.7c2.4 1.2 4.7 1.8 6.6 1.8 1.9 0 3.3-.4 4.4-1.2 1.1-.8 1.7-2 1.7-3.4 0-1.8-1.3-3.4-3.6-4.7-2.2-1.2-6.5-3.7-6.5-3.7-2.3-1.7-3.5-3.6-3.5-6.6 0-2.5.9-4.5 2.6-6.1 1.8-1.5 4-2.3 6.8-2.3 2.9 0 5.5.8 7.8 2.3l-1.2 2.7c-2-.9-4-1.3-6-1.3-1.6 0-2.8.4-3.7 1.1-.9.8-1.4 1.7-1.4 2.9 0 1.8 1.3 3.4 3.7 4.8 2.2 1.2 6.6 3.7 6.6 3.7 2.4 1.7 3.6 3.5 3.6 6.5z"/>
  </g>

  <path fill="#5D87A1" d="M137.6 72.3c-3-.1-5.3.2-7.2 1-.6.2-1.5.2-1.5.9.3.3.3.8.6 1.2.4.7 1.2 1.8 1.9 2.3.8.6 1.6 1.2 2.4 1.7 1.5.9 3.1 1.4 4.5 2.3.8.5 1.6 1.2 2.5 1.8.4.3.7.8 1.2 1v-.1c-.3-.3-.3-.8-.6-1.2l-1.1-1.1c-1.1-1.5-2.4-2.7-3.9-3.8-1.2-.8-3.8-1.9-4.3-3.3l-.1-.1c.8-.1 1.8-.4 2.6-.6 1.3-.3 2.4-.3 3.7-.6.6-.2 1.2-.3 1.8-.5v-.3c-.7-.7-1.2-1.6-1.9-2.2-1.9-1.6-4-3.3-6.2-4.6-1.2-.7-2.7-1.2-3.9-1.9-.4-.2-1.2-.3-1.5-.7-.7-.8-1-1.9-1.5-2.9-1.1-2.1-2.1-4.3-3.1-6.5-.7-1.5-1.1-2.9-1.9-4.3-3.9-6.4-8-10.2-14.5-14-1.4-.8-3-1.1-4.8-1.5l-2.8-.1c-.6-.3-1.2-1-1.7-1.3-2.1-1.3-7.6-4.3-9.2-.4-1 2.4 1.5 4.8 2.4 6.1.6.9 1.5 1.8 1.9 2.8.3.6.3 1.3.6 2 .6 1.6 1.2 3.5 1.9 5 .4.8.9 1.6 1.4 2.3.3.4.8.6.9 1.3-.5.7-.6 1.9-.9 2.8-1.3 4.2-.8 9.5 1.1 12.6.6.9 2 3 3.9 2.2 1.7-.7 1.3-2.8 1.8-4.7.1-.5 0-.7.3-1h.1c.5 1 1 2.1 1.5 3.1 1.2 1.8 3.2 3.7 4.9 5 .9.7 1.6 1.8 2.7 2.2V74.1h-.1c-.2-.3-.6-.5-.9-.7-.7-.7-1.4-1.5-1.9-2.2-1.6-2.1-3-4.4-4.2-6.8-.6-1.2-1.1-2.4-1.6-3.6-.2-.4-.2-1.1-.6-1.3-.6.8-1.4 1.5-1.8 2.5-.7 1.6-.8 3.6-1 5.6l-.1.1c-1.2-.3-1.6-1.5-2.1-2.6-1.1-2.7-1.3-6.9-.3-10 .3-.8 1.4-3.2.9-4-.2-.7-1-1.1-1.4-1.7-.5-.7-1-1.6-1.3-2.4-.9-2.1-1.3-4.4-2.3-6.5-.5-1-1.2-2-1.9-2.9-.7-1-1.5-1.7-2.1-2.9-.2-.4-.4-1.1-.1-1.5.1-.3.2-.4.5-.5.5-.4 1.9.1 2.4.3 1.4.6 2.5 1.1 3.7 1.9.5.4 1.1 1.1 1.8 1.3h.8c1.2.3 2.5.1 3.7.4 2 .6 3.8 1.6 5.4 2.6 4.9 3.1 8.9 7.5 11.7 12.8.4.9.6 1.6 1 2.5.8 1.8 1.8 3.7 2.5 5.5.8 1.8 1.5 3.5 2.7 5 .6.8 2.8 1.2 3.8 1.6.7.3 1.9.6 2.6 1 1.3.8 2.5 1.7 3.7 2.5.6.5 2.5 1.4 2.6 2.2M99.5 39.8c-.5 0-1 .1-1.5.2v.1h.1c.3.6.8 1 1.2 1.5.3.6.6 1.2.9 1.8l.1-.1c.5-.4.8-1 .8-1.9-.2-.3-.3-.5-.5-.8-.2-.4-.7-.6-1-.9z"/>

  <path fill="#F8981D" d="M141.1 113.6h.8v-3.8h-1.2l-.9 2.6-1-2.6h-1.1v3.8h.7v-2.9h.1l1.1 2.9h.6l1.1-2.9v2.9zm-6.2 0h.8v-3.1h1.1v-.6h-3v.6h1.1v3.1z"/>
</svg>
  ),
  PostgreSQL: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 264" className="w-full h-full">
  <path fill="#000" d="M255 158.1c-1.5-4.7-5.5-7.9-10.7-8.7-2.5-.3-5.3-.2-8.6.5-5.8 1.2-10.1 1.6-13.3 1.7 11.9-20 21.5-42.8 27-64.2 9-34.7 4.2-50.5-1.4-57.7C233.2 10.8 211.6.7 185.6.4 171.6.2 159.4 3 153.1 5c-5.9-1-12.3-1.6-19-1.7-12.5-.2-23.6 2.5-33.1 8.1-5.2-1.7-13.6-4.2-23.3-5.8-22.9-3.8-41.3-.9-54.7 8.6C6.6 25.7-.9 45.7.5 73.6c.4 8.9 5.4 35.9 13.2 61.5 4.5 14.7 9.3 26.9 14.2 36.3 7 13.4 14.5 21.2 23 24 4.7 1.6 13.3 2.7 22.4-4.8 1.1 1.4 2.7 2.8 4.7 4.1 2.6 1.6 5.7 2.9 8.9 3.7 11.3 2.8 22 2.1 31-1.9v4.5c.1 2 .1 4.1.2 6.1.5 13.4 1.4 23.8 4.1 31.1.1.4.3 1 .5 1.6 1.4 4.1 3.6 11 9.3 16.4 5.9 5.6 13.1 7.3 19.7 7.3 3.3 0 6.4-.4 9.2-1 9.8-2.1 21-5.3 29-16.8 7.6-10.9 11.3-27.2 12-53 .1-.7.2-1.4.2-2.1.1-.5.1-.9.2-1.4l1.8.2.5.1c10 .4 22.2-1.7 29.7-5.2 6-2.7 25-12.7 20.5-26.3z"/>
  <path fill="#336791" d="M237.9 160.7c-29.7 6.1-31.8-4-31.8-4 31.4-46.6 44.5-105.7 33.2-120.2-30.9-39.5-84.4-20.8-85.3-20.3l-.3.1c-5.9-1.2-12.4-1.9-19.8-2-13.5-.2-23.7 3.5-31.4 9.4 0 0-95.4-39.3-91 49.5.9 18.9 27.1 142.9 58.2 105.4 11.4-13.7 22.4-25.3 22.4-25.3 5.5 3.7 12 5.5 18.9 4.9l.5-.5c-.1 1.7 0 3.4.3 5.4-8 9-5.7 10.6-21.7 13.9-16.2 3.3-6.7 9.3-.5 10.8 7.6 1.9 25 4.6 36.8-11.9l-.5 1.9c3.1 2.5 5.3 16.4 5 29 0 12.5-.3 21.2 2.2 27.9 2.5 6.7 5 21.9 26.1 17.4 17.6-3.8 26.7-13.6 28-29.9.9-11.6 2.9-9.9 3-20.3l1.6-4.9c1.9-15.7 0-20.8 10.9-18.4l2.6.2c8 .4 18.5-1.2 24.6-4.1 13.2-6.1 21-16.4 8-13.7z"/>
  <circle cx="107.6" cy="85.9" r="4.5" fill="#fff"/>
  <circle cx="190.6" cy="83.3" r="4.5" fill="#fff"/>
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
<svg width="40" height="50" viewBox="0 0 340 100" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="featherGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#282662"/>
      <stop offset="50%" stop-color="#CD2335"/>
      <stop offset="100%" stop-color="#F69923"/>
    </linearGradient>
  </defs>
  
  <path d="M12 85c-5-15-8-35 2-45 15-18 45-20 45-20s-10 5-15 15c-5 10-2 25-2 25s15-10 25-20c12-12 10-30 10-30s5 15 0 30c-5 15-25 35-25 35s20-10 35-20c10-8 15-20 15-20s0 15-10 30c-10 15-40 35-40 35s30-10 45-15c10-3 20-5 20-5s-15 10-30 15c-20 8-50 10-65 10s-15-5-15-10z" fill="url(#featherGrad)"/>
  
  <g fill="#D22128" font-family="Arial, sans-serif" font-size="12" font-weight="bold">
    <text x="65" y="20">APACHE</text>
  </g>
  
  <g font-family="Arial, sans-serif" font-weight="bold">
    <text x="60" y="85" font-size="75" fill="#F69923">J</text>
    <text x="95" y="85" font-size="75" fill="#000">Meter</text>
    <text x="315" y="40" font-size="12" fill="#D22128">TM</text>
  </g>
</svg>
  ),
  Jest: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-full h-full">
  <defs>
    <mask id="jest-mask">
      <rect width="32" height="32" fill="white" />
      <circle cx="7.5" cy="15.8" r="2" fill="black" />
      <circle cx="16" cy="15.8" r="2" fill="black" />
      <circle cx="24.5" cy="15.8" r="2" fill="black" />
      <path d="M12.6 3.3h12.3l-3.3 9.4-3-6.4-3 6.4z" fill="black" />
    </mask>
  </defs>

  <path 
    fill="#C63D14" 
    mask="url(#jest-mask)"
    d="M27.1 15.8a2.6 2.6 0 0 0-2.6-2.6h-.3l3.6-10.6H12.6l3.6 10.5h-.2a2.6 2.6 0 0 0-.8 5.1 11.4 11.4 0 0 1-2 2.6 10.4 10.4 0 0 1-3.7 2.1 3.3 3.3 0 0 1-1.7-4.2l.2-.5a2.6 2.6 0 1 0-2.1-.4 20.1 20.1 0 0 0-1.9 4.8c-.4 2.1 0 4.4 1.8 5.7 4.3 3 9-1.8 13.9-3.1 1.8-.4 3.7-.4 5.3-1.3a4.5 4.5 0 0 0 2.2-3.1 4.6 4.6 0 0 0-.8-3.5 2.6 2.6 0 0 0 .6-1.7z"
  />
</svg>
  ),
  Postman: (
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 256">
  <circle cx="128" cy="128" r="120" fill="#FF6C37"/>
  
  <g fill="#FFF">
    <path d="M188.5 52.4c-8.2-8.2-21.4-8.2-29.6 0l-17.7 17.7 29.6 29.6 17.7-17.7c8.1-8.2 8.1-21.4 0-29.6z"/>
    <path d="M174.3 102.7l-43-43-15.3 15.3c-2.3-2.3-6.1-2.3-8.4 0l-54.3 54.3c-2.3 2.3-2.3 6.1 0 8.4l11 11c2.3 2.3 6.1 2.3 8.4 0l11.7-11.7 4.1 4.1-13.7 13.7c-2.3 2.3-2.3 6.1 0 8.4l26.2 26.2c2.3 2.3 6.1 2.3 8.4 0 37.5-18.8 53-33.8 66.5-47.3 2.3-2.3 2.3-6.1 0-8.4l-1.6-1.6z"/>
    <path d="M125.7 131.5l-48.2 48.2 8.1 8.1 51.1-44.8c3.3-2.8 3.5-7.8.7-11.1-1.3-1.6-3.2-2.5-5.2-2.5l-6.5 2.1z"/>
  </g>
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