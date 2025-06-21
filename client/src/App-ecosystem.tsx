import { Route, Switch, useLocation } from "wouter";
import GlobalNavigation from "@/components/shared/global-navigation";
import EcosystemSelector from "@/pages/ecosystem-selector";
import FlowApp from "@/pages/flow";
import EduApp from "@/pages/edu";
import PurposeApp from "@/pages/purpose";
import KidsApp from "@/pages/kids";
import EpicDemo from "@/pages/epic-demo";


function App() {
  const [location] = useLocation();
  const isHomePage = location === '/';

  return (
    <div className="min-h-screen bg-gray-50">
      {!isHomePage && <GlobalNavigation />}
      
      <div className={!isHomePage ? "lg:ml-80" : ""}>
        <Switch>
          <Route path="/" component={EcosystemSelector} />
          <Route path="/flow" component={FlowApp} />
          <Route path="/edu" component={EduApp} />
          <Route path="/purpose" component={PurposeApp} />
          <Route path="/kids" component={KidsApp} />
          <Route path="/epic-demo" component={EpicDemo} />

          <Route>404 Page Not Found</Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;