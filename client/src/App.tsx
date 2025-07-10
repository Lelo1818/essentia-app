import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
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
import Purpose from "@/pages/purpose";
import Edu from "@/pages/edu";
import InvestorDemo from "@/pages/investor-demo";
import NotFound from "@/pages/not-found";
import NFTAchievements from "@/pages/nft-achievements";
import MoodAnalysisPage from "@/pages/mood-analysis";
import CashbackMarketplacePage from "@/pages/cashback-marketplace";
import CashbackMerit from "@/pages/cashback-merit";
import PainelValidacao from "@/pages/painel-validacao";
import TesteAutomatico from "@/pages/teste-automatico";
import ChecklistExecucao from "@/pages/checklist-execucao";
import RelatorioFinal from "@/pages/relatorio-final";
import AgendarPagamentos from "@/pages/agendar-pagamentos";
import FluxoCaixa from "@/pages/fluxo-caixa";
import SimularCenarios from "@/pages/simular-cenarios";
import RenegociarDividas from "@/pages/renegociar-dividas";
import FlowKids from "@/pages/flow-kids";
import DashboardUnificado from "@/pages/dashboard-unificado";
import FlowKidsStandalone from "@/pages/flow-kids-standalone";
import KidsApp from "./App-kids";
import EcosystemApp from "./App-ecosystem";
import FlowApp from "./App-flow";
import FlowWorking from "@/pages/flow-working";
import EduApp from "./App-edu";
import PurposeApp from "./App-purpose";
import ContaFamilia from "@/pages/conta-familia";
import EduVieClean from "@/pages/eduvie-clean";
import EduVieStandalone from "@/pages/eduvie-standalone";
import EduVibeFunctional from "@/pages/eduvibe-functional";
import EduVibeEnhanced from "@/pages/eduvibe-enhanced";
import EduVibeDirect from "@/pages/eduvibe-direct";
import FlowStandalone from "@/pages/flow-standalone";
import MobileTest from "./pages/mobile-test";
import MinimalTest from "./pages/minimal-test";
import SimpleApp from "./App-simple";
import SuperSimple from "./pages/super-simple";
import EcosystemSelector from "@/pages/ecosystem-selector";
import Investments from "@/pages/investments";


function Router() {
  return (
    <Switch>
      <Route path="/" component={EduVibeDirect} />
      <Route path="/flow" component={FlowWorking} />
      <Route path="/kids" component={KidsApp} />
      <Route path="/flow-kids" component={FlowKidsStandalone} />
      <Route path="/dashboard-unificado" component={DashboardUnificado} />
      <Route path="/kids-standalone" component={FlowKidsStandalone} />
      <Route path="/conta-familia" component={ContaFamilia} />
      <Route path="/edu" component={EduApp} />
      <Route path="/eduvie-clean" component={EduVieClean} />
      <Route path="/eduvie-standalone" component={EduVieStandalone} />
      <Route path="/eduvibe-functional" component={EduVibeFunctional} />
      <Route path="/eduvibe-enhanced" component={EduVibeEnhanced} />
      <Route path="/purpose" component={PurposeApp} />
      <Route path="/ecosystem" component={EcosystemApp} />
      <Route path="/ecosystem-selector" component={EcosystemSelector} />
      <Route path="/flow-dashboard" component={Dashboard} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/investor-demo" component={InvestorDemo} />
      <Route path="/mobile-test" component={MobileTest} />
      <Route path="/minimal-test" component={MinimalTest} />
      <Route path="/simple-test" component={SimpleApp} />
      <Route path="/kids-simple" component={SimpleApp} />
      <Route path="/flow-simple" component={SimpleApp} />
      <Route path="/super-simple" component={SuperSimple} />
      <Route path="/income" component={Income} />
      <Route path="/expenses" component={Expenses} />
      <Route path="/planning" component={Planning} />
      <Route path="/goals" component={Goals} />
      <Route path="/nft-achievements" component={NFTAchievements} />
      <Route path="/mood-analysis" component={MoodAnalysisPage} />
      <Route path="/cashback-marketplace" component={CashbackMarketplacePage} />
      <Route path="/agendar-pagamentos" component={AgendarPagamentos} />
      <Route path="/simular-cenarios" component={SimularCenarios} />
      <Route path="/renegociar-dividas" component={RenegociarDividas} />
      <Route path="/fluxo-caixa" component={FluxoCaixa} />
      <Route path="/ofertas" component={Ofertas} />
      <Route path="/cupons" component={Cupons} />
      <Route path="/educacao" component={Educacao} />
      <Route path="/dividas" component={Dividas} />
      <Route path="/milhas" component={Milhas} />
      <Route path="/feedback-ia" component={FeedbackIA} />
      <Route path="/familias" component={Familias} />
      <Route path="/ocr-avancado" component={OcrAvancado} />
      <Route path="/cashback-merit" component={CashbackMerit} />
      <Route path="/painel-validacao" component={PainelValidacao} />
      <Route path="/teste-automatico" component={TesteAutomatico} />
      <Route path="/checklist-execucao" component={ChecklistExecucao} />
      <Route path="/relatorio-final" component={RelatorioFinal} />
      <Route path="/profile" component={Profile} />
      <Route path="/investments" component={Investments} />
      <Route path="/flow-standalone" component={FlowStandalone} />
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
          
          {/* Mobile Touch Optimization */}
          <style>{`
            @media (max-width: 768px) {
              * { 
                touch-action: manipulation;
                -webkit-tap-highlight-color: transparent;
              }
              button, a, [role="button"] {
                min-height: 44px;
                min-width: 44px;
              }
            }
          `}</style>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
