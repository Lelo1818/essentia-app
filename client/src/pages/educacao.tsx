import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Play, Award, CheckCircle, Clock, Star, Target, TrendingUp } from "lucide-react";

interface Modulo {
  id: string;
  titulo: string;
  descricao: string;
  duracao: string;
  nivel: "basico" | "intermediario" | "avancado";
  concluido: boolean;
  progresso: number;
  topicos: string[];
  icon: string;
}

export default function EducacaoFinanceira() {
  const [moduloAtivo, setModuloAtivo] = useState<string | null>(null);

  const modulos: Modulo[] = [
    {
      id: "1",
      titulo: "Fundamentos das Finanças Pessoais",
      descricao: "Conceitos básicos para começar sua jornada financeira",
      duracao: "45 min",
      nivel: "basico",
      concluido: true,
      progresso: 100,
      icon: "📚",
      topicos: [
        "O que são finanças pessoais",
        "Renda vs Patrimônio",
        "Fluxo de caixa pessoal",
        "Primeiros passos para organização"
      ]
    },
    {
      id: "2", 
      titulo: "Controle de Gastos e Orçamento",
      descricao: "Aprenda a rastrear e controlar seus gastos mensais",
      duracao: "60 min",
      nivel: "basico",
      concluido: true,
      progresso: 100,
      icon: "💰",
      topicos: [
        "Como categorizar gastos",
        "Método 50/30/20",
        "Planilhas vs Apps",
        "Identificando vazamentos financeiros"
      ]
    },
    {
      id: "3",
      titulo: "Construindo sua Reserva de Emergência",
      descricao: "Estratégias para criar e manter uma reserva sólida",
      duracao: "40 min", 
      nivel: "basico",
      concluido: false,
      progresso: 65,
      icon: "🛡️",
      topicos: [
        "Quanto guardar na reserva",
        "Onde investir a reserva",
        "Como acelerar a formação",
        "Quando usar a reserva"
      ]
    },
    {
      id: "4",
      titulo: "Saindo das Dívidas",
      descricao: "Métodos comprovados para quitar dívidas eficientemente",
      duracao: "50 min",
      nivel: "intermediario", 
      concluido: false,
      progresso: 30,
      icon: "⚖️",
      topicos: [
        "Mapeamento completo das dívidas",
        "Método Snowball vs Avalanche",
        "Renegociação estratégica",
        "Prevenção de novas dívidas"
      ]
    },
    {
      id: "5",
      titulo: "Investimentos para Iniciantes",
      descricao: "Primeiros passos no mundo dos investimentos",
      duracao: "75 min",
      nivel: "intermediario",
      concluido: false,
      progresso: 0,
      icon: "📈",
      topicos: [
        "Renda Fixa vs Renda Variável",
        "Perfil de investidor",
        "Diversificação de carteira",
        "Primeiros R$ 1.000 investidos"
      ]
    },
    {
      id: "6",
      titulo: "Planejamento de Aposentadoria",
      descricao: "Como garantir tranquilidade financeira no futuro",
      duracao: "55 min",
      nivel: "avancado",
      concluido: false,
      progresso: 0,
      icon: "🏖️",
      topicos: [
        "Calculando sua aposentadoria",
        "INSS vs Previdência Privada",
        "Estratégias de longo prazo",
        "Simulações práticas"
      ]
    }
  ];

  const getNivelColor = (nivel: string) => {
    switch (nivel) {
      case "basico": return "text-green-600 bg-green-100";
      case "intermediario": return "text-yellow-600 bg-yellow-100";
      case "avancado": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getNivelTexto = (nivel: string) => {
    switch (nivel) {
      case "basico": return "Básico";
      case "intermediario": return "Intermediário"; 
      case "avancado": return "Avançado";
      default: return nivel;
    }
  };

  const modulosConcluidos = modulos.filter(m => m.concluido).length;
  const progressoTotal = Math.round((modulos.reduce((acc, m) => acc + m.progresso, 0) / (modulos.length * 100)) * 100);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Educação Financeira</h1>
          <p className="text-gray-600">Aprenda no seu ritmo com conteúdo personalizado</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-blue-600">{progressoTotal}%</div>
          <div className="text-sm text-gray-600">Progresso Geral</div>
        </div>
      </div>

      {/* Progress Overview */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Target className="w-5 h-5 text-blue-600" />
            <CardTitle className="text-blue-800">Seu Progresso</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Progress value={progressoTotal} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center text-sm">
              <div>
                <div className="text-2xl font-bold text-green-600">{modulosConcluidos}</div>
                <div className="text-gray-600">Módulos Concluídos</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-600">{modulos.length - modulosConcluidos}</div>
                <div className="text-gray-600">Módulos Restantes</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-600">5h 25min</div>
                <div className="text-gray-600">Tempo Total de Estudo</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-600">Bronze</div>
                <div className="text-gray-600">Nível Atual</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recomendação IA */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-green-600" />
            <CardTitle className="text-green-800">Recomendação Personalizada</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-start space-x-4">
            <div className="text-3xl">🎯</div>
            <div>
              <h4 className="font-semibold text-green-800">Próximo Passo Recomendado</h4>
              <p className="text-green-700 text-sm mb-2">
                Com base no seu perfil de gastos altos com emergências, recomendamos priorizar o módulo 
                "Construindo sua Reserva de Emergência". Você já economizou R$ 230 este mês - é o momento ideal!
              </p>
              <Button size="sm" className="bg-green-600 hover:bg-green-700">
                Continuar Módulo 3
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Módulos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {modulos.map((modulo) => (
          <Card 
            key={modulo.id} 
            className={`hover:shadow-lg transition-all cursor-pointer ${
              modulo.concluido ? 'border-green-200 bg-green-50' : 
              modulo.progresso > 0 ? 'border-blue-200 bg-blue-50' : 
              'hover:border-gray-300'
            }`}
            onClick={() => setModuloAtivo(moduloAtivo === modulo.id ? null : modulo.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-3xl">{modulo.icon}</div>
                  <div className="flex-1">
                    <CardTitle className="text-lg">{modulo.titulo}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge className={`text-xs ${getNivelColor(modulo.nivel)}`}>
                        {getNivelTexto(modulo.nivel)}
                      </Badge>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock className="w-3 h-3 mr-1" />
                        {modulo.duracao}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  {modulo.concluido ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <div className="text-2xl font-bold text-blue-600">{modulo.progresso}%</div>
                  )}
                </div>
              </div>
              {!modulo.concluido && (
                <Progress value={modulo.progresso} className="h-2 mt-2" />
              )}
            </CardHeader>
            
            <CardContent>
              <p className="text-gray-700 text-sm mb-4">{modulo.descricao}</p>
              
              {moduloAtivo === modulo.id && (
                <div className="space-y-3 border-t pt-3">
                  <h5 className="font-semibold text-sm">Tópicos do Módulo:</h5>
                  <ul className="space-y-1">
                    {modulo.topicos.map((topico, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <BookOpen className="w-3 h-3 mr-2 text-gray-400" />
                        {topico}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              
              <div className="flex items-center justify-between mt-4">
                <Button 
                  size="sm" 
                  variant={modulo.concluido ? "outline" : "default"}
                  disabled={modulo.id !== "1" && !modulos[parseInt(modulo.id) - 2]?.concluido && modulo.progresso === 0}
                >
                  <Play className="w-4 h-4 mr-2" />
                  {modulo.concluido ? "Revisar" : 
                   modulo.progresso > 0 ? "Continuar" : "Iniciar"}
                </Button>
                
                {modulo.concluido && (
                  <div className="flex items-center text-sm text-green-600">
                    <Award className="w-4 h-4 mr-1" />
                    Concluído
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Próximas Conquistas */}
      <Card>
        <CardHeader>
          <CardTitle>Próximas Conquistas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="text-3xl mb-2">🥉</div>
              <div className="font-semibold">Especialista Básico</div>
              <div className="text-sm text-gray-600">Complete 3 módulos básicos</div>
              <div className="text-xs text-gray-500 mt-1">Progresso: 2/3</div>
            </div>
            <div className="text-center p-4 border rounded-lg opacity-60">
              <div className="text-3xl mb-2">🥈</div>
              <div className="font-semibold">Investidor Iniciante</div>
              <div className="text-sm text-gray-600">Complete módulo de investimentos</div>
              <div className="text-xs text-gray-500 mt-1">Bloqueado</div>
            </div>
            <div className="text-center p-4 border rounded-lg opacity-60">
              <div className="text-3xl mb-2">🥇</div>
              <div className="font-semibold">Mestre Financeiro</div>
              <div className="text-sm text-gray-600">Complete todos os módulos</div>
              <div className="text-xs text-gray-500 mt-1">Bloqueado</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}