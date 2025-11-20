import React, { useState, useEffect, useRef, useMemo } from 'react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  ChevronDown,
  Trophy,
  Star,
  Zap,
  Code,
  Database,
  Cpu,
  Terminal,
  Globe,
  Download,
  MapPin,
  User
} from 'lucide-react';

// --- IMAGE CONFIGURATION ---
// To use your local "me.jpg":
// 1. Place me.jpg inside the "src" folder.
// 2. Uncomment the import line below:
// import profilePic from './me.jpg';

// For this preview, we will use the online URL. 
// When running locally, you can change this to: const activeProfilePic = profilePic;
const activeProfilePic = "me.jpg"; 

// --- SVGs & Assets (Pure Code) ---

const PlayerCharacter = ({ isWalking }) => (
  <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
    <g className={`transform origin-bottom ${isWalking ? 'animate-bounce-slight' : 'animate-float'}`}>
      {/* Jetpack Flame */}
      <path d="M30 75 Q50 95 70 75" fill="none" stroke="#06b6d4" strokeWidth="3" className="opacity-50" />
      <circle cx="50" cy="85" r="5" fill="#06b6d4" className="animate-pulse" />
      
      {/* Body */}
      <rect x="35" y="40" width="30" height="35" rx="5" fill="#334155" stroke="#94a3b8" strokeWidth="2" />
      
      {/* Screen/Face */}
      <rect x="40" y="45" width="20" height="15" rx="2" fill="#000" />
      <circle cx="45" cy="52" r="2" fill="#06b6d4" className="animate-blink" />
      <circle cx="55" cy="52" r="2" fill="#06b6d4" className="animate-blink delay-75" />
      
      {/* Head/Helmet */}
      <path d="M30 40 Q50 10 70 40" fill="#cbd5e1" stroke="#94a3b8" strokeWidth="2" />
      <circle cx="50" cy="25" r="3" fill="#ef4444" className="animate-ping" />
      
      {/* Arms */}
      <rect x="25" y="45" width="10" height="20" rx="5" fill="#cbd5e1" className={`origin-top ${isWalking ? 'animate-arm-swing-left' : ''}`} />
      <rect x="65" y="45" width="10" height="20" rx="5" fill="#cbd5e1" className={`origin-top ${isWalking ? 'animate-arm-swing-right' : ''}`} />
      
      {/* Legs */}
      <rect x="38" y="75" width="8" height="15" rx="4" fill="#1e293b" className={`origin-top ${isWalking ? 'animate-leg-walk-left' : ''}`} />
      <rect x="54" y="75" width="8" height="15" rx="4" fill="#1e293b" className={`origin-top ${isWalking ? 'animate-leg-walk-right' : ''}`} />
    </g>
  </svg>
);

const Cloud = ({ className }) => (
  <svg viewBox="0 0 100 60" className={className}>
    <path d="M10 40 Q25 25 40 40 Q55 15 70 40 Q85 25 90 40 L90 55 L10 55 Z" fill="#ffffff" fillOpacity="0.1" />
  </svg>
);

