import { useState } from 'react';
import { Link } from 'wouter';
import { Building2, Users, Cpu, Home, Utensils, Wine, Heart, TreePine, Zap, Database, Coins, Globe, ChevronRight, ExternalLink } from 'lucide-react';

type Division = 'all' | 'technology' | 'realestate' | 'trading';

interface Subsidiary {
  name: string;
  shortName: string;
  division: 'technology' | 'realestate' | 'trading';
  description: string;
  icon: React.ReactNode;
  status: 'active' | 'development' | 'planned';
}

const subsidiaries: Subsidiary[] = [
  // Technology Division
  {
    name: 'VC Technologies, LLC',
    shortName: 'VC Tech',
    division: 'technology',
    description: 'R&D technologies, data center design, cryptocurrency & trading platform development',
    icon: <Cpu className="w-6 h-6" />,
    status: 'active'
  },
  {
    name: 'VC Data Centers, LLC',
    shortName: 'VC Data',
    division: 'technology',
    description: 'Build and operate data centers serving as cloud infrastructure for enterprise customers',
    icon: <Database className="w-6 h-6" />,
    status: 'active'
  },
  {
    name: 'The VIRT, LLC',
    shortName: 'VIRT',
    division: 'technology',
    description: 'Proprietary cryptocurrency mining and trading platform with VLT & VPT tokens',
    icon: <Coins className="w-6 h-6" />,
    status: 'active'
  },
  {
    name: 'VC Energy, LLC',
    shortName: 'VC Energy',
    division: 'technology',
    description: 'Generate and supply low-cost power for real estate projects and data centers',
    icon: <Zap className="w-6 h-6" />,
    status: 'development'
  },
  {
    name: 'Softmor, Inc.',
    shortName: 'Softmor',
    division: 'technology',
    description: 'Software development and technology solutions including ATHLYNX athlete platform',
    icon: <Cpu className="w-6 h-6" />,
    status: 'active'
  },
  // Real Estate Division
  {
    name: 'Uma Real Estate Investment, LLC',
    shortName: 'UMA',
    division: 'realestate',
    description: 'Land acquisitions and development for DHG businesses near Livingston and Trinity River',
    icon: <Building2 className="w-6 h-6" />,
    status: 'active'
  },
  {
    name: 'Villa Agape, LLC',
    shortName: 'Villa Agape',
    division: 'realestate',
    description: 'Home-away-from-home residences for cancer patients with IoT health monitoring',
    icon: <Heart className="w-6 h-6" />,
    status: 'development'
  },
  {
    name: 'Compassionate Care, LLC',
    shortName: 'Compassionate Care',
    division: 'realestate',
    description: 'On-site clinic at Villa Agape providing daily care and health services',
    icon: <Heart className="w-6 h-6" />,
    status: 'development'
  },
  {
    name: 'Pisces Resort, LLC',
    shortName: 'Pisces Resort',
    division: 'realestate',
    description: 'Luxury resort with spa, gym, swimming, fishing, and prefab cabin accommodations',
    icon: <TreePine className="w-6 h-6" />,
    status: 'planned'
  },
  {
    name: 'Venus Venue & Vineyard, LLC',
    shortName: 'Venus Venue',
    division: 'realestate',
    description: 'Wedding venue with glass chapel, event hosting, and premium wine production',
    icon: <Wine className="w-6 h-6" />,
    status: 'planned'
  },
  {
    name: 'Pomodoro Restaurant, LLC',
    shortName: 'Pomodoro',
    division: 'realestate',
    description: 'Award-winning Italian fine dining with luxury catering and event services',
    icon: <Utensils className="w-6 h-6" />,
    status: 'planned'
  },
  // Trading Division
  {
    name: 'The Silk Road Trading, LLC',
    shortName: 'Silk Road',
    division: 'trading',
    description: 'Worldwide sourcing and trading products with strong profit outlooks',
    icon: <Globe className="w-6 h-6" />,
    status: 'active'
  }
];

const founders = [
  { name: 'Chad A. Dozier', title: 'Chairman & CEO', role: 'Partner' },
  { name: 'Todd Neely', title: 'President & Director of Sales', role: 'Partner' },
  { name: 'Glenn Tse', title: 'CFO & VP of Business Operations', role: 'Partner' },
  { name: 'Andrew Kustes', title: 'CTO', role: 'Partner' },
  { name: 'Jimmy Boyd', title: 'VP of Real Estate Investments', role: 'Partner' }
];

const stats = [
  { value: '99.9%', label: 'Uptime Guarantee' },
  { value: '24/7', label: 'Elite Support' },
  { value: '500+', label: 'Enterprise Clients' },
  { value: '15+', label: 'Years Excellence' }
];

