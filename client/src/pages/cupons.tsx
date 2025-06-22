import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Ticket, Copy, Clock, Gift, Star, Filter, CheckCircle } from "lucide-react";
import { formatCurrency } from "@/lib/financial-utils";
import { useToast } from "@/hooks/use-toast";

export default function Cupons() {
  const [filtroPor, setFiltroPor] = useState("todos");
  const [cupomCopiado, setCupomCopiado] = useState<number | null>(null);
  const { toast } = useToast();

  // Cupons baseados no nível e atividade do usuário
  const cupons = [
    {
      id: 1,
      codigo: "FLOW15OFF",
      titulo: "15% de desconto em tecnologia",
      descricao: "Válido para iPhone, notebooks e smartwatches",
      desconto: 15,
      tipo: "percentual",
      valorMaximo: 500,
      categoria: "tecnologia",
      loja: "Magazine Luiza",
      validade: "2025-07-15",
      minCompra: 1000,
      usado: false,
      desbloqueado: true,
      condicao: "Usuário Premium",
      cor: "blue"
    },
    {
      id: 2,
      codigo: "VIAGEM200",
      titulo: "R$ 200 OFF em passagens",
      descricao: "Desconto fixo para viagens nacionais e internacionais",
      desconto: 200,
      tipo: "fixo",
      valorMaximo: 200,
      categoria: "viagem",
      loja: "Expedia",
      validade: "2025-08-30",
      minCompra: 1500,
      usado: false,
      desbloqueado: true,
      condicao: "3 metas completadas",
      cor: "green"
    },
    {
      id: 3,
      codigo: "EDUCAFREE",
      titulo: "Curso gratuito de investimentos",
      descricao: "Acesso completo ao curso 'Primeiros Passos'",
      desconto: 100,
      tipo: "percentual",
      valorMaximo: 297,
      categoria: "educacao",
      loja: "EduVie Academy",
      validade: "2025-12-31",
      minCompra: 0,
      usado: true,
      desbloqueado: true,
      condicao: "1º mês no app",
      cor: "purple"
    },
    {
      id: 4,
      codigo: "SAUDE50",
      titulo: "50% OFF primeira consulta",
      descricao: "Desconto em consultas médicas e exames",
      desconto: 50,
      tipo: "percentual",
      valorMaximo: 150,
      categoria: "saude",
      loja: "Doctoralia",
      validade: "2025-09-20",
      minCompra: 100,
      usado: false,
      desbloqueado: false,
      condicao: "Saldo positivo por 60 dias",
      cor: "red"
    },
    {
      id: 5,
      codigo: "CASHBACK30",
      titulo: "30% de cashback em compras",
      descricao: "Cashback dobrado em todas as categorias",
      desconto: 30,
      tipo: "cashback",
      valorMaximo: 100,
      categoria: "geral",
      loja: "Parceiros Flow",
      validade: "2025-07-01",
      minCompra: 200,
      usado: false,
      desbloqueado: false,
      condicao: "Nível 5 ou superior",
      cor: "yellow"
    },
    {
      id: 6,
      codigo: "RESTAURANTE25",
      titulo: "25% OFF em restaurantes",
      descricao: "Desconto em delivery e retirada",
      desconto: 25,
      tipo: "percentual",
      valorMaximo: 50,
      categoria: "alimentacao",
      loja: "iFood",
      validade: "2025-06-30",
      minCompra: 30,
      usado: false,
      desbloqueado: true,
      condicao: "Uso regular do app",
      cor: "orange"
    }
  ];

  const { data: summary } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  const cuponsFiltrados = cupons.filter(cupom => {
    if (filtroPor === "disponiveis") return cupom.desbloqueado && !cupom.usado;
    if (filtroPor === "usados") return cupom.usado;
    if (filtroPor === "bloqueados") return !cupom.desbloqueado;
    return true;
  });

  const copiarCupom = (cupom: any) => {
    navigator.clipboard.writeText(cupom.codigo);
    setCupomCopiado(cupom.id);
    setTimeout(() => setCupomCopiado(null), 2000);
    
    toast({
      title: "Cupom copiado!",
      description: `${cupom.codigo} foi copiado para a área de transferência`,
    });
  };

  const getCorCupom = (cor: string) => {
    const cores = {
      blue: "from-blue-500 to-blue-600",
      green: "from-green-500 to-green-600", 
      purple: "from-purple-500 to-purple-600",
      red: "from-red-500 to-red-600",
      yellow: "from-yellow-500 to-yellow-600",
      orange: "from-orange-500 to-orange-600"
    };
    return cores[cor as keyof typeof cores] || "from-gray-500 to-gray-600";
  };

  const calcularEconomia = () => {
    return cupons
      .filter(c => c.usado)
      .reduce((sum, c) => sum + (c.tipo === 'fixo' ? c.desconto : c.valorMaximo), 0);
  };

  const getDiasRestantes = (validade: string) => {
    const hoje = new Date();
    const dataValidade = new Date(validade);
    const diferenca = dataValidade.getTime() - hoje.getTime();
    const dias = Math.ceil(diferenca / (1000 * 3600 * 24));
    return dias;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">🎟️ Meus Cupons</h1>
          <p className="text-gray-600">Cupons exclusivos baseados na sua atividade</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Gift className="w-4 h-4 mr-2" />
            Resgatar Cupom
          </Button>
          <Button>
            <Ticket className="w-4 h-4 mr-2" />
            Histórico
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cupons Disponíveis</p>
                <p className="text-2xl font-bold text-blue-600">
                  {cupons.filter(c => c.desbloqueado && !c.usado).length}
                </p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <Ticket className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Economia Total</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(calcularEconomia())}
                </p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <Star className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Cupons Usados</p>
                <p className="text-2xl font-bold text-purple-600">
                  {cupons.filter(c => c.usado).length}
                </p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <CheckCircle className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">A Desbloquear</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {cupons.filter(c => !c.desbloqueado).length}
                </p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <Gift className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filtrar Cupons
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Status</label>
              <Select value={filtroPor} onValueChange={setFiltroPor}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos os cupons</SelectItem>
                  <SelectItem value="disponiveis">Disponíveis</SelectItem>
                  <SelectItem value="usados">Usados</SelectItem>
                  <SelectItem value="bloqueados">Bloqueados</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Categoria</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Todas as categorias" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tecnologia">Tecnologia</SelectItem>
                  <SelectItem value="viagem">Viagem</SelectItem>
                  <SelectItem value="educacao">Educação</SelectItem>
                  <SelectItem value="saude">Saúde</SelectItem>
                  <SelectItem value="alimentacao">Alimentação</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm font-medium text-gray-600 block mb-2">Buscar</label>
              <Input placeholder="Código ou loja..." />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Grid de Cupons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cuponsFiltrados.map((cupom) => (
          <Card key={cupom.id} className={`overflow-hidden transition-all duration-300 ${
            cupom.desbloqueado && !cupom.usado 
              ? 'hover:shadow-lg border-2 border-transparent hover:border-blue-200' 
              : 'opacity-75'
          }`}>
            <div className={`h-2 bg-gradient-to-r ${getCorCupom(cupom.cor)}`}></div>
            
            <CardContent className="p-6">
              <div className="space-y-4">
                {/* Header do Cupom */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg">{cupom.titulo}</h3>
                      {cupom.usado && (
                        <Badge className="bg-gray-100 text-gray-800">Usado</Badge>
                      )}
                      {!cupom.desbloqueado && (
                        <Badge className="bg-red-100 text-red-800">Bloqueado</Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{cupom.descricao}</p>
                    <p className="text-xs text-gray-500">Válido na {cupom.loja}</p>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-2xl font-bold text-green-600">
                      {cupom.tipo === 'fixo' 
                        ? formatCurrency(cupom.desconto)
                        : `${cupom.desconto}%`
                      }
                    </div>
                    {cupom.tipo === 'percentual' && cupom.valorMaximo > 0 && (
                      <div className="text-xs text-gray-500">
                        até {formatCurrency(cupom.valorMaximo)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Código do Cupom */}
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs text-gray-600 mb-1">Código:</div>
                      <div className="font-mono font-bold text-lg">{cupom.codigo}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copiarCupom(cupom)}
                      disabled={!cupom.desbloqueado || cupom.usado}
                      className={cupomCopiado === cupom.id ? 'bg-green-100' : ''}
                    >
                      {cupomCopiado === cupom.id ? (
                        <CheckCircle className="w-4 h-4" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                {/* Informações Adicionais */}
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Compra mínima:</span>
                    <span className="font-medium">
                      {cupom.minCompra > 0 ? formatCurrency(cupom.minCompra) : "Sem mínimo"}
                    </span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Validade:</span>
                    <div className="text-right">
                      <div className="font-medium">
                        {new Date(cupom.validade).toLocaleDateString('pt-BR')}
                      </div>
                      <div className="text-xs text-orange-600">
                        <Clock className="w-3 h-3 inline mr-1" />
                        {getDiasRestantes(cupom.validade)} dias restantes
                      </div>
                    </div>
                  </div>

                  {!cupom.desbloqueado && (
                    <div className="bg-yellow-50 p-3 rounded border border-yellow-200">
                      <div className="text-xs text-yellow-800">
                        <strong>Para desbloquear:</strong> {cupom.condicao}
                      </div>
                    </div>
                  )}
                </div>

                {/* Ações */}
                {cupom.desbloqueado && !cupom.usado && (
                  <div className="pt-3 border-t">
                    <Button className="w-full" onClick={() => copiarCupom(cupom)}>
                      <Copy className="w-4 h-4 mr-2" />
                      Usar Cupom
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}