const Tree = ({ className, type = 1 }) => (
  <svg viewBox="0 0 100 150" className={className}>
    {type === 1 ? (
      // Cyber Pine
      <>
        <rect x="45" y="100" width="10" height="50" fill="#475569" />
        <path d="M10 110 L50 10 L90 110 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="2" fillOpacity="0.5" />
        <path d="M20 80 L50 20 L80 80 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" fillOpacity="0.5" />
      </>
    ) : (
      // Binary Bush
      <>
        <rect x="45" y="120" width="10" height="30" fill="#475569" />
        <circle cx="50" cy="90" r="30" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <circle cx="30" cy="80" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <circle cx="70" cy="80" r="20" fill="#0f172a" stroke="#22c55e" strokeWidth="2" />
        <text x="40" y="95" fontSize="10" fill="#22c55e" fontFamily="monospace">101</text>
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
    
    <text x="50" y="40" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="bold">{label}</text>
  </svg>
);

const ArcadeMachine = ({ title, tech, link }) => (
  <a 
    href={link}
    target="_blank" 
    rel="noopener noreferrer"
    className="relative w-64 h-80 group cursor-pointer hover:-translate-y-4 transition-transform duration-300 block"
  >
    {/* Cabinet SVG */}
    <svg viewBox="0 0 100 140" className="w-full h-full drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
      <path d="M10 140 L10 40 L20 10 L80 10 L90 40 L90 140 Z" fill="#1e293b" stroke="#06b6d4" strokeWidth="2" />
      <rect x="20" y="50" width="60" height="50" fill="#000" stroke="#06b6d4" />
      <rect x="25" y="110" width="50" height="10" fill="#334155" />
      <circle cx="35" cy="115" r="3" fill="#ef4444" />
      <circle cx="45" cy="115" r="3" fill="#22c55e" />
      <circle cx="65" cy="115" r="3" fill="#000" stroke="#fff" /> {/* Joystick base */}
      <line x1="65" y1="115" x2="65" y2="105" stroke="#fff" strokeWidth="2" />
      <circle cx="65" cy="105" r="2" fill="#ef4444" />
    </svg>
    
    {/* Screen Content */}
    <div className="absolute top-[28%] left-[22%] w-[56%] h-[32%] bg-black overflow-hidden p-2 flex flex-col items-center justify-center text-center">
      <h4 className="text-[9px] font-bold text-cyan-400 leading-tight mb-1 animate-pulse uppercase">{title}</h4>
      <p className="text-[7px] text-green-400 font-mono">{tech}</p>
      <div className="mt-2 text-[6px] text-white bg-cyan-900 px-1 rounded hidden group-hover:block">
        CLICK TO VIEW CODE
      </div>
    </div>
  </a>
);

const Collectible = ({ icon: Icon, label }) => (
  <div className="flex flex-col items-center animate-float">
    <div className="w-16 h-16 bg-slate-800/80 border-2 border-yellow-400 rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(250,204,21,0.4)] rotate-45 mb-4 group hover:scale-110 transition-transform">
      <div className="-rotate-45">
        <Icon className="w-8 h-8 text-yellow-400" />
      </div>
    </div>
    <span className="bg-black/50 text-white text-xs px-2 py-1 rounded backdrop-blur-sm border border-white/10">{label}</span>
  </div>
);

const LevelPost = ({ title, level }) => (
  <div className="flex flex-col items-center justify-end h-64 w-16 relative group">
     <div className="absolute bottom-0 w-2 h-48 bg-slate-600"></div>
     <div className="absolute bottom-40 p-3 bg-cyan-900/80 border-2 border-cyan-400 rounded shadow-[0_0_15px_rgba(6,182,212,0.5)] transform -rotate-6 whitespace-nowrap hover:rotate-0 transition-transform">
       <p className="text-[10px] text-cyan-200 uppercase tracking-wider font-mono">Level {level}</p>
       <p className="text-sm font-bold text-white uppercase">{title}</p>
     </div>
     <div className="absolute bottom-0 w-8 h-2 bg-slate-500 rounded-full"></div>
  </div>
);

// --- Main Game Component ---

export default function GamePortfolio() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isWalking, setIsWalking] = useState(false);
  const [facingRight, setFacingRight] = useState(true);
  const [windowWidth, setWindowWidth] = useState(1000);

  // ULTRA COMPRESSED: 280vw Total
  // Hero(50) + About(25) + Edu(35) + Exp(50) + Skills(30) + Projects(60) + Contact(30)
  const TOTAL_WIDTH_VW = 280; 
  
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    handleResize();

    let lastScrollY = window.scrollY;
    let timeoutId = null;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const progress = scrollY / maxScroll; 
      
      setScrollProgress(Math.min(Math.max(progress, 0), 1)); // Clamp between 0 and 1

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

  const translateX = -(scrollProgress * (TOTAL_WIDTH_VW * (windowWidth / 100) - windowWidth));

  return (
    <div className="relative bg-[#020617] text-white font-sans overflow-x-hidden h-[100dvh]">
      {/* --- Styles --- */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        .animate-float { animation: float 3s ease-in-out infinite; }
        
        @keyframes bounce-slight {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-5px); }
        }
        .animate-bounce-slight { animation: bounce-slight 0.3s infinite; }

        @keyframes blink {
          0%, 90%, 100% { transform: scaleY(1); }
          95% { transform: scaleY(0.1); }
        }
        .animate-blink { animation: blink 4s infinite; }
        
        @keyframes leg-walk-left {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(-20deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-leg-walk-left { animation: leg-walk-left 0.6s linear infinite; }
        
        @keyframes leg-walk-right {
          0% { transform: rotate(0deg); }
          25% { transform: rotate(-20deg); }
          50% { transform: rotate(0deg); }
          75% { transform: rotate(20deg); }
          100% { transform: rotate(0deg); }
        }
        .animate-leg-walk-right { animation: leg-walk-right 0.6s linear infinite; }
        
        /* Force Hide Scrollbar (Backup) */
        body::-webkit-scrollbar { display: none; }
        body { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      {/* --- Fixed UI Overlay --- */}
      <div className="fixed top-0 left-0 w-full h-20 z-50 flex justify-between items-center px-8 pointer-events-none">
        
        {/* Top Left: Resume Button */}
        <a 
           href="https://drive.google.com/file/d/189XtYap5uvyWyDp3YzojsITzf210AMu6/view?usp=drive_link"
           target="_blank"
           rel="noopener noreferrer"
           className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/40 backdrop-blur-md px-4 py-2 rounded-lg border border-cyan-500/50 transition-all pointer-events-auto group cursor-pointer"
        >
          <Download className="w-4 h-4 text-cyan-400 group-hover:text-white" />
          <span className="text-cyan-300 font-mono text-sm font-bold group-hover:text-white">DOWNLOAD RESUME</span>
        </a>

        <div className="flex gap-4 pointer-events-auto">
           <a href="https://github.com/komali0208" target="_blank" rel="noreferrer" className="p-2 bg-black/50 hover:bg-cyan-500/20 rounded-full transition-colors"><Github className="w-5 h-5" /></a>
           <a href="https://www.linkedin.com/in/kusuma-komali-priya-kodimela/" target="_blank" rel="noreferrer" className="p-2 bg-black/50 hover:bg-cyan-500/20 rounded-full transition-colors"><Linkedin className="w-5 h-5" /></a>
        </div>
      </div>

      <div className="fixed bottom-8 right-8 z-50 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 animate-pulse pointer-events-none">
        <span className="text-xs font-mono text-cyan-400 flex items-center gap-2">
          SCROLL TO PLAY <ChevronDown className="w-4 h-4" />
        </span>
      </div>

      {/* --- Main Fixed Viewport --- */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden">
        
        {/* Stars */}
        <div 
          className="absolute top-0 left-0 w-[750vw] h-full"
          style={{ 
            background: 'radial-gradient(circle at 50% 50%, #1e1b4b 0%, #020617 100%)',
            transform: `translateX(${translateX * 0.1}px)` 
          }}
        >
           {Array.from({ length: 50 }).map((_, i) => (
             <div 
               key={i} 
               className="absolute bg-white rounded-full animate-pulse"
               style={{
                 left: `${Math.random() * 100}%`,
                 top: `${Math.random() * 60}%`,
                 width: Math.random() * 3 + 'px',
                 height: Math.random() * 3 + 'px',
                 opacity: Math.random()
               }}
             />
           ))}
        </div>

        {/* Clouds/Background */}
        <div 
          className="absolute bottom-0 left-0 w-[750vw] h-full pointer-events-none"
          style={{ transform: `translateX(${translateX * 0.4}px)` }}
        >
           <div className="absolute bottom-32 left-[10vw] opacity-20"><Cloud className="w-64" /></div>
           <div className="absolute bottom-64 left-[40vw] opacity-10"><Cloud className="w-96" /></div>
           <div className="absolute bottom-40 left-[80vw] opacity-20"><Cloud className="w-64" /></div>
           <svg className="absolute bottom-0 left-0 w-full h-64 opacity-30" preserveAspectRatio="none" viewBox="0 0 1000 100">
             <path d="M0 100 L200 20 L400 100 L600 40 L800 100 L1000 100 Z" fill="#1e293b" />
           </svg>
        </div>

        {/* Game World */}
        <div 
          className="absolute top-0 left-0 h-full flex items-end flex-nowrap"
          style={{ 
            width: `${TOTAL_WIDTH_VW}vw`,
            transform: `translateX(${translateX}px)`,
            transition: 'transform 0.1s linear' 
          }}
        >
          {/* Ground */}
          <div className="absolute bottom-0 w-full h-32 bg-[#0f172a] border-t-4 border-cyan-500/50">
            <div className="w-full h-full opacity-20" style={{ backgroundImage: 'linear-gradient(90deg, #06b6d4 1px, transparent 1px), linear-gradient(#06b6d4 1px, transparent 1px)', backgroundSize: '50px 50px', transform: 'perspective(500px) rotateX(60deg) translateY(-50px)' }}></div>
          </div>

          {/* ================= LEVEL 1: HERO (50vw) ================= */}
          <div className="relative w-[50vw] h-full flex items-center justify-center flex-shrink-0">
             <div className="flex flex-col md:flex-row items-center gap-6 -mt-20">
               
               {/* Photo Avatar */}
               <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-full opacity-75 blur transition duration-500 group-hover:opacity-100 animate-pulse"></div>
                  <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full bg-slate-900 border-4 border-cyan-500/50 flex items-center justify-center overflow-hidden">
                    <img 
                      src={activeProfilePic} 
                      alt="Kusuma Komali Priya" 
                      className="w-full h-full object-cover"
                    />
                  </div>
               </div>

               {/* Name & Title */}
               <div className="text-center md:text-left">
                 <h1 className="text-2xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-white to-purple-300 drop-shadow-[0_0_25px_rgba(6,182,212,0.3)] tracking-tight leading-tight">
                   K KUSUMA<br/>KOMALI PRIYA
                 </h1>
                 
                 <p className="mt-2 text-sm text-slate-400 max-w-xs font-light">
                   Aspiring Technologist | AI & Data Science Enthusiast
                 </p>
                 
                 <div className="mt-4 flex md:justify-start justify-center gap-4">
                   <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500 animate-pulse">
                     <div className="w-5 h-5 rounded border border-slate-600 flex items-center justify-center">→</div>
                     SCROLL TO START
                   </div>
                 </div>
               </div>
             </div>
          </div>

          {/* ================= LEVEL 2: ABOUT (25vw) ================= */}
          <div className="relative w-[25vw] h-full flex items-end pb-32 flex-shrink-0">
             <Tree className="w-32 h-48 absolute bottom-32 left-0" type={1} />
             
             <div className="ml-2 mb-32 max-w-sm bg-slate-900/90 p-4 border border-cyan-500/30 rounded-xl backdrop-blur relative group hover:scale-105 transition-transform duration-300">
               <div className="absolute -top-3 -left-3 w-10 h-10 bg-cyan-500 rounded-lg flex items-center justify-center text-black font-bold shadow-[0_0_15px_rgba(6,182,212,0.6)]">
                 <Code className="w-5 h-5" />
               </div>
               <h3 className="text-lg font-bold text-white mb-2">Mission Briefing</h3>
               <p className="text-xs text-slate-300 leading-relaxed">
                 I am a traveler in <span className="text-cyan-400 font-bold">AI</span> and <span className="text-purple-400 font-bold">Data Science</span>, building secure, responsible systems. Currently upgrading at IIT Madras.
               </p>
             </div>
          </div>

          {/* ================= LEVEL 3: EDUCATION (35vw) ================= */}
          <div className="relative w-[35vw] h-full flex items-end pb-32 flex-shrink-0">
            <div className="absolute bottom-32 left-0">
               <LevelPost title="The Academy" level="2" />
            </div>
            
            <div className="absolute bottom-32 left-12 flex items-end gap-2">
              {/* Building 1 */}
              <div className="relative group">
                 <Building className="w-32 h-48" label="NJC" />
                 <div className="absolute -top-20 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 p-3 rounded-lg border border-cyan-500/50 whitespace-nowrap z-30 shadow-[0_0_30px_rgba(0,0,0,0.8)] transform group-hover:-translate-y-2">
                    <p className="text-xs text-cyan-300 font-bold">Narayana Jr College</p>
                    <p className="text-[10px] text-slate-300">Intermediate (2021-23)</p>
                 </div>
              </div>

              {/* Building 2 */}
              <div className="relative group">
                 <Building className="w-48 h-64" label="IIT MADRAS" />
                 <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/90 p-3 rounded-lg border border-cyan-500/50 whitespace-nowrap z-30 shadow-[0_0_30px_rgba(0,0,0,0.8)] transform group-hover:-translate-y-2">
                    <p className="text-xs text-cyan-300 font-bold">BS Data Science</p>
                    <p className="text-[10px] text-slate-300">IIT Madras (2024-28)</p>
                 </div>
              </div>
            </div>
          </div>

          {/* ================= LEVEL 4: EXPERIENCE (50vw) ================= */}
          <div className="relative w-[50vw] h-full flex items-end pb-32 px-2 flex-shrink-0">
            <div className="absolute bottom-32 left-0">
               <LevelPost title="The Lab" level="3" />
            </div>

            <div className="flex gap-4 ml-12">
               
               {/* Milestone 1 */}
               <div className="relative flex flex-col items-center group">
                 <div className="w-1 h-24 bg-gradient-to-b from-transparent to-cyan-500"></div>
                 <div className="w-48 bg-slate-900/90 p-4 rounded-lg border-l-4 border-green-500 hover:bg-slate-800 transition-all transform hover:-translate-y-2 shadow-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-xs">YugaYatra</h4>
                      <Trophy className="w-3 h-3 text-yellow-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1 font-medium">Front-End Dev</p>
                 </div>
               </div>

               {/* Milestone 2 */}
               <div className="relative flex flex-col items-center mt-[-30px] group">
                 <div className="w-1 h-32 bg-gradient-to-b from-transparent to-purple-500"></div>
                 <div className="w-48 bg-slate-900/90 p-4 rounded-lg border-l-4 border-purple-500 hover:bg-slate-800 transition-all transform hover:-translate-y-2 shadow-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-xs">Research Bootcamp</h4>
                      <Star className="w-3 h-3 text-yellow-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1 font-medium">1st Place Winner</p>
                 </div>
               </div>

               {/* Milestone 3 */}
               <div className="relative flex flex-col items-center group">
                 <div className="w-1 h-24 bg-gradient-to-b from-transparent to-orange-500"></div>
                 <div className="w-48 bg-slate-900/90 p-4 rounded-lg border-l-4 border-orange-500 hover:bg-slate-800 transition-all transform hover:-translate-y-2 shadow-lg">
                    <div className="flex justify-between items-start mb-1">
                      <h4 className="font-bold text-white text-xs">Smart India Hackathon</h4>
                      <Zap className="w-3 h-3 text-yellow-400" />
                    </div>
                    <p className="text-[10px] text-slate-400 mb-1 font-medium">Finalist (Internal)</p>
                 </div>
               </div>

            </div>
          </div>

          {/* ================= LEVEL 5: SKILLS (30vw) ================= */}
          <div className="relative w-[30vw] h-full flex items-end pb-48 flex-shrink-0">
            <div className="absolute bottom-32 left-0">
               <LevelPost title="Skill Valley" level="4" />
            </div>
            
            <div className="flex gap-2 ml-12">
              <Collectible icon={Terminal} label="Python" />
              <Collectible icon={Code} label="React" />
              <Collectible icon={Database} label="SQL" />
              <Collectible icon={Cpu} label="ML" />
            </div>
          </div>

          {/* ================= LEVEL 6: PROJECTS (60vw) ================= */}
          <div className="relative w-[60vw] h-full flex items-end pb-32 flex-shrink-0">
             <div className="absolute bottom-32 left-0">
               <LevelPost title="Project Arcade" level="5" />
            </div>

             <div className="flex gap-2 ml-12 items-end">
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

          {/* ================= LEVEL 7: CONTACT (30vw) ================= */}
          <div className="relative w-[30vw] h-full flex flex-col items-center justify-center pb-20 flex-shrink-0">
            
            <div className="relative z-10 bg-black/80 p-6 rounded-2xl border-2 border-cyan-500 shadow-[0_0_50px_rgba(6,182,212,0.3)] text-center max-w-sm backdrop-blur-xl">
              <h2 className="text-2xl font-black text-white mb-2">GAME OVER?</h2>
              <p className="text-sm text-cyan-400 mb-4 font-mono">New Game+ : Start Project</p>
              
              <div className="grid grid-cols-1 gap-2 text-left">
                 <a href="mailto:kkp.kodimela@gmail.com" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group border border-white/5 hover:border-cyan-500/50">
                    <Mail className="w-4 h-4 text-red-400" />
                    <span className="text-xs text-white font-mono">kkp.kodimela@gmail.com</span>
                 </a>
                 <a href="https://www.linkedin.com/in/kusuma-komali-priya-kodimela/" target="_blank" rel="noreferrer" className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors group border border-white/5 hover:border-cyan-500/50">
                    <Linkedin className="w-4 h-4 text-blue-400" />
                    <span className="text-xs text-white font-mono">LinkedIn Profile</span>
                 </a>
              </div>
            </div>

            {/* Finish Flag */}
            <div className="absolute bottom-32 right-5 opacity-50">
               <div className="w-2 h-64 bg-white"></div>
               <div className="w-32 h-20 bg-cyan-500 animate-pulse"></div>
            </div>

          </div>

        </div>

        {/* --- PLAYER CHARACTER --- */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 w-24 h-24 z-20 pointer-events-none drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]">
           <div style={{ transform: facingRight ? 'scaleX(1)' : 'scaleX(-1)', transition: 'transform 0.2s' }}>
             <PlayerCharacter isWalking={isWalking} />
           </div>
           {/* Player Name Tag */}
           <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-black/50 px-2 py-1 rounded text-[10px] text-cyan-300 border border-cyan-500/30">
             Explorer
           </div>
        </div>

      </div>
      
      {/* --- Spacer to Enable Scrolling --- */}
      <div style={{ height: '300vh' }}></div>
    </div>
  );
}
