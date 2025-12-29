import { Link } from "wouter";

const footerLinks = {
  platform: [
    { name: "VIP Access", href: "/" },
    { name: "Athlete Dashboard", href: "/athlete-dashboard" },
    { name: "NIL Marketplace", href: "/nil-marketplace" },
    { name: "Transfer Portal", href: "/transfer-portal" },
    { name: "Messages", href: "/messages" },
  ],
  apps: [
    { name: "NIL Portal", href: "/nil-portal" },
    { name: "Diamond Grind", href: "/diamond-grind" },
    { name: "All Apps", href: "/apps" },
    { name: "Quick Links Hub", href: "/hub" },
  ],
  company: [
    { name: "DHG Corporate", href: "/dhg" },
    { name: "Softmor Inc", href: "/softmor" },
    { name: "Team", href: "/team" },
    { name: "Investor Hub", href: "/investor-hub" },
    { name: "Careers", href: "/careers" },
  ],
  resources: [
    { name: "Founder Story", href: "/founder-story" },
    { name: "Pricing", href: "/pricing" },
    { name: "Store", href: "/store" },
    { name: "Media", href: "/media" },
    { name: "Project Status", href: "/pm" },
  ],
};

export default function UnifiedFooter() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 py-12 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Logo and tagline */}
        <div className="flex flex-col md:flex-row justify-between items-start mb-10">
          <div className="mb-8 md:mb-0">
            <div className="flex items-center gap-3 mb-3">
              <img src="/images/dhg-crab-shield-new.jpeg" alt="DHG" className="w-12 h-12 rounded-full" />
              <span className="text-2xl font-black text-white">ATHLYNX</span>
            </div>
            <p className="text-white/50 text-sm max-w-xs">The Complete Athlete Ecosystem. One platform for NIL deals, training, recruiting, and more.</p>
          </div>
          
          {/* Link columns */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Platform</h4>
              <ul className="space-y-2">
                {footerLinks.platform.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Apps</h4>
              <ul className="space-y-2">
                {footerLinks.apps.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h4 className="text-cyan-400 font-bold text-sm uppercase tracking-wider mb-4">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href}>
                      <span className="text-white/60 hover:text-white text-sm cursor-pointer transition-colors">{link.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-white/40 text-sm mb-4 md:mb-0">
            © 2024 Dozier Holdings Group, LLC. All Rights Reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link href="/privacy">
              <span className="text-white/40 hover:text-white text-sm cursor-pointer transition-colors">Privacy Policy</span>
            </Link>
            <Link href="/terms">
              <span className="text-white/40 hover:text-white text-sm cursor-pointer transition-colors">Terms of Service</span>
            </Link>
            <a href="https://dozierholdingsgroup.com" target="_blank" rel="noopener noreferrer" className="text-white/40 hover:text-white text-sm transition-colors">
              DHG Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
