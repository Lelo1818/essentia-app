import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Car, Home, Heart, Briefcase, Plus, AlertTriangle, CheckCircle, TrendingUp } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function Seguros() {
  const [selectedInsurance, setSelectedInsurance] = useState<any>(null);
  const { toast } = useToast();

  // Dados simulados de seguros baseados no perfil financeiro
  const seguros = [
    {
      id: 1,
      tipo: "Seguro de Vida",
      seguradora: "SulAmérica",
      cobertura: 500000,
      premioMensal: 89.90,
      status: "ativo",
      vencimento: "2025-12-15",
      beneficiarios: ["Maria Silva", "João Silva"],
      categoria: "vida",
      descricao: "Proteção financeira para sua família",
      coberturas: ["Morte natural", "Morte acidental", "Invalidez permanente"]
    },
    {
      id: 2,
      tipo: "Seguro Auto",
      seguradora: "Porto Seguro",
      cobertura: 45000,
      premioMensal: 180.50,
      status: "ativo",
      vencimento: "2025-08-20",
      veiculo: "Honda Civic 2022",
      categoria: "auto",
      descricao: "Proteção completa para seu veículo",
      coberturas: ["Colisão", "Furto", "Roubo", "Fenômenos naturais"]
    },
    {
      id: 3,
      tipo: "Seguro Residencial",
      seguradora: "Bradesco Seguros",
      cobertura: 300000,
      premioMensal: 65.00,
      status: "pendente",
      vencimento: "2025-10-10",
      endereco: "Rua das Flores, 123",
      categoria: "residencial",
      descricao: "Proteção para seu lar e patrimônio",
      coberturas: ["Incêndio", "Roubo", "Danos elétricos", "Responsabilidade civil"]
    },
    {
      id: 4,
      tipo: "Seguro Saúde",
      seguradora: "Unimed",
      cobertura: 0, // Ilimitado
      premioMensal: 450.00,
      status: "ativo",
      vencimento: "2025-11-30",
      plano: "Premium Nacional",
      categoria: "saude",
      descricao: "Assistência médica completa",
      coberturas: ["Consultas", "Exames", "Internações", "Cirurgias"]
    }
  ];

  const sugestoesSeguros = [
    {
      tipo: "Seguro Profissional",
      motivo: "Proteção contra responsabilidade civil profissional",
      coberturaRecomendada: 100000,
      premioEstimado: 95.00,
      prioridade: "média",
      categoria: "profissional"
    },
    {
      tipo: "Seguro Viagem",
      motivo: "Para suas próximas viagens internacionais",
      coberturaRecomendada: 60000,
      premioEstimado: 45.00,
      prioridade: "baixa",
      categoria: "viagem"
    }
  ];

  const totalPremioPago = seguros
    .filter(s => s.status === "ativo")
    .reduce((sum, s) => sum + s.premioMensal, 0);

  const totalCobertura = seguros
    .filter(s => s.status === "ativo")
    .reduce((sum, s) => sum + s.cobertura, 0);

  const getIcon = (categoria: string) => {
    const icons = {
      vida: Heart,
      auto: Car,
      residencial: Home,
      saude: Heart,
      profissional: Briefcase,
      viagem: Shield
    };
    return icons[categoria as keyof typeof icons] || Shield;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ativo": return "bg-green-100 text-green-800";
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "vencido": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const contratar = (tipoSeguro: string) => {
    toast({
      title: "Cotação Iniciada",
      description: `Preparando cotação para ${tipoSeguro}. Você será redirecionado para nossa parceira.`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🛡️ Seguros Inteligentes</h1>
          <p className="text-gray-600">Proteção completa baseada no seu perfil financeiro</p>
        </div>
        <Button onClick={() => contratar("Novo Seguro")}>
          <Plus className="w-4 h-4 mr-2" />
          Contratar Seguro
        </Button>
      </div>

      {/* Cards de Resumo */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Seguros Ativos</p>
                <p className="text-2xl font-bold text-green-600">
                  {seguros.filter(s => s.status === "ativo").length}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cobertura Total</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalCobertura > 0 ? formatCurrency(totalCobertura) : "Ilimitado"}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Shield className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Gasto Mensal</p>
                <p className="text-2xl font-bold text-purple-600">
                  {formatCurrency(totalPremioPago)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <TrendingUp className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Proteção Score</p>
                <p className="text-2xl font-bold text-yellow-600">85%</p>
                <p className="text-xs text-gray-500 mt-1">Muito protegido</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Shield className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Seguros Ativos */}
      <Card>
        <CardHeader>
          <CardTitle>Seus Seguros Ativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {seguros.map((seguro) => {
              const Icon = getIcon(seguro.categoria);
              return (
                <div key={seguro.id} className="p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-full">
                        <Icon className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{seguro.tipo}</h3>
                        <p className="text-sm text-gray-600">{seguro.seguradora}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(seguro.status)}>
                      {seguro.status}
                    </Badge>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{seguro.descricao}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Cobertura:</span>
                      <span className="font-medium">
                        {seguro.cobertura > 0 ? formatCurrency(seguro.cobertura) : "Ilimitado"}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Prêmio mensal:</span>
                      <span className="font-medium">{formatCurrency(seguro.premioMensal)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Vencimento:</span>
                      <span className="font-medium">{new Date(seguro.vencimento).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-3 border-t">
                    <p className="text-xs text-gray-500 mb-2">Coberturas principais:</p>
                    <div className="flex flex-wrap gap-1">
                      {seguro.coberturas.slice(0, 3).map((cobertura, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {cobertura}
                        </Badge>
                      ))}
                      {seguro.coberturas.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{seguro.coberturas.length - 3} mais
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Sugestões Inteligentes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Sugestões de Proteção
          </CardTitle>
          <p className="text-sm text-gray-600">
            Baseadas no seu perfil financeiro e gaps de cobertura
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sugestoesSeguros.map((sugestao, index) => {
              const Icon = getIcon(sugestao.categoria);
              return (
                <div key={index} className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-orange-100 rounded-full">
                      <Icon className="w-5 h-5 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{sugestao.tipo}</h3>
                      <Badge variant="outline" className="mt-1">
                        Prioridade {sugestao.prioridade}
                      </Badge>
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-3">{sugestao.motivo}</p>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Cobertura recomendada:</span>
                      <span className="font-medium">{formatCurrency(sugestao.coberturaRecomendada)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Prêmio estimado:</span>
                      <span className="font-medium">{formatCurrency(sugestao.premioEstimado)}/mês</span>
                    </div>
                  </div>
                  
                  <Button 
                    size="sm" 
                    className="w-full"
                    onClick={() => contratar(sugestao.tipo)}
                  >
                    Cotar Agora
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}