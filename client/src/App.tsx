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
import DashboardWorking from "@/pages/dashboard-working";
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
import EduVibeSimple from "@/pages/eduvibe-simple";
import EduVibeCleanSimple from "@/pages/eduvibe-clean-simple";
import EduVibeV2 from "@/pages/eduvibe-v2";
import EduVibeV2Complete from "@/pages/eduvibe-v2-complete";
import EduVibeWillingham from "@/pages/eduvibe-willingham";
import EduVibeUniversal from "@/pages/eduvibe-universal";
import FlowStandalone from "@/pages/flow-standalone";
import MobileTest from "./pages/mobile-test";
import MinimalTest from "./pages/minimal-test";
import SimpleApp from "./App-simple";
import SuperSimple from "./pages/super-simple";
import EcosystemSelector from "@/pages/ecosystem-selector";
import Investments from "@/pages/investments";
import EduFocused from "@/pages/edu-focused";
import Portais from "@/pages/portais";
import EssentiaDemo from "@/pages/essentia-demo";
import EssentiaDemoAvancado from "@/pages/essentia-demo-avancado";
import EssentiaOficialDemo from "@/pages/essentia-oficial-demo";
import EssentiaPro from "@/pages/essentia-pro";
import EssentiaPremium from "@/pages/essentia-premium";
import EssentiaFinal from "@/pages/essentia-final";
import EssentiaPurposeStyle from "@/pages/essentia-purpose-style";
import EssentiaPurposeOriginal from "@/pages/essentia-purpose-original";
import EssentiaCleanDemo from "@/pages/essentia-clean-demo";
import EssentiaFinalClean from "@/pages/essentia-final-clean";
import EssentiaFluxo from "@/pages/essentia-fluxo";
import EssentiaPitch from "@/pages/essentia-pitch";
import PitchDeckStandalone from "@/pages/pitch-deck-standalone";
import EssentiaPitchPremium from "@/pages/essentia-pitch-premium-clean";
import EssentiaMVP from "@/pages/essentia-mvp";
import EssentiaGalaxias from "@/pages/essentia-galaxias";
import EssentiaGalaxiasFinal from "@/pages/essentia-galaxias-final";
import EssentiaDefinitive from "@/pages/essentia-definitive";
import EssentiaRenascido from "@/pages/essentia-renascido";
import EssentiaSimples from "@/pages/essentia-simples";
import EssentiaUnified from "@/pages/essentia-unified";
import EssentiaMega from "@/pages/essentia-mega";



function Router() {
  return (
    <Switch>
      <Route path="/" component={DashboardWorking} />
      <Route path="/flow" component={FlowWorking} />
      <Route path="/kids" component={KidsApp} />
      <Route path="/flow-kids" component={FlowKidsStandalone} />
      <Route path="/dashboard-unificado" component={DashboardWorking} />
      <Route path="/kids-standalone" component={FlowKidsStandalone} />
      <Route path="/conta-familia" component={ContaFamilia} />
      <Route path="/edu" component={EduApp} />
      <Route path="/eduvie-clean" component={EduVieClean} />
      <Route path="/eduvie-standalone" component={EduVieStandalone} />
      <Route path="/eduvibe-functional" component={EduVibeFunctional} />
      <Route path="/eduvibe-enhanced" component={EduVibeEnhanced} />
      <Route path="/eduvibe-direct" component={EduVibeDirect} />
      <Route path="/eduvibe" component={EduVibeCleanSimple} />
      <Route path="/eduvibe-simple" component={EduVibeSimple} />
      <Route path="/eduvibe-v2" component={EduVibeV2} />
      <Route path="/eduvibe-v2-complete" component={EduVibeV2Complete} />
      <Route path="/eduvibe-willingham" component={EduVibeWillingham} />
      <Route path="/eduvibe-universal" component={EduVibeUniversal} />
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
      <Route path="/edu-focused" component={EduFocused} />
      <Route path="/portais" component={Portais} />
      <Route path="/essentia-demo" component={EssentiaDemo} />
      <Route path="/essentia-demo-avancado" component={EssentiaDemoAvancado} />
      <Route path="/essentia-oficial-demo" component={EssentiaOficialDemo} />
      <Route path="/essentia-pro" component={EssentiaPro} />
      <Route path="/essentia-mvp" component={EssentiaMVP} />
      <Route path="/essentia-galaxias" component={EssentiaGalaxias} />
      <Route path="/essentia-galaxias-final" component={EssentiaGalaxiasFinal} />
      <Route path="/essentia-definitive" component={EssentiaDefinitive} />
      <Route path="/essentia-renascido" component={EssentiaRenascido} />
      <Route path="/essentia-simples" component={EssentiaSimples} />
      <Route path="/essentia-unified" component={EssentiaUnified} />
      <Route path="/essentia-mega" component={EssentiaMega} />
      <Route path="/essentia-purpose-style" component={EssentiaPurposeStyle} />
      <Route path="/essentia-purpose-original" component={EssentiaPurposeOriginal} />
      <Route path="/essentia-clean-demo" component={EssentiaCleanDemo} />
      <Route path="/essentia-final-clean" component={EssentiaFinalClean} />
      <Route path="/essentia-fluxo" component={EssentiaFluxo} />
      <Route path="/essentia-pitch" component={EssentiaPitch} />
      <Route path="/pitch-deck-standalone" component={PitchDeckStandalone} />
      <Route path="/essentia-pitch-premium" component={EssentiaPitchPremium} />
      <Route path="/essentia-premium" component={EssentiaPremium} />
      <Route path="/essentia-final" component={EssentiaFinal} />

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