export default function DHGCorporate() {
  const [filter, setFilter] = useState<Division>('all');

  const filteredSubs = filter === 'all' 
    ? subsidiaries 
    : subsidiaries.filter(s => s.division === filter);

  const divisionColors = {
    technology: 'from-blue-500 to-cyan-500',
    realestate: 'from-emerald-500 to-green-500',
    trading: 'from-amber-500 to-orange-500'
  };

  const statusColors = {
    active: 'bg-green-500',
    development: 'bg-yellow-500',
    planned: 'bg-blue-500'
  };

  return (
    <div className="min-h-screen bg-[#0a1628] text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/50 via-transparent to-emerald-900/30" />
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(16, 185, 129, 0.1) 0%, transparent 50%)'
        }} />
        
        <div className="container relative py-16">
          <div className="flex items-center gap-4 mb-6">
            <img src="/images/dhg-logo.webp" alt="DHG" className="w-16 h-16 rounded-lg" />
            <div>
              <p className="text-emerald-400 text-sm font-medium tracking-wider">PARENT COMPANY</p>
              <h1 className="text-4xl md:text-5xl font-bold">Dozier Holdings Group</h1>
            </div>
          </div>
          <p className="text-xl text-gray-300 max-w-2xl mb-4">
            THE SOLE SOURCE PROVIDER
          </p>
          <p className="text-gray-400 max-w-3xl mb-8">
            Driving transformative investments across high-growth industries through cutting-edge technology, 
            energy efficiency, and long-term value creation.
          </p>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <a 
              href="https://dozierholdingsgroup.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-green-600 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Visit Official Website <ExternalLink className="w-4 h-4" />
            </a>
            <Link href="/softmor" className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition">
              Softmor Inc <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leadership Section */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-2">Executive Leadership</h2>
        <p className="text-gray-400 mb-8">Five strategic partners with complementary expertise</p>
        
        <div className="grid md:grid-cols-5 gap-4">
          {founders.map((founder, i) => (
            <div key={i} className="bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-4 text-center hover:border-emerald-500/50 transition">
              <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-gradient-to-br from-emerald-500 to-blue-500 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-white">{founder.name}</h3>
              <p className="text-sm text-emerald-400">{founder.title}</p>
              <p className="text-xs text-gray-500 mt-1">{founder.role}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Subsidiaries Section */}
      <div className="container py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-bold mb-2">Portfolio Companies</h2>
            <p className="text-gray-400">Strategic investments across three core divisions</p>
          </div>
          
          {/* Filter Tabs */}
          <div className="flex gap-2 flex-wrap">
            {[
              { key: 'all', label: 'All Companies' },
              { key: 'technology', label: 'Technology' },
              { key: 'realestate', label: 'Real Estate' },
              { key: 'trading', label: 'Trading' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key as Division)}
                className={`px-4 py-2 rounded-lg font-medium transition ${
                  filter === tab.key 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-white/10 text-gray-300 hover:bg-white/20'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex gap-6 mb-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="text-gray-400">Active</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <span className="text-gray-400">In Development</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500" />
            <span className="text-gray-400">Planned</span>
          </div>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSubs.map((sub, i) => (
            <div 
              key={i} 
              className="group bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-xl p-5 hover:border-emerald-500/50 transition relative overflow-hidden"
            >
              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${divisionColors[sub.division]}`} />
              
              <div className="flex items-start justify-between mb-3">
                <div className={`p-2 rounded-lg bg-gradient-to-br ${divisionColors[sub.division]}`}>
                  {sub.icon}
                </div>
                <div className={`w-2 h-2 rounded-full ${statusColors[sub.status]}`} />
              </div>
              
              <h3 className="font-semibold text-white mb-1">{sub.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{sub.description}</p>
              
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500 capitalize">{sub.division.replace('realestate', 'Real Estate')}</span>
                {sub.shortName === 'Softmor' && (
                  <Link href="/softmor" className="text-xs text-emerald-400 hover:underline">
                    View Details →
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Technology Investments */}
      <div className="container py-16">
        <h2 className="text-3xl font-bold mb-8">Technology Investments</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-900/50 to-blue-800/30 border border-blue-500/30 rounded-xl p-6">
            <div className="text-4xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-2">Bitcoin Mining Excellence</h3>
            <p className="text-gray-400 mb-4">State-of-the-art mining facilities with 97% uptime, advanced cooling technology, and maximum profitability optimization.</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Advanced Cooling Systems</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Real-time Monitoring</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Maximum ROI Optimization</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-amber-900/50 to-amber-800/30 border border-amber-500/30 rounded-xl p-6">
            <div className="text-4xl mb-4">🔗</div>
            <h3 className="text-xl font-bold mb-2">The Virt Token Platform</h3>
            <p className="text-gray-400 mb-4">Revolutionary investment platform offering VLT and VPT options with cutting-edge blockchain technology.</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> VLT Investment Options</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> VPT Trading Platform</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Blockchain Security</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-900/50 to-purple-800/30 border border-purple-500/30 rounded-xl p-6">
            <div className="text-4xl mb-4">🖥️</div>
            <h3 className="text-xl font-bold mb-2">Elite Computing Solutions</h3>
            <p className="text-gray-400 mb-4">High-performance computing through exclusive advanced technology partnerships, delivering unmatched processing power.</p>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Strategic Partnerships</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Custom Configurations</li>
              <li className="flex items-center gap-2"><span className="text-emerald-400">✓</span> Enterprise-Grade Performance</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="container py-16">
        <div className="bg-gradient-to-r from-emerald-900/50 to-blue-900/50 border border-emerald-500/30 rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Infrastructure?</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Join 500+ enterprise clients who trust Dozier Holdings Group for their critical technology needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="https://dozierholdingsgroup.com/contact.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-emerald-500 rounded-lg font-semibold hover:bg-emerald-600 transition"
            >
              Schedule Consultation
            </a>
            <a 
              href="https://dozierholdingsgroup.com/portfolio.html" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-white/10 border border-white/20 rounded-lg font-semibold hover:bg-white/20 transition"
            >
              View Full Portfolio
            </a>
          </div>
        </div>
      </div>

      {/* Footer Links */}
      <div className="container py-8 border-t border-white/10">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-400">
          <Link href="/" className="hover:text-white transition">Home</Link>
          <Link href="/softmor" className="hover:text-white transition">Softmor Inc</Link>
          <Link href="/project-management" className="hover:text-white transition">Project Management</Link>
          <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition">
            DHG Official Site
          </a>
        </div>
      </div>
    </div>
  );
}
