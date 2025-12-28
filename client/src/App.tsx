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

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/playbook"} component={AthletePlaybook} />
      <Route path={"/transfer-portal"} component={TransferPortal} />
      <Route path={"/nil-marketplace"} component={NILMarketplace} />
      <Route path={"/messages"} component={Messages} />
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
