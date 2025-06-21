import { DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { AppLogo } from "@/components/ui/app-logo";
import QuickNavButton from "@/components/shared/quick-nav-button";
import { getCurrentUser } from "@/data/mock-users";

export default function FlowApp() {
  const currentUser = getCurrentUser();

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <QuickNavButton />
      <div className="max-w-7xl mx-auto space-y-6">
        <Card className="border-l-4 border-l-green-500 bg-gradient-to-r from-green-50 to-emerald-50">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <AppLogo variant="flow" />
                <div>
                  <CardTitle className="flex items-center text-2xl">
                    <DollarSign className="w-6 h-6 mr-3 text-green-600" />
                    Flow - Inteligência Financeira
                  </CardTitle>
                  <p className="text-gray-600 mt-2">
                    Seu assistente pessoal para prosperidade financeira
                  </p>
                </div>
              </div>
              <UserAvatar user={currentUser} />
            </div>
          </CardHeader>
        </Card>

        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-4">Flow - Em Desenvolvimento</h2>
            <p className="text-lg text-muted-foreground">
              Aplicativo de gestão financeira inteligente em construção
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}