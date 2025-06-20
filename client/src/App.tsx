import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import MobileNavigation from "@/components/layout/mobile-navigation";
import Dashboard from "@/pages/dashboard";
import Income from "@/pages/income";
import Expenses from "@/pages/expenses";
import Planning from "@/pages/planning";
import Goals from "@/pages/goals";
import Profile from "@/pages/profile";
import Ofertas from "@/pages/ofertas";
import Cupons from "@/pages/cupons";
import Educacao from "@/pages/educacao";
import Dividas from "@/pages/dividas";
import Milhas from "@/pages/milhas";
import FeedbackIA from "@/pages/feedback-ia";
import Familias from "@/pages/familias";
import OcrAvancado from "@/pages/ocr-avancado";
import NotFound from "@/pages/not-found";
import NFTAchievements from "@/pages/nft-achievements";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/income" component={Income} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/planning" component={Planning} />
      <Route path="/goals" component={Goals} />
      <Route path="/nft-achievements" component={NFTAchievements} />
      <Route path="/ofertas" component={Ofertas} />
      <Route path="/cupons" component={Cupons} />
      <Route path="/educacao" component={Educacao} />
      <Route path="/dividas" component={Dividas} />
      <Route path="/milhas" component={Milhas} />
      <Route path="/feedback-ia" component={FeedbackIA} />
      <Route path="/familias" component={Familias} />
      <Route path="/ocr-avancado" component={OcrAvancado} />
      <Route path="/profile" component={Profile} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50">
          <Navigation />
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-20 md:pb-8">
            <Router />
          </main>
          <MobileNavigation />
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
