import { Link } from "wouter";

export default function Home() {
  const apps = [
    {
      name: "NIL Portal",
      icon: "/nil-portal-n-white.jpeg",
      description: "Manage deals, training data, and professional connections",
      link: "/nil-portal",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Messenger",
      icon: "/messenger-n-blue.jpeg",
      description: "Real-time communication with coaches, scouts, and teammates",
      link: "/messenger",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Diamond Grind",
      icon: "/diamond-grind-geometric.png",
      description: "Training programs, analytics, and performance tracking",
      link: "/diamond-grind",
      gradient: "from-orange-500 to-yellow-500",
    },
  ];

  const features = [
    { icon: "📱", title: "Social Feed", desc: "Share highlights, connect with fans" },
    { icon: "💬", title: "Messaging", desc: "Direct communication platform" },
    { icon: "💰", title: "NIL Deals", desc: "Brand partnerships & sponsorships" },
    { icon: "💪", title: "Training", desc: "Personalized workout programs" },
    { icon: "📊", title: "Analytics", desc: "Performance tracking & insights" },
    { icon: "🏆", title: "15+ Sports", desc: "Multi-sport support" },
    { icon: "🎓", title: "Recruiting", desc: "College connections & commitments" },
    { icon: "🛒", title: "Store", desc: "Gear, apparel & equipment" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 via-orange-500 via-teal-400 to-blue-600 text-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-12 space-y-16">
        
        {/* Header with DHG Branding */}
        <div className="text-center space-y-6">
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-3 bg-black/40 backdrop-blur-sm border-2 border-yellow-400 rounded-full px-6 py-3">
              <img src="/dhg-crab-shield.jpeg" alt="DHG" className="w-8 h-8 rounded-full" />
              <div className="text-left">
                <p className="text-gray-300 text-xs uppercase tracking-wide">PARENT COMPANY</p>
                <p className="text-yellow-400 font-bold text-sm">Dozier Holdings Group</p>
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <img 
              src="/dhg-crab-shield.jpeg" 
              alt="Dozier Holdings Group" 
              className="w-32 h-32 object-contain drop-shadow-2xl animate-pulse"
            />
          </div>

          <h1 className="text-5xl md:text-7xl font-black leading-tight">
            <span className="text-white">THE #1 SPORTS PLATFORM</span>
          </h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Like Facebook, Instagram, TikTok, X & LinkedIn combined for athletes
          </p>
        </div>

        {/* Flagship Product Section */}
        <div className="bg-black/40 backdrop-blur-md border-2 border-cyan-400 rounded-3xl p-8 space-y-6">
          <div className="flex justify-center">
            <div className="bg-cyan-400 text-black px-6 py-2 rounded-full font-bold uppercase text-sm">
              FLAGSHIP PRODUCT
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {apps.map((app) => (
              <div key={app.name} className="relative group">
                <div className="absolute inset-0 bg-white blur-xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
                <img 
                  src={app.icon} 
                  alt={app.name} 
                  className="relative w-20 h-20 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
                />
              </div>
            ))}
          </div>

          <h2 className="text-4xl md:text-5xl font-black text-center text-white">
            ATHLYNX
          </h2>
          <p className="text-2xl text-center text-cyan-300 font-bold">
            The Athlete's Playbook
          </p>

          <div className="grid md:grid-cols-3 gap-4">
            {apps.map((app) => (
              <Link key={app.name} href={app.link}>
                <a className={`block bg-gradient-to-br ${app.gradient} bg-opacity-20 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 hover:scale-105 transition-transform cursor-pointer`}>
                  <div className="flex items-center gap-4 mb-3">
                    <img src={app.icon} alt={app.name} className="w-12 h-12 rounded-xl" />
                    <h3 className="text-xl font-bold text-white">{app.name}</h3>
                  </div>
                  <p className="text-gray-200 text-sm">{app.description}</p>
                </a>
              </Link>
            ))}
          </div>

          <p className="text-center text-gray-300 text-sm max-w-2xl mx-auto">
            Three powerful apps. One revolutionary platform. Social, messaging, NIL deals, training, analytics - all unified.
          </p>

          <div className="flex justify-center gap-4">
            <Link href="/nil-portal">
              <a className="bg-black/60 border-2 border-cyan-400 text-cyan-400 px-6 py-3 rounded-xl font-bold hover:bg-cyan-400 hover:text-black transition">
                📱 Social Feed
              </a>
            </Link>
            <Link href="/messenger">
              <a className="bg-black/60 border-2 border-pink-400 text-pink-400 px-6 py-3 rounded-xl font-bold hover:bg-pink-400 hover:text-black transition">
                💬 Messenger
              </a>
            </Link>
            <Link href="/diamond-grind">
              <a className="bg-black/60 border-2 border-orange-400 text-orange-400 px-6 py-3 rounded-xl font-bold hover:bg-orange-400 hover:text-black transition">
                💪 Diamond Grind
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
                className="bg-black/40 backdrop-blur-sm border-2 border-white/30 rounded-2xl p-6 text-center hover:scale-105 hover:border-cyan-400 transition-all cursor-pointer"
              >
                <div className="text-5xl mb-3">{feature.icon}</div>
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-300 text-xs">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div className="grid md:grid-cols-3 gap-6">
          <Link href="/founder-story">
            <a className="block bg-black/40 backdrop-blur-sm border-2 border-orange-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🦀</div>
              <h3 className="text-xl font-bold text-white mb-2">Founder's Story</h3>
              <p className="text-gray-300 text-sm">Learn about Chad A. Dozier and the DHG mission</p>
            </a>
          </Link>

          <Link href="/store">
            <a className="block bg-black/40 backdrop-blur-sm border-2 border-green-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-xl font-bold text-white mb-2">Store</h3>
              <p className="text-gray-300 text-sm">Gear, apparel, equipment for all sports</p>
            </a>
          </Link>

          <Link href="/recruiting">
            <a className="block bg-black/40 backdrop-blur-sm border-2 border-purple-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🎓</div>
              <h3 className="text-xl font-bold text-white mb-2">Recruiting</h3>
              <p className="text-gray-300 text-sm">College connections and commitments</p>
            </a>
          </Link>

          <Link href="/faith">
            <a className="block bg-black/40 backdrop-blur-sm border-2 border-amber-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">✝️</div>
              <h3 className="text-xl font-bold text-white mb-2">Faith & Athletes</h3>
              <p className="text-gray-300 text-sm">Daily devotionals, prayer wall & community</p>
            </a>
          </Link>

          <Link href="/transfer-portal-intelligence">
            <a className="block bg-black/40 backdrop-blur-sm border-2 border-cyan-400 rounded-2xl p-6 hover:scale-105 transition-transform">
              <div className="text-4xl mb-3">🔄</div>
              <h3 className="text-xl font-bold text-white mb-2">Transfer Portal</h3>
              <p className="text-gray-300 text-sm">Intelligence platform for schools & athletes</p>
            </a>
          </Link>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl p-12 text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black text-black">
            JOIN THE REVOLUTION
          </h2>
          <p className="text-xl text-black/80 max-w-2xl mx-auto">
            10,000 founding member spots. 6 months free VIP access. Launch February 1, 2026.
          </p>
          <Link href="/">
            <a className="inline-block bg-black text-white px-8 py-4 rounded-xl font-black text-lg uppercase hover:scale-105 transition-transform">
              🏆 Get VIP Access
            </a>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-300 text-sm space-y-2">
          <p>Powered by Dozier Holdings Group</p>
          <p>© 2025 Athlynx. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
