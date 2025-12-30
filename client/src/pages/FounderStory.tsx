import { motion } from "framer-motion";
import { Link } from "wouter";
import { 
  Trophy, 
  Heart, 
  Star, 
  Flame,
  Target,
  ArrowRight,
  Quote,
  Sparkles,
  Shield,
  Users,
  Zap
} from "lucide-react";
import { Button } from "@/components/ui/button";
import UnifiedFooter from "@/components/UnifiedFooter";

export default function FounderStory() {
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] via-[#0d1e36] to-[#0a1628]">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a1628]/90 backdrop-blur-md border-b border-cyan-500/20">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <span className="text-cyan-400 font-bold text-sm tracking-widest cursor-pointer hover:text-cyan-300 transition-colors">
              THE FUTURE OF ATHLETE SUCCESS
            </span>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/mindset">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer">
                Mindset
              </span>
            </Link>
            <Link href="/">
              <span className="text-white/80 hover:text-cyan-400 transition-colors cursor-pointer">
                ATHLYNX
              </span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-16 px-4 relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="mb-6">
              <img 
                src="/images/dhg-crab-shield-new.jpeg" 
                alt="DHG Crab Shield" 
                className="w-32 h-32 mx-auto rounded-2xl shadow-2xl shadow-cyan-500/20 border-2 border-cyan-500/30"
              />
            </motion.div>
            
            <motion.p variants={fadeInUp} className="text-cyan-400 tracking-[0.3em] text-sm mb-4">
              THE FOUNDER'S JOURNEY
            </motion.p>
            
            <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-black text-white mb-4">
              CHAD ALLEN<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-yellow-400">
                DOZIER SR.
              </span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-xl text-white/70 max-w-3xl mx-auto mb-4">
              Founder & CEO, Dozier Holdings Group
            </motion.p>
            
            <motion.p variants={fadeInUp} className="text-lg text-yellow-400/80 max-w-2xl mx-auto">
              "I was at the bottom. I should have died. But I didn't. And now I'm ready to spread my wings and fly."
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Opening Quote */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-[#1a3a5c]/50 to-[#0d1e36]/50 rounded-3xl p-10 border border-cyan-500/20 text-center"
          >
            <Quote className="w-12 h-12 text-cyan-400/50 mx-auto mb-6" />
            <p className="text-2xl md:text-3xl text-white font-light leading-relaxed mb-6">
              "Dreams without Goals are just dreams and ultimately without Goals they fuel disappointment.
              <br /><br />
              On the Road to Achieving your Dreams you must apply discipline but more importantly <span className="text-cyan-400 font-bold">Consistency</span>.
              <br /><br />
              Because without Commitment you'll never start but without Consistency <span className="text-yellow-400 font-bold">You'll never Finish</span>."
            </p>
            <p className="text-cyan-400 font-semibold">— Chad Allen Dozier Sr.</p>
          </motion.div>
        </div>
      </section>

      {/* Chapter 1: The Beautiful Life */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0d1e36] to-[#0a1628]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-green-400 text-sm tracking-widest">CHAPTER ONE</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Beautiful Life</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                I had it all. The kind of life people dream about.
              </p>
              <p>
                Married to a doctor. Living in <span className="text-white font-semibold">Madison, Mississippi</span>—one of the most beautiful places in the state. A stunning home. Hundred-thousand-dollar cars in the driveway. Boats. Toys. Everything money could buy.
              </p>
              <p>
                And the most precious gift of all: my little boy. My son. My pride.
              </p>
              <p className="text-cyan-400 italic">
                Then I discovered I had a daughter I never knew existed—she was already 7 years old when I found out.
              </p>
              <p>
                Life was beautiful. Life was perfect. Or so I thought.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 2: The Fall */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-red-400 text-sm tracking-widest">CHAPTER TWO</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Fall</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                <span className="text-red-400 font-bold">Gambling.</span>
              </p>
              <p>
                It started small. It always does. But it became the worst thing that ever happened in my life.
              </p>
              <p>
                I did something stupid. Something I can never take back. And my world collapsed.
              </p>
              <p>
                Lost my wife. Lost my marriage. Lost my beautiful life.
              </p>
              <p className="text-red-400 font-semibold text-xl">
                I went to prison.
              </p>
              <p>
                For five years, I was lost. Completely lost. I should have died. Many times, I thought I would.
              </p>
              
              <div className="bg-red-500/10 rounded-xl p-6 border-l-4 border-red-500 my-8">
                <p className="text-white/90 italic">
                  "The gambling addiction will always be there. It doesn't go away. But I made a choice. I'm done. I chose my children. I chose my future. I chose to live."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 3: The Transformation */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0d1e36] to-[#0a1628]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-purple-400 text-sm tracking-widest">CHAPTER THREE</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Transformation</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                I quit drinking. Cold turkey. No more.
              </p>
              <p>
                No drugs—except marijuana, and I'll tell you why. It's not a drug to me. It's a <span className="text-green-400 font-semibold">lifesaver</span>. For my mental health. Especially for my Asperger's. It keeps me balanced. It keeps me focused. It keeps me alive.
              </p>
              <p>
                I grew up. Finally. At 50 years old, I grew up.
              </p>
              <p>
                I stopped making excuses. I stopped blaming others. I looked in the mirror and said: <span className="text-cyan-400 font-bold">"This is on you. Now fix it."</span>
              </p>
              
              <div className="bg-purple-500/10 rounded-xl p-6 border-l-4 border-purple-500 my-8">
                <p className="text-white/90 italic text-xl">
                  "I'm ready to spread my wings and fly."
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 4: The Athlete */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-amber-400 text-sm tracking-widest">CHAPTER FOUR</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Athlete</h2>
              </div>
            </div>

            {/* All-Star Photo */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              <img 
                src="/images/chad-allstar-baseball-1993.jpeg" 
                alt="Chad Dozier - MS All-Star Baseball 1993" 
                className="w-full md:w-1/3 rounded-xl shadow-2xl border-2 border-amber-500/30"
              />
              <img 
                src="/images/mississippi-state-bulldogs.jpeg" 
                alt="Mississippi State Bulldogs" 
                className="w-full md:w-1/3 rounded-xl shadow-2xl border-2 border-maroon-500/30"
              />
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                Before all of this, I was an athlete. A real one. <span className="text-amber-400 font-bold">WARRIOR MENTALITY. ALPHA MINDSET.</span>
              </p>
              <p>
                <span className="text-white font-semibold">RH Watkins High School, Laurel, Mississippi.</span> Quarterback in football. Third base, first base, pitcher in baseball. I was recruited by colleges across the nation.
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Summer 1993:</span> Selected to play in the <span className="text-white font-bold">Mississippi High School All-Star Baseball Game (4A-5A)</span> at historic <span className="text-cyan-400">Swayze Field in Oxford, MS</span>.
              </p>
              <p className="bg-amber-500/10 rounded-xl p-4 border-l-4 border-amber-500">
                <span className="text-white font-semibold">North vs. South.</span> I played for the North. First Baseman and Pitcher. My roommate was <span className="text-white">Chris Wright from West Jones High School (Catcher)</span>. <span className="text-green-400 font-bold">We won 4 or 5 to nothing.</span> I remember it vividly.
              </p>
              <p className="text-white/70 italic text-sm">
                Years later, Josh "The Guru" Nichols wrote about this in the Laurel Leader-Call - "A Walk Down Memory Lane" - remembering games at Smokey Herrington Park. I was honored that The Guru thought that much of me. He was a teammate and a friend.
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">1994:</span> Jones County Junior College. Continued excellence.
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">1995:</span> Mississippi State University. Recruited by the legendary <span className="text-white font-semibold">Coach Ron Polk</span>. Coached by <span className="text-white font-semibold">Jim MacMahon</span>.
              </p>
              <p className="text-red-400 italic">
                Then came the injury. Career-ending. Dream-shattering. I was cut from the team.
              </p>
              <p>
                I've been playing sports since I was 3 years old. The game never left me. It's in my blood. It's why I'm building ATHLYNX.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 5: The Call Home */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0d1e36] to-[#0a1628]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-pink-500 to-rose-600 flex items-center justify-center">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-pink-400 text-sm tracking-widest">CHAPTER FIVE</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Call Home</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                <span className="text-yellow-400 font-semibold">May 3, 2024:</span> My grandfather passed away.
              </p>
              <p>
                Then the phone call that changed everything.
              </p>
              <p>
                My mother—<span className="text-white font-semibold">Nicki Simpson Leggett</span>—was diagnosed with Leukemia. She'd been fighting it for nearly 4 years without telling me.
              </p>
              <p>
                I didn't hesitate. Not for a second. I left everything—my business, my life in Orange Beach, Alabama—and came home. <span className="text-cyan-400 font-bold">Family first. Always.</span>
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">May 26, 2024:</span> We traveled together to MD Anderson Cancer Center in Houston, Texas. Both nervous. Both uncertain. Both determined.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 6: Hope Lodge */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-cyan-400 text-sm tracking-widest">CHAPTER SIX</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">Hope Lodge, Houston</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                During my mother's treatments and stem cell transplant, we stayed at the <span className="text-white font-semibold">Hope Lodge</span> in Houston—a place where families find shelter, support, and community during the hardest battles of their lives.
              </p>
              <p>
                That's where I met <span className="text-cyan-400 font-semibold">Glenn Tse</span>—a fellow cancer patient fighting a similar battle. Glenn was doing great. He showed me that survival was possible. Hope was real.
              </p>
              <p>
                As my mother underwent treatment and began to recover, Glenn and I formed a bond. Two men, connected by circumstance, united by vision.
              </p>
              
              <div className="bg-cyan-500/10 rounded-xl p-6 border-l-4 border-cyan-500 my-8">
                <p className="text-white/90 italic">
                  From the halls of Hope Lodge, an empire was born.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Chapter 7: The Empire */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0d1e36] to-[#0a1628]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-yellow-400 text-sm tracking-widest">CHAPTER SEVEN</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">The Empire</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                <span className="text-yellow-400 font-semibold">November 2024:</span> Dozier Holdings Group was founded.
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">Late 2024:</span> My mother went into remission. She returned to work. She returned to life.
              </p>
              <p className="text-cyan-400 italic text-xl">
                "I did my job. I honored my mother. Now it's my time to fly."
              </p>
              <p>
                <span className="text-yellow-400 font-semibold">December 28, 2025:</span> I became User #1. The Lifetime Founder. The official beginning of the ATHLYNX Empire.
              </p>
            </div>

            {/* The Crab Symbol */}
            <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-yellow-500/10 rounded-2xl p-8 border border-cyan-500/20">
              <div className="flex items-center gap-4 mb-6">
                <img 
                  src="/images/dhg-crab-shield-new.jpeg" 
                  alt="DHG Crab" 
                  className="w-16 h-16 rounded-xl"
                />
                <h3 className="text-2xl font-bold text-white">The Symbol — The Crab</h3>
              </div>
              <p className="text-white/80 mb-4">The crab represents more than a logo. It represents:</p>
              <ul className="space-y-2 text-white/80">
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span><strong className="text-white">Cancer</strong> — the battle my mother fought</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span><strong className="text-white">Survival</strong> — the strength to overcome</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span><strong className="text-white">Resilience</strong> — moving sideways when you can't move forward</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span><strong className="text-white">Protection</strong> — the hard shell that shields what matters</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="text-cyan-400">•</span>
                  <span><strong className="text-white">Hope</strong> — that even in the darkest waters, you can thrive</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Mindset Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-indigo-400 text-sm tracking-widest">THE MINDSET</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">What I Live By</h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-[#1a3a5c]/30 rounded-xl p-6 border border-cyan-500/10">
                <p className="text-white font-semibold mb-2">"What did I do today to put a dollar in my pocket?"</p>
                <p className="text-white/60 text-sm">The daily question of a hungry entrepreneur</p>
              </div>
              <div className="bg-[#1a3a5c]/30 rounded-xl p-6 border border-cyan-500/10">
                <p className="text-white font-semibold mb-2">"All the hard work means nothing without the close."</p>
                <p className="text-white/60 text-sm">The deal has to get done—that's when we get paid</p>
              </div>
              <div className="bg-[#1a3a5c]/30 rounded-xl p-6 border border-cyan-500/10">
                <p className="text-white font-semibold mb-2">"It's the makers and the closers that matter."</p>
                <p className="text-white/60 text-sm">Everyone else is just noise</p>
              </div>
              <div className="bg-[#1a3a5c]/30 rounded-xl p-6 border border-cyan-500/10">
                <p className="text-white font-semibold mb-2">"Don't watch the waves. Keep your eyes on the horizon."</p>
                <p className="text-white/60 text-sm">Long-term vision over short-term distractions</p>
              </div>
            </div>

            {/* 6 Rules of Power */}
            <div className="mt-12 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl p-8 border border-white/10">
              <h3 className="text-2xl font-bold text-white mb-6 text-center">The 6 Rules of Power</h3>
              <p className="text-center text-white/60 mb-8">Move in silence. Let success make the noise.</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">1.</span>
                  <p className="text-white/80">Don't tell people your plans — they will sabotage you</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">2.</span>
                  <p className="text-white/80">Don't tell people your weakness — they will use them against you</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">3.</span>
                  <p className="text-white/80">Don't tell people your failures — they will always see you as a failure</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">4.</span>
                  <p className="text-white/80">Take action and shock them with your results</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">5.</span>
                  <p className="text-white/80">Don't tell people your secrets — only a fool reveals their secrets</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 font-bold">6.</span>
                  <p className="text-white/80">Don't tell people your income — always make them wonder</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* The Mission */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#0d1e36] to-[#0a1628]">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-cyan-500 to-yellow-500 flex items-center justify-center">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <p className="text-cyan-400 text-sm tracking-widest">THE MISSION</p>
                <h2 className="text-3xl md:text-4xl font-black text-white">Why I'm Doing This</h2>
              </div>
            </div>

            <div className="space-y-6 text-lg text-white/80 leading-relaxed">
              <p>
                I'm not building ATHLYNX for the money.
              </p>
              <p>
                I'm building it so that <span className="text-cyan-400 font-bold">one child</span> who had a childhood like mine would never have to make the same mistakes I did.
              </p>
              <p>
                If my testimony helps that one person—just one—then I've done my job.
              </p>
              <p>
                And you know what? <span className="text-yellow-400 font-bold">I'm having the time of my life.</span>
              </p>
              <p>
                I feel like I'm living my childhood dream through these platforms and apps. Every feature we build, every athlete we help, every young person we guide—it's like playing the game all over again, but this time I get to help others win.
              </p>
            </div>

            <div className="mt-12 bg-gradient-to-r from-cyan-500/20 to-yellow-500/20 rounded-2xl p-8 border border-cyan-500/30 text-center">
              <p className="text-2xl font-bold text-white mb-4">This isn't just a business. This is:</p>
              <div className="space-y-2 text-xl text-white/80">
                <p>A son's love for his mother</p>
                <p>An athlete's dream deferred by injury</p>
                <p>A survivor's mission to help others</p>
                <p>A testament to hope, family, and perseverance</p>
              </div>
              <div className="mt-8 space-y-2">
                <p className="text-yellow-400 font-bold text-xl">From Hope Lodge to helping athletes worldwide.</p>
                <p className="text-yellow-400 font-bold text-xl">From rock bottom to building an empire.</p>
                <p className="text-yellow-400 font-bold text-xl">From honoring my mother to changing the game.</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final Quote */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Quote className="w-16 h-16 text-yellow-400/50 mx-auto mb-8" />
            <p className="text-3xl md:text-4xl text-white font-light leading-relaxed mb-8">
              "Logic will get you from A to B.<br />
              <span className="text-yellow-400 font-bold">Imagination will take you Everywhere.</span>"
            </p>
            <p className="text-white/60 text-xl">— Albert Einstein</p>
            
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link href="/mindset">
                <Button className="bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-400 hover:to-cyan-500 text-white px-8 py-6 text-lg rounded-full">
                  Read the Mindset
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link href="/journey">
                <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full">
                  The Journey
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-12 px-4 bg-[#0d1e36]">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-white/60 mb-4">Connect with Chad</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="mailto:cdozier14@athlynx.ai" className="text-cyan-400 hover:text-cyan-300">cdozier14@athlynx.ai</a>
            <span className="text-white/30">|</span>
            <a href="mailto:cdozier@dozierholdingsgroup.com" className="text-cyan-400 hover:text-cyan-300">cdozier@dozierholdingsgroup.com</a>
            <span className="text-white/30">|</span>
            <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-cyan-300">dozierholdingsgroup.com</a>
          </div>
        </div>
      </section>

      <UnifiedFooter />
    </div>
  );
}
