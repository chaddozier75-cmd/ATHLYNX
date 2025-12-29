import { useState } from "react";
import { Link } from "wouter";
import { toast } from "sonner";

export default function DiamondGrind() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateProfile, setShowCreateProfile] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPosition, setFilterPosition] = useState("all");
  const [filterClass, setFilterClass] = useState("all");
  const [filterState, setFilterState] = useState("all");

  const tabs = [
    { id: "overview", name: "Overview", icon: "🏠" },
    { id: "players", name: "Players", icon: "⚾" },
    { id: "rankings", name: "Rankings", icon: "📊" },
    { id: "tournaments", name: "Tournaments", icon: "🏆" },
    { id: "training", name: "Training", icon: "💪" },
    { id: "recruiting", name: "Recruiting", icon: "🎓" },
  ];

  const positions = ["RHP", "LHP", "C", "1B", "2B", "3B", "SS", "OF", "DH", "UTIL"];
  const states = ["AL", "AZ", "CA", "CO", "FL", "GA", "IL", "LA", "NC", "NY", "OH", "PA", "TX"];
  const classes = [2025, 2026, 2027, 2028, 2029];

  const topPlayers = [
    { rank: 1, name: "Marcus Johnson", position: "RHP", gradYear: 2026, state: "TX", commitment: "Texas", rating: 98, velocity: "97 mph", era: "1.23", so: 145, height: "6'4\"", weight: 205, bat: "R", throw: "R" },
    { rank: 2, name: "Jake Williams", position: "SS", gradYear: 2026, state: "CA", commitment: "UCLA", rating: 97, velocity: "—", avg: ".412", hr: 18, rbi: 67, height: "6'1\"", weight: 185, bat: "R", throw: "R" },
    { rank: 3, name: "Tyler Smith", position: "OF", gradYear: 2026, state: "FL", commitment: "Florida", rating: 96, velocity: "—", avg: ".398", hr: 22, rbi: 78, height: "6'2\"", weight: 195, bat: "L", throw: "L" },
    { rank: 4, name: "Chris Davis", position: "C", gradYear: 2026, state: "GA", commitment: "Georgia", rating: 95, velocity: "—", avg: ".367", hr: 15, rbi: 56, height: "6'0\"", weight: 210, bat: "R", throw: "R" },
    { rank: 5, name: "Ryan Martinez", position: "RHP", gradYear: 2027, state: "AZ", commitment: "Uncommitted", rating: 95, velocity: "94 mph", era: "1.56", so: 112, height: "6'3\"", weight: 190, bat: "R", throw: "R" },
    { rank: 6, name: "Brandon Lee", position: "1B", gradYear: 2026, state: "CA", commitment: "Stanford", rating: 94, velocity: "—", avg: ".389", hr: 24, rbi: 82, height: "6'3\"", weight: 220, bat: "L", throw: "R" },
    { rank: 7, name: "Derek Thompson", position: "OF", gradYear: 2027, state: "TX", commitment: "Uncommitted", rating: 94, velocity: "—", avg: ".376", hr: 16, rbi: 58, height: "5'11\"", weight: 175, bat: "S", throw: "R" },
    { rank: 8, name: "Austin Brown", position: "LHP", gradYear: 2026, state: "FL", commitment: "Miami", rating: 93, velocity: "92 mph", era: "1.89", so: 98, height: "6'2\"", weight: 185, bat: "L", throw: "L" },
    { rank: 9, name: "Kyle Anderson", position: "SS", gradYear: 2027, state: "GA", commitment: "Uncommitted", rating: 93, velocity: "—", avg: ".356", hr: 12, rbi: 48, height: "6'0\"", weight: 180, bat: "R", throw: "R" },
    { rank: 10, name: "Josh Wilson", position: "3B", gradYear: 2026, state: "NC", commitment: "NC State", rating: 92, velocity: "—", avg: ".345", hr: 19, rbi: 65, height: "6'1\"", weight: 200, bat: "R", throw: "R" },
  ];

  const tournaments = [
    { name: "Diamond Grind World Series", dates: "July 15-22, 2026", location: "Jupiter, FL", teams: 64, prize: "$50,000", status: "Registration Open", spotsLeft: 12 },
    { name: "Elite Showcase Championship", dates: "June 1-5, 2026", location: "Phoenix, AZ", teams: 32, prize: "$25,000", status: "Registration Open", spotsLeft: 8 },
    { name: "National Invitational", dates: "May 20-25, 2026", location: "Dallas, TX", teams: 48, prize: "$30,000", status: "Coming Soon", spotsLeft: 48 },
    { name: "Prospect Combine", dates: "April 10-12, 2026", location: "Atlanta, GA", teams: 200, prize: "Exposure", status: "Registration Open", spotsLeft: 45 },
    { name: "Perfect Game Showcase", dates: "March 15-18, 2026", location: "Fort Myers, FL", teams: 100, prize: "$15,000", status: "Registration Open", spotsLeft: 23 },
    { name: "Under Armour All-America", dates: "August 5-8, 2026", location: "Chicago, IL", teams: 40, prize: "Invite Only", status: "By Invitation", spotsLeft: 0 },
  ];

  const trainingPrograms = [
    { name: "Velocity Program", duration: "12 weeks", focus: "Pitching", level: "Advanced", price: "Elite", description: "Add 5-10 mph to your fastball with our proven velocity program" },
    { name: "Hitting Mechanics", duration: "8 weeks", focus: "Batting", level: "All Levels", price: "Pro", description: "Perfect your swing mechanics with video analysis and drills" },
    { name: "Defensive Excellence", duration: "6 weeks", focus: "Fielding", level: "Intermediate", price: "Pro", description: "Master your position with pro-level defensive training" },
    { name: "Speed & Agility", duration: "8 weeks", focus: "Athletic", level: "All Levels", price: "Free", description: "Improve your 60-yard dash and overall athleticism" },
    { name: "Catcher's Academy", duration: "10 weeks", focus: "Catching", level: "Advanced", price: "Elite", description: "Complete catcher development: framing, blocking, throwing" },
    { name: "Mental Game", duration: "6 weeks", focus: "Psychology", level: "All Levels", price: "Pro", description: "Develop mental toughness and game-day confidence" },
  ];

  const stats = [
    { label: "Players", value: "125,000+", icon: "⚾", change: "+2,500 this month" },
    { label: "Scouts", value: "2,500+", icon: "👀", change: "+150 this month" },
    { label: "Commitments", value: "8,500+", icon: "🎓", change: "+340 this year" },
    { label: "Tournaments", value: "500+", icon: "🏆", change: "12 this week" },
  ];

  const filteredPlayers = topPlayers.filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPosition = filterPosition === "all" || player.position === filterPosition;
    const matchesClass = filterClass === "all" || player.gradYear === parseInt(filterClass);
    const matchesState = filterState === "all" || player.state === filterState;
    return matchesSearch && matchesPosition && matchesClass && matchesState;
  });

  const handleCreateProfile = () => {
    toast.success("Profile creation coming soon! Sign up for early access.");
    setShowCreateProfile(false);
  };

  const handleRegisterTournament = (name: string) => {
    toast.success(`Registration for ${name} started! Complete your profile to continue.`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1628] via-[#0d2847] to-[#0a1628]">
      {/* Create Profile Modal */}
      {showCreateProfile && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80" onClick={() => setShowCreateProfile(false)} />
          <div className="relative bg-[#0d2847] border border-blue-500/30 rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <button onClick={() => setShowCreateProfile(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl">×</button>
            
            <div className="text-center mb-6">
              <span className="text-5xl block mb-2">💎</span>
              <h2 className="text-2xl font-bold text-white">Create Your Player Profile</h2>
              <p className="text-gray-400">Get discovered by 2,500+ college scouts</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <input type="text" placeholder="First Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <input type="text" placeholder="Last Name" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <input type="email" placeholder="Email" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <input type="tel" placeholder="Phone" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500">
                <option value="">Primary Position</option>
                {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500">
                <option value="">Graduation Year</option>
                {classes.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
              <input type="text" placeholder="High School" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500">
                <option value="">State</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
              <input type="text" placeholder="Height (e.g., 6'2&quot;)" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <input type="text" placeholder="Weight (lbs)" className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500" />
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500">
                <option value="">Bats</option>
                <option value="R">Right</option>
                <option value="L">Left</option>
                <option value="S">Switch</option>
              </select>
              <select className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500">
                <option value="">Throws</option>
                <option value="R">Right</option>
                <option value="L">Left</option>
              </select>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Stats (Optional)</h3>
              <div className="grid grid-cols-3 gap-4">
                <input type="text" placeholder="Batting Avg" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="Home Runs" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="RBI" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="ERA (pitchers)" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="Velocity (mph)" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500" />
                <input type="text" placeholder="60 Yard Dash" className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 text-sm focus:outline-none focus:border-blue-500" />
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-white font-semibold mb-3">Video Highlights</h3>
              <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                <span className="text-4xl block mb-2">🎥</span>
                <p className="text-gray-400 mb-2">Drag & drop videos or click to upload</p>
                <p className="text-gray-500 text-sm">MP4, MOV up to 500MB</p>
                <button className="mt-4 px-6 py-2 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-semibold hover:bg-blue-500/30">
                  Upload Videos
                </button>
              </div>
            </div>

            <button
              onClick={handleCreateProfile}
              className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-bold rounded-xl hover:opacity-90 transition-all"
            >
              Create Profile
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-xl border-b border-blue-500/20">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center">
              <span className="text-white text-xl">💎</span>
            </div>
            <div>
              <h1 className="text-xl font-black text-white">DIAMOND GRIND</h1>
              <p className="text-[10px] text-blue-400 -mt-1">POWERED BY ATHLYNX</p>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-sm transition-all ${
                  activeTab === tab.id
                    ? "bg-blue-500 text-white font-semibold"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowCreateProfile(true)}
              className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg text-sm hover:bg-blue-400 transition-all"
            >
              Create Profile
            </button>
            <Link href="/" className="text-gray-400 hover:text-white text-sm">
              ← ATHLYNX
            </Link>
          </div>
        </div>
      </header>

      <div className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Hero */}
          <div className="text-center mb-10 pt-6">
            <div className="inline-block mb-4">
              <div className="w-24 h-24 mx-auto rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-lg shadow-blue-500/30">
                <span className="text-5xl">💎</span>
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-black mb-2">
              <span className="text-blue-400">DIAMOND</span> <span className="text-white">GRIND</span>
            </h1>
            <p className="text-blue-400 text-lg tracking-widest mb-4">ELITE BASEBALL PLATFORM</p>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-6">
              The #1 baseball platform for rankings, recruiting, tournaments, and AI-powered training
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setShowCreateProfile(true)}
                className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all"
              >
                Create Free Profile
              </button>
              <button
                onClick={() => setActiveTab("players")}
                className="px-8 py-3 bg-white/10 text-white font-bold rounded-xl hover:bg-white/20 transition-all"
              >
                Browse Players
              </button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {stats.map((stat, i) => (
              <div key={i} className="bg-blue-500/10 backdrop-blur-sm rounded-xl border border-blue-500/20 p-4 text-center">
                <span className="text-3xl block mb-2">{stat.icon}</span>
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-blue-400 text-sm">{stat.label}</p>
                <p className="text-green-400 text-xs mt-1">{stat.change}</p>
              </div>
            ))}
          </div>

          {/* Search & Filters */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-4 mb-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px]">
                <input
                  type="text"
                  placeholder="Search players..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-blue-500"
                />
              </div>
              <select
                value={filterPosition}
                onChange={(e) => setFilterPosition(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Positions</option>
                {positions.map(pos => <option key={pos} value={pos}>{pos}</option>)}
              </select>
              <select
                value={filterClass}
                onChange={(e) => setFilterClass(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All Classes</option>
                {classes.map(year => <option key={year} value={year}>{year}</option>)}
              </select>
              <select
                value={filterState}
                onChange={(e) => setFilterState(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:border-blue-500"
              >
                <option value="all">All States</option>
                {states.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
          </div>

          {/* AI Bot Banner */}
          <div className="bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl border border-blue-500/30 p-6 mb-10">
            <div className="flex items-center gap-6 flex-wrap">
              <span className="text-5xl">🤖</span>
              <div className="flex-1 min-w-[200px]">
                <h3 className="text-xl font-bold text-white mb-1">Your Personal AI Baseball Coach</h3>
                <p className="text-gray-400">Get custom training plans, video analysis, recruiting emails, and real-time coaching insights</p>
              </div>
              <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all">
                Activate AI Coach
              </button>
            </div>
          </div>

          {/* Top Rankings */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Top <span className="text-blue-400">Rankings</span>
              </h2>
              <span className="text-gray-400 text-sm">{filteredPlayers.length} players found</span>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Rank</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Player</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Position</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Class</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">State</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Size</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">B/T</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Commitment</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Rating</th>
                    <th className="text-left p-4 text-gray-400 text-sm font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPlayers.map((player) => (
                    <tr key={player.rank} className="border-b border-white/5 hover:bg-white/5 transition-all">
                      <td className="p-4">
                        <span className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          player.rank === 1 ? 'bg-yellow-500 text-black' :
                          player.rank === 2 ? 'bg-gray-400 text-black' :
                          player.rank === 3 ? 'bg-orange-600 text-white' :
                          'bg-white/10 text-white'
                        }`}>
                          {player.rank}
                        </span>
                      </td>
                      <td className="p-4">
                        <p className="text-white font-semibold">{player.name}</p>
                        {player.velocity !== "—" && (
                          <p className="text-blue-400 text-xs">{player.velocity}</p>
                        )}
                      </td>
                      <td className="p-4">
                        <span className="px-2 py-1 bg-blue-500/20 text-blue-400 rounded text-xs font-semibold">
                          {player.position}
                        </span>
                      </td>
                      <td className="p-4 text-gray-400">{player.gradYear}</td>
                      <td className="p-4 text-gray-400">{player.state}</td>
                      <td className="p-4 text-gray-400 text-sm">{player.height} / {player.weight}</td>
                      <td className="p-4 text-gray-400 text-sm">{player.bat}/{player.throw}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          player.commitment === "Uncommitted" 
                            ? "bg-gray-500/20 text-gray-400" 
                            : "bg-green-500/20 text-green-400"
                        }`}>
                          {player.commitment}
                        </span>
                      </td>
                      <td className="p-4">
                        <span className="text-blue-400 font-bold text-lg">{player.rating}</span>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <button className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30">
                            View
                          </button>
                          <button className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded text-xs hover:bg-yellow-500/30">
                            Save
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Tournaments */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white">
                Upcoming <span className="text-blue-400">Tournaments</span>
              </h2>
              <button className="text-blue-400 text-sm hover:underline">View All Events →</button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tournaments.map((tournament, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-blue-500/50 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-white">{tournament.name}</h3>
                      <p className="text-gray-500 text-sm">{tournament.location}</p>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                      tournament.status === "Registration Open" 
                        ? "bg-green-500/20 text-green-400" 
                        : tournament.status === "By Invitation"
                        ? "bg-purple-500/20 text-purple-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}>
                      {tournament.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
                    <span>📅 {tournament.dates}</span>
                    <span>👥 {tournament.teams} teams</span>
                    <span>💰 {tournament.prize}</span>
                  </div>
                  {tournament.spotsLeft > 0 && tournament.status === "Registration Open" && (
                    <p className="text-orange-400 text-sm mb-3">🔥 Only {tournament.spotsLeft} spots left!</p>
                  )}
                  <button
                    onClick={() => handleRegisterTournament(tournament.name)}
                    disabled={tournament.status === "By Invitation"}
                    className={`w-full py-2 font-semibold rounded-lg transition-all text-sm ${
                      tournament.status === "By Invitation"
                        ? "bg-gray-500/20 text-gray-500 cursor-not-allowed"
                        : "bg-blue-500 text-white hover:bg-blue-400"
                    }`}
                  >
                    {tournament.status === "By Invitation" ? "Invite Only" : "Register Now"}
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Training Programs */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-6">
              Training <span className="text-blue-400">Programs</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {trainingPrograms.map((program, i) => (
                <div
                  key={i}
                  className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 hover:border-blue-500/50 transition-all"
                >
                  <span className={`px-2 py-1 text-xs font-semibold rounded ${
                    program.price === "Free" ? "bg-green-500/20 text-green-400" :
                    program.price === "Pro" ? "bg-blue-500/20 text-blue-400" :
                    "bg-yellow-500/20 text-yellow-400"
                  }`}>
                    {program.price}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3 mb-1">{program.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{program.focus} • {program.level}</p>
                  <p className="text-gray-400 text-sm mb-3">{program.description}</p>
                  <p className="text-blue-400 text-sm mb-4">⏱️ {program.duration}</p>
                  <button className="w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all text-sm">
                    Start Program
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-4 mb-10">
            {[
              { icon: "📊", title: "Live Stats", desc: "Real-time pitch-by-pitch tracking" },
              { icon: "🎥", title: "Video Analysis", desc: "AI-powered swing & pitching analysis" },
              { icon: "🎓", title: "Recruiting", desc: "Connect with 2,500+ college scouts" },
              { icon: "💰", title: "NIL Deals", desc: "Baseball-specific brand partnerships" },
              { icon: "🤖", title: "AI Coach", desc: "Personal AI training assistant" },
              { icon: "📱", title: "Mobile App", desc: "iOS & Android apps coming soon" },
            ].map((feature, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 p-5 text-center hover:border-blue-500/30 transition-all">
                <span className="text-4xl block mb-3">{feature.icon}</span>
                <h3 className="text-white font-bold mb-1">{feature.title}</h3>
                <p className="text-gray-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Ready to Grind? 💎</h3>
            <p className="text-white/80 mb-6">Join 125,000+ baseball players on Diamond Grind</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button
                onClick={() => setShowCreateProfile(true)}
                className="px-8 py-3 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 transition-all"
              >
                Create Free Profile
              </button>
              <Link href="/pricing" className="px-8 py-3 bg-blue-500 text-white font-bold rounded-xl hover:bg-blue-400 transition-all">
                View Pricing
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#0a1628] border-t border-blue-500/10 py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">© 2025 Diamond Grind. A Dozier Holdings Group Company.</p>
          <p className="text-blue-400 text-xs mt-1">Powered by ATHLYNX</p>
        </div>
      </footer>
    </div>
  );
}
