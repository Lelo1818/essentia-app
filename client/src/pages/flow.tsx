import { Switch, Route } from "wouter";
import { queryClient } from "@/lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navigation from "@/components/layout/navigation";
import MobileNavigation from "@/components/layout/mobile-navigation";
import { FloatingAIAssistant, ScrollToTop, LiveStats } from "@/components/enhanced/floating-elements";
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
import MoodAnalysisPage from "@/pages/mood-analysis";
import CashbackMarketplacePage from "@/pages/cashback-marketplace";
import AgendarPagamentos from "@/pages/agendar-pagamentos";
import SimularCenarios from "@/pages/simular-cenarios";
import RenegociarDividas from "@/pages/renegociar-dividas";

function Router() {
  return (
    <Switch>
      <Route path="/flow" component={Dashboard} />
      <Route path="/flow/income" component={Income} />
      <Route path="/flow/expenses" component={Expenses} />
      <Route path="/flow/planning" component={Planning} />
      <Route path="/flow/goals" component={Goals} />
      <Route path="/flow/nft-achievements" component={NFTAchievements} />
      <Route path="/flow/mood-analysis" component={MoodAnalysisPage} />
      <Route path="/flow/cashback-marketplace" component={CashbackMarketplacePage} />
      <Route path="/flow/agendar-pagamentos" component={AgendarPagamentos} />
      <Route path="/flow/simular-cenarios" component={SimularCenarios} />
      <Route path="/flow/renegociar-dividas" component={RenegociarDividas} />
      <Route path="/flow/ofertas" component={Ofertas} />
      <Route path="/flow/cupons" component={Cupons} />
      <Route path="/flow/educacao" component={Educacao} />
      <Route path="/flow/dividas" component={Dividas} />
      <Route path="/flow/milhas" component={Milhas} />
      <Route path="/flow/feedback-ia" component={FeedbackIA} />
      <Route path="/flow/familias" component={Familias} />
      <Route path="/flow/ocr-avancado" component={OcrAvancado} />
      <Route path="/flow/profile" component={Profile} />
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default function FlowApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navigation />
          <MobileNavigation />
          
          <main className="lg:pl-72">
            <Router />
          </main>

          <FloatingAIAssistant />
          <ScrollToTop />
          <LiveStats />
        </div>
        
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}