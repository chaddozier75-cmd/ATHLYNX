import { Link } from "wouter";
import UnifiedFooter from "@/components/UnifiedFooter";

export default function Home() {
  const apps = [
    {
      name: "NIL Portal",
      icon: "/images/nil-portal-icon.jpeg",
      description: "Manage deals, training data, and professional connections",
      link: "/nil-portal",
    },
    {
      name: "Diamond Grind",
      icon: "/images/diamond-grind-icon.png",
      description: "Training programs, analytics, and performance tracking",
      link: "/diamond-grind",
    },
    {
      name: "NIL Messenger",
      icon: "/images/nil-messenger-icon.jpeg",
      description: "Real-time communication with coaches, scouts, and teammates",
      link: "/messenger",
    },
  ];

  const features = [
    { title: "Social Feed", desc: "Share highlights, connect with fans" },
    { title: "Messaging", desc: "Direct communication platform" },
    { title: "NIL Deals", desc: "Brand partnerships & sponsorships" },
    { title: "Training", desc: "Personalized workout programs" },
    { title: "Analytics", desc: "Performance tracking & insights" },
    { title: "15+ Sports", desc: "Multi-sport support" },
    { title: "Recruiting", desc: "College connections & commitments" },
    { title: "Store", desc: "Gear, apparel & equipment" },
  ];

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      {/* Dark Blue Gradient Background - Same as VIP page */}
      <div className="absolute inset-0" 
           style={{
             background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 25%, #0f2847 50%, #0a1e38 75%, #061424 100%)'
           }}>
      </div>

      {/* Subtle blue glow overlay */}
      <div className="absolute inset-0 opacity-40"
           style={{
             background: 'radial-gradient(ellipse at top center, rgba(59, 130, 246, 0.15) 0%, transparent 60%), radial-gradient(ellipse at bottom center, rgba(6, 182, 212, 0.1) 0%, transparent 60%)'
           }}>
      </div>

      <div className="relative w-full max-w-[900px] mx-auto px-4 py-12 space-y-12">
        
        {/* Header with DHG Branding */}
        <div className="text-center space-y-6">
          {/* DHG Crab Shield Logo */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-30 animate-pulse"></div>
              <img 
                src="/images/dhg-crab-shield-new.jpeg" 
                alt="DHG Crab Shield" 
                className="relative w-28 h-28 rounded-full shadow-2xl border-4 border-cyan-400/50"
              />
            </div>
          </div>

          {/* Parent Company Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-slate-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-full px-6 py-3 shadow-2xl">
              <div className="text-left">
                <p className="text-gray-400 text-xs uppercase tracking-wide">PARENT COMPANY</p>
                <p className="text-cyan-400 font-bold text-sm">Dozier Holdings Group</p>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-black leading-tight">
            <span className="text-white">THE #1 SPORTS PLATFORM</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Like Facebook, Instagram, TikTok, X & LinkedIn combined for athletes
          </p>
        </div>

        {/* Flagship Product Section */}
        <div className="bg-slate-900/80 backdrop-blur-md border-2 border-cyan-500/50 rounded-3xl p-8 space-y-6 shadow-2xl">
          <div className="flex justify-center">
            <div className="bg-cyan-500 text-white px-6 py-2 rounded-full font-bold uppercase text-sm">
              FLAGSHIP PRODUCT
            </div>
          </div>

          {/* App Icons */}
          <div className="flex justify-center gap-4">
            {apps.map((app) => (
              <div key={app.name} className="relative group">
                <div className="absolute inset-0 bg-cyan-400 blur-xl opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>

          <h2 className="text-5xl md:text-6xl font-black text-center text-white">
            ATHLYNX
          </h2>
          <p className="text-2xl text-center text-cyan-400 font-bold uppercase tracking-wider">
            The Athlete's Playbook
          </p>

          {/* App Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app) => (
              <Link key={app.name} href={app.link}>
                <a className="block bg-slate-800/60 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-all cursor-pointer">
                  <div className="flex items-center gap-4 mb-3">
                    <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl" />
                    <h3 className="text-lg font-bold text-white">{app.name}</h3>
                  </div>
                  <p className="text-gray-400 text-sm">{app.description}</p>
                </a>
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-400 text-sm max-w-2xl mx-auto">
            Three powerful apps. One revolutionary platform. Social, messaging, NIL deals, training, analytics - all unified.
          </p>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 flex-wrap">
            <Link href="/nil-portal">
              <a className="bg-slate-800/60 border-2 border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition">
                Social Feed
              </a>
            </Link>
            <Link href="/messenger">
              <a className="bg-slate-800/60 border-2 border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition">
                Messenger
              </a>
            </Link>
            <Link href="/diamond-grind">
              <a className="bg-slate-800/60 border-2 border-cyan-500/50 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-500 hover:text-white transition">
                Diamond Grind
              </a>
            </Link>
          </div>
        </div>

        {/* All Features Grid */}
        <div className="space-y-6">
          <h2 className="text-3xl md:text-4xl font-black text-center text-white">
            ONE APP. EVERYTHING BUILT IN.
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 rounded-2xl p-6 text-center hover:scale-105 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/founder-story">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <img src="/images/dhg-crab-shield-new.jpeg" alt="DHG" className="w-12 h-12 rounded-lg mb-3" />
              <h3 className="text-xl font-bold text-white mb-2">Founder's Story</h3>
              <p className="text-gray-400 text-sm">Learn about Chad A. Dozier and the DHG mission</p>
            </a>
          </Link>

          <Link href="/store">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">S</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Store</h3>
              <p className="text-gray-400 text-sm">Gear, apparel, equipment for all sports</p>
            </a>
          </Link>

          <Link href="/recruiting">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">R</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Recruiting</h3>
              <p className="text-gray-400 text-sm">College connections and commitments</p>
            </a>
          </Link>

          <Link href="/faith">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold text-xl">✟</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Faith & Athletes</h3>
              <p className="text-gray-400 text-sm">Daily devotionals, prayer wall & community</p>
            </a>
          </Link>

          <Link href="/transfer-portal-intelligence">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">TP</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Transfer Portal</h3>
              <p className="text-gray-400 text-sm">Intelligence platform for schools & athletes</p>
            </a>
          </Link>

          <Link href="/military-division">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-cyan-500/30 hover:border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="w-12 h-12 rounded-lg bg-cyan-500/20 border border-cyan-500/50 flex items-center justify-center mb-3">
                <span className="text-cyan-400 font-bold">MIL</span>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Military Division</h3>
              <p className="text-gray-400 text-sm">Operation Warrior Pipeline</p>
            </a>
          </Link>
        </div>

        {/* Corporate & Investor Links */}
        <div className="grid md:grid-cols-4 gap-4">
          <Link href="/dhg">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <img src="/images/dhg-logo.png" alt="DHG" className="w-10 h-10 rounded-lg mx-auto mb-2" />
              <h3 className="text-white font-bold">DHG Corporate</h3>
            </a>
          </Link>
          <Link href="/softmor">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <img src="/images/hub-logo.png" alt="Softmor" className="w-10 h-10 rounded-lg mx-auto mb-2" />
              <h3 className="text-white font-bold">Softmor Inc</h3>
            </a>
          </Link>
          <Link href="/investor-hub">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-400 font-bold">$</span>
              </div>
              <h3 className="text-white font-bold">Investor Hub</h3>
            </a>
          </Link>
          <Link href="/hub">
            <a className="block bg-slate-900/80 backdrop-blur-sm border-2 border-amber-500/30 hover:border-amber-400 rounded-2xl p-5 hover:scale-105 transition-transform text-center">
              <div className="w-10 h-10 rounded-lg bg-amber-500/20 border border-amber-500/50 flex items-center justify-center mx-auto mb-2">
                <span className="text-amber-400 font-bold">14</span>
              </div>
              <h3 className="text-white font-bold">Quick Links Hub</h3>
            </a>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-3xl p-12 text-center space-y-6 shadow-2xl">
          <h2 className="text-4xl md:text-5xl font-black text-white">
            JOIN THE REVOLUTION
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            10,000 founding member spots. 6 months free VIP access. Launch February 1, 2026.
          </p>
          <Link href="/">
            <a className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-black text-lg uppercase hover:scale-105 transition-transform shadow-xl">
              Get VIP Access
            </a>
          </Link>
        </div>

      </div>
      
      {/* Unified Footer */}
      <UnifiedFooter />
    </div>
  );
}
