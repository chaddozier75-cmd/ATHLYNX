import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import EarlyAccess from "./pages/EarlyAccess";
import AthletePlaybook from "./pages/AthletePlaybook";
import TransferPortal from "./pages/TransferPortal";
import NILMarketplace from "./pages/NILMarketplace";
import Messages from "./pages/Messages";
import FounderStory from "./pages/FounderStory";
import ComingSoon from "./pages/ComingSoon";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={EarlyAccess} />
      <Route path={"/home"} component={Home} />
      <Route path={"/playbook"} component={AthletePlaybook} />
      <Route path={"/transfer-portal"} component={TransferPortal} />
      <Route path={"/nil-marketplace"} component={NILMarketplace} />
      <Route path={"/messages"} component={Messages} />
      <Route path={"/founder-story"} component={FounderStory} />
      <Route path={"/messenger"} component={() => <ComingSoon title="Messenger" description="Real-time messaging platform for athletes, coaches, and brands. Connect, collaborate, and communicate seamlessly." icon="💬" />} />
      <Route path={"/diamond-grind"} component={() => <ComingSoon title="Diamond Grind" description="Elite baseball training platform with drills, analytics, and performance tracking. Grind your way to greatness." icon="💎" />} />
      <Route path={"/nil-portal"} component={() => <ComingSoon title="NIL Portal" description="Complete NIL marketplace connecting athletes with brands for endorsement deals, sponsorships, and partnerships." icon="💰" />} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
