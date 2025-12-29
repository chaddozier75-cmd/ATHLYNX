import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { trpc } from "../lib/trpc";

export default function EarlyAccess() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("");
  const [sport, setSport] = useState("");
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const signupMutation = trpc.vip.signup.useMutation({
    onSuccess: (data) => {
      // Redirect to success page with access code
      setLocation(`/success?code=${data.accessCode}`);
    },
    onError: (error) => {
      alert(`Error: ${error.message}`);
    },
  });

  // Countdown timer to February 1, 2026
  useEffect(() => {
    const targetDate = new Date("2026-02-01T00:00:00").getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!role) {
      alert("Please select your role");
      return;
    }
    if (!sport) {
      alert("Please select your sport");
      return;
    }

    signupMutation.mutate({
      email,
      phone: phone || undefined,
      role,
      sport,
    });
  };

  const roles = ["Athlete", "Parent", "Coach", "Brand"];
  
  // Quick navigation links
  const quickLinks = [
    { icon: "✝️", label: "Faith", path: "/faith" },
    { icon: "🔄", label: "Transfer Portal", path: "/transfer-portal-intelligence" },
    { icon: "💰", label: "NIL Portal", path: "/nil-portal" },
    { icon: "🦀", label: "Our Story", path: "/founder-story" },
  ];
  const sports = ["Baseball", "Football", "Basketball", "Soccer", "Track & Field", "Volleyball"];

  return (
    <div className="min-h-screen relative text-white overflow-x-hidden">
      {/* Diagonal Gradient Background - Matching IMG_5934 */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 via-black to-cyan-500" 
           style={{
             background: 'linear-gradient(135deg, #d4af37 0%, #c9a227 15%, #1a1a1a 35%, #000000 50%, #1a1a1a 65%, #0d4d4d 85%, #00CED1 100%)'
           }}>
      </div>

      {/* Diagonal wave overlay for more depth */}
      <div className="absolute inset-0 opacity-30"
           style={{
             background: 'radial-gradient(ellipse at top left, rgba(212, 175, 55, 0.3) 0%, transparent 50%), radial-gradient(ellipse at bottom right, rgba(0, 206, 209, 0.3) 0%, transparent 50%)'
           }}>
      </div>
      
      <div className="relative w-full max-w-[640px] mx-auto px-4 py-8 space-y-8">
        
        {/* Party Popper at Top */}
        <div className="flex justify-center animate-bounce">
          <div className="text-8xl drop-shadow-2xl">🎉</div>
        </div>

        {/* Parent Company Badge */}
        <div className="flex justify-center">
          <div className="inline-flex items-center gap-3 bg-black/60 backdrop-blur-md border-2 border-yellow-500 rounded-full px-6 py-3 shadow-2xl">
            <img src="/dhg-crab-shield.jpeg" alt="DHG" className="w-8 h-8 rounded-full" />
            <div className="text-left">
              <p className="text-gray-300 text-xs uppercase tracking-wide">PARENT COMPANY</p>
              <p className="text-yellow-400 font-bold text-sm">Dozier Holdings Group</p>
            </div>
          </div>
        </div>

        {/* Single "n" Logo Icon */}
        <div className="flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-60 animate-pulse"></div>
            <img 
              src="/nil-portal-n-white.jpeg" 
              alt="NIL Portal" 
              className="relative w-32 h-32 rounded-3xl shadow-2xl"
            />
          </div>
        </div>

        {/* THE FUTURE OF ATHLETE SUCCESS */}
        <div className="text-center">
          <p className="text-cyan-400 text-sm md:text-base uppercase tracking-[0.3em] font-bold drop-shadow-lg">
            THE FUTURE OF ATHLETE SUCCESS
          </p>
        </div>

        {/* ATHLYNX Branding */}
        <div className="text-center space-y-3">
          <h1 className="text-7xl md:text-8xl font-black tracking-tight text-white drop-shadow-2xl">
            ATHLYNX
          </h1>
          <p className="text-yellow-400 text-2xl md:text-3xl font-black uppercase tracking-[0.2em] drop-shadow-lg">
            THE ATHLETE'S PLAYBOOK
          </p>
        </div>

        {/* VIP Early Access Badge */}
        <div className="flex justify-center">
          <div className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 rounded-full px-10 py-5 shadow-2xl transform hover:scale-105 transition-transform">
            <p className="text-black font-black text-center">
              <span className="text-xl">🏆 VIP EARLY ACCESS</span><br/>
              <span className="text-3xl">6 MONTHS FREE</span>
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="space-y-4">
          <p className="text-center text-gray-300 text-sm uppercase tracking-widest font-bold">LAUNCHING IN</p>
          <div className="flex justify-center gap-2">
            {[
              { value: timeLeft.days, label: "DAYS" },
              { value: timeLeft.hours, label: "HRS" },
              { value: timeLeft.minutes, label: "MIN" },
              { value: timeLeft.seconds, label: "SEC" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="bg-black/70 backdrop-blur-sm border-2 border-yellow-500 rounded-2xl px-4 py-4 min-w-[75px] text-center shadow-xl"
              >
                <div className="text-yellow-400 text-4xl font-black drop-shadow-lg">{String(value).padStart(2, "0")}</div>
                <div className="text-gray-400 text-xs mt-1 font-bold tracking-wider">{label}</div>
              </div>
            ))}
          </div>
          <p className="text-center text-cyan-400 text-lg font-black tracking-wider drop-shadow-lg">FEBRUARY 1, 2026</p>
        </div>

        {/* Founding Member Section */}
        <div className="bg-gradient-to-r from-red-900/80 to-orange-900/80 backdrop-blur-md border-2 border-orange-500 rounded-3xl p-6 space-y-4 shadow-2xl">
          <p className="text-white font-black text-center text-xl">🔥 FOUNDING MEMBER SPOTS</p>
          <p className="text-orange-400 font-black text-3xl text-center drop-shadow-lg">LIMITED TO 10,000</p>
          <div className="w-full bg-black/60 rounded-full h-4 overflow-hidden border border-orange-500">
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 h-full w-[35%] animate-pulse shadow-lg"></div>
          </div>
        </div>

        {/* ONE APP. EVERYTHING BUILT IN. Section */}
        <div className="bg-black/80 backdrop-blur-xl border-2 border-cyan-400 rounded-3xl p-8 space-y-6 shadow-2xl">
          <p className="text-center text-cyan-400 text-base uppercase tracking-[0.3em] font-black">
            ONE APP. EVERYTHING BUILT IN.
          </p>
          
          {/* 3 App Logos */}
          <div className="flex justify-center gap-5">
            <div className="relative group">
              <div className="absolute inset-0 bg-cyan-400 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <img 
                src="/dhg-crab-shield.jpeg" 
                alt="DHG Crab" 
                className="relative w-24 h-24 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform bg-white/10 p-2"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-white blur-2xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
              <img 
                src="/nil-portal-n-white.jpeg" 
                alt="NIL Portal" 
                className="relative w-24 h-24 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
              />
            </div>
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500 blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <img 
                src="/messenger-n-blue.jpeg" 
                alt="Messenger" 
                className="relative w-24 h-24 rounded-2xl shadow-2xl transform group-hover:scale-110 transition-transform"
              />
            </div>
          </div>

          {/* ATHLYNX with new logo */}
          <div className="text-center space-y-3">
            <div className="flex justify-center">
              <img 
                src="/athlynx-logo-icon.png" 
                alt="ATHLYNX Logo" 
                className="w-32 h-32 object-contain drop-shadow-2xl"
              />
            </div>
            <p className="text-cyan-400 text-xl font-bold">The Athlete's Playbook</p>
          </div>

          {/* Feature Buttons */}
          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: "📱", label: "Social Feed" },
              { icon: "💬", label: "Messaging" },
              { icon: "💰", label: "NIL Deals" },
              { icon: "📊", label: "Analytics" },
              { icon: "💪", label: "Training" },
              { icon: "🏆", label: "My Sports" },
            ].map((feature) => (
              <button
                key={feature.label}
                className="bg-gradient-to-br from-cyan-600/40 to-blue-600/40 backdrop-blur-sm border-2 border-cyan-400/60 hover:border-cyan-400 rounded-xl p-4 text-center transition-all hover:scale-105 group shadow-lg"
              >
                <div className="text-4xl mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">{feature.icon}</div>
                <p className="text-white font-bold text-sm">{feature.label}</p>
              </button>
            ))}
          </div>

          {/* Platform Badges */}
          <div className="flex justify-center gap-4 pt-4">
            <div className="flex items-center gap-2 bg-black/70 border-2 border-cyan-400 rounded-xl px-5 py-2 shadow-lg">
              <span className="text-2xl">🍎</span>
              <span className="text-cyan-300 text-sm font-bold">iOS</span>
            </div>
            <div className="flex items-center gap-2 bg-black/70 border-2 border-cyan-400 rounded-xl px-5 py-2 shadow-lg">
              <span className="text-2xl">🤖</span>
              <span className="text-cyan-300 text-sm font-bold">Android</span>
            </div>
          </div>
        </div>

        {/* Signup Form */}
        <div className="bg-black/80 backdrop-blur-xl border-2 border-yellow-500 rounded-3xl p-8 space-y-5 shadow-2xl">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                EMAIL ADDRESS <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                disabled={signupMutation.isPending}
                className="w-full bg-black/70 border-2 border-gray-600 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition disabled:opacity-50"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                PHONE (OPTIONAL)
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone (Optional)"
                disabled={signupMutation.isPending}
                className="w-full bg-black/70 border-2 border-gray-600 rounded-xl px-5 py-4 text-white placeholder-gray-500 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 outline-none transition disabled:opacity-50"
              />
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                I AM A
              </label>
              <div className="flex flex-wrap gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    disabled={signupMutation.isPending}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 ${
                      role === r
                        ? "bg-cyan-400 border-2 border-cyan-400 text-black shadow-lg scale-105"
                        : "bg-black/70 border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            {/* Sport Selection */}
            <div>
              <label className="block text-gray-300 text-xs uppercase tracking-widest mb-2 font-bold">
                MY SPORT
              </label>
              <div className="flex flex-wrap gap-2">
                {sports.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSport(s)}
                    disabled={signupMutation.isPending}
                    className={`px-5 py-3 rounded-xl text-sm font-bold transition-all disabled:opacity-50 ${
                      sport === s
                        ? "bg-cyan-400 border-2 border-cyan-400 text-black shadow-lg scale-105"
                        : "bg-black/70 border-2 border-gray-600 text-gray-300 hover:border-cyan-400 hover:text-cyan-400"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={signupMutation.isPending}
              className="w-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-500 text-black font-black text-xl uppercase tracking-wider py-5 rounded-xl shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 transition-all transform disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {signupMutation.isPending ? "PROCESSING..." : "🏆 CLAIM MY VIP SPOT"}
            </button>
          </form>
        </div>

        {/* Quick Navigation Links */}
        <div className="grid grid-cols-2 gap-3">
          {quickLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => setLocation(link.path)}
              className="bg-gradient-to-br from-amber-600/40 to-orange-600/40 backdrop-blur-sm border-2 border-amber-400/60 hover:border-amber-400 rounded-xl p-4 text-center transition-all hover:scale-105 group shadow-lg"
            >
              <div className="text-3xl mb-2 group-hover:scale-110 transition-transform drop-shadow-lg">{link.icon}</div>
              <p className="text-white font-bold text-sm">{link.label}</p>
            </button>
          ))}
        </div>

        {/* Feature Checkmarks */}
        <div className="flex flex-wrap justify-center gap-4 text-sm">
          {[
            "✅ Social Network",
            "✅ NIL Deals",
            "✅ Messaging",
            "✅ Analytics",
            "✅ Compliance"
          ].map((feature) => (
            <div key={feature} className="text-white font-bold bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-400/50 shadow-lg">
              {feature}
            </div>
          ))}
        </div>

        {/* Bottom Spacing */}
        <div className="h-8"></div>
      </div>
    </div>
  );
}
