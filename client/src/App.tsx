import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EarlyAccess from "./pages/EarlyAccess";
import Success from "./pages/Success";
import AthletePlaybook from "./pages/AthletePlaybook";
import TransferPortal from "./pages/TransferPortal";
import NILMarketplace from "./pages/NILMarketplace";
import Messages from "./pages/Messages";
import FounderStory from "./pages/FounderStory";
import ComingSoon from "./pages/ComingSoon";
import NILPortal from "./pages/NILPortal";
// New Empire Pages
import Pricing from "./pages/Pricing";
import Store from "./pages/Store";
import Careers from "./pages/Careers";
import Medical from "./pages/Medical";
import Training from "./pages/Training";
import Veterans from "./pages/Veterans";
import Music from "./pages/Music";
import DiamondGrind from "./pages/DiamondGrind";
import Apps from "./pages/Apps";
import Dashboard from "./pages/Dashboard";
import AITrainingBot from "./pages/AITrainingBot";
import SigningDay from "./pages/SigningDay";
import TransferPortalIntelligence from "./pages/TransferPortalIntelligence";
import Faith from "./pages/Faith";
import MilitaryDivision from "./pages/MilitaryDivision";
import ProjectManagement from "./pages/ProjectManagement";
import MediaShowcase from "./pages/MediaShowcase";
import DHGCorporate from "./pages/DHGCorporate";
import Softmor from "./pages/Softmor";
import AthleteDashboard from "./pages/AthleteDashboard";
import QuickLinksHub from "./pages/QuickLinksHub";
import InvestorHub from "./pages/InvestorHub";
import Team from "./pages/Team";
import ProjectChecklist from "./pages/ProjectChecklist";
import FuelBots from "./pages/FuelBots";
import PartnerPortal from "./pages/PartnerPortal";
import UnifiedNav from "./components/UnifiedNav";
import { BrandingHeader } from "./components/BrandingHeader";

