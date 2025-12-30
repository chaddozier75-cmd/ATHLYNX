import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Shield, 
  Target, 
  Flame, 
  Eye, 
  Lock, 
  Zap,
  Trophy,
  TrendingUp,
  Sword,
  Crown,
  Heart,
  Star,
  ArrowRight,
  Play,
  BookOpen,
  Lightbulb,
  Users,
  Brain
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedFooter from "@/components/UnifiedFooter";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";

export default function WarriorsPlaybook() {
  const { user, loading } = useAuth();
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const rulesOfPower = [
    {
      number: 1,
      rule: "Don't tell people your plans",
      consequence: "They will sabotage you.",
      icon: Lock,
      color: "from-red-500 to-orange-500"
    },
    {
      number: 2,
      rule: "Don't tell people your weakness",
      consequence: "They will use them against you.",
      icon: Shield,
      color: "from-orange-500 to-yellow-500"
    },
    {
      number: 3,
      rule: "Don't tell people your failures",
      consequence: "They will always see you as a failure and never give you an opportunity.",
      icon: Eye,
      color: "from-yellow-500 to-green-500"
    },
    {
      number: 4,
      rule: "Take action and shock them with your results",
      consequence: "Move in silence. Let success make the noise.",
      icon: Zap,
      color: "from-green-500 to-cyan-500"
    },
    {
      number: 5,
      rule: "Don't tell people your secrets",
      consequence: "Only a fool reveals their secrets.",
      icon: Lock,
      color: "from-cyan-500 to-blue-500"
    },
    {
      number: 6,
      rule: "Don't tell people your income",
      consequence: "Always make them wonder.",
      icon: TrendingUp,
      color: "from-blue-500 to-purple-500"
    }
  ];

  const warriorPrinciples = [
    {
      title: "The Warrior's Code",
      description: "A warrior doesn't give up what he wants most for what he wants now. Discipline over desire. Purpose over pleasure.",
      icon: Sword
    },
    {
      title: "Alpha Mindset",
      description: "Lead yourself first. The world follows those who have mastered their own mind, body, and spirit.",
      icon: Crown
    },
    {
      title: "Relentless Pursuit",
      description: "Champions aren't made in the spotlight. They're forged in the darkness when no one is watching.",
      icon: Flame
    },
    {
      title: "Strategic Patience",
      description: "The wise warrior strikes when the time is right. Patience is not passive—it's calculated preparation.",
      icon: Target
    }
  ];

  const closerQuotes = [
    {
      quote: "What did I do today to put a dollar in my pocket?",
      context: "The daily question of a hungry entrepreneur"
    },
    {
      quote: "All the hard work means nothing without the close. The deal has to get done—that's when we get paid.",
      context: "The Closer's Mentality"
    },
    {
      quote: "It's the makers and the closers that matter. Everyone else is just noise.",
      context: "Focus on what moves the needle"
    },
    {
      quote: "Don't watch the waves. Keep your eyes on the horizon.",
      context: "Long-term vision over short-term distractions"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/95 backdrop-blur-md border-b border-yellow-500/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/">
            <span className="text-yellow-400 font-bold text-xs tracking-widest cursor-pointer hover:text-yellow-300 transition-colors">
              THE FUTURE OF ATHLETE SUCCESS
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/diamond-grind">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer text-sm">
                ⚾ Diamond Grind
              </span>
            </Link>
            <Link href="/mindset">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer text-sm">
                🧠 Mindset
              </span>
            </Link>
            <Link href="/studio">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer text-sm">
                🎙️ Studio
              </span>
            </Link>
            {loading ? (
              <div className="w-20 h-8 bg-slate-700 animate-pulse rounded-lg"></div>
            ) : user ? (
              <Link href="/dashboard">
                <Button size="sm" className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500">
                  ✅ Dashboard
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="sm" className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 animate-pulse">
                  🔐 LOGIN
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            {/* Shield Icon */}
            <motion.div variants={fadeInUp} className="mb-6">
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-30 animate-pulse"></div>
                <Shield className="w-24 h-24 text-yellow-400 mx-auto relative" />
              </div>
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-yellow-400 tracking-[0.3em] text-sm mb-4">
              FORGED IN FIRE • BUILT FOR BATTLE
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-6">
              THE WARRIOR'S<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500">
                PLAYBOOK
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
              "Now it all has meaning... it was in my head, now I offer it to the world."
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-lg text-yellow-400/80 max-w-2xl mx-auto mb-8">
              The mental game separates good from great. Champions aren't just built in the gym—they're forged in the mind. This is the playbook that took 30 years to write.
            </motion.p>

            <motion.div variants={fadeInUp} className="flex justify-center gap-4 flex-wrap">
              <Link href="/studio">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-yellow-500/30">
                  <Play className="w-5 h-5 mr-2" />
                  Watch Episodes
                </Button>
              </Link>
              <Link href="/founder-story">
                <Button variant="outline" className="border-yellow-500/50 text-yellow-400 hover:bg-yellow-500/10 px-8 py-6 text-lg rounded-full">
                  <BookOpen className="w-5 h-5 mr-2" />
                  Read My Story
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* The Mission Statement */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0d1e36] via-[#1a3a5c] to-[#0d1e36]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <Heart className="w-16 h-16 text-red-500 mx-auto mb-8" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              THE MISSION: <span className="text-red-500">NOT FOR THE MONEY</span>
            </h2>
            
            <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              "If I can help <span className="text-yellow-400 font-bold">ONE child</span> avoid the mistakes I made—the poor choices, the wasted years, the pain of watching your dreams slip away—then every sleepless night building this platform was worth it.
              <br /><br />
              <span className="text-cyan-400">This isn't about money. This is about redemption. This is about giving back what I wish someone had given me.</span>"
            </blockquote>
            
            <p className="text-yellow-400 text-xl font-semibold">— Chad Allen Dozier Sr.</p>
            <p className="text-white/50 mt-2">Founder & CEO, Dozier Holdings Group</p>
          </motion.div>
        </div>
      </section>

      {/* Dreams & Goals Quote */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-3xl p-12 border border-yellow-500/30 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 rounded-full blur-3xl"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
              
              <Target className="w-16 h-16 text-yellow-400 mx-auto mb-8 relative z-10" />
              
              <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8 relative z-10">
                "Dreams without Goals are just dreams and ultimately without Goals they fuel disappointment.
                <br /><br />
                <span className="text-cyan-400">On the Road to Achieving your Dreams you must apply discipline but more importantly Consistency.</span>
                <br /><br />
                Because without Commitment you'll never start but <span className="text-yellow-400">without Consistency You'll never Finish.</span>"
              </blockquote>
              
              <p className="text-yellow-400 text-xl font-semibold relative z-10">— Chad Allen Dozier Sr.</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The 6 Rules of Power */}
      <section className="py-20 px-4 bg-[#0d1e36]">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Lock className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE 6 RULES OF <span className="text-yellow-400">POWER</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                Move in silence. Let success make the noise.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {rulesOfPower.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d1e36]/50 rounded-2xl p-8 border border-white/10 hover:border-yellow-500/40 transition-all group relative overflow-hidden"
              >
                <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${rule.color}`}></div>
                
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${rule.color} flex items-center justify-center text-white font-black text-2xl shadow-lg`}>
                    {rule.number}
                  </div>
                  <rule.icon className="w-8 h-8 text-white/40 group-hover:text-yellow-400 transition-colors mt-2" />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                  {rule.rule}
                </h3>
                
                <p className="text-white/60 text-sm">
                  {rule.consequence}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Warrior Principles */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Sword className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                WARRIOR <span className="text-red-500">PRINCIPLES</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                The mindset that separates champions from everyone else.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {warriorPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="bg-gradient-to-br from-red-500/10 to-orange-500/10 rounded-2xl p-8 border border-red-500/20 hover:border-red-500/40 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center shadow-lg shadow-red-500/30">
                    <principle.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white group-hover:text-red-400 transition-colors">
                    {principle.title}
                  </h3>
                </div>
                <p className="text-white/70 text-lg leading-relaxed">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Closer's Mentality */}
      <section className="py-20 px-4 bg-gradient-to-r from-[#0d1e36] to-[#1a3a5c]">
        <div className="container mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="text-center mb-16"
          >
            <motion.div variants={fadeInUp}>
              <Flame className="w-16 h-16 text-orange-500 mx-auto mb-4" />
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                THE CLOSER'S <span className="text-orange-500">MENTALITY</span>
              </h2>
              <p className="text-white/60 text-xl max-w-2xl mx-auto">
                You have to eat. And I have been hungry for years.
              </p>
            </motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {closerQuotes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20 hover:border-orange-500/40 transition-all"
              >
                <blockquote className="text-xl md:text-2xl font-bold text-white mb-4">
                  "{item.quote}"
                </blockquote>
                <p className="text-orange-400 text-sm uppercase tracking-wider">
                  {item.context}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Einstein Quote */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d1e36]/50 rounded-3xl p-12 border border-cyan-500/20 text-center">
              <Lightbulb className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
              
              <blockquote className="text-3xl md:text-4xl font-bold text-white mb-6">
                "Logic will get you from A to B.
                <br />
                <span className="text-cyan-400">Imagination will take you Everywhere.</span>"
              </blockquote>
              
              <p className="text-yellow-400 text-xl font-semibold">— Albert Einstein</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Living The Dream */}
      <section className="py-20 px-4 bg-[#0d1e36]">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto text-center"
          >
            <Star className="w-16 h-16 text-yellow-400 mx-auto mb-8" />
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
              LIVING THE <span className="text-yellow-400">DREAM</span>
            </h2>
            
            <blockquote className="text-xl md:text-2xl text-white/90 leading-relaxed mb-8">
              "Building ATHLYNX doesn't feel like work. It feels like I'm back on those fields as a kid, learning how to play ball. 
              <br /><br />
              <span className="text-cyan-400">This is my childhood dream come true—helping athletes succeed.</span>
              <br /><br />
              <span className="text-yellow-400">Priceless and Fun.</span>"
            </blockquote>
            
            <p className="text-yellow-400 text-xl font-semibold">— Chad Allen Dozier Sr.</p>
            <p className="text-white/50 mt-2">December 29, 2025</p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-8" />
            
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              READY TO BEGIN YOUR <span className="text-yellow-400">JOURNEY</span>?
            </h2>
            
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who are transforming their mindset and achieving their dreams with The Warrior's Playbook.
            </p>
            
            <div className="flex justify-center gap-4 flex-wrap">
              <Link href="/">
                <Button className="bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white px-8 py-6 text-lg rounded-full shadow-lg shadow-yellow-500/30">
                  <Trophy className="w-5 h-5 mr-2" />
                  Claim VIP Access
                </Button>
              </Link>
              <Link href="/diamond-grind">
                <Button variant="outline" className="border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 px-8 py-6 text-lg rounded-full">
                  ⚾ Diamond Grind
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <UnifiedFooter />
    </div>
  );
}
