interface ComingSoonProps {
  title: string;
  description: string;
  icon: string;
  launchDate?: string;
}

export default function ComingSoon({ title, description, icon, launchDate = "February 1, 2026" }: ComingSoonProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white flex items-center justify-center">
      <div className="container max-w-2xl text-center px-4">
        <div className="text-8xl mb-8">{icon}</div>
        <h1 className="text-5xl font-bold mb-6 text-cyan-400">{title}</h1>
        <p className="text-xl text-slate-300 mb-8">{description}</p>
        
        <div className="bg-slate-800/50 border border-cyan-500/30 rounded-2xl p-8 mb-8">
          <div className="text-sm text-slate-400 mb-2">LAUNCHING</div>
          <div className="text-3xl font-bold text-cyan-400">{launchDate}</div>
        </div>

        <div className="space-y-4">
          <p className="text-slate-400">Join the waitlist to get early access!</p>
          <a
            href="/"
            className="inline-block bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-8 rounded-full transition-colors"
          >
            Join VIP Waitlist
          </a>
        </div>
      </div>
    </div>
  );
}