function Router() {
  return (
    <Switch>
      {/* Main Landing */}
      <Route path={"/"} component={EarlyAccess} />
      <Route path={"/success"} component={Success} />
      <Route path={"/home"} component={Home} />
      
      {/* Core Platform */}
      <Route path={"/playbook"} component={AthletePlaybook} />
      <Route path={"/transfer-portal"} component={TransferPortal} />
      <Route path={"/transfer-portal-intelligence"} component={TransferPortalIntelligence} />
      <Route path={"/nil-marketplace"} component={NILMarketplace} />
      <Route path={"/nil-portal"} component={NILPortal} />
      <Route path={"/messages"} component={Messages} />
      <Route path={"/founder-story"} component={FounderStory} />
      <Route path={"/faith"} component={Faith} />
      
      {/* Empire Features - Tiered Services */}
      <Route path={"/pricing"} component={Pricing} />
      <Route path={"/ai-credits"} component={Pricing} />
      
      {/* National Signing Day */}
      <Route path={"/signing-day"} component={SigningDay} />
      
      {/* User Dashboard */}
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/athlete-dashboard"} component={AthleteDashboard} />
      <Route path={"/athlete"} component={AthleteDashboard} />
      
      {/* AI Bots */}
      <Route path={"/ai/training"} component={AITrainingBot} />
      <Route path={"/account"} component={Dashboard} />
      <Route path={"/profile"} component={Dashboard} />
      
      {/* E-Commerce - Amazon Model */}
      <Route path={"/store"} component={Store} />
      <Route path={"/shop"} component={Store} />
      
      {/* Career Portal - LinkedIn for Athletes */}
      <Route path={"/careers"} component={Careers} />
      <Route path={"/jobs"} component={Careers} />
      
      {/* Medical & Orthopedics */}
      <Route path={"/medical"} component={Medical} />
      <Route path={"/orthopedics"} component={Medical} />
      <Route path={"/health"} component={Medical} />
      
      {/* Training & Gym */}
      <Route path={"/training"} component={Training} />
      <Route path={"/gym"} component={Training} />
      <Route path={"/workouts"} component={Training} />
      
      {/* Veterans Support */}
      <Route path={"/veterans"} component={Veterans} />
      <Route path={"/military-division"} component={MilitaryDivision} />
      <Route path={"/operation-warrior-pipeline"} component={MilitaryDivision} />
      
      {/* Music & Entertainment */}
      <Route path={"/music"} component={Music} />
      <Route path={"/playlists"} component={Music} />
      
      {/* Mobile Apps */}
      <Route path={"/apps"} component={Apps} />
      <Route path={"/download"} component={Apps} />
      
      {/* White-Label Sport Platforms */}
      <Route path={"/diamond-grind"} component={DiamondGrind} />
      <Route path={"/baseball"} component={DiamondGrind} />
      
      {/* Coming Soon - Other White-Label Apps */}
      <Route path={"/court-kings"} component={() => <ComingSoon title="Court Kings" description="Elite basketball platform with rankings, recruiting, training, and exposure. Dominate the court." icon="🏀" />} />
      <Route path={"/basketball"} component={() => <ComingSoon title="Court Kings" description="Elite basketball platform with rankings, recruiting, training, and exposure. Dominate the court." icon="🏀" />} />
      
      <Route path={"/gridiron-nexus"} component={() => <ComingSoon title="Gridiron Nexus" description="Football recruiting, film analysis, combine prep, and NIL opportunities. Own the field." icon="🏈" />} />
      <Route path={"/football"} component={() => <ComingSoon title="Gridiron Nexus" description="Football recruiting, film analysis, combine prep, and NIL opportunities. Own the field." icon="🏈" />} />
      
      <Route path={"/pitch-pulse"} component={() => <ComingSoon title="Pitch Pulse" description="Soccer recruiting, club connections, and international opportunities. Global game, global platform." icon="⚽" />} />
      <Route path={"/soccer"} component={() => <ComingSoon title="Pitch Pulse" description="Soccer recruiting, club connections, and international opportunities. Global game, global platform." icon="⚽" />} />
      
      <Route path={"/reel-masters"} component={() => <ComingSoon title="Reel Masters" description="Find fishing spots, log catches, compete in tournaments, and connect with the fishing community." icon="🎣" />} />
      <Route path={"/fishing"} component={() => <ComingSoon title="Reel Masters" description="Find fishing spots, log catches, compete in tournaments, and connect with the fishing community." icon="🎣" />} />
      
      <Route path={"/fairway-elite"} component={() => <ComingSoon title="Fairway Elite" description="Golf handicap tracking, course finder, tee times, and tournament play. Elevate your game." icon="⛳" />} />
      <Route path={"/golf"} component={() => <ComingSoon title="Fairway Elite" description="Golf handicap tracking, course finder, tee times, and tournament play. Elevate your game." icon="⛳" />} />
      
      <Route path={"/hunt-pro"} component={() => <ComingSoon title="Hunt Pro" description="Hunting spots, harvest tracking, license management, and gear marketplace. Hunt smarter." icon="🦌" />} />
      <Route path={"/hunting"} component={() => <ComingSoon title="Hunt Pro" description="Hunting spots, harvest tracking, license management, and gear marketplace. Hunt smarter." icon="🦌" />} />
      
      <Route path={"/ice-breakers"} component={() => <ComingSoon title="Ice Breakers" description="Hockey recruiting, showcase events, and NHL draft prep. Own the ice." icon="🏒" />} />
      <Route path={"/hockey"} component={() => <ComingSoon title="Ice Breakers" description="Hockey recruiting, showcase events, and NHL draft prep. Own the ice." icon="🏒" />} />
      
      <Route path={"/net-setters"} component={() => <ComingSoon title="Net Setters" description="Volleyball recruiting, beach and indoor rankings, and club connections. Rise above the net." icon="🏐" />} />
      <Route path={"/volleyball"} component={() => <ComingSoon title="Net Setters" description="Volleyball recruiting, beach and indoor rankings, and club connections. Rise above the net." icon="🏐" />} />
      
      <Route path={"/track-elite"} component={() => <ComingSoon title="Track Elite" description="Track & field recruiting, meet results, and Olympic pathway. Chase greatness." icon="🏃" />} />
      <Route path={"/track"} component={() => <ComingSoon title="Track Elite" description="Track & field recruiting, meet results, and Olympic pathway. Chase greatness." icon="🏃" />} />
      
      <Route path={"/swim-surge"} component={() => <ComingSoon title="Swim Surge" description="Swimming recruiting, time tracking, and championship prep. Make waves." icon="🏊" />} />
      <Route path={"/swimming"} component={() => <ComingSoon title="Swim Surge" description="Swimming recruiting, time tracking, and championship prep. Make waves." icon="🏊" />} />
      
      <Route path={"/mat-warriors"} component={() => <ComingSoon title="Mat Warriors" description="Wrestling recruiting, tournament brackets, and weight management. Dominate the mat." icon="🤼" />} />
      <Route path={"/wrestling"} component={() => <ComingSoon title="Mat Warriors" description="Wrestling recruiting, tournament brackets, and weight management. Dominate the mat." icon="🤼" />} />
      
      <Route path={"/court-kings"} component={() => <ComingSoon title="Court Kings" description="Tennis recruiting, rankings, and tournament play. Rule the court." icon="🎾" />} />
      <Route path={"/tennis"} component={() => <ComingSoon title="Court Kings" description="Tennis recruiting, rankings, and tournament play. Rule the court." icon="🎾" />} />
      
      <Route path={"/lacrosse-legends"} component={() => <ComingSoon title="Lacrosse Legends" description="Lacrosse recruiting, club connections, and showcase events. Write your legacy." icon="🥍" />} />
      <Route path={"/lacrosse"} component={() => <ComingSoon title="Lacrosse Legends" description="Lacrosse recruiting, club connections, and showcase events. Write your legacy." icon="🥍" />} />
      
      {/* Media Showcase */}
      <Route path={"/media"} component={MediaShowcase} />
      <Route path={"/videos"} component={MediaShowcase} />
      <Route path={"/showcase"} component={MediaShowcase} />
      
      {/* Project Management */}
      <Route path={"/project-management"} component={ProjectManagement} />
      <Route path={"/pm"} component={ProjectManagement} />
      
      {/* Corporate Pages */}
      <Route path={"/dhg"} component={DHGCorporate} />
      <Route path={"/fuel-bots"} component={FuelBots} />
      <Route path={"/ai-companions"} component={FuelBots} />
      <Route path={"/fuelbots"} component={FuelBots} />
      <Route path={"/dozier-holdings"} component={DHGCorporate} />
      <Route path={"/softmor"} component={Softmor} />
      <Route path={"/softmor-inc"} component={Softmor} />
      <Route path={"/dashboard/pm"} component={ProjectManagement} />
      
      {/* Quick Links Hub */}
      <Route path={"/hub"} component={QuickLinksHub} />
      <Route path={"/quick-links"} component={QuickLinksHub} />
      <Route path={"/systems"} component={QuickLinksHub} />
      
      {/* Investor Hub */}
      <Route path={"/investor-hub"} component={InvestorHub} />
      <Route path={"/investors"} component={InvestorHub} />
      <Route path={"/invest"} component={InvestorHub} />
      
      {/* Team Page */}
      <Route path={"/team"} component={Team} />
      <Route path={"/checklist"} component={ProjectChecklist} />
      <Route path={"/leadership"} component={Team} />
      
      {/* Partner Portal */}
      <Route path={"/partner-portal"} component={PartnerPortal} />
      <Route path={"/partners"} component={PartnerPortal} />
      
      {/* Legacy Coming Soon */}
      <Route path={"/messenger"} component={() => <ComingSoon title="Messenger" description="Real-time messaging platform for athletes, coaches, and brands. Connect, collaborate, and communicate seamlessly." icon="💬" />} />
      
      {/* 404 */}
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <BrandingHeader />
          <UnifiedNav />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
