import { Link } from "wouter";

const investorSections = [
  {
    title: "ATHLYNX / NIL Portal",
    description: "The Complete Athlete Ecosystem - $2.5B NIL Market Opportunity",
    ask: "$1.5M Pre-Seed for 10% Equity",
    valuation: "$15M Post-Money",
    icon: "/images/nil-portal-icon.jpeg",
    links: [
      { name: "Pitch Deck", href: "/investor/athlynx-pitch" },
      { name: "5-Year P&L", href: "/investor/athlynx-pl" },
      { name: "Prospectus", href: "/investor/athlynx-prospectus" },
    ],
    highlight: true,
  },
  {
    title: "Dozier Holdings Group",
    description: "Parent Holding Company - Strategic Oversight & Capital Allocation",
    ask: "Strategic Partnership",
    valuation: "Portfolio Value",
    icon: "/images/dhg-logo.png",
    links: [
      { name: "Corporate Structure", href: "/dhg" },
      { name: "Pitch Deck", href: "/investor/dhg-pitch" },
      { name: "Prospectus", href: "/investor/dhg-prospectus" },
    ],
  },
  {
    title: "Softmor Inc",
    description: "Datacenter Infrastructure - 4 Pillars Model",
    ask: "$5M Series A",
    valuation: "$375M Year 5 Target",
    icon: "/images/hub-logo.png",
    links: [
      { name: "Overview", href: "/softmor" },
      { name: "Pitch Deck", href: "/investor/softmor-pitch" },
      { name: "5-Year P&L", href: "/investor/softmor-pl" },
    ],
  },
];

const keyMetrics = [
  { label: "Total Addressable Market", value: "$2.5B", sublabel: "NIL Market" },
  { label: "Year 5 Revenue Target", value: "$135M", sublabel: "ARR" },
  { label: "Athletes in Pipeline", value: "520K+", sublabel: "Student Athletes" },
  { label: "LTV:CAC Ratio", value: "10:1", sublabel: "Unit Economics" },
];

const teamMembers = [
  { name: "Chad A. Dozier", title: "Chief Executive Officer", role: "Vision, Strategy, Investor Relations" },
  { name: "Glenn Tse", title: "CFO & COO", role: "Finance, Operations, Legal" },
  { name: "Andy Kustes", title: "VP of Technology", role: "Product Development, Engineering" },
  { name: "Lee Marshall", title: "VP of Sales & Partnerships", role: "Sales, Brand Partnerships" },
  { name: "Jimmy Boyd", title: "VP of Real Estate", role: "Real Estate, Strategic Partnerships" },
];

export default function InvestorHub() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #061424 100%)' }}>
      {/* Header */}
      <div className="text-center py-12 border-b border-cyan-500/20">
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="/images/dhg-crab-shield-new.jpeg" alt="DHG" className="w-20 h-20 rounded-full border-4 border-cyan-400/50" />
        </div>
        <h1 className="text-5xl font-black text-white mb-2">INVESTOR HUB</h1>
        <p className="text-cyan-400 text-xl font-bold uppercase tracking-wider">Dozier Holdings Group Portfolio</p>
        <p className="text-white/60 mt-2">Central portal for investor information and documentation</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {keyMetrics.map((metric) => (
            <div key={metric.label} className="bg-slate-900/80 border border-cyan-500/30 rounded-xl p-5 text-center">
              <p className="text-3xl font-black text-cyan-400">{metric.value}</p>
              <p className="text-white font-semibold text-sm mt-1">{metric.label}</p>
              <p className="text-white/50 text-xs">{metric.sublabel}</p>
            </div>
          ))}
        </div>

        {/* Investment Opportunities */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5">Investment Opportunities</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {investorSections.map((section) => (
            <div key={section.title} className={`rounded-2xl p-6 ${section.highlight ? 'bg-gradient-to-br from-cyan-500/20 to-blue-500/10 border-2 border-cyan-400' : 'bg-slate-900/80 border border-white/10'}`}>
              <img src={section.icon} alt={section.title} className="w-16 h-16 rounded-xl mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">{section.title}</h3>
              <p className="text-white/60 text-sm mb-4">{section.description}</p>
              
              <div className="bg-black/30 rounded-lg p-3 mb-4">
                <p className="text-cyan-400 font-bold">{section.ask}</p>
                <p className="text-white/50 text-sm">{section.valuation}</p>
              </div>
              
              <div className="space-y-2">
                {section.links.map((link) => (
                  <Link key={link.name} href={link.href}>
                    <div className="flex items-center justify-between bg-white/5 hover:bg-white/10 rounded-lg px-4 py-2 cursor-pointer transition-colors">
                      <span className="text-white text-sm">{link.name}</span>
                      <span className="text-cyan-400">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Executive Team */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5">Executive Leadership</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
          {teamMembers.map((member) => (
            <div key={member.name} className="bg-slate-900/80 border border-white/10 rounded-xl p-4 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                <span className="text-2xl font-bold text-white">{member.name.split(' ').map(n => n[0]).join('')}</span>
              </div>
              <h3 className="text-white font-bold text-sm">{member.name}</h3>
              <p className="text-cyan-400 text-xs font-semibold">{member.title}</p>
              <p className="text-white/50 text-xs mt-1">{member.role}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-5">2025 Roadmap</h2>
        <div className="bg-slate-900/80 border border-white/10 rounded-xl p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-cyan-400 font-bold">Q1 2025</p>
              <p className="text-white font-semibold mt-2">Foundation Complete</p>
              <p className="text-white/50 text-sm">Legal done, website live, seed started</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-bold">Q2 2025</p>
              <p className="text-white font-semibold mt-2">Seed Round Closed</p>
              <p className="text-white/50 text-sm">$500K-$1M raised</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-bold">Q3 2025</p>
              <p className="text-white font-semibold mt-2">MVP Launched</p>
              <p className="text-white/50 text-sm">100 athletes, 10 brands, $10K MRR</p>
            </div>
            <div className="text-center">
              <p className="text-cyan-400 font-bold">Q4 2025</p>
              <p className="text-white font-semibold mt-2">Growth Phase</p>
              <p className="text-white/50 text-sm">500 athletes, 25 brands, $50K MRR</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-2xl p-8">
          <h2 className="text-3xl font-black text-white mb-2">Ready to Invest?</h2>
          <p className="text-white/70 mb-6">Join us in building the definitive financial ecosystem for the modern athlete</p>
          <div className="flex justify-center gap-4">
            <Link href="/vip">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-colors">
                Schedule Meeting
              </button>
            </Link>
            <Link href="/dhg">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl border border-white/20 transition-colors">
                View Corporate Structure
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10 mt-10">
        <p className="text-white/50 text-sm">CONFIDENTIAL - FOR INVESTOR USE ONLY</p>
        <p className="text-white/50 text-sm mt-1">© 2024 Dozier Holdings Group, LLC. All Rights Reserved.</p>
      </div>
    </div>
  );
}
