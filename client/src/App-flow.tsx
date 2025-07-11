import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Dashboard from "@/pages/dashboard";
import ErrorBoundary from "@/components/error-boundary";


export default function FlowApp() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <div className="min-h-screen bg-gray-50">
            {/* Mobile Header */}
            <div className="md:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
              <div className="flex items-center justify-between px-4 py-3">
                <a 
                  href="/" 
                  className="flex items-center text-blue-600 font-semibold hover:text-blue-700 transition-colors"
                >
                  ← Voltar
                </a>
                <h1 className="text-lg font-bold text-blue-600">Flow</h1>
                <div className="w-16"></div>
              </div>
            </div>
            
            <main className="w-full">
              <Dashboard />
            </main>
            
            <Toaster />
          </div>
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}