import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Plus, Settings, Eye, EyeOff, MessageCircle, PieChart } from "lucide-react";

interface FamilyMember {
  id: string;
  nome: string;
  relacao: string;
  permissoes: {
    verReceitas: boolean;
    verGastos: boolean;
    adicionarGastos: boolean;
    verMetas: boolean;
    editarMetas: boolean;
  };
  gastosDoMes: number;
  contribuicao: number;
}

interface OrcamentoFamiliar {
  categoria: string;
  orcamentoTotal: number;
  gastoAtual: number;
  responsaveis: string[];
}

export default function GestaoFamiliar() {
  const [membros, setMembros] = useState<FamilyMember[]>([]);
  const [orcamentos, setOrcamentos] = useState<OrcamentoFamiliar[]>([]);
  const [novoMembro, setNovoMembro] = useState({
    nome: "",
    relacao: "",
    contribuicao: 0
  });

  useEffect(() => {
    const membrosExemplo: FamilyMember[] = [
      {
        id: "1",
        nome: "Carlos (Você)",
        relacao: "Admin",
        permissoes: {
          verReceitas: true,
          verGastos: true,
          adicionarGastos: true,
          verMetas: true,
          editarMetas: true
        },
        gastosDoMes: 2800,
        contribuicao: 5500
      },
      {
        id: "2",
        nome: "Maria",
        relacao: "Cônjuge",
        permissoes: {
          verReceitas: true,
          verGastos: true,
          adicionarGastos: true,
          verMetas: true,
          editarMetas: false
        },
        gastosDoMes: 1200,
        contribuicao: 3200
      },
      {
        id: "3",
        nome: "João",
        relacao: "Filho",
        permissoes: {
          verReceitas: false,
          verGastos: false,
          adicionarGastos: true,
          verMetas: true,
          editarMetas: false
        },
        gastosDoMes: 450,
        contribuicao: 0
      }
    ];

    const orcamentosExemplo: OrcamentoFamiliar[] = [
      {
        categoria: "Alimentação",
        orcamentoTotal: 1200,
        gastoAtual: 890,
        responsaveis: ["Carlos", "Maria"]
      },
      {
        categoria: "Transporte",
        orcamentoTotal: 800,
        gastoAtual: 720,
        responsaveis: ["Carlos", "Maria", "João"]
      },
      {
        categoria: "Educação",
        orcamentoTotal: 600,
        gastoAtual: 580,
        responsaveis: ["Carlos", "Maria"]
      },
      {
        categoria: "Lazer",
        orcamentoTotal: 400,
        gastoAtual: 280,
        responsaveis: ["Todos"]
      }
    ];

    setMembros(membrosExemplo);
    setOrcamentos(orcamentosExemplo);
  }, []);

  const receitaFamiliarTotal = membros.reduce((acc, m) => acc + m.contribuicao, 0);
  const gastosGeraisTotal = orcamentos.reduce((acc, o) => acc + o.gastoAtual, 0);

  const getProgressColor = (gasto: number, orcamento: number) => {
    const percentual = (gasto / orcamento) * 100;
    if (percentual > 90) return "bg-red-500";
    if (percentual > 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Orçamento Familiar</h1>
          <p className="text-gray-600">Gestão colaborativa das finanças da família</p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-green-600">R$ {receitaFamiliarTotal.toLocaleString()}</div>
          <div className="text-sm text-gray-600">Receita Total da Família</div>
        </div>
      </div>

      {/* Resumo Familiar */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-600">{membros.length}</div>
            <div className="text-sm text-gray-600">Membros Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-600">R$ {receitaFamiliarTotal.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Receita Total</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-600">R$ {gastosGeraisTotal.toLocaleString()}</div>
            <div className="text-sm text-gray-600">Gastos Gerais</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-600">
              R$ {(receitaFamiliarTotal - gastosGeraisTotal).toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Disponível</div>
          </CardContent>
        </Card>
      </div>

      {/* Membros da Família */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Membros da Família</CardTitle>
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Adicionar Membro
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {membros.map((membro) => (
              <div key={membro.id} className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-blue-500" />
                    <div>
                      <h4 className="font-semibold">{membro.nome}</h4>
                      <Badge variant="outline" className="text-xs">
                        {membro.relacao}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-green-600">
                      R$ {membro.contribuicao.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Contribuição</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <div className="text-sm text-gray-600">Gastos Este Mês</div>
                    <div className="font-semibold">R$ {membro.gastosDoMes.toLocaleString()}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">% da Receita Familiar</div>
                    <div className="font-semibold">
                      {((membro.contribuicao / receitaFamiliarTotal) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="text-sm font-medium text-gray-700">Permissões:</div>
                  <div className="flex flex-wrap gap-2 text-xs">
                    <Badge variant={membro.permissoes.verReceitas ? "default" : "secondary"}>
                      {membro.permissoes.verReceitas ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      Ver Receitas
                    </Badge>
                    <Badge variant={membro.permissoes.verGastos ? "default" : "secondary"}>
                      {membro.permissoes.verGastos ? <Eye className="w-3 h-3 mr-1" /> : <EyeOff className="w-3 h-3 mr-1" />}
                      Ver Gastos
                    </Badge>
                    <Badge variant={membro.permissoes.adicionarGastos ? "default" : "secondary"}>
                      <Plus className="w-3 h-3 mr-1" />
                      Adicionar Gastos
                    </Badge>
                    <Badge variant={membro.permissoes.editarMetas ? "default" : "secondary"}>
                      <Settings className="w-3 h-3 mr-1" />
                      Editar Metas
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Orçamentos Colaborativos */}
      <Card>
        <CardHeader>
          <CardTitle>Orçamentos Colaborativos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {orcamentos.map((orcamento, index) => {
              const percentual = (orcamento.gastoAtual / orcamento.orcamentoTotal) * 100;
              return (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h4 className="font-semibold">{orcamento.categoria}</h4>
                      <div className="text-sm text-gray-600">
                        Responsáveis: {orcamento.responsaveis.join(", ")}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">
                        R$ {orcamento.gastoAtual.toLocaleString()} / R$ {orcamento.orcamentoTotal.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-600">{percentual.toFixed(1)}% utilizado</div>
                    </div>
                  </div>
                  
                  <Progress 
                    value={percentual} 
                    className={`h-3 ${getProgressColor(orcamento.gastoAtual, orcamento.orcamentoTotal)}`}
                  />
                  
                  <div className="flex items-center justify-between mt-3">
                    <div className="text-sm">
                      Restante: R$ {(orcamento.orcamentoTotal - orcamento.gastoAtual).toLocaleString()}
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <PieChart className="w-4 h-4 mr-2" />
                        Detalhes
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="w-4 h-4 mr-2" />
                        Ajustar
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Guias de Mediação */}
      <Card className="border-purple-200 bg-purple-50">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <MessageCircle className="w-5 h-5 text-purple-600" />
            <CardTitle className="text-purple-800">Guias para Conversas Financeiras</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-purple-800 mb-2">Como Conversar Sobre Orçamento Familiar</h4>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• Escolha um momento calmo, sem distrações</li>
                <li>• Comece pelos objetivos comuns da família</li>
                <li>• Use dados do app para mostrar padrões, não para culpar</li>
                <li>• Defina prioridades em conjunto</li>
                <li>• Celebre pequenas vitórias financeiras</li>
              </ul>
            </div>
            
            <div className="bg-white p-4 rounded-lg border">
              <h4 className="font-semibold text-purple-800 mb-2">Lidando com Conflitos Sobre Gastos</h4>
              <ul className="space-y-1 text-sm text-purple-700">
                <li>• Foque no impacto nos objetivos, não no gasto em si</li>
                <li>• Proponha alternativas em vez de apenas restringir</li>
                <li>• Defina "gastos pessoais" livres para cada membro</li>
                <li>• Use o progresso das metas como motivação</li>
              </ul>
            </div>

            <Button className="w-full bg-purple-600 hover:bg-purple-700">
              <MessageCircle className="w-4 h-4 mr-2" />
              Acessar Mais Guias de Mediação
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}