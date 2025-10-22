import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Purpose from "@/pages/purpose";


export default function PurposeApp() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100">
          {/* Mobile Header */}
          <div className="lg:hidden sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b">
            <div className="flex items-center justify-between p-4">
              <a 
                href="/" 
                className="flex items-center text-purple-600 font-semibold hover:text-purple-700 transition-colors"
              >
                ← Ecossistema
              </a>
              <h1 className="text-lg font-bold text-purple-600">Essentia</h1>
              <div className="w-20"></div>
            </div>
          </div>
          
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 md:py-8">
            <Purpose />
          </main>
          
          <Toaster />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}