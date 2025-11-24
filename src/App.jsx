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
      <p className="text-[8px] text-green-400 font-mono hidden md:block">{tech}</p>
      <div className="mt-2 text-[8px] text-white bg-cyan-900 px-2 rounded hidden group-hover:block">
        VIEW
      </div>
    </div>
  </a>
);

const Collectible = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center animate-float flex-shrink-0 px-4">
    <div className="w-20 h-20 md:w-24 md:h-24 bg-slate-800/80 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] rotate-45 mb-4 group hover:scale-110 transition-transform">
      <div className="-rotate-45">
        <Icon className="w-10 h-10 md:w-12 md:h-12 text-yellow-400" />
      </div>
    </div>
    <span className="bg-black/50 text-white text-sm md:text-base px-3 py-1 rounded backdrop-blur-sm border border-white/10">
      {label}
    </span>
  </div>
);

const LevelPost = ({ title, level }) => (
  <div className="flex flex-col items-center justify-end h-64 md:h-80 w-20 relative group flex-shrink-0">
    <div className="absolute bottom-0 w-2 h-56 md:h-64 bg-slate-600"></div>
    <div className="absolute bottom-48 md:bottom-56 p-3 md:p-4 bg-cyan-900/80 border-2 border-cyan-400 rounded shadow-[0_0_15px_rgba(6,182,212,0.5)] transform -rotate-6 whitespace-nowrap hover:rotate-0 transition-transform">
      <p className="text-xs text-cyan-200 uppercase tracking-wider font-mono">Level {level}</p>
      <p className="text-sm md:text-base font-bold text-white uppercase">{title}</p>
    </div>
    <div className="absolute bottom-0 w-10 h-2 bg-slate-500 rounded-full"></div>
  </div>
);

