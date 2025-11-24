import React, { useState, useEffect, useMemo } from 'react';
import {
  Github, Linkedin, Mail, ChevronDown, Trophy, Star, Zap,
  Code, Database, Cpu, Terminal, Download,
  BarChart, Binary
} from 'lucide-react';

import profilePic from './me.jpg';
const activeProfilePic = profilePic;

// WIDTH CONFIGURATION (The "Map Size")
// Mobile widths are the same as your version.
// Desktop widths are increased for more breathing room.
const SECTION_WIDTHS = {
  hero:       { mobile: 100, desktop: 70 },
  about:      { mobile: 140, desktop: 70 },
  education:  { mobile: 220, desktop: 90 },
  experience: { mobile: 320, desktop: 120 },
  skills:     { mobile: 300, desktop: 110 },
  projects:   { mobile: 450, desktop: 160 },
  contact:    { mobile: 100, desktop: 60 },
};

// --- ASSETS ---

const PlayerCharacter = ({ isWalking }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <g className={`transform origin-bottom ${isWalking ? 'animate-bounce-slight' : 'animate-float'}`}>
      <path d="M30 75 Q50 95 70 75" fill="none" stroke="#06b6d4" strokeWidth="3" className="opacity-50" />
      <circle cx="50" cy="85" r="5" fill="#06b6d4" className="animate-pulse" />
      <rect x="35" y="40" width="30" height="35" rx="5" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
      <rect x="40" y="45" width="20" height="15" rx="2" fill="#000" />
      <circle cx="45" cy="52" r="2" fill="#06b6d4" className="animate-blink" />
      <circle cx="55" cy="52" r="2" fill="#06b6d4" className="animate-blink delay-75" />
      <path d="M30 40 Q50 10 70 40" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="50" cy="25" r="3" fill="#ef4444" className="animate-ping" />
      <rect
        x="25"
        y="45"
        width="10"
        height="20"
        rx="5"
        fill="#cbd5e1"
        className={`origin-top ${isWalking ? 'animate-arm-swing-left' : ''}`}
      />
      <rect
        x="65"
        y="45"
        width="10"
        height="20"
        rx="5"
        fill="#cbd5e1"
        className={`origin-top ${isWalking ? 'animate-arm-swing-right' : ''}`}
      />
      <rect
        x="38"
        y="75"
        width="8"
        height="15"
        rx="4"
        fill="#1e293b"
        className={`origin-top ${isWalking ? 'animate-leg-walk-left' : ''}`}
      />
      <rect
        x="54"
        y="75"
        width="8"
        height="15"
        rx="4"
        fill="#1e293b"
        className={`origin-top ${isWalking ? 'animate-leg-walk-right' : ''}`}
      />
    </g>
  </svg>
);

const Tree = ({ className, type = 1 }) => (
  <svg viewBox="0 0 100 150" className={className}>
    {type === 1 ? (
      <>
        <rect x="45" y="100" width="10" height="50" fill="#475569" />
        <path
          d="M10 110 L50 10 L90 110 Z"
          fill="#0f172a"
          stroke="#06b6d4"
          strokeWidth="2"
          fillOpacity="0.5"
        />
        <path
          d="M20 80 L50 20 L80 80 Z"
          fill="#1e293b"
          stroke="#06b6d4"
          strokeWidth="2"
          fillOpacity="0.5"
        />
      </>
    ) : (
      <>
        <rect x="45" y="120" width="10" height="30" fill="#475569" />
        <circle cx="50" cy="90" r="30" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <circle cx="30" cy="80" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <circle cx="70" cy="80" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <text x="40" y="95" fontSize="10" fill="#22c55e" fontFamily="monospace">
          101
        </text>
      </>
    )}
  </svg>
);

const Building = ({ className, label }) => (
  <svg viewBox="0 0 100 150" className={className}>
    <rect x="10" y="50" width="80" height="100" fill="#1e293b" stroke="#64748b" strokeWidth="2" />
    <rect x="20" y="60" width="15" height="20" fill="#38bdf8" className="animate-pulse" />
    <rect x="45" y="60" width="15" height="20" fill="#334155" />
    <rect x="70" y="60" width="15" height="20" fill="#38bdf8" className="animate-pulse delay-100" />
    <rect x="20" y="90" width="15" height="20" fill="#334155" />
    <rect x="45" y="90" width="15" height="20" fill="#38bdf8" className="animate-pulse delay-300" />
    <rect x="70" y="90" width="15" height="20" fill="#334155" />
    <text x="50" y="40" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">
      {label}
    </text>
  </svg>
);

const ArcadeMachine = ({ title, tech, link }) => (
  <a
    href={link}
    target="_blank"
    rel="noopener noreferrer"
    className="relative w-72 h-96 md:w-64 md:h-80 lg:w-80 lg:h-96 group cursor-pointer hover:-translate-y-4 transition-transform duration-300 block flex-shrink-0"
  >
    <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
      <path
        d="M10 140 L10 40 L20 10 L80 10 L90 40 L90 140 Z"
        fill="#1e293b"
        stroke="#06b6d4"
        strokeWidth="2"
      />
      <rect x="20" y="50" width="60" height="50" fill="#000" stroke="#06b6d4" />
      <rect x="25" y="110" width="50" height="10" fill="#334155" />
      <circle cx="35" cy="115" r="3" fill="#ef4444" />
      <circle cx="45" cy="115" r="3" fill="#22c55e" />
      <circle cx="65" cy="115" r="3" fill="#000" stroke="#fff" />
      <line x1="65" y1="115" x2="65" y2="105" stroke="#fff" strokeWidth="2" />
      <circle cx="65" cy="105" r="2" fill="#ef4444" />
    </svg>
    <div className="absolute top-[28%] left-[22%] w-[56%] h-[32%] bg-black overflow-hidden p-2 flex flex-col items-center justify-center text-center">
      <h4 className="text-[10px] font-bold text-cyan-400 leading-tight mb-1 animate-pulse uppercase">
        {title}
      </h4>
      <p className="text-[8px] text-green-400 font-mon
