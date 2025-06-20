import { Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

// Import pages
import Dashboard from "@/pages/edu/dashboard";
import LearningPaths from "@/pages/edu/learning-paths";
import CreatePath from "@/pages/edu/create-path";
import Study from "@/pages/edu/study";
import Materials from "@/pages/edu/materials";
import Progress from "@/pages/edu/progress";
import Profile from "@/pages/edu/profile";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/trilhas" component={LearningPaths} />
      <Route path="/criar-trilha" component={CreatePath} />
      <Route path="/estudar/:pathId?" component={Study} />
      <Route path="/materiais" component={Materials} />
      <Route path="/progresso" component={Progress} />
      <Route path="/perfil" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <Router />
        <Toaster />
      </div>
    </QueryClientProvider>
  );
}

export default App;