export default function GamePortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 1000
  );

  const isMobile = windowWidth < 768;

  // Calculate Total Width based on device type
  const worldConfig = useMemo(() => {
    const sections = Object.keys(SECTION_WIDTHS);
    const totalVW = sections.reduce((total, section) => {
      return total + (isMobile ? SECTION_WIDTHS[section].mobile : SECTION_WIDTHS[section].desktop);
    }, 0);
    return { totalVW, widths: SECTION_WIDTHS };
  }, [isMobile]);

  // Convert vw world width to actual pixels
  const worldPixelWidth = worldConfig.totalVW * (windowWidth / 100);
  const maxHorizontalShift = Math.max(worldPixelWidth - windowWidth, 0);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    let lastScrollY = window.scrollY;
    let timeoutId = null;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

      setScrollProgress(Math.min(Math.max(progress, 0), 1));

      setIsWalking(true);
      if (Math.abs(scrollY - lastScrollY) < 2) setIsWalking(false);

      if (scrollY < lastScrollY) setFacingRight(false);
      else setFacingRight(true);

      lastScrollY = scrollY;

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => setIsWalking(false), 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const translateX = -(scrollProgress * maxHorizontalShift);

  const getWidth = (section) => ({
    width: `${isMobile ? SECTION_WIDTHS[section].mobile : SECTION_WIDTHS[section].desktop}vw`,
  });

  return (
    <div className="relative bg-[#020617] text-white font-sans overflow-x-hidden">
      <style>{`
        @keyframes float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
        .animate-float { animation: float 3s ease-in-out infinite; }
        @keyframes bounce-slight { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-5px); } }
        .animate-bounce-slight { animation: bounce-slight 0.3s infinite; }
        @keyframes blink { 0%, 90%, 100% { transform: scaleY(1); } 95% { transform: scaleY(0.1); } }
        .animate-blink { animation: blink 4s infinite; }
        @keyframes leg-walk-left { 0% { transform: rotate(0deg); } 25% { transform: rotate(20deg); } 50% { transform: rotate(0deg); } 75% { transform: rotate(-20deg); } 100% { transform: rotate(0deg); } }
        .animate-leg-walk-left { animation: leg-walk-left 0.6s linear infinite; }
        @keyframes leg-walk-right { 0% { transform: rotate(0deg); } 25% { transform: rotate(-20deg); } 50% { transform: rotate(0deg); } 75% { transform: rotate(20deg); } 100% { transform: rotate(0deg); } }
        .animate-leg-walk-right { animation: leg-walk-right 0.6s linear infinite; }
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* UI Overlay */}
      <div className="fixed top-0 left-0 w-full h-20 z-50 flex justify-between items-center px-4 md:px-8 pointer-events-none">
        <a
          href="https://drive.google.com/file/d/189XtYap5uvyWyDp3YzojsITzf210AMu6/view?usp=drive_link"
          className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/40 backdrop-blur-md px-3 py-1 md:px-4 md:py-2 rounded-lg border border-cyan-500/50 transition-all pointer-events-auto group cursor-pointer"
        >
          <Download className="w-3 h-3 md:w-4 md:h-4 text-cyan-400 group-hover:text-white" />
          <span className="text-cyan-300 font-mono text-xs md:text-sm font-bold group-hover:text-white">
            RESUME
          </span>
        </a>
        <div className="flex gap-2 md:gap-4 pointer-events-auto">
          <a
            href="https://github.com/komali0208"
            className="p-2 bg-black/50 hover:bg-cyan-500/20 rounded-full transition-colors"
          >
            <Github className="w-4 h-4 md:w-5 md:h-5" />
          </a>
          <a
            href="https://www.linkedin.com/in/kusuma-komali-priya-kodimela/"
            className="p-2 bg-black/50 hover:bg-cyan-500/20 rounded-full transition-colors"
          >
            <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
          </a>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 animate-pulse pointer-events-none">
        <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
          SCROLL <ChevronDown className="w-4 h-4" />
        </span>
      </div>

      {/* Main Wrapper */}
      <div
        className="fixed top-0 left-0 h-full flex items-end flex-nowrap"
        style={{
          width: `${worldConfig.totalVW}vw`,
          transform: `translateX(${translateX}px)`,
          transition: 'transform 0.1s linear',
        }}
      >
        {/* Background Stars */}
        <div className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full h-full"
            style={{
              background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)',
            }}
          ></div>
          <div className="opacity-50">
            {Array.from({ length: 30 }).map((_, i) => (
              <div
                key={i}
                className="absolute bg-white rounded-full animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 80}%`,
                  width: Math.random() * 3 + 'px',
                  height: Math.random() * 3 + 'px',
                }}
              />
            ))}
          </div>
        </div>

        {/* Floor */}
        <div className="absolute bottom-0 w-full h-24 md:h-32 bg-[#0f172a] border-t-4 border-cyan-500/50">
          <div
            className="w-full h-full opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(#06b6d4 1px, transparent 1px)',
              backgroundSize: '50px 50px',
              transform: 'perspective(500px) rotateX(60deg) translateY(-50px)',
            }}
          ></div>
        </div>

        {/* Level 1: Hero */}
        <div
          className="relative h-full flex items-center justify-center flex-shrink-0"
          style={getWidth('hero')}
        >
          <div className="flex flex-col md:flex-row items-center gap-6 px-4 -mt-20">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-75 blur transition duration-500 group-hover:opacity-100 animate-pulse"></div>
              <div className="relative w-40 h-40 md:w-48 md:h-48 lg:w-64 lg:h-64 rounded-full bg-slate-900 border-4 border-cyan-500/50 flex items-center justify-center overflow-hidden">
                <img src={activeProfilePic} alt="Kusuma" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-6xl lg:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] tracking-tight leading-tight">
                K KUSUMA
                <br />
                KOMALI PRIYA
              </h1>
              <p className="mt-4 text-lg md:text-xl text-slate-400 max-w-xs md:max-w-2xl font-light mx-auto md:mx-0">
                Aspiring Technologist | AI & Data Science Enthusiast
              </p>
            </div>
          </div>
        </div>

        {/* Level 2: About */}
        <div
          className="relative h-full flex items-end pb-32 flex-shrink-0"
          style={getWidth('about')}
        >
          <Tree
            className="w-40 h-64 md:w-64 md:h-80 absolute bottom-24 md:bottom-32 left-0 opacity-60 md:opacity-100"
            type={1}
          />
          <div className="relative z-10 ml-10 md:ml-8 mb-40 md:mb-32 w-[85vw] md:w-[35rem] lg:w-[40rem] bg-slate-900/90 p-8 md:p-10 border border-cyan-500/30 rounded-xl backdrop-blur hover:scale-105 transition-transform duration-300 origin-bottom-left">
            <div className="absolute -top-6 -left-3 w-12 h-12 md:w-16 md:h-16 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <Code className="w-6 h-6 md:w-8 md:h-8" />
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Mission Briefing</h3>
            <p className="text-base md:text-lg text-slate-300 leading-relaxed">
              I am a traveler in <span className="text-cyan-400 font-bold">AI</span> and{' '}
              <span className="text-purple-400 font-bold">Data Science</span>, building secure,
              responsible systems. Currently upgrading at IIT Madras.
            </p>
          </div>
        </div>

        {/* Level 3: Education */}
        <div
          className="relative h-full flex items-end pb-32 flex-shrink-0"
          style={getWidth('education')}
        >
          <div className="absolute bottom-24 md:bottom-32 left-0">
            <LevelPost title="Academy" level="2" />
          </div>
          <div className="flex items-end gap-10 md:gap-16 lg:gap-20 ml-24 md:ml-20">
            <div className="relative group hover:z-10 flex flex-col items-center">
              <Building className="w-40 h-64 md:w-64 md:h-96" label="NJC" />
              <div className="bg-black/90 p-2 rounded border border-cyan-500/50 whitespace-nowrap mt-2">
                <p className="text-sm text-cyan-300">Intermediate</p>
              </div>
            </div>
            <div className="relative group hover:z-10 flex flex-col items-center">
              <Building className="w-56 h-80 md:w-80 md:h-[30rem]" label="IIT MADRAS" />
              <div className="bg-black/90 p-2 rounded border border-cyan-500/50 whitespace-nowrap mt-2">
                <p className="text-sm text-cyan-300">BS Data Science</p>
              </div>
            </div>
          </div>
        </div>

        {/* Level 4: Experience */}
        <div
          className="relative h-full flex items-end pb-32 flex-shrink-0"
          style={getWidth('experience')}
        >
          <div className="absolute bottom-24 md:bottom-32 left-0">
            <LevelPost title="The Lab" level="3" />
          </div>
          <div className="flex gap-8 md:gap-16 lg:gap-24 ml-24 md:ml-24">
            <ExperienceCard
              title="YugaYatra"
              role="Front-End Dev"
              color="cyan"
              icon={Trophy}
              height="h-40"
            />
            <ExperienceCard
              title="Research"
              role="1st Place Winner"
              color="purple"
              icon={Star}
              height="h-48"
              className="md:-mt-20"
            />
            <ExperienceCard
              title="SIH Hackathon"
              role="Finalist"
              color="orange"
              icon={Zap}
              height="h-40"
            />
          </div>
        </div>

        {/* Level 5: Skills */}
        <div
          className="relative h-full flex items-end pb-48 flex-shrink-0"
          style={getWidth('skills')}
        >
          <div className="absolute bottom-24 md:bottom-32 left-0">
            <LevelPost title="Skill Valley" level="4" />
          </div>
          {/* Back to your original alignment, but more gap on desktop */}
          <div className="flex gap-8 md:gap-16 lg:gap-20 ml-24 md:ml-24">
            <Collectible icon={Terminal} label="Python" />
            <Collectible icon={Code} label="React" />
            <Collectible icon={Database} label="SQL" />
            <Collectible icon={Cpu} label="Machine Learning" />
            <Collectible icon={BarChart} label="Statistics" />
            <Collectible icon={Binary} label="Data Science" />
          </div>
        </div>

        {/* Level 6: Projects */}
        <div
          className="relative h-full flex items-end pb-32 flex-shrink-0"
          style={getWidth('projects')}
        >
          <div className="absolute bottom-24 md:bottom-32 left-0">
            <LevelPost title="Arcade" level="5" />
          </div>
          {/* Back to your original alignment, more gap on desktop */}
          <div className="flex gap-12 md:gap-14 lg:gap-16 ml-24 md:ml-24 items-end">
            <ArcadeMachine
              title="FRAUD DETECTOR"
              tech="ML • Python"
              link="https://github.com/Komali0208/creditcard"
            />
            <ArcadeMachine
              title="TODO LIST"
              tech="Python • SQLite"
              link="https://github.com/Komali0208/todo-list"
            />
            <ArcadeMachine
              title="STUDENT SYS"
              tech="HTML • SQL"
              link="https://github.com/Komali0208/classroom-management-system"
            />
            <ArcadeMachine
              title="GAMIFIED CODE"
              tech="React • AI"
              link="https://github.com/Komali0208"
            />
          </div>
        </div>

        {/* Level 7: Contact */}
        <div
          className="relative h-full flex flex-col items-center justify-center pb-20 flex-shrink-0"
          style={getWidth('contact')}
        >
          <div className="relative z-10 bg-black/80 p-8 md:p-12 rounded-2xl border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center max-w-[90vw] md:max-w-2xl backdrop-blur-xl">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">GAME OVER?</h2>
            <p className="text-lg md:text-xl text-cyan-400 mb-8 font-mono">
              New Game+ : Start Project
            </p>
            <div className="grid grid-cols-1 gap-4 text-left">
              <a
                href="mailto:kkp.kodimela@gmail.com"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group border border-white/5 hover:border-cyan-500/50"
              >
                <Mail className="w-6 h-6 text-red-400" />
                <span className="text-sm md:text-lg text-white font-mono">
                  kkp.kodimela@gmail.com
                </span>
              </a>
              <a
                href="https://www.linkedin.com/in/kusuma-komali-priya-kodimela/"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group border border-white/5 hover:border-cyan-500/50"
              >
                <Linkedin className="w-6 h-6 text-blue-400" />
                <span className="text-sm md:text-lg text-white font-mono">LinkedIn Profile</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Character */}
      <div className="fixed z-20 pointer-events-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)] bottom-24 md:bottom-32 left-1/2 -translate-x-1/2 w-20 h-20 md:w-24 md:h-24">
        <div
          style={{
            transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)',
            transition: 'transform 0.2s',
          }}
        >
          <PlayerCharacter isWalking={isWalking} />
        </div>
      </div>

      {/* Spacer for scrolling: height = how far the world needs to slide horizontally */}
      <div style={{ height: `${maxHorizontalShift}px` }}></div>
    </div>
  );
}

// Helper Component
const ExperienceCard = ({ title, role, color, icon: Icon, height, className = '' }) => {
  const borderColors = {
    cyan: 'border-cyan-500',
    purple: 'border-purple-500',
    orange: 'border-orange-500',
  };
  const gradients = {
    cyan: 'from-transparent to-cyan-500',
    purple: 'from-transparent to-purple-500',
    orange: 'from-transparent to-orange-500',
  };

  return (
    <div className={`relative flex flex-col items-center group flex-shrink-0 ${className}`}>
      <div className={`w-1 ${height} bg-gradient-to-b ${gradients[color]}`}></div>
      <div
        className={`w-72 md:w-80 bg-slate-900/90 p-6 rounded-lg border-l-4 ${
          borderColors[color]
        } hover:bg-slate-800 transition-all transform hover:-translate-y-2 shadow-lg`}
      >
        <div className="flex justify-between items-start mb-2">
          <h4 className="font-bold text-white text-lg md:text-lg">{title}</h4>
          <Icon className="w-5 h-5 text-yellow-400" />
        </div>
        <p className="text-sm md:text-sm text-slate-400 font-medium">{role}</p>
      </div>
    </div>
  );
};
