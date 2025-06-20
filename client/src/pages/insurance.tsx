import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Shield, 
  Heart, 
  Car, 
  Home, 
  Plane, 
  AlertTriangle,
  CheckCircle,
  Clock,
  DollarSign,
  FileText,
  Plus,
  Calculator,
  TrendingUp,
  Phone,
  MessageCircle
} from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function Insurance() {
  const [newInsuranceOpen, setNewInsuranceOpen] = useState(false);
  const [claimModalOpen, setClaimModalOpen] = useState(false);
  const [compareModalOpen, setCompareModalOpen] = useState(false);
  const { toast } = useToast();

  // Dados simulados dos seguros do usuário
  const userInsurances = [
    {
      id: 1,
      type: "Saúde",
      provider: "Unimed",
      plan: "Nacional Plus",
      premium: 680,
      coverage: 500000,
      status: "Ativo",
      renewalDate: "2025-12-15",
      benefits: ["Consultas ilimitadas", "Emergência 24h", "Exames", "Cirurgias"],
      icon: Heart
    },
    {
      id: 2,
      type: "Vida",
      provider: "Porto Seguro",
      plan: "Vida Mais",
      premium: 120,
      coverage: 250000,
      status: "Ativo", 
      renewalDate: "2025-09-20",
      benefits: ["Morte", "Invalidez", "Doenças graves", "Assistência funeral"],
      icon: Shield
    },
    {
      id: 3,
      type: "Auto",
      provider: "SulAmérica",
      plan: "Auto Completo",
      premium: 285,
      coverage: 85000,
      status: "Ativo",
      renewalDate: "2025-08-10",
      benefits: ["Colisão", "Roubo/Furto", "Terceiros", "Assistência 24h"],
      icon: Car
    },
    {
      id: 4,
      type: "Residencial",
      provider: "Mapfre",
      plan: "Casa Protegida",
      premium: 95,
      coverage: 300000,
      status: "Pendente",
      renewalDate: "2025-07-05",
      benefits: ["Incêndio", "Roubo", "Danos elétricos", "Responsabilidade civil"],
      icon: Home
    }
  ];

  const totalPremiums = userInsurances.reduce((sum, insurance) => sum + insurance.premium, 0);
  const totalCoverage = userInsurances.reduce((sum, insurance) => sum + insurance.coverage, 0);
  const activeInsurances = userInsurances.filter(ins => ins.status === "Ativo").length;

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Ativo": return "bg-green-100 text-green-800";
      case "Pendente": return "bg-yellow-100 text-yellow-800";
      case "Vencido": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Saúde": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Vida": return "bg-green-100 text-green-800 border-green-200";
      case "Auto": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Residencial": return "bg-orange-100 text-orange-800 border-orange-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const recentClaims = [
    {
      id: 1,
      type: "Saúde",
      description: "Consulta Cardiologista",
      amount: 350,
      status: "Aprovado",
      date: "2025-06-15",
      reimbursement: 280
    },
    {
      id: 2,
      type: "Auto",
      description: "Reparo para-choque",
      amount: 1800,
      status: "Em análise",
      date: "2025-06-10"
    }
  ];

  const insuranceRecommendations = [
    {
      type: "Viagem",
      reason: "Você tem uma viagem marcada",
      priority: "Alta",
      estimatedCost: 45,
      coverage: 50000
    },
    {
      type: "Celular",
      reason: "Proteja seu smartphone",
      priority: "Média",
      estimatedCost: 25,
      coverage: 3000
    },
    {
      type: "Dental",
      reason: "Complemento ao plano de saúde",
      priority: "Baixa",
      estimatedCost: 35,
      coverage: 8000
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Gestão de Seguros</h1>
            <p className="text-gray-600 mt-2">Proteja o que mais importa para você</p>
          </div>
          <div className="flex gap-3">
            <Button onClick={() => setNewInsuranceOpen(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Novo Seguro
            </Button>
            <Button variant="outline" onClick={() => setCompareModalOpen(true)}>
              <Calculator className="w-4 h-4 mr-2" />
              Comparar
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Seguros Ativos</p>
                  <p className="text-2xl font-bold text-blue-600">{activeInsurances}</p>
                </div>
                <Shield className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Prêmios Mensais</p>
                  <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalPremiums)}</p>
                </div>
                <DollarSign className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Cobertura Total</p>
                  <p className="text-2xl font-bold text-green-600">{formatCurrency(totalCoverage)}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Economia Anual</p>
                  <p className="text-2xl font-bold text-purple-600">R$ 2.400</p>
                </div>
                <CheckCircle className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="policies">Apólices</TabsTrigger>
            <TabsTrigger value="claims">Sinistros</TabsTrigger>
            <TabsTrigger value="recommendations">Recomendações</TabsTrigger>
            <TabsTrigger value="assistance">Assistência</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Distribuição por Tipo</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userInsurances.map((insurance) => {
                      const percentage = (insurance.premium / totalPremiums) * 100;
                      return (
                        <div key={insurance.id} className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm font-medium">{insurance.type}</span>
                            <span className="text-sm font-semibold">{formatCurrency(insurance.premium)}</span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Próximos Vencimentos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {userInsurances
                      .sort((a, b) => new Date(a.renewalDate).getTime() - new Date(b.renewalDate).getTime())
                      .slice(0, 3)
                      .map((insurance) => (
                        <div key={insurance.id} className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <Clock className="w-5 h-5 text-yellow-600" />
                          <div className="flex-1">
                            <p className="font-semibold text-yellow-800">{insurance.type} - {insurance.provider}</p>
                            <p className="text-sm text-yellow-600">Vence: {new Date(insurance.renewalDate).toLocaleDateString()}</p>
                          </div>
                          <Button size="sm" variant="outline">Renovar</Button>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="policies" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {userInsurances.map((insurance) => {
                const Icon = insurance.icon;
                return (
                  <Card key={insurance.id} className={`border-l-4 ${getTypeColor(insurance.type)}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="w-6 h-6" />
                          <div>
                            <CardTitle className="text-lg">{insurance.type}</CardTitle>
                            <p className="text-sm text-gray-500">{insurance.provider} - {insurance.plan}</p>
                          </div>
                        </div>
                        <Badge className={getStatusColor(insurance.status)}>
                          {insurance.status}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <p className="text-sm text-gray-500">Prêmio Mensal</p>
                            <p className="font-semibold">{formatCurrency(insurance.premium)}</p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-500">Cobertura</p>
                            <p className="font-semibold">{formatCurrency(insurance.coverage)}</p>
                          </div>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-2">Benefícios Inclusos</p>
                          <div className="flex flex-wrap gap-1">
                            {insurance.benefits.map((benefit, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {benefit}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" className="flex-1">
                            <FileText className="w-4 h-4 mr-2" />
                            Ver Apólice
                          </Button>
                          <Button variant="outline" size="sm" className="flex-1" onClick={() => setClaimModalOpen(true)}>
                            <Plus className="w-4 h-4 mr-2" />
                            Sinistro
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="claims" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Sinistros Recentes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentClaims.map((claim) => (
                      <div key={claim.id} className="p-4 border border-gray-200 rounded-lg">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold">{claim.description}</h4>
                            <p className="text-sm text-gray-500">{claim.type} • {claim.date}</p>
                            <p className="text-sm font-semibold mt-1">Valor: {formatCurrency(claim.amount)}</p>
                            {claim.reimbursement && (
                              <p className="text-sm text-green-600">Reembolso: {formatCurrency(claim.reimbursement)}</p>
                            )}
                          </div>
                          <Badge className={claim.status === "Aprovado" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}>
                            {claim.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Abrir Novo Sinistro</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <Label>Tipo de Seguro</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Selecionar seguro" />
                        </SelectTrigger>
                        <SelectContent>
                          {userInsurances.map((insurance) => (
                            <SelectItem key={insurance.id} value={insurance.id.toString()}>
                              {insurance.type} - {insurance.provider}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Descrição do Ocorrido</Label>
                      <Input placeholder="Descreva o que aconteceu..." />
                    </div>

                    <div>
                      <Label>Data do Ocorrido</Label>
                      <Input type="date" />
                    </div>

                    <div>
                      <Label>Valor Estimado</Label>
                      <Input type="number" placeholder="R$ 0,00" />
                    </div>

                    <Button className="w-full" onClick={() => setClaimModalOpen(true)}>
                      Abrir Sinistro
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Seguros Recomendados</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {insuranceRecommendations.map((rec, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-3">
                        <Plane className="w-5 h-5 text-blue-500" />
                        <h4 className="font-semibold">{rec.type}</h4>
                        <Badge className={rec.priority === "Alta" ? "bg-red-100 text-red-800" : rec.priority === "Média" ? "bg-yellow-100 text-yellow-800" : "bg-green-100 text-green-800"}>
                          {rec.priority}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{rec.reason}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Custo estimado</span>
                          <span className="font-semibold">{formatCurrency(rec.estimatedCost)}/mês</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Cobertura</span>
                          <span className="font-semibold">{formatCurrency(rec.coverage)}</span>
                        </div>
                      </div>
                      <Button className="w-full mt-3" variant="outline">Solicitar Cotação</Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="assistance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contatos de Emergência</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {userInsurances.map((insurance) => (
                      <div key={insurance.id} className="p-4 border border-gray-200 rounded-lg">
                        <h4 className="font-semibold mb-2">{insurance.type} - {insurance.provider}</h4>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="flex-1">
                            <Phone className="w-4 h-4 mr-2" />
                            0800-123-456
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Chat
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Assistência 24h</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                      <h4 className="font-semibold text-red-800 mb-2">Emergência Médica</h4>
                      <p className="text-sm text-red-600 mb-3">Ambulância, pronto-socorro, UTI</p>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <Phone className="w-4 h-4 mr-2" />
                        192 - SAMU
                      </Button>
                    </div>

                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <h4 className="font-semibold text-orange-800 mb-2">Guincho Auto</h4>
                      <p className="text-sm text-orange-600 mb-3">Reboque, pane seca, pneu furado</p>
                      <Button className="w-full bg-orange-600 hover:bg-orange-700">
                        <Phone className="w-4 h-4 mr-2" />
                        0800-777-3000
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <h4 className="font-semibold text-blue-800 mb-2">Chaveiro</h4>
                      <p className="text-sm text-blue-600 mb-3">Abertura de portas, troca de fechaduras</p>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <Phone className="w-4 h-4 mr-2" />
                        0800-555-2000
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Modals */}
        <Dialog open={newInsuranceOpen} onOpenChange={setNewInsuranceOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Contratar Novo Seguro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Tipo de Seguro</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="vida">Vida</SelectItem>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="residencial">Residencial</SelectItem>
                    <SelectItem value="viagem">Viagem</SelectItem>
                    <SelectItem value="celular">Celular</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Solicitar Cotações</Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={claimModalOpen} onOpenChange={setClaimModalOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Abrir Sinistro</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Seguro</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecionar seguro" />
                  </SelectTrigger>
                  <SelectContent>
                    {userInsurances.map((insurance) => (
                      <SelectItem key={insurance.id} value={insurance.id.toString()}>
                        {insurance.type} - {insurance.provider}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Descrição</Label>
                <Input placeholder="O que aconteceu?" />
              </div>
              <div>
                <Label>Data</Label>
                <Input type="date" />
              </div>
              <Button className="w-full">Enviar Sinistro</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}