import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import PurposeNavigation from "@/components/purpose/layout/navigation";
import PurposeMobileNavigation from "@/components/purpose/layout/mobile-navigation";
import PurposeDashboard from "@/pages/purpose/dashboard";
import Journey from "@/pages/purpose/journey";
import Diary from "@/pages/purpose/diary";
import PurposeMap from "@/pages/purpose/purpose-map";
import Inspiration from "@/pages/purpose/inspiration";
import PurposeProfile from "@/pages/purpose/profile";
import PurposeNotFound from "@/pages/purpose/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={PurposeDashboard} />
      <Route path="/jornada" component={Journey} />
      <Route path="/diario" component={Diary} />
      <Route path="/mapa" component={PurposeMap} />
      <Route path="/inspiracao" component={Inspiration} />
      <Route path="/perfil" component={PurposeProfile} />
      <Route component={PurposeNotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
          <PurposeNavigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
            <Router />
          </main>
          <PurposeMobileNavigation />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;