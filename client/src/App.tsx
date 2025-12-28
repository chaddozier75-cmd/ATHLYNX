import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import AthletePlaybook from "./pages/AthletePlaybook";
import TransferPortal from "./pages/TransferPortal";
import NILMarketplace from "./pages/NILMarketplace";
import Messages from "./pages/Messages";
import Store from "./pages/Store";
import Fishing from "./pages/Fishing";
import Golf from "./pages/Golf";
import Hunting from "./pages/Hunting";
import CreateProfile from "./pages/CreateProfile";
import PlayerProfile from "./pages/PlayerProfile";
import RecruitingDatabase from "./pages/RecruitingDatabase";
import AIBots from "./pages/AIBots";
import CollegePage from "./pages/CollegePage";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/playbook"} component={AthletePlaybook} />
      <Route path={"/transfer-portal"} component={TransferPortal} />
      <Route path={"/nil-marketplace"} component={NILMarketplace} />
      <Route path={"/messages"} component={Messages} />
      <Route path={"/store"} component={Store} />
      <Route path={"/fishing"} component={Fishing} />
      <Route path={"/golf"} component={Golf} />
      <Route path={"/hunting"} component={Hunting} />
      <Route path={"/create-profile"} component={CreateProfile} />
      <Route path={"/player/:id"} component={PlayerProfile} />
      <Route path={"/recruiting"} component={RecruitingDatabase} />
      <Route path={"/ai-bots"} component={AIBots} />
      <Route path={"/college/:id"} component={CollegePage} />
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
