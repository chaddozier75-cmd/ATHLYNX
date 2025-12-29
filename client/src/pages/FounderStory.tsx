export default function FounderStory() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-blue-950 to-slate-900 text-white">
      {/* Header */}
      <div className="container py-12 text-center">
        <div className="flex justify-center mb-6">
          <div className="text-8xl">🦀</div>
        </div>
        <h1 className="text-5xl font-bold mb-4 text-cyan-400">The Founder's Story</h1>
        <p className="text-xl text-slate-300 mb-2">Chad A. Dozier - Founder</p>
        <p className="text-slate-400">User #1 | Founded December 28, 2025</p>
        <p className="text-slate-400">Dozier Holdings Group | Athlynx - The Athlete's Playbook</p>
      </div>

      {/* Timeline */}
      <div className="container max-w-4xl pb-20">
        {/* The Athlete */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏈</span>
            <h2 className="text-3xl font-bold text-cyan-400">The Athlete (1990s)</h2>
          </div>

          <div className="space-y-8 border-l-2 border-cyan-500/30 pl-8">
            <div>
              <div className="text-cyan-400 font-bold mb-2">1990-1993</div>
              <h3 className="text-xl font-bold mb-2">RH Watkins High School, Laurel, Mississippi</h3>
              <p className="text-slate-300 mb-2">Quarterback (Football) | 3rd Base, 1st Base, Pitcher (Baseball)</p>
              <p className="text-slate-400">Elite multi-sport athlete recruited by colleges across the nation</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">1993</div>
              <h3 className="text-xl font-bold mb-2">Senior Year Achievement</h3>
              <p className="text-slate-300 mb-2">Selected to play in the <strong>Mississippi High School All-Star Baseball Game</strong> in Oxford, MS</p>
              <p className="text-slate-400">Featured in "A Walk Down Memory Lane" by Josh Nichols (The Guru), Laurel Leader Call</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">1994</div>
              <h3 className="text-xl font-bold mb-2">Jones County Junior College</h3>
              <p className="text-slate-400">Freshman year - Continued athletic excellence</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">1995</div>
              <h3 className="text-xl font-bold mb-2">Mississippi State University</h3>
              <p className="text-slate-300 mb-2">Recruited by legendary coach <strong>Ron Polk</strong></p>
              <p className="text-slate-300 mb-2">Coached by <strong>Jim MacMahon</strong> before career-ending injury</p>
              <p className="text-red-400 font-bold mb-3">Cut from the team after the injury</p>
              <p className="text-slate-400">The dream shattered. The pain real. But never forgotten.</p>
              <p className="text-cyan-300 italic mt-3">"Playing sports since I was 3 years old. The game never left me."</p>
            </div>
          </div>
        </div>

        {/* The Vision */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💡</span>
            <h2 className="text-3xl font-bold text-cyan-400">The Vision (2020s)</h2>
          </div>
          <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">Living in Orange Beach, Alabama, Chad began developing the concept for Athlynx—a platform that would revolutionize how athletes navigate their careers, combining his personal experience as a recruited athlete with modern technology and NIL opportunities.</p>
            <p className="text-cyan-300 font-bold">The Idea: Create an all-in-one ecosystem where athletes could train, connect, secure deals, and get recruited—everything he wished existed during his playing days.</p>
          </div>
        </div>

        {/* The Call Home */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">💙</span>
            <h2 className="text-3xl font-bold text-cyan-400">The Call Home (2024)</h2>
          </div>

          <div className="space-y-8 border-l-2 border-cyan-500/30 pl-8">
            <div>
              <div className="text-cyan-400 font-bold mb-2">May 3, 2024</div>
              <p className="text-slate-300">Chad's grandfather passed away</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">May 2024</div>
              <h3 className="text-xl font-bold mb-2">The Phone Call</h3>
              <p className="text-slate-300 mb-3">His mother was diagnosed with Leukemia—a battle she'd been fighting for nearly 4 years.</p>
              <p className="text-cyan-300 font-bold">The Decision: Without hesitation, Chad left everything—his business, his life in Orange Beach—and came home to care for his mother. Family first. Always.</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">May 26, 2024</div>
              <h3 className="text-xl font-bold mb-2">The Journey Begins</h3>
              <p className="text-slate-300 mb-2">Chad and his mother traveled to <strong>MD Anderson Cancer Center</strong> in Houston, Texas</p>
              <p className="text-slate-400">Both nervous. Both uncertain. Both determined.</p>
            </div>
          </div>
        </div>

        {/* Hope Lodge */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🏥</span>
            <h2 className="text-3xl font-bold text-cyan-400">Hope Lodge, Houston (2024)</h2>
          </div>
          <div className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-6">
            <p className="text-slate-300 mb-4">During his mother's cancer treatments and stem cell transplant, Chad and his family stayed at the <strong>Hope Lodge</strong> in Houston—a place where families find shelter, support, and community during the hardest battles of their lives.</p>
            <p className="text-cyan-300 font-bold mb-4">The Meeting: At Hope Lodge, Chad met Glenn Tse—a fellow cancer patient fighting a similar battle to his mother's. Glenn was doing great, showing that survival was possible. Hope was real.</p>
            <p className="text-slate-300">As Chad's mother underwent treatment and began to recover, he and Glenn formed a bond. Two men, connected by circumstance, united by vision.</p>
          </div>
        </div>

        {/* The Birth of an Empire */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🦀</span>
            <h2 className="text-3xl font-bold text-cyan-400">The Birth of an Empire (November 2024)</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-500/50 rounded-xl p-6">
              <div className="text-cyan-400 font-bold mb-2">November 2024</div>
              <h3 className="text-2xl font-bold mb-2">Dozier Holdings Group Founded</h3>
              <p className="text-slate-300 mb-2">Co-founders: <strong>Chad A. Dozier</strong> & <strong>Glenn Tse</strong></p>
              <p className="text-slate-300 mb-4">Location: Houston, Texas</p>
              <p className="text-cyan-300 italic">From the halls of Hope Lodge, an empire was born. Chad and Glenn began building:</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { icon: "🏢", name: "Dozier Holdings Group" },
                { icon: "🏈", name: "Athlynx Platform" },
                { icon: "💰", name: "NIL Portal" },
                { icon: "💎", name: "Diamond Grind" },
                { icon: "💬", name: "Messenger" },
                { icon: "⚡", name: "Warriors Playbook" },
              ].map((item) => (
                <div key={item.name} className="bg-slate-800/50 border border-cyan-500/30 rounded-xl p-4 text-center">
                  <div className="text-3xl mb-2">{item.icon}</div>
                  <div className="text-sm text-slate-300">{item.name}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-800/50 border border-orange-500/50 rounded-xl p-6">
              <h3 className="text-2xl font-bold mb-4 text-orange-400">The Symbol - The Crab 🦀</h3>
              <p className="text-slate-300 mb-3">The crab represents more than a logo. It represents:</p>
              <ul className="space-y-2 text-slate-300">
                <li>• <strong>Cancer</strong>—the battle his mother fought</li>
                <li>• <strong>Survival</strong>—the strength to overcome</li>
                <li>• <strong>Resilience</strong>—moving sideways when you can't move forward</li>
                <li>• <strong>Protection</strong>—the hard shell that shields what matters</li>
                <li>• <strong>Hope</strong>—that even in the darkest waters, you can thrive</li>
              </ul>
            </div>
          </div>
        </div>

        {/* The Victory */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-4xl">🙏</span>
            <h2 className="text-3xl font-bold text-cyan-400">The Victory (2024-2025)</h2>
          </div>

          <div className="space-y-8 border-l-2 border-cyan-500/30 pl-8">
            <div>
              <div className="text-cyan-400 font-bold mb-2">Late 2024</div>
              <h3 className="text-xl font-bold mb-2 text-green-400">Mom's Victory</h3>
              <p className="text-slate-300 mb-2">After months of treatment and a stem cell transplant, Chad's mother went into <strong className="text-green-400">remission</strong>.</p>
              <p className="text-slate-300 mb-3">She returned to work. She returned to life.</p>
              <p className="text-cyan-300 italic">"I did my job. I honored my mother. Now it's my time to fly."</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">December 16, 2025</div>
              <h3 className="text-xl font-bold mb-2">Active Development Begins</h3>
              <p className="text-slate-300">With his mother healthy and his mission clear, Chad began building the Athlynx ecosystem in earnest.</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">December 28, 2025</div>
              <h3 className="text-xl font-bold mb-2">Founder Account Created</h3>
              <p className="text-slate-300 mb-2"><strong>Username:</strong> Cdozier14</p>
              <p className="text-slate-300 mb-2"><strong>Status:</strong> User #1 - Lifetime Founder</p>
              <p className="text-cyan-300">The official beginning of the Athlynx Empire</p>
            </div>

            <div>
              <div className="text-cyan-400 font-bold mb-2">February 1, 2026</div>
              <h3 className="text-xl font-bold mb-2 text-green-400">Official Launch</h3>
              <p className="text-slate-300">Athlynx goes live to the world</p>
            </div>
          </div>
        </div>

        {/* Why Athlynx Exists */}
        <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-2 border-cyan-500/50 rounded-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6 text-cyan-400">🎯 Why Athlynx Exists</h2>
          <p className="text-slate-300 mb-6">This isn't just a business. This is:</p>
          <div className="space-y-3 text-lg">
            <p className="text-cyan-300 font-bold">A son's love for his mother</p>
            <p className="text-cyan-300 font-bold">An athlete's dream deferred by injury</p>
            <p className="text-cyan-300 font-bold">A survivor's mission to help others</p>
            <p className="text-cyan-300 font-bold">A testament to hope, family, and perseverance</p>
          </div>
          <div className="mt-8 space-y-2 text-slate-300">
            <p>From Hope Lodge to helping athletes worldwide.</p>
            <p>From cancer battle to building an empire.</p>
            <p>From honoring his mother to changing the game.</p>
          </div>
          <div className="mt-8 space-y-2 text-xl font-bold">
            <p className="text-orange-400">This is why the Crab means everything.</p>
            <p className="text-cyan-400">This is why Athlynx will dominate.</p>
            <p className="text-green-400">This is the heart of the mission.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
