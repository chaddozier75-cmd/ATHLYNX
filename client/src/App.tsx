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
      <Route path={"/hoop-empire"} component={() => <ComingSoon title="Hoop Empire" description="Elite basketball platform with rankings, recruiting, training, and exposure. Dominate the court." icon="🏀" />} />
      <Route path={"/basketball"} component={() => <ComingSoon title="Hoop Empire" description="Elite basketball platform with rankings, recruiting, training, and exposure. Dominate the court." icon="🏀" />} />
      
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
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
