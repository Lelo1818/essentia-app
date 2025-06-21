import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  CreditCard,
  Shield,
  Receipt,
  Gift,
  Plane,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export default function FinancialCards() {
  // Mock financial data - replace with real API calls
  const financialData = {
    creditCards: {
      totalLimit: 90000,
      totalBalance: 24600,
      count: 3,
      nextDue: "15/06",
      utilizationPercentage: 27
    },
    insurance: {
      totalCoverage: 1530000,
      monthlyPremium: 1816,
      activePolicies: 4,
      nearExpiry: 1
    },
    taxes: {
      totalPaid: 45680,
      totalDeductions: 8950,
      estimatedRefund: 1200,
      status: "Declarado"
    },
    miles: {
      totalMiles: 73980,
      programs: 2,
      nearExpiry: 8750,
      tierStatus: "Gold"
    }
  };

  const getUtilizationColor = (percentage: number) => {
    if (percentage >= 80) return "text-red-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-green-600";
  };

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      {/* Credit Cards */}
      <Card className="hover:shadow-lg transition-shadow border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Cartões</CardTitle>
          <CreditCard className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-purple-700">
              R$ {financialData.creditCards.totalLimit.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Limite total em {financialData.creditCards.count} cartões
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Utilização:</span>
              <span className={`text-xs font-bold ${getUtilizationColor(financialData.creditCards.utilizationPercentage)}`}>
                {financialData.creditCards.utilizationPercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Próximo venc:</span>
              <span className="text-xs font-medium">{financialData.creditCards.nextDue}</span>
            </div>
            <Link href="/flow/cartoes">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Ver Cartões <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Insurance */}
      <Card className="hover:shadow-lg transition-shadow border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Seguros</CardTitle>
          <Shield className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-blue-700">
              R$ {(financialData.insurance.totalCoverage / 1000).toFixed(0)}K
            </div>
            <p className="text-xs text-muted-foreground">
              Cobertura total
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Prêmio mensal:</span>
              <span className="text-xs font-medium">R$ {financialData.insurance.monthlyPremium}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Apólices ativas:</span>
              <div className="flex items-center gap-1">
                <span className="text-xs font-medium">{financialData.insurance.activePolicies}</span>
                {financialData.insurance.nearExpiry > 0 && (
                  <AlertCircle className="w-3 h-3 text-yellow-500" />
                )}
              </div>
            </div>
            <Link href="/flow/seguros">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Ver Seguros <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Taxes */}
      <Card className="hover:shadow-lg transition-shadow border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Impostos</CardTitle>
          <Receipt className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-green-700">
              R$ {financialData.taxes.totalPaid.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total pago em 2024
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Deduções:</span>
              <span className="text-xs font-medium">R$ {financialData.taxes.totalDeductions.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Status:</span>
              <Badge variant="secondary" className="text-xs">{financialData.taxes.status}</Badge>
            </div>
            <Link href="/flow/impostos">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Ver Impostos <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Miles */}
      <Card className="hover:shadow-lg transition-shadow border-orange-200 bg-gradient-to-br from-orange-50 to-yellow-50">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Milhas</CardTitle>
          <Plane className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="text-2xl font-bold text-orange-700">
              {financialData.miles.totalMiles.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              Total de milhas
            </p>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Programas:</span>
              <span className="text-xs font-medium">{financialData.miles.programs}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Status:</span>
              <Badge variant="outline" className="text-xs border-orange-300 text-orange-700">
                {financialData.miles.tierStatus}
              </Badge>
            </div>
            <Link href="/flow/milhas">
              <Button variant="outline" size="sm" className="w-full mt-2">
                Ver Milhas <ArrowRight className="w-3 h-3 ml-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}