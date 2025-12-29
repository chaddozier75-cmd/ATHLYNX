export default function FounderStory() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      {/* Header with Logo */}
      <div className="container pt-12 flex justify-center">
        <div className="text-8xl">🦀</div>
      </div>

      {/* Title */}
      <div className="container text-center py-8 space-y-2">
        <h1 className="text-5xl font-bold tracking-tight text-cyan-400">The Founder's Story</h1>
        <p className="text-xl text-gray-300">Chad A. Dozier - Founder</p>
        <p className="text-sm text-gray-400">User #1 | Founded December 28, 2025</p>
        <p className="text-sm text-yellow-400">Dozier Holdings Group | Athlynx - The Athlete's Playbook</p>
      </div>

      {/* Timeline */}
      <div className="container max-w-4xl space-y-12 pb-20">
        
        {/* The Athlete (1990s) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🏈</div>
            <div>
              <h2 className="text-3xl font-bold">The Athlete (1990s)</h2>
              <p className="text-yellow-400">1990-1993</p>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">RH Watkins High School, Laurel, Mississippi</h3>
            <p className="text-gray-300">Quarterback (Football) | 3rd Base, 1st Base, Pitcher (Baseball)</p>
            <p className="text-gray-300">Elite multi-sport athlete recruited by colleges across the nation</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">1993</p>
            <h3 className="text-xl font-bold text-cyan-400">Senior Year Achievement</h3>
            <p className="text-gray-300">Selected to play in the <strong>Mississippi High School All-Star Baseball Game</strong> in Oxford, MS</p>
            <p className="text-gray-300">Featured in "A Walk Down Memory Lane" by Josh Nichols (The Guru), Laurel Leader Call</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">1994</p>
            <h3 className="text-xl font-bold text-cyan-400">Jones County Junior College</h3>
            <p className="text-gray-300">Freshman year - Continued athletic excellence</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">1995</p>
            <h3 className="text-xl font-bold text-cyan-400">Mississippi State University</h3>
            <p className="text-gray-300">Recruited by legendary coach <strong>Ron Polk</strong></p>
            <p className="text-gray-300">Coached by <strong>Jim MacMahon</strong> before career-ending injury</p>
            <p className="text-gray-300">Cut from the team after the injury</p>
            <p className="text-red-400 italic">The dream shattered. The pain real. But never forgotten.</p>
            <p className="text-cyan-400 italic">"Playing sports since I was 3 years old. The game never left me."</p>
          </div>
        </div>

        {/* The Vision (2020s) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">💡</div>
            <div>
              <h2 className="text-3xl font-bold">The Vision (2020s)</h2>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">Living in Orange Beach, Alabama, Chad began developing the concept for Athlynx—a platform that would revolutionize how athletes navigate their careers, combining his personal experience as a recruited athlete with modern technology and NIL opportunities.</p>
            <p className="text-cyan-400 font-bold">The Idea: Create an all-in-one ecosystem where athletes could train, connect, secure deals, and get recruited—everything he wished existed during his playing days.</p>
          </div>
        </div>

        {/* The Call Home (2024) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">💙</div>
            <div>
              <h2 className="text-3xl font-bold">The Call Home (2024)</h2>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">May 3, 2024</p>
            <p className="text-gray-300">Chad's grandfather passed away</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">May 2024</p>
            <h3 className="text-xl font-bold text-cyan-400">The Phone Call</h3>
            <p className="text-gray-300">His mother was diagnosed with Leukemia—a battle she'd been fighting for nearly 4 years.</p>
            <p className="text-cyan-400 font-bold">The Decision: Without hesitation, Chad left everything—his business, his life in Orange Beach—and came home to care for his mother. Family first. Always.</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">May 26, 2024</p>
            <h3 className="text-xl font-bold text-cyan-400">The Journey Begins</h3>
            <p className="text-gray-300">Chad and his mother traveled to <strong>MD Anderson Cancer Center</strong> in Houston, Texas</p>
            <p className="text-gray-300">Both nervous. Both uncertain. Both determined.</p>
          </div>
        </div>

        {/* Hope Lodge, Houston (2024) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🏥</div>
            <div>
              <h2 className="text-3xl font-bold">Hope Lodge, Houston (2024)</h2>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-gray-300">During his mother's cancer treatments and stem cell transplant, Chad and his family stayed at the <strong>Hope Lodge</strong> in Houston—a place where families find shelter, support, and community during the hardest battles of their lives.</p>
            <p className="text-cyan-400 font-bold">The Meeting: At Hope Lodge, Chad met Glenn Tse—a fellow cancer patient fighting a similar battle to his mother's. Glenn was doing great, showing that survival was possible. Hope was real.</p>
            <p className="text-gray-300">As Chad's mother underwent treatment and began to recover, he and Glenn formed a bond. Two men, connected by circumstance, united by vision.</p>
          </div>
        </div>

        {/* The Birth of an Empire (November 2024) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🦀</div>
            <div>
              <h2 className="text-3xl font-bold">The Birth of an Empire (November 2024)</h2>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">November 2024</p>
            <h3 className="text-xl font-bold text-cyan-400">Dozier Holdings Group Founded</h3>
            <p className="text-gray-300">Co-founders: <strong>Chad A. Dozier</strong> & <strong>Glenn Tse</strong></p>
            <p className="text-gray-300">Location: Houston, Texas</p>
            <p className="text-gray-300">From the halls of Hope Lodge, an empire was born. Chad and Glenn began building:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li>🏢 Dozier Holdings Group</li>
              <li>🏈 Athlynx Platform</li>
              <li>💰 NIL Portal</li>
              <li>💎 Diamond Grind</li>
              <li>💬 Messenger</li>
              <li>⚡ Warriors Playbook</li>
            </ul>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">The Symbol - The Crab 🦀</h3>
            <p className="text-gray-300">The crab represents more than a logo. It represents:</p>
            <ul className="list-disc list-inside space-y-2 text-gray-300 ml-4">
              <li><strong>Cancer</strong>—the battle his mother fought</li>
              <li><strong>Survival</strong>—the strength to overcome</li>
              <li><strong>Resilience</strong>—moving sideways when you can't move forward</li>
              <li><strong>Protection</strong>—the hard shell that shields what matters</li>
              <li><strong>Hope</strong>—that even in the darkest waters, you can thrive</li>
            </ul>
          </div>
        </div>

        {/* The Victory (2024-2025) */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🙏</div>
            <div>
              <h2 className="text-3xl font-bold">The Victory (2024-2025)</h2>
            </div>
          </div>
          
          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">Late 2024</p>
            <h3 className="text-xl font-bold text-cyan-400">Mom's Victory</h3>
            <p className="text-gray-300">After months of treatment and a stem cell transplant, Chad's mother went into <strong>remission</strong>.</p>
            <p className="text-gray-300">She returned to work. She returned to life.</p>
            <p className="text-cyan-400 italic">"I did my job. I honored my mother. Now it's my time to fly."</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">December 16, 2025</p>
            <h3 className="text-xl font-bold text-cyan-400">Active Development Begins</h3>
            <p className="text-gray-300">With his mother healthy and his mission clear, Chad began building the Athlynx ecosystem in earnest.</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">December 28, 2025</p>
            <h3 className="text-xl font-bold text-cyan-400">Founder Account Created</h3>
            <p className="text-gray-300"><strong>Username:</strong> Cdozier14</p>
            <p className="text-gray-300"><strong>Status:</strong> User #1 - Lifetime Founder</p>
            <p className="text-cyan-400">The official beginning of the Athlynx Empire</p>
          </div>

          <div className="bg-slate-800/50 rounded-lg p-6 space-y-4">
            <p className="text-yellow-400 font-bold">February 1, 2026</p>
            <h3 className="text-xl font-bold text-cyan-400">Official Launch</h3>
            <p className="text-gray-300">Athlynx goes live to the world</p>
          </div>
        </div>

        {/* Why Athlynx Exists */}
        <div className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="text-5xl">🎯</div>
            <div>
              <h2 className="text-3xl font-bold">Why Athlynx Exists</h2>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-8 space-y-4 border border-cyan-500/30">
            <p className="text-xl text-gray-200">This isn't just a business. This is:</p>
            <ul className="space-y-3 text-lg text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">•</span>
                <span>A son's love for his mother</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">•</span>
                <span>An athlete's dream deferred by injury</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">•</span>
                <span>A survivor's mission to help others</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-cyan-400">•</span>
                <span>A testament to hope, family, and perseverance</span>
              </li>
            </ul>
            <div className="pt-4 space-y-2 text-xl font-bold">
              <p className="text-yellow-400">From Hope Lodge to helping athletes worldwide.</p>
              <p className="text-yellow-400">From cancer battle to building an empire.</p>
              <p className="text-yellow-400">From honoring his mother to changing the game.</p>
            </div>
            <div className="pt-4 space-y-2 text-2xl font-bold text-center">
              <p className="text-cyan-400">This is why the Crab means everything.</p>
              <p className="text-cyan-400">This is why Athlynx will dominate.</p>
              <p className="text-cyan-400">This is the heart of the mission.</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
