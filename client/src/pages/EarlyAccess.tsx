import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "wouter";

export default function EarlyAccess() {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Countdown to February 1, 2026
  useEffect(() => {
    const targetDate = new Date("2026-02-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, []);

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  const sports = ["Baseball", "Football", "Basketball"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement signup logic
    console.log({ email, phone, role: selectedRole, sports: selectedSports });
    alert("Thank you for signing up! We'll be in touch soon.");
  };

  const toggleSport = (sport: string) => {
    setSelectedSports(prev =>
      prev.includes(sport)
        ? prev.filter(s => s !== sport)
        : [...prev, sport]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* App Icons */}
      <div className="container pt-12 flex justify-center gap-4">
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl font-bold text-blue-600">M</span>
        </div>
        <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl">⚡</span>
        </div>
        <div className="w-20 h-20 bg-white rounded-2xl flex items-center justify-center shadow-xl">
          <span className="text-3xl font-bold text-slate-800">N</span>
        </div>
      </div>

      {/* Header */}
      <div className="container text-center py-8 space-y-2">
        <p className="text-cyan-400 text-sm font-medium tracking-wider uppercase">
          The Future of Athlete Success
        </p>
        <h1 className="text-6xl font-bold tracking-tight">ATHLYNX</h1>
        <p className="text-cyan-400 text-lg tracking-wide">THE ATHLETE'S PLAYBOOK</p>
      </div>

      {/* VIP Badge */}
      <div className="container flex justify-center mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-cyan-400 px-8 py-4 rounded-full shadow-2xl">
          <p className="text-white font-bold text-lg">
            🏆 VIP EARLY ACCESS<br />
            <span className="text-sm font-normal">6 MONTHS FREE</span>
          </p>
        </div>
      </div>

      {/* Countdown */}
      <div className="container text-center mb-8">
        <p className="text-cyan-400 text-sm font-medium mb-4 tracking-wider uppercase">
          Launching In
        </p>
        <div className="flex justify-center gap-4">
          {[
            { label: "DAYS", value: timeLeft.days },
            { label: "HRS", value: timeLeft.hours },
            { label: "MIN", value: timeLeft.minutes },
            { label: "SEC", value: timeLeft.seconds },
          ].map((item) => (
            <div
              key={item.label}
              className="bg-slate-800/50 backdrop-blur-sm rounded-lg p-4 min-w-[80px] border border-cyan-500/20"
            >
              <div className="text-4xl font-bold text-cyan-400">{item.value}</div>
              <div className="text-xs text-gray-400 mt-1">{item.label}</div>
            </div>
          ))}
        </div>
        <p className="text-gray-400 text-sm mt-4">FEBRUARY 1, 2026</p>
      </div>

      {/* Founding Member Spots */}
      <div className="container max-w-2xl mb-8">
        <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 rounded-2xl p-6 border border-red-500/30">
          <div className="text-center space-y-3">
            <p className="text-yellow-400 font-bold text-lg">
              🔥 FOUNDING MEMBER SPOTS
            </p>
            <p className="text-red-400 font-bold text-2xl">
              LIMITED TO 10,000
            </p>
            <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-400 h-full w-[25%] rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Form */}
      <div className="container max-w-2xl pb-20">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              <span className="inline-flex items-center gap-2">
                EMAIL ADDRESS *
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">1</span>
              </span>
            </label>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              required
              className="bg-slate-800/50 border-2 border-slate-700 focus:border-orange-500 text-white placeholder:text-gray-500 h-12"
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">
              <span className="inline-flex items-center gap-2">
                PHONE (OPTIONAL)
                <span className="bg-orange-500 text-white text-xs px-2 py-0.5 rounded">2</span>
              </span>
            </label>
            <Input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone (Optional)"
              className="bg-slate-800/50 border-2 border-slate-700 focus:border-orange-500 text-white placeholder:text-gray-500 h-12"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              <span className="inline-flex items-center gap-2">
                I AM
                <span className="bg-yellow-500 text-black text-xs px-2 py-0.5 rounded">3</span>
              </span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {roles.map((role, index) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setSelectedRole(role)}
                  className={`relative px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedRole === role
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
                  }`}
                >
                  <span className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs px-1.5 py-0.5 rounded">
                    {index + 4}
                  </span>
                  {role}
                </button>
              ))}
            </div>
          </div>

          {/* Sport Selection */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-300">
              SELECT SPORT(S)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {sports.map((sport) => (
                <button
                  key={sport}
                  type="button"
                  onClick={() => toggleSport(sport)}
                  className={`px-4 py-3 rounded-lg font-medium transition-all ${
                    selectedSports.includes(sport)
                      ? "bg-cyan-500 text-white"
                      : "bg-slate-800/50 text-gray-300 hover:bg-slate-700/50"
                  }`}
                >
                  {sport}
                </button>
              ))}
            </div>
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-bold text-lg h-14 shadow-xl shadow-cyan-500/30"
          >
            🏆 CLAIM MY VIP SPOT
          </Button>
        </form>

        {/* Preview Link */}
        <div className="text-center mt-8">
          <Link href="/home">
            <a className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2 transition-colors">
              Preview the App →
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
