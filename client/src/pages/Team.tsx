import { Link } from "wouter";

const executives = [
  {
    name: "Chad A. Dozier",
    title: "Chief Executive Officer",
    responsibilities: "Vision, Strategy, Investor Relations",
    bio: "Founder and visionary leader driving the ATHLYNX platform from concept to market. Responsible for overall company direction, investor relationships, and strategic partnerships.",
    initials: "CD",
  },
  {
    name: "Glenn Tse",
    title: "CFO & COO",
    responsibilities: "Finance, Operations, Legal Coordination",
    bio: "Oversees all financial operations, legal entity formation, and day-to-day business operations. Manages accounting, compliance, and operational efficiency.",
    initials: "GT",
  },
  {
    name: "Andy Kustes",
    title: "VP of Technology",
    responsibilities: "Product Development, Engineering, Patents",
    bio: "Leads all technology initiatives including platform development, patent filings, and technical architecture. Responsible for the NIL Portal tech stack and innovation.",
    initials: "AK",
  },
  {
    name: "Lee Marshall",
    title: "VP of Sales & Partnerships",
    responsibilities: "Sales, Brand Partnerships, Trademarks",
    bio: "Drives revenue through brand partnerships and athlete onboarding. Manages trademark protection and builds the sales pipeline for NIL deals.",
    initials: "LM",
  },
  {
    name: "Jimmy Boyd",
    title: "VP of Real Estate",
    responsibilities: "Real Estate, Strategic Partnerships",
    bio: "Manages Softmor datacenter real estate strategy and site selection. Develops strategic partnerships for infrastructure expansion.",
    initials: "JB",
  },
];

const advisors = [
  {
    name: "David Ford Sr.",
    title: "Strategic Advisor",
    expertise: "Business Development & Operations",
    initials: "DF",
  },
  {
    name: "Lee Crisp",
    title: "Industry Advisor",
    expertise: "Sports Industry & NIL Compliance",
    initials: "LC",
  },
];

const boardStructure = [
  { seat: "Seat 1", holder: "Chad A. Dozier", role: "Founder/CEO - Chairman" },
  { seat: "Seat 2", holder: "Glenn Tse", role: "CFO/COO - Board Member" },
  { seat: "Seat 3", holder: "TBD", role: "Independent Director (Industry Expert)" },
  { seat: "Seat 4", holder: "TBD", role: "Investor Representative - Post Series A" },
  { seat: "Seat 5", holder: "TBD", role: "Independent Director (Finance/Governance)" },
];

export default function Team() {
  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #0a1628 0%, #0d1f3c 50%, #061424 100%)' }}>
      {/* Header */}
      <div className="text-center py-12 border-b border-cyan-500/20">
        <Link href="/dhg">
          <div className="inline-flex items-center gap-2 bg-slate-900/80 border border-cyan-500/30 rounded-full px-4 py-2 mb-6 cursor-pointer hover:bg-slate-800/80 transition-colors">
            <span className="text-white/60 text-sm">← Back to DHG</span>
          </div>
        </Link>
        <div className="flex items-center justify-center gap-4 mb-4">
          <img src="/images/dhg-crab-shield-new.jpeg" alt="DHG" className="w-20 h-20 rounded-full border-4 border-cyan-400/50" />
        </div>
        <h1 className="text-5xl font-black text-white mb-2">LEADERSHIP TEAM</h1>
        <p className="text-cyan-400 text-xl font-bold uppercase tracking-wider">Dozier Holdings Group</p>
      </div>

      <div className="max-w-6xl mx-auto px-5 py-10">
        {/* Executive Team */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Executive Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {executives.map((exec) => (
            <div key={exec.name} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/50 transition-colors">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl font-bold text-white">{exec.initials}</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{exec.name}</h3>
                  <p className="text-cyan-400 font-semibold text-sm">{exec.title}</p>
                </div>
              </div>
              <div className="bg-black/30 rounded-lg px-3 py-2 mb-4">
                <p className="text-white/70 text-sm">{exec.responsibilities}</p>
              </div>
              <p className="text-white/50 text-sm leading-relaxed">{exec.bio}</p>
            </div>
          ))}
        </div>

        {/* Advisors */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Advisory Board</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {advisors.map((advisor) => (
            <div key={advisor.name} className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center">
                  <span className="text-xl font-bold text-white">{advisor.initials}</span>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">{advisor.name}</h3>
                  <p className="text-amber-400 font-semibold text-sm">{advisor.title}</p>
                  <p className="text-white/50 text-sm">{advisor.expertise}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Board of Directors */}
        <h2 className="text-sm font-semibold text-cyan-400 uppercase tracking-wider mb-6">Board of Directors (Planned)</h2>
        <div className="bg-slate-900/80 border border-white/10 rounded-2xl overflow-hidden mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left text-cyan-400 font-semibold text-sm py-4 px-6">Seat</th>
                <th className="text-left text-cyan-400 font-semibold text-sm py-4 px-6">Holder</th>
                <th className="text-left text-cyan-400 font-semibold text-sm py-4 px-6">Role</th>
              </tr>
            </thead>
            <tbody>
              {boardStructure.map((seat) => (
                <tr key={seat.seat} className="border-b border-white/5">
                  <td className="text-white font-semibold py-4 px-6">{seat.seat}</td>
                  <td className="text-white py-4 px-6">{seat.holder}</td>
                  <td className="text-white/60 py-4 px-6">{seat.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact */}
        <div className="text-center bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/50 rounded-2xl p-8">
          <h2 className="text-2xl font-black text-white mb-2">Connect With Our Team</h2>
          <p className="text-white/70 mb-6">Interested in joining or partnering with Dozier Holdings Group?</p>
          <div className="flex justify-center gap-4">
            <Link href="/careers">
              <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-8 py-3 rounded-xl transition-colors">
                View Careers
              </button>
            </Link>
            <Link href="/investor-hub">
              <button className="bg-white/10 hover:bg-white/20 text-white font-bold px-8 py-3 rounded-xl border border-white/20 transition-colors">
                Investor Hub
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-8 border-t border-white/10 mt-10">
        <p className="text-white/50 text-sm">© 2024 Dozier Holdings Group, LLC. All Rights Reserved.</p>
      </div>
    </div>
  );
}
