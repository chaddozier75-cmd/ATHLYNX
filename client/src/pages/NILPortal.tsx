import { Link } from "wouter";

export default function NILPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-cyan-900 text-white">
      <div className="w-full max-w-[1200px] mx-auto px-4 py-12 space-y-16">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/nil-portal-n-white.jpeg" alt="NIL Portal" className="w-12 h-12 rounded-xl" />
            <h1 className="text-2xl font-bold">NIL PORTAL</h1>
          </div>
          <Link href="/home">
            <a className="bg-cyan-400 text-black px-6 py-2 rounded-xl font-bold hover:bg-cyan-300 transition">
              Join Waitlist
            </a>
          </Link>
        </div>

        {/* Launch Badge */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-yellow-500 to-orange-500 border-2 border-yellow-400 rounded-full px-8 py-3 inline-block">
            <p className="text-black font-bold text-sm">🚀 LAUNCHING FEBRUARY 2026</p>
          </div>
        </div>

        {/* Main Headline */}
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-7xl font-black leading-tight">
            <span className="text-white">THE FUTURE</span><br/>
            <span className="text-white">OF</span><br/>
            <span className="text-green-400 text-6xl md:text-8xl">ATHLETE</span><br/>
            <span className="text-green-400 text-6xl md:text-8xl">FINANCE</span><br/>
            <span className="text-white">IS COMING</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Two revolutionary apps. One powerful ecosystem. The complete operating system for the next generation of athlete-entrepreneurs. Be among the first to transform how you manage your career.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-black/40 backdrop-blur-sm border-2 border-green-400 rounded-2xl p-8 space-y-4">
            <div className="text-5xl">💰</div>
            <h3 className="text-2xl font-bold text-white">NIL Deal Management</h3>
            <p className="text-gray-300">
              Connect with brands, negotiate deals, track payments, and manage your entire NIL portfolio in one place.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Brand partnership marketplace</li>
              <li>✓ Contract management & e-signatures</li>
              <li>✓ Payment tracking & invoicing</li>
              <li>✓ Tax documentation & reporting</li>
            </ul>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border-2 border-cyan-400 rounded-2xl p-8 space-y-4">
            <div className="text-5xl">📊</div>
            <h3 className="text-2xl font-bold text-white">Performance Analytics</h3>
            <p className="text-gray-300">
              Track your training data, game stats, and recruiting metrics. Share your progress with coaches and scouts.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Training session tracking</li>
              <li>✓ Game performance analysis</li>
              <li>✓ Recruiting profile builder</li>
              <li>✓ Video highlight management</li>
            </ul>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border-2 border-purple-400 rounded-2xl p-8 space-y-4">
            <div className="text-5xl">🤝</div>
            <h3 className="text-2xl font-bold text-white">Professional Network</h3>
            <p className="text-gray-300">
              Build relationships with coaches, scouts, agents, and other athletes. Your career network in one platform.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ Coach & scout connections</li>
              <li>✓ Agent & advisor directory</li>
              <li>✓ Athlete community forums</li>
              <li>✓ Mentorship programs</li>
            </ul>
          </div>

          <div className="bg-black/40 backdrop-blur-sm border-2 border-orange-400 rounded-2xl p-8 space-y-4">
            <div className="text-5xl">🎓</div>
            <h3 className="text-2xl font-bold text-white">Education & Resources</h3>
            <p className="text-gray-300">
              Learn about NIL regulations, financial literacy, personal branding, and career development.
            </p>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li>✓ NIL compliance training</li>
              <li>✓ Financial literacy courses</li>
              <li>✓ Personal branding workshops</li>
              <li>✓ Career transition planning</li>
            </ul>
          </div>
        </div>

        {/* Video Section */}
        <div className="text-center space-y-6">
          <h3 className="text-3xl font-bold">See NIL Portal in Action</h3>
          
          {/* Main Video */}
          <div className="max-w-3xl mx-auto mb-8">
            <video controls className="w-full rounded-2xl border-2 border-cyan-400" poster="/video_thumbs/nil-portal-main.jpg">
              <source src="/videos/nil-portal-main.mp4" type="video/mp4" />
            </video>
          </div>
          
          {/* Video Grid */}
          <div className="grid md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div className="rounded-xl overflow-hidden border border-cyan-500/30">
              <video controls muted className="w-full aspect-video object-cover">
                <source src="/videos/nil-portal-baseball.mp4" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-400 p-2 bg-black/40">Baseball Athletes</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-cyan-500/30">
              <video controls muted className="w-full aspect-video object-cover">
                <source src="/videos/nil-portal-football.mp4" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-400 p-2 bg-black/40">Football Athletes</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-cyan-500/30">
              <video controls muted className="w-full aspect-video object-cover">
                <source src="/videos/nil-portal-multisport.mp4" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-400 p-2 bg-black/40">Multi-Sport</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-cyan-500/30">
              <video controls muted className="w-full aspect-video object-cover">
                <source src="/videos/nil-portal-youth.mp4" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-400 p-2 bg-black/40">Youth Athletes</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-cyan-500/30">
              <video controls muted className="w-full aspect-video object-cover">
                <source src="/videos/nil-portal-athletes.mp4" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-400 p-2 bg-black/40">All Athletes</p>
            </div>
            <div className="rounded-xl overflow-hidden border border-cyan-500/30">
              <video controls muted className="w-full aspect-video object-cover">
                <source src="/videos/athlynx-crab-stadium.mp4" type="video/mp4" />
              </video>
              <p className="text-sm text-gray-400 p-2 bg-black/40">ATHLYNX Stadium</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-500 to-cyan-500 rounded-3xl p-12 text-center space-y-6">
          <h3 className="text-4xl md:text-5xl font-black text-white">
            BE AMONG THE FIRST
          </h3>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Join 10,000 founding members and get 6 months of VIP access free. Launch February 1, 2026.
          </p>
          <Link href="/">
            <a className="inline-block bg-white text-black px-8 py-4 rounded-xl font-black text-lg uppercase hover:scale-105 transition-transform">
              🏆 Claim Your Spot
            </a>
          </Link>
        </div>

        {/* Footer */}
        <div className="text-center space-y-4">
          <div className="flex justify-center gap-4">
            <Link href="/home"><a className="text-gray-400 hover:text-white transition">Home</a></Link>
            <Link href="/founder-story"><a className="text-gray-400 hover:text-white transition">Founder's Story</a></Link>
            <Link href="/messenger"><a className="text-gray-400 hover:text-white transition">Messenger</a></Link>
            <Link href="/diamond-grind"><a className="text-gray-400 hover:text-white transition">Diamond Grind</a></Link>
          </div>
          <p className="text-gray-500 text-sm">Powered by Dozier Holdings Group</p>
        </div>
      </div>
    </div>
  );
}
