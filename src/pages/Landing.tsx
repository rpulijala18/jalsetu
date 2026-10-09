import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Droplets, 
  ArrowRight, 
  Activity, 
  ShieldCheck, 
  Truck, 
  Building2, 
  Cpu, 
  Workflow, 
  Database, 
  CloudRain, 
  Compass, 
  Sparkles,
  MapPin,
  Clock,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Navigation,
  Loader2,
  Box,
  Map,
  Zap,
  Globe,
  Radio,
  BarChart3
} from 'lucide-react';
import { HeroCanvasPreview } from '../components/3d/HeroCanvasPreview';
import { useSimulation } from '../context/SimulationContext';

export const Landing: React.FC = () => {
  const navigate = useNavigate();
  const { 
    currentLocation, 
    detectLiveLocation, 
    searchLocation, 
    isLocating, 
    locationError,
    runHeroDemo 
  } = useSimulation();

  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      await searchLocation(searchQuery);
    }
  };

  return (
    <div className="min-h-screen bg-[#020612] text-slate-100 flex flex-col font-sans select-none overflow-x-hidden">
      {/* Background radial glows */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-cyan-500/10 via-blue-600/5 to-transparent blur-3xl" />
        <div className="absolute top-[600px] right-0 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-700/5 rounded-full blur-3xl" />
      </div>

      {/* 1. STICKY TOP NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-cyan-500/20 bg-[#030814]/90 backdrop-blur-2xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3.5">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 p-0.5 shadow-glow-cyan flex items-center justify-center">
              <div className="w-full h-full bg-[#030814] rounded-[10px] flex items-center justify-center">
                <Droplets className="w-5 h-5 text-cyan-400 fill-cyan-400/20 animate-pulse" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-display font-extrabold text-xl tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-sky-200 to-white">
                  JALSETU
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-cyan-950/90 text-cyan-300 border border-cyan-500/40 rounded-full flex items-center gap-1 shadow-sm">
                  <Radio className="w-2.5 h-2.5 text-cyan-400 animate-pulse" />
                  AWS 3D TWIN
                </span>
              </div>
              <div className="text-[10px] font-mono text-slate-400 -mt-0.5">
                From Water Crisis to Intelligent Response
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-3 sm:gap-6">
            <a href="#twin" className="hidden text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors md:block">
              3D Digital Twin
            </a>
            <a href="#location" className="hidden text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors md:block">
              Live Location
            </a>
            <a href="#ai" className="hidden text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors md:block">
              Bedrock AI
            </a>
            <a href="#architecture" className="hidden text-xs font-mono text-slate-400 hover:text-cyan-300 transition-colors lg:block">
              AWS Engine
            </a>

            <button
              onClick={() => {
                runHeroDemo();
                navigate('/command-center');
              }}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#081528] hover:bg-[#0c203c] border border-cyan-500/30 text-cyan-300 font-mono text-xs font-bold transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>Hero Story</span>
            </button>

            <button
              onClick={() => navigate('/command-center')}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-mono font-bold text-xs uppercase shadow-glow-cyan transition-all active:scale-95"
            >
              <span>Launch Twin</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. INFINITE CYBER TICKER MARQUEE */}
      <div className="relative z-10 border-y border-cyan-500/15 bg-[#030917]/95 overflow-hidden py-2 font-mono text-xs select-none">
        <div className="flex animate-marquee whitespace-nowrap gap-8 text-slate-300">
          <span className="flex items-center gap-2 text-cyan-300">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>DUAL PERSPECTIVE: 3D CYBER TWIN & REAL GOOGLE MAPS SATELLITE</span>
          </span>
          <span className="text-cyan-500/50">◆</span>
          <span className="text-white">
            LIVE ANCHOR: {currentLocation.name.toUpperCase()} ({currentLocation.lat.toFixed(4)}°N, {currentLocation.lng.toFixed(4)}°E)
          </span>
          <span className="text-cyan-500/50">◆</span>
          <span className="text-rose-400 font-bold">
            FAILURE SIMULATION: TRUNK LINE FRACTURE THREATENS HOSPITAL ICU BUFFER
          </span>
          <span className="text-cyan-500/50">◆</span>
          <span className="text-cyan-300">
            AMAZON BEDROCK REASONING ENGINE DEPLOYS SAFETY-CONSTRAINED RATIONING
          </span>
          <span className="text-cyan-500/50">◆</span>
          <span className="text-emerald-400">
            AWS STEP FUNCTIONS: 8-STAGE DETERMINISTIC REMEDIATION PIPELINE
          </span>
          <span className="text-cyan-500/50">◆</span>
          <span>100% IN-BROWSER SIMULATION • ZERO SENSOR HARDWARE REQUIRED</span>
          <span className="text-cyan-500/50">◆</span>
        </div>
      </div>

      {/* 3. HERO SECTION WITH 3D CUTAWAY SCREEN */}
      <main className="relative z-10 mx-auto max-w-7xl px-6 py-10 lg:py-16 flex-1 w-full">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Hero Content */}
          <div className="flex flex-col items-start">
            {/* Live Location & Track Badges */}
            <div className="mb-6 flex flex-wrap items-center gap-2.5 font-mono text-xs">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-[#061426] border border-cyan-500/30 text-cyan-300 shadow-glow-cyan/20">
                <MapPin className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                <span className="font-bold">{currentLocation.name}, {currentLocation.city}</span>
                <span className="text-slate-400 text-[10px] hidden sm:inline">({currentLocation.lat.toFixed(4)}°N, {currentLocation.lng.toFixed(4)}°E)</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>AWS Hackathon: Heat & Water</span>
              </div>
            </div>

            {/* Hero Headline */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05] text-white">
              From Water Crisis<br />
              to <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 drop-shadow-[0_0_35px_rgba(0,242,254,0.3)]">Intelligent Response</span>.
            </h1>

            {/* Subtitle */}
            <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans font-normal">
              An AI-powered 3D digital twin and autonomous water crisis command system. Anchor your real neighborhood, simulate catastrophic pipeline ruptures, and witness Amazon Bedrock orchestrate emergency tanker dispatches and smart-valve rationing before reserves collapse.
            </p>

            {/* Quick Live GPS Detect Bar */}
            <div className="mt-8 p-3.5 rounded-2xl bg-[#061224]/80 border border-cyan-500/25 backdrop-blur-xl w-full max-w-xl shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={detectLiveLocation}
                  disabled={isLocating}
                  className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold uppercase shadow-glow-cyan active:scale-95 transition-all flex items-center gap-2 shrink-0"
                  title="Detect real device GPS coordinates"
                >
                  {isLocating ? (
                    <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                  ) : (
                    <Navigation className="w-4 h-4 text-slate-950 fill-current" />
                  )}
                  <span>{isLocating ? 'LOCATING...' : 'USE MY LIVE GPS'}</span>
                </button>
                <span className="text-slate-400 text-[11px] truncate hidden md:inline">
                  Auto-anchors the 3D twin to your device
                </span>
              </div>

              <div className="text-[11px] text-cyan-300 font-semibold px-2 py-1 rounded bg-cyan-950/80 border border-cyan-500/30 whitespace-nowrap">
                2,840 Citizens Connected
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-4 font-mono text-xs">
              <button
                onClick={() => navigate('/command-center')}
                className="flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black tracking-wide uppercase shadow-glow-cyan hover:shadow-cyan-400/60 transition-all active:scale-95 text-sm"
              >
                <span>ENTER 3D COMMAND CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  runHeroDemo();
                  navigate('/command-center');
                }}
                className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-[#07172c] hover:bg-[#0b2446] border border-cyan-500/40 text-cyan-300 font-bold transition-all shadow-sm"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>RUN 3-MIN HACKATHON STORY</span>
              </button>
            </div>
          </div>

          {/* Right Hero: 3D Digital Twin Viewport */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none" id="twin">
            <div className="rounded-2xl border border-cyan-500/30 bg-[#040c1a]/90 backdrop-blur-2xl p-1 shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden">
              {/* Header Bar */}
              <div className="flex items-center justify-between border-b border-cyan-500/20 bg-[#020712] px-4 py-2.5 text-[11px] font-mono text-slate-300">
                <span className="flex items-center gap-2 font-bold text-cyan-300">
                  <Box className="w-3.5 h-3.5 text-cyan-400" />
                  {currentLocation.name.toUpperCase()} DIGITAL TWIN
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  LIVE WEBGL 60 FPS
                </span>
              </div>

              {/* 3D Model Canvas */}
              <div className="h-[420px] w-full bg-[#020612] overflow-hidden relative">
                <HeroCanvasPreview />
              </div>
            </div>

            {/* Floating Telemetry Badge */}
            <div className="absolute -bottom-4 left-6 px-4 py-2 rounded-xl bg-[#061426]/95 border border-cyan-500/40 text-cyan-300 font-mono text-xs flex items-center gap-2.5 shadow-glow-cyan/20">
              <Truck className="w-4 h-4 text-amber-400" />
              <span>Tanker Convoy Fleet: Active GPS Beacon</span>
            </div>
          </div>
        </div>

        {/* 4. KEY METRICS STATS BANNER */}
        <div className="mt-20">
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-mono">
            {/* Stat 1 */}
            <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white">2 Modes</div>
                  <div className="text-xs text-cyan-300 font-bold uppercase mt-1">Dual GIS View</div>
                </div>
                <div className="p-2 rounded-xl bg-cyan-950/80 border border-cyan-500/30 text-cyan-400">
                  <Map className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
                Seamless 1-click toggle between 3D photorealistic digital twin and Google Maps Satellite imagery.
              </p>
            </div>

            {/* Stat 2 */}
            <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white">8 Stages</div>
                  <div className="text-xs text-sky-300 font-bold uppercase mt-1">AWS Step Functions</div>
                </div>
                <div className="p-2 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-400">
                  <Workflow className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
                Deterministic state machine handling failure containment, valve adjustments, and tanker dispatch.
              </p>
            </div>

            {/* Stat 3 */}
            <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white">42 Sec</div>
                  <div className="text-xs text-emerald-300 font-bold uppercase mt-1">Autonomous Speed</div>
                </div>
                <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/30 text-emerald-400">
                  <Cpu className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
                Amazon Bedrock foundation model synthesizes remediation before hospital dialysis buffer is breached.
              </p>
            </div>

            {/* Stat 4 */}
            <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl hover:border-cyan-500/40 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-3xl font-extrabold text-white">9,400 L</div>
                  <div className="text-xs text-teal-300 font-bold uppercase mt-1">Water Conserved</div>
                </div>
                <div className="p-2 rounded-xl bg-teal-950/80 border border-teal-500/30 text-teal-400">
                  <Droplets className="w-5 h-5" />
                </div>
              </div>
              <p className="mt-3 text-xs text-slate-400 font-sans leading-relaxed">
                Precision rationing and rainwater reserve deployment prevents catastrophic municipal depletion.
              </p>
            </div>
          </section>
        </div>

        {/* 5. INTERACTIVE LIVE LOCATION ANCHOR SECTION */}
        <section className="mt-20 p-8 rounded-3xl bg-gradient-to-b from-[#061426] to-[#030914] border border-cyan-500/30 shadow-[0_0_40px_rgba(0,242,254,0.1)] font-mono" id="location">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                <Globe className="w-4 h-4" /> REAL GEOGRAPHIC ANCHORING
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
                Anchor Any Locality Across India & The World
              </h2>
              <p className="text-sm text-slate-300 mt-2 font-sans max-w-2xl leading-relaxed">
                JalSetu is not a static synthetic mockup. It supports real GPS device detection and reverse geocoding via OpenStreetMap & Google Maps. Enter your neighborhood or click below to anchor the 3D twin to your exact coordinates.
              </p>
            </div>

            {/* Search or Detect Box */}
            <div className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-3">
              <form onSubmit={handleSearchSubmit} className="flex items-center gap-2 w-full sm:w-auto">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="e.g. Indiranagar, Whitefield, Rohini..."
                  className="bg-[#030814] border border-cyan-500/30 text-white placeholder:text-slate-500 px-4 py-2.5 rounded-xl text-xs font-mono outline-none focus:border-cyan-400 focus:shadow-glow-cyan w-full sm:w-64 transition-all"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-cyan-950 hover:bg-cyan-900 border border-cyan-500/40 text-cyan-300 font-bold text-xs uppercase transition-colors shrink-0"
                >
                  Search
                </button>
              </form>

              <button
                onClick={detectLiveLocation}
                disabled={isLocating}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase shadow-glow-cyan transition-all flex items-center justify-center gap-2 shrink-0"
              >
                {isLocating ? (
                  <Loader2 className="w-4 h-4 animate-spin text-slate-950" />
                ) : (
                  <Navigation className="w-4 h-4 text-slate-950 fill-current" />
                )}
                <span>USE MY LIVE GPS</span>
              </button>
            </div>
          </div>

          {/* Current Anchored Status Card */}
          <div className="mt-6 pt-6 border-t border-cyan-500/15 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-[#030814]/80 border border-cyan-500/15">
              <span className="text-slate-400 text-[10px] uppercase">Active Ward:</span>
              <div className="font-bold text-white mt-0.5 truncate">{currentLocation.name}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#030814]/80 border border-cyan-500/15">
              <span className="text-slate-400 text-[10px] uppercase">Municipality:</span>
              <div className="font-bold text-cyan-300 mt-0.5 truncate">{currentLocation.city}</div>
            </div>
            <div className="p-3 rounded-xl bg-[#030814]/80 border border-cyan-500/15">
              <span className="text-slate-400 text-[10px] uppercase">Coordinates:</span>
              <div className="font-bold text-emerald-400 mt-0.5">
                {currentLocation.lat.toFixed(4)}° N, {currentLocation.lng.toFixed(4)}° E
              </div>
            </div>
            <div className="p-3 rounded-xl bg-[#030814]/80 border border-cyan-500/15">
              <span className="text-slate-400 text-[10px] uppercase">GPS Signal Mode:</span>
              <div className="font-bold text-cyan-300 mt-0.5 flex items-center gap-1.5">
                <span className={`w-2 h-2 rounded-full ${currentLocation.isLive ? 'bg-emerald-400 animate-ping' : 'bg-cyan-400'}`} />
                {currentLocation.isLive ? 'Live Browser GPS' : 'Geographic Anchor'}
              </div>
            </div>
          </div>
        </section>

        {/* 6. AWS ARCHITECTURE & DECISION ENGINE */}
        <section className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 font-mono" id="ai">
          <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-violet-950/80 border border-violet-500/40 text-violet-300 flex items-center justify-center mb-4">
              <Cpu className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">Amazon Bedrock AI</h3>
            <p className="mt-2 text-xs text-slate-400 font-sans leading-relaxed">
              Synthesizes physical sensor telemetry into a structured JSON intervention plan. Prioritizes hospital ICU demand and computes exact rationing percentages.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-cyan-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Deterministic Safety Rules Enforced</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-sky-950/80 border border-sky-500/40 text-sky-300 flex items-center justify-center mb-4">
              <Workflow className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">AWS Step Functions</h3>
            <p className="mt-2 text-xs text-slate-400 font-sans leading-relaxed">
              Coordinates an 8-stage state machine: isolate burst sector, notify emergency operations, reroute gravity feeds, and dispatch GPS-tracked tanker relief.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-sky-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Full Audit Trail & Failure Handling</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#050e1c]/80 border border-cyan-500/20 backdrop-blur-xl">
            <div className="w-10 h-10 rounded-xl bg-amber-950/80 border border-amber-500/40 text-amber-300 flex items-center justify-center mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white uppercase">What-If Sandbox</h3>
            <p className="mt-2 text-xs text-slate-400 font-sans leading-relaxed">
              Allows municipal operators to test hypothetical contingencies (e.g. &ldquo;What if tanker is delayed by 2 hours?&rdquo;) without affecting live operations.
            </p>
            <div className="mt-4 pt-4 border-t border-slate-800 text-[11px] text-amber-300 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Real-Time Contingency Comparison</span>
            </div>
          </div>
        </section>

        {/* 7. BOTTOM CTA SECTION */}
        <section className="mt-24 p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-[#040e20] to-blue-950/40 border border-cyan-500/30 text-center relative overflow-hidden font-mono shadow-2xl">
          <div className="relative z-10 max-w-2xl mx-auto">
            <span className="text-xs text-cyan-400 font-bold uppercase tracking-wider">
              READY FOR OPERATIONAL DRILL
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-2">
              Experience JalSetu In Action
            </h2>
            <p className="mt-3 text-sm text-slate-300 font-sans leading-relaxed">
              Launch the 3D Command Center, trigger a pipeline failure, and watch our Bedrock decision engine safeguard community water continuity in real time.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => navigate('/command-center')}
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-black text-xs uppercase shadow-glow-cyan hover:shadow-cyan-400/60 transition-all active:scale-95 flex items-center gap-2"
              >
                <span>OPEN 3D COMMAND CENTER</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  runHeroDemo();
                  navigate('/command-center');
                }}
                className="px-6 py-4 rounded-xl bg-[#051122] hover:bg-[#091a34] border border-cyan-500/40 text-cyan-300 font-bold text-xs uppercase transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>START HERO STORY</span>
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* 8. FOOTER */}
      <footer className="border-t border-cyan-500/15 bg-[#02050e] py-8 text-center text-xs font-mono text-slate-500">
        <div className="mx-auto max-w-7xl px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <Droplets className="w-4 h-4 text-cyan-400" />
            <span className="font-bold text-slate-200">JalSetu</span> &bull; Heat & Water Track &bull; AWS Hackathon
          </div>
          <div>
            Built with React Three Fiber, Amazon Bedrock & AWS Step Functions
          </div>
        </div>
      </footer>
    </div>
  );
};
