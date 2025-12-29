import { Link } from 'wouter';
import { Code, Smartphone, Users, Shield, Zap, Globe, ChevronRight, ExternalLink } from 'lucide-react';

const products = [
  {
    name: 'ATHLYNX',
    tagline: "The Athlete's Playbook",
    description: 'Complete athlete ecosystem for NIL deals, social networking, messaging, and career management',
    icon: '🦀',
    status: 'Active',
    link: '/'
  },
  {
    name: 'NIL Portal',
    tagline: 'Name, Image, Likeness Platform',
    description: 'Connect athletes with brands for endorsement deals and sponsorship opportunities',
    icon: '💼',
    status: 'Active',
    link: '/nil-portal'
  },
  {
    name: 'Diamond Grind',
    tagline: 'Baseball Training Excellence',
    description: 'Performance tracking, training programs, and analytics for baseball athletes',
    icon: '⚾',
    status: 'Active',
    link: '/diamond-grind'
  },
  {
    name: 'NIL Messenger',
    tagline: 'Secure Athlete Communication',
    description: 'End-to-end encrypted messaging for athletes, agents, and brands',
    icon: '💬',
    status: 'Active',
    link: '/messenger'
  },
  {
    name: 'FUEL Bots',
    tagline: 'AI Performance Coaching',
    description: 'AI-powered training recommendations and performance optimization',
    icon: '🤖',
    status: 'Development',
    link: '#'
  }
];

const whiteLabelApps = [
  { name: 'Hoop Empire', sport: 'Basketball', icon: '🏀' },
  { name: 'Gridiron Nexus', sport: 'Football', icon: '🏈' },
  { name: 'Pitch Pulse', sport: 'Soccer', icon: '⚽' },
  { name: 'Reel Masters', sport: 'Fishing', icon: '🎣' },
  { name: 'Faith & Sport', sport: 'Faith-Based', icon: '✝️' },
  { name: 'Military Athletes', sport: 'Veterans', icon: '🎖️' }
];

export default function Softmor() {
  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/30 via-transparent to-blue-900/30" />
        
        <div className="container relative py-16">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
            <Link href="/dhg" className="hover:text-white transition">Dozier Holdings Group</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-cyan-400">Softmor, Inc.</span>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
              <Code className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-cyan-400 text-sm font-medium tracking-wider">DHG TECHNOLOGY DIVISION</p>
              <h1 className="text-4xl md:text-5xl font-bold">Softmor, Inc.</h1>
            </div>
          </div>
          
          <p className="text-xl text-gray-300 max-w-2xl mb-8">
            Software development and technology solutions powering the future of athlete success
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg font-semibold hover:opacity-90 transition">
              Explore ATHLYNX <ChevronRight className="w-4 h-4" />
            </Link>
            <Link href="/dhg" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition">
              Back to DHG
            </Link>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="container py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-300 mb-6">
              Softmor, Inc. is the technology arm of Dozier Holdings Group, focused on developing 
              innovative software solutions that empower athletes to maximize their potential both 
              on and off the field.
            </p>
            <p className="text-gray-400 mb-6">
              Our flagship product, ATHLYNX, represents the complete athlete ecosystem - combining 
              social networking, NIL deal management, secure messaging, performance analytics, and 
              career development tools into one unified platform.
            </p>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-cyan-400">7+</div>
                <div className="text-sm text-gray-400">Platform Products</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="text-3xl font-bold text-cyan-400">6</div>
                <div className="text-sm text-gray-400">White-Label Apps</div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
              <Smartphone className="w-8 h-8 text-cyan-400 mb-3" />
              <h3 className="font-semibold mb-1">Mobile First</h3>
              <p className="text-sm text-gray-400">Native iOS & Android apps</p>
            </div>
            <div className="bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-500/30 rounded-xl p-6">
              <Shield className="w-8 h-8 text-emerald-400 mb-3" />
              <h3 className="font-semibold mb-1">Secure</h3>
              <p className="text-sm text-gray-400">End-to-end encryption</p>
            </div>
            <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
              <Zap className="w-8 h-8 text-purple-400 mb-3" />
              <h3 className="font-semibold mb-1">AI Powered</h3>
              <p className="text-sm text-gray-400">Smart recommendations</p>
            </div>
            <div className="bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 rounded-xl p-6">
              <Globe className="w-8 h-8 text-amber-400 mb-3" />
              <h3 className="font-semibold mb-1">Global Scale</h3>
              <p className="text-sm text-gray-400">Cloud infrastructure</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-2">Our Products</h2>
        <p className="text-gray-400 mb-8">The complete athlete technology ecosystem</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, i) => (
            <Link key={i} href={product.link}>
              <div className="group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-6 hover:border-cyan-500/50 transition cursor-pointer h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{product.icon}</div>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.status === 'Active' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {product.status}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-1">{product.name}</h3>
                <p className="text-cyan-400 text-sm mb-3">{product.tagline}</p>
                <p className="text-gray-400 text-sm">{product.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* White Label Apps */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-2">White-Label Sport Apps</h2>
        <p className="text-gray-400 mb-8">Customized ATHLYNX experiences for specific sports and communities</p>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {whiteLabelApps.map((app, i) => (
            <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-cyan-500/50 transition">
              <div className="text-4xl mb-2">{app.icon}</div>
              <h3 className="font-semibold text-sm">{app.name}</h3>
              <p className="text-xs text-gray-500">{app.sport}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ATHLYNX Feature */}
      <div className="container py-16">
        <div className="bg-gradient-to-r from-cyan-900/50 to-blue-900/50 border border-cyan-500/30 rounded-2xl p-8 md:p-12">
          <div className="flex items-center gap-4 mb-6">
            <div className="text-6xl">🦀</div>
            <div>
              <h2 className="text-3xl font-bold">ATHLYNX</h2>
              <p className="text-cyan-400">The Athlete's Playbook</p>
            </div>
          </div>
          
          <p className="text-gray-300 mb-8 max-w-3xl">
            The complete ecosystem for modern athletes. Connect with brands, manage NIL deals, 
            network with other athletes, track performance, and build your career - all in one platform.
          </p>
          
          <div className="grid md:grid-cols-5 gap-4 mb-8">
            {['Social Network', 'NIL Deals', 'Messaging', 'Analytics', 'Compliance'].map((feature, i) => (
              <div key={i} className="bg-white/10 rounded-lg p-3 text-center">
                <span className="text-cyan-400">✓</span> {feature}
              </div>
            ))}
          </div>
          
          <div className="flex flex-wrap gap-4">
            <Link href="/" className="px-8 py-3 bg-cyan-500 rounded-lg font-semibold hover:bg-cyan-600 transition">
              Get VIP Early Access
            </Link>
            <Link href="/playbook" className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition">
              Preview the App
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="container py-8 border-t border-white/10">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/dhg" className="hover:text-white transition">DHG Corporate</Link>
          <Link href="/project-management" className="hover:text-white transition">Project Management</Link>
          <a href="https://dozierholdingsgroup.com/softmor.html" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            Softmor Official <ExternalLink className="w-3 h-3 inline ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
